# Lumia Merch Lab: implementation plan

*Course 2. It follows Night Studio but is a separate course. Written 2026-10-16 after a six-round interview.*

---

## 0. The decisions we made, in one table

| Topic | Decision |
|---|---|
| Where it lives | Same repo, a **second page**: `lumia.html`. It reuses the Night Studio engine. |
| Name | **Lumia Merch Lab**, at `https://art-mighty.github.io/night-studio/lumia.html` |
| Length | **15 evenings** in 6 levels |
| Idea | She is a junior designer and **Lumia is her client**. Each day is a brief from the Lumia team. |
| Merch families | Collectibles (stickers, pin, patch, keychain), apparel (tees, hoodie, cap, tote), desk and school items (mug, bottle, notebook, bookmark, bag tag), gifts (plush concept, welcome kit) |
| Tools | Figma every day. **Claude Design on days 3, 5, 8, 10, 12, 13 and 14**, with you at the keyboard because Claude is 18+. |
| Brand files | **Copied into the public repo**: logo PNGs and SVGs, plus the two free fonts and their licence files. Nothing internal comes along: no game URL, no research, no `.env`. |
| Brand freedom | She follows the logo rules. Her own slogans are allowed (with a checklist). Lumi art is **reused from the game's own pixel data**, and no new artwork is drawn. |
| Save slot | **Separate** from course 1. On first open it copies her pen name, Lumi's star colour, Lumi's outfit and Lumi's tricks. |
| Rewards | The same level-up gift system with merch themes: Lumi wears her designs and learns new tricks. |
| Brand Kit | A **new screen** (`#/brand-kit`) for downloading logos, Lumi poses, colours and fonts. It is built only from the existing UI pieces. |
| Videos | 1–2 real YouTube clips per day. Each one is checked to be live and suitable for her age. |
| Printing | **Real.** Pins, patches and plush are taught as concepts with real specs. She picks 3–5 cheap items (tee, sticker sheet, mug, tote…) to print at a **Belgrade shop that does single pieces**. The course teaches *universal* print specs, and day 15 has her write a "spec request" email to the shop. |
| Approval | A checklist on the final day. You approve the designs and place the order. |
| Getting there | A "Next: Lumia Merch Lab →" card on the course 1 map after day 30, plus the direct link. |
| Tests | `tests.html` checks **both** courses. |
| Rollout | **Everything at once**, pushed in one go when she isn't mid-session. |

---

## 1. How the game works today (for a beginner)

The whole game is a plain website. There is no framework (no React) and no build step: the browser loads the `.js` files directly.

```
index.html ─── loads ───► js/main.js   (the "boss": starts everything)
                              │
       ┌──────────────────────┼─────────────────────────────┐
       ▼                      ▼                             ▼
 js/content/             js/rules.js                   js/store.js
   days.js  (30 lessons)    (game logic: XP, unlocking,    (saving: progress in localStorage,
   course.js (levels,        badges, gifts… pure functions)  pictures in IndexedDB,
              texts,              │                          all under the name "night-studio")
              rewards)            │ imports ROOMS/PASS/XP
       ▲                          │ straight from course.js  ◄── problem #1
       │                          ▼
       │                   js/screens/*.js   (map, day, quiz, levelup, shelf, grown-ups)
       └── several screens also import course.js directly  ◄── problem #2
                                  │
                                  ▼
                           js/lumi/*  (the animated Lumi in the corner)
```

**Words you'll see below:**
- **Screen.** One page of the game. The part of the address after `#` picks it: `#/day/3` is the day screen for day 3.
- **`ctx` ("context").** One object that `main.js` hands to every screen. It holds everything a screen needs: progress `P`, the list of days, rules, saving, Lumi.
- **Store.** The saving system. `openStore("night-studio")` saves under keys that start with `night-studio`.
- **Progress `P`.** What she has done, for example `{ penName, days: { 1: {...}, 2: {...} }, lumi: {...} }`. It is keyed **by day number**.

**Why we can't just "add a second page" today:**
1. `rules.js` and four screens **import course 1's data directly**, so they would always show Night Studio's levels and texts.
2. About 10 places **hardcode "30"**, for example "You finished all 30 days" and `ROOMS[6]`.
3. The save name `night-studio` is fixed in three places. If both courses used it, course 2's day 3 would **overwrite** course 1's day 3. That is the one thing we must never do.

---

## 2. The new architecture

The idea is **one engine and two "course packs"**. Each course becomes one object (a "pack") with everything specific to it. The engine gets told which pack to run.

```
BEFORE                                         AFTER
──────                                         ─────
index.html → main.js                           index.html ─┐            ┌─ lumia.html
                │                                          │ start(NS)  │ start(LUMIA)
                ├ imports days.js                          ▼            ▼
                ├ imports course.js                     js/main.js  exports start(course)
                ▼                                            │
          screens import                     ctx.course = the pack ◄─── one place to read from
          course.js directly                                 │
                                                 rules.useCourse(pack) (set once at start)
                                                             │
                                   screens read ctx.course.* instead of importing course.js
                                                             │
                        ┌────────────────────────────────────┴───────────────────────┐
                        ▼                                                            ▼
     js/content/course.js → COURSE (Night Studio)           js/content/lumia/course.js → COURSE (Lumia)
       store "night-studio" (unchanged!)                      store "lumia-merch-lab" (new, separate)
       30 days, 7 rooms                                       15 days, 6 levels, carryFrom "night-studio"
```

### What a "course pack" looks like

```js
// js/content/lumia/course.js (shape only)
export const COURSE = {
  id: "lumia-merch-lab",          // also the save name, so it can never collide with "night-studio"
  title: "Lumia Merch Lab",
  carryFrom: "night-studio",       // copy pen name and Lumi's look/tricks from this save on first open
  DAYS, ROOMS, PASS: 4, XP, OWN_IDEA_TWISTS: 3, SECRET_BADGES,
  LUMI_WORDS, PEN_NAMES, PLAYBOOK, SETUP, CHEAT_SHEET, PRINT_REWARDS,
  text: { welcome: "…", finished: "…", grownUpsIntro: "…" },
  brandKit: true,                  // turns on the #/brand-kit screen
};
```

Night Studio gets the **same** shape, built from the values it already has. No values change, so her progress is untouched.

### Starting up (new boot flow)

```
lumia.html loads
   │  <script type="module">
   │    import { start } from "./js/main.js";
   │    import { COURSE } from "./js/content/lumia/course.js";
   │    start(COURSE);
   ▼
start(course)
   ├─ rules.useCourse(course)            rules now use Lumia's levels, PASS, XP
   ├─ store = openStore(course.id)       "lumia-merch-lab:progress" + IndexedDB "lumia-merch-lab"
   ├─ P = store.load()
   ├─ if P has no pen name and course.carryFrom ─► carry-over (below)
   ├─ ctx.course = course; ctx.DAYS = course.DAYS; ctx.ROOMS = course.ROOMS
   └─ route()                            same router as today, plus "brand-kit" if course.brandKit
```

### Carry-over from course 1 (first open only)

```
read localStorage["night-studio:progress"]     (read only, never written)
   │
   ├─ penName      ─► P.penName              she keeps her name
   ├─ lumi.star    ─► P.lumi.star            Lumi keeps her star colour
   ├─ lumi.wear    ─► P.lumi.wear            outfit pixels are stored inside progress, so they just copy
   └─ earned tricks (spin/fly/dance) ─► P.carried.tricks
                                               rules.tricks() = wave + carried + new Lumia tricks
P.carried exists ─► rules.awake(P) is true      Lumi isn't asleep at the start of a sequel
```

If course 1 was never played on this computer, nothing is copied. She picks a pen name like in course 1.

**Why `P.carried` needs no "migration":** it's a new optional field. Old saves don't have it and the code reads it as `P.carried?.tricks ?? []`. Course 1's saves never get it at all.

---

## 3. Files to create and modify

Projected lines are approximate. "+" means added and "~" means changed.

### New files

| File | Lines | What and why |
|---|---|---|
| `lumia.html` | ~50 | The page itself. A near-copy of `index.html` with the Lumia title, a header link to the Brand Kit, and a 3-line boot script calling `start(LUMIA)`. *Why:* a separate address means a separate course, and course 1's page is untouched. |
| `js/content/lumia/days.js` | ~950 | The 15 lessons, in **exactly the same shape** as course 1's days (videos, flavor pick, steps, deliverable, 5 quiz questions, badge). *Why:* same shape means every existing screen just works. Course 1 averages about 62 lines a day. |
| `js/content/lumia/course.js` | ~130 | The Lumia pack: 6 levels and their gifts, Lumi's words, slogan list, grown-up playbook, setup, universal print-spec cheat sheet, Belgrade ordering guide. |
| `js/screens/brandkit.js` | ~100 | The Brand Kit screen (details in §5). |
| `lumia/brand/logos/*` | binary | 10 transparent PNGs (`Lumia-mark`, `-lockup`, `-wide`, `-stacked`, `-tagline`, each in `-ink` and `-amber`) plus `Lumia-mark-ink-transparent.svg` and `Lumia-mark-tile-amber.svg`. About 260 KB in total. |
| `lumia/brand/fonts/*` | binary | `marcellus-400.woff2`, `space-grotesk-500.woff2`, `space-grotesk-700.woff2` plus both `LICENSE-*.txt`. About 64 KB. Both are SIL OFL fonts, so they may be shared as long as the licence travels with them. |
| `lumia/brand/README.md` | ~15 | Where the files came from (`Lumia_marketing/brand/`, the Sep 12 final export) and "don't edit, don't recolour". |

### Modified files

| File | Lines | What changes, and why |
|---|---|---|
| `js/main.js` | +35 ~15 | Wrap the start-up code in `export function start(course)`. Use `course.id` for the store name and for the "other tab changed progress" key (it was hardcoded `"night-studio:progress"`). Put `course` into `ctx`. Add the carry-over step. Add `brand-kit` to the screen list when the pack asks for it. *Why:* this is the heart of "one engine, two courses". |
| `index.html` | +4 ~1 | Replace `<script src="js/main.js">` with a 3-line boot calling `start(NIGHT_STUDIO)`. *Why:* `main.js` no longer starts itself. |
| `js/content/course.js` | +25 | Add an `export const COURSE = {…}` that bundles what's already there. Nothing existing is removed or renamed, so old imports in tests keep working. |
| `js/rules.js` | +15 ~8 | Replace the direct import with `let C = NIGHT_STUDIO` plus `export const useCourse = (c) => { C = c; }`. `ROOMS`/`PASS`/`XP` become `C.ROOMS` and so on. Fix `currentDay` and `wearChoices` to use the last level instead of `30`. Add carried tricks to `tricks()` and to `awake()`. *Why:* the rules must use the right course's levels. With Night Studio as the default, tests and course 1 behave identically. |
| `js/store.js` | ~4 | The backup label becomes `${name}-backup`. For course 1 that's still `night-studio-backup`, so **old backup files still restore**. The error text uses the course name. *Why:* a Lumia backup must not be restorable into Night Studio, and vice versa. |
| `js/screens/map.js` | +18 ~8 | Read the welcome text, finished text, pen names and day count from `ctx.course`. Add the "Next: Lumia Merch Lab →" card when course 1 is complete (only if the pack has `next`). |
| `js/screens/day.js` | ~3 | `PASS`, `XP`, `SECRET_BADGES` come from `ctx.course`. |
| `js/screens/quiz.js` | ~2 | `PASS` comes from `ctx.course`. |
| `js/screens/shelf.js` | ~3 | `ROOMS[6]` and `#/levelup/7` become "the last level" (`ROOMS.at(-1)`). |
| `js/screens/grownups.js` | ~8 | Texts from `ctx.course`. The backup filename becomes `${course.id}-backup-DATE.json`. |
| `css/style.css` | +40 | Brand Kit grid (logo tiles, colour chips) plus a Lumia accent: `body[data-course="lumia-merch-lab"]` swaps two colour tokens to amber `#f6df9f` and ink `#0a0a08`. *Why:* the page should feel like Lumia without a new design. |
| `tests.html` | +45 ~15 | Run the content checks in a loop over **both** packs (day count from the pack, not `30`). Add checks that (a) both courses use different store names, (b) every Brand Kit file path really exists, (c) carry-over copies the pen name and tricks and never writes to the `night-studio` save. |
| `README.md` | +20 | How the two courses fit together, and how to add a third. |

**Total:** about **1,500 lines**. About 1,080 of them are *content* (the lessons and texts) and only about 200 touch engine code. Course 1's lesson file `days.js` is **not touched at all**.

---

## 4. The 15 evenings

The legend:
- 🤖 marks a Claude Design day (you drive, she decides).
- 🖨 marks something that can go into the real print order.

### Level 1, "The Brief" (meet the client) · gift: Lumi learns to **point** 👉

| Day | Title | What she makes | Tool |
|---|---|---|---|
| 1 | Meet Your Client | A Figma **brand kit page**: colour styles (amber, ink and Lumi's palette), a Marcellus text style, the logo as a component, a clear-space frame (one star-width). Plus the 5 rules: flat colour only, never retype "LUMIA", clear space, the star is not the logo, crisp pixels. | Figma |
| 2 | Lumi Pose Library | Downloads the existing Lumi poses from the Brand Kit and turns them into a Figma component set at whole-number scales (1×, 4×, 8×). Teaches *pixel math*: Lumi is 69 px wide, so a 45 mm chest print at 300 DPI means scale ×7 or ×8 (never 7.5, which makes the art blurry). | Figma |
| 3 | 🤖 Merch Idea Board | Asks Claude Design for merch ideas that follow the brand rules, keeps 6, and makes a mood board PDF. | Claude Design + Figma |

### Level 2, "Collectibles" · gift: Lumi **wears her pin and patch**

| Day | Title | What she makes | Tool |
|---|---|---|---|
| 4 | 🖨 Lumi Sticker Sheet | A kiss-cut sheet of Lumi poses with the star and a white border, a cut line and 3 mm bleed. | Figma |
| 5 | 🤖 Enamel Pin | Asks Claude Design for "4 simpler versions of this mark for metal", then rebuilds the best one in Figma with metal lines and colour areas only, no gradients. Concept only, not printed. | Claude Design + Figma |
| 6 | Patch + Keychain | A round embroidered patch (thick lines and big shapes) and a 🖨 acrylic Lumi keychain with a cut line. | Figma |

### Level 3, "Wear It" · gift: Lumi **wears her tee print** and learns **love** 💛

| Day | Title | What she makes | Tool |
|---|---|---|---|
| 7 | 🖨 Grown-up Tee | A left-chest star (45 mm, centre 85 mm below the shoulder seam) plus a back print, on light and dark garments (ink logo on light, amber on dark). | Figma |
| 8 | 🤖 Kids' Tee, Her Slogan | Chooses an approved line ("Heroes wanted. Brains required." and so on) or writes her **own**, checked against a brand checklist (no "learning", no "homeschool", short, kind). Claude Design suggests layouts, then she builds the final in Figma. | Claude Design + Figma |
| 9 | Hoodie, Cap + 🖨 Tote | An embroidery-friendly mark (simplified star), a cap front, and a tote layout. | Figma |

### Level 4, "Desk & School" · gift: Lumi learns **aha** 💡

| Day | Title | What she makes | Tool |
|---|---|---|---|
| 10 | 🤖 🖨 Mug Wrap + Bottle | Claude Design pattern ideas (stars and pixels), then a seamless pattern and a wrap template in Figma (the handle-safe zone). | Claude Design + Figma |
| 11 | 🖨 Notebook, Bookmark, Bag Tag | Three school items as one set, using components so a change in one updates all of them. | Figma |

### Level 5, "Gifts" · gift: Lumi learns **surprised** ✨

| Day | Title | What she makes | Tool |
|---|---|---|---|
| 12 | 🤖 Plush Concept | A front/side/back turnaround sheet with notes (felt star, embroidered eyes). Concept only. | Claude Design + Figma |
| 13 | 🤖 Welcome Kit | A box dieline, hang tag and thank-you card. Claude Design explores the packaging look, and Figma makes the dieline. | Claude Design + Figma |

### Level 6, "The Drop" · gift: **the studio lights up** (dress Lumi any way you like)

| Day | Title | What she makes | Tool |
|---|---|---|---|
| 14 | 🤖 Mockups + Lookbook | Collection board in Figma, then a lookbook PDF in Claude Design. | Figma + Claude Design |
| 15 | Print Hand-off | Picks 3–5 🖨 items and makes a `PRINT_READY` folder (300 DPI at real size, 3 mm bleed, text outlined, PNG or PDF). Writes a short **spec-request email** for you to send to the shop. Final checklist: "Show your grown-up. They approve and order." | Figma |

**Flavor picks** (the little choice at the top of each day, like course 1) give her real decisions. Examples: which Lumi pose goes on the sticker, ink or amber garment, which slogan.

**Badges:** 15 day badges with new ids (for example `lumia-client`, `pixel-math`). Course 1's two secret badges (Solo Flight, Own Idea) are reused, because the pack decides which secret badges exist.

---

## 5. The Brand Kit screen (`#/brand-kit`)

Everything here is reused: the existing `h()` builder, `.card` sections and `toast()`. No new artwork.

```
┌──────────────────────────────────────────────┐
│ Brand Kit                                    │
│ 5 client rules (kid language)                │
├──────────────────────────────────────────────┤
│ LOGOS   [star ink] [star amber] [lockup…]    │  ← <a download> links to lumia/brand/logos/*
├──────────────────────────────────────────────┤
│ LUMI    [happy] [love] [aha] [sleepy] [wave] │  ← drawn live from js/lumi (composeLumi + paintLumi)
│         download at 1× · 4× · 8×             │    no smoothing, so pixels stay crisp
├──────────────────────────────────────────────┤
│ COLOURS ■ #f6df9f ■ #0a0a08 ■ #e0b05b …      │  ← click = copy hex + toast "Copied!"
├──────────────────────────────────────────────┤
│ FONTS   Marcellus · Space Grotesk (download) │
└──────────────────────────────────────────────┘
```

**Why the Lumi poses are drawn from code and not copied as images:** the game already contains Lumi's exact pixels and all its expressions. Drawing them on a canvas and saving as PNG gives perfectly crisp art in the official palette. That means zero new image files and nothing to keep in sync.

---

## 6. Grown-ups page for the Lumia course

It's the same screen with Lumia texts:
- **Setup:** your Claude account for days 3, 5, 8, 10, 12, 13 and 14, and a Figma account (she already has one).
- **Playbook:**
  - Course 1 told her "no fan art of brands". The Lumia playbook explains that *this* brand is OK because its owner (you) asked her to design for it.
  - Lumi is a marketing mascot, and merch counts as marketing, so it fits the brand rules.
- **Cheat sheet:** the universal specs, plus Lumia-specific notes (the 45 mm chest mark, whole-number pixel scaling, ink on light and amber on dark).
- **Ordering guide (after day 15):**
  - Belgrade shops that print single pieces: [Novoprint](https://novoprint.rs/majice) for tees (from 1 piece, about 1,100 RSD, about 2 days) and die-cut stickers, and [Izrada flajera](https://www.izradaflajera.com/stampanje-na-majicama.html) for tees.
  - Some shops need 10–20 pieces minimum (Copycentar, SKRIN Studio).
  - For mugs, ask first: I couldn't find a single-piece mug offer.
  - Don't order from Printful: it ships to Serbia, but probably with about 20% VAT, about 10% duty and courier fees.

---

## 7. Challenging the assumptions (simpler options we considered)

| Simpler idea | Why we're not doing it |
|---|---|
| **Just add days 31–45 to Night Studio.** Zero engine changes. | You asked for a *separate* course. The map, name and welcome would all say "Night Studio", and the "30 days" texts would be wrong. |
| **Copy `main.js` into `lumia-main.js`.** No change to the course 1 start-up. | It doesn't fix the real problem: the screens and `rules.js` still import course 1's data. We'd still need every screen change, *plus* 160 duplicated lines. |
| **Pass the course into every rule function** (`rules.xp(P, DAYS, course)`). | It's the "purest" option, but it changes about 40 call sites and every test. One `useCourse()` call at start-up gives the same result with 8 changed lines. The only cost is a module-level variable, which is fine because a page only ever runs one course. |
| **A course picker on `index.html`.** | It risks course 1 (her live save) and needs the header and router to juggle two stores at once. |
| **Skip the Brand Kit screen**, with links in day 1 only. | She needs the logos on almost every day. About 100 lines is cheap insurance against "I lost the logo". |
| **Print everything.** | Pins and patches have minimums of 50–100 pieces, and a plush sample costs hundreds. So they're taught as concepts with real specs. |

### Small things I noticed along the way
1. **Course 1 inconsistency.** Day 30 also uses Claude Design, but the grown-ups setup and playbook only list days 13, 14, 19 and 29. It's a one-word fix in `js/content/course.js` and I can do it while I'm there.
2. **The old tee mockups** in `~/Downloads/prometheus-analysis/PMF/figma/` use a *rejected* early star. We only reuse their placement numbers (45 mm, 85 mm), not the art.
3. **The Lumia brand skill says "ask before making brand files public".** You approved copying the logos and fonts. The game URL and anything internal stay out.

---

## 8. Order of work (all built, then pushed once)

1. **Engine:** `rules.useCourse`, `start(course)`, the course 1 pack, store label. Run `tests.html`, which must still show `PASS` for course 1 **before anything else**.
2. **Lumia shell:** `lumia.html`, the empty Lumia pack, brand files, Brand Kit screen, carry-over. Check in the browser that course 1's save is unchanged.
3. **Content:** days 1–15, with each video ID checked live and every quiz following course 1's rules (5 questions, 4 options, no "both/neither", the right answer not the longest).
4. **Tests for both packs**, the README, and a full `?dev` run-through (`nightStudio.skipTo(16)`).
5. **One push** while she isn't playing. Then check `lumia.html` live on GitHub Pages.

## 9. How we'll know it works
- `tests.html` shows `PASS n/n`, with checks for both courses.
- After opening `lumia.html`, course 1's localStorage entry `night-studio:progress` is **byte-for-byte unchanged**.
- `lumia.html` greets her by her pen name, Lumi has her star colour and can spin, fly and dance, and day 1 is open.
- Every Brand Kit download opens a crisp file. The Lumi PNG at 8× has hard pixel edges.
- Old Night Studio backups still restore. A Lumia backup refuses to restore into Night Studio, and vice versa.

---

## 10. What changed during the build (2026-10-16)

- **Fonts aren't copied.** Marcellus and Space Grotesk are Google Fonts, and Figma already has every Google Font, so
  the Brand Kit links to them instead. `lumia/brand/` holds only the logos (plus an amber copy of the vector star for
  dark garments: the same path, the official amber).
- **Lumi's poses share one 80 × 108 px frame,** anchored at its feet. Each pose has a different outline (62–72 px wide;
  "Yay" hops), so a shared frame keeps Lumi still when variants swap. All print numbers in the days use it
  (8× = 640 × 864 px ≈ 54 × 73 mm). Downloads go up to 32×, made only when clicked.
- **Level gifts:** aha → pin + patch → tee print + love → surprised → a new star colour → lights. Lumi's director
  played only body moves, so feeling tricks (aha, love, surprised) now play as a short reaction (`director.js`,
  marked "Night Studio").
- **Rules:** `rules.carryOver()` is a pure function, so `tests.html` checks it, including that the Night Studio save
  is never written.
- **Fixed in course 1 along the way:** Day 30 is now listed as a Claude Design day, and the day page no longer shows
  a stray "null" before the quiz button.
- **Videos** are 1–2 per day, all checked live via YouTube oEmbed on 2026-10-16. Some use Canva, Illustrator or
  Photoshop because there's no good Figma beginner video on that topic; each note says the ideas transfer.
