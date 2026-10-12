// data-ep33.jsx — English Unlocked · Episode 33 "Talking About How You Feel"
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
  "I’m feeling a little stressed today.",
  "Honestly, I’m not sure how I feel.",
  "Could I tell you something personal?",
  "I’d rather talk about it later, if that’s okay.",
  "Thanks for listening. I feel better now.",
];
const SLOW = [
  "I’m feeling… a little stressed today.",
  "Honestly… I’m not sure how I feel.",
  "Could I tell you… something personal?",
  "I’d rather talk about it later… if that’s okay.",
  "Thanks for listening… I feel better now.",
];
const NATURAL = [
  "I’m feeling a little stressed today.",
  "Honestly, I’m not sure how I feel.",
  "Could I tell you something personal?",
  "I’d rather talk about it later, if that’s okay.",
  "Thanks for listening. I feel better now.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice talking about feelings." },
  { s: "map", t: "Feelings are hard to name, even in your own language.", p: 2 },
  { s: "map", t: "After this, you can share how you feel, simply and honestly.", p: 2 },

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
  { s: "anchor", t: "That was calm and clear.", p: 1.5 },
  { s: "anchor", t: "Now hear it as one real moment:" },
  { s: "anchor", t: "“I’m feeling a little stressed today.” — “Do you want to talk about it?”", p: 2 },
  { s: "anchor", t: "When you put a feeling into words, it becomes lighter.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "name", pos: "verb", def: "To say the right word for something.", anchor: "hard to name" },
  { word: "share", pos: "verb", def: "To tell other people your thoughts or feelings.", anchor: "share how you feel" },
  { word: "lighter", pos: "adjective", def: "Less heavy — easier to carry.", anchor: "it becomes lighter" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 33, title: "Talking About How You Feel",
  hook: "Say how you really feel — calmly, in English.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
