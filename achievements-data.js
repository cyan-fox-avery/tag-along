/* Tag Along achievements — v0.18.0.
   Visible upfront, but each shows a breadcrumb hint until unlocked — never the
   outright requirement. Sarah's voice: evocative, playful, precise.
   Loaded BEFORE script.js; ACHIEVEMENTS is global. */
const ACHIEVEMENTS = [
  {
    id: "first-tag",
    name: "Tag, You're It",
    icon: "🏷️",
    breadcrumb: "the book has to start somewhere",
    description: "Tagged your first shark. The collection book is officially open.",
    check: (st) => Object.keys(st.tagged).length >= 1
  },
  {
    id: "old-friend",
    name: "Old Friend",
    icon: "👋",
    breadcrumb: "run into an old friend",
    description: "Re-sighted a shark you'd already tagged. It remembered you. Probably.",
    check: (st) => (st.stats.resights || 0) >= 1
  },
  {
    id: "nervous",
    name: "Perpetually Nervous",
    icon: "😰",
    breadcrumb: "tag the most anxious-looking shark",
    description: "Tagged a thresher shark. It looks perpetually nervous, and honestly, same.",
    check: (st) => !!st.tagged.thresher
  },
  {
    id: "garbage-day",
    name: "Garbage Day",
    icon: "🗑️",
    breadcrumb: "one shark's trash...",
    description: "Tagged a tiger shark. It'll eat anything. Anything.",
    check: (st) => !!st.tagged.tiger
  },
  {
    id: "walks",
    name: "It Walks!",
    icon: "🚶",
    breadcrumb: "it doesn't swim everywhere",
    description: "Tagged an epaulette shark. Yes, it walks. On its fins. Sharks do that.",
    check: (st) => !!st.tagged.epaulette
  },
  {
    id: "first-name",
    name: "On a First-Name Basis",
    icon: "📝",
    breadcrumb: "every shark deserves a name",
    description: "Gave every tagged shark a nickname. They're individuals, after all.",
    check: (st) => {
      /* v0.18.0 review: naming one shark isn't a first-name basis with
         every shark — the full roster must be tagged and every one named. */
      return SHARKS.length > 0 && SHARKS.every(s => {
        const t = st.tagged[s.id];
        return t && t.name && t.name.trim();
      });
    }
  },
  {
    id: "best-cousin",
    name: "Best Cousin Ever",
    icon: "💙",
    breadcrumb: "name one after someone who matters",
    description: "Named a shark Sarah. She noticed. She's still talking about it.",
    check: (st) => Object.values(st.tagged).some(t => (t.name || "").trim().toLowerCase() === "sarah")
  },
  {
    id: "ocean-hopper",
    name: "Ocean Hopper?",
    icon: "🗺️",
    breadcrumb: "the whole ocean is waiting",
    description: "Ran expeditions in every region. The whole ocean is your office now.",
    check: (st) => {
      /* v0.18.0 review: locked regions count too — the achievement can't
         unlock until those waters are earned and visited. */
      const regions = Object.keys(REGIONS);
      return regions.length > 0 && regions.every(r => (st.stats.regionsVisited || []).includes(r));
    }
  },
  {
    id: "full-buffet",
    name: "Full Buffet",
    icon: "🍽️",
    breadcrumb: "a taste of everything",
    description: "Used every bait type. The sharks appreciate the variety. Probably.",
    check: (st) => {
      const baits = Object.keys(BAITS);
      return baits.length > 0 && baits.every(b => (st.stats.baitsUsed || []).includes(b));
    }
  },
  {
    id: "every-one-counts",
    name: "Every One Counts",
    icon: "🛡️",
    breadcrumb: "a rare encounter",
    description: "Tagged an Endangered or Critically Endangered species. This data matters.",
    check: (st) => Object.keys(st.tagged).some(id => {
      const s = SHARKS.find(x => x.id === id);
      return s && (s.status === "Endangered" || s.status === "Critically Endangered");
    })
  },
  {
    id: "on-the-brink",
    name: "On the Brink",
    icon: "🚨",
    breadcrumb: "right on the edge",
    description: "Tagged a Critically Endangered species. The data from this tag carries real weight.",
    check: (st) => Object.keys(st.tagged).some(id => {
      const s = SHARKS.find(x => x.id === id);
      return s && s.status === "Critically Endangered";
    })
  },
  {
    id: "maiden-voyage",
    name: "Maiden Voyage",
    icon: "⛵",
    breadcrumb: "you're really doing it",
    description: "Ran your first expedition. Sarah packed extra snacks. She always packs extra snacks.",
    check: (st) => (st.stats.expeditions || 0) >= 1
  },
  {
    id: "sea-legs",
    name: "Sea Legs",
    icon: "⚓",
    /* v2.7.14-beta: breadcrumb was literal ("ten trips out") — now evocative,
       per the never-the-requirement rule. Trigger unchanged. */
    breadcrumb: "steady on your feet",
    description: "Completed 10 expeditions. You're not a landlubber anymore.",
    check: (st) => (st.stats.expeditions || 0) >= 10
  },
  {
    id: "twilight-dive",
    name: "Twilight Zone",
    icon: "🌆",
    breadcrumb: "where the sun starts to fade",
    description: "Dived to the twilight zone for the first time. The light gets thin down here, and everything looks a little more curious.",
    check: (st) => (st.stats.depthsVisited || []).includes("twilight")
  },
  {
    id: "deep-dive",
    name: "Midnight Zone",
    icon: "🌑",
    breadcrumb: "below the last light",
    description: "Dived to the deep dark for the first time. No sunlight reaches this far down. Some deep-sea sharks make their own light — and others navigate the dark without it.",
    check: (st) => (st.stats.depthsVisited || []).includes("deep")
  },
  {
    id: "fieldwork",
    name: "Fieldwork",
    icon: "📓",
    breadcrumb: "the water teaches anyway",
    description: "Came back from a trip with no tag — and a notebook full of observations. That's still science.",
    check: (st) => (st.logbook || []).some(trip =>
      !(trip.encounters || []).some(e => e && e.result === "tagged"))
  },
  {
    id: "full-fathom",
    name: "Full Fathom",
    icon: "🌊",
    breadcrumb: "from sunlight to midnight",
    description: "Tagged sharks in all four depth zones, from the sunlit surface to the deep dark.",
    check: (st) => {
      const depths = Object.keys(DEPTHS);
      return depths.length > 0 && depths.every(d => (st.stats.depthsTagged || []).includes(d));
    }
  },
  {
    id: "finished",
    name: "Fin-ished!",
    icon: "🎓",
    breadcrumb: "finish what you started",
    description: "Tagged the full roster. Every shark, every region. The collection book is complete.",
    check: (st) => Object.keys(st.tagged).length >= SHARKS.length && SHARKS.length > 0
  },
  {
    id: "pen-pal",
    name: "Pen Pal",
    icon: "💌",
    breadcrumb: "keep bumping into the same shark",
    description: "Re-sighted the same individual shark three times. You two are basically colleagues now.",
    check: (st) => Object.values(st.tagged).some(t => (t.resightings || []).length >= 3)
  },
  {
    id: "off-map",
    name: "Off the Map",
    icon: "🧭",
    breadcrumb: "beyond the known map",
    description: "Tagged your first shark in waters that had to be earned — the Galápagos or South Africa.",
    check: (st) => {
      const locked = ["galapagos", "south-africa"];
      return Object.keys(st.tagged).some(id => {
        const s = SHARKS.find(x => x.id === id);
        return s && regionList(s).some(r => locked.includes(r));
      });
    }
  },
  {
    id: "every-shade",
    name: "Every Shade",
    icon: "🎨",
    breadcrumb: "from least concern to critically endangered",
    description: "Tagged sharks spanning every IUCN conservation status. The full spectrum, from secure to critical.",
    check: (st) => {
      const statuses = [...new Set(SHARKS.map(s => s.status))];
      const taggedStatuses = new Set(Object.keys(st.tagged).map(id => {
        const s = SHARKS.find(x => x.id === id);
        return s ? s.status : null;
      }));
      return statuses.length > 0 && statuses.every(s => taggedStatuses.has(s));
    }
  },
  {
    id: "bruce",
    name: "You Named Him WHAT?",
    icon: "🏆",
    breadcrumb: "name a shark the most popular shark name",
    description: "Named a shark Bruce and discovered how deep the rabbit hole goes.",
    hidden: true,
    /* v1.7.10-beta: fires as soon as the player names a shark Bruce (the
       chain has started), not only when the full slow chain completes. */
    check: (st) => !!(st.bruceChainComplete || st.bruceEgg)
  },
  {
    id: "white-whale",
    /* v1.8.0-beta: renamed from "White Whale" to "Deep-Sea Unicorn"
       (new 🦄 icon) — White Whale was too close to WHAAAAAAALE, the
       whale-shark achievement. The internal id stays "white-whale" so
       players who already earned it keep the unlock. */
    name: "Deep-Sea Unicorn",
    icon: "🦄",
    breadcrumb: "the rarest shark in the sea",
    description: "Tagged a megamouth shark. Only around 300 have ever been documented. This is the big one.",
    check: (st) => !!st.tagged.megamouth
  },
  {
    id: "whaaaaale",
    name: "WHAAAAAAALE",
    icon: "🐋",
    breadcrumb: "the biggest fish in the sea",
    description: "Tagged a whale shark. The biggest fish in the ocean — and every spot pattern is unique, like a fingerprint.",
    check: (st) => !!st.tagged.whale
  },
  {
    id: "dedicated",
    name: "Dedicated",
    icon: "🔬",
    breadcrumb: "learn everything there is to learn",
    description: "Unlocked every extra fact obtainable by following sharks. You didn't just tag them — you got to know them.",
    check: (st) => {
      /* v1.7.28-beta: every SECRET_FACTS entry across all species learned
         via Follow/Observe. Pools are never empty (50 species, 201 insights),
         and unlockedFacts only grows via unlockSecretFact.
         v1.8.0-beta: hook + bonus are real insights now — Dedicated means
         the full combined pool (insightPoolFor: 4 per species, 5 for the
         nurse shark, 201 total). Old unlockedFacts indices stay valid
         because hook/bonus append after SECRET_FACTS.
         Grandfathering: checkAchievements() skips already-earned
         achievements, so a Dedicated earned under the old 101-fact rule
         stays earned; the 201-fact bar applies to NEW awards only. */
      if (typeof SHARKS === "undefined" || typeof insightPoolFor === "undefined") return false;
      return SHARKS.length > 0 && SHARKS.every(s => {
        const pool = insightPoolFor(s.id);
        const unlocked = (st.unlockedFacts && st.unlockedFacts[s.id]) || [];
        return pool.length > 0 && pool.every((_, i) => unlocked.includes(i));
      });
    }
  },
  {
    id: "certified-nerd",
    name: "Certified Shark Nerd",
    icon: "🤓",
    breadcrumb: "finish everything else first",
    description: "Completed every other visible achievement. Officially a certified shark nerd — wear it proudly.",
    check: (st) => {
      /* v1.7.28-beta: meta-achievement — every other VISIBLE achievement
         complete. Excludes the hidden Bruce chain (Avery: visible only)
         and itself. Re-evaluates the other checks directly instead of
         trusting state.achievements, so it fires in the same
         checkAchievements() pass that unlocks the last one, regardless
         of array order. The other checks are pure predicates on state,
         so no recursion: none of them calls back into this check.
         v1.7.28-beta Mira review: several achievements are historical
         milestones, not invariant current-state conditions — best-cousin
         (rename the Sarah shark and check() goes false) and first-name
         (clear a nickname and check() goes false) — but the earned flag
         persists in state.achievements. So count a persisted earned flag
         OR a currently passing check. The OR preserves same-pass
         behavior: an achievement unlocked earlier in this pass already
         has its flag set, and one whose check() passes now is caught by
         the predicate. */
      if (typeof ACHIEVEMENTS === "undefined") return false;
      return ACHIEVEMENTS.filter(a => !a.hidden && a.id !== "certified-nerd").every(a => {
        try { return !!st.achievements?.[a.id] || (typeof a.check === "function" && !!a.check(st)); } catch { return false; }
      });
    }
  },
];

/* v0.18.0 review: the Bruce chain isn't built yet, so this stays out of the
   live list until it is. Every advertised achievement must be earnable. */
const FUTURE_ACHIEVEMENTS = [
];