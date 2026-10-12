// data-ep41.jsx — English Unlocked · Episode 41 "Booking an Appointment"
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
  "Hi, I’d like to make an appointment.",
  "Do you have anything on Thursday morning?",
  "Could you spell that for me, please?",
  "Sorry, could you repeat the time?",
  "Perfect. See you on Thursday then.",
];
const SLOW = [
  "Hi… I’d like to make an appointment.",
  "Do you have anything… on Thursday morning?",
  "Could you spell that… for me, please?",
  "Sorry… could you repeat the time?",
  "Perfect… See you on Thursday then.",
];
const NATURAL = [
  "Hi, I’d like to make an appointment.",
  "Do you have anything on Thursday morning?",
  "Could you spell that for me, please?",
  "Sorry, could you repeat the time?",
  "Perfect. See you on Thursday then.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice booking an appointment by phone." },
  { s: "map", t: "On the phone, one missed number can ruin the whole plan.", p: 2 },
  { s: "map", t: "After this, you can book a time and confirm every detail.", p: 2 },

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
  { s: "anchor", t: "Well done.", p: 1.5 },
  { s: "anchor", t: "Now hear it as one real moment:" },
  { s: "anchor", t: "“We have ten thirty on Thursday.” — “Perfect. See you on Thursday then.”", p: 2 },
  { s: "anchor", t: "Repeating the details back is a professional habit.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "ruin", pos: "verb", def: "To spoil something completely.", anchor: "can ruin the whole" },
  { word: "confirm", pos: "verb", def: "To say again that something is correct or certain.", anchor: "confirm every detail" },
  { word: "habit", pos: "noun", def: "Something you do again and again, often without thinking.", anchor: "professional habit" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 41, title: "Booking an Appointment",
  hook: "Book an appointment by phone — clearly, the first time.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
