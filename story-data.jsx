// story-data.jsx — English Unlocked · "Slow Story" long videos (custom engine).
// A narrated short story with painterly images that crossfade + Ken Burns, and a
// synced caption per beat. 18 image beats, ~5:30. English ONLY on screen.
// Images live in assets/story/<id>/01.png … 18.png (you generate them).

(function () {
  const CROSS = 0.9, TOTAL = 330;
  const START = [0,16,33,52,70,88,106,124,140,160,180,198,218,236,254,272,290,308];

  const STORIES = {
    lighthouse: { title: "The Lighthouse Keeper", caps: [
      "On a small rock, far out in the cold sea, there was one light.",
      "His name was Tom. He lived alone in the tall white lighthouse.",
      "Every evening, he climbed the long stairs and lit the great lamp.",
      "All night, the light turned slowly, around and around.",
      "His job was simple but important — keep the light burning, so ships find their way.",
      "Life on the rock was quiet. Sometimes Tom felt lonely.",
      "The nearest town was far away — a few distant lights across the water.",
      "He had only the sea, the birds, and his light.",
      "But Tom was faithful. In good weather and bad, he lit the lamp.",
      "One night, a great storm came. The waves grew as tall as houses.",
      "It was the worst storm Tom had ever seen.",
      "Far out in the dark, a small ship was lost. The sailors were afraid.",
      "They had no map, no stars, no way home.",
      "And then… one sailor saw it. A small light, turning in the distance.",
      "The light became their guide. The ship followed it to safe water.",
      "At dawn, the storm was gone. The sea was calm and golden.",
      "One quiet man, and one faithful light, had saved their lives.",
      "They never even knew his name. Maybe you are a lighthouse keeper too.",
    ] },
    dreams: { title: "Why Do We Dream?", caps: [
      "Last night, you went somewhere. You saw faces. Maybe you could even fly.",
      "And then… you woke up, and it was gone. Where did you go?",
      "Every night, when you fall asleep, your body rests. But your brain does not stop.",
      "A few times each night, your brain becomes active — almost like you are awake.",
      "And in those minutes, you dream.",
      "A dream can be soft and quiet. You walk through your old house.",
      "You talk to an old friend, long gone.",
      "But a dream can also be strange. Suddenly you are flying over the city.",
      "Suddenly the sky is green, and the sea is made of glass.",
      "In a dream, anything is possible, because your mind is free to imagine.",
      "Some dreams are vivid — so clear and bright that they feel completely real.",
      "And some are dark and frightening. We call those nightmares.",
      "But why? Why does the brain make these stories at night?",
      "One idea is about memory. All day, you collect faces, words, feelings.",
      "At night, your brain looks through them all — keeping some, letting others go.",
      "So maybe a dream is your mind, quietly cleaning and saving your day.",
      "And most mornings, you forget it all in seconds.",
      "We dream every night… and remember almost nothing. Sweet dreams.",
    ] },
    coffee: { title: "The Story of Coffee", caps: [
      "This morning, millions of people did the same small thing. They held a warm cup.",
      "They took the first sip, and slowly, they woke up. But where did it all begin?",
      "Long ago, in the green hills of Ethiopia, there was a young goat farmer named Kaldi.",
      "One day, Kaldi noticed something strange. His goats were dancing.",
      "They jumped, they ran, they would not sleep. They were full of energy.",
      "He saw the goats were eating small red berries from a green bush.",
      "So Kaldi tried the berries himself. And soon, he felt awake and alive.",
      "This is how people first discovered coffee — by watching dancing goats.",
      "At first the taste was bitter. But the bright, awake feeling was wonderful.",
      "Slowly, coffee began to travel. It crossed the sea to Arabia.",
      "There, people learned to dry the beans, and cook them over fire.",
      "Now coffee was dark, and the smell was rich and warm.",
      "In the cities, something new appeared: the coffee house.",
      "People came together to drink, to talk, to think, to share ideas.",
      "From there, coffee spread across the whole world.",
      "Everywhere it went, it became a ritual — a small, special daily moment.",
      "The morning cup. The break with a friend. The quiet moment alone.",
      "And it all started with a farmer, a green bush, and some very happy goats.",
    ] },
    summer: { title: "Talking About Summer", caps: [
      "Let’s talk about summer. Summer is my favourite season.",
      "In summer, the sun is bright and the sky is blue.",
      "The days are long, and the weather is hot.",
      "Many people go to the beach. The sand is warm.",
      "Children swim in the cool blue sea.",
      "Some people build castles in the sand.",
      "When it’s hot, we eat ice cream.",
      "In the afternoon, we drink cold lemonade in the shade.",
      "Summer is the time for holidays. Many people travel.",
      "Some go to the mountains. Some visit the sea.",
      "In the evening, the sky turns pink and orange.",
      "Families have a picnic in the park.",
      "At night, we watch the stars. Sometimes we see fireworks.",
      "Summer nights are warm. We hear the crickets.",
      "In the garden, the flowers are bright and the fruit is sweet.",
      "We pick strawberries, cherries, and juicy watermelon.",
      "Summer makes us happy. It’s a time to rest and have fun.",
      "So — what do YOU like to do in summer?",
    ] },
    market: { title: "A Day at the Market", caps: [
      "Let’s talk about food. Today, we go to the market.",
      "The market is busy and colourful. So many things to see!",
      "Look at the fruit — red apples, yellow bananas, sweet oranges.",
      "“How much is this?” I ask. “Two dollars,” says the man.",
      "Next, the vegetables — green beans, red tomatoes, orange carrots.",
      "The bread is fresh and warm. It smells wonderful.",
      "“Can I have one loaf, please?” “Of course!”",
      "Over there, the cheese — big and small, soft and hard.",
      "I love the flower stall. So many colours!",
      "The fish is fresh from the sea this morning.",
      "I buy some eggs, some milk, and a little honey.",
      "My bag is heavy now, but I am happy.",
      "At home, I wash the vegetables and cut the fruit.",
      "I cook a simple soup. It smells delicious.",
      "My family sits at the table. “Dinner is ready!”",
      "We eat together. “This is so good. Thank you!”",
      "Good food and good company. That is happiness.",
      "So — what is YOUR favourite food?",
    ] },
    weather: { title: "Talking About the Weather", caps: [
      "Let’s talk about the weather and the seasons in English.",
      "There are four seasons: spring, summer, autumn, and winter.",
      "In spring, the weather is mild. The flowers grow.",
      "Birds sing, and the trees turn green again.",
      "Sometimes it rains. “Take your umbrella!”",
      "In summer, it is hot and sunny. The days are long.",
      "We wear light clothes and drink cold water.",
      "“It’s a beautiful day!” we say.",
      "In autumn, the weather is cool. The leaves turn red and gold.",
      "The wind blows, and the leaves fall down.",
      "It gets dark early. We wear a warm jacket.",
      "In winter, it is cold. Sometimes it snows.",
      "Everything is white and quiet. “Be careful, it’s icy!”",
      "We wear a hat, a scarf, and gloves.",
      "Inside, it is warm. We drink hot tea by the fire.",
      "Every season is different. Every season is beautiful.",
      "Which season do you like? Sunny summer? Snowy winter?",
      "So — what’s the weather like today where YOU are?",
    ] },
  };

  // Beat timing used to be the same fixed START array for EVERY story, so a
  // four-word caption held the screen exactly as long as a twenty-word one.
  // Now each beat gets time in proportion to how long its line takes to read
  // (a base so nothing flashes, plus per-word time), normalised to TOTAL.
  const BEAT_BASE = 4.2;     // seconds every beat gets, however short
  const BEAT_PER_WORD = 0.62; // read-aloud time per word at story pace
  const BEAT_MIN = 9.0;       // never cut an image shorter than this

  function beatStarts(caps) {
    const w = caps.map((c) => BEAT_BASE + (c || "").split(/\s+/).length * BEAT_PER_WORD);
    const raw = w.map((x) => Math.max(BEAT_MIN, x));
    const sum = raw.reduce((a, b) => a + b, 0);
    const k = TOTAL / sum;                       // stretch to the story length
    const durs = raw.map((x) => x * k);
    const starts = [];
    let t = 0;
    durs.forEach((d) => { starts.push(t); t += d; });
    return { starts, durs };
  }

  function buildStory(id) {
    const S = STORIES[id] ? id : "lighthouse";
    const st = STORIES[S];
    const useFixed = new URLSearchParams(location.search).get("beats") === "fixed";
    const { starts, durs } = useFixed
      ? { starts: START, durs: START.map((s, i) => ((i + 1 < START.length ? START[i + 1] : TOTAL) - s)) }
      : beatStarts(st.caps);
    const N = starts.length;
    const beats = starts.map((s, i) => {
      const imgDur = durs[i] + (i < N - 1 ? CROSS : 0);
      return { i, start: s, imgDur, cap: st.caps[i], img: "assets/story/" + S + "/" + String(i + 1).padStart(2, "0") + ".png" };
    });
    return { id: S, title: st.title, dir: "assets/story/" + S + "/", beats, duration: TOTAL, cross: CROSS };
  }

  window.STORY_IDS = Object.keys(STORIES);
  window.getStory = (id) => buildStory(id);
})();
