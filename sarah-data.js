/* sarah-data.js — Sarah's texts module (split from script.js in v0.12.0).
   Loaded BEFORE script.js; COUSIN_CHATS and COUSIN_NUDGES are global.
   Voice: dignified enthusiasm — calm, precise, warm; excitement earned. */

/* Sarah's texts: genuine conversation, never a "hints" UI.
   v0.12.0 voice pass: dignified enthusiasm. Sarah is an autistic adult
   whose love of sharks runs calm and deep — precise, warm, measured.
   Exclamation marks are earned, not default: they live where excitement
   is real (a tag, a genuinely thrilling fact), never as decoration.
   Keyed by species so hints and chats stay specific to what the player
   is actually searching for. */
const COUSIN_CHATS = {
  nurse: [
    { them: "Nurse sharks can breathe without swimming, did you know that? Most sharks have to keep moving to push water over their gills, but nurse sharks just pump it through while sitting still. That's the whole secret behind the cuddle heaps.", me: "That explains the piles of forty. Remarkable." },
    { them: "Nurse sharks have these little whisker things on their snouts \u2014 barbels. They drag them through the sand like fingers, feeling for crabs. It's the most tactile hunting I've ever heard of.", me: "Hunting by touch. In the dark, no less." },
    { them: "Forty nurse sharks in one pile. I keep trying to picture it and my brain just gives me a heap of puppies with fins.", me: "The cuddle heap is real and it is spectacular." }
  ],
  thresher: [
    { them: "A thresher's tail is half its entire body. They whip it so fast the shockwave stuns the fish first. A sword made of shark.", me: "Half the body. Nature keeps outdoing itself." },
    { them: "More than one thresher has been seen circling the same bait ball — whether that's real teamwork or just sharks agreeing the fishing is good, nobody's proven yet. The tail-slap itself is well documented though.", me: "Teamwork: unconfirmed. Tail-slap: undeniable." },
    { them: "A thresher's tail is so long that for a while scientists weren't sure how they ate with it. Turns out the tail IS how they eat.", me: "The confusion was understandable." }
  ],
  whale: [
    { them: "Whale sharks are the biggest fish in the ocean and they eat some of the smallest food. They just swim around with their mouths open like slow vacuums. Honestly, lifestyle goals.", me: "The gentle polka-dotted bus. Hard to argue." },
    { them: "Each whale shark's spot pattern is unique, like a fingerprint. Researchers ID individuals from photos \u2014 some have been tracked for decades that way.", me: "A fingerprint you can photograph from a boat." },
    { them: "Whale sharks can dive deeper than 1,900 metres \u2014 one of the deepest dives ever recorded for a fish \u2014 then just cruise back up like it was nothing.", me: "Casually visiting the abyss." }
  ],
  goblin: [
    { them: "Goblin sharks are pink because their skin is so thin you can see the blood vessels through it. And their jaws shoot forward like a slingshot. 125 million years old and still weird.", me: "Deep, pink, and ancient. The best combination." },
    { them: "The goblin shark is the only living member of a 125-million-year-old lineage. Everything else in its family is a fossil. It's a swimming museum piece.", me: "A living fossil is an understatement." },
    { them: "Goblin sharks find prey by sensing electricity \u2014 the faint bioelectric field of living things. In total darkness, that's their eyesight.", me: "Seeing with electricity." }
  ],
  tiger: [
    { them: "Tiger sharks are called the garbage cans of the sea, which is rude but accurate. Researchers have found license plates in their stomachs. License plates.", me: "Not picky is an understatement." },
    { them: "Tiger sharks' stripes fade as they get older. The babies are stripy and the big adults are almost plain. They outgrow their own name.", me: "A tiger that fades its stripes. Poetic." },
    { them: "Every tiger-shark tooth is basically a hooked, serrated can opener, shaped to saw through tough prey like turtle shell. Top and bottom jaws carry the same style.", me: "Specialized cutlery." }
  ],
  sandtiger: [
    { them: "Sand tigers look terrifying but they're total softies. They gulp air at the surface and hold it to hover perfectly still. Floaty balloon sharks.", me: "The toothy grin is false advertising." },
    { them: "Sand tiger pups eat each other in the womb \u2014 only the biggest per uterus survives to be born. Intrauterine cannibalism. As intense as it sounds.", me: "Born the sole survivor. Grim start." },
    { them: "The same female sand tigers return to the same North Carolina wrecks every year. Years running. They have favourite shipwrecks.", me: "Favourite shipwrecks. I love that." }
  ],
  galapagos: [
    { them: "Gal\u00e1pagos sharks are so curious they'll circle divers just to have a look. Bold reef sharks of remote islands. I'd be nervous and flattered.", me: "Curiosity in a shark that size is a lot." },
    { them: "Gal\u00e1pagos sharks do this thing called gaping \u2014 they open their mouths wide at divers, not to bite, just displaying. Intimidating communication.", me: "A warning yawn from a three-metre shark." },
    { them: "They're one of the only sharks that really live up to a place name. Gal\u00e1pagos sharks, at the Gal\u00e1pagos. Truth in advertising.", me: "Rare honesty in naming." }
  ],
  greatwhite: [
    { them: "Great whites keep their swimming muscles warm \u2014 regional endothermy. A warm-bodied shark that can breach clear out of the water. Jaws undersold them, honestly.", me: "Warm muscles on a fish. Evolution showing off." },
    { them: "A great white's maximum bite force has been estimated around 1.8 tonnes. Humans are often released after the first bite, but scientists still debate why those bites happen.", me: "A tonne of force, then released. The debate continues." },
    { them: "The White Shark Caf\u00e9 \u2014 every winter, California white sharks swim to the middle of the Pacific and hang around for months. Nobody fully knows why.", me: "A mysterious mid-ocean gathering." }
  ],
  hammerhead: [
    { them: "A hammerhead's head is packed with electroreceptors. They sweep it side to side over the sand and can feel a stingray's heartbeat buried underneath. A metal detector made of shark.", me: "Feeling a heartbeat through sand. Astonishing." },
    { them: "That wide head gives hammerheads an unusually broad visual field and enhanced binocular overlap, which helps with depth perception. And it works like a wing, giving extra lift in turns. Hydrodynamic too.", me: "Panoramic and aerodynamic." },
    { them: "Great hammerheads are solitary, unlike scalloped hammerheads that school in the hundreds. The big ones hunt alone.", me: "Lone wolves of the reef." }
  ],
  mako: [
    { them: "Mako is the M\u0101ori word for shark \u2014 the word. And they're warm-bodied like great whites, which is how they stay so fast in cool water.", me: "70 kilometres an hour. With teeth." },
    { them: "Makos can leap 20 feet out of the water. Twenty feet \u2014 a two-storey house, cleared by a shark chasing tuna.", me: "A two-storey breach. Absurd." },
    { them: "They hunt by lunging up from below and biting the prey's tail first, so it can't swim away. Tactical. Ruthless. Effective.", me: "Disable the engine, then eat. Cold." }
  ],
  basking: [
    { them: "Basking sharks are the second-biggest fish in the ocean and they just... bask. Slow circles through plankton with their huge mouths open. The most relaxed giant alive.", me: "Maximum size, minimum effort. Respect." },
    { them: "A basking shark's mouth can open over a metre wide. A metre. And all that goes in is plankton. The most disproportionate mouth in nature.", me: "A barn door for catching dust." },
    { them: "Basking sharks have been seen breaching \u2014 the second-biggest fish in the ocean launching itself into the air. Nobody knows why. Play? Parasites? Joy?", me: "A breaching bus. Wonderful." }
  ],
  epaulette: [
    { them: "Epaulette sharks can survive over an hour out of water by slowing their bodies right down. They just wait out the low tide in a puddle, then walk to the next one.", me: "A shark that commutes on foot. Incredible." },
    { them: "Epaulettes hunt by swinging their heads side to side, feeling for worms with electroreception. They vacuum the reef flat like little Roombas.", me: "A Roomba with fins." },
    { them: "When the tide strands them, epaulettes slow their heart rate and survive on almost no oxygen for over an hour. They just wait. Patient little walkers.", me: "An hour of patience in a puddle." }
  ],
  lemon: [
    { them: "Lemon shark mothers return to the exact nursery where they were born to give birth. Decades of tagging at Bimini, the same mothers coming home. It's called philopatry. I think about it a lot.", me: "Swimming home to where you were born. That's profound." },
    { them: "Lemon sharks can learn \u2014 in lab tests they figured out tasks faster than some other sharks, and remembered them. Smart, social, yellow.", me: "Clever and golden." },
    { them: "Both of a lemon shark's dorsal fins are nearly the same size, which is unusual. Most sharks have a big first dorsal and a small second. Lemons didn't get the memo.", me: "Matching fins. Very stylish." }
  ],
  blacktip: [
    { them: "Blacktip reef sharks have stable friend groups. Photo-ID in Moorea showed the same individuals choosing to hang out together, year after year. Sharks with best friends.", me: "Social lives on the reef. Lovely." },
    { them: "Blacktips are timid \u2014 divers scare them off all the time. But drop bait in the water and they turn into acrobats, leaping clean out. Shy until dinner.", me: "Stage fright, except for food." },
    { them: "They give birth in shallow nurseries and the pups stay in the shallows for years. Knee-deep water, baby sharks, tiny home ranges. The suburbs of the sea.", me: "Suburban sharks." }
  ],
  whitetip: [
    { them: "Whitetip reef sharks are the only living species in their genus, Triaenodon. An evolutionary singleton. And they pile up in caves to nap like puppies.", me: "A genus of one. That's special." },
    { them: "Whitetips hunt in loose groups at night, but it's not a feeding frenzy \u2014 each shark hunts for itself, just nearby. Parallel play. Very relatable.", me: "Hunting together, separately. I get it." },
    { them: "They can go six weeks without eating. Six weeks. Then they wriggle into a crevice and pull out an octopus like it was nothing.", me: "Six weeks of patience, one octopus." }
  ]
};

const COUSIN_NUDGES = {
  /* v0.12.0 voice pass: same dignified register as the chats. Hints are
     useful, not hyper — Sarah respects the player enough to be precise. */
  nurse:   "Nurse sharks stay shallow \u2014 surface to reef, about 0 to 75 metres. They pile up under reef ledges by day and hunt crabs and shellfish on the sand at night. Caribbean shallows, crabs or urchins, and a chum slick to call them in.",
  thresher:"Threshers roam the open water, from the reefs down into the twilight zone \u2014 roughly 30 to 550 metres. They hunt schools of small fish and squid. Open Atlantic, reef or twilight depths, schooling fish, chum to draw them in.",
  whale:   "Whale sharks don't take bait \u2014 they eat plankton. You have to find the aggregation: look for green water at the surface, the bloom. The Philippines. Researchers work it by boat, spotter plane, or the local sightings network.",
  goblin:  "Goblin sharks live deep \u2014 twilight zone down into the real dark, about 270 to 960 metres. Sagami Bay in Japan is where scientists find them. Squid bait, and chum; scent travels well down there.",
  tiger:   "Tiger sharks aren't picky at all \u2014 fish, squid, crabs, tuna, they'll try anything. The Maldives, shallow lagoons. With tigers the question is never what bait, it's where.",
  sandtiger:"Sand tigers gather around the old shipwrecks off North Carolina \u2014 the Graveyard of the Atlantic. Same sharks, same wrecks, every year. Shallow water, squid and schooling fish, and they find chum hard to resist.",
  galapagos: "Gal\u00e1pagos sharks love oceanic islands \u2014 the Gal\u00e1pagos, obviously. Shallow rocky reefs, under 80 metres. They hunt reef fish and squid, bold enough to come check you out. Chum brings them in.",
  greatwhite: "Great whites gather off South Africa where the seals haul out. Shallow water, big oily fish like tuna \u2014 and seal scent in the water helps, since they follow the seals. They're warm-bodied, which is wild for a fish.",
  hammerhead: "Great hammerheads hunt stingrays on Caribbean reefs \u2014 their heads are basically metal detectors for buried rays. Ray bait if you have it; schooling fish works too. Shallow water.",
  mako: "Makos are the fastest sharks alive \u2014 open Atlantic, surface waters. They chase squid and tuna, the quick prey. If it's moving at 70 kilometres an hour out there, it's a mako.",
  basking: "Basking sharks are plankton feeders like whale sharks \u2014 no bait works. Cornwall in summer, right at the surface where the water's green. Boat surveys and the sightings network: fishermen phoning in every tall dorsal fin.",
  epaulette: "Epaulettes walk \u2014 on their fins, across the reef flats of Papua New Guinea at low tide. Ankle-deep water, crabs and shellfish. You don't scent the water for these; you need a falling tide and sharp eyes.",
  lemon: "Lemon sharks: Caribbean shallows, surface to reef, under 90 metres. They hunt at night by electroreception \u2014 sardines after dark, with chum. Look for the twin dorsal fins, nearly equal. That's the ID.",
  blacktip: "Blacktip reef sharks: the Maldives, reef flats so shallow their fins break the surface. Timid \u2014 swimmers scare them off \u2014 but bait excites them. Reef fish or shrimp, chum slick. Look for the black-dipped fins.",
  whitetip: "Whitetips nap in reef caves by day \u2014 the Philippines, shallow reefs. They're one of the few requiem sharks that can breathe lying still. Hunt them at night: octopus or reef-fish scraps near the caves."
};
