// face.mjs — the finished "with face" episode, footage-first (CLAUDE.md §18).
//
//   EP=31 node face.mjs                 align (if needed) → render → audio → out/final/
//   EP=31 STEP=audio node face.mjs      only redo the sound on an existing render
//   EP=31 MUSIC=1 node face.mjs         also lay the soft music bed (render/music-bed.py) under the voice
//
// Needs the host's clips in render/footage/ (epNN.mp4|mov + epNN-hook.mp4|mov). align.mjs
// writes timing/epNN.js + footage/_work/epNN-cut.mp4; this renders the episode with that clip
// burnt into the director's camera layer (TIMED=1, so every caption sits on the host's words)
// and lays the clip's own voice on it:
//   rumble cut (the pilot room had 20–200 Hz rumble at −47 dB) → light spectral denoise →
//   gentle compression → two-pass loudnorm to −14 LUFS / −1.5 dBTP (YouTube).
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { existsSync, mkdirSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const EP = String(process.env.EP || "31").padStart(2, "0");
const FOOT = path.resolve(__dirname, process.env.FOOTDIR || "footage");
const FFMPEG = process.env.FFMPEG || "ffmpeg";
const STEP = process.env.STEP || "all";
const cut = path.join(FOOT, "_work", `ep${EP}-cut.mp4`);
const timing = path.join(ROOT, "timing", `ep${EP}.js`);
const baseDir = path.join(__dirname, "out", "final", "_base");
const base = path.join(baseDir, `english-unlocked-ep${EP}.mp4`);
const outDir = path.join(__dirname, "out", "final");
const out = path.join(outDir, `english-unlocked-ep${EP}-face${process.env.MUSIC === "1" ? "-music" : ""}.mp4`);
mkdirSync(baseDir, { recursive: true });
const run = (cmd, args, env = {}) => {
  const r = spawnSync(cmd, args, { stdio: "inherit", cwd: __dirname, env: { ...process.env, ...env } });
  // a killed child has status null + a signal — that is a failure too, never "carry on"
  if (r.status !== 0) { console.error(`✗ ${path.basename(args[0] || cmd)} failed (${r.status ?? r.signal})`); process.exit(r.status || 1); }
};

// 1. align (word timings → timing file + cut clip)
if (STEP === "all" && (!existsSync(cut) || !existsSync(timing) || process.env.REALIGN === "1"))
  run("node", ["align.mjs"], { EP });

// 2. render with the host burnt in
if (STEP === "all" || STEP === "render") {
  run("node", ["render.mjs"], {
    EP, TIMED: "1", CAM: path.relative(ROOT, cut).replace(/\\/g, "/"), CAMSTART: "0",
    OUTDIR: path.relative(__dirname, baseDir), CAP: process.env.CAP || "jpeg", SQ: process.env.SQ || "92",
  });
}
if (!existsSync(base)) { console.error("✗ no render at " + base); process.exit(1); }

// 3. the voice. Measured, then ONE fixed gain to −14 LUFS — never loudnorm's dynamic mode: on the
//    pilot (loudness range 14.9 LU) it squeezed the range and lifted the learner's silent pauses
//    by 21 dB while speech rose 15. A gentle expander then lowers what is left of the room in
//    the pauses (≈ −12 dB, slow release so word tails survive) and a limiter catches the peaks.
// 130 Hz, 24 dB/oct: the pilot room rumbles up to ~200 Hz; a female voice (F0 ≈ 200 Hz) keeps its body
const voice = "highpass=f=130,highpass=f=130,afftdn=nr=10:nf=-55:tn=1,"
  + "acompressor=threshold=-24dB:ratio=2.5:attack=8:release=140:makeup=2";
const probe = spawnSync(FFMPEG, ["-hide_banner", "-i", cut, "-vn", "-af", `${voice},loudnorm=I=-14:TP=-1.5:print_format=json`, "-f", "null", "-"], { encoding: "utf8" });
const m = JSON.parse((probe.stderr.match(/\{[\s\S]*?\}/g) || ["{}"]).pop());
const gain = m.input_i ? (-14 - parseFloat(m.input_i)) : 0;
const level = `volume=${gain.toFixed(2)}dB,agate=threshold=0.02:ratio=2:range=0.25:attack=10:release=300:knee=4,`
  + "alimiter=limit=0.79:attack=4:release=60:level=disabled";
console.log(`● voice: measured ${m.input_i} LUFS → fixed gain ${gain >= 0 ? "+" : ""}${gain.toFixed(1)} dB → −14 LUFS`);

let fc, inputs = ["-i", base, "-i", cut];
if (process.env.MUSIC === "1") {
  // the bed (−20 dBFS RMS as written) sits at about −31 dBFS in the pauses — heard, not noticed —
  // and ducks a further ~8 dB under the voice
  const bed = path.join(FOOT, "_work", `ep${EP}-bed.wav`);
  run("python", ["music-bed.py", cut, bed]);
  inputs.push("-i", bed);
  fc = `[1:a]${voice},${level},asplit=2[v][key];[2:a]volume=-11dB[b];[b][key]sidechaincompress=threshold=0.03:ratio=4:attack=60:release=600[bd];[v][bd]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.79:level=disabled[a]`;
} else {
  fc = `[1:a]${voice},${level}[a]`;
}
// the picture decides the length: the sound is padded to it (alimiter's default auto-level
// pushed peaks to +0.5 dBFS and -shortest once cut 3 s off the music version — both fixed)
const videoDur = parseFloat(spawnSync(FFMPEG.replace(/ffmpeg(\.exe)?$/i, "ffprobe$1"), ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", base], { encoding: "utf8" }).stdout);
fc = fc.replace(/\[a\]$/, ",apad[a]");
mkdirSync(outDir, { recursive: true });
run(FFMPEG, ["-v", "error", "-y", ...inputs, "-filter_complex", fc, "-map", "0:v:0", "-map", "[a]",
  "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-t", String(videoDur), "-movflags", "+faststart", out]);
console.log("✓ " + out);
