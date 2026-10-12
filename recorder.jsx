// recorder.jsx — one-click in-tab video export for the English Unlocked deck.
// Adds a floating "Export Video" button. On click it captures THIS tab
// (one-time browser permission), hides ALL on-screen chrome (including its own
// status — shown in the tab title instead so it never lands in the recording),
// restarts the timeline from 0, plays through once, and downloads a .webm.
// Video only — add the voiceover in an editor.

(function () {
  function getDuration() {
    return (window.__deckControl && window.__deckControl.duration) ||
           (window.EPISODE && window.EPISODE.duration) || 60;
  }

  // per-episode download name (so exporting all 10 gives distinct files)
  function getFilename() {
    var ep = window.EPISODE && window.EPISODE.epNumber;
    var n = (ep != null) ? String(ep).padStart(2, "0") : "";
    return "english-unlocked-ep" + n + ".webm";
  }

  function findPlaybackBar() {
    const canvas = [...document.querySelectorAll("div")].find((d) => {
      const s = d.style;
      return s.transform && s.transform.includes("scale(") && s.width &&
             parseInt(s.width) >= 1000;
    });
    if (!canvas) return null;
    const canvasArea = canvas.parentElement;
    const stageRoot = canvasArea ? canvasArea.parentElement : null;
    return stageRoot ? stageRoot.children[1] : null; // PlaybackBar is 2nd child
  }

  function pickMime() {
    const cands = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
    for (const c of cands) {
      if (window.MediaRecorder && MediaRecorder.isTypeSupported(c)) return c;
    }
    return "video/webm";
  }

  // ---- button --------------------------------------------------------------
  const btn = document.createElement("button");
  btn.id = "eu-export-btn";
  btn.innerHTML = "&#9679;&nbsp; Export Video";
  Object.assign(btn.style, {
    position: "fixed", right: "20px", top: "20px", zIndex: "99999",
    font: "600 14px/1 'Hanken Grotesk', system-ui, sans-serif",
    letterSpacing: "0.04em", color: "#0a0e12", background: "#e9c46a",
    border: "none", borderRadius: "10px", padding: "12px 18px",
    cursor: "pointer", boxShadow: "0 8px 24px -8px rgba(0,0,0,0.6)",
    display: "flex", alignItems: "center", gap: "2px",
  });
  document.body.appendChild(btn);

  // a small pre-record dialog (shown BEFORE capture starts, so it's never recorded)
  const note = document.createElement("div");
  Object.assign(note.style, {
    position: "fixed", right: "20px", top: "20px", zIndex: "99999",
    font: "500 13px/1.5 'Hanken Grotesk', system-ui, sans-serif",
    color: "#f4f1ea", background: "rgba(18,26,32,0.96)",
    border: "1px solid rgba(233,196,106,0.4)", borderRadius: "10px",
    padding: "14px 18px", maxWidth: "340px", display: "none",
    boxShadow: "0 8px 24px -8px rgba(0,0,0,0.6)",
  });
  document.body.appendChild(note);
  const showNote = (html) => { note.innerHTML = html; note.style.display = "block"; };
  const hideNote = () => { note.style.display = "none"; };

  const origTitle = document.title;
  let recording = false;

  btn.addEventListener("click", async () => {
    if (recording) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      showNote("Your browser can’t record. Use <b>Chrome</b> or <b>Edge</b> on desktop.");
      setTimeout(hideNote, 4000);
      return;
    }
    recording = true;
    btn.style.display = "none";

    let stream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30, width: 1920, height: 1080 },
        audio: false,
        preferCurrentTab: true,
        selfBrowserSurface: "include",
      });
    } catch (err) {
      showNote("Recording cancelled.");
      btn.style.display = "flex";
      recording = false;
      setTimeout(hideNote, 2500);
      return;
    }

    const bar = findPlaybackBar();
    const ctl = window.__deckControl;

    // hide ALL chrome so the capture is clean
    if (bar) bar.style.visibility = "hidden";
    hideNote();
    document.body.style.cursor = "none";

    // restart from 0 (reliable, via the deck control API)
    if (ctl) { ctl.reset(); } 
    await new Promise((r) => setTimeout(r, 250));

    const chunks = [];
    const mime = pickMime();
    const recr = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 12000000 });
    recr.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };

    const cleanup = () => {
      if (bar) bar.style.visibility = "";
      document.body.style.cursor = "";
      document.title = origTitle;
      stream.getTracks().forEach((t) => t.stop());
      btn.style.display = "flex";
      recording = false;
    };

    recr.onstop = () => {
      const blob = new Blob(chunks, { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = getFilename();
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      cleanup();
      showNote("&#10003; Saved <b>" + getFilename() + "</b>.<br>Add your voiceover in an editor.");
      setTimeout(hideNote, 6000);
    };

    stream.getVideoTracks()[0].addEventListener("ended", () => {
      if (recr.state !== "inactive") recr.stop();
    });

    // start recording, THEN start playback from 0
    recr.start(100);
    await new Promise((r) => setTimeout(r, 120));
    if (ctl) { ctl.restart(); }

    // progress shown ONLY in the tab title (never on the recorded canvas)
    const startedAt = performance.now();
    const total = (getDuration() + 0.6) * 1000;
    const tick = () => {
      if (recr.state === "inactive") return;
      const elapsed = performance.now() - startedAt;
      const remain = Math.max(0, Math.ceil((total - elapsed) / 1000));
      document.title = "● REC — " + remain + "s left — " + origTitle;
      if (elapsed >= total) { recr.stop(); return; }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
})();
