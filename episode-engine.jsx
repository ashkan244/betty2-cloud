// episode-engine.jsx — shared builder for English Unlocked "slow shadowing" episodes.
//
// Every episode (data-epNN.jsx) is just CONTENT: a few ordered arrays of lines.
// This engine turns that content into the fully-timed `window.EPISODE` object the
// UI renders (per-word karaoke timings, pauses, phase rail, intro/outro windows).
//
// It is the ONE engine for the whole series — episodes never re-implement timing.
//
// ── THE 6-PHASE SHADOWING FORMAT ─────────────────────────────────────────────
//   1 Grounding     — calm arrival + breathing
//   2 Map           — what we practice today (Betty on screen)
//   3 Listening     — hear each phrase (👂 ear, no countdown)
//   4 Articulation  — repeat slowly, with built-in "…" pacing breaks (🎤 + count)
//   5 Rhythm        — repeat at a natural conversational pace (🎤 + count)
//   6 Anchor        — closing reassurance (Betty on screen)
//
// English ONLY on screen. The pauses are the learner's speaking time — keep them.
//
// ── AUTHORING (in a data file) ───────────────────────────────────────────────
//   window.EPISODE = buildEpisodeEU({
//     epNumber: 1, title: "Survival Phrases",
//     sections: SECTIONS, phaseOrder: PHASE_ORDER,   // see data-ep01.jsx
//     script: [ ...line objects in order... ],
//     vocab: [],                                     // optional
//     config: { rate: 0.5 },                         // optional overrides
//   });
//
// A line object: { s, t, p?, breath?, betty?, phrase?, pass?, speaker?, youTurn? }
//   s       section key (must exist in `sections`)
//   t       the English text shown + spoken
//   p       OPTIONAL seconds of silence AFTER the line (the speak/rest pause)
//   breath  OPTIONAL "in" | "out" — renders as a slow 5s breathing beat
//   betty   OPTIONAL force the Betty portrait (map & anchor force it already)
//   phrase  OPTIONAL render large & italic (a target practice phrase)
//   pass    OPTIONAL "listen" (ear) | "repeat" (mic + countdown ring)
//   speaker OPTIONAL "betty" — a quoted prompt line in the Ep10 simulation
//   youTurn OPTIONAL marks the learner's expected reply in the simulation
//
// Helper: euPass(section, texts, pass, pause) → expands an array of phrase
// strings into one practice pass (used for Listening / Articulation / Rhythm).
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  const DEFAULTS = {
    rate: 0.50,        // seconds per spoken word (slow, deliberate)
    base: 0.90,        // base seconds added to every spoken line
    breathDur: 5.0,    // duration of a breathe-in / breathe-out beat
    hookDur: 8.0,      // COLD OPEN: the promise, on camera, before anything else
    introDur: 2.0,     // brand stinger (was 4.6 — see the retention notes below)
    tailDur: 1.0,      // breath after the last line
    recapDur: 6.0,     // silent payoff card: all of today's phrases at once
    outroDur: 5.4,     // gentle closing + subscribe hook
    bettySections: ["map", "anchor"],  // sections that always show the portrait
    adaptivePause: true,  // size each repeat pause to the phrase, not a flat 5s
    pausePerWord: 0.55,   // a learner repeats slower than the model speaks
    pauseBase: 1.0,
    pauseMin: 2.6,
    pauseMax: 7.0,
  };

  // ── why the timing looks like this (measured with render/analyze.mjs) ──────
  // The old shape put 4.6s of static logo, then 84s of Grounding + Map, before
  // the learner heard a single target phrase (first phrase at ~1:28 of a 5:00
  // video) — the worst possible opening for retention. And every "repeat" pause
  // was a flat 5.0s regardless of phrase length, so short phrases felt dead and
  // long ones felt rushed.
  //
  // The fix keeps the whole pedagogy and only changes the packaging:
  //   · a COLD OPEN states the promise (and plays the phrases) in the first 8s
  //   · the brand card shrinks 4.6s → 2.0s
  //   · repeat pauses scale with the phrase (words × 0.55 + 1.0, 2.6–7.0s)
  //   · a silent RECAP card pays the episode off before the outro
  // Nothing in any data-epNN.jsx had to change.

  // spread a line's duration across its words (longer words get a little more)
  function buildWordsExact(toks, weights, total, start, dur) {
    let c = start;
    return toks.map((tk, wi) => {
      const d = (weights[wi] / total) * dur;
      const w = { text: tk, start: c, end: c + d };
      c += d;
      return w;
    });
  }

  // expand an array of phrase strings into one practice pass
  function euPass(section, texts, pass, pause) {
    return texts.map((t) => ({ s: section, t, phrase: true, pass, p: pause }));
  }

  function buildEpisodeEU(spec) {
    const cfg = Object.assign({}, DEFAULTS, spec.config || {});
    // ?ui=v3 is a true rollback: the old layer knows nothing about the cold open
    // or the recap card, so it also gets the old timing.
    if (typeof window !== "undefined" && window.__EU_UI === "v3") {
      cfg.hookDur = 0; cfg.recapDur = 0; cfg.introDur = 4.6; cfg.tailDur = 1.6;
      cfg.adaptivePause = false;
    }
    // MEASURED timing (footage-first, CLAUDE.md §18): render/align.mjs writes timing/epNN.js
    // from the host's own recording; player.html loads it with ?timed=1. Every line then sits
    // exactly where the host said it, and the windows match the edited host clip.
    const TM = typeof window !== "undefined" && window.__EU_TIMING && window.__EU_TIMING.ep === spec.epNumber
      && window.__EU_UI !== "v3" ? window.__EU_TIMING : null;
    if (TM) {
      if (TM.lines.length !== spec.script.length) throw new Error(`timing/ep${spec.epNumber}: ${TM.lines.length} lines, script has ${spec.script.length} — re-run align.mjs`);
      Object.assign(cfg, { hookDur: TM.hookDur, introDur: TM.introDur, tailDur: TM.tailDur, recapDur: TM.recapDur, outroDur: TM.outroDur });
    }
    const SECTIONS = spec.sections;
    const PHASE_ORDER = spec.phaseOrder;
    const SCRIPT = spec.script;
    const bettySet = new Set(cfg.bettySections);

    // cold open first, then the brand stinger, then the script
    const hookDur = cfg.hookDur > 0 ? cfg.hookDur : 0;
    let t = hookDur + cfg.introDur;
    const lines = SCRIPT.map((item, i) => {
      const meta = SECTIONS[item.s];
      if (!meta) throw new Error("Unknown section '" + item.s + "' at line " + i);
      const text = item.t || "";
      const isBreath = !!item.breath;
      const nWords = text ? text.split(" ").length : 0;
      const dur = isBreath ? cfg.breathDur : cfg.base + nWords * cfg.rate;
      const start = t;
      const end = start + dur;
      // A repeat pause is the learner's speaking time — it should match the
      // phrase, not be a flat constant. Listening/rest pauses stay as authored.
      let pause = item.p || 0;
      if (cfg.adaptivePause && item.pass === "repeat" && nWords > 0) {
        const want = nWords * cfg.pausePerWord + cfg.pauseBase;
        pause = Math.max(cfg.pauseMin, Math.min(cfg.pauseMax, want));
      }
      const m = TM && TM.lines[i];
      if (m) pause = m.pause;
      const pauseEnd = (m ? m.end : end) + pause;
      const bettyVisible = bettySet.has(item.s) || item.betty === true;
      const pauseType = item.pass ? item.pass : (pause > 0 ? "rest" : null);
      t = pauseEnd;
      const toks = text.split(" ");
      const weights = toks.map((tk) => Math.max(2, tk.replace(/[.,!?;:"'‘’“”…]/g, "").length) + 1.5);
      const total = weights.reduce((a, b) => a + b, 0) || 1;
      return {
        index: i, section: item.s, phase: meta.n, phaseLabel: meta.label,
        text, phrase: !!item.phrase, breath: item.breath || null,
        pass: item.pass || null, speaker: item.speaker || null, youTurn: !!item.youTurn,
        start: m ? m.start : start, end: m ? m.end : end, pause, pauseEnd, bettyVisible, pauseType,
        words: m ? toks.map((tk, wi) => ({ text: tk, start: m.words[wi].start, end: m.words[wi].end }))
          : buildWordsExact(toks, weights, total, start, dur),
      };
    });

    // attach vocab to the calm (non-phrase) line that contains its anchor text
    const vocab = (spec.vocab || []).map((v) => {
      const ln = lines.find((l) => !l.phrase && l.text.toLowerCase().includes(v.anchor.toLowerCase()));
      if (!ln) return null;
      return { ...v, show: ln.start + 0.5, hide: ln.pauseEnd + 0.4 };
    }).filter(Boolean);

    // today's phrases, in order, taken from the LISTEN pass (the clean variants
    // — no "…" pacing breaks). Used by the cold open and the recap card.
    const seen = {};
    const phraseList = lines
      .filter((l) => l.phrase && l.pass === "listen" && !seen[l.text] && (seen[l.text] = 1))
      .map((l) => l.text);
    const promise = spec.hook || (phraseList.length
      ? `${phraseList.length} ways to sound natural — ${spec.title}.`
      : spec.title);

    const contentEnd = t;
    const recapStart = contentEnd + cfg.tailDur;
    const recapDur = cfg.recapDur > 0 && phraseList.length ? cfg.recapDur : 0;
    const outroStart = recapStart + recapDur;
    const duration = outroStart + cfg.outroDur;
    const phases = PHASE_ORDER.map((k) => ({ key: k, ...SECTIONS[k] }));

    return {
      lines, vocab, duration, phases, phraseList,
      epNumber: spec.epNumber, title: spec.title,
      ...(TM && TM.face ? { face: TM.face } : {}),   // where the host's face sits in their footage
      contentStart: hookDur + cfg.introDur, contentEnd: recapDur ? contentEnd : outroStart,
      hook: hookDur ? { start: 0, end: hookDur, text: promise, phrases: phraseList } : null,
      intro: { start: hookDur, end: hookDur + cfg.introDur },
      recap: recapDur ? { start: recapStart, end: recapStart + recapDur, phrases: phraseList } : null,
      outro: { start: outroStart, end: duration },
    };
  }

  window.buildEpisodeEU = buildEpisodeEU;
  window.euPass = euPass;
})();
