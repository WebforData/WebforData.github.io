import fs from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import net from "node:net";

const root = process.cwd();
const langArg = process.argv.find((arg) => arg.startsWith("--lang="))?.split("=")[1] ?? "en";

const cvVariants = {
  en: {
    sourceFile: "version.tex",
    outputFile: "abderrahmane-ouroui-cv.pdf",
    printSourceFile: "aouroui-cv-source.html"
  },
  fr: {
    sourceFile: "version.fr.tex",
    outputFile: "abderrahmane-ouroui-cv-fr.pdf",
    printSourceFile: "aouroui-cv-source-fr.html"
  }
};

const variant = cvVariants[langArg];
if (!variant) {
  throw new Error(`Unknown CV language "${langArg}". Expected one of: ${Object.keys(cvVariants).join(", ")}`);
}

const texPath = path.join(root, variant.sourceFile);
const inputPath = path.join(root, "node_modules", ".cache", variant.printSourceFile);
const outputPath = path.join(root, "public", variant.outputFile);

const chromeCandidates = [
  process.env.CHROME_BIN,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser"
].filter(Boolean);

const latexCandidates = ["latexmk", "tectonic", "pdflatex", "xelatex"];

async function executablePath(command) {
  const pathDirs = [
    ...(process.env.PATH ?? "").split(path.delimiter),
    "/Library/TeX/texbin",
    "/opt/homebrew/bin",
    "/usr/local/bin",
    "/usr/bin"
  ].filter(Boolean);

  for (const dir of pathDirs) {
    const candidate = path.join(dir, command);
    try {
      await fs.access(candidate, fsConstants.X_OK);
      return candidate;
    } catch {
      // Keep looking through PATH.
    }
  }

  return "";
}

async function findLatexCompiler() {
  for (const command of latexCandidates) {
    const candidate = await executablePath(command);
    if (candidate) return { command, path: candidate };
  }

  return null;
}

function runProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"], ...options });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      reject(new Error(`${path.basename(command)} failed with exit code ${code}.\n${stdout}\n${stderr}`));
    });
  });
}

async function compileTexWithLatex(compiler) {
  const outDir = path.join("/tmp", `aouroui-cv-latex-${process.pid}`);
  await fs.mkdir(outDir, { recursive: true });

  try {
    const latexSourcePath = path.join(outDir, path.basename(texPath));
    const latexSource = await fs.readFile(texPath, "utf8");
    await fs.writeFile(latexSourcePath, latexSource.replace(/–/g, "--"));

    if (compiler.command === "latexmk") {
      await runProcess(compiler.path, [
        "-pdf",
        "-interaction=nonstopmode",
        "-halt-on-error",
        `-outdir=${outDir}`,
        latexSourcePath
      ]);
    } else if (compiler.command === "tectonic") {
      await runProcess(compiler.path, ["--outdir", outDir, latexSourcePath]);
    } else {
      const args = ["-interaction=nonstopmode", "-halt-on-error", `-output-directory=${outDir}`, latexSourcePath];
      await runProcess(compiler.path, args);
      await runProcess(compiler.path, args);
    }

    const compiledPdf = path.join(outDir, `${path.basename(texPath, ".tex")}.pdf`);
    const stat = await fs.stat(compiledPdf);
    if (stat.size < 10_000) {
      throw new Error("LaTeX generated a PDF that is unexpectedly small.");
    }

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.copyFile(compiledPdf, outputPath);
    console.log(`Rendered ${path.relative(root, outputPath)} directly from ${path.relative(root, texPath)} with ${compiler.command}`);
  } finally {
    await fs.rm(outDir, { force: true, recursive: true });
  }
}

async function findChrome() {
  for (const candidate of chromeCandidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // Try the next known browser location.
    }
  }

  throw new Error("Could not find Chrome/Chromium. Set CHROME_BIN to generate the PDF.");
}

async function ensurePrintSource() {
  try {
    await fs.access(inputPath);
  } catch {
    await runProcess(process.execPath, [path.join(root, "scripts", "render-cv-from-tex.mjs"), `--lang=${langArg}`], { cwd: root });
  }
}

function getAvailablePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => {
        if (typeof address === "object" && address?.port) {
          resolve(address.port);
          return;
        }
        reject(new Error("Could not allocate a Chrome debugging port."));
      });
    });
  });
}

async function waitForChrome(port, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  const endpoint = `http://127.0.0.1:${port}/json/version`;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) return;
    } catch {
      // Chrome is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error("Timed out waiting for Chrome DevTools endpoint.");
}

async function waitForPageTarget(port, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  const endpoint = `http://127.0.0.1:${port}/json/list`;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const targets = await response.json();
        const target = targets.find((entry) => entry.type === "page" && entry.webSocketDebuggerUrl);
        if (target) return target.webSocketDebuggerUrl;
      }
    } catch {
      // Keep polling until Chrome exposes its first page target.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error("Timed out waiting for a Chrome page target.");
}

function createCdpClient(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  const pending = new Map();
  const events = new Map();
  let nextId = 1;

  const opened = new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);

    if (message.id) {
      const request = pending.get(message.id);
      if (!request) return;
      pending.delete(message.id);
      if (message.error) {
        request.reject(new Error(`${message.error.message}: ${message.error.data ?? ""}`.trim()));
      } else {
        request.resolve(message.result ?? {});
      }
      return;
    }

    if (message.method) {
      const listeners = events.get(message.method) ?? [];
      events.set(message.method, listeners.filter((listener) => !listener(message.params ?? {})));
    }
  });

  socket.addEventListener("close", () => {
    for (const { reject } of pending.values()) {
      reject(new Error("Chrome DevTools connection closed before the PDF finished rendering."));
    }
    pending.clear();
  });

  return {
    async send(method, params = {}) {
      await opened;
      const id = nextId;
      nextId += 1;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
      });
    },
    async waitForEvent(method, timeoutMs = 15_000) {
      await opened;
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          const listeners = events.get(method) ?? [];
          events.set(method, listeners.filter((listener) => listener !== handler));
          reject(new Error(`Timed out waiting for Chrome event ${method}.`));
        }, timeoutMs);

        const handler = (params) => {
          clearTimeout(timeout);
          resolve(params);
          return true;
        };

        const listeners = events.get(method) ?? [];
        listeners.push(handler);
        events.set(method, listeners);
      });
    },
    close() {
      socket.close();
    }
  };
}

async function runChrome(chromePath) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const userDataDir = path.join("/tmp", `aouroui-cv-pdf-${process.pid}`);
  const remoteDebuggingPort = await getAvailablePort();

  const args = [
    "--headless=new",
    "--disable-gpu",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-sync",
    "--disable-extensions",
    "--disable-dev-shm-usage",
    "--no-first-run",
    "--no-sandbox",
    "--run-all-compositor-stages-before-draw",
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${remoteDebuggingPort}`,
    "about:blank"
  ];

  const child = spawn(chromePath, args, { stdio: ["ignore", "pipe", "pipe"] });
  const childClosed = new Promise((resolve) => child.once("close", resolve));
  let stderr = "";
  let client;

  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  try {
    await waitForChrome(remoteDebuggingPort);
    const webSocketUrl = await waitForPageTarget(remoteDebuggingPort);
    client = createCdpClient(webSocketUrl);

    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Emulation.setEmulatedMedia", { media: "print" });

    const loadEvent = client.waitForEvent("Page.loadEventFired");
    await client.send("Page.navigate", { url: pathToFileURL(inputPath).href });
    await loadEvent;

    await client.send("Runtime.evaluate", {
      awaitPromise: true,
      expression: "document.fonts ? document.fonts.ready.then(() => true) : true",
      returnByValue: true
    });

    await client.send("Runtime.evaluate", {
      awaitPromise: true,
      expression: "new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))",
      returnByValue: true
    });

    const pdf = await client.send("Page.printToPDF", {
      displayHeaderFooter: false,
      preferCSSPageSize: true,
      printBackground: true,
      scale: 1
    });

    await fs.writeFile(outputPath, Buffer.from(pdf.data, "base64"));
    const stat = await fs.stat(outputPath);
    if (stat.size < 10_000) {
      throw new Error("Chrome generated a PDF that is unexpectedly small.");
    }
  } catch (error) {
    throw new Error(`Chrome PDF generation failed.\n${error.message}\n${stderr}`);
  } finally {
    client?.close();
    if (child.exitCode === null && child.signalCode === null) {
      child.kill("SIGTERM");
    }
    await childClosed;
    await fs.rm(userDataDir, { force: true, recursive: true });
  }
}

const pdfEngine = process.env.CV_PDF_ENGINE ?? "latex";

if (!["browser", "latex"].includes(pdfEngine)) {
  throw new Error(`Unsupported CV_PDF_ENGINE "${pdfEngine}". Expected "browser" or "latex".`);
}

async function runLatexRenderer() {
  const latexCompiler = await findLatexCompiler();
  if (!latexCompiler) {
    throw new Error("No LaTeX compiler found. Install latexmk, pdflatex, xelatex, or tectonic for exact TeX PDF generation.");
  }
  await compileTexWithLatex(latexCompiler);
}

if (pdfEngine === "latex") {
  await runLatexRenderer();
  process.exit(0);
}

await ensurePrintSource();

try {
  const chromePath = await findChrome();
  await runChrome(chromePath);
  console.log(`Rendered ${path.relative(root, outputPath)} from ${path.relative(root, texPath)} via ${path.relative(root, inputPath)}`);
} catch (browserError) {
  try {
    console.warn(`Browser PDF generation failed, falling back to LaTeX rendering.\n${browserError.message}`);
    await runLatexRenderer();
    process.exit(0);
  } catch (error) {
    throw new Error(`Could not render ${path.relative(root, outputPath)}.\nBrowser error:\n${browserError.message}\nLaTeX fallback error:\n${error.message}`);
  }
}
