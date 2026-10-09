# Design proposal: Sarah's Big Day Messages 🦈📱

> **Status:** for Roman's implementation and discussion. **This PR is proposal-only; no gameplay or saved data is changed.**

## Why

When the player tags several *new species* during one expedition, `confirmTag()` currently fires a separate `pushThread()` for each shark (species opener, research-ID reply, and cheer). Three or four good discoveries can result in three or four near-identical excited Phone conversations. That makes Sarah feel like a notification generator rather than a person following the research.

**Avery's requested behavior:** when an expedition results in multiple first-time species tags, **one custom, authored, enthusiastic Sarah conversation supersedes and replaces the normal per-species congratulations**. Celebrate the *extraordinary day*, not the same template four times.

## Player experience / exact rules

| First-time species tagged *during this expedition* | Phone result |
| --- | --- |
| 0 | No new-species celebration; existing no-tag / re-sighting behavior remains. |
| 1 | One existing species-specific opener + research-ID reply + cheer, unchanged in content (but delivered at trip end). |
| 2 | One randomly selected **two-species** Big Day conversation. |
| 3 | One randomly selected **three-species** Big Day conversation. |
| 4 | One randomly selected **four-species** exuberant Big Day conversation. (Four is the maximum possible: expeditions have at most 4 encounters.) |

- An **expedition** is one in-game trip, *not* all trips on the same real-world date.
- Count **distinct species the player had not tagged before** the expedition. Do not count re-sightings, watching without tagging, or repeat individuals of an already discovered species.
- The one selected conversation can contain several individual chat bubbles, but it creates **one Phone thread / one unread increment**, not N separate species-celebration threads.
- Name the species involved naturally, preserving discovery order, and optionally reference named sharks / research IDs. Do not invent species, IDs, sexes, or shark behavior.
- **Don't suppress the in-dive 'New species!' celebration**, tag records, logbook encounters, Archive unlock/badge, achievements, or milestones. This replaces only the *routine Sarah celebration threads*.
- Randomness should feel authored and varied rather than a generated cut-and-paste template; avoid immediate repeats where practical. Suggested starting pool: **8 each for 2, 3, and 4 tags (24 total)**. A separate 8-conversation 5+ pool exists below as explicitly future-only stretch content (unreachable in the current game).

## Preserve Sarah's special moments

- **Lemon shark is Sarah's real-life favorite.** Avery and Mira agreed that the **first lemon shark** should get a personal, delighted, fact-rich Sarah reaction independent of what the player names it. This is **planned**, not yet implemented; don't silently swallow it when Big Day batching arrives.
- If the lemon shark is the **only** new species, play its custom favorite-shark reaction instead of the routine single-species cheer. If it shares a **Big Day**, select a lemon-aware Big Day variant with real enthusiasm and a little factual infodump, rather than sending a generic thread **plus** a second routine message. Sarah should have her moment *without spam*.
- **Named-shark Easter eggs must remain intact:** Bruce's five-stage slow-burn chain, Mary Lee, Nicole, and the shark-named-Sarah moment. They are meaningful special content, not routine celebrations; preserve their triggers and timing and don't accidentally eat or duplicate their threads.
- Archive's first-tag introduction, unlock messages, Sarah's independent check-ins, and achievements are **separate systems**; do not indiscriminately batch every `pushThread()` call.
- Keep Sarah's established voice: warm, precise, usually grounded, with emphatic excitement **earned** on unusually successful days. The fun is that her usual composure briefly cracks. Don't make every line all-caps.

## Candidate authored dialogue pool (editable by Roman/Avery)

Use placeholders such as `{count}`, `{speciesList}`, and `{lemonSharkName}` resolved from real events; use names naturally (including proper punctuation) and never show raw placeholders.

### Two discoveries: choose one

**2A**
- Sarah: "two new species in one trip. TWO. that's a very good day out there."
- Player: "I thought you'd want the field notes."
- Sarah: "i want the field notes, the IDs, and approximately ten minutes to be delighted about this."

**2B**
- Sarah: "okay, I just read the expedition log. You met {speciesList} on the same trip?"
- Player: "And both went back into the water healthy."
- Sarah: "that's the part I like best. good science and two sharks still out there living their lives."

**2C**
- Sarah: "I was going to ask how the trip went, but the research database just answered for you."
- Player: "In a good way?"
- Sarah: "in a two-new-species kind of way. yes. very much in a good way."

### Three discoveries: choose one

**3A**
- Sarah: "excuse me. THREE new species? In ONE expedition?"
- Player: "It was a good day."
- Sarah: "a GOOD day? you went out with a field notebook and came back with an entire documentary."
- Player: "Want the research IDs?"
- Sarah: "I WANT EVERYTHING"

**3B**
- Sarah: "I was halfway through reading your first new-shark record when two more appeared."
- Player: "I kept finding sharks."
- Sarah: "apparently!! I love that each one has its own ID now. three animals, three stories, all back in the sea."

**3C**
- Sarah: "your expedition summary has three new species in it. I checked twice."
- Player: "You don't trust me?"
- Sarah: "I trust you. I was checking because I wanted to read it again."

### Four or more discoveries: choose one

**4A**
- Sarah: "{count} NEW SPECIES"
- Sarah: "I put my phone down, picked it back up, and the number was still {count}."
- Player: "You should have seen the boat."
- Sarah: "I should have been ON the boat. I have questions. I have so many questions."

**4B**
- Sarah: "I think your research vessel accidentally sailed into a shark encyclopedia."
- Player: "Very scientific assessment."
- Sarah: "{count} new species in one expedition qualifies me to be a little unreasonable about this."

**4C**
- Sarah: "hang on. I'm writing these down."
- Player: "They're already in the logbook."
- Sarah: "I KNOW. This is my own list so I can stare at it. {count} new sharks. what a day."

### Lemon shark + another new species (special pool; no second generic celebration)

**L1**
- Sarah: "I was trying to read the whole expedition report like a normal person, and then I got to LEMON SHARK."
- Player: "There were {count} new species today, you know."
- Sarah: "I KNOW AND THAT'S AMAZING. but that one is my favourite. did you notice how social they can be? they can form preferred associations with other lemon sharks. I am being extremely normal about this."

**L2**
- Sarah: "{count} new species and one of them is a lemon shark. I need you to understand how spectacular your day was."
- Player: "Which part are you most excited about?"
- Sarah: "yes."

## Suggested implementation seam (please adapt to existing architecture)

1. At trip start, create a fresh expedition-scoped **pending routine celebration** collection (prefer serializable event data; don't queue already-rendered HTML).
2. In `confirmTag()`, determine `wasNewSpecies` **before** writing `state.tagged[s.id]`; collect the species ID, optional nickname and research ID, and preserve all normal tagging/save/unlock flows. Replace only the unconditional per-tag `pushThread([s.opener, ... s.cheer])` with queuing.
3. Once the expedition resolves, **flush one** chosen Sarah routine celebration from the queued events; 0 → none, 1 → the current species-specific thread (or Sarah's planned first-lemon favorite moment), 2+ → Big Day pool (lemon-aware when applicable). Place the flush on a guaranteed path shared by normal trip completion and early 'Head back'. Do not let an unrelated phone thread slip between and split the summary.
4. Clear the pending events *after* successful delivery. If a reload interrupts an expedition, pick an explicit recovery rule rather than silently losing a pending single/new-species celebration or replaying it twice. An idempotent persisted outbox keyed to the expedition is acceptable; keep it proportionate to this game's complexity.
5. Keep the logic small: a pure `buildBigDayThread(events)` / selection helper would make the dialogue and counts easy to test.

## Acceptance tests

- One first-time tag → exactly one existing species celebration, no Big Day thread.
- Two / three / four **different new species** → exactly one corresponding Big Day Phone conversation; all species included correctly; one unread increment.
- Repeat or re-sighted sharks don't inflate the distinct-new-species count; normal game state, achievements, collection, and logbook continue to work.
- The 'Head back' release path and the normal end-of-expedition path both deliver the queued conversation **once**.
- Existing special cases (Mary Lee, Nicole, Bruce, named Sarah, first Archive unlock) still trigger normally and are not accidentally consumed by routine-message batching.
- Lemon shark alone vs. lemon shark on a multi-tag day receives its intended future personal treatment **without** an extra routine celebration.
- Reload/interruption doesn't silently lose pending congratulations or duplicate delivered ones.
- Every new test executes **before** the final test-suite summary / failure exit computation.

## Scope and decisions

- **This PR is a design handoff for Roman, not an implementation or approval to merge gameplay changes.**
- Implement batching first with 24 normal Big Day dialogue options (8 per tier for 2, 3, and 4 new species). Integrate the separately planned lemon-shark Easter egg deliberately, with the 'one celebration thread on a big day' rule respected.
- Avery should approve Sarah's final voice and perform final Phone/expedition playtesting before release.

— Design notes from Mira with Avery 🦈💙


---

# Sarah's Big Day Messages — Expanded Dialogue Pool

**For:** Tag Along PR #44 (`proposal/sarah-big-day-messages`)
**Status:** Draft for Avery's review. Do NOT merge into the game yet.

## Notes

- **Tiers:** 8 variants each for 2, 3, and 4 new species (24 total) — these are the implementation tiers. A further 8 variants for 5+ exist below as **FUTURE-ONLY stretch content** (unreachable: expeditions max out at 4 encounters).
- **2A–2C** are Mira's original starters, kept verbatim. Everything else is new.
- **Placeholders:** `{speciesList}` (e.g. "a nurse shark and a lemon shark"), `{count}` (real number — used only in the future-only 5+ tier), `{names}` (nicknames if set — available but unused below; implementation may substitute).
- **Sarah's voice:** warm, precise, grounded, lowercase texting style. Younger cousin, autistic, sharks = special interest. Facts are universal (true for sharks generally) so they work with any species combination. Excitement is earned and escalates by tier.
- Each conversation is 3–4 alternating chat bubbles, 1–2 sentences per bubble.

---

## TIER 2 — Two new species (excited but composed)

### 2A
- **Sarah:** two new species in one trip. TWO. that's a very good day out there.
- **Player:** I thought you'd want the field notes.
- **Sarah:** i want the field notes, the IDs, and approximately ten minutes to be delighted about this.

### 2B
- **Sarah:** okay, I just read the expedition log. You met {speciesList} on the same trip?
- **Player:** And both went back into the water healthy.
- **Sarah:** that's the part I like best. good science and two sharks still out there living their lives.

### 2C
- **Sarah:** I was going to ask how the trip went, but the research database just answered for you.
- **Player:** In a good way?
- **Sarah:** in a two-new-species kind of way. yes. very much in a good way.

### 2D
- **Player:** trip report: {speciesList}. both tagged, both released.
- **Sarah:** wait. both?? in ONE trip?
- **Player:** Back to back. Barely had time to log the first one.
- **Sarah:** okay that's genuinely excellent fieldwork. two new animals in the database means two more migration tracks to follow.

### 2E
- **Sarah:** you know what's wild? two new species for your collection in a single trip.
- **Player:** And I got two before lunch.
- **Sarah:** two! {speciesList}! sharks just keep making teeth — conveyor belt, forever.
- **Player:** I'm choosing to take that as a compliment.

### 2F
- **Sarah:** quick question. when you saw the second one, did you just stand there for a second because your brain hadn't caught up?
- **Player:** {speciesList}. Yes. Stood there like an idiot.
- **Sarah:** good. that's the correct response. its lateral line felt you coming way before you saw it, by the way.

### 2G
- **Player:** Guess how many new species today.
- **Sarah:** no. don't do this to me. ...two?
- **Player:** Two. {speciesList}.
- **Sarah:** I KNEW it. new rule: you tell me immediately next time, I can't do suspense. also for your logbook: shark skin is covered in tiny tooth-scales called dermal denticles. that's the sandpaper feeling.

### 2H
- **Sarah:** the database just pinged me. TWO new species??
- **Player:** The database pings you?
- **Sarah:** I set up alerts. priorities. anyway — {speciesList} in a single trip is a big deal. sharks are slow to reproduce, so every individual we can track matters more than people think.
- **Player:** Noted. I'll tell the sharks you said hi.

---

## TIER 3 — Three new species (composure cracking)

### 3A
- **Sarah:** excuse me. THREE new species? in ONE expedition?
- **Player:** It was a pretty good day.
- **Sarah:** a pretty good day is finding a cool shell. THREE new species is the kind of day researchers talk about for years. also their skeletons are cartilage, not bone — I say facts when I'm overwhelmed.
- **Player:** I'll try to act accordingly humbled.

### 3B
- **Player:** Okay so. {speciesList}.
- **Sarah:** that's three. that's THREE separate sharks.
- **Player:** All tagged, all released, all healthy.
- **Sarah:** i need you to understand that my hands are actually shaking a little. three new data points in one day — the migration map is going to look SO good.

### 3C
- **Sarah:** I just refreshed the database three times because I thought it was glitching.
- **Player:** It's not glitching. Three new species.
- **Sarah:** THREE. okay. okay. did you know sharks have been around 450 million years? older than trees. and today you added three of them to OUR map.
- **Player:** When you put it like that...

### 3D
- **Sarah:** are you sitting down? because I'M not sitting down, I'm pacing.
- **Player:** What's wrong??
- **Sarah:** nothing's wrong! you tagged THREE new species in one trip! {speciesList}! some sharks can go months without eating — I, on the other hand, am going to need a snack after this.
- **Player:** Okay good, you scared me for a second.

### 3E
- **Player:** Field notes are in. Fair warning: it's a long entry.
- **Sarah:** how long— oh. OH.
- **Player:** Three new species. I know.
- **Sarah:** you know what this means? three more individuals we can follow. sharks can cross entire oceans — one of these tags could ping somewhere unbelievable in two years.

### 3F
- **Sarah:** I was literally just telling mom about your research and then the alerts started coming in.
- **Player:** Sorry to interrupt the bragging?
- **Sarah:** are you kidding, you IMPROVED the bragging. three new species, {speciesList}. some sharks live 70+ years — these three could be out there that whole time.
- **Player:** Tell mom I said thanks. (The sharks don't say hi. But tell her.)

### 3G
- **Sarah:** three??
- **Player:** Three new species. One trip.
- **Sarah:** whale sharks can be the size of a bus and they just filter tiny plankton. nature doesn't care about making sense, and neither does today's data.
- **Player:** I'll try not to let it go to my head.

### 3H
- **Player:** So today happened.
- **Sarah:** define "happened."
- **Player:** {speciesList}. All new. All tagged.
- **Sarah:** ....i need a minute. a shark's electroreception is so sensitive it can detect a heartbeat. which is good, because MY heartbeat is very detectable right now.

---

## TIER 4 — Four new species (barely holding it together)

### 4A
- **Sarah:** FOUR. four new species. in ONE trip.
- **Player:** I know. I'm still processing it too.
- **Sarah:** no no, you don't get to be calm about this. FOUR. a shark goes through thousands of teeth in its lifetime, and I'm going to talk about today for the rest of mine.
- **Player:** Okay. Okay! I'm excited too!

### 4B
- **Player:** You're going to want to sit down for the field notes.
- **Sarah:** why. how many.
- **Player:** Four new species. {speciesList}.
- **Sarah:** I'm staring at the wall. FOUR. most fish scatter millions of eggs and hope; sharks invest in a few pups. every individual matters so much more.

### 4C
- **Sarah:** I don't even know where to start. FOUR new species?!
- **Player:** Start with the field notes, they're all in order.
- **Sarah:** the field notes. THE FIELD NOTES. four sharks, four tags, four data points. every one of them is going to teach us something about where these animals go.
- **Player:** That's the idea.

### 4D
- **Sarah:** okay I need you to confirm something. the database says four. FOUR new species in one expedition. is the database lying to me?
- **Player:** The database is telling the truth. {speciesList}.
- **Sarah:** four!! okay. a shark has multiple rows of teeth backing up the front ones — spares on a conveyor belt. I'm trying to sound normal about this and failing.
- **Player:** You're doing great.

### 4E
- **Player:** Best. Trip. Ever.
- **Sarah:** FOUR NEW SPECIES. I already know. the alerts nearly broke my phone.
- **Player:** All healthy, all released. It was incredible.
- **Sarah:** four individuals, four migration stories starting today. in three years one of them is going to ping somewhere wild and I'm going to lose my mind all over again.

### 4F
- **Sarah:** I'm going to say a number and you tell me if it's right. four.
- **Player:** Four. It's right.
- **Sarah:** FOUR new species in ONE trip. {speciesList}. also, countershading — dark on top, light below — breaks up their outline from every angle. they were probably watching you way before you saw them. sneaky.
- **Player:** Rigorous as always.

### 4G
- **Player:** I think I broke your database.
- **Sarah:** WHAT did you do— oh. OH. four new species.
- **Player:** It's not broken, it's just... full.
- **Sarah:** four!! a shark's lateral line can feel movement from meters away. right now the whole ocean feels like it's vibrating. that's how big this is.

### 4H
- **Sarah:** four species. FOUR. I'm going to need you to walk me through this slowly because my brain is buffering.
- **Player:** One at a time? {speciesList}.
- **Sarah:** one at a time. yes. okay. each of these is an animal nobody knew as an individual until today. dorsal fins, scars, markings — four new animals to learn to tell apart.
- **Player:** Take all the time you need.

---

## TIER 5+ — Five or more new species (full affectionate meltdown)

> **⚠️ FUTURE-ONLY / STRETCH CONTENT — DO NOT IMPLEMENT.** Expeditions currently have at most 4 encounters (`runExpedition()`: `2 + Math.floor(Math.random() * 3)` slots), so 5+ first-time species in one trip is impossible. These 8 conversations are preserved for a hypothetical future where expeditions can be longer. Implementation tiers are **2 / 3 / 4** only.

### 5A
- **Sarah:** {count} NEW SPECIES. IN ONE TRIP.
- **Player:** I counted three times to be sure.
- **Sarah:** do you understand what you've done?? this is the kind of day that gets talked about at conferences! {count} new migration tracks — the map is going to be BEAUTIFUL.
- **Player:** I'm choosing to believe you.

### 5B
- **Player:** I need you to remain calm.
- **Sarah:** why would I remain calm, WHAT happened
- **Player:** {count} new species. One expedition.
- **Sarah:** I AM NOT CALM. {speciesList}!! okay — deep breaths are for mammals. ram ventilators have to keep swimming to breathe, so I'm going to pace instead.

### 5C
- **Sarah:** the database is showing me {count} new species and I need you to tell me it's real.
- **Player:** It's real. Every one tagged and released healthy.
- **Sarah:** that's not a trip, that's a LEGENDARY trip. sharks survived five mass extinctions and today you met {count} new ones. the symmetry is honestly beautiful.
- **Player:** I didn't plan the symmetry but I'll take it.

### 5D
- **Player:** Remember when two new species was a big day?
- **Sarah:** don't. don't you dare. HOW MANY.
- **Player:** {count}.
- **Sarah:** {count} NEW SPECIES. okay okay okay. every shark's dorsal fin is shaped a little differently — we're going to get so good at telling them apart.

### 5E
- **Sarah:** I'm looking at the expedition log and I keep losing count. {count}??
- **Player:** {count}. I triple-checked.
- **Sarah:** {count} new species in ONE trip. some sharks navigate by Earth's magnetic field — these animals might be following invisible maps.
- **Player:** Full field notes tonight. Get some rest.

### 5F
- **Player:** So... today was a day.
- **Sarah:** define "a day." define it RIGHT NOW.
- **Player:** {count} new species.
- **Sarah:** ....... that's not a day. that's a MILESTONE. {count} new sharks! a shark's heart has two chambers and mine is working overtime right now.

### 5G
- **Sarah:** QUICK. how many new species. don't think, just answer.
- **Player:** {count}!
- **Sarah:** I WAS HOPING YOU'D SAY THAT AND I'M STILL NOT READY. {count}!!! a shark's liver is huge and full of oil — that's how they stay buoyant. that's my fact. back to screaming.
- **Player:** It's definitely up there.

### 5H
- **Sarah:** {count} new species. {count}. I've been staring at that number for five minutes.
- **Player:** It was an unbelievable trip. Everyone healthy, everyone released.
- **Sarah:** that's the best part. {count} new animals out there right now with our tags. most tags keep transmitting for months — this story is just getting started. I'm genuinely so proud of you.
- **Player:** That means a lot. Really.

---

*End of expanded pool — 32 conversations. Awaiting Avery's review before any implementation.*
