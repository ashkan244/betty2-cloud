// data-ep35.jsx — English Unlocked · Episode 35 "Changing or Cancelling Plans"
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
  "I’m so sorry, I have to cancel.",
  "Could we move it to next week?",
  "Something came up at the last minute.",
  "Does Friday still work for you?",
  "Let’s definitely find another time soon.",
];
const SLOW = [
  "I’m so sorry… I have to cancel.",
  "Could we move it… to next week?",
  "Something came up… at the last minute.",
  "Does Friday… still work for you?",
  "Let’s definitely find… another time soon.",
];
const NATURAL = [
  "I’m so sorry, I have to cancel.",
  "Could we move it to next week?",
  "Something came up at the last minute.",
  "Does Friday still work for you?",
  "Let’s definitely find another time soon.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice changing plans." },
  { s: "map", t: "Plans change, and saying so can feel awkward.", p: 2 },
  { s: "map", t: "After this, you can change plans honestly, without guilt.", p: 2 },

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
  { s: "anchor", t: "“Could we move it to next week?” — “Sure, no problem. Just let me know.”", p: 2 },
  { s: "anchor", t: "Being honest early is the most respectful choice.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "awkward", pos: "adjective", def: "Uncomfortable — not sure what to say or do.", anchor: "can feel awkward" },
  { word: "guilt", pos: "noun", def: "The bad feeling when you think you did something wrong.", anchor: "without guilt" },
  { word: "respectful", pos: "adjective", def: "Showing that you value another person.", anchor: "most respectful choice" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 35, title: "Changing or Cancelling Plans",
  hook: "Change your plans in English — and keep the friendship.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
