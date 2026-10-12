// data-ep22.jsx — English Unlocked · Episode 22 "At the Doctor"
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
  "I’ve had a sore throat for three days.",
  "It hurts when I move my arm.",
  "Could you explain what that means?",
  "Do I take this with food?",
  "How long until I feel better?",
];
const SLOW = [
  "I’ve had a sore throat… for three days.",
  "It hurts… when I move my arm.",
  "Could you explain… what that means?",
  "Do I take this… with food?",
  "How long… until I feel better?",
];
const NATURAL = [
  "I’ve had a sore throat for three days.",
  "It hurts when I move my arm.",
  "Could you explain what that means?",
  "Do I take this with food?",
  "How long until I feel better?",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice talking to a doctor." },
  { s: "map", t: "When you feel unwell, the words disappear first.", p: 2 },
  { s: "map", t: "After this, you can describe pain clearly, and ask what to do.", p: 2 },

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
  { s: "anchor", t: "“It hurts when I move my arm.” — “I see. Let’s take a look.”", p: 2 },
  { s: "anchor", t: "Your health is worth a slow, clear sentence.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "unwell",   pos: "adjective", def: "Not healthy — a soft, polite way to say ill.",            anchor: "you feel unwell" },
  { word: "describe", pos: "verb",      def: "To say what something is like, so another person sees it.", anchor: "describe pain clearly" },
  { word: "worth",    pos: "adjective", def: "Deserving the time or effort it takes.",                   anchor: "is worth a slow" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 22, title: "At the Doctor",
  hook: "Say exactly what hurts — in calm, clear English.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
