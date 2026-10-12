// data-ep40.jsx — English Unlocked · Episode 40 "An Evening With Friends"
// Season 4 — Closer to People FINALE. Same shape as data-ep30.jsx: Phase 5 is an
// interactive SIMULATION — speaker:"betty" lines (Betty says a line), then
// youTurn:true lines (the mic countdown; you reply with the phrase).
// English ONLY on screen.

const SECTIONS = {
  grounding:    { n: 1, label: "Grounding" },
  map:          { n: 2, label: "The Map" },
  listening:    { n: 3, label: "Listening" },
  articulation: { n: 4, label: "Articulation" },
  simulation:   { n: 5, label: "Simulation" },
  anchor:       { n: 6, label: "The Anchor" },
};
const PHASE_ORDER = ["grounding", "map", "listening", "articulation", "simulation", "anchor"];

// The five replies you will say back, drawn from this season.
const LISTEN = [
  "Thank you so much for your help.",
  "That colour really suits you.",
  "I’m feeling a little stressed today.",
  "Could we move it to next week?",
  "Congratulations, that is wonderful news!",
];
const SLOW = [
  "Thank you so much… for your help.",
  "That colour… really suits you.",
  "I’m feeling… a little stressed today.",
  "Could we move it… to next week?",
  "Congratulations… that is wonderful news!",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome to the finale. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Tonight we spend one evening with close friends, in English." },
  { s: "map", t: "I will speak first. When the ring glows, that is your turn.", p: 2 },
  { s: "map", t: "Do not aim for perfect. Just answer me out loud.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "First, just listen to the five replies you will use." },
  ...euPass("listening", LISTEN, "listen", 3.5),

  // 4 — Articulation
  { s: "articulation", t: "Now we practice them slowly, one by one." },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — The Simulation
  { s: "simulation", t: "Now, let’s live it. I speak, then you reply." },
  { s: "simulation", t: "Take your time.", p: 2 },

  { s: "simulation", t: "“I brought you some soup. I heard you were sick.”", speaker: "betty", betty: true },
  { s: "simulation", t: "Thank you so much for your help.", phrase: true, pass: "repeat", youTurn: true },

  { s: "simulation", t: "“I finally tried a new colour. What do you think?”", speaker: "betty", betty: true },
  { s: "simulation", t: "That colour really suits you.", phrase: true, pass: "repeat", youTurn: true },

  { s: "simulation", t: "“You seem quiet tonight. Is everything okay?”", speaker: "betty", betty: true },
  { s: "simulation", t: "I’m feeling a little stressed today.", phrase: true, pass: "repeat", youTurn: true },

  { s: "simulation", t: "“Are we still meeting tomorrow?”", speaker: "betty", betty: true },
  { s: "simulation", t: "Could we move it to next week?", phrase: true, pass: "repeat", youTurn: true },

  { s: "simulation", t: "“Guess what — I passed my driving test!”", speaker: "betty", betty: true },
  { s: "simulation", t: "Congratulations, that is wonderful news!", phrase: true, pass: "repeat", youTurn: true },

  // 6 — The Anchor
  { s: "anchor", t: "You just spent a whole evening in English.", p: 2 },
  { s: "anchor", t: "Thanks, kindness, feelings, plans and good news." },
  { s: "anchor", t: "None of it needed perfect grammar. It needed your voice.", p: 2 },
  { s: "anchor", t: "Thank you for practicing with me." },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "close", pos: "adjective", def: "Knowing and caring about each other very well.", anchor: "with close friends" },
  { word: "your turn", pos: "phrase", def: "The moment when it is your time to speak.", anchor: "that is your turn" },
  { word: "out loud", pos: "phrase", def: "Using your voice so others can hear — not silently.", anchor: "answer me out loud" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 40, title: "An Evening With Friends",
  hook: "One evening with friends — and every reply in English.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
