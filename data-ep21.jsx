// data-ep21.jsx — English Unlocked · Episode 21 "Asking for Directions"
// Season 3 — Out in the World. 6-phase shadowing, SHORT-OPEN build:
//   · `hook` drives the 8s cold open (host on camera + all 5 phrases on screen)
//   · Grounding trimmed to 4 lines (~23s) and The Map to 3 (~20s)
//   · The Anchor closes with a CONTEXTUAL exchange — a 4th exposure to the
//     phrases in a real exchange, which is where shadowing accuracy still
//     improves (reproduction plateaus around the 4th–5th repetition).
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
  "Excuse me, how do I get to the station?",
  "Is it walking distance from here?",
  "Sorry, could you say that again, slowly?",
  "So, I go straight and then turn left?",
  "Thank you so much, you’ve really helped.",
];
const SLOW = [
  "Excuse me… how do I get to the station?",
  "Is it… walking distance from here?",
  "Sorry… could you say that again, slowly?",
  "So… I go straight… and then turn left?",
  "Thank you so much… you’ve really helped.",
];
const NATURAL = [
  "Excuse me, how do I get to the station?",
  "Is it walking distance from here?",
  "Sorry, could you say that again, slowly?",
  "So, I go straight and then turn left?",
  "Thank you so much, you’ve really helped.",
];

const SCRIPT = [
  // 1 — Grounding (short: the cold open already made the promise)
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map (why it matters, not what is coming)
  { s: "map", t: "Today, we practice asking for directions." },
  { s: "map", t: "Being lost is not the hard part. Asking is.", p: 2 },
  { s: "map", t: "After this, you can stop a stranger and ask with confidence.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "First, just listen." },
  ...euPass("listening", LISTEN, "listen", 3.5),

  // 4 — Articulation
  { s: "articulation", t: "Now it is your turn. Slowly, with a calm voice." },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Rhythm
  { s: "rhythm", t: "Good. Now let it flow, at natural speed." },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor (contextual recycling — the 4th exposure)
  { s: "anchor", t: "Beautifully done.", p: 1.5 },
  { s: "anchor", t: "Now hear it as one real moment:" },
  { s: "anchor", t: "“Excuse me, how do I get to the station?” — “Sure, it’s two streets down.”", p: 2 },
  { s: "anchor", t: "A map is useful. A question is faster." },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "lost",       pos: "adjective", def: "Not knowing where you are, or how to get where you want to go.", anchor: "Being lost" },
  { word: "stranger",   pos: "noun",      def: "A person you have never met before.",                            anchor: "stop a stranger" },
  { word: "useful",     pos: "adjective", def: "Helping you do something you need to do.",                       anchor: "A map is useful" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 21, title: "Asking for Directions",
  hook: "Lost in a new city? Five phrases that get you home.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
