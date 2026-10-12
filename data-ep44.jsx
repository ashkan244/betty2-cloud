// data-ep44.jsx — English Unlocked · Episode 44 "At the Hairdresser"
// Season 5 — Getting Things Done. House format (see data-ep22.jsx): short open, 5 phrases,
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
  "Just a trim, please, not too short.",
  "Could you take a little off the sides?",
  "I’d like to keep the length on top.",
  "Can you show me in the mirror?",
  "It looks great. Thank you so much.",
];
const SLOW = [
  "Just a trim, please… not too short.",
  "Could you take a little… off the sides?",
  "I’d like to keep… the length on top.",
  "Can you show me… in the mirror?",
  "It looks great… Thank you so much.",
];
const NATURAL = [
  "Just a trim, please, not too short.",
  "Could you take a little off the sides?",
  "I’d like to keep the length on top.",
  "Can you show me in the mirror?",
  "It looks great. Thank you so much.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice talking at the hairdresser." },
  { s: "map", t: "A haircut you don’t want lasts for weeks.", p: 2 },
  { s: "map", t: "After this, you can explain what you want, before the scissors start.", p: 2 },

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
  { s: "anchor", t: "“So, what are we doing today?” — “Just a trim, please, not too short.”", p: 2 },
  { s: "anchor", t: "Clear words now save you a long wait for your hair to grow.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "last", pos: "verb", def: "To continue for a period of time.", anchor: "lasts for weeks" },
  { word: "scissors", pos: "noun", def: "A tool with two blades, used for cutting.", anchor: "before the scissors" },
  { word: "save", pos: "verb", def: "To keep you from losing time, money or effort.", anchor: "Clear words now save" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 44, title: "At the Hairdresser",
  hook: "Get exactly the haircut you want — no more surprises.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
