// render-vshort.mjs — generic offline renderer for the vertical (1080x1920) short
// formats: split (Aurora), daylight, convo. Deterministic frame-by-frame + ffmpeg.
//   MODE=daylight ID=S1E1 node render-vshort.mjs   -> render/out/daylight-S1E1.mp4
//   MODE=convo    ID=S1E2 node render-vshort.mjs   -> render/out/convo-S1E2.mp4
//   MODE=split    ID=S1E1 node render-vshort.mjs   -> render/out/split-S1E1.mp4

import puppeteer from "puppeteer";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { storyPreflight } from "./story-preflight.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const MODES = {
  split:    { page: "split-short.html",    qk: "split", prefix: "split",      w: 1080, h: 1920 },
  daylight: { page: "daylight-short.html", qk: "split", prefix: "daylight",   w: 1080, h: 1920 },
  convo:    { page: "convo-short.html",    qk: "convo", prefix: "convo",      w: 1080, h: 1920 },
  humans:   { page: "convo-humans.html",   qk: "convo", prefix: "humans",     w: 1080, h: 1920 },
  anime:    { page: "anime.html",          qk: "convo", prefix: "anime",      w: 1080, h: 1920 },
  story:    { page: "story.html",          qk: "story", prefix: "slow-story", w: 1920, h: 1080, lower: true },
  "story-short": { page: "story-short.html", qk: "short", prefix: "slow-short", w: 1080, h: 1920, lower: true },
};
const MODE = (process.env.MODE || "split").toLowerCase();
const M = MODES[MODE] || MODES.split;
const ID = M.lower
  ? (String(process.env.ID || "lighthouse").toLowerCase().replace(/[^0-9a-z]/g, "") || "lighthouse")
  : (String(process.env.ID || "S1E1").toUpperCase().replace(/[^0-9A-Z]/g, "") || "S1E1");

const FPS = Number(process.env.FPS || 30);
const CRF = Number(process.env.CRF || 16);
const CAP = (process.env.CAP || "png").toLowerCase();
const SQ  = Number(process.env.SQ || 92);
const W = M.w, H = M.h;
const DRAFT = process.env.DRAFT === "1";
if (MODE === "story") {
  try {
    const check = storyPreflight(ROOT, ID, { draft: DRAFT });
    if (check.missing.length) console.warn(`Draft only: ${check.missing.length} story images missing.`);
  } catch (e) { console.error(e.message); process.exit(2); }
}

const deckFile = path.resolve(ROOT, M.page);
// CAM=<clip> burns the host's footage into the narrator slot (it must be in the
// render: with the narrator moves on, the circle changes size). BOOK=8,10 adds
// full-frame bookends. DIR=0 / FX=0 switch the story motion layer parts off.
// OUTDIR=out/v5 writes somewhere else; FROM/TO (s) render only a slice (QA).
let deckUrl = pathToFileURL(deckFile).href + "?" + M.qk + "=" + ID + "&render=1";
if (process.env.CAM) deckUrl += "&cam=" + encodeURIComponent(process.env.CAM);
if (process.env.CAMSTART) deckUrl += "&camstart=" + encodeURIComponent(process.env.CAMSTART);
if (process.env.BOOK) deckUrl += "&book=" + encodeURIComponent(process.env.BOOK);
if (process.env.DIR === "0") deckUrl += "&dir=0";
if (process.env.FX === "0") deckUrl += "&fx=0";
const OUT_DIR = path.resolve(__dirname, process.env.OUTDIR || "out");
const OUT = path.resolve(OUT_DIR, `${M.prefix}-${ID}${process.env.SUFFIX || ""}${MODE === "story" && DRAFT ? "-draft" : ""}.mp4`);

if (!existsSync(deckFile)) { console.error("cannot find " + M.page); process.exit(1); }
mkdirSync(OUT_DIR, { recursive: true });

console.log(`● ${MODE} ${ID} · launching headless Chromium…`);
const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.CHROME || undefined,
  args: [
    "--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars",
    "--force-color-profile=srgb", "--allow-file-access-from-files",
    "--ignore-gpu-blocklist", "--enable-gpu-rasterization", "--enable-zero-copy",
    ...(process.env.GPUOFF ? ["--disable-gpu"] : []),
    ...(process.env.CHROME_FLAGS ? process.env.CHROME_FLAGS.split(" ").filter(Boolean) : []),
    `--window-size=${W},${H}`,
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.warn("  page error:", e.message));

const VENDOR = {
  "react.development.js":     path.resolve(__dirname, "vendor", "react.development.js"),
  "react-dom.development.js": path.resolve(__dirname, "vendor", "react-dom.development.js"),
  "babel.min.js":             path.resolve(__dirname, "vendor", "babel.min.js"),
};
if (Object.values(VENDOR).every(existsSync)) {
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const hit = Object.keys(VENDOR).find((k) => req.url().includes(k));
    if (hit) { try { return req.respond({ status: 200, contentType: "application/javascript; charset=utf-8", headers: { "Access-Control-Allow-Origin": "*" }, body: readFileSync(VENDOR[hit]) }); } catch { return req.continue(); } }
    return req.continue();
  });
}

await page.goto(deckUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.evaluate(() => Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 8000))]));
await page.waitForFunction("window.__deckControl && window.__deckControl.duration > 0", { timeout: 60000 });

const duration = await page.evaluate(() => window.__deckControl.duration);
await page.evaluate(() => { window.__deckControl.pause(); });
await new Promise((r) => setTimeout(r, 400));

const FROM = Math.max(0, Number(process.env.FROM || 0));
const TO = Math.min(duration, Number(process.env.TO || duration));
const firstFrame = Math.floor(FROM * FPS);
const totalFrames = Math.ceil(TO * FPS) - firstFrame;
// every story image decoded before frame one, so no frame catches a blank
const brokenImages = await page.evaluate(async () => {
  const results = await Promise.all(((window.STORY && window.STORY.beats) || []).map((b) =>
    new Promise((r) => {
      const im = new Image();
      im.onload = () => r(im.naturalWidth > 0 ? null : b.img);
      im.onerror = () => r(b.img);
      im.src = b.img;
    })));
  return results.filter(Boolean);
});
if (brokenImages.length && !DRAFT) {
  await browser.close();
  throw new Error(`Story images could not be decoded: ${brokenImages.join(', ')}`);
}
console.log(`● ${MODE} ${ID} · ${duration.toFixed(1)}s · ${FPS} fps · ${totalFrames} frames → ${path.basename(OUT)}`);

const FFMPEG = process.env.FFMPEG || "ffmpeg";
const ff = spawn(FFMPEG, [
  "-y", "-hide_banner", "-loglevel", "error",
  "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", String(CRF),
  "-preset", "slow", "-movflags", "+faststart", OUT,
], { stdio: ["pipe", "inherit", "inherit"] });
ff.on("error", (e) => { console.error("\n✗ ffmpeg failed: " + e.message); process.exit(1); });


// ── safety: a render must never hang. If ffmpeg dies (seen once, silently, at
// 96% of a story on this 8 GB machine) node would wait for a pipe that will
// never drain. Exit non-zero instead, so the batch retries the job.
let ffDead = false;
ff.on("close", (c) => { ffDead = true; if (c !== 0) console.error(`\n✗ ffmpeg exited early (code ${c})`); });
ff.stdin.on("error", () => { ffDead = true; });
let lastFrameAt = Date.now();
const watchdog = setInterval(() => {
  if (Date.now() - lastFrameAt > 180000) { console.error("\n✗ no frame for 3 minutes — giving up so the batch can retry"); process.exit(4); }
}, 15000);
watchdog.unref();

function bar(p) { const n = 28, f = Math.round(p * n); return "[" + "█".repeat(f) + "·".repeat(n - f) + "] " + String(Math.round(p * 100)).padStart(3) + "%"; }

const t0 = Date.now();
for (let i = 0; i < totalFrames; i++) {
  await page.evaluate((tt) => window.__deckControl.seek(tt), (firstFrame + i) / FPS);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  // footage in the camera slot: wait for the seek to land (CAM=<clip>)
  await page.evaluate(() => Promise.all([...document.querySelectorAll("video[data-cam-video]")].map((v) =>
    (v.seeking || v.readyState < 2) ? new Promise((r) => { const done = () => r(); v.addEventListener("seeked", done, { once: true });
      v.addEventListener("loadeddata", done, { once: true }); setTimeout(done, 4000); }) : null)));
  const shot = await page.screenshot(CAP === "jpeg" ? { type: "jpeg", quality: SQ, clip: { x: 0, y: 0, width: W, height: H } } : { type: "png", clip: { x: 0, y: 0, width: W, height: H } });
  if (ffDead) { console.error("\n✗ ffmpeg is gone — aborting this render"); process.exit(3); }
  const ok = ff.stdin.write(shot);
  if (!ok) await new Promise((r) => { ff.stdin.once("drain", r); ff.once("close", r); });
  lastFrameAt = Date.now();
  if (i % FPS === 0 || i === totalFrames - 1) process.stdout.write("\r● Rendering " + bar((i + 1) / totalFrames));
}
ff.stdin.end();
if (!ffDead) await new Promise((res) => ff.on("close", res));
clearInterval(watchdog);
await browser.close();
console.log(`\n✓ ${MODE} ${ID} done in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${OUT}`);
