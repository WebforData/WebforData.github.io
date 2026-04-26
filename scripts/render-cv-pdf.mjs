import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const inputPath = path.join(root, "public", "abderrahmane-ouroui-cv.html");
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

const chromePath = await findChrome();
await runChrome(chromePath);
console.log(`Rendered ${path.relative(root, outputPath)} from ${path.relative(root, inputPath)}`);
