// data-ep42.jsx — English Unlocked · Episode 42 "Reporting Something Broken"
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
  "The heating in my flat stopped working.",
  "It started making a strange noise yesterday.",
  "When could someone come and look at it?",
  "Is there anything I should do until then?",
  "Thanks, I’ll be home all afternoon.",
];
const SLOW = [
  "The heating in my flat… stopped working.",
  "It started making… a strange noise yesterday.",
  "When could someone come… and look at it?",
  "Is there anything I should do… until then?",
  "Thanks… I’ll be home all afternoon.",
];
const NATURAL = [
  "The heating in my flat stopped working.",
  "It started making a strange noise yesterday.",
  "When could someone come and look at it?",
  "Is there anything I should do until then?",
  "Thanks, I’ll be home all afternoon.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice reporting something broken." },
  { s: "map", t: "When something breaks, stress makes our sentences messy.", p: 2 },
  { s: "map", t: "After this, you can explain the problem and agree on a time.", p: 2 },

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
  { s: "anchor", t: "“The heating in my flat stopped working.” — “Okay. Someone can come tomorrow at nine.”", p: 2 },
  { s: "anchor", t: "Clear facts get things fixed faster than long complaints.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "messy", pos: "adjective", def: "Not clear or organised.", anchor: "sentences messy" },
  { word: "agree on", pos: "phrasal verb", def: "To decide something together.", anchor: "agree on a time" },
  { word: "complaint", pos: "noun", def: "Words that say you are unhappy about something.", anchor: "long complaints" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 42, title: "Reporting Something Broken",
  hook: "Something broke? Report it clearly — and get it fixed.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
