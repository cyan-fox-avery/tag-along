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
  ],
  blue: [
    { them: "Blue sharks are the most beautiful sharks, I think. Deep indigo on top, pure white underneath — perfect countershading. From above they're the ocean, from below they're the sky.", me: "Camouflage as poetry." },
    { them: "A blue shark tagged in Ireland turned up off West Africa 274 days later. That's roughly 6,840 kilometres. They just... go.", me: "Casual ocean crossings." },
    { them: "Female blue sharks have much thicker skin than males, because courtship involves biting. And they can store sperm until conditions are right. Practical.", me: "Thick-skinned in the most literal way." }
  ],
  porbeagle: [
    { them: "Porbeagles have this white patch on the trailing edge of the first dorsal fin. It's the ID badge — it's how you tell them apart from makos and white sharks at a glance.", me: "A built-in name tag." },
    { them: "A juvenile porbeagle swam over 2,400 kilometres in 122 days, Ireland to Morocco. The long migrations start young with this species.", me: "A teenager doing ocean crossings." },
    { them: "Porbeagles are warm-bodied like makos and great whites — regional endothermy. That's how they hunt mackerel in water barely above freezing.", me: "A warm engine in cold water." }
  ],
  silky: [
    { them: "Silky sharks are named for their skin — the dermal denticles are so small and smooth it actually feels like silk. Nobody else in the shark world has that texture.", me: "Named for a texture. I love that." },
    { them: "The vast majority of sharks caught accidentally in tropical tuna purse-seine nets are silkies. They follow the tuna, and the nets follow the tuna.", me: "Guilt by association with tuna." },
    { them: "Juvenile silky sharks tracked around the Galápagos kept leaving the marine reserve — it's 133,000 square kilometres and they spent less than half their time inside it.", me: "Too big for the map's borders." }
  ],
  oceanic: [
    { them: "Oceanic whitetips are different from the whitetip reef sharks you tagged in the Philippines — different genus, different ocean, different life. Same white fin tips, total coincidence of naming.", me: "A case of mistaken identity, resolved." },
    { them: "They're often followed by pilot fish — little striped companions swimming alongside. Nobody fully knows what the pilot fish get out of it. Company, maybe.", me: "An entourage of unknown purpose." },
    { them: "Oceanic whitetips were once thought to be the most abundant large shark in the open ocean. Then the fin trade and longlines cut some populations by 80 to 98 percent. That's why your tag matters.", me: "From countless to critical. A hard story." }
  ],
  sevengill: [
    { them: "Seven gill slits instead of five, and a single dorsal fin set way back near the tail. Sevengills belong to the Hexanchiformes — an order so old that Jurassic fossils already had seven gills.", me: "A living fossil record." },
    { them: "Sevengills spy-hop — they lift their heads clear of the water to look around. A three-metre shark, peeking. I think about that a lot.", me: "A periscope made of shark." },
    { them: "Their teeth are different top and bottom — jagged and cusped above, comb-shaped below. The combs saw through seal blubber and tough prey.", me: "Two toolkits in one mouth." }
  ],
  bronze: [
    { them: "Bronze whaler and copper shark are the same species — the name just depends where you are. South Africa and Australia say bronze whaler, the Americas say copper shark.", me: "One shark, two passports." },
    { them: "During the Sardine Run, bronze whalers drive baitballs up from below while dolphins and gannets attack from above. It's the most choreographed hunt in the ocean, and nobody rehearsed it.", me: "Dinner theatre, no rehearsal." },
    { them: "Females don't mature until about twenty years old, and they pup every two to three years. For a coastal shark, that's extraordinarily slow — which is why the Vulnerable listing matters.", me: "Twenty years to adulthood. Patience as a life strategy." }
  ],
  frilled: [
    { them: "Frilled sharks have six pairs of gill slits, and the edges are all frilly — that's the whole name. Most sharks have five plain ones. The frill is doing something, we just don't fully know what.", me: "Named for a ruffle. Wonderful." },
    { them: "A frilled shark's teeth are tiny three-pronged tridents, about three hundred of them in 25 rows. A mouth built for gripping slippery squid in the dark.", me: "Three hundred tiny tridents." },
    { them: "Frilled sharks are one of the oldest shark lineages still swimming — the body plan barely changed in tens of millions of years. Sagami Bay is one of the only places they come up shallow enough to study.", me: "A living fossil in the bay." }
  ],
  zebra: [
    { them: "Zebra shark babies don't look like zebra shark adults at all. The pups are dark with white stripes — actual zebra pattern — and they grow into spots. Two sharks for the price of one.", me: "A wardrobe change with age." },
    { them: "Zebra sharks can rest on the seafloor and pump water over their gills, like the whitetip reef sharks do. Most sharks would suffocate sitting still. These two just... nap.", me: "Professional nappers." },
    { them: "They're called zebra sharks but the adults look more like leopards — all spots. The zebra name comes from the babies. Taxonomy's little joke.", me: "Named for the children, not the adults." }
  ],
  /* v0.18.0 wave. */
  scalloped: [
    { them: "Scalloped hammerheads gather in schools of hundreds around seamounts. Hundreds. Of hammerheads. Swimming in formation like some kind of shark ballet company.", me: "A ballet company with teeth." },
    { them: "The hammerhead's head is basically a giant sensor array — packed with electroreceptors that detect the electric fields of prey buried in sand. They sweep it side to side like a metal detector.", me: "A metal detector made of shark." },
    { them: "Female scalloped hammerheads migrate thousands of kilometres between nurseries and the seamount schools. The great aggregations are mostly females. Girl gangs of the deep.", me: "The seamount sisterhood." }
  ],
  smooth: [
    { them: "Smooth hammerheads handle cooler water than their cousins — they're the temperate hammerhead. Cornwall, New Zealand, the open Atlantic. Not fussy about latitude.", me: "The cosmopolitan hammerhead." },
    { them: "Telling a smooth hammerhead from a scalloped one is all about the front edge: smooth is one clean curve, scalloped has the central notch. One curve, and you've got your ID.", me: "One curve changes everything." },
    { them: "Smooth hammerheads are more oceanic than the other hammerheads — they roam the open water rather than hugging the seamounts. Wanderers with hammers.", me: "Hammerheads, but make it pelagic." }
  ],
  bonnethead: [
    { them: "Bonnetheads are tiny hammerheads and they eat seagrass. Like, half their diet can be plants. An omnivorous shark. I think about this constantly.", me: "The vegetarian hammerhead." },
    { them: "A bonnethead's head is a little rounded shovel, not a big wide hammer. They're the pocket-sized members of the family — most are barely a metre long.", me: "Fun-size hammerhead." },
    { them: "Bonnetheads digest seagrass with specialized enzymes, which is wild because sharks are supposed to be obligate carnivores. This one read the rulebook and ate it.", me: "Rules are suggestions." }
  ],
  bull: [
    { them: "Bull sharks swim up rivers — actual rivers. They've been found thousands of kilometres inland — the Amazon, the Mississippi. A shark, in a river, just vibing.", me: "Geography is a suggestion." },
    { them: "Bull sharks can shift their osmoregulatory physiology between ocean and fresh water. Almost no other shark can do that.", me: "Two kidneys' worth of talent." },
    { them: "Bull sharks occur in Lake Nicaragua and travel between the lake and the Caribbean through the San Juan River. A lake with sharks in it. The locals just... live with that. Iconic.", me: "The lake sharks of Nicaragua." }
  ],
  greyreef: [
    { them: "Grey reef sharks do this whole threat display when they're annoyed — hunched back, dropped fins, swimming in loopy exaggeration. It's the shark equivalent of 'do you want to go, mate.'", me: "Aggressive posturing, shark edition." },
    { them: "Grey reef sharks are incredibly site-attached — the same sharks patrol the same reef drop-offs for years. Learn the reef and you learn the individuals.", me: "Regulars at their local reef." },
    { them: "That threat display is actually one of the best-studied behaviors in all of shark science. Researchers can read a grey reef's mood from its body language.", me: "Fluent in shark." }
  ],
  caribbean: [
    { them: "Caribbean reef sharks can lie still on the seafloor and breathe — most requiem sharks would suffocate doing that. They just park themselves and pump water over their gills.", me: "Professional reef nappers." },
    { them: "The Bahamas basically runs on Caribbean reef sharks — they're the home team, and the shark-diving protections there are one of their strongholds. Conservation that works.", me: "The Bahamas did it right." },
    { them: "Caribbean reef sharks share Tiger Beach with lemons and bulls. Three big coastal species, one reef, zero drama. Mostly.", me: "A surprisingly peaceful neighborhood." }
  ],
  sandbar: [
    { them: "The sandbar shark's dorsal fin is enormous — tall and sail-like. It's the ID feature: no similar shark carries a fin that high. You can spot one from the silhouette alone.", me: "The sail-fin shark." },
    { them: "Chesapeake Bay is a giant sandbar shark nursery — pups are born there in summer. One bay, thousands of baby sharks. The cuteness is structural.", me: "A bay full of pups." },
    { them: "Sandbars migrate up and down the US east coast with the seasons. Winter in the south, summer in the north. They have a commute.", me: "Seasonal commuters." }
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
  whitetip: "Whitetips nap in reef caves by day \u2014 the Philippines, shallow reefs. They're one of the few requiem sharks that can breathe lying still. Hunt them at night: octopus or reef-fish scraps near the caves.",
  blue: "Blue sharks roam the open Atlantic, surface down through the twilight — mostly the upper 150 metres. They hunt schooling fish and squid. Open Atlantic, schooling fish or squid, and chum to call them in. Look for the indigo back.",
  porbeagle: "Porbeagles like it cold — Cornwall, the Celtic Sea, 5 to 12 degrees. They hunt mackerel, herring and squid from the surface down deep. Oily schooling fish or squid, with chum. Look for the white patch on the dorsal fin's trailing edge.",
  silky: "Silky sharks shadow tuna schools in the open Atlantic — surface waters, the upper 50 metres, around fish aggregating devices. Tuna, oily schooling fish or squid, with chum. The skin feels like silk; that's the whole name.",
  oceanic: "Oceanic whitetips patrol the open Atlantic far offshore — surface to a couple hundred metres, sometimes far deeper. Tuna, squid, anything carrion-like, with chum. Look for the long rounded fins with white blotches. Critically Endangered, so this tag matters.",
  sevengill: "Sevengills hunt South Africa's kelp forests and bays — shallow water, under 136 metres mostly. They eat seals, fish, even other sharks. Oily fish with chum, and seal scent works too. Count the gills: seven, not five.",
  bronze: "Bronze whalers cruise South Africa's coast chasing sardine schools — surface to about 100 metres. Sardines, schooling fish, squid, with chum. During the Sardine Run they hunt baitballs in groups. Look for the bronze sheen.",
  frilled: "Frilled sharks live deep off Japan — Sagami Bay, twilight zone down into the dark, a few hundred metres and deeper. They hunt deep-sea squid. Squid on the line, chum to lift one off the bottom. Look for the eel-like body and frilly gills.",
  zebra: "Zebra sharks cruise Philippine reefs — shallow water, coral and sand. They vacuum up shellfish, crabs and small fish off the bottom. Crabs, lobster or shellfish, with chum. Pups wear stripes, adults wear spots.",
  /* v0.18.0 wave. */
  scalloped: "Scalloped hammerheads school around oceanic islands and seamounts — the Galápagos, Cocos, Malpelo. Daytime schools, hundreds strong, in the surface shallows. Schooling fish or squid, with chum. Look for the central notch in the hammer's front edge.",
  smooth: "Smooth hammerheads like temperate water — Cornwall, the northeast Atlantic. Surface shallows, schooling fish and squid, chum to draw them in. The head is one smooth unbroken curve: no notch, no scallops. That's the ID.",
  bonnethead: "Bonnetheads are tiny hammerheads of the Caribbean shallows — surface to reef, under 90 metres. They root in seagrass for crabs and shrimp, and eat the seagrass too. Crabs, shellfish or urchins, with chum. Look for the little rounded shovel head.",
  bull: "Bull sharks patrol the Caribbean coast — Playa del Carmen, estuaries, anywhere the water's warm and coastal. Big oily fish like tuna, or schooling fish, with chum. Broad flat snout, heavy build. They'll come up rivers, but you'll meet yours at sea.",
  greyreef: "Grey reef sharks hold Indo-Pacific reef drop-offs — Papua New Guinea, the channels and current-swept edges. Reef fish or squid, with chum. They patrol the same ground for years, so learn the reef and you'll learn the shark.",
  caribbean: "Caribbean reef sharks are Bahamas home-team — Tiger Beach, the reef flats. Shallow water, schooling fish or tuna, with chum. They share the reef with lemons and bulls, so check your fins: no black tips, no heavy bull build.",
  sandbar: "Sandbar sharks work the sandy coastal shelves — the Outer Banks, shallow bays and banks. Schooling fish, squid or crabs, with chum. The ID is the dorsal fin: tall, almost sail-like. Nothing else carries one that high."

};
