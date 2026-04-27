import fs from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const texPath = path.join(root, "version.tex");
const inputPath = path.join(root, "node_modules", ".cache", "aouroui-cv-source.html");
const outputPath = path.join(root, "public", "abderrahmane-ouroui-cv.pdf");

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
    if (compiler.command === "latexmk") {
      await runProcess(compiler.path, [
        "-pdf",
        "-interaction=nonstopmode",
        "-halt-on-error",
        `-outdir=${outDir}`,
        texPath
      ]);
    } else if (compiler.command === "tectonic") {
      await runProcess(compiler.path, ["--outdir", outDir, texPath]);
    } else {
      const args = ["-interaction=nonstopmode", "-halt-on-error", `-output-directory=${outDir}`, texPath];
      await runProcess(compiler.path, args);
      await runProcess(compiler.path, args);
    }

    const compiledPdf = path.join(outDir, "version.pdf");
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
    await runProcess(process.execPath, [path.join(root, "scripts", "render-cv-from-tex.mjs")], { cwd: root });
  }
}

async function runChrome(chromePath) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const startedAt = Date.now();
  const userDataDir = path.join("/tmp", `aouroui-cv-pdf-${process.pid}`);

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
    "--no-pdf-header-footer",
    "--print-to-pdf-no-header",
    "--run-all-compositor-stages-before-draw",
    `--user-data-dir=${userDataDir}`,
    "--virtual-time-budget=2000",
    `--print-to-pdf=${outputPath}`,
    pathToFileURL(inputPath).href
  ];

  await new Promise((resolve, reject) => {
    const child = spawn(chromePath, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    let settled = false;

    const finish = async (error = null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      try {
        await fs.rm(userDataDir, { force: true, recursive: true });
      } catch {
        // A stale temp profile is not a PDF failure.
      }
      if (error) reject(error);
      else resolve();
    };

    const timeout = setTimeout(async () => {
      child.kill("SIGTERM");
      if (await outputLooksFresh(startedAt)) {
        await finish();
        return;
      }
      await finish(new Error("Chrome PDF generation timed out before writing a fresh PDF."));
    }, 30_000);

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      finish(error);
    });

    child.on("close", async (code) => {
      if (code === 0) {
        await finish();
        return;
      }
      if (await outputLooksFresh(startedAt)) {
        await finish();
        return;
      }
      await finish(new Error(`Chrome PDF generation failed with exit code ${code}.\n${stderr}`));
    });
  });
}

async function outputLooksFresh(startedAt) {
  try {
    const stat = await fs.stat(outputPath);
    return stat.size > 10_000 && stat.mtimeMs >= startedAt - 1000;
  } catch {
    return false;
  }
}

const latexCompiler = await findLatexCompiler();

if (latexCompiler) {
  try {
    await compileTexWithLatex(latexCompiler);
    process.exit(0);
  } catch (error) {
    console.warn(`LaTeX PDF generation failed, falling back to browser rendering.\n${error.message}`);
  }
} else {
  console.warn("No LaTeX compiler found. Install latexmk, pdflatex, xelatex, or tectonic for exact TeX PDF generation.");
}

await ensurePrintSource();
const chromePath = await findChrome();
await runChrome(chromePath);
console.log(`Rendered ${path.relative(root, outputPath)} from ${path.relative(root, texPath)} via ${path.relative(root, inputPath)}`);
