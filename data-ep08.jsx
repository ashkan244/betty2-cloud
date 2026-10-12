// data-ep08.jsx — English Unlocked · Episode 08 "Expressing Opinions"
// How to share your opinion without fear of judgment.
// 6-phase slow shadowing. English ONLY on screen. Timed by episode-engine.jsx.

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
  "The way I see it…",
  "If you ask me…",
  "I get the feeling that…",
  "From my perspective…",
  "To be honest, I think…",
];
const SLOW = [
  "The way… I see it…",
  "If you… ask me…",
  "I get the feeling… that…",
  "From my… perspective…",
  "To be honest… I think…",
];
const NATURAL = [
  "The way I see it…",
  "If you ask me…",
  "I get the feeling that…",
  "From my perspective…",
  "To be honest, I think…",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome to your shadowing practice." },
  { s: "grounding", t: "Take a deep breath in…", breath: "in" },
  { s: "grounding", t: "And release.", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we are practicing Expressing Opinions." },
  { s: "map", t: "Sharing an opinion can feel vulnerable. You might worry about sounding too direct or aggressive.", p: 2 },
  { s: "map", t: "After this, you can share your perspective, clearly and kindly.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "Just listen." },
  { s: "listening", t: "Feel the balance of politeness and confidence.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Slow Articulation
  { s: "articulation", t: "Now, practice with me." },
  { s: "articulation", t: "Listen. And repeat.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Natural Rhythm
  { s: "rhythm", t: "Excellent." },
  { s: "rhythm", t: "Now, the natural flow. Speak as if you are in a calm meeting.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 5),

  // 6 — The Anchor
  { s: "anchor", t: "You did perfectly.", p: 2 },
  { s: "anchor", t: "You don’t have to be right all the time. You just have to be real." },
  { s: "anchor", t: "Your thoughts bring value to the table.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "vulnerable", pos: "adjective", def: "Open to being hurt — unprotected.", anchor: "feel vulnerable" },
  { word: "perspective", pos: "noun", def: "Your own way of seeing something.", anchor: "share your perspective" },
  { word: "value", pos: "noun", def: "Something worth having — worth listening to.", anchor: "bring value" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 8, title: "Expressing Opinions",
  hook: "Say what you think in English — clear and still kind.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
