// data-ep28.jsx — English Unlocked · Episode 28 "Giving & Taking Feedback"
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
  "Can I share one small suggestion?",
  "What worked really well was your opening.",
  "One thing I’d change is the ending.",
  "Thank you — that’s helpful to hear.",
  "Could you show me what you mean?",
];
const SLOW = [
  "Can I share… one small suggestion?",
  "What worked really well… was your opening.",
  "One thing I’d change… is the ending.",
  "Thank you… that’s helpful to hear.",
  "Could you show me… what you mean?",
];
const NATURAL = [
  "Can I share one small suggestion?",
  "What worked really well was your opening.",
  "One thing I’d change is the ending.",
  "Thank you — that’s helpful to hear.",
  "Could you show me what you mean?",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice giving and taking feedback." },
  { s: "map", t: "In a second language, honest words can sound much harder than you mean.", p: 2 },
  { s: "map", t: "After this, you can be direct, and still sound kind.", p: 2 },

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
  { s: "anchor", t: "“One thing I’d change is the ending.” — “Thank you, that’s helpful to hear.”", p: 2 },
  { s: "anchor", t: "Say the good part first. Then say the true part.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "feedback",   pos: "noun",      def: "What someone tells you about your work, so you can improve it.", anchor: "taking feedback" },
  { word: "direct",     pos: "adjective", def: "Saying the real thing clearly, without hiding it.",              anchor: "be direct" },
  { word: "honest",     pos: "adjective", def: "Saying what is really true, even when it is hard.",              anchor: "honest words" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 28, title: "Giving & Taking Feedback",
  hook: "Say the hard thing at work — and still sound kind.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
