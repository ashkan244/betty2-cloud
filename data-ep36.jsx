// data-ep36.jsx — English Unlocked · Episode 36 "Celebrating Good News"
// Season 4 — Closer to People. House format (see data-ep22.jsx): short open, 5 phrases,
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
  "Congratulations, that is wonderful news!",
  "You must be so proud of yourself.",
  "How did you feel when you heard?",
  "Would you like to celebrate this weekend?",
  "I knew you could do it.",
];
const SLOW = [
  "Congratulations… that is wonderful news!",
  "You must be so proud… of yourself.",
  "How did you feel… when you heard?",
  "Would you like to celebrate… this weekend?",
  "I knew… you could do it.",
];
const NATURAL = [
  "Congratulations, that is wonderful news!",
  "You must be so proud of yourself.",
  "How did you feel when you heard?",
  "Would you like to celebrate this weekend?",
  "I knew you could do it.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice celebrating good news." },
  { s: "map", t: "Good news deserves more than a quick “nice”.", p: 2 },
  { s: "map", t: "After this, you can celebrate other people warmly and naturally.", p: 2 },

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
  { s: "anchor", t: "“I got the job!” — “Congratulations, that is wonderful news!”", p: 2 },
  { s: "anchor", t: "When you share someone’s joy, it grows.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "deserve", pos: "verb", def: "To earn something because of what you did.", anchor: "Good news deserves" },
  { word: "celebrate", pos: "verb", def: "To do something special because something good happened.", anchor: "celebrate other people" },
  { word: "joy", pos: "noun", def: "A feeling of great happiness.", anchor: "someone’s joy" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 36, title: "Celebrating Good News",
  hook: "Celebrate someone’s good news — and sound like you mean it.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
