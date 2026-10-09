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
| 4+ | One randomly selected **four-plus** exuberant Big Day conversation, with the real count. |

- An **expedition** is one in-game trip, *not* all trips on the same real-world date.
- Count **distinct species the player had not tagged before** the expedition. Do not count re-sightings, watching without tagging, or repeat individuals of an already discovered species.
- The one selected conversation can contain several individual chat bubbles, but it creates **one Phone thread / one unread increment**, not N separate species-celebration threads.
- Name the species involved naturally, preserving discovery order, and optionally reference named sharks / research IDs. Do not invent species, IDs, sexes, or shark behavior.
- **Don't suppress the in-dive 'New species!' celebration**, tag records, logbook encounters, Archive unlock/badge, achievements, or milestones. This replaces only the *routine Sarah celebration threads*.
- Randomness should feel authored and varied rather than a generated cut-and-paste template; avoid immediate repeats where practical. Suggested starting pool: **3 each for 2, 3, and 4+ tags (9 total)**, expandable to 8–12+ over time.

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
- Two / three / four+ **different new species** → exactly one corresponding Big Day Phone conversation; all species included correctly; one unread increment.
- Repeat or re-sighted sharks don't inflate the distinct-new-species count; normal game state, achievements, collection, and logbook continue to work.
- The 'Head back' release path and the normal end-of-expedition path both deliver the queued conversation **once**.
- Existing special cases (Mary Lee, Nicole, Bruce, named Sarah, first Archive unlock) still trigger normally and are not accidentally consumed by routine-message batching.
- Lemon shark alone vs. lemon shark on a multi-tag day receives its intended future personal treatment **without** an extra routine celebration.
- Reload/interruption doesn't silently lose pending congratulations or duplicate delivered ones.
- Every new test executes **before** the final test-suite summary / failure exit computation.

## Scope and decisions

- **This PR is a design handoff for Roman, not an implementation or approval to merge gameplay changes.**
- Implement batching first with 9 normal Big Day dialogue options. Integrate the separately planned lemon-shark Easter egg deliberately, with the 'one celebration thread on a big day' rule respected.
- Avery should approve Sarah's final voice and perform final Phone/expedition playtesting before release.

— Design notes from Mira with Avery 🦈💙
