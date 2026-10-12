// series.js — the English Unlocked episode list, in one place.
//
// Read by index.html (the menu) and by ui-v4.jsx (the outro's "Next episode"
// line). Plain JS, not Babel, so any page can load it with a normal <script>.
// Adding an episode = add its data-epNN.jsx AND one line here. Ep 02 still runs
// its legacy standalone page, hence its own href.
(function (g) {
  g.EU_SERIES = [
    { n: 1,  title: "Survival Phrases",               desc: "What to say when your mind goes completely blank." },
    { n: 2,  title: "The Art of Agreeing",            desc: "Simple ways to connect by letting people feel heard.", href: "English%20Unlocked%20-%20Ep2%20v4.html" },
    { n: 3,  title: "Handling Confusion",             desc: "Ask for clarity with confidence — no embarrassment." },
    { n: 4,  title: "Soft Boundaries",                desc: "Disagree or say no, politely and without tension." },
    { n: 5,  title: "Small Talk Openers",             desc: "Start a short conversation without the stress." },
    { n: 6,  title: "Buying Time to Think",           desc: "Natural fillers instead of awkward silence." },
    { n: 7,  title: "Storytelling Connectors",        desc: "Tell a story calmly, without losing your thread." },
    { n: 8,  title: "Expressing Opinions",            desc: "Share your view without the fear of judgment." },
    { n: 9,  title: "Graceful Exits",                 desc: "End a conversation warmly and walk away easy." },
    { n: 10, title: "The Full Flow",                  desc: "Every skill, combined in one real conversation." },
    { n: 11, title: "Phone & Video Calls",            desc: "Calls in English, with no face to read." },
    { n: 12, title: "The Job Interview",              desc: "Steady voice, honest answers." },
    { n: 13, title: "Polite Requests at Work",        desc: "Ask for help at work — and sound completely natural." },
    { n: 14, title: "Apologizing & Fixing Mistakes",  desc: "Apologize in English in one clean sentence." },
    { n: 15, title: "Making Plans & Invitations",     desc: "Invite someone — and actually settle the plan." },
    { n: 16, title: "At the Café & Restaurant",       desc: "Order, ask, and pay without the panic." },
    { n: 17, title: "Travel & the Airport",           desc: "Ask for what you need on the road." },
    { n: 18, title: "Disagreeing Politely",           desc: "Disagree in English without the sharp voice." },
    { n: 19, title: "Comforting a Friend",            desc: "A friend is hurting — five things to say." },
    { n: 20, title: "Your First Real Conversation",   desc: "I speak, you answer — a full conversation." },
    { n: 21, title: "Asking for Directions",          desc: "Lost in a new city? Five phrases that get you home." },
    { n: 22, title: "At the Doctor",                  desc: "Say exactly what hurts — in calm, clear English." },
    { n: 23, title: "Shopping & Returns",             desc: "Return it, replace it, or get your money back." },
    { n: 24, title: "Money, Bills & Paperwork",       desc: "Five phrases that protect your money." },
    { n: 25, title: "Finding a Place to Live",        desc: "Renting in English — ask everything before you sign." },
    { n: 26, title: "Meeting New People",             desc: "Walk into a room of strangers — leave with a friend." },
    { n: 27, title: "Talking About Your Work",        desc: "“So, what do you do?” — answer without freezing." },
    { n: 28, title: "Giving & Taking Feedback",       desc: "Say the hard thing at work — and still sound kind." },
    { n: 29, title: "Keeping the Conversation Going", desc: "The silence after “hello” — five ways to fill it." },
    { n: 30, title: "A Day Out in English",           desc: "One ordinary day — and you handle all of it." },
  ];
  // the episode after n, or null at the end of the series
  g.euNextEpisode = function (n) {
    return g.EU_SERIES.find(function (e) { return e.n === Number(n) + 1; }) || null;
  };
})(globalThis);
