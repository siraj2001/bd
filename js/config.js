/**
 * =========================================================================
 * AALIYAAAA's BIRTHDAY & WEDDING SURPRISE CONFIGURATION
 * =========================================================================
 * Central configuration for our love story, wedding date, nicknames,
 * photos, and secret notes. All messages are editable!
 */

const DEFAULT_CONFIG = {
  // Recipient details & Affectionate Nicknames
  recipientName: "Aaliyaaaa",
  nicknames: {
    primary: "Muttabonda",
    playful: "Besharam",
    formal: "Aaliyaaaa",
    all: ["Muttabonda", "Besharam", "My Love", "Future Wife"]
  },
  
  // Wedding countdown date (Target: May 2027. Placeholder default: May 1, 2027)
  weddingDate: "2027-05-01T00:00:00",
  weddingDateLabel: "May 2027",

  // Background Music
  music: {
    title: "Our Romantic Melody",
    artist: "For Aaliyaaaa (My Muttabonda)",
    audioSrc: "assets/our-song.mp3", 
    autoPlayPrompt: true
  },

  // Gateway Section
  hero: {
    badge: "A LITTLE WORLD MADE JUST FOR YOU",
    name: "Aaliyaaaa",
    subtitle: "Some people make the world feel softer, brighter, and a little more magical. You are that person for me.",
    invitationSubtext: "Before anything else, there's a little surprise waiting for you.",
    cta: "Open Your Surprise ❤️",
    subtext: "A birthday surprise, wrapped with all my love."
  },

  // Envelope Birthday Surprise (Revealed on click)
  envelope: {
    greeting: "Happy Birthday, my Muttabondaaa! ❤️",
    paragraphs: [
      "Yes, this entire website is for you, Besharam!",
      "Don't smile too much after seeing all this. 😂",
      "But seriously, you deserve every bit of happiness in this world.",
      "Today is all about celebrating the beautiful, silly, adorable person you are."
    ]
  },

  // OUR STORY: From 2020 to Forever
  ourStory: {
    eyebrow: "OUR STORY – FROM 2020 TO FOREVER ❤️",
    title: "It Started With One Message...",
    letterSalutation: "Aaliyaaaa,",
    letterParagraphs: [
      "I have known you since 2020.",
      "We were in the same college, and even in the same office at one point. We crossed paths, were around each other, and yet somehow never really got the chance to speak or interact much.",
      "Life had its own plans, I guess.",
      "Who would have thought that one unexpected message from you would change everything?",
      "One simple message became conversations. Those conversations slowly became something special. And somewhere along the way, two souls who had known of each other for years started getting to know each other in a completely different way.",
      "It's been just a year, not even a full year, and look where life has brought us.",
      "From barely speaking to sharing dreams.",
      "From being familiar faces to becoming important parts of each other's lives.",
      "From two people who couldn't find a moment to talk to two souls preparing to spend a lifetime together.",
      "Sometimes the most beautiful stories don't begin when we first meet someone. They begin when the timing is finally right.",
      "And ours? It started with one message.",
      "Now it's leading us towards May 2027, towards a new beginning, a new home, countless memories, and a lifetime of togetherness.",
      "I still find it beautiful how someone I knew since 2020 could suddenly become someone I can't imagine my future without.",
      "Maybe we were always meant to cross paths. We just needed the right moment to find each other.",
      "From 2020 acquaintances to 2027 forever.",
      "And Aaliyaaaa, if I could go back and change anything, I wouldn't change a thing. Because somehow, every missed conversation brought us closer to this moment.",
      "Here's to our story, our journey, and everything that's waiting for us."
    ],
    letterClosing: "One message. Two souls. One lifetime. ❤️",
    centralQuote: "2020-la just a familiar face... one message later, my Muttabonda became my forever. 😂❤️",
    lifetimeQuote: "One message. Two souls. From 2020 to May 2027. One lifetime together. 💍",
    timeline: [
      {
        id: "timeline-1",
        year: "2020",
        title: "2020 – The First Crossing",
        description: "Same college. Same office. Two familiar faces, but barely any conversations.",
        defaultSvg: "timeline-2020.svg"
      },
      {
        id: "timeline-2",
        year: "The Spark",
        title: "The Unexpected Message",
        description: "One message from you changed a story I never knew was waiting to happen.",
        defaultSvg: "timeline-message.svg"
      },
      {
        id: "timeline-3",
        year: "Two Souls",
        title: "Our Connection – Two Souls",
        description: "Conversations became memories, and a connection became something precious.",
        defaultSvg: "timeline-connection.svg"
      },
      {
        id: "timeline-4",
        year: "May 2027",
        title: "May 2027 – Our Forever",
        description: "From barely knowing each other to preparing for a lifetime together.",
        defaultSvg: "timeline-2027.svg"
      }
    ]
  },

  // Photo Gallery - Scrapbook Memories (6 Polaroids)
  photos: [
    {
      id: "photo-1",
      category: "Our Favourite Moment",
      caption: "Our first meet at the beach, dropping you at the airport, and that legendary costly bread omelette! 😂 Who knew such a simple day would become one of my favourite memories? The beach, the journey, the costliest bread omelette for 5k... IYKYK! ❤️",
      defaultSvg: "beach-first-meet.jpg",
      rotation: "-3.5deg"
    },
    {
      id: "photo-2",
      category: "A Day to Remember ❤️",
      caption: "\"Bus, train, Rapido... somehow we made our way to Chetpet Eco Park! Found our favourite spot for fried rice, enjoyed our little adventure, and then life suddenly had other plans. With Zaid admitted to the hospital, we rushed back, and I still had to drop you home late at night. What a day! So many little moments packed into one memory. IYKYK! ❤️\"",
      defaultSvg: "chetpet-eco-park.jpg",
      rotation: "2.8deg"
    },
    {
      id: "photo-3",
      category: "29 November 2025",
      caption: "\"The whole city was silent because of the red alert. Everyone was thinking about the cyclone, but here we were at Blue Flag Beach, sitting together and waiting for it to cross! 😂 What a crazy day to make a memory. Of all the days, we chose a cyclone-alert day for our beach adventure. IYKYK! ❤️\"",
      defaultSvg: "blue-flag-beach-cyclone.jpg",
      rotation: "-2.2deg"
    },
    {
      id: "photo-4",
      category: "Sunrise at Kovalam",
      caption: "\"We went to Kovalam early in the morning to watch the sunrise. We took some pictures, enjoyed the beautiful morning, had chai, and bought fresh fish. It was just a simple Sunday morning, but it became one of my favourite memories because we were together. ❤️\"",
      defaultSvg: "kovalam-sunrise.jpg",
      rotation: "3.2deg"
    },
    {
      id: "photo-5",
      category: "24 January 2026 — A Day with Your Family",
      caption: "\"We met your mom and Iqra that day. It was raining heavily, but it turned out to be such a lovely day. I had a good time talking with your mom and got to know more about your family. It was a special day, and I'm glad I got to spend that time with them. ❤️\"",
      defaultSvg: "day-with-family.jpg",
      rotation: "-3.8deg"
    },
    {
      id: "photo-6",
      category: "The Day Our Families Met",
      caption: "\"It was the first time both our families met, and the discussions became serious. We were both nervous about how everything would go, but Alhamdulillah, everything went so well. It turned into such a happy and memorable day for both of us. ❤️\"",
      defaultSvg: "families-met.jpg",
      rotation: "2.2deg"
    },
    {
      id: "photo-7",
      category: "🍜 Mannadi & Our Beach Iftar",
      caption: "\"We went to Mannadi to explore the street food and try different dishes. It was such a fun time together. A week later, we had an Iftar party at the beach. The food you prepared was really good, and spending that evening together made it even more special. ❤️\"",
      defaultSvg: "mannadi-iftar.jpg",
      rotation: "-2.6deg"
    },
    {
      id: "photo-8",
      category: "Meeting Your Dad — My Broken Hindi Adventures 😂",
      caption: "\"I finally met your dad! For two days, I was picking them up from the station, dropping them off, and roaming around with them. Somehow, I managed to communicate with my broken Hindi! 😂 It was a little funny, but I really enjoyed spending time with your family. ❤️\"",
      defaultSvg: "meeting-your-dad.jpg",
      rotation: "3deg"
    },
    {
      id: "photo-9",
      category: "🏡 21 October 2026 — Madam Finally Came Home! ❤️",
      caption: "\"Madam finally came to my home! 😂 It was an unexpected visit, and I was so happy to see you meet everyone in my family. Seeing you at my home, spending time with everyone, and becoming a part of our family moments made that day really special. ❤️\"",
      defaultSvg: "madam-came-home.jpg",
      rotation: "-1.8deg"
    }
  ],

  // Things I Love About You (6 Interactive Cards)
  thingsILove: [
    {
      id: "card-1",
      icon: "🌸",
      title: "Your Heart",
      quote: "You have a way of making ordinary days feel special. Never forget how precious you are.",
      secretWhisper: "Your kindness and gentle warmth melt away every worry I ever carry."
    },
    {
      id: "card-2",
      icon: "☺️",
      title: "Your Smile",
      quote: "One smile from you can make even my longest day feel lighter.",
      secretWhisper: "Seeing you happy is honestly my favorite feeling in the entire universe."
    },
    {
      id: "card-3",
      icon: "🫶",
      title: "Your Little Ways",
      quote: "All the tiny things that make you you. I notice them, cherish them, and love them.",
      secretWhisper: "From the way you tilt your head when you think, to your infectious laugh."
    },
    {
      id: "card-4",
      icon: "❤️",
      title: "Your Presence",
      quote: "Somehow, everything feels a little better when you're around.",
      secretWhisper: "Even just sitting beside you in silence feels like the warmest home."
    },
    {
      id: "card-5",
      icon: "🦋",
      title: "Your Cuteness",
      quote: "Even your smallest expressions have a special place in my heart.",
      secretWhisper: "You don't even have to try — you are naturally the most adorable Muttabonda ever."
    },
    {
      id: "card-6",
      icon: "✨",
      title: "Our Little Moments",
      quote: "The silly conversations, the laughter, and the little memories that make our story ours.",
      secretWhisper: "I replay our sweetest talks at night with the biggest smile on my face."
    }
  ],

  // Secret Love Notes (6 clickable folded notes)
  secretNotes: [
    {
      id: "note-1",
      number: "1",
      stamp: "💌",
      color: "#FFEBF1",
      badge: "Our Unexpected Beginning",
      text: "Last birthday, I was just admiring your pictures... and suddenly you messaged me. Honestly, it felt like a dream. Who knew one message from you would change everything?"
    },
    {
      id: "note-2",
      number: "2",
      stamp: "🪿🛍️",
      color: "#FFF0F5",
      badge: "My Favourite Besharam",
      text: "Unakku enna pa, ostrich theriyuma? 😂 And your bargaining! 500+ rupees ah? 150 kudu! Sometimes I feel more awkward than the shopkeeper. Plus, Mumbai is always on your mind. Besharam, we're not even in Mumbai! ❤️"
    },
    {
      id: "note-3",
      number: "3",
      stamp: "✨",
      color: "#FDE8EF",
      badge: "My Little 5-Year-Old",
      text: "With me, you're literally a 5-year-old kid. But I see how you handle your entire family and responsibilities. I adore that little girl and admire that strong woman in you. ❤️"
    },
    {
      id: "note-4",
      number: "4",
      stamp: "🌷",
      color: "#FFF5F7",
      badge: "IYKYK Moments",
      text: "Our first beach visit, airport pickups and drops... IYKYK. Some memories don't need long explanations. Just thinking about them makes me smile."
    },
    {
      id: "note-5",
      number: "5",
      stamp: "💗",
      color: "#FCE7F0",
      badge: "My Favourite Trouble",
      text: "When we don't talk, this Besharam won't let me stay quiet for long. Somehow you'll make me talk. And honestly, I love that about you."
    },
    {
      id: "note-6",
      number: "6",
      stamp: "💍",
      color: "#FFF2F6",
      badge: "May 2027, Hurry Up!",
      text: "Can't wait to wake up next to you, travel together, fight over silly things, cook together, build our little home and grow old together. May 2027, hurry up! ❤️"
    }
  ],

  // Personal Birthday Letter
  letter: {
    heading: "A Birthday Letter From My Heart",
    salutation: "My dearest Muttabonda,",
    opening: "Happy Birthday, my love.",
    paragraphs: [
      "Sometimes I wonder how one message from you changed so much. From barely talking to planning an entire lifetime together. And yes, you're still my favourite Besharam. ❤️",
      "I wish I could wrap every beautiful thing in this world and place it in your hands today. You deserve a life filled with peace, laughter, good health, answered duas, and dreams that come true.",
      "Thank you for being you. I hope you always feel appreciated, respected, understood, and loved — not just on your birthday, but on the ordinary days too.",
      "I may not always find the perfect words, but I want you to know how special you are to me.",
      "May this new year of your life bring you closer to everything your heart wishes for.",
      "Keep smiling, keep shining, and never stop being your lovely self.",
      "And one day, when we look back at all these little moments, I hope we smile at how our story kept growing — one memory, one laugh, and one beautiful day at a time."
    ],
    closing: "With all my love, always. ❤️",
    signature: "Forever cheering for you ♡"
  },

  // Wedding Countdown - May 2027
  wedding: {
    tagline: "One More Beautiful Chapter Awaits...",
    title: "Our Forever Begins in May 2027 💍",
    countdownLabel: "Counting down to our forever.",
    warningNote: "Warning: May 2027 onwards, this Muttabonda is officially going to be my forever headache. 😂💍 And honestly, I wouldn't want it any other way.",
    message: [
      "Today, I get to celebrate your birthday.",
      "And soon, I'll get to celebrate something even more beautiful — the beginning of our forever.",
      "May 2027 isn't just another month on the calendar.",
      "It's the month when our dreams, duas, and hopes begin a beautiful new chapter together.",
      "I can't wait for all the little things — waking up together, sharing laughter, making memories, supporting each other, and building a home filled with love and happiness.",
      "Until then, let's collect beautiful memories and count down to the day we become one family."
    ],
    promise: {
      lead: "Until May 2027, and for every day after that...",
      body: "I promise to keep choosing you, appreciating you, making you smile, and building a beautiful life with you.",
      highlight: "You're not just part of my future.\nYou're the future I've been looking forward to. ❤️"
    },
    ringsReveal: "Almost time to call you my forever. ♡"
  },

  // Our Future Together
  future: {
    heading: "The Best Chapters Are Still Ahead.",
    message: [
      "I don't know every detail of what the future holds, but I hope it is filled with little adventures, shared laughter, peaceful evenings, silly conversations, and countless reasons to be grateful.",
      "May we keep choosing kindness, patience, and each other as we build the life we've been dreaming of.",
      "I look forward to all the little things that will become our favourite memories."
    ],
    highlight: "Here's to you, to us, and to all the love still waiting. ♡"
  },

  // Final Birthday Surprise
  finale: {
    heading: "Happy Birthday, Muttabondaaa! ❤️",
    paragraphs: [
      "Today is your special day.",
      "Stay cute, stay crazy, stay Besharam.",
      "Can't wait to annoy you for the rest of our lives.",
      "May 2027... that's when our forever begins.",
      "Until then, let me keep making memories with you, making you smile, and reminding you how special you are."
    ],
    bigQuote: "Your birthday today. Our forever tomorrow. ♡",
    signatureQuote: "Yours, forever. ❤️",
    footer: "Made with all my love, for Aaliyaaaa (My Muttabonda)."
  }
};

// Local storage management to allow browser persistence of uploaded photos / edited text
const STORAGE_KEY = "aaliyaaaa_bday_customizations";

function getActiveConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return deepMerge(DEFAULT_CONFIG, parsed);
    }
  } catch (e) {
    console.warn("Could not load from localStorage:", e);
  }
  return DEFAULT_CONFIG;
}

function saveActiveConfig(partialConfig) {
  try {
    const current = getActiveConfig();
    const updated = deepMerge(current, partialConfig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save to localStorage:", e);
  }
}

function resetConfig() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  } catch (e) {
    console.error(e);
  }
}

function deepMerge(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

// Make accessible on window
window.BIRTHDAY_CONFIG = getActiveConfig();
window.saveActiveConfig = saveActiveConfig;
window.resetConfig = resetConfig;
