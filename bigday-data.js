/* bigday-data.js — Sarah's Big Day conversations.
   When an expedition tags multiple first-time species, ONE authored Big Day
   conversation replaces the routine per-species celebrations. Design: PR #44
   (design/sarah-big-day-messages.md). Implemented v1.4.19-beta.

   Placeholders (resolved at build time, never shown raw):
   - {speciesList}: "a nurse shark and a lemon shark" (discovery order)
   - {count}: real number of new species (lemon pool only)

   Voice: Sarah's established texting voice — warm, precise, lowercase,
   excitement earned and escalating by tier. Facts are universal (true for
   sharks generally) so they work with any species combination. */

const BIG_DAY = {
  /* Tier 2 — two new species (excited but composed) */
  2: [
    [ /* 2A */
      { who: "them", text: "two new species in one trip. TWO. that's a very good day out there." },
      { who: "me", text: "I thought you'd want the field notes." },
      { who: "them", text: "i want the field notes, the IDs, and approximately ten minutes to be delighted about this." }
    ],
    [ /* 2B */
      { who: "them", text: "okay, I just read the expedition log. You met {speciesList} on the same trip?" },
      { who: "me", text: "And both went back into the water healthy." },
      { who: "them", text: "that's the part I like best. good science and two sharks still out there living their lives." }
    ],
    [ /* 2C */
      { who: "them", text: "I was going to ask how the trip went, but the research database just answered for you." },
      { who: "me", text: "In a good way?" },
      { who: "them", text: "in a two-new-species kind of way. yes. very much in a good way." }
    ],
    [ /* 2D */
      { who: "me", text: "trip report: {speciesList}. both tagged, both released." },
      { who: "them", text: "wait. both?? in ONE trip?" },
      { who: "me", text: "Back to back. Barely had time to log the first one." },
      { who: "them", text: "okay that's genuinely excellent fieldwork. two new animals in the database means two more migration tracks to follow." }
    ],
    [ /* 2E */
      { who: "them", text: "you know what's wild? two new species for your collection in a single trip." },
      { who: "me", text: "And I got two before lunch." },
      { who: "them", text: "two! {speciesList}! sharks just keep making teeth — conveyor belt, forever." },
      { who: "me", text: "I'm choosing to take that as a compliment." }
    ],
    [ /* 2F */
      { who: "them", text: "quick question. when you saw the second one, did you just stand there for a second because your brain hadn't caught up?" },
      { who: "me", text: "{speciesList}. Yes. Stood there like an idiot." },
      { who: "them", text: "good. that's the correct response. its lateral line felt you coming way before you saw it, by the way." }
    ],
    [ /* 2G */
      { who: "me", text: "Guess how many new species today." },
      { who: "them", text: "no. don't do this to me. ...two?" },
      { who: "me", text: "Two. {speciesList}." },
      { who: "them", text: "I KNEW it. new rule: you tell me immediately next time, I can't do suspense. also for your logbook: shark skin is covered in tiny tooth-scales called dermal denticles. that's the sandpaper feeling." }
    ],
    [ /* 2H */
      { who: "them", text: "the database just pinged me. TWO new species??" },
      { who: "me", text: "The database pings you?" },
      { who: "them", text: "I set up alerts. priorities. anyway — {speciesList} in a single trip is a big deal. sharks are slow to reproduce, so every individual we can track matters more than people think." },
      { who: "me", text: "Noted. I'll tell the sharks you said hi." }
    ]
  ],

  /* Tier 3 — three new species (composure cracking) */
  3: [
    [ /* 3A */
      { who: "them", text: "excuse me. THREE new species? in ONE expedition?" },
      { who: "me", text: "It was a pretty good day." },
      { who: "them", text: "a pretty good day is finding a cool shell. THREE new species is the kind of day researchers talk about for years. also their skeletons are cartilage, not bone — I say facts when I'm overwhelmed." },
      { who: "me", text: "I'll try to act accordingly humbled." }
    ],
    [ /* 3B */
      { who: "me", text: "Okay so. {speciesList}." },
      { who: "them", text: "that's three. that's THREE separate sharks." },
      { who: "me", text: "All tagged, all released, all healthy." },
      { who: "them", text: "i need you to understand that my hands are actually shaking a little. three new data points in one day — the migration map is going to look SO good." }
    ],
    [ /* 3C */
      { who: "them", text: "I just refreshed the database three times because I thought it was glitching." },
      { who: "me", text: "It's not glitching. Three new species." },
      { who: "them", text: "THREE. okay. okay. did you know sharks have been around 450 million years? older than trees. and today you added three of them to OUR map." },
      { who: "me", text: "When you put it like that..." }
    ],
    [ /* 3D */
      { who: "them", text: "are you sitting down? because I'M not sitting down, I'm pacing." },
      { who: "me", text: "What's wrong??" },
      { who: "them", text: "nothing's wrong! you tagged THREE new species in one trip! {speciesList}! some sharks can go months without eating — I, on the other hand, am going to need a snack after this." },
      { who: "me", text: "Okay good, you scared me for a second." }
    ],
    [ /* 3E */
      { who: "me", text: "Field notes are in. Fair warning: it's a long entry." },
      { who: "them", text: "how long— oh. OH." },
      { who: "me", text: "Three new species. I know." },
      { who: "them", text: "you know what this means? three more individuals we can follow. sharks can cross entire oceans — one of these tags could ping somewhere unbelievable in two years." }
    ],
    [ /* 3F */
      { who: "them", text: "I was literally just telling mom about your research and then the alerts started coming in." },
      { who: "me", text: "Sorry to interrupt the bragging?" },
      { who: "them", text: "are you kidding, you IMPROVED the bragging. three new species, {speciesList}. some sharks live 70+ years — these three could be out there that whole time." },
      { who: "me", text: "Tell mom I said thanks. (The sharks don't say hi. But tell her.)" }
    ],
    [ /* 3G */
      { who: "them", text: "three??" },
      { who: "me", text: "Three new species. One trip." },
      { who: "them", text: "whale sharks can be the size of a bus and they just filter tiny plankton. nature doesn't care about making sense, and neither does today's data." },
      { who: "me", text: "I'll try not to let it go to my head." }
    ],
    [ /* 3H */
      { who: "me", text: "So today happened." },
      { who: "them", text: "define \"happened.\"" },
      { who: "me", text: "{speciesList}. All new. All tagged." },
      { who: "them", text: "....i need a minute. a shark's electroreception is so sensitive it can detect a heartbeat. which is good, because MY heartbeat is very detectable right now." }
    ]
  ],

  /* Tier 4 — four new species (barely holding it together) */
  4: [
    [ /* 4A */
      { who: "them", text: "FOUR. four new species. in ONE trip." },
      { who: "me", text: "I know. I'm still processing it too." },
      { who: "them", text: "no no, you don't get to be calm about this. FOUR. a shark goes through thousands of teeth in its lifetime, and I'm going to talk about today for the rest of mine." },
      { who: "me", text: "Okay. Okay! I'm excited too!" }
    ],
    [ /* 4B */
      { who: "me", text: "You're going to want to sit down for the field notes." },
      { who: "them", text: "why. how many." },
      { who: "me", text: "Four new species. {speciesList}." },
      { who: "them", text: "I'm staring at the wall. FOUR. most fish scatter millions of eggs and hope; sharks invest in a few pups. every individual matters so much more." }
    ],
    [ /* 4C */
      { who: "them", text: "I don't even know where to start. FOUR new species?!" },
      { who: "me", text: "Start with the field notes, they're all in order." },
      { who: "them", text: "the field notes. THE FIELD NOTES. four sharks, four tags, four data points. every one of them is going to teach us something about where these animals go." },
      { who: "me", text: "That's the idea." }
    ],
    [ /* 4D */
      { who: "them", text: "okay I need you to confirm something. the database says four. FOUR new species in one expedition. is the database lying to me?" },
      { who: "me", text: "The database is telling the truth. {speciesList}." },
      { who: "them", text: "four!! okay. a shark has multiple rows of teeth backing up the front ones — spares on a conveyor belt. I'm trying to sound normal about this and failing." },
      { who: "me", text: "You're doing great." }
    ],
    [ /* 4E */
      { who: "me", text: "Best. Trip. Ever." },
      { who: "them", text: "FOUR NEW SPECIES. I already know. the alerts nearly broke my phone." },
      { who: "me", text: "All healthy, all released. It was incredible." },
      { who: "them", text: "four individuals, four migration stories starting today. in three years one of them is going to ping somewhere wild and I'm going to lose my mind all over again." }
    ],
    [ /* 4F */
      { who: "them", text: "I'm going to say a number and you tell me if it's right. four." },
      { who: "me", text: "Four. It's right." },
      { who: "them", text: "FOUR new species in ONE trip. {speciesList}. also, countershading — dark on top, light below — breaks up their outline from every angle. they were probably watching you way before you saw them. sneaky." },
      { who: "me", text: "Rigorous as always." }
    ],
    [ /* 4G */
      { who: "me", text: "I think I broke your database." },
      { who: "them", text: "WHAT did you do— oh. OH. four new species." },
      { who: "me", text: "It's not broken, it's just... full." },
      { who: "them", text: "four!! a shark's lateral line can feel movement from meters away. right now the whole ocean feels like it's vibrating. that's how big this is." }
    ],
    [ /* 4H */
      { who: "them", text: "four species. FOUR. I'm going to need you to walk me through this slowly because my brain is buffering." },
      { who: "me", text: "One at a time? {speciesList}." },
      { who: "them", text: "one at a time. yes. okay. each of these is an animal nobody knew as an individual until today. dorsal fins, scars, markings — four new animals to learn to tell apart." },
      { who: "me", text: "Take all the time you need." }
    ]
  ],

  /* Lemon pool — when a lemon shark shares a Big Day (any tier 2-4).
     Sarah gets her favorite-shark moment without a second routine thread. */
  lemon: [
    [ /* L1 */
      { who: "them", text: "I was trying to read the whole expedition report like a normal person, and then I got to LEMON SHARK." },
      { who: "me", text: "There were {count} new species today, you know." },
      { who: "them", text: "I KNOW AND THAT'S AMAZING. but that one is my favourite. did you notice how social they can be? they can form preferred associations with other lemon sharks. I am being extremely normal about this." }
    ],
    [ /* L2 */
      { who: "them", text: "{count} new species and one of them is a lemon shark. I need you to understand how spectacular your day was." },
      { who: "me", text: "Which part are you most excited about?" },
      { who: "them", text: "yes." }
    ]
  ]
};
