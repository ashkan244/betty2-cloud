// data-ep31.jsx — English Unlocked · Episode 31 "Saying Thank You Properly"
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
  "Thank you so much for your help.",
  "I really appreciate you doing this.",
  "That was so kind of you.",
  "Could I buy you a coffee sometime?",
  "I won’t forget this, thank you.",
];
const SLOW = [
  "Thank you so much… for your help.",
  "I really appreciate… you doing this.",
  "That was so kind… of you.",
  "Could I buy you… a coffee sometime?",
  "I won’t forget this… thank you.",
];
const NATURAL = [
  "Thank you so much for your help.",
  "I really appreciate you doing this.",
  "That was so kind of you.",
  "Could I buy you a coffee sometime?",
  "I won’t forget this, thank you.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice saying thank you — properly." },
  { s: "map", t: "When someone goes out of their way, “thanks” can feel too small.", p: 2 },
  { s: "map", t: "After this, your thanks will sound warm and sincere.", p: 2 },

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
  { s: "anchor", t: "Well done.", p: 1.5 },
  { s: "anchor", t: "Now hear it as one real moment:" },
  { s: "anchor", t: "“Thank you so much for your help.” — “Oh, it was nothing. Anytime.”", p: 2 },
  { s: "anchor", t: "A grateful word costs nothing, and it is remembered.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "go out of your way", pos: "phrase", def: "To make a special effort to help someone.", anchor: "out of their way" },
  { word: "sincere", pos: "adjective", def: "Honest and real — you truly mean it.", anchor: "warm and sincere" },
  { word: "grateful", pos: "adjective", def: "Feeling thankful for something someone did.", anchor: "A grateful word" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 31, title: "Saying Thank You Properly",
  hook: "Thank someone in English — and mean every word.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
