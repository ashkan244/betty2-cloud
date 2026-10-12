// render.mjs — professional offline renderer for "English Unlocked" episodes.
//
// Loads an episode in headless Chromium, steps the timeline frame-by-frame at a
// fixed frame rate (deterministic — NOT a realtime screen capture), captures a
// pixel-perfect PNG of every frame, and pipes them straight into ffmpeg to
// encode a clean MP4. No tab focus, no dropped frames, no UI in the output.
//
// USAGE
//   1. Install ffmpeg (https://ffmpeg.org) and Node 18+.
//   2. From this folder:   npm install   then   npm run render
//   3. Output:  render/out/english-unlocked-ep01.mp4   (video only — add VO later)
//
// PICK AN EPISODE:  EP=03 npm run render     (defaults to EP=01)
//   • EP=02 renders the original standalone Ep.02 player.
//   • EP=01, 03..10 render via the shared player.html?ep=NN.
//
// QUALITY FLAGS (optional):  FPS=30 CRF=16 npm run render
//   CAP=jpeg SQ=92   capture JPEG instead of PNG — much faster, near-lossless.
//   GPUOFF=1         force software rendering (use only if GPU output looks wrong).
//   CHROME="…/chrome.exe"   use a system Chrome/Edge instead of puppeteer's bundled
//                            Chromium (only needed if `npm install` couldn't download it).
//   CHROME_FLAGS="--use-angle=d3d11"   extra Chrome flags (Windows GPU, etc.).

import puppeteer from "puppeteer";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { existsSync, mkdirSync, readFileSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ---- config ----------------------------------------------------------------
const FPS = Number(process.env.FPS || 30);
const CRF = Number(process.env.CRF || 16);          // lower = higher quality
const CAP = (process.env.CAP || "png").toLowerCase(); // "png" (lossless, best) | "jpeg" (much faster capture)
const SQ  = Number(process.env.SQ || 92);           // jpeg quality when CAP=jpeg
const W = 1920, H = 1080;
const EP = String(process.env.EP || "01").replace(/[^0-9]/g, "").padStart(2, "0") || "01";

// Map an episode id to the page that renders it.
function deckFor(ep) {
  if (ep === "02") {
    const f = path.resolve(ROOT, "English Unlocked - Ep2 v4.html");
    return { file: f, url: pathToFileURL(f).href + "?render=1" };
  }
  const f = path.resolve(ROOT, "player.html");
  // UI=v3 rolls back to the faceless layout; CAM=<path> burns footage straight
  // into the camera slot instead of compositing afterwards (see compose.mjs).
  let u = pathToFileURL(f).href + "?ep=" + ep + "&render=1";
  if (process.env.UI) u += "&ui=" + encodeURIComponent(process.env.UI);
  if (process.env.CAM) u += "&cam=" + encodeURIComponent(process.env.CAM);
  if (process.env.CAMSTART) u += "&camstart=" + encodeURIComponent(process.env.CAMSTART);
  // director + motion layer are ON by default in the page; DIR=0 / FX=0 switch them off
  if (process.env.DIR === "0") u += "&dir=0";
  if (process.env.FX === "0") u += "&fx=0";
  return { file: f, url: u };
}

const deck = deckFor(EP);
// OUTDIR=out/v5 writes somewhere else; SUFFIX=-face tags the file; FROM/TO (s) render a slice
const OUT_DIR = path.resolve(__dirname, process.env.OUTDIR || "out");
const OUT = path.resolve(OUT_DIR, `english-unlocked-ep${EP}${process.env.SUFFIX || ""}.mp4`);

if (!existsSync(deck.file)) {
  console.error("✗ Cannot find the player at:\n  " + deck.file +
    "\n  Keep this render/ folder next to the episode files.");
  process.exit(1);
}
mkdirSync(OUT_DIR, { recursive: true });

console.log(`● Episode ${EP} · launching headless Chromium…`);
const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.CHROME || undefined,   // use system Chrome/Edge if given
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "--force-color-profile=srgb",
    "--allow-file-access-from-files",   // let Babel XHR the local .jsx files
    // GPU ON by default — the blur/grain layers are ~5x faster to capture with a
    // real GPU. Chrome falls back to software automatically if there is none.
    // Force software with GPUOFF=1; add machine-specific flags via CHROME_FLAGS.
    "--ignore-gpu-blocklist",
    "--enable-gpu-rasterization",
    "--enable-zero-copy",
    ...(process.env.GPUOFF ? ["--disable-gpu"] : []),
    ...(process.env.CHROME_FLAGS ? process.env.CHROME_FLAGS.split(" ").filter(Boolean) : []),
    `--window-size=${W},${H}`,
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.warn("  page error:", e.message));

// Serve the big CDN libs (react, react-dom, babel — ~4.3 MB) from local vendor/
// so a render never depends on a slow or flaky network. The local files are
// byte-identical to the pinned CDN versions, so the page's SRI integrity hashes
// still match. Everything else (fonts, the local .jsx files) passes through.
const VENDOR = {
  "react.development.js":     path.resolve(__dirname, "vendor", "react.development.js"),
  "react-dom.development.js": path.resolve(__dirname, "vendor", "react-dom.development.js"),
  "babel.min.js":             path.resolve(__dirname, "vendor", "babel.min.js"),
};
const haveVendor = Object.values(VENDOR).every(existsSync);
if (haveVendor) {
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const hit = Object.keys(VENDOR).find((k) => req.url().includes(k));
    if (hit) {
      try {
        return req.respond({
          status: 200,
          contentType: "application/javascript; charset=utf-8",
          // the script tags use crossorigin="anonymous", so the response must
          // carry CORS headers (the real CDN sends these) or Chrome blocks it.
          headers: { "Access-Control-Allow-Origin": "*" },
          body: readFileSync(VENDOR[hit]),
        });
      } catch { return req.continue(); }
    }
    return req.continue();
  });
} else {
  console.warn("  (no vendor/ libs found — falling back to CDN; run from render/ after vendoring)");
}

console.log("● Loading deck…");
// "domcontentloaded" (not "networkidle0"): with the libs served locally the page
// is ready almost instantly; we must not stall waiting on slow Google-Fonts idle.
await page.goto(deck.url, { waitUntil: "domcontentloaded", timeout: 60000 });

// wait for fonts (but never hang on a slow/dead font CDN — cap the wait at 8s)
await page.evaluate(() =>
  Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 8000))])
);
// wait for the timeline control API to be ready (libs are local now, so this is
// quick; the generous timeout just absorbs Babel compiling the .jsx on a slow box)
await page.waitForFunction(
  "window.__deckControl && window.__deckControl.duration > 0",
  { timeout: 60000 }
);

const duration = await page.evaluate(() => window.__deckControl.duration);
const title = await page.evaluate(() => (window.EPISODE && window.EPISODE.title) || "");
await page.evaluate(() => { window.__deckControl.pause(); });
await new Promise((r) => setTimeout(r, 400)); // settle fonts/layout

const FROM = Math.max(0, Number(process.env.FROM || 0));
const TO = Math.min(duration, Number(process.env.TO || duration));
const firstFrame = Math.floor(FROM * FPS);
const totalFrames = Math.ceil(TO * FPS) - firstFrame;
console.log(`● "${title}" · ${duration.toFixed(1)}s · ${FPS} fps · ${totalFrames} frames → ${path.basename(OUT)}`);

// ---- ffmpeg ----------------------------------------------------------------
// Honor an explicit FFMPEG path (winget installs aren't always on PATH).
const FFMPEG = process.env.FFMPEG || "ffmpeg";
const ff = spawn(FFMPEG, [
  "-y", "-hide_banner", "-loglevel", "error",
  "-f", "image2pipe",
  "-framerate", String(FPS),
  "-i", "-",
  "-c:v", "libx264",
  "-pix_fmt", "yuv420p",
  "-crf", String(CRF),
  "-preset", "slow",
  "-movflags", "+faststart",
  OUT,
], { stdio: ["pipe", "inherit", "inherit"] });

ff.on("error", (e) => {
  console.error("\n✗ ffmpeg failed to start. Is ffmpeg installed and on your PATH?\n  " + e.message);
  process.exit(1);
});


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

// ---- frame loop ------------------------------------------------------------
function bar(p) {
  const n = 28, f = Math.round(p * n);
  return "[" + "█".repeat(f) + "·".repeat(n - f) + "] " + String(Math.round(p * 100)).padStart(3) + "%";
}

const t0 = Date.now();
for (let i = 0; i < totalFrames; i++) {
  const t = (firstFrame + i) / FPS;
  await page.evaluate((tt) => window.__deckControl.seek(tt), t);
  // one rAF so React commits the new frame before we capture
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  // a <video> in the camera slot must finish seeking before the frame is taken,
  // or the capture shows the previous clip frame (render with CAM=<clip>)
  await page.evaluate(() => Promise.all([...document.querySelectorAll("video[data-cam-video]")].map((v) =>
    (v.seeking || v.readyState < 2) ? new Promise((r) => { const done = () => r(); v.addEventListener("seeked", done, { once: true });
      v.addEventListener("loadeddata", done, { once: true }); setTimeout(done, 4000); }) : null)));

  const shot = await page.screenshot(
    CAP === "jpeg"
      ? { type: "jpeg", quality: SQ, clip: { x: 0, y: 0, width: W, height: H } }
      : { type: "png", clip: { x: 0, y: 0, width: W, height: H } }
  );
  if (ffDead) { console.error("\n✗ ffmpeg is gone — aborting this render"); process.exit(3); }
  const ok = ff.stdin.write(shot);
  if (!ok) await new Promise((r) => { ff.stdin.once("drain", r); ff.once("close", r); });
  lastFrameAt = Date.now();

  if (i % FPS === 0 || i === totalFrames - 1) {
    process.stdout.write("\r● Rendering " + bar((i + 1) / totalFrames));
  }
}

ff.stdin.end();
if (!ffDead) await new Promise((res) => ff.on("close", res));
clearInterval(watchdog);
await browser.close();

const secs = ((Date.now() - t0) / 1000).toFixed(0);
console.log(`\n✓ Episode ${EP} done in ${secs}s → ${OUT}`);
console.log("  Video only. Drop your voiceover onto it in any editor (the pauses are pre-timed).");
