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
    { them: "Bull sharks can shift their osmoregulatory physiology between ocean and fresh water. Almost no other shark can do that.", me: "Built for both worlds." },
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
    { them: "The sandbar shark's first dorsal is unusually tall and triangular. It's one of the quickest ways to separate it from similar coastal sharks. You can spot one from the silhouette alone.", me: "The sail-fin shark." },
    { them: "Chesapeake Bay is a giant sandbar shark nursery — pups are born there in summer. One bay, thousands of baby sharks. The cuteness is structural.", me: "A bay full of pups." },
    { them: "Sandbars migrate up and down the US east coast with the seasons. Winter in the south, summer in the north. They have a commute.", me: "Seasonal commuters." }
  ],
  salmon: [
    { them: "Salmon sharks are partly warm-blooded — they keep their stomach, eyes and brain warm while hunting in water near freezing. A warm hunter in a cold ocean.", me: "Warm-blooded and hunting salmon. Remarkable." },
    { them: "One study estimated salmon sharks eat 12 to 25 percent of the entire annual Prince William Sound salmon run. A quarter of the salmon, taken by sharks.", me: "The scale of that appetite." },
    { them: "In summer, salmon sharks cruise just under the surface in slow circles, dorsal fins exposed. Males mostly in the west, females in the east — the ocean sorted by sex.", me: "Circling the cold surface." }
  ],
  dusky: [
    { them: "Dusky shark females mature at around twenty, gestate for nearly two years, then rest a full year. One litter every three years. It's the slowest reproductive pace of any shark I know.", me: "Three years for one litter. Extraordinary." },
    { them: "Young dusky sharks school together to feed — and one group was seen mobbing a humpback whale calf off South Africa. Ten to twenty juveniles, one very unlucky calf.", me: "Strength in numbers, even as pups." },
    { them: "Duskies have no single field mark. You identify them by proportion — the general shape, and a low ridge of skin between the dorsal fins. Subtle sharks.", me: "Identified by almost nothing. My favourite kind." }
  ],


  silvertip: [
    { them: "Silvertips are viviparous with a yolk-sac placenta, litters of two to eleven pups, and a gestation of about a year — they can pup more often than most big requiem sharks. A lot of large carcharhinids rest a whole year between litters. Silvertips just keep going.", me: "Overachievers of the reef slope." },
    { them: "The white fin margins are diagnostic, but they fade on dead specimens — you can only reliably see them on a living shark in clear water. Museum skins lie. You have to meet the animal.", me: "The museum lies; the reef doesn't." },
    { them: "They are genuinely bold around divers. There is footage of silvertips investigating cameras at close range, unbothered, while the blacktips have already left. Curiosity as a personality trait.", me: "Bold is a good look on a shark." }
  ],
  spinner: [
    { them: "The spin isn't a trick — it is a feeding mechanic. They rotate while biting through a school so the mouth sweeps a bigger volume of fish per pass. Physics doing the hunting.", me: "Rotational fishing. Efficient." },
    { them: "Spinner sharks launch themselves clear of the water while feeding, spinning the whole way, and often land right back in the middle of the school. Style AND function.", me: "Show-offs with a purpose." },
    { them: "Their migration along Florida's Atlantic coast is one of the great shark spectacles — hundreds of spinners moving with the baitfish in winter and spring. Black-tipped fins everywhere, all of them hungry.", me: "Winter road trip, shark edition." }
  ],
  wobbegong: [
    { them: "The dermal lobes around a wobbegong's mouth aren't decoration — they break up the head's outline against the reef, and the barbels carry taste buds. The shark is literally tasting the water with its beard.", me: "A beard that tastes. Superb." },
    { them: "Spotted wobbegongs give birth to up to thirty-seven pups in a single litter. Thirty-seven. For an animal that spends its whole life pretending to be a rug, that is ambitious.", me: "The rug delivers. Thirty-seven times." },
    { them: "They are so sedentary that researchers use their spot patterns like fingerprints — the same individual photographed on the same reef ledge, year after year. Site fidelity as a lifestyle.", me: "Loyal to one ledge. Respect." }
  ],
  leopard: [
    { them: "Leopard shark pups are born at about twenty centimetres — pocket-sized, already fully patterned. They grow into the spots. Miniature adults from day one.", me: "Pre-spotted. Efficient design." },
    { them: "They can live over thirty years, and females don't mature until they're about ten. A decade of childhood before the first litter. Slow lives, well lived.", me: "Ten years of being a kid. Relatable." },
    { them: "The dark saddles are individually unique — researchers identify leopard sharks by their spot patterns, the same way whale sharks are ID'd by their constellations. Every leopard wears its own map.", me: "Constellation sharks, west coast edition." }
  ],
  horn: [
    { them: "Horn shark teeth come in two types — sharp graspers at the front, flat crushers at the back. They grab an urchin with the front and mill it with the back. A mouth that is also a toolkit.", me: "Crunch first, ask questions never." },
    { them: "The dorsal spines are mildly venomous — not dangerous to people, but enough to teach a predator a lesson. A one-metre shark that says 'try me' and means it.", me: "Small shark, big boundaries." },
    { them: "The homing experiments are my favourite — researchers moved horn sharks kilometres away and they still found their way home. They just... know where they live.", me: "GPS: Great Personal Sense-direction." }
  ],
  portjackson: [
    { them: "The brow ridges are called supraorbital crests and nobody fully knows what they're for — protection, muscle anchoring, looking unimpressed. Science is still out. My money is on unimpressed.", me: "Resting shark face. Iconic." },
    { them: "Tagging studies have tracked Port Jacksons migrating from New South Wales down toward Tasmania and back — hundreds of kilometres each way, on a seasonal schedule, just to lay eggs in the right water.", me: "A commute with commitment." },
    { them: "They lay their spiral eggs in pairs, a few at a time, across the whole summer — up to about fifteen cases a season. Each one takes the better part of a year to hatch.", me: "Fifteen screws of hope." }
  ],
  angelshark: [
    { them: "Angelsharks bury themselves up to their eyeballs in sand and just... wait. For weeks if they have to. Then prey swims overhead and the whole seafloor detonates upward.", me: "Peak sit-and-wait. Maximum patience, minimum effort." },
    { them: "They're Critically Endangered because of bottom trawling. A buried shark can't dodge a net, and their populations were never built to survive that. Cornwall's anglers and divers log every sighting now — that's how we know where they still are.", me: "So this tag actually joins a real conservation dataset." },
    { them: "Their strike takes about a tenth of a second. It looks like the sand just... stands up and eats. Researchers needed high-speed cameras to even see what happened.", me: "Note to self: never walk barefoot over lumpy sand." }
  ],
  megamouth: [
    { them: "Only about 300 megamouth sightings in all of recorded science. They were discovered in 1976 when one got caught on a Navy anchor — a whole new family of shark, found by accident!", me: "One of the last big animals to be discovered. Humbling." },
    { them: "They're vertical migrators — deep in the twilight zone by day, rising toward the surface at night following the krill. So sightings cluster at night, near the surface, over deep water.", me: "Night watch it is. Big silhouette, bigger mouth." },
    { them: "That silvery band on the upper jaw might glow to lure krill straight in. Nobody's proven it — it's one of those beautiful theories waiting on the right photograph.", me: "The shark is a hypothesis. You just tagged a hypothesis." }
  ],
  sawshark: [
    { them: "The saw isn't decoration — sawsharks slash it side to side through schools of fish, stunning and wounding everything the teeth touch. Then they pick up the pieces.", me: "A weapon and a net in one. Brutal efficiency." },
    { them: "Sawsharks are sharks, not sawfish! Gill slits on the sides = shark. Sawfish are giant rays with their gills underneath. Totally different lineages, same brilliant weapon idea.", me: "Convergent evolution strikes again." },
    { them: "Those barbels are basically taste buds on a leash — they sweep the sand sensing prey, and the saw strikes what they find. Even a buried fish isn't safe.", me: "Death by whiskers. Undignified way to go." }
  ],
  greenland: [
    { them: "The 400-year estimate comes from radiocarbon-dating the lenses of their eyes — 392 plus or minus 120 years for one big female. So the real number could be anywhere in there, but even the low end is absurd.", me: "Even being wrong about it still means centuries. Incredible." },
    { them: "They don't reach maturity until around 150 years old. Imagine: born around 1875, reproducing for the first time this century. Evolution's most patient creature.", me: "A century and a half of childhood. Relatable, honestly." },
    { them: "Almost all of them carry a glowing eye parasite that blinds them. They don't care — it's dark down there anyway, and the glow might actually attract curious prey. Accidental lure!", me: "Blind, ancient, and possibly baiting dinner with its own eye parasite. Respect." }
  ],
  cookiecutter: [
    { them: "The wound is the signature — a perfect round crater, like someone used a melon baller. Marine biologists can ID a cookiecutter attack on a whale from a photo of the scar alone.", me: "A shark that signs its work." },
    { them: "Its belly glows green to match the light filtering down from above — counterillumination. But the dark collar around its throat stays unlit, so from below it looks like a little fish silhouette. Dinner comes to investigate, and dinner becomes dinner.", me: "Camouflage that moonlights as bait. Diabolical." },
    { them: "They bit US Navy submarines! The sonar domes had round craters in the rubber coating and nobody knew what made them until they matched the bite shape. Sharks versus the military: sharks won.", me: "Undersea warfare's least expected casualty." }
  ],
  sixgill: [
    { them: "Six gills instead of five! Most sharks have five — sixgills and their relatives kept the ancient count. It's like finding a shark with a spare part from 200 million years ago.", me: "The extra gill is a fossil you can count." },
    { them: "Litters over 100 pups, gestation possibly two-plus years. They make up for being slow with sheer volume — the deep-water strategy is: invest everything, all at once, very rarely.", me: "Slow life, big family. Eventually." },
    { them: "Their eyes fluoresce green under blue light. Nobody knows why. Deep-water biofluorescence in a shark that lives where there's no blue light to begin with — it's a genuine mystery.", me: "A mystery wearing a shark. My favourite kind." }
  ],
  velvetbelly: [
    { them: "The glow isn't decoration — it's counter-illumination. Downwelling light gets brighter toward the surface, so a dark silhouette shows up against it. The photophores erase the silhouette. It's wearing invisibility.", me: "A shark that brings its own cloaking device. Respect." },
    { them: "Lanternsharks mature fast for deep-sea sharks. Most deep species take a decade or more; velvet-bellies are ready in a few years. That's a huge reason they're still Least Concern despite the trawl bycatch.", me: "Fast-living deep-sea shark. Breaks every rule." },
    { them: "The males grow these weird little hooks on their heads — patches of modified denticles, probably for gripping during mating. It's called a frontal tenaculum. Deep-sea dating is strange.", me: "I'm going to pretend I understand that. Sounds glorious." }
  ],
  dwarflantern: [
    { them: "Twenty centimetres. A full-grown dwarf lanternshark would barely cover your phone. It might be the smallest shark on Earth — and it lives almost half a kilometre down in the Caribbean, where nobody sees it.", me: "Smallest shark, biggest flex." },
    { them: "It's only ever been found off Colombia and Venezuela, on the upper continental slope. We know it from a handful of specimens. A whole species, nearly invisible, living under one of the busiest seas in the world.", me: "Caribbean endemic, deepwater ghost. Noted." },
    { them: "It eats tiny deep-sea invertebrates — shrimp-like things drifting in the dark. We don't even know its litter size for sure. Some sharks you study; dwarf lanternsharks you mostly wonder about.", me: "Wondering counts as science. Probably." }
  ],
  kitefin: [
    { them: "Kitefins were fished hard for their livers — squalene, a light oil used in cosmetics and pharmaceuticals. A shark's liver can be a fifth of its body weight. Whole populations collapsed in some regions. That's the Vulnerable status, right there.", me: "Worth more as oil than as a shark. Grim math." },
    { them: "It's a real deep-water generalist: deep fish, smaller sharks, squid, crustaceans, carrion. And look at those eyes — huge, greenish, built for the dark. No dorsal spines, unlike its dogfish cousins.", me: "Eats anything, sees everything, hurts nobody. Model citizen." },
    { them: "Ovoviviparous, ten to sixteen pups, and the pups are already half a metre long at birth. Kitefins don't do small. In the deep sea, big babies survive.", me: "Half-metre babies. Deep sea goes big or goes home." }
  ],
  pacificsleeper: [
    { them: "Almost every Pacific sleeper carries copepod parasites on its eyes — Ommatokoita elongata, little white crustaceans hanging off the cornea. They might be functionally blind and navigate by smell. Imagine that: a four-metre shark hunting by scent in the dark.", me: "Blind four-metre shark. Still scarier than me." },
    { them: "They're scavengers and predators both — squid, fish, crustaceans, and marine mammal carrion. They've found seal and porpoise remains in sleeper stomachs. Slow doesn't mean harmless; it means patient.", me: "Patient is the polite word for it." },
    { them: "They migrate vertically — deep by day, shallower at night, following food. Some cross whole ocean basins. A shark this slow, going this far, on this little energy. Masterclass in efficiency.", me: "The slow lane, taken to its logical extreme." }
  ],
  spinydogfish: [
    { them: "Spiny dogfish schools can number in the thousands, and they segregate by sex and size — all-female schools, all-male schools, juvenile schools. Orderly, massive, and constantly moving.", me: "A shark convention with seating charts." },
    { them: "The spines are genuinely venomous — grooved spines with a mild venom gland at the base. Not dangerous to us, just painful. It's why fishermen hate them: a thrashing school of dogfish is a net full of needles.", me: "Venomous and resentful of nets. Fair." },
    { them: "Gestation is eighteen to twenty-four months — one of the longest pregnancies of any vertebrate. Small litters, late maturity. That's exactly the life history that collapses under heavy fishing, and the north-east Atlantic stock did collapse. It's rebuilding now, slowly.", me: "Two-year pregnancy. Then we fished them anyway." }
  ],
  catshark: [
    { them: "Small-spotted catsharks are nocturnal bottom hunters — crabs, worms, molluscs, sniffed out in the dark. By day they hide in crevices and kelp. Classic Cornwall night shift.", me: "Night shift with spots. Sign me up." },
    { them: "The egg cases are called mermaid's purses — leathery rectangles with tendrils at the corners that wrap around seaweed. The pup develops inside for five to eleven months, then chews its way out.", me: "Five months in a purse. Luxury." },
    { them: "They're the commonest shark around the British Isles, and totally harmless. Spots, cat-like eyes, and absolutely no interest in you. The starter shark of European waters.", me: "Gateway shark. Everyone starts somewhere." }
  ],};

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
  bonnethead: "Bonnetheads are tiny hammerheads of the western Atlantic shallows — surface to reef, under 90 metres. They root in seagrass for crabs and shrimp, and eat the seagrass too. Crabs, shellfish or urchins, with chum. Look for the little rounded shovel head.",
  bull: "Bull sharks patrol the Caribbean coast — Playa del Carmen, estuaries, anywhere the water's warm and coastal. Big oily fish like tuna, or schooling fish, with chum. Broad flat snout, heavy build. They'll come up rivers, but you'll meet yours at sea.",
  greyreef: "Grey reef sharks hold Indo-Pacific reef drop-offs — Papua New Guinea, the channels and current-swept edges. Reef fish or squid, with chum. They patrol the same ground for years, so learn the reef and you'll learn the shark.",
  caribbean: "Caribbean reef sharks are Bahamas home-team — Tiger Beach, the reef flats. Shallow water, schooling fish or tuna, with chum. They share the reef with lemons and bulls, so check your fins: no black tips, no heavy bull build.",
  sandbar: "Sandbar sharks work the sandy coastal shelves — the Outer Banks, shallow bays and banks. Schooling fish, squid or crabs, with chum. Look for the unusually tall first dorsal fin — one of the species' clearest ID features.",
  /* v0.20.0 wave. */
  salmon: "Salmon sharks hunt Japan's cold northern waters and the Kurils — surface cruising in summer, dorsal fins in slow circles. Big oily fish: tuna or squid, with chum. They're warm-blooded, so don't let the cold water fool you.",
  dusky: "Dusky sharks patrol South Africa's coast — surface to reef, the surf zone out to the shelf. Sardines or squid, with chum. Slow to mature, slow to breed, Endangered: this is a tag that genuinely counts. Look for the low ridge between the dorsal fins.",


  silvertip: "Silvertips patrol Indo-Pacific outer reefs — the Maldives especially, slopes around 30 to 100 metres, bold around divers. They hunt schooling fish and squid. Reef or surface water, schooling fish or squid on chum. Look for the pale margins on every fin — that's the whole name.",
  spinner: "Spinners run the warm western Atlantic — Caribbean islands, the Bahamas, Florida's coast — hunting bait schools right at the surface. Sardines, anchovies, anything schooling and silvery. Surface water, schooling fish on chum, and watch for the spinning breach — black-tipped fins, long pointed snout.",
  wobbegong: "Spotted wobbegongs are eastern Australian reef residents — rocky reefs and ledges from Queensland down to Victoria. They ambush fish and crabs right off the bottom. Reef water, crustaceans or schooling fish on chum, and scan the bottom slowly — the lobes and barbels give them away if you look twice.",
  leopard: "Leopard sharks are California bay specialists — Monterey, Tomales, San Francisco Bay, La Jolla — cruising eelgrass and sand in reef to surface water. They root out crabs, shrimp and small fish. Reef or surface, crustaceans or schooling fish on chum, and look for the saddle pattern — no other local shark wears it.",
  horn: "Horn sharks are southern California reef dwellers — kelp forests and rocky reefs around Catalina, the Channel Islands, La Jolla. Nocturnal urchin-crunchers with dorsal spines. Reef water, urchins or crustaceans on chum, and check under ledges — they're homebodies.",
  portjackson: "Port Jacksons are eastern Australian reef sharks — Sydney to Jervis Bay and south toward Tasmania in the egg-laying season. They crunch urchins and crabs on rocky reefs. Reef water, urchins or crustaceans on chum, and look for the brow ridges — nothing else in the water looks that stern.",
  angelshark: "Angelsharks are ambush predators on shallow sand and mud — Cornish reef shallows, that whole coastline. They hunt crabs, flatfish, anything that wanders too close, so crustaceans on the hook and chum to draw one up out of its burial spot. Tagging one matters more than almost anything in this book — Critically Endangered, real population recovery work.",
  megamouth: "Megamouths don't respond to chum — they're plankton filter feeders, not scent chasers. You find them where survey boats and research networks catch sightings: Japanese offshore waters, twilight-zone depths, drifting with the krill. No bait, no hook — just being in the right water at the right time. Some sharks are caught; this one is encountered.",
  sawshark: "Sawsharks cruise soft bottoms off eastern Australia — reef edges dropping into the twilight zone — sweeping their barbels through the sediment for squid and crustaceans. Chum will lift one up out of the murk, and squid or crabs for bait are honest prey to them. Not to be confused with sawfish — this one has proper shark gills on its sides.",
  greenland: "Greenland sharks live deep and cold — Arctic waters, hundreds of metres down, near-freezing. They scavenge and hunt sleeper-slow, guided by scent more than sight. Squid or oily fish, chum to lift one in. This tag really matters: they're Vulnerable and possibly the longest-lived vertebrates on Earth.",
  cookiecutter: "Cookiecutters live deep in the open Atlantic by day and rise into the twilight zone at night — that's where you meet them. They're parasitic feeders, but squid is honest prey to them too, and chum will draw one close. Smallest shark in this book, boldest bite in the ocean.",
  sixgill: "Sixgills are deep-water giants — continental slopes, hundreds of metres down, in the open Atlantic. They're scavengers and predators both, so squid or oily fish on heavy chum will reach them through the dark. Six gill slits is the field mark; patience is the method.",
  velvetbelly: "Cornwall's shelf break is velvet-belly country — past the reef line where the water goes twilight, down into the deep. They hunt squid by smell in the dark, so squid bait on the line and chum to let the scent travel. Watch for the faint blue-green glow along the belly — that's your ID before anything else.",
  dwarflantern: "The dwarf lanternshark lives deep on the Caribbean slope — off Colombia and Venezuela, a few hundred metres down where it's properly dark. It eats tiny deep-sea invertebrates, so crustaceans are the honest bait, and chum carries the scent down to it. You'll know it by the tininess: if it's barely longer than your hand and glows faintly underneath, that's the dwarf.",
  kitefin: "Kitefins cruise the deep Atlantic slopes — the open Atlantic drop-offs, deep water only. They're big predators: squid or schooling fish on the line, and chum to lay a scent trail through the dark. Look for the heavy deep-water body and the huge eyes — a kitefin arrives like weather.",
  pacificsleeper: "Pacific sleepers are deep North Pacific sharks — Japan's offshore trenches and slopes, way down past the light. They'll come to squid and fish; squid or schooling fish bait and a good chum slick is the real approach. Don't expect speed — expect a four-metre shadow materialising slowly out of the dark.",
  spinydogfish: "Spiny dogfish school right off Cornwall — shallow coastal water, reefs and the surface layer, moving in their thousands. Schooling-fish bait matches what they hunt, and chum will pull a whole school in. Mind the dorsal spines when one's alongside — that's the whole warning.",
  catshark: "Small-spotted catsharks are Cornwall locals — shallow reefs and kelp, under a hundred metres, strictly nocturnal. They hunt crabs and worms along the bottom, so crustaceans and chum to draw one out of its hidey-hole. Look for the dark spots on sandy brown: that's the whole ID.",};
