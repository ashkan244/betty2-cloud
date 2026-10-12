// data-ep25.jsx — English Unlocked · Episode 25 "Finding a Place to Live"
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
  "What’s included in the monthly rent?",
  "Is the price negotiable at all?",
  "When would I be able to move in?",
  "Are pets allowed in the building?",
  "Could I take one more look, please?",
];
const SLOW = [
  "What’s included… in the monthly rent?",
  "Is the price… negotiable at all?",
  "When would I… be able to move in?",
  "Are pets allowed… in the building?",
  "Could I take one more look… please?",
];
const NATURAL = [
  "What’s included in the monthly rent?",
  "Is the price negotiable at all?",
  "When would I be able to move in?",
  "Are pets allowed in the building?",
  "Could I take one more look, please?",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice finding a place to live." },
  { s: "map", t: "You are about to sign something — so you must be able to ask.", p: 2 },
  { s: "map", t: "After this, you can view a home and ask every real question.", p: 2 },

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
  { s: "anchor", t: "“What’s included in the monthly rent?” — “Water and heating. Not electricity.”", p: 2 },
  { s: "anchor", t: "Ask before you sign. Always.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "rent",       pos: "noun",      def: "The money you pay each month to live somewhere.",   anchor: "a place to live" },
  { word: "sign",       pos: "verb",      def: "To write your name on a contract to agree to it.",  anchor: "about to sign" },
  { word: "view",       pos: "verb",      def: "To visit a home and look at it before deciding.",   anchor: "view a home" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 25, title: "Finding a Place to Live",
  hook: "Renting in English — ask everything before you sign.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
