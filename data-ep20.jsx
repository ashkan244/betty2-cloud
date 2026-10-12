// data-ep20.jsx — English Unlocked · Episode 20 "Your First Real Conversation"
// Season 2 FINALE. 6 phases, but Phase 5 is an interactive SIMULATION:
//   • speaker:"betty" lines  → Betty on screen, she says a line
//   • youTurn:true  lines    → the orb + mic countdown; you reply with the phrase
// Weaves together Season 2 phrases (interview, disagreeing, plans, comforting).
// English ONLY on screen. Timed by episode-engine.jsx.

const SECTIONS = {
  grounding:    { n: 1, label: "Grounding" },
  map:          { n: 2, label: "The Map" },
  listening:    { n: 3, label: "Listening" },
  articulation: { n: 4, label: "Articulation" },
  simulation:   { n: 5, label: "Simulation" },
  anchor:       { n: 6, label: "The Anchor" },
};
const PHASE_ORDER = ["grounding", "map", "listening", "articulation", "simulation", "anchor"];

// The four replies you will say back, drawn from Season 2.
const LISTEN = [
  "Thanks for having me…",
  "I’m not so sure about that…",
  "Let’s play it by ear…",
  "I’m here for you…",
];
const SLOW = [
  "Thanks… for having me.",
  "I’m not so sure… about that.",
  "Let’s… play it by ear.",
  "I’m… here for you.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome to the finale of your shadowing journey." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today is your first real conversation." },
  { s: "map", t: "I will speak to you like a friend — so make yourself at home." },
  { s: "map", t: "After each line, the orb will glow — that is your turn.", p: 3 },
  { s: "map", t: "Do not aim for perfect. Just answer me out loud.", p: 3 },

  // 3 — Listening (hear the four replies once)
  { s: "listening", t: "First, just listen to the phrases you will use." },
  { s: "listening", t: "Do not speak yet. Let them settle in.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Articulation (practice them slowly, one by one)
  { s: "articulation", t: "Now, we practice them slowly." },
  { s: "articulation", t: "Listen. And repeat after me.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — The Simulation (Betty speaks, then it is your turn)
  { s: "simulation", t: "Now, let’s talk. I will say a line, and you reply out loud." },
  { s: "simulation", t: "Take your time.", p: 3 },

  { s: "simulation", t: "“Come in! Thanks for making the time.”", speaker: "betty", betty: true },
  { s: "simulation", t: "Thanks for having me.", phrase: true, pass: "repeat", youTurn: true, p: 6 },

  { s: "simulation", t: "“Honestly, I think we should cancel the whole trip.”", speaker: "betty", betty: true },
  { s: "simulation", t: "I’m not so sure about that.", phrase: true, pass: "repeat", youTurn: true, p: 6 },

  { s: "simulation", t: "“Okay. So when should we meet next time?”", speaker: "betty", betty: true },
  { s: "simulation", t: "Let’s play it by ear.", phrase: true, pass: "repeat", youTurn: true, p: 6 },

  { s: "simulation", t: "“To be honest, things have been really hard lately.”", speaker: "betty", betty: true },
  { s: "simulation", t: "I’m here for you.", phrase: true, pass: "repeat", youTurn: true, p: 6 },

  // 6 — The Anchor
  { s: "anchor", t: "You just held a real conversation.", p: 2 },
  { s: "anchor", t: "Ten episodes ago, this felt impossible." },
  { s: "anchor", t: "The phrases are yours now — carry them into the world.", p: 3 },
  { s: "anchor", t: "Thank you for practicing with me." },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "make yourself at home", pos: "idiom",  def: "Relax and feel comfortable, as if it were your own home.", anchor: "make yourself at home" },
  { word: "out loud",              pos: "phrase", def: "Using your voice so others can hear — not silently.",      anchor: "answer me out loud" },
  { word: "your turn",             pos: "phrase", def: "The moment when it is your time to speak.",                anchor: "that is your turn" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 20, title: "Your First Real Conversation",
  hook: "Your first real conversation — I speak, you answer.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
