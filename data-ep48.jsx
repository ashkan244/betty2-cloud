// data-ep48.jsx — English Unlocked · Episode 48 "Explaining How to Do Something"
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
  "First, you open the settings menu.",
  "Then you tap the button at the top.",
  "Does that make sense so far?",
  "Could you try it now, while I watch?",
  "Finally, you just press save. Done!",
];
const SLOW = [
  "First… you open the settings menu.",
  "Then you tap the button… at the top.",
  "Does that make sense… so far?",
  "Could you try it now… while I watch?",
  "Finally… you just press save. Done!",
];
const NATURAL = [
  "First, you open the settings menu.",
  "Then you tap the button at the top.",
  "Does that make sense so far?",
  "Could you try it now, while I watch?",
  "Finally, you just press save. Done!",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice explaining how to do something." },
  { s: "map", t: "Even simple instructions get lost without a clear order.", p: 2 },
  { s: "map", t: "After this, you can guide someone, step by step, without confusion.", p: 2 },

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
  { s: "anchor", t: "“Does that make sense so far?” — “Yes! Okay, what do I do next?”", p: 2 },
  { s: "anchor", t: "Good teachers check, pause, and check again.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "instructions", pos: "noun", def: "Words that tell you how to do something.", anchor: "simple instructions" },
  { word: "step by step", pos: "phrase", def: "One small part at a time, in order.", anchor: "someone, step by step" },
  { word: "pause", pos: "verb", def: "To stop for a short time.", anchor: "check, pause" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 48, title: "Explaining How to Do Something",
  hook: "Explain steps clearly — first, then, and finally.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
