// data-ep23.jsx — English Unlocked · Episode 23 "Shopping & Returns"
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
  "Do you have this in a larger size?",
  "I’d like to return this, please.",
  "It stopped working after two days.",
  "Could I get a refund instead?",
  "Is there anything you can do?",
];
const SLOW = [
  "Do you have this… in a larger size?",
  "I’d like to return this… please.",
  "It stopped working… after two days.",
  "Could I get… a refund instead?",
  "Is there anything… you can do?",
];
const NATURAL = [
  "Do you have this in a larger size?",
  "I’d like to return this, please.",
  "It stopped working after two days.",
  "Could I get a refund instead?",
  "Is there anything you can do?",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice shopping, returns, and small complaints." },
  { s: "map", t: "Many learners keep a broken thing, just to avoid the conversation.", p: 2 },
  { s: "map", t: "After this, you can ask firmly — and stay completely polite.", p: 2 },

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
  { s: "anchor", t: "“It stopped working after two days.” — “I’m sorry. Would you like a refund?”", p: 2 },
  { s: "anchor", t: "Polite is not the same as quiet.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "refund",  pos: "noun",      def: "Money given back to you when you return something.", anchor: "shopping, returns" },
  { word: "firmly",  pos: "adverb",    def: "In a strong, certain way — without being rude.",     anchor: "ask firmly" },
  { word: "avoid",   pos: "verb",      def: "To stay away from something you do not want to do.", anchor: "to avoid the conversation" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 23, title: "Shopping & Returns",
  hook: "Return it, replace it, or get your money back — politely.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
