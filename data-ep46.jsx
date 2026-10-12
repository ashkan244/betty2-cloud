// data-ep46.jsx — English Unlocked · Episode 46 "Talking to a Neighbour"
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
  "Hi, sorry to bother you so late.",
  "The music is a bit loud tonight.",
  "Could you turn it down a little?",
  "Is that okay with you?",
  "Thanks so much, I really appreciate it.",
];
const SLOW = [
  "Hi… sorry to bother you so late.",
  "The music is… a bit loud tonight.",
  "Could you turn it down… a little?",
  "Is that… okay with you?",
  "Thanks so much… I really appreciate it.",
];
const NATURAL = [
  "Hi, sorry to bother you so late.",
  "The music is a bit loud tonight.",
  "Could you turn it down a little?",
  "Is that okay with you?",
  "Thanks so much, I really appreciate it.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice talking to a neighbour about a problem." },
  { s: "map", t: "Neighbours can be friends — or a daily source of stress.", p: 2 },
  { s: "map", t: "After this, you can raise a problem kindly, and stay on good terms.", p: 2 },

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
  { s: "anchor", t: "“Could you turn it down a little?” — “Oh, sorry! I didn’t realise. Of course.”", p: 2 },
  { s: "anchor", t: "Most people are kind when you speak to them kindly.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "source", pos: "noun", def: "The place something comes from.", anchor: "daily source of stress" },
  { word: "on good terms", pos: "phrase", def: "Having a friendly relationship with someone.", anchor: "stay on good terms" },
  { word: "kindly", pos: "adverb", def: "In a gentle, friendly way.", anchor: "speak to them kindly" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 46, title: "Talking to a Neighbour",
  hook: "Talk to a noisy neighbour — and stay on good terms.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
