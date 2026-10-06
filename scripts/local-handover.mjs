import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import net from "node:net";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const url = "http://127.0.0.1:5173/";
const [mode, ...flags] = process.argv.slice(2);
const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 22 || (major === 22 && minor < 13)) {
  console.error("Node.js 22.13 or newer is required. Install it and try again.");
  process.exit(1);
}
if (!["setup", "start"].includes(mode)) throw new Error("Use setup or start.");
process.chdir(root);

function runNode(script, args = []) {
  const result = spawnSync(process.execPath, [script, ...args], { cwd: root, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function installDependencies() {
  const candidates = [
    process.env.npm_execpath,
    path.join(path.dirname(process.execPath), "node_modules/npm/bin/npm-cli.js"),
    path.resolve(path.dirname(process.execPath), "../lib/node_modules/npm/bin/npm-cli.js"),
    process.env.APPDATA && path.join(process.env.APPDATA, "npm/node_modules/npm/bin/npm-cli.js"),
    "/usr/share/nodejs/npm/bin/npm-cli.js",
  ].filter(Boolean);
  const npm = candidates.find(candidate => existsSync(candidate));
  console.log("Installing the locked project dependencies. Internet is needed on first setup.");
  if (npm) return runNode(npm, ["ci", "--no-audit", "--no-fund"]);
  const result = process.platform === "win32"
    ? spawnSync(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", "npm ci --no-audit --no-fund"], { cwd: root, stdio: "inherit" })
    : spawnSync("npm", ["ci", "--no-audit", "--no-fund"], { cwd: root, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function openBrowser() {
  if (!flags.includes("--open")) return;
  // The Windows handover launcher opens the page after startup, without a helper window.
  if (process.platform === "win32") {
    spawnSync("powershell.exe", ["-NoProfile", "-Command", `Start-Process -FilePath '${url}' -WindowStyle Hidden`], { windowsHide: true, stdio: "ignore" });
  }
}

async function portAvailable() {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once("error", error => error.code === "EADDRINUSE" ? resolve(false) : reject(error));
    probe.listen(5173, "127.0.0.1", () => probe.close(() => resolve(true)));
  });
}

if (mode === "start" && !await portAvailable()) {
  let belongsToThisFolder = false;
  try {
    const lock = JSON.parse(readFileSync(path.join(root, ".vinext/dev/lock.json"), "utf8"));
    const page = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const html = await page.text();
    belongsToThisFolder = path.resolve(lock.cwd) === path.resolve(root)
      && lock.port === 5173 && page.ok && html.includes("Swetha") && html.includes("Shivaanandha");
  } catch { /* A busy port without matching live project evidence is not ours. */ }
  if (!belongsToThisFolder) {
    console.error("Port 5173 is in use by another application. Close it, then try again.");
    process.exit(1);
  }
  console.log(`The wedding website is already running: ${url}`);
  openBrowser();
  process.exit(0);
}

if (mode === "setup" || ["vinext/dist/cli.js", "wrangler/bin/wrangler.js", "vite/bin/vite.js"]
  .some(relative => !existsSync(path.join(root, "node_modules", relative)))) installDependencies();
runNode(path.join(root, "scripts/setup-local-db.mjs"));
if (mode === "setup") {
  console.log("Local setup complete. Start with START-WEDDING.cmd or npm run dev.");
  process.exit(0);
}

console.log(`Opening the wedding website at ${url}\nKeep this window open. Press Ctrl+C to stop.`);
if (flags.includes("--open")) {
  let attempts = 0;
  const ready = setInterval(async () => {
    if (++attempts > 60) return clearInterval(ready);
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1000) });
      if (response.ok) { clearInterval(ready); openBrowser(); }
    } catch { /* Wait for the local server to become ready. */ }
  }, 1000);
  ready.unref();
}
process.argv = [process.execPath, path.join(root, "scripts/run-framework.mjs"), "dev", "--hostname", "127.0.0.1"];
await import("./run-framework.mjs");
