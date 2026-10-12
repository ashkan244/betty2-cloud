// data-ep43.jsx — English Unlocked · Episode 43 "Taking a Taxi"
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
  "Could you take me to this address?",
  "Roughly how long will it take?",
  "Could you stop here on the left?",
  "Do you take cards, or only cash?",
  "Keep the change. Have a good day.",
];
const SLOW = [
  "Could you take me… to this address?",
  "Roughly… how long will it take?",
  "Could you stop here… on the left?",
  "Do you take cards… or only cash?",
  "Keep the change… Have a good day.",
];
const NATURAL = [
  "Could you take me to this address?",
  "Roughly how long will it take?",
  "Could you stop here on the left?",
  "Do you take cards, or only cash?",
  "Keep the change. Have a good day.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice taking a taxi." },
  { s: "map", t: "In a new city, a taxi ride can feel out of your control.", p: 2 },
  { s: "map", t: "After this, you can give the address, ask the price, and pay with ease.", p: 2 },

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
  { s: "anchor", t: "“Roughly how long will it take?” — “About twenty minutes, if the traffic is okay.”", p: 2 },
  { s: "anchor", t: "A calm passenger usually gets a calm driver.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "control", pos: "noun", def: "The power to decide what happens.", anchor: "out of your control" },
  { word: "with ease", pos: "phrase", def: "Without difficulty — easily.", anchor: "pay with ease" },
  { word: "passenger", pos: "noun", def: "A person travelling in a car, bus or plane who is not driving.", anchor: "A calm passenger" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 43, title: "Taking a Taxi",
  hook: "Get in, give the address, arrive — calmly, in English.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
