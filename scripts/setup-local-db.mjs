import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { projectRoot } from "./sites-env.mjs";

// Always use the local emulator; no account, credentials or remote database.
const result = spawnSync(process.execPath, [
  fileURLToPath(new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url)),
  "d1", "execute", "DB", "--local",
  "--config", "wrangler.local.jsonc",
  "--persist-to", ".wrangler/state",
  "--file", "db/local-schema.sql",
], { cwd: projectRoot, stdio: "inherit" });

if (result.error) throw result.error;
process.exit(result.status ?? 1);
