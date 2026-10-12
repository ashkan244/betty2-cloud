// data-ep24.jsx — English Unlocked · Episode 24 "Money, Bills & Paperwork"
// Season 3 — Out in the World. Short-open build (see data-ep21.jsx header).
// English ONLY on screen. Timed by episode-engine.jsx.

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
  "I think there’s a mistake on my bill.",
  "Could you explain this charge, please?",
  "What documents do I need to bring?",
  "How long does the transfer usually take?",
  "Could you send me that in writing?",
];
const SLOW = [
  "I think… there’s a mistake on my bill.",
  "Could you explain… this charge, please?",
  "What documents… do I need to bring?",
  "How long… does the transfer usually take?",
  "Could you send me that… in writing?",
];
const NATURAL = [
  "I think there’s a mistake on my bill.",
  "Could you explain this charge, please?",
  "What documents do I need to bring?",
  "How long does the transfer usually take?",
  "Could you send me that in writing?",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice banks, bills, and paperwork." },
  { s: "map", t: "These rooms are where unclear English costs you money.", p: 2 },
  { s: "map", t: "After this, you can question a charge and ask for proof.", p: 2 },

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
  { s: "anchor", t: "Beautifully done.", p: 1.5 },
  { s: "anchor", t: "Now hear it as one real moment:" },
  { s: "anchor", t: "“Could you explain this charge, please?” — “Of course. Let me check that for you.”", p: 2 },
  { s: "anchor", t: "One clear question can save a long argument.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "unclear",   pos: "adjective", def: "Not easy to understand — leaving room for mistakes.", anchor: "unclear English" },
  { word: "paperwork", pos: "noun", def: "The forms and documents an office needs from you.",      anchor: "bills, and paperwork" },
  { word: "proof",     pos: "noun", def: "Something written that shows a thing is true.",          anchor: "ask for proof" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 24, title: "Money, Bills & Paperwork",
  hook: "Five phrases that protect your money in English.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
