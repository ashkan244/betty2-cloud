// final.mjs — the FACE versions: your recorded clip in, a finished video out.
//
// Drop recordings into render/footage/ and run `node final.mjs`:
//   footage/ep05.mp4                 an English Unlocked episode
//   footage/story-lighthouse.mp4     a Slow Story
//   footage/ep05.txt  (optional)     one number: the second IN YOUR CLIP where
//                                    the episode's 0:00 is (your clap / the moment
//                                    you pressed play on the teleprompter)
//
// For each clip that has no finished file yet it:
//   1. renders the episode/story with the footage burnt into the camera layer
//      (the director moves it, so it must be inside the render — CAM=…),
//   2. lays the clip's own audio on top (your voice = the voice-over),
//      trimmed to the same 0:00, loudness-normalised to -14 LUFS for YouTube,
//      with light denoise.
// Output: render/out/final/english-unlocked-ep05-face.mp4 · slow-story-<id>-face.mp4
// Options: ONLY=ep05,story-coffee   FORCE=1   NOAUDIO=1 (keep the silent render)
//
// How to record so it lines up: open the episode in the browser
// (player.html?ep=05), start the camera, clap once, press play at the same
// moment and speak along with the karaoke — the page is your teleprompter.
// Put the clap's time in ep05.txt. See footage/README.md.

import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, unlinkSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FOOT = path.resolve(__dirname, process.env.FOOTDIR || "footage");
const OUT = path.resolve(__dirname, "out", "final");
const FFMPEG = process.env.FFMPEG || "ffmpeg";
const FORCE = !!process.env.FORCE;
const ONLY = (process.env.ONLY || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
mkdirSync(FOOT, { recursive: true });
mkdirSync(OUT, { recursive: true });

function run(cmd, args, env) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, args, { stdio: "inherit", env: { ...process.env, ...env }, cwd: __dirname });
    p.on("error", rej);
    p.on("close", (c) => (c === 0 ? res() : rej(new Error(`${path.basename(cmd)} exited ${c}`))));
  });
}

const clips = readdirSync(FOOT).filter((f) => /\.(mp4|mov|m4v|webm|mkv)$/i.test(f));
if (!clips.length) {
  console.log("No footage yet — put recordings in render/footage/ (ep05.mp4, story-coffee.mp4 …). See footage/README.md.");
  process.exit(0);
}

for (const f of clips) {
  const base = f.replace(/\.[^.]+$/, "").toLowerCase();
  if (ONLY.length && !ONLY.includes(base)) continue;
  const ep = /^ep(\d{1,2})$/.exec(base);
  const st = /^story-([a-z0-9]+)$/.exec(base);
  if (!ep && !st) { console.log(`· ${f}: name it epNN.* or story-<id>.* — skipped`); continue; }
  const name = ep ? `english-unlocked-ep${ep[1].padStart(2, "0")}` : `slow-story-${st[1]}`;
  const final = path.resolve(OUT, `${name}-face.mp4`);
  if (existsSync(final) && !FORCE) { console.log(`✓ ${name}-face.mp4 already made (FORCE=1 to redo)`); continue; }

  const clip = path.resolve(FOOT, f);
  const offFile = path.resolve(FOOT, base + ".txt");
  // OFFSET (env) wins over the .txt — the cloud workflow passes it as an input
  const offset = process.env.OFFSET != null && process.env.OFFSET !== "" ? Number(process.env.OFFSET) || 0
    : existsSync(offFile) ? Number(readFileSync(offFile, "utf8").trim()) || 0 : 0;
  console.log(`\n● ${name} · footage ${f}${offset ? ` · 0:00 is at ${offset}s of the clip` : ""}`);

  // 0) a standard H.264 1080p30 working copy: phone footage is often HEVC, which
  //    Chrome on Linux (and many Windows machines) cannot decode, and a constant
  //    30 fps copy seeks frame-accurately. The original file is never touched.
  const proxyDir = path.resolve(OUT, "_proxy");
  mkdirSync(proxyDir, { recursive: true });
  const proxy = path.resolve(proxyDir, base + ".mp4");
  if (!existsSync(proxy) || FORCE) {
    console.log("  · making an H.264 working copy of your clip…");
    await run(FFMPEG, ["-y", "-hide_banner", "-loglevel", "error", "-i", clip,
      "-map", "0:v:0", "-map", "0:a:0?", "-vf", "scale=-2:1080,fps=30", "-c:v", "libx264", "-preset", "veryfast",
      "-crf", "17", "-g", "30", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", proxy]);
  }

  // 1) render with the clip in the camera layer. camstart = -offset: the clip's
  //    second <offset> lands on the timeline's 0:00.
  const env = { CAM: proxy, CAMSTART: String(-offset), OUTDIR: "out/final", SUFFIX: "-face-silent", CAP: process.env.CAP || "jpeg" };
  if (ep) await run(process.execPath, ["render.mjs"], { ...env, EP: ep[1] });
  else await run(process.execPath, ["render-vshort.mjs"], { ...env, MODE: "story", ID: st[1] });
  const silent = path.resolve(OUT, `${name}-face-silent.mp4`);
  if (!existsSync(silent)) throw new Error("render produced no file for " + name);
  if (process.env.NOAUDIO) { renameSync(silent, final); console.log(`✓ out/final/${path.basename(final)} (silent)`); continue; }

  // 2) your voice from the same clip, aligned, cleaned and at YouTube loudness
  const tmp = final.replace(/\.mp4$/, ".part.mp4");
  await run(FFMPEG, ["-y", "-hide_banner", "-loglevel", "error",
    "-i", silent, "-ss", String(offset), "-i", proxy,
    "-map", "0:v:0", "-map", "1:a:0?", "-c:v", "copy",
    "-af", "highpass=f=70,afftdn=nf=-25,loudnorm=I=-14:TP=-1.5:LRA=11,apad",
    "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", tmp]);
  renameSync(tmp, final);
  unlinkSync(silent);
  console.log(`✓ out/final/${path.basename(final)}`);
}
