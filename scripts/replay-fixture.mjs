#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const HORSE_FEED_RAW =
  "https://gist.githubusercontent.com/horse-feed/519f63d016ddd5a794fb89438afc30bf/raw/467d65c7e72991e697ac918dc151be7c7d2fd080/aoe3replay.py";

function arg(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function hasFlag(name) {
  return process.argv.includes(name);
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function downloadParser(parserPath) {
  if (await exists(parserPath)) return;
  await fs.mkdir(path.dirname(parserPath), { recursive: true });
  const response = await fetch(HORSE_FEED_RAW);
  if (!response.ok) throw new Error(`Could not download horse-feed parser: ${response.status}`);
  const text = await response.text();
  await fs.writeFile(parserPath, text, "utf8");
}

async function main() {
  const replay = arg("--replay");
  if (!replay) {
    console.error("Usage: node scripts/replay-fixture.mjs --replay <file.age3Yrec> [--json] [--bo] [--bo-player 1]");
    process.exit(1);
  }

  const replayPath = path.resolve(replay);
  if (!(await exists(replayPath))) {
    throw new Error(`Replay not found: ${replayPath}`);
  }

  const cacheDir = path.resolve(".cache/aoe3replay");
  const parserPath = path.join(cacheDir, "aoe3replay.py");
  await downloadParser(parserPath);

  const parsedDir = path.resolve("fixtures/replays/parsed");
  await fs.mkdir(parsedDir, { recursive: true });

  const base = path.basename(replayPath).replace(/\.(age3yrec|age3ysav)$/i, "");
  const args = [parserPath, replayPath];
  let outputPath = path.join(parsedDir, `${base}.summary.txt`);

  if (hasFlag("--json")) {
    args.push("--json");
    outputPath = path.join(parsedDir, `${base}.horsefeed.json`);
  } else if (hasFlag("--bo")) {
    args.push("--bo");
    outputPath = path.join(parsedDir, `${base}.bo.txt`);
  } else if (arg("--bo-player")) {
    args.push("--bo-player", arg("--bo-player"));
    outputPath = path.join(parsedDir, `${base}.bo-p${arg("--bo-player")}.txt`);
  }

  const result = spawnSync("python", args, { encoding: "utf8" });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    console.error(result.stderr);
    process.exit(result.status ?? 1);
  }

  await fs.writeFile(outputPath, result.stdout, "utf8");
  console.log(JSON.stringify({ ok: true, parserPath, replayPath, outputPath }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
