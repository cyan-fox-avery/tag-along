/* Tag Along achievements — v0.18.0.
   Visible upfront, but each shows a breadcrumb hint until unlocked — never the
   outright requirement. Sarah's voice: evocative, playful, precise.
   Loaded BEFORE script.js; ACHIEVEMENTS is global. */
const ACHIEVEMENTS = [
  {
    id: "first-tag",
    name: "Tag, You're It",
    icon: "🏷️",
    breadcrumb: "tag your first shark",
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
    breadcrumb: "tag the garbage can of the sea",
    description: "Tagged a tiger shark. It'll eat anything. Anything.",
    check: (st) => !!st.tagged.tiger
  },
  {
    id: "walks",
    name: "It Walks!",
    icon: "🚶",
    breadcrumb: "tag a shark that goes for strolls",
    description: "Tagged an epaulette shark. Yes, it walks. On its fins. Sharks do that.",
    check: (st) => !!st.tagged.epaulette
  },
  {
    id: "first-name",
    name: "On a First-Name Basis",
    icon: "📝",
    breadcrumb: "get on a first-name basis with every shark",
    description: "Gave every tagged shark a nickname. They're individuals, after all.",
    check: (st) => {
      const ids = Object.keys(st.tagged);
      return ids.length > 0 && ids.every(id => st.tagged[id].name && st.tagged[id].name.trim());
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
    breadcrumb: "give a shark a very personal name",
    description: "Named a shark Sarah. She noticed. She's still talking about it.",
    check: (st) => Object.values(st.tagged).some(t => (t.name || "").trim().toLowerCase() === "sarah")
  },
  {
    id: "ocean-hopper",
    name: "Ocean Hopper?",
    icon: "🗺️",
    breadcrumb: "visit every region",
    description: "Ran expeditions in every region. The whole ocean is your office now.",
    check: (st) => {
      const regions = Object.keys(REGIONS).filter(r => !REGIONS[r].locked);
      return regions.length > 0 && regions.every(r => (st.stats.regionsVisited || []).includes(r));
    }
  },
  {
    id: "full-buffet",
    name: "Full Buffet",
    icon: "🍽️",
    breadcrumb: "try everything on the menu",
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
    breadcrumb: "tag a shark that really needed the science",
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
    breadcrumb: "complete 10 expeditions",
    description: "Completed 10 expeditions. You're not a landlubber anymore.",
    check: (st) => (st.stats.expeditions || 0) >= 10
  },
  {
    id: "bruce",
    name: "You Named Him WHAT?",
    icon: "🎬",
    breadcrumb: "name a shark the most popular shark name",
    description: "Named a shark Bruce and followed the rabbit hole all the way down.",
    /* The Bruce chain (Sarah's Jaws conversation) isn't built yet — this stays
       locked until it is. The breadcrumb is visible; the check waits. */
    check: (st) => !!st.bruceChainComplete
  }
];
