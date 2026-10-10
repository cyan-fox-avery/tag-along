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
    id: "something-water",
    name: "Something in the Water",
    icon: "🌊",
    breadcrumb: "something in the water...",
    description: "Tagged a shark with the right scent in the water. Chum works.",
    check: (st) => !!(st.stats.chumTags > 0)
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
    id: "sea-legs",
    name: "Sea Legs",
    icon: "⚓",
    breadcrumb: "ten trips out",
    description: "Completed 10 expeditions. You're not a landlubber anymore.",
    check: (st) => (st.stats.expeditions || 0) >= 10
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
    id: "bait-switch",
    name: "Bait and Switch",
    icon: "🎣",
    breadcrumb: "every tool in the kit",
    description: "Used every method in the field manual: chum, seal scent, boat survey, spotter plane, and the sightings network.",
    check: (st) => {
      const opts = ["chum", "seal", "boat", "plane", "network"];
      return opts.every(o => (st.stats.methodsUsed || []).includes(o));
    }
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
        return s && locked.includes(s.combo.region);
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
    check: (st) => !!st.bruceChainComplete
  },
  {
    id: "white-whale",
    name: "White Whale",
    icon: "🐋",
    breadcrumb: "the rarest shark in the sea",
    description: "Tagged a megamouth shark. Only around 300 have ever been documented. This is the big one.",
    check: (st) => !!st.tagged.megamouth
  },
];

/* v0.18.0 review: the Bruce chain isn't built yet, so this stays out of the
   live list until it is. Every advertised achievement must be earnable. */
const FUTURE_ACHIEVEMENTS = [
];