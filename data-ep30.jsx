// data-ep30.jsx — English Unlocked · Episode 30 "A Day Out in English"
// Season 3 FINALE. 6 phases, but Phase 5 is an interactive SIMULATION:
//   • speaker:"betty" lines  → Betty on screen, she says a line
//   • youTurn:true  lines    → the mic countdown; you reply with the phrase
// Walks one ordinary day through Season 3: lost in the street, a shop, a new
// person, a question about work. English ONLY on screen.

const SECTIONS = {
  grounding:    { n: 1, label: "Grounding" },
  map:          { n: 2, label: "The Map" },
  listening:    { n: 3, label: "Listening" },
  articulation: { n: 4, label: "Articulation" },
  simulation:   { n: 5, label: "Simulation" },
  anchor:       { n: 6, label: "The Anchor" },
};
const PHASE_ORDER = ["grounding", "map", "listening", "articulation", "simulation", "anchor"];

// The five replies you will say back, drawn from Season 3.
const LISTEN = [
  "Excuse me, how do I get to the station?",
  "I’d like to return this, please.",
  "Hi, I don’t think we’ve met.",
  "I work in marketing, mostly with data.",
  "Oh really? What happened next?",
];
const SLOW = [
  "Excuse me… how do I get to the station?",
  "I’d like to return this… please.",
  "Hi… I don’t think we’ve met.",
  "I work in marketing… mostly with data.",
  "Oh really?… What happened next?",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome to the finale. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today we walk through one ordinary day, in English." },
  { s: "map", t: "I will speak first. When the ring glows, that is your turn.", p: 2 },
  { s: "map", t: "Do not aim for perfect. Just answer me out loud.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "First, just listen to the five replies you will use." },
  ...euPass("listening", LISTEN, "listen", 3.5),

  // 4 — Articulation
  { s: "articulation", t: "Now we practice them slowly, one by one." },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — The Simulation (a day, in four moments)
  { s: "simulation", t: "Now, let’s live the day. I speak, then you reply." },
  { s: "simulation", t: "Take your time.", p: 2 },

  { s: "simulation", t: "“Morning! You look like you need some help.”", speaker: "betty", betty: true },
  { s: "simulation", t: "Excuse me, how do I get to the station?", phrase: true, pass: "repeat", youTurn: true },

  { s: "simulation", t: "“Hi there — can I help you with anything today?”", speaker: "betty", betty: true },
  { s: "simulation", t: "I’d like to return this, please.", phrase: true, pass: "repeat", youTurn: true },

  { s: "simulation", t: "“Everyone here seems to know each other already.”", speaker: "betty", betty: true },
  { s: "simulation", t: "Hi, I don’t think we’ve met.", phrase: true, pass: "repeat", youTurn: true },

  { s: "simulation", t: "“Nice to meet you. So — what do you do?”", speaker: "betty", betty: true },
  { s: "simulation", t: "I work in marketing, mostly with data.", phrase: true, pass: "repeat", youTurn: true },

  { s: "simulation", t: "“Oh, we had the strangest day at our office yesterday…”", speaker: "betty", betty: true },
  { s: "simulation", t: "Oh really? What happened next?", phrase: true, pass: "repeat", youTurn: true },

  // 6 — The Anchor
  { s: "anchor", t: "You just walked a whole day in English.", p: 2 },
  { s: "anchor", t: "The street, the shop, the stranger, the question about work." },
  { s: "anchor", t: "None of it needed perfect grammar. It needed your voice.", p: 2 },
  { s: "anchor", t: "Thank you for practicing with me." },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "out loud",  pos: "phrase",    def: "Using your voice so others can hear — not silently.", anchor: "answer me out loud" },
  { word: "your turn", pos: "phrase",    def: "The moment when it is your time to speak.",           anchor: "that is your turn" },
  { word: "ordinary",  pos: "adjective", def: "Normal, everyday — nothing special.",                 anchor: "one ordinary day" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 30, title: "A Day Out in English",
  hook: "One ordinary day — and you handle all of it in English.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
