// data-ep39.jsx — English Unlocked · Episode 39 "At the Pharmacy"
// Season 4 — Closer to People. House format (see data-ep22.jsx): short open, 5 phrases,
// contextual exchange in the Anchor. English ONLY on screen. Timed by episode-engine.jsx.

const SECTIONS = {
  grounding:    { n: 1, label: "Grounding" },
  map:          { n: 2, label: "The Map" },
  listening:    { n: 3, label: "Listening" },
  articulation: { n: 4, label: "Articulation" },
  rhythm:       { n: 5, label: "Rhythm" },
  anchor:       { n: 6, label: "The Anchor" },
};
const PHASE_ORDER = ["grounding", "map", "listening", "articulation", "rhythm", "anchor"];

const LISTEN = [
  "Do you have something for a headache?",
  "Is it safe to take with coffee?",
  "How many times a day, please?",
  "I’m allergic to some medicines, just so you know.",
  "Great, I’ll take this one, thanks.",
];
const SLOW = [
  "Do you have something… for a headache?",
  "Is it safe… to take with coffee?",
  "How many times a day… please?",
  "I’m allergic to some medicines… just so you know.",
  "Great… I’ll take this one, thanks.",
];
const NATURAL = [
  "Do you have something for a headache?",
  "Is it safe to take with coffee?",
  "How many times a day, please?",
  "I’m allergic to some medicines, just so you know.",
  "Great, I’ll take this one, thanks.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice talking at the pharmacy." },
  { s: "map", t: "Medicine is serious, and guessing is not safe.", p: 2 },
  { s: "map", t: "After this, you can ask exactly how and when to take it.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "First, just listen." },
  ...euPass("listening", LISTEN, "listen", 3.5),

  // 4 — Articulation
  { s: "articulation", t: "Now it is your turn. Slowly, with a calm voice." },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Rhythm
  { s: "rhythm", t: "Good. Now let it flow, at natural speed." },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor
  { s: "anchor", t: "Very good.", p: 1.5 },
  { s: "anchor", t: "Now hear it as one real moment:" },
  { s: "anchor", t: "“Do you have something for a headache?” — “Yes, try these. Two at a time, with water.”", p: 2 },
  { s: "anchor", t: "A pharmacist is an expert you can ask, with no appointment.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "guess", pos: "verb", def: "To choose an answer when you are not sure.", anchor: "guessing is not safe" },
  { word: "exactly", pos: "adverb", def: "Completely correct, with no small mistakes.", anchor: "ask exactly how" },
  { word: "pharmacist", pos: "noun", def: "A person trained to prepare and explain medicines.", anchor: "A pharmacist is an expert" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 39, title: "At the Pharmacy",
  hook: "Get the right medicine — ask the pharmacist with confidence.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
