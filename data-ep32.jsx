// data-ep32.jsx — English Unlocked · Episode 32 "Giving Compliments"
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
  "I really like your jacket, by the way.",
  "You did a great job on that.",
  "Where did you get it, if you don’t mind?",
  "That colour really suits you.",
  "Just wanted to say, you inspire me.",
];
const SLOW = [
  "I really like your jacket… by the way.",
  "You did a great job… on that.",
  "Where did you get it… if you don’t mind?",
  "That colour… really suits you.",
  "Just wanted to say… you inspire me.",
];
const NATURAL = [
  "I really like your jacket, by the way.",
  "You did a great job on that.",
  "Where did you get it, if you don’t mind?",
  "That colour really suits you.",
  "Just wanted to say, you inspire me.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice giving compliments." },
  { s: "map", t: "We often think kind things, but we keep them silent.", p: 2 },
  { s: "map", t: "After this, you can give a compliment that feels natural, not strange.", p: 2 },

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
  { s: "anchor", t: "Lovely work.", p: 1.5 },
  { s: "anchor", t: "Now hear it as one real moment:" },
  { s: "anchor", t: "“That colour really suits you.” — “Oh, thank you! That made my day.”", p: 2 },
  { s: "anchor", t: "A small, specific compliment is a gift people keep.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "silent", pos: "adjective", def: "Without words — not saying anything.", anchor: "keep them silent" },
  { word: "compliment", pos: "noun", def: "Something nice you say about a person.", anchor: "give a compliment" },
  { word: "specific", pos: "adjective", def: "Clear and exact, about one particular thing.", anchor: "small, specific compliment" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 32, title: "Giving Compliments",
  hook: "Say something kind in English — and make someone’s day.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
