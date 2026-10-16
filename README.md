# Night Studio

A cozy 30-evening game for learning merch design with Figma (and a little Claude Design). Each evening: pick a
flavor, watch a video or two, make something, add a picture of it, answer a kind 5-question quiz. Lumi, a small
pixel ghost, keeps her company. It wakes up on Day 1, learns tricks, and wears her designs.

It's built from the research in [docs/research.md](docs/research.md). The build plan is in
[docs/implementation-plan.md](docs/implementation-plan.md).

**The sequel, Lumia Merch Lab** (`lumia.html`), is 15 evenings of designing real merch for Lumia, inside its brand
rules: stickers, a pin, a patch, tees, a cap, a tote, a mug, a school set, a plush concept, a welcome kit, and a
print-ready hand-off. It has a Brand Kit screen (`#/brand-kit`) with the logos, Lumi's poses, colours and fonts. On
its first open it brings over her pen name and Lumi (star colour, outfit, tricks) from Night Studio, which it only
reads. Its plan is in [docs/lumia-merch-lab-plan.md](docs/lumia-merch-lab-plan.md).

## For her

Open the bookmark in Chrome. That's all. Her progress and pictures are saved in that browser on that computer.

## Run it on your computer

The game must come from a web address, not a double-clicked file: YouTube refuses to play embedded videos in local
files ("Error 153"), and browsers won't load the game's JavaScript modules from `file://`.

```bash
python3 serve.py
```

Then open <http://localhost:8000> (Night Studio) or <http://localhost:8000/lumia.html> (Lumia Merch Lab). No
installs, no build step.

- **Tests:** <http://localhost:8000/tests.html>. The tab title says `PASS n/n`. They check the content, every game
  rule, backups, and that Lumi matches the original pixel for pixel.
- **Dev mode:** <http://localhost:8000/?dev> (or `lumia.html?dev`), then in the console `nightStudio.skipTo(16)` finishes Days 1–15 with
  made-up pictures, so you can see level-ups and outfit pickers. Use a separate Chrome profile, since it writes real
  progress.

## Put it online (GitHub Pages)

Pages serves this folder as it is: `index.html` at the root, branch `main`. Every `git push` updates the site within
a minute or two. Push when she isn't mid-session, and never renumber days, since her progress is stored by day number.

## Change the course

| To change… | Edit |
|---|---|
| A day's text, steps, flavor choices, quiz or videos | `js/content/days.js` (Lumia: `js/content/lumia/days.js`) |
| XP values, pass mark, rooms and gifts, Lumi's words, the playbook, the cheat sheet | `js/content/course.js` (Lumia: `js/content/lumia/course.js`) |
| The Lumia Brand Kit: rules, logo list, poses, colours | `BRAND` in `js/content/lumia/course.js`; files in `lumia/brand/` |
| Colours and layout | `css/style.css` (variables at the top) |

Days in `days.js`:

- **Quiz `answer`** is 0-based (0 = the first option). The game shuffles questions and options on every attempt.
- **A video** is its 11-character YouTube id. `start` and `end` (in seconds) clip it, and `end: null` plays to the end.
- **`{flavor}`** in a task step is replaced with her flavor pick.

After editing, reload `tests.html`.

## How it's built

```
index.html          the page: header, <main> for screens, Lumi's corner, footer; starts Night Studio
lumia.html          the same page for Lumia Merch Lab
css/style.css       the night-studio look
js/main.js          the engine: start(course) runs a course pack; the #/ address picks the screen
js/rules.js         every game rule, as pure functions (tested in tests.html)
js/store.js         progress in localStorage, pictures in IndexedDB, backup/restore/reset
js/images.js        shrinks uploads; turns a design into Lumi-sized pixels
js/ui.js            small helpers: h() to build elements, chime, video card, upload box
js/screens/         map (+ welcome), day, quiz, levelup, shelf, grownups, brandkit (Lumia only)
js/content/         days.js (the 30 days), course.js (rules and texts, bundled as the COURSE pack)
js/content/lumia/   the Lumia Merch Lab pack: days.js (15 days), course.js
lumia/brand/        Lumia's logo files (see its README)
js/lumi/            Lumi, copied from Lumia_marketing (see below), plus director.js
tests.html          no-install tests
docs/               the research and the plan
```

Each course is one "pack" (`COURSE`): its days, rooms, texts and save name (`id`). A page hands a pack to
`start()`; the rules and screens read everything course-specific from it. A third course is a new pack plus a page.

Plain HTML, CSS and JavaScript modules: no framework, no npm, no build. Her data never leaves her browser. The only
outside requests are the YouTube player (youtube-nocookie.com), and only when she presses Play.

## Her data

- **Progress** lives in `localStorage` (`night-studio:progress`) and **pictures** in IndexedDB (`night-studio`).
  Lumia Merch Lab uses its own: `lumia-merch-lab:progress` and `lumia-merch-lab`. The two never touch each other.
- **Never change a pack's `id`**: it's the save name.
- The grown-ups page (footer link) downloads a **backup** (one JSON file, pictures included), restores one, or starts
  over (type `RESET`).
- The game asks Chrome to keep its data even when the disk fills up. The grown-ups page shows whether Chrome agreed,
  and when the last backup was made.
- Incognito and Guest windows forget everything when closed.

## Lumi

Lumi is Lumia's mascot, copied from `~/Lumia_marketing/video/src/characters/` (commit `c089895`) and converted from
TypeScript/React/Remotion to plain JavaScript on a `<canvas>`:

- The maths is unchanged.
- The TypeScript types were removed with Node's `stripTypeScriptTypes`.
- The React drawing became `paint()` and `paintLumi()`.
- The star-to-logo move was dropped.
- Scale2x was rewritten on typed arrays. The original version stalls a browser for up to seconds when Lumi squashes.
- Every change is marked "Night Studio" in the code.

Checked frame by frame against the original: 2,228 frames, 0 differences. `tests.html` keeps 12 golden hashes from the
original.

To take a newer Lumi, repeat the conversion, re-apply the marked changes, recompute the golden hashes from the
original, and run the tests. `director.js` is new: it decides Lumi's moods and moves, and the screens only send it
requests like `lumi.react("correct", "Yes!")`.

Lumi's motion code includes ClaudeAnimationBase by John Heibel (MIT, see `js/lumi/LICENSE-ClaudeAnimationBase`).
