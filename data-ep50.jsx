// data-ep50.jsx — English Unlocked · Episode 50 "A Busy Day in English"
// Season 5 — Getting Things Done FINALE. Same shape as data-ep30.jsx: Phase 5 is an
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
  "Hi, I’d like to make an appointment.",
  "The heating in my flat stopped working.",
  "Could you take me to this address?",
  "Sorry, can I just add something?",
  "It was really lovely to meet you.",
];
const SLOW = [
  "Hi… I’d like to make an appointment.",
  "The heating in my flat… stopped working.",
  "Could you take me… to this address?",
  "Sorry… can I just add something?",
  "It was really lovely… to meet you.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome to the finale. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today we live one busy day, from morning to night, in English." },
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

  { s: "simulation", t: "“Good morning, City Clinic. How can I help?”", speaker: "betty", betty: true },
  { s: "simulation", t: "Hi, I’d like to make an appointment.", phrase: true, pass: "repeat", youTurn: true },

  { s: "simulation", t: "“Building office. What seems to be the problem?”", speaker: "betty", betty: true },
  { s: "simulation", t: "The heating in my flat stopped working.", phrase: true, pass: "repeat", youTurn: true },

  { s: "simulation", t: "“Evening! Where are we going?”", speaker: "betty", betty: true },
  { s: "simulation", t: "Could you take me to this address?", phrase: true, pass: "repeat", youTurn: true },

  { s: "simulation", t: "“So, I think we all agree. Anything else?”", speaker: "betty", betty: true },
  { s: "simulation", t: "Sorry, can I just add something?", phrase: true, pass: "repeat", youTurn: true },

  { s: "simulation", t: "“Well, it’s late. I should probably head home.”", speaker: "betty", betty: true },
  { s: "simulation", t: "It was really lovely to meet you.", phrase: true, pass: "repeat", youTurn: true },

  // 6 — The Anchor
  { s: "anchor", t: "You just handled a whole busy day in English.", p: 2 },
  { s: "anchor", t: "A call, a repair, a ride, a meeting, a goodbye." },
  { s: "anchor", t: "None of it needed perfect grammar. It needed your voice.", p: 2 },
  { s: "anchor", t: "Thank you for practicing with me." },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "busy", pos: "adjective", def: "With a lot to do and little free time.", anchor: "one busy day" },
  { word: "your turn", pos: "phrase", def: "The moment when it is your time to speak.", anchor: "that is your turn" },
  { word: "out loud", pos: "phrase", def: "Using your voice so others can hear — not silently.", anchor: "answer me out loud" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 50, title: "A Busy Day in English",
  hook: "One busy day, morning to night — and you handle it all.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
