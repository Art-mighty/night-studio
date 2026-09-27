# Night Studio: implementation plan

A 30-day merch-design learning game for a shy 13–15-year-old, built from the research in `docs/research.md`.
Plain HTML, CSS and JavaScript. No frameworks, no build step, no server. The companion is Lumi, the
animated pixel mascot copied from `~/Lumia_marketing`.

---

## 1. Context

**Why we're building this.** The research (saved as `docs/research.md` and `docs/research.html`) is a
30-day, one-hour-a-day course: Figma plus Claude Design → print-ready stickers, tees, pins and patches.
It already says how the course should *feel*:

- lots of small private wins
- 2–3 option choices every day
- unlimited retries
- no leaderboards
- the parent as co-pilot

It exists only as a document. She's non-technical, so she needs one bookmark that opens a game. The game
shows today's videos, walks her through the task, quizzes her kindly and celebrates her work.

**What prompted the design.** A 7-round interview with you (section 2). Exploring the research, the
YouTube links and the Lumi code also turned up facts that changed the plan (section 3).

**Intended outcome.** A static site at `https://art-mighty.github.io/night-studio`. She opens it in Chrome
and plays Day 1 → Day 30. Her progress and pictures stay in her own browser, and Lumi reacts to
everything she does.

**Starting point.** The project folder was empty. The research is already saved. Nothing in
`~/Lumia_marketing` gets changed: we only copy from it.

---

## 2. What we agreed (the interview, in one table)

| Topic | Decision | Why |
|---|---|---|
| Player | 13–15, English, Chrome, one computer | Sets tone and reading level; makes browser storage safe |
| Hosting | GitHub Pages; I create `Art-mighty/night-studio` with `gh` after one last OK from you | One bookmark. YouTube only plays embedded videos on real https sites |
| Code style | ES modules (`<script type="module">`), no build step | Each file lists what it uses, so it's easy for a beginner to follow |
| Unlocking | The next day opens as soon as she finishes | Research: her pace. Two days in one evening is fine |
| Day counts as done | Task picture uploaded **and** quiz passed (4 of 5) | A broken video can never block her; videos are optional but earn XP |
| Task proof | Upload a picture (drop, choose, or paste a screenshot) | Builds her private gallery and lets Lumi wear her designs |
| Quiz | One question at a time with an instant 1-sentence "why". Unlimited retries; questions and answer order reshuffle | Research: competence and retries |
| Lanterns | 1 lantern per day she studied, never lost. After a gap: "Rainy days happen ☂️" | Gentler and simpler than streak shields |
| Companion | **Lumi**, not Blot. The live puppet code is copied in and converted to plain JS | Your mascot, fully animated, reacts live |
| Level gifts | Tricks (spin, fly, dance) plus her real designs worn by Lumi as pixels | Her work on show, with choices |
| Lumi speech | 1–3 word bubbles only; never answers or orders | She's in charge (research and your Lumi skill) |
| Secret badges | After an upload: "How did it go? All by myself / A little help / Together" plus an optional "I added my twist" | Research: reward independence on purpose |
| Daily choice | A "pick your flavor" card with 2–3 options every day | Research: autonomy through small choices |
| Warm-up | None | Your call |
| Video XP | "I watched it" button (honor system) | Simple and trusting; the quiz checks understanding |
| Grown-ups area | Backup / restore / reset, playbook and print cheat sheet, light progress view (no quiz-attempt counts) | Co-pilot, not judge |
| Vibe | Cozy night studio: navy, lamp glow, soft chime with mute, sparkles | The research's "secret artist after hours" |
| Content gaps | I write them all; you skim one file (~30–45 min) | Instant feedback needs a "why" for every question |
| Broken or long videos | Replace the 2 broken ones; clip long ones with YouTube start/end | No extra code, just two numbers per video |
| Claude Design days (13, 14, 19, 29) | You drive, she directs ("with your grown-up") | Claude's consumer plans are for users 18+ |
| Build order | Everything at once, sequenced so the riskiest part is proven first | Your call |
| Testing | `tests.html` (no installs) plus me playing it in the built-in browser | |
| Name | **Night Studio** (her real name is kept out of the public URL) | Privacy |

---

## 3. What exploring turned up (facts that shaped the plan)

1. **Videos.** I tested all 50 links against YouTube (oEmbed plus the watch page).
   - Day 8 `P4vvf0KBhZM` now needs a login, and Day 21 `JQj_inE7yQU` has embedding switched off.
   - Some videos are far longer than the research says:
     - Day 10 is **74 min** (the research says ~10).
     - Day 29 is 42 min.
     - Day 14's two videos total 50 min, and Day 3's total 52 min.
   - Total: 618 min, about 21 min a day, so the one-hour plan still works on average.
   - Data: `scratchpad/videos.json`.
2. **130 of the 150 correct answers are "B".** She'd spot that quickly, so answer order is shuffled on every
   attempt.
3. **Content gaps.**
   - Only 2 questions have an explanation.
   - Days 7–30 have no goal.
   - Tasks are paragraphs, not step lists.
   - Days 6, 20 and 28 have no badge name.
   - Some options say "Both" or "Neither", which read oddly once shuffled.
   - Day 13 Q1 is trivia about a model name.
4. **Lumi is almost all pure math.** `kit.tsx`, `art.ts`, `moves.ts`, `emotes.tsx` and `Lumi.tsx` compute
   every frame from the time `t`, as letter-grid pixel art. Only the drawing (React/SVG) and the frame clock
   (Remotion) have to be replaced.
5. **⚠ A straight copy of Lumi would freeze the page.**
   - The planning agent benchmarked it in Node 24 (the same V8 engine as Chrome).
   - During moves that squash or lean Lumi, the code builds a new ~340,000-character "8x" image every frame.
     It keeps it in a cache, so garbage-collection stalls pile up: median 13 ms, **1% of frames 612 ms, worst
     about 3 s**.
   - A ~30-line typed-array rewrite of that one step gives a **median of 1.5 ms (p99 2.5 ms)**. Its output is
     **identical** on 3,111 of 3,111 real warps and on 300 of 300 whole frames.
6. **YouTube "Error 153".** Embedded players refuse to play without a Referer header, which a page opened by
   double-click (`file://`) doesn't send. So the game must be served over http(s). GitHub Pages does that,
   and so does `python3 -m http.server` on your computer.
7. **Brand flag.** Your `lumia-character-animation` skill says *"Never show Lumi as gameplay or living inside
   a game scene."* It reads like a marketing rule, so using Lumi here is your call. Note that a public Pages
   repo also publishes the Lumi art and code.

---

## 4. Architecture

### Before

```
night-studio/ (this repo)         Lumia_marketing/ (other repo: we only READ it)
└── docs/                         └── video/src/characters/
    ├── research.md   (saved)         ├── kit.tsx      motion math + pixel tools (+ React bits)
    └── research.html (saved)         ├── emotes.tsx   ! ? hearts zzz sparkles (React)
                                      └── lumi/ art.ts moves.ts Lumi.tsx  (drawn as SVG by Remotion)
No game yet. The research is only a document.
```

### After (what runs in her Chrome)

```
             static files from GitHub Pages  (https://art-mighty.github.io/night-studio)
                                      │
┌─────────────────────────────────────▼───────────────────────────────────────────────┐
│ index.html   one page. The part after # in the address decides which screen shows │
│  header: pen name · ⭐ XP · 🏮 lanterns · 🔔 mute                                   │
│  <main>   ← screens: map (+onboarding) · day (+quiz) · levelup · shelf · grown-ups  │
│  <aside>  ← Lumi's corner: <canvas> + word bubble + tap button (never re-created)   │
│                                                                                     │
│  screen ──commit(action)──► rules.js  (PURE: same input → same output)              │
│    │                           │  reads content/days.js + content/course.js         │
│    │                           ▼                                                    │
│    │                        store.js ──► localStorage  "night-studio:progress" (JSON)│
│    │                                 └─► IndexedDB     "night-studio" (her pictures) │
│    └──lumi.react("correct","Yes!")──► lumi/director.js (clock, 30 frames a second)  │
│                                          └► moves.js → lumi.js → kit.js → paint     │
└─────────────────────────────────────────────────────────────────────────────────────┘
   The only outside requests: the YouTube player (youtube-nocookie.com), loaded when she presses Play.
   Nothing about her (pen name, answers, pictures) is ever sent anywhere.
```

**Beginner glossary**
- *localStorage* is the browser's small notebook for text. It holds her progress (5–20 KB).
- *IndexedDB* is the browser's bigger drawer, which can hold pictures.
- *Pure function* means the same inputs always give the same output, with nothing hidden. That makes it
  testable without a web page.
- *Hash router*: `#/day/3` shows Day 3. The back button works and nothing needs configuring on the server.

### A day, step by step

```
Studio map ──"Tonight: Day N"──► Day N screen
 ① Pick your flavor   🦉 owl / 🐱 cat / 🌙 moon  (her pick goes into the steps)        Lumi: aha "Ooh!"
 ② Videos (optional)  card ▸ Play (clipped by start/end) ▸ [I watched it] +10 each      Lumi: "Nice!"
 ③ Task               steps + deliverable ▸ drop / choose / paste a picture  +40        Lumi: love "Wow!"
 ④ Check-in (once)    All by myself / A little help / Together
                      [ ] I added my own twist +15      ("grown-ups can see this")      Lumi: surprised
 ⑤ Quiz               5 questions, one at a time, shuffled                              Lumi: thinks
                      right → "Yes!" + why       wrong → "Almost!" + why                correct / oops→aha
                      ≥4/5 → pass +30 (+10 if her FIRST finished try was 5/5)   else → "Again?" reshuffle
   ── done = picture uploaded AND quiz passed (the quiz is never locked) ──
 ⑥ Reward             badge · lantern lit · Day N+1 unlocked
                      [Keep going] or [Done for tonight] → Lumi waves and exits "See you!"
                      last day of a room? → [Open your gift] → Level-up screen (she chooses) → map
```

### How Lumi is drawn, 30 times a second

```
director: t (seconds)
  → pose = add( idle float/blink , mood from emotions() , action e.g. wave/spin , tap trick )
  → composeLumi(): stamp arms, body (+ her designs as pixels), face and star letters onto a pixel grid
  → warp(): squash / lean / spin ON the same grid   (fast typed-array version, same pixels)
  → paintLumi(): one fillRect per run of same-colour pixels, × a whole-number scale (crisp pixels)
```

---

## 5. Files to create (with projected lines of code and why)

Nothing existing is modified. `docs/research.*` stays as saved, and `~/Lumia_marketing` is never touched.

### A. Page and look

| File | LOC | What it does | Why it's needed |
|---|---|---|---|
| `index.html` | ~45 | Page shell: header, `<main id="app">`, Lumi's `<aside>`, footer "For grown-ups" link, one module script | One URL to bookmark; screens swap inside it |
| `css/style.css` | ~550 | Night-studio theme, every screen, Lumi corner, bubble, sparkles, `prefers-reduced-motion` | One stylesheet keeps the look consistent |

### B. Game logic

These files never touch the page, so they're easy to test.

| File | LOC | What it does | Why |
|---|---|---|---|
| `js/main.js` | ~150 | Starts the app; asks Chrome to protect storage (`navigator.storage.persist()`); hash router with guards (locked day → map, gift waiting → level-up); header; `commit(action)` changes → saves → redraws; `?dev` test helpers | One place wires everything together |
| `js/rules.js` | ~230 | **Pure rules**: `dayStatus`, `act()` (the ONLY way progress changes), `xp()`, `lanterns()`, rooms, `badges()`, `pendingLevelUp()`, `tricks()`, `wearChoices()`, `deck()` (shuffles questions and options and remaps the answer), `fillFlavor()` | Every rule can be tested without a browser page |
| `js/store.js` | ~190 | Load/save progress (versioned, with migrations); pictures in IndexedDB; backup to one JSON file, restore, reset (type RESET) | Her 30 days of work must survive |
| `js/images.js` | ~130 | Shrinks uploads to ≤1600 px WebP (keeps transparency). Turns a design into Lumi-sized pixels: trim, pixelate, ≤6 colours, 1-px outline | Pictures stay small; Lumi can wear her art |
| `js/ui.js` | ~150 | Tiny helpers: `h()` builds elements; synthesized chime (no audio files); "+XP" float; video card (click → iframe with `start`/`end`, `referrerpolicy`, "Open on YouTube" link); upload zone (drop / choose / paste) | Shared bits, written once |

### C. Screens

Each exports `render(el, ctx, arg)` and returns a cleanup function.

| File | LOC | What it shows |
|---|---|---|
| `js/screens/map.js` | ~170 | Onboarding (pen name + 3 suggestions, meet sleepy Lumi) and the studio map: 7 rooms × days, lanterns, "Tonight: Day N", welcome-back card |
| `js/screens/day.js` | ~240 | Flavor → videos → task and upload → check-in → reward. Updates only its own parts, so a playing video isn't reset |
| `js/screens/quiz.js` | ~140 | One question at a time, instant why, pass or retry with a reshuffle |
| `js/screens/levelup.js` | ~130 | Room gifts: star colour (6 swatches), trick demo, "which design should Lumi wear?" (2–3 of her uploads), lights up |
| `js/screens/shelf.js` | ~150 | Gallery by room, badges (secret ones show "???"), **Show Family** slideshow (`<dialog>`, arrow keys, Esc) |
| `js/screens/grownups.js` | ~150 | Days done, XP, lanterns, her check-ins; "storage protected?" and "last backup N days ago"; backup / restore / reset; playbook; print cheat sheet; video preview list; real-print reminders after Day 20 and Day 30 |

### D. Lumi, copied from `Lumia_marketing/video/src/characters/` and converted to plain JS

| New file | From | LOC | Changes (everything else copied as-is) |
|---|---|---|---|
| `js/lumi/kit.js` | `kit.tsx` | ~320 | Types stripped; React `Pixels`/`Bubble` and the font import removed. **New**: typed-array Scale2x/`x8` with reused buffers (the freeze fix), a `keep` flag so only static art is cached, `paint(ctx, rows, pal, x, y)` for canvas. `sprite()` slimmed to `{w, h, rows}` |
| `js/lumi/art.js` | `lumi/art.ts` | ~450 | Pixel data verbatim. **New**: `SLOTS` (belly 21×18 at 23,51 · pin 7×7 at 15,47 · round patch 9×9 at 15,70) and `STARS` (gold default, rose, mint, sky, lilac, coral) |
| `js/lumi/moves.js` | `lumi/moves.ts` | ~235 | Types stripped; `starToLogo` and the "star-to-logo" move removed (they need the Lumia logo) |
| `js/lumi/emotes.js` | `emotes.tsx` | ~150 | `STAMPS` verbatim; `Stamp`/`Emote`/`Burst` rewritten as canvas draw functions |
| `js/lumi/lumi.js` | `lumi/Lumi.tsx` | ~200 | Split into `composeLumi(opts)` (pure → pixel rows) and `paintLumi(ctx, frame)`. `useCurrentFrame` becomes a `t` argument; logo code removed. **New** hooks: star colour and worn designs (drawn only on cream pixels, hidden in the back view) |
| `js/lumi/director.js` | new | ~170 | 30 fps clock (pauses in hidden tabs); API `base(mood)`, `react(mood, words)`, `act(move)`, `say(words)`, `dress({star, wear})`, `tricks([...])`; bubble placement; tap = next unlocked trick |
| `js/lumi/LICENSE-ClaudeAnimationBase` | copied | 21 | The motion math is MIT-licensed; the notice must travel with it |

**Lumi's reactions**

| Moment | Lumi |
|---|---|
| Before Day 1 is done | sleepy (zzz) |
| Day 1 done | surprised, then waves "Hi!" and stays awake |
| Game opens | enters and waves "Hi, &lt;pen name&gt;!" ("Missed you!" after a gap) |
| Question on screen | thinks |
| Right / wrong answer | correct hop "Yes!" / oops "Almost!" → aha while the why shows |
| Quiz passed / not yet | correct (+ dance once unlocked) "You did it!" / love "Again?" |
| Upload | love "Wow!" |
| Done for tonight | waves, then exits "See you!" |
| Tap | next trick she has unlocked |

### E. Content

| File | LOC | What it holds |
|---|---|---|
| `js/content/days.js` | ~1,400 | All 30 days. Research text copied where it exists, plus the new writing in section 6 |
| `js/content/course.js` | ~170 | 7 rooms and their gifts, XP values, pass mark, secret badges, Lumi's bubble words, playbook, print cheat sheet |

One day's shape (the research's own structure, extended):

```js
{ day: 8, room: 2, title: "Cookie-Cutter Shapes (Boolean Operations)", goal: "…",
  videos: [{ id: "tdyQVg7tbfg", title: "…", channel: "ApolloDesigns", min: 4.9, start: 0, end: null, note: "" }],
  flavor: { prompt: "Pick tonight's sky shape", options: [{ label: "🌙 Moon", fill: "a crescent moon" }, …] },
  task:   { tool: "Figma", steps: ["Build {flavor} with Subtract.", …], deliverable: "4 icons + a flattened copy" },
  quiz:   [{ q: "…", options: ["…","…","…","…"], answer: 1, why: "One sentence." }, …5],
  badge:  { id: "cookie-cutter", name: "Cookie Cutter", icon: "🍪" } }
```

### F. Tests and docs

| File | LOC | Why |
|---|---|---|
| `tests.html` | ~220 | No-install checks. The page title reads "PASS n/n" (section 9) |
| `README.md` | ~70 | Run locally, deploy, edit a day, backups, re-syncing Lumi, licenses |
| `docs/implementation-plan.md` | this file | Copied in as the first step so the plan lives with the code |

### Totals

| Group | Files | LOC |
|---|---|---|
| New hand-written code (A + B + C + director + tests + README) | 16 | **~2,900** |
| Lumi copied and converted (~430 lines are pixel data; ~200 lines actually change) | 6 | ~1,380 |
| Content (text, not logic) | 2 | ~1,570 |
| **Total** | **24** | **~5,850** |

---

## 6. Key designs

**Progress** (localStorage `night-studio:progress`): what she *did*, never totals.

```js
{ v: 1, penName: "Moth", muted: false,
  lanterns: ["2026-10-01", …],                 // local dates she studied; never removed
  days: { "1": { flavor: 2, watched: ["AFDZpMCTn2E"], uploads: ["d01-…"], taskAt: "2026-10-01",
                 checkin: "solo", twist: true, quiz: { first: 5, best: 5 }, doneAt: "2026-10-01" } },
  lumi: { star: "rose", wear: { belly: { img, rows, pal }, pin: null, patch: null } },
  seen: { levelUps: [1, 2], welcomeBack: "2026-10-09" } }
```

- XP and badges are **calculated** from this every time, never stored, so they can't be double-counted.
- No attempt counts are stored, so the grown-ups view can't show them.
- Dates are local `YYYY-MM-DD`.
- Migrations stash the old JSON first (`night-studio:progress@v1`).

**Pictures** go in IndexedDB database `night-studio`, store `images`, as records `{ key, day, blob (WebP), w, h, at }`.
About 90 pictures is roughly 15–30 MB, far under Chrome's limit.

**Backup file** is `night-studio-backup-YYYY-MM-DD.json`, holding `{ kind, format: 1, exportedAt, progress, images: [base64…] }`.
Restore runs the same `migrate()`.

**XP**

| Source | XP |
|---|---|
| Video watched, each | 10 |
| Task (first picture) | 40 |
| Quiz passed | 30 |
| First finished try was 5/5 | +10 |
| Twist | 15 |
| Solo Flight (first "all by myself") | 50, once |
| Own Idea (3 twists) | 50, once |

The maximum is about 3,440 XP.

**Level gifts** (given when a room is finished)

| When | Gift | Her choice |
|---|---|---|
| Day 1 done | Lumi wakes up | – |
| Room 1 (Day 6) | Lumi's star changes colour | 6 swatches |
| Room 2 (Day 12) | learns SPIN | – |
| Room 3 (Day 15) | learns FLY | – |
| Room 4 (Day 20) | wears her sticker on its belly | 2–3 of her Room 4 pictures |
| Room 5 (Day 25) | tee print on its belly + learns DANCE | 2–3 of her Room 5 pictures |
| Room 6 (Day 28) | pin + patch | 2–3 each |
| Room 7 (Day 30) | studio lights up with her collection; "Dress Lumi" | any of her designs |

**Content I'll write** (you skim `js/content/days.js`):
- 148 one-sentence "why"s
- goals for Days 7–30
- 3–6 step task lists
- 30 flavor sets
- badge names for Days 6, 20 and 28 (e.g. *Poster Pioneer*, *Sticker Boss*, *Merch Maker*)

Fixes to existing content:
- "Both" / "Neither" options become full phrases.
- Day 13 Q1 (model-name trivia) is replaced with a practical prompt question.
- "With your grown-up" is added on Claude Design steps (Days 13, 14, 19, 29).

**Video fixes**
- Find same-topic replacements for Day 8 and Day 21, and re-run the same embed check (`check_videos.py`).
- Set `start`/`end` from each long video's chapters:
  - Day 10 video 2: ~10 of 74 min
  - Day 29
  - "first ~8–10 min" on Days 3, 14 and 19
  - "key parts" on Days 15 and 20
- Every card keeps an "Open on YouTube" link.

---

## 7. Simpler choices (assumptions we challenged)

- **Lanterns that never break** instead of streaks plus Rain Day shields: less code, and kinder.
- **No framework, no build, no npm.** Plain files; the only command is `python3 -m http.server 8000`.
- **One door for changes** (`rules.act()`). Every rule is a pure function that can be tested in isolation.
- **XP calculated, not stored**, so there's no double-counting and no sync bugs.
- **Honor-system "I watched it"** instead of YouTube API tracking: about 60 fewer lines and just as honest.
- **Lumi: copy the code, fix the one hot spot** we measured. No rewrite, and no pre-rendered videos (which
  couldn't wear her designs).
- **One Lumi canvas for the whole app**, never rebuilt per screen.
- **No files to download**: the chime is synthesized, fonts are system fonts, and the YouTube player loads
  only when she presses Play.
- **Dropped from Lumi**:
  - star-to-logo (brand logo)
  - the SVG bubble (CSS instead)
  - `LumiSheet` (replaced by a move sheet in `tests.html`)
  - "stage mode" (Lumi stays in its corner)

---

## 8. Build order (everything at once, riskiest first)

0. Copy this plan to `docs/implementation-plan.md`, then `git init` and add a `.gitignore`.
1. **Port Lumi.**
   - Strip types with Node's `stripTypeScriptTypes` and tidy with Lumia's Prettier. Both run once, from the
     scratchpad.
   - Hand-convert the JSX parts; add typed `x8`, `paint`, `composeLumi`/`paintLumi` and `director`.
   - Prove it's faithful with the golden hashes in `tests.html` (section 9) before building anything on top.
2. Write `course.js`, `rules.js` and `store.js`, plus their tests.
3. Write `days.js`: research text, new writing, video fixes (re-run the video check).
4. Build `index.html`, `style.css`, `ui.js`, `images.js`, `main.js`, the six screens, and hook up Lumi's reactions.
5. Finish `tests.html` until everything passes, then do the click-through (section 9).
6. Write `README.md`.
7. **Go live.**
   - I ask you once more.
   - Then `gh repo create Art-mighty/night-studio --public --source . --push` and turn on Pages (main branch, root).
   - Open the live URL: a video plays with no Error 153, an upload survives a reload.

---

## 9. Verification

**`tests.html`** is at `http://localhost:8000/tests.html` and its title shows "PASS n/n".

1. *Content*
   - 30 days, rooms match.
   - 5 questions per day; 4 different options each; answer 0–3; non-empty why; no "Both/Neither".
   - Video ids are valid; `start < end`.
   - Every flavor has 2–3 options and is used in the steps.
   - Badge ids are unique.
2. *Rules*
   - The unlock chain holds, and locked days ignore actions.
   - Watching twice gives +10 once.
   - "First try" means the first finished attempt only.
   - `doneAt` stays set if a picture is deleted.
   - One lantern per date; the welcome-back card appears after a gap of 2 or more days.
   - Secret badges, tricks and gifts work per room.
   - A scripted perfect 30-day run gives the maximum XP.
   - `deck()` fairness: over 3,000 shuffles the correct answer lands in each position 22–28% of the time, and
     the remapped answer always matches.
3. *Store*: migration fixtures, plus a backup → restore round trip in a throwaway namespace.
4. *Lumi port*
   - The typed Scale2x matches the original string version on random sprites.
   - `composeLumi()` matches **golden hashes computed from the original TSX** for 12 moves (idle, wave, think,
     correct, oops, love, sleepy, spin, dance, fly, enter, exit).
   - 600 mixed frames run at a median under 4 ms.
5. *Visual*: a sheet of all moves, the star colours and outfit previews, for my own eyes.

**Click-through**, in the built-in browser with fresh storage, `python3 -m http.server 8000`, opening `/?dev`:
1. Onboarding with sleepy Lumi.
2. Day 1: flavor → play a real video → "I watched it" → paste a screenshot → check-in.
3. Fail the quiz, then pass on retry → reward → Day 2 open.
4. Reload: everything persisted.
5. Grown-ups: backup → reset → restore; pictures return.
6. `?dev` `skipTo(6/12/15/20/25/28/30)` to see every gift and outfit picker.
7. No console errors.

**After deploy**: repeat steps 2 and 4 on the live URL.

---

## 10. Risks and how we handle them

| Risk | Mitigation |
|---|---|
| Lumi stalls the page | Typed-array Scale2x (measured median 1.5 ms, identical pixels); 30 fps cap; pauses in hidden tabs |
| Chrome clears storage under disk pressure | `storage.persist()`; the grown-ups page shows "protected?" and "last backup N days ago"; one-click backup. The README says to avoid Incognito and Guest profiles |
| A video breaks later | Every card has "Open on YouTube"; the grown-ups video list lets you preview quickly |
| The public repo | No personal data in code; her name, progress and pictures stay in her browser. Lumi's art becomes public (your call) |
| Deploying while she plays mixes versions | Deploy when she isn't playing. Never renumber days |
| The two Lumi copies drift apart | `lumi.js` stays a 1:1 port of `Lumi.tsx`; the README explains how to re-sync |
| The check-in feels like surveillance | A small "grown-ups can see this" line; no attempt counts are stored |
| A mistake among 150 questions | Content tests plus your skim |
