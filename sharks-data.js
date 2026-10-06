/* sharks-data.js — shark roster module (split from script.js in v0.13.0).
   Loaded BEFORE script.js; SHARKS is global and read everywhere.
   v0.13.0: 21 sharks (15 + the six-shark wave). */

/* Field notes: short, dense, real. Everything the planner needs is in
   here — region, depth range, food — but nothing is handed to you.
   Read like a scientist, not a checklist.
   NOTE (v0.6.0): each shark's `opener` is a DRAFT success-text opener for
   Sarah, written to match her established voice. Avery is the game's writer
   and will revise or replace these freely — they are placeholders for his
   pass, not final copy. */
const SHARKS = [
  {
    id: "nurse",
    name: "Nurse Shark", latin: "Ginglymostoma cirratum", status: "Vulnerable",
    code: "NS",
    combo: { region: "caribbean", bait: ["crustaceans", "urchins"] },
    depths: ["surface", "reef"],
    methods: { attract: ["chum"] },
    sizeRange: [2.0, 3.0],
    research: "A bottom-dweller of the warm, shallow tropical Atlantic. In the Caribbean Sea, nurse sharks spend their days piled together under reef ledges — sometimes in heaps of forty. After dark they head out alone, sweeping the sandy shallows with the whisker-like barbels on their snouts, vacuuming up crabs, lobster and shellfish. They rarely leave water shallower than about 75 metres. They hunt as much by smell as by sight — a slick of fish-oil chum drifting on the current can pull them in from well down-current.",
    hook: "By day they nap in cuddly heaps of up to 40 on the seafloor.",
    bonus: "Nurse sharks can pump water over their gills while sitting perfectly still — most sharks have to keep swimming to breathe. That's the secret behind the cuddle heaps.",
    cheer: "Nurse sharks are the cuddiest. Forty of them napping in a pile, just vibing. I'm so jealous.",
    opener: "A nurse shark! Was it in the cuddle heap? Tell me everything.",
    sketchCap: "barbels (the 'whiskers')",
    nameIdeas: ["Puddles", "Biscuit", "Sandy", "Nugget"]
  },
  {
    id: "thresher",
    name: "Thresher Shark", latin: "Alopias vulpinus", status: "Vulnerable",
    code: "TS",
    combo: { region: "open-atlantic", bait: ["schooling-fish", "squid"] },
    depths: ["reef", "twilight"],
    methods: { attract: ["chum"] },
    sizeRange: [3.0, 4.6],
    research: "Thresher sharks follow warm water through tropical and temperate oceans, often far from shore in the open Atlantic. They spend the daylight hours deep below the sunlit layer and rise toward the surface after dark. Out in the mid-water they herd schools of anchovies, herring and mackerel — squid too, when they cross paths — then stun them with a whip of the enormous tail that makes up half their body length. Most of their lives happen somewhere between 30 and 550 metres down. A chum slick is the classic way to draw one within tagging range — out here, scent travels farther than any bait.",
    hook: "That tail looks perpetually nervous, but it's actually a sword. Threshers hunt by tail-whipping.",
    bonus: "Threshers have been seen hunting in pairs, herding schools of fish into a tight ball before taking turns striking with their tails.",
    cheer: "Threshers hunt by whipping their tails — half their body length, fast enough to stun fish. Coolest hunting method in the ocean, no contest.",
    opener: "A thresher! Did you see the tail whip? Tell me everything.",
    sketchCap: "the tail (half the body!)",
    nameIdeas: ["Whip", "Nervous Nigel", "Swoosh", "Comet"]
  },
  {
    id: "whale",
    name: "Whale Shark", latin: "Rhincodon typus", status: "Endangered",
    code: "WS",
    combo: { region: "philippines", bait: "plankton" },
    depths: ["surface", "reef"],
    methods: { aggregation: ["boat", "plane", "network"] },
    sizeRange: [5.5, 12.0],
    research: "The biggest fish in the ocean roams all tropical and warm-temperate seas, and this season a large aggregation has gathered off the Philippines. Whale sharks don't chase anything — they find seasonal blooms of plankton and swim slowly through them with their enormous mouths wide open. Each shark's spot pattern is unique, like a fingerprint. They cruise right at the surface where the water turns green, sometimes dipping a little deeper over reefs. Nobody chums for a whale shark — you find the aggregation. Researchers work the green water by boat, scan from the air with spotter planes that radio the boat onto a shark, and phone round the local network of fishermen and dive boats for sightings. Find the aggregation, and the sharks are already there.",
    hook: "The biggest fish in the ocean, and it eats some of the smallest food. Gentle polka-dotted bus.",
    bonus: "Whale sharks can dive deeper than 1,900 metres — among the deepest dives ever recorded for any fish — then cruise back up to the surface to feed.",
    cheer: "Every whale shark's spot pattern is unique, like a fingerprint. You tagged a one-of-a-kind giant.",
    opener: "A whale shark! The biggest fish in the ocean! Did you count the spots?",
    sketchCap: "spot pattern (like a fingerprint)",
    nameIdeas: ["Dot", "Bus", "Domino", "Galaxy"]
  },
  {
    id: "goblin",
    name: "Goblin Shark", latin: "Mitsukurina owstoni", status: "Least Concern",
    code: "GS",
    combo: { region: "japan", bait: "squid" },
    depths: ["twilight", "deep"],
    methods: { attract: ["chum"] },
    sizeRange: [2.5, 4.0],
    research: "A living fossil from the deep continental slopes — most records come from Sagami Bay in Japan. Goblin sharks live in total darkness between about 270 and 960 metres, drifting over the seafloor and ambushing deep-sea squid and fish. Their jaws shoot forward like a slingshot, and they find prey by sensing the faint electricity of living things. A drifting chum slick can lift one off the bottom — in the deep dark, scent is one of the few things that travels.",
    hook: "The only living member of a 125-million-year-old lineage. Pink, pointy-nosed, and deeply weird.",
    bonus: "A goblin shark's pink colour comes from blood vessels showing through its thin, almost translucent skin.",
    cheer: "125 million years of evolution and it looks like that. I love it so much.",
    opener: "A goblin shark! The pink deep-sea weirdo! Was the snout as pointy as the pictures?",
    sketchCap: "the snout (a living fossil)",
    nameIdeas: ["Nosey", "Fossil", "Blush", "Slingshot"]
  },
  {
    id: "tiger",
    name: "Tiger Shark", latin: "Galeocerdo cuvier", status: "Near Threatened",
    code: "TI",
    /* The garbage can of the sea: bait is forgiving (any meaty bait),
       so the real puzzle is WHERE. Honesty first — some sharks are
       easier than others. */
    combo: { region: "maldives", bait: ["schooling-fish", "squid", "crustaceans", "tuna"] },
    depths: ["surface", "reef"],
    methods: { attract: ["chum", "seal"] },
    sizeRange: [3.0, 5.5],
    research: "Tiger sharks patrol tropical and subtropical waters worldwide \u2014 everywhere except the Mediterranean. Around the Maldives they cruise the atoll lagoons and reef edges, mostly in the sunlit shallows from the surface down through the reefs. They'll eat almost anything that crosses their path: schooling fish, squid, crabs, turtles, seabirds, tuna \u2014 even seals, and the occasional floating oddity. Researchers have found license plates in their stomachs.\n\nWith tigers, bait is the easy part \u2014 anything meaty will do, from schooling fish to tuna. The real question is where, not what. A fish-oil chum slick drifting through a Maldivian lagoon speaks directly to the curiosity that makes them try everything once.",
    hook: "Pups wear bold dark stripes that fade with age — a tiger costume they eventually outgrow.",
    bonus: "Tiger sharks cross entire ocean basins. One tagged individual travelled more than 7,500 kilometres.",
    cheer: "Tigers will eat anything — fish, turtles, seabirds, the occasional license plate. Glorious, indiscriminate appetite.",
    opener: "A tiger shark! The garbage can of the sea! Tell me everything.",
    sketchCap: "stripes (they fade with age)",
    nameIdeas: ["Stripes", "Tigger", "Marbles", "Scout"]
  },
  {
    id: "sandtiger",
    name: "Sand Tiger Shark", latin: "Carcharias taurus", status: "Critically Endangered",
    code: "ST",
    combo: { region: "north-carolina", bait: ["squid", "schooling-fish", "ray"] },
    depths: ["surface", "reef"],
    methods: { attract: ["chum"] },
    sizeRange: [2.0, 3.2],
    research: "Sand tiger sharks haunt subtropical and temperate shores — everywhere except the eastern Pacific. Off North Carolina's Outer Banks, the Graveyard of the Atlantic, they gather around old shipwrecks in summer, and individual females return to the same wrecks year after year. Despite the toothy grin, they're slow, docile ambush hunters — they gulp air at the surface and hold it to hover perfectly still in the water column, then strike at passing schools of fish, squid and skates. They rarely venture deeper than about 190 metres, preferring the sunlit shallows around reefs and wrecks. They're scent-hunters first: a fish-oil slick on the current speaks their language.",
    hook: "Gulps air at the surface to hover motionless like a blimp — the only shark that does this.",
    bonus: "Looks like a nightmare, but there are no confirmed fatalities — one of the most docile big sharks in the ocean.",
    cheer: "They hover motionless by holding air like a balloon, then just strike. Gentle, floaty ambush predators.",
    opener: "A sand tiger! Was it at the wrecks? Tell me everything.",
    sketchCap: "the grin (all teeth, no bite)",
    nameIdeas: ["Toothy", "Grin", "Smiley", "Wreck"]
  },
  {
    id: "galapagos",
    name: "Galápagos Shark", latin: "Carcharhinus galapagensis", status: "Least Concern",
    code: "GA",
    combo: { region: "galapagos", bait: ["schooling-fish", "squid"] },
    depths: ["surface", "reef"],
    methods: { attract: ["chum"] },
    sizeRange: [2.4, 3.7],
    research: "A reef shark of remote oceanic islands — and the one place it truly lives up to its name is the Galápagos. There, Galápagos sharks patrol the rocky reefs and island slopes, often in the clear shallows where schools of reef fish gather. They are bold and curious, sometimes circling divers for a closer look. They hunt jacks, groupers, squid and other reef fish, mostly in water shallower than about 80 metres, rarely venturing into the deep. A chum slick off the reef edge is how researchers bring these bold sharks into tagging range.",
    hook: "Bold island shark — known to circle divers just to check them out.",
    bonus: "Galápagos sharks use nursery areas: pups grow up in sheltered island bays before heading out to the reefs.",
    cheer: "Bold, curious island sharks. The Galápagos ones practically introduce themselves.",
    opener: "A Galápagos shark! Did it circle you? Tell me everything.",
    sketchCap: "the curious eye",
    nameIdeas: ["Darwin", "Isla", "Booby", "Lava"]
  },
  {
    id: "greatwhite",
    name: "Great White Shark", latin: "Carcharodon carcharias", status: "Vulnerable",
    code: "GW",
    combo: { region: "south-africa", bait: ["tuna", "schooling-fish"] },
    depths: ["surface", "reef"],
    methods: { attract: ["seal", "chum"] },
    sizeRange: [3.5, 6.0],
    research: "The ocean's most famous hunter cruises temperate coasts worldwide \u2014 and off South Africa, great whites gather where the seals haul out. They patrol the surface waters and reef edges, sometimes breaching clean out of the sea in pursuit of prey. Unusually for a fish, they keep their swimming muscles warm, which keeps them fast in cool water.\n\nThey eat seals and big oily fish like tuna, hunting mostly in the sunlit upper layers. Seal scent in the water is the classic attractant here \u2014 it speaks to what they're already following \u2014 though a chum slick of tuna turns heads too.",
    hook: "Warm-bodied hunter; can breach fully out of the water.",
    bonus: "A great white's bite is investigative — most encounters are a single test bite, then it lets go and moves on.",
    cheer: "The world's largest predatory fish, and you tagged one. The seal-tracking, warm-muscled legend.",
    opener: "A great white! Did it breach? Tell me everything!",
    sketchCap: "the countershaded flank",
    nameIdeas: ["Bruce", "Chomp", "Apex", "Finley"]
  },
  {
    id: "hammerhead",
    name: "Great Hammerhead", latin: "Sphyrna mokarran", status: "Critically Endangered",
    code: "HH",
    combo: { region: "caribbean", bait: ["ray", "schooling-fish"] },
    depths: ["surface", "reef"],
    methods: { attract: ["chum"] },
    sizeRange: [2.5, 5.0],
    research: "The largest of the hammerheads roams tropical seas, and the Caribbean's reefs are prime hunting ground. That wide hammer isn't just for show — it's packed with sensors that pick up the faint electricity of stingrays buried in the sand, their favourite food — though a passing school of reef fish works too. Great hammerheads cruise the shallows and reef flats, rarely deeper than about 80 metres, sweeping their heads side to side like metal detectors. A chum slick gives all those sensors something to follow.",
    hook: "The hammer is a sensory array — it 'sees' stingrays hidden in sand.",
    bonus: "Hammerhead pups are born with a soft, folded hammer that straightens out as they grow.",
    cheer: "That hammer isn't for show — it's a sensory array. Stingrays don't stand a chance.",
    opener: "A hammerhead! Did you watch it sweep for rays? Tell me everything.",
    sketchCap: "the hammer (a sensory array)",
    nameIdeas: ["Hammer", "T-Bone", "Nail", "Mal"]
  },
  {
    id: "mako",
    name: "Shortfin Mako", latin: "Isurus oxyrinchus", status: "Endangered",
    code: "MK",
    combo: { region: "open-atlantic", bait: ["tuna", "squid"] },
    depths: ["surface", "reef"],
    methods: { attract: ["chum"] },
    sizeRange: [2.0, 3.8],
    research: "The fastest shark in the sea lives life in the fast lane of the open Atlantic. Makos are built like torpedoes — deep blue above, warm-muscled — and they chase down squid and speedy fish like mackerel and tuna. They hunt in the sunlit surface waters, rarely diving below about 150 metres, where the light is good and the prey is quick. If something out here is moving at 70 kilometres an hour, it's a mako. Chum works on them — makos pick up the scent of fish oil from far down-current.",
    hook: "Clocks ~70 km/h — the fastest shark alive.",
    bonus: "Makos are warm-bodied like great whites — their swimming muscles run several degrees warmer than the water.",
    cheer: "70 km/h, warm muscles, leaps 20 feet out of the water. The ocean's race car.",
    opener: "A mako! The fastest shark in the sea! Tell me everything!",
    sketchCap: "the torpedo body",
    nameIdeas: ["Dash", "Turbo", "Zip", "Rocket"]
  },
  {
    id: "basking",
    name: "Basking Shark", latin: "Cetorhinus maximus", status: "Endangered",
    code: "BS",
    combo: { region: "cornwall", bait: "plankton" },
    depths: ["surface", "reef"],
    methods: { aggregation: ["boat", "network"] },
    sizeRange: [6.0, 9.0],
    research: "The second-biggest fish in the ocean feeds like the biggest — by swimming slowly through plankton with its enormous mouth wide open. Basking sharks visit temperate coasts in summer, and the plankton-rich waters off Cornwall are a favourite. Look for the tall dorsal fin cutting the surface, the huge mouth agape. They feed right at the top where the water turns green, sometimes dipping a little deeper over the reefs. Like whale sharks, they're following the bloom — nobody scents the water for a basking shark. Summer researchers find them by working the green surface water by boat, and by the sightings network: divers, fishermen and sailors phoning in every tall dorsal fin they see. Find the aggregation, and the sharks are already there.",
    hook: "Second-largest fish on Earth; feeds with a mouth up to a metre wide.",
    bonus: "A basking shark filters the equivalent of an Olympic swimming pool of water every hour.",
    cheer: "Second-biggest fish in the world, eating the smallest food. Gentle giants, both of them.",
    opener: "A basking shark! Did you see the dorsal fin cut the surface? Tell me everything!",
    sketchCap: "the gaping mouth",
    nameIdeas: ["Sunny", "Lounge", "Drifter", "Mellow"]
  },
  {
    id: "epaulette",
    name: "Epaulette Shark", latin: "Hemiscyllium ocellatum", status: "Least Concern",
    code: "EP",
    combo: { region: "papua-new-guinea", bait: ["crustaceans", "urchins"] },
    depths: ["surface", "reef"],
    /* The honest neutral: a tiny reef worm-hunter. Scent plumes aren't
       how you'd target it, so no method boosts it — no penalty. */
    methods: {},
    sizeRange: [0.6, 1.0],
    research: "A small reef shark with an extraordinary trick: it can walk. Epaulette sharks live on the shallow reef flats of Papua New Guinea, where the tide sometimes strands them in ankle-deep pools. Instead of panicking, they clamber from pool to pool on their paddle-like fins, hunting crabs, shellfish and worms. They rarely leave water shallower than a few metres \u2014 the intertidal zone is their whole world.\n\nThere's no scenting the water for an epaulette \u2014 they're worm-hunters, not chasers, so no attractant boosts the odds. The method is timing and sharp eyes: work the reef flat at low tide, when the pools are isolated and the walking sharks are out.",
    hook: "Walks between tide pools on its fins when the reef drains.",
    bonus: "Epaulettes can survive over an hour out of water by slowing their bodies right down — the ultimate low-tide specialist.",
    cheer: "It walks! On its fins! Like a puppy strolling the reef. I can't cope, in the best way.",
    opener: "An epaulette! Did you see it walk? Tell me everything!",
    sketchCap: "the walking fin",
    nameIdeas: ["Puddles", "Waddles", "Tiptoe", "Reef"]
  },
  {
    id: "lemon",
    name: "Lemon Shark", latin: "Negaprion brevirostris", status: "Vulnerable",
    code: "LS",
    /* The yellow nursery shark: Bimini's famous returners. Night feeder
       that hunts by electroreception — sardines (folded into
       schooling-fish) fished at night are the honest bait. */
    combo: { region: "caribbean", bait: ["schooling-fish"] },
    depths: ["surface", "reef"],
    methods: { attract: ["chum"] },
    sizeRange: [2.4, 3.4],
    research: "A heavy-bodied shark of the warm, shallow western Atlantic, unmistakable for two things: a lemon-yellow wash over its flanks, and two dorsal fins of nearly equal size \u2014 the quickest ID feature in the book. In the Caribbean Sea they haunt mangrove lagoons and shallow bays, rarely leaving water shallower than about 90 metres; surface waters and reefs are their whole world.\n\nThe juveniles grow up in the mangroves, and the females do something extraordinary: after years away, they return to the exact nursery where they themselves were born to give birth \u2014 decades of tagging at Bimini have followed the same mothers home. They hunt mostly at night, sensing the faint electricity of sleeping fish. Fish the Caribbean shallows after dark: a chum slick with sardines (schooling fish) is the classic combination.",
    hook: "Females return to the exact nursery where they were born to give birth — Bimini's most faithful mothers.",
    bonus: "Lemon sharks can live 25 to 30 years, and one lived to 40 in captivity. The Bimini tagging program has followed some individuals for decades.",
    cheer: "The yellow one! My absolute favourite. The twin fins, the Bimini mothers coming home — everything about them.",
    opener: "A lemon shark! My favourite! Did you see the twin dorsal fins? Tell me everything!",
    sketchCap: "twin dorsal fins (nearly equal!)",
    nameIdeas: ["Zest", "Sunny", "Meringue", "Custard"]
  },
  {
    id: "blacktip",
    name: "Blacktip Reef Shark", latin: "Carcharhinus melanopterus", status: "Vulnerable",
    code: "BR",
    /* The knee-deep shark: reef flats so shallow the dorsal breaks
       water. Timid — frightened off by swimmers, but bait excites it. */
    combo: { region: "maldives", bait: ["schooling-fish", "crustaceans"] },
    depths: ["surface", "reef"],
    methods: { attract: ["chum"] },
    sizeRange: [1.2, 2.0],
    research: "The classic reef shark \u2014 the fin cutting the surface in every tropical daydream. In the Maldives, blacktip reef sharks patrol reef flats so shallow their dorsal fins break the water, each fin dipped in crisp black like ink. They are timid animals, often frightened away by swimmers, but bait excites them and they have been known to leap clear of the water when feeding.\n\nIndividuals hold tiny home ranges for years; photo-ID work found the same sharks choosing to hang out together, stable friendships on the reef. Work the Maldivian shallows, surface to reef: a chum slick over a reef flat with reef fish or shrimp will bring the locals in.",
    hook: "Patrols water so shallow its black-tipped dorsal fin breaks the surface.",
    bonus: "Blacktip reef sharks form stable, non-random social groups — the same individuals repeatedly choose each other's company, year after year.",
    cheer: "Knee-deep water, black-dipped fins, and a loyal friend group. The reef's socialites.",
    opener: "A blacktip! Did its fin break the surface? Tell me everything!",
    sketchCap: "black-tipped fins",
    nameIdeas: ["Inky", "Tippy", "Reef", "Shallows"]
  },
  {
    id: "whitetip",
    name: "Whitetip Reef Shark", latin: "Triaenodon obesus", status: "Vulnerable",
    code: "WR",
    /* The cave-napper: one of the few requiem sharks that can breathe while
       lying still, so by day it piles in reef caves. Hunts crevices
       by night — octopus and reef-fish scraps are the honest baits. */
    combo: { region: "philippines", bait: ["squid", "schooling-fish"] },
    depths: ["surface", "reef"],
    methods: { attract: ["chum"] },
    sizeRange: [1.0, 1.6],
    research: "A slender reef shark with white tips on its dorsal and tail, and a trick few requiem sharks share: it can pump water over its gills while lying perfectly still. On Philippine reefs, whitetip reef sharks pile together in caves and under ledges by day, heaped like firewood \u2014 they're fiercely loyal to one reef, returning to the same daytime shelter for months or years.\n\nBy night they slide out to hunt, wriggling into crevices after eels, octopus and spiny lobster in the shallow reefs. Find the cave and the sharks are already home: fish the Philippines at night with octopus or reef-fish scraps, and a chum slick to draw them out.",
    hook: "Naps in heaps in reef caves by day — one of the few requiem sharks that can breathe while lying still.",
    bonus: "The whitetip reef shark is the only living species in the genus Triaenodon.",
    cheer: "The cave-nappers. Piled in heaps by day, hunting crevices by night. A genus all to themselves.",
    opener: "A whitetip! Was it in the cave heap? Tell me everything!",
    sketchCap: "white-tipped fins",
    nameIdeas: ["Nappy", "Cavey", "Puddles", "Heap"]
  },
  {
    id: "blue",
    name: "Blue Shark", latin: "Prionace glauca", status: "Near Threatened",
    code: "BL",
    /* The indigo wanderer: countershaded, long-finned, and migratory on
       an oceanic scale. Oily schooling fish or squid under a chum slick. */
    combo: { region: "open-atlantic", bait: ["schooling-fish", "squid"] },
    depths: ["surface", "reef", "twilight"],
    methods: { attract: ["chum"] },
    sizeRange: [2.0, 3.8],
    research: "Blue sharks are the open Atlantic's great wanderers \u2014 slender, long-snouted, and unmistakable: deep indigo blue on the back fading to snow-white underneath, perfect countershading. They roam temperate and tropical waters worldwide, preferring cooler water, and spend most of their lives in the upper 150 metres \u2014 surface waters down through the reefs and into the twilight zone, rarely deeper than about 400 metres. Out here they hunt small schooling fish like herring, mackerel and hake, plus squid. A drifting fish-oil chum slick with oily baitfish or squid is the honest way to draw one in.\n\nThey are among the longest migrants of any shark: New England to South America runs are classic, and one shark tagged in Ireland was recaptured 274 days later off West Africa \u2014 an estimated 6,840 kilometre cruise. Their movements follow water temperature more than anything else, strongly seasonal. Females bear litters of 25 to 135 pups, among the largest litters of any shark.",
    hook: "Deep indigo back, snow-white belly \u2014 the most beautiful shark in the Atlantic, and one of its longest migrants.",
    bonus: "A blue shark tagged in Ireland was recaptured 274 days later off West Africa: an estimated 6,840 km cruise. Female blue sharks have much thicker skin than males \u2014 courtship involves biting \u2014 and can store sperm until conditions suit.",
    cheer: "The indigo one! Six thousand kilometres of open ocean behind it, and it still showed up for you. What a traveller.",
    opener: "A blue shark! Was it as blue as they say? Tell me everything!",
    sketchCap: "indigo countershading",
    nameIdeas: ["Indigo", "Cruiser", "Azure", "Voyager"]
  },
  {
    id: "porbeagle",
    name: "Porbeagle", latin: "Lamna nasus", status: "Vulnerable",
    code: "PO",
    /* The cold-water athlete: a warm-bodied lamnid off Cornwall, ID'd by
       the white patch on the first dorsal's trailing edge. Oily fish + chum. */
    combo: { region: "cornwall", bait: ["schooling-fish", "squid"] },
    depths: ["surface", "reef", "twilight"],
    methods: { attract: ["chum"] },
    sizeRange: [1.5, 3.0],
    research: "The porbeagle is the cold-water athlete of the North Atlantic \u2014 a stout, torpedo-bodied lamnid that looks like a compact great white, and hunts the chilly waters off Cornwall where the sea runs 5 to 12 degrees. Like its mako and white shark cousins it keeps its swimming muscles warm, which is how it stays fast in water that would slow most sharks down. The ID badge is unmistakable: a white patch on the trailing edge of the first dorsal fin. They range from the surface down past 700 metres, hunting mackerel, herring, cod and squid along the shelf edge.\n\nA fish-oil chum slick with oily schooling fish \u2014 mackerel or herring \u2014 or squid is the classic approach; porbeagles find chum hard to resist. One honest complication: the species is Vulnerable globally, but the Northeast Atlantic population is Critically Endangered, fished down to roughly a tenth of its original numbers in the last century. The sharks off Cornwall are survivors of that history.",
    hook: "A mini-great-white of chilly northern seas \u2014 warm-bodied, fast, and wearing a white badge on its dorsal fin.",
    bonus: "Northeast Atlantic porbeagles are Critically Endangered even though the species is Vulnerable globally. A tagged juvenile swam over 2,400 km in 122 days, Ireland to Morocco \u2014 the long migrations start young.",
    cheer: "The cold-water athlete! Warm muscles, a white dorsal badge, hunting mackerel in near-freezing water. Respect.",
    opener: "A porbeagle! Did you see the white patch on the dorsal fin? Tell me everything!",
    sketchCap: "white dorsal-fin patch (the ID badge)",
    nameIdeas: ["Porgie", "Chilly", "Mackerel", "Badge"]
  },
  {
    id: "silky",
    name: "Silky Shark", latin: "Carcharhinus falciformis", status: "Vulnerable",
    code: "SI",
    /* Named for its skin: denticles so fine it feels like silk. Shadows
       tuna schools in the tropical open Atlantic. Fish where the tuna are. */
    combo: { region: "open-atlantic", bait: ["tuna", "schooling-fish", "squid"] },
    depths: ["surface", "reef"],
    methods: { attract: ["chum"] },
    sizeRange: [2.0, 3.3],
    research: "The silky shark is named for its skin \u2014 the dermal denticles are so small and smooth that it genuinely feels like silk, a texture no other shark quite matches. It is a slender, quick requiem shark of the tropical open Atlantic, and it lives in the company of tuna: silky sharks shadow tuna schools for weeks and gather around fish aggregating devices, those floating objects the tuna fleet sets. Most of their lives happen in the upper 50 metres, near the shelf edge, though they have been recorded down to 500.\n\nFish where the tuna are: tuna chunks, oily schooling fish or squid, with a chum slick to hold their attention. One honest shadow over this shark \u2014 it is among the most heavily fished sharks in the world, and accounts for the vast majority of shark bycatch in tropical tuna purse-seine fisheries around those same aggregating devices. Juveniles satellite-tracked around the Gal\u00e1pagos routinely swam thousands of kilometres, spending less than half their time inside even that enormous marine reserve.",
    hook: "Named for skin like silk \u2014 the sleek shadow that follows every tuna school in the tropics.",
    bonus: "Juvenile silkies satellite-tracked around the Gal\u00e1pagos routinely left the 133,000 km\u00b2 marine reserve, spending less than half their time inside it. Protection has to think bigger than borders.",
    cheer: "The silk-skinned one! It probably followed a tuna school right to you. Opportunist, but make it elegant.",
    opener: "A silky shark! Was the skin really that smooth? Tell me everything!",
    sketchCap: "silk-smooth skin (tiny denticles)",
    nameIdeas: ["Silk", "Shadow", "Satin", "Tuna"]
  },
  {
    id: "oceanic",
    name: "Oceanic Whitetip", latin: "Carcharhinus longimanus", status: "Critically Endangered",
    code: "OW",
    /* The open-ocean sentinel: paddle-like white-tipped fins, bold and
       curious far offshore. Critically Endangered \u2014 this tag matters. */
    combo: { region: "open-atlantic", bait: ["tuna", "squid", "schooling-fish"] },
    depths: ["surface", "reef", "twilight"],
    methods: { attract: ["chum"] },
    sizeRange: [2.0, 3.5],
    research: "The oceanic whitetip is the sentinel of the open ocean \u2014 a bold, slow-cruising requiem shark built for blue-water emptiness, unmistakable for its long, rounded, paddle-like pectoral and dorsal fins blotched with white. (Not the reef napper from the Philippines \u2014 different genus, different ocean, different life; the white fin tips are a coincidence of naming.) They patrol the tropical open Atlantic far offshore in warm water, mostly in the upper couple of hundred metres, though telemetry has caught them diving past a thousand. They eat pelagic fish \u2014 tuna, barracuda \u2014 plus squid, seabirds and carrion, and they are famously curious around boats. Tuna chunks, squid or oily fish with a chum slick is the honest approach.\n\nThis tag carries weight: oceanic whitetips were once thought to be among the most abundant large sharks on Earth, and finning plus longline bycatch has cut some populations by 80 to 98%. The 2019 global assessment uplisted them to Critically Endangered. Movement data are still thin across much of their range \u2014 this is a shark science is still catching up with.",
    hook: "Long, rounded, white-tipped fins like paddles \u2014 the bold sentinel of the open ocean, and one of its most endangered.",
    bonus: "Oceanic whitetips were once thought to be among the most abundant large sharks on Earth. Finning and longline bycatch cut some populations by 80 to 98%. They are often accompanied by pilot fish swimming alongside.",
    cheer: "The open-ocean sentinel! Those paddle fins, that fearless curiosity \u2014 and you tagged one. A Critically Endangered one, no less.",
    opener: "An oceanic whitetip! The real open-ocean one, not the reef napper! Tell me everything!",
    sketchCap: "paddle-like white-tipped fins",
    nameIdeas: ["Paddles", "Sentinel", "Tippy", "Bluewater"]
  },
  {
    id: "sevengill",
    name: "Broadnose Sevengill", latin: "Notorynchus cepedianus", status: "Vulnerable",
    code: "SG",
    /* A shark out of deep time: seven gills, one far-back dorsal, Jurassic
       lineage. South African kelp forests and bays. Seal scent is honest
       here \u2014 Cape fur seals are documented prey. */
    combo: { region: "south-africa", bait: ["tuna", "schooling-fish", "squid"] },
    depths: ["surface", "reef"],
    methods: { attract: ["chum", "seal"] },
    sizeRange: [1.2, 3.0],
    research: "The broadnose sevengill is a shark out of deep time \u2014 seven gill slits instead of five, a single dorsal fin set far back near the tail, and a lineage, the Hexanchiformes, whose Jurassic fossils already wore seven gills. In South Africa they haunt kelp forests, bays and estuary mouths, mostly shallower than 136 metres, sometimes cruising water barely a metre deep. They are aggressive, opportunistic apex predators: seals, bony fish, rays, even other sharks, plus carrion. Their teeth come in two toolkits \u2014 jagged and cusped above, comb-shaped below, built for sawing through seal blubber.\n\nFish the South African shallows with oily fish and a chum slick; seal scent in the water is honest here too, since Cape fur seals are genuine prey. One caution from the field guides: sevengills get pushy around food, so this is a careful-boat tag. They move seasonally between the bays and deeper water, and show strong fidelity to their seasonal aggregations \u2014 the same sharks returning to the same bays.",
    hook: "Seven gills, one far-back dorsal fin, and a lineage older than the dinosaurs' heyday \u2014 the cow shark of the kelp forests.",
    bonus: "Sevengill relatives with seven gills were already swimming in the Jurassic \u2014 fossils 200 to 145 million years old show the same layout. Females bear litters of 67 to 104 pups, among the largest of any shark.",
    cheer: "Seven gills! A single dorsal fin! It is like a shark from a museum diorama came to life. Incredible.",
    opener: "A sevengill! Did you count all seven? Tell me everything!",
    sketchCap: "seven gill slits (most sharks have five)",
    nameIdeas: ["Seven", "Cowboy", "Kelpie", "Ancient"]
  },
  {
    id: "bronze",
    name: "Bronze Whaler", latin: "Carcharhinus brachyurus", status: "Vulnerable",
    code: "BW",
    /* The bronze star of the Sardine Run \u2014 same species as the copper
       shark, different regional name. Sardines + chum off South Africa. */
    combo: { region: "south-africa", bait: ["schooling-fish", "squid", "tuna"] },
    depths: ["surface", "reef"],
    methods: { attract: ["chum"] },
    sizeRange: [2.0, 3.3],
    research: "The bronze whaler \u2014 called the copper shark in the Americas, same animal \u2014 is the bronze-flanked star of South Africa's annual Sardine Run. When the sardines move up the coast in vast shoals, bronze whalers drive the baitballs upward from below while dolphins and gannets attack from above, in the most choreographed hunt in the ocean. Nobody rehearsed it. Outside the run they cruise warm-temperate coastal waters from the surface down to about 100 metres, hunting sardines, anchovies, mackerel and squid. Sardines or other schooling fish with a chum slick is the honest approach.\n\nSouth African tagging shows them migrating over 1,000 kilometres along the South African and Mozambique coasts in a single cycle, with females moving between coastal nursery bays and offshore waters. They live life slowly: females do not mature until about 20 years old and pup only every two to three years \u2014 among the slowest reproduction of any coastal requiem shark, and a big part of why they are Vulnerable.",
    hook: "The bronze star of the Sardine Run \u2014 driving baitballs upward while dolphins and gannets rain down from above.",
    bonus: "Female bronze whalers do not mature until about 20 years old and pup only every two to three years \u2014 among the slowest reproduction of any coastal requiem shark. Males and females live apart for most of the year.",
    cheer: "The Sardine Run star! Bronze, bold, and it hunts baitballs with dolphins. What a show-off. Affectionate.",
    opener: "A bronze whaler! The sardine-run hunter! Tell me everything!",
    sketchCap: "bronze flanks",
    nameIdeas: ["Bronze", "Sardine", "Runny", "Copper"]
  },
];
