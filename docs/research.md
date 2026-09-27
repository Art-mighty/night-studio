# Merch Designer Quest: A 30-Day, One-Hour-a-Day Plan to Learn Merch Design with Figma + Claude Design

In 30 one-hour sessions, a shy beginner can go from zero to print-ready files for stickers, t-shirts, pins, patches and other merch. The game rewards private mastery, not public performance: small wins, real choices, unlimited retries.

## TL;DR

- **Two tools, two jobs.** Claude Design is for ideas, mood boards, mockups and presentation. It exports Canva, PDF, PPTX or HTML, but not print-ready SVG or PNG. Figma is where the real print files (vector SVG/PDF, 300-DPI PNG) get built. So every Claude Design idea gets rebuilt or traced in Figma before printing.
- **Motivation design follows the evidence.** A 144-study meta-analysis (Bureau, Howard, Chong & Guay, 2022, *Review of Educational Research*) found that feeling competent is the strongest predictor of self-driven motivation, followed by autonomy (choice) and then relatedness (connection). Gamification meta-analyses show small-to-large learning gains (g ≈ 0.46–0.82), and shorter programs tend to work best. A 30-day plan fits well.
- **What that means in practice:** many small private wins, choices of 2–3 options every day, no leaderboards, unlimited quiz retries, and a parent who acts as co-pilot rather than judge.

## Why Claude Design + Figma Work Together

Claude Design lets you refine a design through conversation, inline comments, direct edits and custom sliders. It exports to Canva, PDF, PPTX or standalone HTML, but it has no image or SVG export button. Print shops want vector files or 300-PPI rasters (Sticker Mule), or transparent sRGB PNGs at 150+ DPI (Printful). So the course repeats this loop:

**Claude Design (ideas, style boards, mockup pages, lookbook) → PDF or screenshot → Figma (trace or rebuild with the pen tool, booleans and components) → export SVG/PDF/PNG to the printer's spec.**

This suits a shy, low-initiative learner. The AI removes the fear of a blank page, and building by hand in Figma gives her the sense of competence and ownership that motivation research says matter most.

## What the Evidence Says About Motivating Shy, Reluctant Learners

- **Self-Determination Theory (SDT):** motivation grows when three needs are met: autonomy (choice), competence (mastery) and relatedness (connection). The biggest lever is competence.
- **Autonomy support:** supportive adults see things from the learner's point of view, offer choices within clear guidelines, and give good reasons for the less fun tasks (Guay, 2022, *Canadian Journal of School Psychology*).
- **Gamification works, but modestly and depending on design:** Huang et al. (2020) g = 0.46; Sailer & Homner (2020) g = 0.49; Bai, Hew & Huang (2020) g = 0.50; Li, Ma & Shi (2023) g = 0.82.
- **Design implications:** no public leaderboards, private progress, 2–3 option choices instead of an open-ended "do whatever," unlimited retries, praise for process ("you fixed the bleed") rather than ability, and optional family-only "show and tell."

## Game Design: "Night Studio: The Merch Monster Workshop"

**Theme:** She's the secret artist in a cozy, lamp-lit studio after hours. Nobody watches. Her companion is a small, quiet monster called **"Blot"** who can't talk. Blot "grows" by wearing the merch she designs: a sticker on day 16, a tee on day 21, a pin on day 26. She is in charge of Blot, never the other way around. Nothing is shared unless she presses "Show Family."

**Core loop (daily):** Unlock the day → watch 1–3 videos → do the hands-on task and upload a screenshot → take a 5-question quiz. **Pass mark is 4/5. Retries are unlimited**, questions reshuffle, and after a miss she gets a hint ("Re-watch 2:00–4:00") → claim XP and badge → the next day unlocks.

**XP system**

- Video watched: 10 XP each
- Task deliverable uploaded: 40 XP
- Quiz passed: 30 XP (+10 for a first-try perfect score)
- "Choose your own twist" bonus (she changes the task in her own way): 15 XP. This rewards autonomy.
- About 110 XP per day at most, and about 3,000 XP for the whole course.

**Levels (7 studio "rooms")**

| Level | Days | Room name | Unlock reward |
|---|---|---|---|
| 1 | 1–6 | The Sketch Lamp | Blot gets a color |
| 2 | 7–12 | The Vector Forge | Blot gets a pen-nib tail |
| 3 | 13–15 | The AI Sidekick Nook | Blot gets a robot friend "Clawd-bot" |
| 4 | 16–20 | The Sticker Lab | Blot wears her first sticker |
| 5 | 21–25 | The Thread Loft | Blot wears her t-shirt |
| 6 | 26–28 | The Metal & Stitch Workshop | Blot wears her pin & patch |
| 7 | 29–30 | The Launch Window | Studio "lights up" with her full collection |

**Streaks (low pressure):** Each day in a row lights one "lantern." She gets **two "Rain Day" streak shields per week**, so missing a day never resets progress. The display never shows a broken streak in red. It just says "Lanterns lit: 12."

**Badges:** *First Mark*, *Palette Keeper*, *Type Whisperer*, *Path Tamer*, *Cookie Cutter*, *Clone Master*, *Shape Shifter*, *Export Ninja*, *Prompt Captain*, *Cut Line Pro*, *Bleed Guard*, *Holo Hunter*, *Thread Head*, *Pixel Math Wizard*, *Pattern Weaver*, *Metal Liner*, *Stitch Smith*, *Collection Curator*, *Launch Legend*. There are also secret independence badges: *Solo Flight* (finishes a task without asking for help) and *Own Idea* (makes up her own twist 3 times).

**Artifact data structure (per day):** `{ day, level, title, goal, videos:[{title, channel, url, minutes}], task:{tool, steps[], deliverable}, time:{warmup, video, task, quiz, reflect}, quiz:[{q, options[4], answerIndex, explanation, hintTimestamp}], xp:{video, task, quiz, bonus}, badge }`

## Parent Playbook

1. **Co-pilot, not judge.** Sit beside her for the first 5 minutes, then move to "nearby." Ask "Which of these two do you like?" rather than "What do you want to make?" Open-ended prompts can freeze a reluctant learner, while 2–3 choices give autonomy without overwhelm.
2. **Praise the process, specifically:** "You kept the text inside the safe zone," not "You're so talented."
3. **Showing work safely:** keep a private gallery inside the game, hold a family "gallery night," and order one real physical print as the capstone reward. Share online only if she wants to, and use a pen name.
4. **Plugins & Community files:** check who made a plugin before installing it. Duplicating a Community file makes your own copy.
5. **Copyright rule for the whole course:** only original characters. No fan art of brands or characters for anything that might be sold.
6. **Keep Claude Design as a work tool:** open it for the design task, close it when done.

## Print-Spec Cheat Sheet

- **Pixel math:** pixels = inches × DPI. 12 in × 300 DPI = 3,600 px. A 12×16 in print at 300 DPI needs 3,600 × 4,800 px. Design at 1× in Figma and export at 2× or 3×.
- **Stickers (Sticker Mule):** vector or ≥300 PPI. Cut line as a 0.05–1 pt magenta stroke. Use 1/8 in (0.125 in) bleed. Minimum font 6 pt, minimum line 1 pt. CMYK recommended. Text can't be printed full-bleed.
- **Stickers (general):** a 3×4 in sticker with 1/8 in bleed needs a 3.25×4.25 in canvas. Keep key detail about 1/8 in inside the cut line.
- **T-shirts (Printful):** transparent PNG, sRGB, minimum 150 DPI, best not above 300 DPI. Front print area up to 12×16 in. Phone cases and stickers need 300 DPI. A black background on a black shirt prints as a grayish rectangle. JPG works better for all-over print.
- **CMYK vs RGB:** Figma is RGB. Printful apparel asks for sRGB, while sticker and paper printers prefer CMYK. The "Print for Figma" plugin adds CMYK export and 0.125 in bleed.
- **Enamel pins:** vector files, no gradients, every color separated by metal. Metal lines ≥0.2 mm, color areas ≥0.3 mm, text ≥5 pt. A beginner size is about 1–1.5 in.
- **Embroidery (Printful):** text at least 0.25 in tall, lines at least 0.05 in thick.
- **Figma export:** SVG and PDF export at 1× only because they're vector.

## The 30-Day Plan

> **Note on videos:** URLs come from live YouTube search results, but lengths are approximate. Preview each video first, since some contain sponsor or course promotions. If a video doesn't cover a quiz point, use the cheat sheet fact instead.

**Standard hour:** Warm-up 5 min · Videos 10–25 · Task 25–35 · Quiz 5–8 · Reflection & reward 2–5 = ~60 min.

### LEVEL 1: THE SKETCH LAMP (Days 1–6)

#### Day 1: Hello, Figma

**Goal:** Get around the canvas; make your first frame, shapes and text; export once.

**Videos:**

1. "Course overview: Figma Design for beginners (2025)" (Figma) https://www.youtube.com/watch?v=AFDZpMCTn2E (~3 min)
2. "Learn Figma in 13 minutes! (Crash course for beginners)" https://www.youtube.com/watch?v=jQ1sfKIl50E (~13 min)

**Task:** Open Figma and create a file called "My Night Studio." Add a 1080×1080 frame, 3 shapes (circle, rectangle, star) and your initials in text. Export the frame as a PNG. **Deliverable:** `Day01_hello.png`.

**Quiz:**

1. You drag a rectangle from the empty canvas into a frame. What changes? A) It becomes a component B) It becomes a child of the frame, moving and clipping with it C) It gets flattened D) Nothing. **✅ B.** Frames contain layers, so the rectangle moves with the frame and can be clipped by it.
2. What do you need to follow Figma's beginner course? A) A paid Professional plan B) An iPad and Apple Pencil C) A computer, internet and a Figma account; the free Starter plan is enough D) Adobe Illustrator. **✅ C.**
3. Frame vs group? A) Groups can clip; frames can't B) Frames have their own fill, clipping and layout; groups just bundle layers C) Identical D) Only groups export. **✅ B.**
4. In the Layers panel, a layer higher in the list appears… A) behind lower layers B) in front of lower layers C) randomly D) hidden. **✅ B.**
5. You want to export only your artwork. Best method? A) Screenshot B) Select the frame and add an export setting C) Print the page D) Export the page file. **✅ B.**

   **Reward:** 🏅 *First Mark*, and Blot opens his eyes.

#### Day 2: The Secret Rules of Good Design

**Goal:** Use balance, contrast, emphasis, repetition and unity.

**Video:** "The Principles of Design | FREE COURSE" (Envato Tuts+) https://www.youtube.com/watch?v=9EPTM91TBDU (~22 min)

**Task:** Make four 600×600 "sticker cards" using only circles, squares and triangles in 2 colors, one each for *Contrast*, *Balance*, *Repetition* and *Emphasis*. **Deliverable:** 4 frames.

**Quiz:**

1. A big star sits in the center with identical small stars mirrored on each side. What kind of balance? A) Asymmetrical B) Symmetrical C) Radial only D) None. **✅ B.**
2. Which layout balances *without* mirroring? A) One large dark shape on the left, several smaller shapes on the right B) Two identical shapes C) Everything centered D) One shape filling the canvas. **✅ A.**
3. One red shape among ten gray ones. Which principle creates the difference, and what does it produce? A) Repetition creates unity B) Contrast creates emphasis C) Balance creates rhythm D) Unity creates contrast. **✅ B.**
4. A tote covered in the same small icon at regular spacing uses… A) Emphasis B) Pattern/repetition C) Asymmetry D) Hierarchy. **✅ B.**
5. A 5-sticker pack uses a different random font and palette on each sticker. What's missing? A) Contrast B) Unity C) Emphasis D) Movement. **✅ B.**

   **Reward:** 🏅 *Rule Finder*.

#### Day 3: Color Magic

**Goal:** Build palettes with the color wheel; understand hue, saturation and value.

**Videos:**

1. "Color Theory Basics Explained (Design the PERFECT Color Palette!)" (Lindsay Marsh) https://www.youtube.com/watch?v=Zl1-GHVl9Sw (~15 min)
2. "Color Theory for Beginners | FREE COURSE" (Envato Tuts+) https://www.youtube.com/watch?v=2QTHs7QSR9o (first ~10 min)

**Task:** Save three palettes as Figma color styles: complementary, analogous and triadic. Recolor your Day 2 cards with your favorite. **Deliverable:** a "Palette Board" frame.

**Quiz:**

1. Which pair is complementary? A) Blue & orange B) Blue & green C) Red & orange D) Yellow & yellow-green. **✅ A.**
2. A dull blue and a vivid blue have the same hue. What differs? A) Value B) Saturation C) Temperature D) Hue. **✅ B.**
3. Why does an analogous palette feel calm? A) It uses opposite colors B) Its colors are neighbors on the wheel, so contrast is low C) It's black and white D) It uses neon. **✅ B.**
4. Yellow text on a white sticker is hard to read mainly because of… A) Low hue contrast B) Low *value* contrast C) Too much saturation D) Wrong font. **✅ B.**
5. Why let one color dominate and use its complement only as an accent? A) Printers need it B) Equal amounts of complements can "vibrate" and feel jarring C) Complements can't print D) It's required on tees. **✅ B.**

   **Reward:** 🏅 *Palette Keeper*, and Blot turns your main color.

#### Day 4: Type That Talks

**Goal:** Control font, size, letter spacing and line height.

**Video:** "Typography in Figma for Beginners (Text Tool, Fonts, and Spacing Explained)" https://www.youtube.com/watch?v=doCdDEANxKE (~10–15 min)

**Task:** Pick a phrase (your own, or "Stay Weird," "Quiet Power," "Night Owl"). Set it three ways: bold sans, serif and fun display. **Deliverable:** 3 "word sticker" frames.

**Quiz:**

1. Letter spacing (tracking) changes… A) Space between one pair of letters B) Space evenly across all selected letters C) Space between lines D) Weight. **✅ B.**
2. Line height controls… A) Letter width B) Vertical space between lines C) Color D) Box width. **✅ B.**
3. You type a long phrase in an auto-width text box. What happens? A) It wraps B) It keeps growing sideways on one line C) It shrinks D) It outlines. **✅ B.**
4. A serif font has… A) All caps B) Small "feet" at the ends of strokes C) A handwritten look D) Monospace letters. **✅ B.**
5. For a 2-inch sticker, which is safest? A) Thin script at 5 pt B) Bold sans-serif with open spacing, well above 6 pt C) Hairline serif D) Tiny caps. **✅ B.**

   **Reward:** 🏅 *Type Whisperer*.

#### Day 5: Where the Eye Goes (Hierarchy & Composition)

**Goal:** Build a design with a clear first, second and third read.

**Videos:**

1. "The ONLY Video On Visual Hierarchy ANY Graphic Designer Needs" (Satori Graphics) https://www.youtube.com/watch?v=4QNEDhrsRLo (~12 min)
2. "LESS Than 10% Of Designers Know This!" (Satori Graphics) https://www.youtube.com/watch?v=dGYCn9qYjUQ (~10 min)

**Task:** Design a circular "club badge" with 3 levels: icon, club name, small tagline. Then do a blur test on a copy to see what still stands out. **Deliverable:** badge plus blurred copy.

**Quiz:**

1. Visual hierarchy is… A) Layer order B) The order the eye notices elements C) Alphabetical font order D) Folder structure. **✅ B.**
2. Which is NOT a hierarchy tool? A) Size B) Contrast C) White space D) File format. **✅ D.**
3. Why blur or squint at a design? A) To test resolution B) To see what still stands out when detail disappears C) To add a style D) To check spelling. **✅ B.**
4. Everything is the same size and weight. The result? A) Strong focus B) No clear entry point C) Better unity D) Faster printing. **✅ B.**
5. A tee is seen from about 3 m away. The primary element should be… A) Tiny text B) Large, simple and high-contrast C) A photo gradient D) 1 inch wide. **✅ B.**

   **Reward:** 🏅 *Eye Guide*.

#### Day 6: Level 1 Boss: Your First Mini Poster

**Goal:** Combine the basics; learn pixel and DPI basics.

**Video:** "Figma Basics Tutorial for Beginners 2025. FREE Design Tool for Print on Demand." (The Shirtheads) https://www.youtube.com/watch?v=FgU0rTnWlRk (~15–20 min)

**Task:** Make a 1800×2400 poster frame and export it at 2× (3600×4800 = 12×16 in at 300 DPI). **Deliverable:** `Day06_poster@2x.png`.

**Quiz:**

1. Why use a transparent PNG for shirts? A) Smaller files B) Any background in the file gets printed on the garment C) PNGs are vector D) Stickers need it. **✅ B.**
2. Pixels for 12 in at 300 DPI? A) 1,200 B) 2,400 C) 3,600 D) 4,800. **✅ C.**
3. An 1800 px frame exported at 2× is… A) 900 B) 1,800 C) 3,600 D) 7,200 px wide. **✅ C.**
4. Which format supports transparency? A) JPG B) PNG C) Both D) Neither. **✅ B.**
5. Why do Figma shapes stay sharp when enlarged but a small photo doesn't? A) Figma sharpens photos B) Shapes are vectors (math), photos are pixels C) Photos are always blurry D) Export settings. **✅ B.**

   **Reward:** 🏆 **Level 1 complete.** Blot gets his color.

### LEVEL 2: THE VECTOR FORGE (Days 7–12)

#### Day 7: Taming the Pen Tool

**Video:** "Figma Tutorial: Pen Tool Basics & Vector Networks" (Figma) https://www.youtube.com/watch?v=5x2uHUB_pzw (~8–10 min)

**Task:** Draw a lightning bolt, a cloud, and a branching "sprout" with 3 leaves from one point. Fill the leaves separately with the paint bucket. **Deliverable:** 3 icons.

**Quiz:**

1. What makes vector networks unusual? A) They must always close B) One point can connect to more than two paths, so shapes can branch C) Straight lines only D) They're raster. **✅ B.**
2. Click-*drag* with the Pen tool makes… A) A corner B) A curve with bézier handles C) A frame D) Text. **✅ B.**
3. To close a path you… A) Press Enter twice B) Hover over the starting point and click C) Double-click empty canvas D) Use Union. **✅ B.**
4. To stop drawing and leave the path open, press… A) Delete B) Escape C) Shift D) Tab. **✅ B.**
5. How do you fill just one enclosed region? A) Fill the whole layer B) Paint bucket in vector edit mode C) Mask it D) Flatten first. **✅ B.**

   **Reward:** 🏅 *Path Tamer*.

#### Day 8: Cookie-Cutter Shapes (Boolean Operations)

**Videos:**

1. "Boolean Operations Figma tutorial" https://www.youtube.com/watch?v=P4vvf0KBhZM (~8 min)
2. "Boolean Groups - Figma Tutorial" https://www.youtube.com/watch?v=tdyQVg7tbfg (~6 min)

**Task:** Build a crescent moon, a cloud from 4 circles, a donut and a keyhole. Flatten a copy of the cloud. **Deliverable:** 4 icons plus the flattened copy.

**Quiz:**

1. For a crescent, the second circle goes ___ and you use ___. A) Below; Union B) On top, offset; Subtract C) On top; Intersect D) Below; Exclude. **✅ B.**
2. After Subtract, which layer's fill does the result use? A) Top B) Bottom C) Random D) Gray. **✅ B.**
3. After Union, which layer sets the fill? A) Top B) Bottom C) Largest D) None. **✅ A.**
4. Why keep a boolean unflattened while designing? A) It prints better B) It's non-destructive, so you can still move the cutter shape C) Flattening is impossible D) Plugins need it. **✅ B.**
5. Exclude keeps… A) Only the overlap B) Everything except the overlap C) The bottom shape D) Outlines. **✅ B.**

   **Reward:** 🏅 *Cookie Cutter*.

#### Day 9: Clone Power (Components)

**Videos:**

1. "Figma Tutorial: Components - The Basics" https://www.youtube.com/watch?v=k74IrUNaJVk (~8 min)
2. "Figma Components 101" (Figma) https://www.youtube.com/watch?v=EoJolbaEQi8 (~10 min)

**Task:** Make "Blot's eye" a component and place 3 recolored instances. Edit the main component and watch the instances update. Bonus: make open and closed variants. **Deliverable:** component plus 3 instances.

**Quiz:**

1. You edit the main component. Instances… A) Stay the same B) Update, except for overrides C) Delete D) Detach. **✅ B.**
2. An instance was recolored, then the main component's shape changes. The instance… A) Loses its color B) Keeps its color and gets the new shape C) Does nothing D) Breaks. **✅ B.**
3. "Detach instance" means… A) Deleted B) No longer linked to the main component C) It becomes the main D) Locked. **✅ B.**
4. Why are components great for a 10-sticker pack? A) Smaller files B) One shared element updates everywhere at once C) Printers require them D) They add bleed. **✅ B.**
5. Eye open and eye closed belong together as… A) Groups B) Variants in a component set C) Pages D) Styles. **✅ B.**

   **Reward:** 🏅 *Clone Master*.

#### Day 10: Shape Shifter (Auto Layout)

**Videos:**

1. "Figma in 5: Auto Layout" (Figma) https://www.youtube.com/watch?v=TyaGpGDFczw (~5 min)
2. "Figma for Education: Learning Auto layout" (Figma) https://www.youtube.com/watch?v=PGYCZbP3xH4 (~10 min)

**Task:** Build a hang tag that grows with its text, and a 3×2 sticker grid that reflows when you add a sticker. **Deliverable:** tag plus grid.

**Quiz:**

1. "Hug contents" means… A) Fixed size B) The frame fits its children C) Fills its parent D) Clips. **✅ B.**
2. Padding vs gap? A) Same thing B) Padding is inside the frame edge; gap is between items C) Gap is outside the frame D) Padding is vertical only. **✅ B.**
3. You add a 4th item to a horizontal auto layout. What happens? A) Overlap B) Items shift automatically C) It breaks D) Nothing. **✅ B.**
4. A name / price / size stack uses which direction? A) Horizontal B) Vertical C) Wrap D) Absolute. **✅ B.**
5. A badge should widen with its name. Set horizontal sizing to… A) Fixed B) Hug C) Fill D) Scale. **✅ B.**

   **Reward:** 🏅 *Shape Shifter*.

#### Day 11: Plugins & the Community Treasure Chest

**Video:** "How to use Plugins in Figma" https://www.youtube.com/watch?v=ZEOdvJSkcmM (~8–10 min; contains a course promotion)

**Task:** Run a palette plugin on your Day 3 colors. Duplicate the Community file "Bonfire T-Shirt Mockup Generator." Optionally try "Print for Figma" to make a 3×3 in page with bleed. **Deliverable:** screenshot plus duplicated file.

**Quiz:**

1. Before installing a plugin, check… A) Nothing B) Who made it and what it can access C) Its color D) File size. **✅ B.**
2. Duplicating a Community file… A) Edits the original B) Creates your own copy C) Deletes it D) Costs money. **✅ B.**
3. Figma natively designs in… A) CMYK B) RGB C) Pantone D) Grayscale. **✅ B.**
4. Print for Figma's bleed option adds… A) 0.5 in of white B) 0.125 in of bleed C) A watermark D) A cut line only. **✅ B.**
5. When using a Community mockup, you should still… A) Sell the template B) Check its license and credit it if asked C) Remove the author's name D) Ignore licenses. **✅ B.**

   **Reward:** 🏅 *Treasure Hunter*.

#### Day 12: Export Ninja

**Videos:**

1. "How to Export Figma to JPG, PNG, SVG & PDF" https://www.youtube.com/watch?v=w0SDoyvywbo (~6 min)
2. "Figma Basics: How To EXPORT Your Projects" https://www.youtube.com/watch?v=FLCyHiolSVU (~6 min)

**Task:** Export the moon as SVG, PNG@3x and PDF. Remove the frame fill and confirm the PNG is transparent. **Deliverable:** a "Print Ready" folder.

**Quiz:**

1. What does a pin factory want? A) JPG B) SVG or PDF (vector) C) GIF D) Screenshot. **✅ B.**
2. What does a Printful DTG shirt want? A) Transparent PNG B) PPTX C) White-background JPG D) HTML. **✅ A.**
3. Why do SVG and PDF export only at 1×? A) Bug B) They're vector, so scale doesn't matter C) To save money D) Printers demand it. **✅ B.**
4. A white box appears around your PNG. Cause? A) Font B) The frame still has a white fill C) DPI D) Boolean error. **✅ B.**
5. You export one small selected layer. The file is… A) The whole page B) Just that layer's bounds C) Blank D) The whole frame. **✅ B.**

   **Reward:** 🏆 **Level 2 complete.** Badge *Export Ninja*.

### LEVEL 3: THE AI SIDEKICK NOOK (Days 13–15)

#### Day 13: Meet Claude Design

**Videos:**

1. "Introducing Claude Design by Anthropic Labs" https://www.youtube.com/watch?v=t_LBECIQQqs (~2–4 min)
2. "Claude Design Tutorial for Beginners: Make Pro Docs and Slides" https://www.youtube.com/watch?v=e55YEhUBATw (~15 min)

**Task:** Write a prompt with the template *Subject + Style + 3 Colors + Mood + Format*. Example: "A one-page mood board for a shy night-owl monster mascot, flat cartoon style, navy/mustard/pink, cozy and funny, 6 variations." Type it into Claude Design and pick a favorite out of 3. **Deliverable:** PDF of the mood board.

**Quiz:**

1. Which model powered Claude Design at launch? A) Claude Haiku B) Claude Opus 4.7 C) GPT-4 D) Gemini. **✅ B.**
2. Which is NOT a way to refine a Claude Design output? A) Conversation B) Inline comments C) Custom sliders D) A Photoshop plugin. **✅ D.**
3. Which export does Claude Design NOT offer? A) PDF B) PPTX C) Canva D) A native Figma .fig file. **✅ D.**
4. Why does Claude Design output need rebuilding in Figma for print? A) It's ugly B) It exports PDF/PPTX/HTML/Canva, not print-ready SVG or 300-PPI PNG C) Figma is AI D) Printers ban AI. **✅ B.**
5. The most usable merch prompt? A) "Make something cool" B) "Sticker" C) "A die-cut sticker of a sleepy owl, thick outlines, 3 flat colors (navy, mustard, pink), readable at 3 inches" D) "Do art." **✅ C.**

   **Reward:** 🏅 *Prompt Captain*, and Blot meets his robot friend.

#### Day 14: Iterate Like a Pro (and Move Ideas into Figma)

**Videos:**

1. "Claude Design: The Complete Guide" https://www.youtube.com/watch?v=eXlSgQmz02E (~15–20 min)
2. "Claude Design Tutorial for Beginners | Master 99% in under 20 Minutes" https://www.youtube.com/watch?v=ii9MJCBHqjM (first ~8 min)

**Task:** Do 3 rounds of iteration: an inline comment, a slider or color tweak, then "3 simpler versions for a 2-inch sticker." Place the result in Figma as a locked 50%-opacity reference and trace it with the Pen tool. **Deliverable:** traced vector outline.

**Quiz:**

1. You only want to change the hat color. Best move? A) A new prompt B) An inline comment on the hat C) Export to PPTX D) Delete the design. **✅ B.**
2. What is "Handoff to Claude Code" for? A) Printing stickers B) Turning a design into a working coded product C) T-shirts D) Adding bleed. **✅ B.**
3. Best iteration habit? A) Change everything each round B) Change one thing at a time C) Never iterate D) Only use sliders. **✅ B.**
4. Claude Design usage counts against plan limits, so… A) Spam prompts B) Plan a clear prompt before sending C) Use it for chatting D) Never export. **✅ B.**
5. Why trace the AI idea yourself? A) It's required B) You get clean vectors and the design becomes truly yours C) It's faster than exporting D) The AI asks you to. **✅ B.**

   **Reward:** 🏅 *Iteration Engine*.

#### Day 15: Designing a Mascot for Merch

**Video:** "Create illustrated stickers with Figma | Draw Lolo with us" (LottieFiles) https://www.youtube.com/watch?v=qu8NCUxajZ0 (~20–30 min; key parts)

**Task:** Rebuild the mascot from basic shapes and booleans. Make the eyes and mouth components, and create happy and sleepy variants. **Deliverable:** mascot in 2 moods.

**Quiz:**

1. What's the first step for a merch character? A) Tiny details B) Big basic shapes, then refine C) Gradients D) Shadows. **✅ B.**
2. Fastest way to make two moods? A) Redraw everything B) Swap eye and mouth components or variants C) Change the font D) A new file. **✅ B.**
3. The silhouette test checks… A) Color B) Whether the shape is recognizable at a glance C) DPI D) Bleed. **✅ B.**
4. Why thick, consistent outlines? A) Style only B) They survive small sizes and cutting C) Printers require black D) Smaller files. **✅ B.**
5. Line weights across a set should be… A) Random B) Consistent C) Thinner each time D) Irrelevant. **✅ B.**

   **Reward:** 🏆 **Level 3 complete.** Badge *Character Creator*.

### LEVEL 4: THE STICKER LAB (Days 16–20)

#### Day 16: Die-Cut vs Kiss-Cut

**Videos:**

1. "Die cut vs. Kiss cut stickers" (Sticker Mule) https://www.youtube.com/watch?v=vjblLJPQykI (~1–2 min)
2. "Kiss Cut vs Die Cut Stickers – What's the Difference?" https://www.youtube.com/watch?v=gM9AoEJqBgQ (~5 min)

**Task:** Give the mascot a thick white outside stroke, then Outline Stroke → Union → Flatten. Add a 0.5 pt magenta cut line. Make a kiss-cut version too. **Deliverable:** 2 artboards.

**Quiz:**

1. A die-cut sticker is cut… A) Through the vinyl only B) Through vinyl *and* backing, to the design's shape C) As a square D) Not at all. **✅ B.**
2. A kiss-cut sticker's backing… A) Matches the shape B) Stays a larger shape and can be printed on C) Is clear D) Has no adhesive. **✅ B.**
3. A thin antenna pokes out of the design. For die-cut you… A) Leave it B) Thicken it or enclose it in the border C) Make it thinner D) Add a gradient. **✅ B.**
4. Sticker Mule's cut-line indicator? A) 5 pt black B) 0.05–1 pt magenta stroke C) Dotted blue D) A text label. **✅ B.**
5. The cleanest border path in Figma comes from… A) Screenshot B) Outline stroke → Union → Flatten C) Mask D) Blur. **✅ B.**

   **Reward:** 🏅 *Cut Line Pro*.

#### Day 17: Bleed, White Borders & Safe Zones

**Videos:**

1. "How to add a white sticker outline to a design in Procreate" https://www.youtube.com/watch?v=s2hz5Va1sz4 (~5–8 min; the idea transfers to Figma)
2. "HOW TO OUTLINE STICKERS BY ADDING A WHITE BORDER" https://www.youtube.com/watch?v=bNqJMDof-eA (~8 min)

**Task:** Make a 3×3 in full-color sticker on a 975×975 px canvas. Add guides for the trim (37.5 px in) and the safe zone (75 px in). **Deliverable:** full-bleed file.

**Quiz:**

1. Why add bleed? A) Bigger sticker B) Cutting drift would otherwise leave a white sliver at the edge C) Printer logo D) Thicker vinyl. **✅ B.**
2. A 3×4 in sticker with 1/8 in bleed needs a canvas of… A) 3×4 B) 3.125×4.125 C) 3.25×4.25 D) 3.5×4.5 in. **✅ C.**
3. Sticker Mule says text… A) Can go full-bleed B) Can't be printed full-bleed C) Must be red D) Must be 1 pt. **✅ B.**
4. Minimums? A) 2 pt font, 0.1 pt line B) 6 pt font, 1 pt line C) 12 pt, 5 pt D) None. **✅ B.**
5. Minimum raster resolution for stickers? A) 72 B) 150 C) 300 D) 600 PPI. **✅ C.**

   **Reward:** 🏅 *Bleed Guard*.

#### Day 18: Holographic & Special Finishes

**Videos:**

1. "Holographic Stickers – Sticker Mule" https://www.youtube.com/watch?v=wS24KZon9Io (~1–2 min)
2. "Zap Creatives Iridescent stickers vs Stickermule holographic stickers comparison review" https://www.youtube.com/watch?v=apzxZx1JGZ8 (~8–10 min)

**Task:** Make a holo-friendly sticker. Leave open areas where the vinyl shows through, and give text strong outlines. Add a "HOLO ZONES" note layer. **Deliverable:** holo sticker.

**Quiz:**

1. The holo rainbow… A) Is printed ink B) Changes with light and viewing angle C) Only shows in the dark D) Is a gradient in the file. **✅ B.**
2. Which design shows off holo most? A) Solid dark ink everywhere B) Light or open areas C) Photo backgrounds D) Tiny text. **✅ B.**
3. Why compare finishes? A) Same cost B) They look different, so one may fit the theme better C) Iridescent is paper D) No reason. **✅ B.**
4. Text over holo should… A) Be thin B) Have a strong outline or contrast C) Be pastel D) Be tiny. **✅ B.**
5. Before sending a holo file you… A) Guess B) Check that printer's file instructions C) Use JPG D) Skip the proof. **✅ B.**

   **Reward:** 🏅 *Holo Hunter*.

#### Day 19: AI-Brainstormed Sticker Sheet

**Videos:**

1. "Claude Design is Insanely Easy (even for beginners)" https://www.youtube.com/watch?v=VeWf0l4ci6Y (~12 min; contains promos)
2. "A Complete Guide to the New Claude Design" (Futurepedia) https://www.youtube.com/watch?v=3RWm4inkS2E (first ~8 min)

**Task:** Ask Claude Design for "6 sticker concepts for a 'Night Owl Club' set featuring [mascot], same 3-color palette, bold outlines." Pick 3, build them in Figma with components, and lay them out on a 5×7 in kiss-cut sheet with auto layout. **Deliverable:** sticker sheet.

**Quiz:**

1. Why ask for 6 concepts but build only 3? A) Laziness B) Explore widely, then choose, so you keep creative control C) Printer limits D) Required. **✅ B.**
2. How do you keep a set unified? A) New palette each time B) Shared palette, line weight and mascot components C) Random fonts D) Different sizes. **✅ B.**
3. Which tool makes the sheet reflow? A) Boolean B) Auto layout C) Pen D) Mask. **✅ B.**
4. Kiss-cut suits sheets because… A) Each sticker is cut through the backing B) Stickers peel from one shared backing C) Cheaper vinyl D) No cut line needed. **✅ B.**
5. An AI concept has a thin spiky outline. Before building it for print you… A) Keep it B) Simplify and thicken it so it survives printing and cutting C) Add a gradient D) Shrink it. **✅ B.**

   **Reward:** 🏅 *Set Builder*.

#### Day 20: Level 4 Boss: The Print-Ready Sticker Pack

**Video:** "Ultimate Cricut Sticker Guide from Start to Finish" https://www.youtube.com/watch?v=ygrHVHDjeRE (~20 min; file-setup parts)

**Task:** Finish 5 stickers (die-cut, kiss-cut, holo) and check each against the list: 300 PPI ✔, 1/8 in bleed ✔, safe zone ✔, ≥6 pt text ✔, ≥1 pt lines ✔, magenta cut line ✔. **Deliverable:** a "StickerPack_v1" folder.

**Quiz:**

1. The most print-ready set is… A) Screenshots B) Vector PDF plus 300-PPI PNGs with bleed and cut lines C) 72-DPI JPG D) PPTX. **✅ B.**
2. A 1-in 300-PPI PNG scaled to 3 in becomes… A) 300 B) 900 C) 100 D) 150 PPI. **✅ C.**
3. Cut line color? A) Your main color B) A spot color like magenta that isn't in the art C) White D) Black. **✅ B.**
4. Gradients are fine on… A) Printed vinyl stickers B) Enamel pins C) Screen-print tees D) Embroidery. **✅ A.**
5. Converting text to outlines… A) Is pointless B) Avoids font problems at the printer C) Adds bleed D) Lowers DPI. **✅ B.**

   **Reward:** 🏆 **Level 4 complete.** Blot wears her sticker. Order a small real sticker run as a trophy.

### LEVEL 5: THE THREAD LOFT (Days 21–25)

#### Day 21: T-Shirt Anatomy & Pixel Math

**Videos:**

1. "Designing and printing my own T-shirts (24 Hr Challenge)" (Will Paterson) https://www.youtube.com/watch?v=a1aNTnnocTo (~15 min)
2. "How to Design T-Shirt in Printify [2026 Full Guide]" https://www.youtube.com/watch?v=JQj_inE7yQU (first ~8 min)

**Task:** Make a front print frame of 1800×2400 and export at 2×, plus a 4×4 in chest print at 1200×1200. Use transparent backgrounds. **Deliverable:** 2 PNGs.

**Quiz:**

1. Printful's standard front print area? A) 8×10 B) 12×16 in C) 20×30 D) 5×5. **✅ B.**
2. Minimum DTG resolution? A) 72 B) 150 C) 600 D) 1,000 DPI. **✅ B.**
3. Printful's color profile? A) CMYK B) sRGB C) Pantone D) Grayscale. **✅ B.**
4. A 4×4 in print at 300 DPI is… A) 400 px B) 1,200×1,200 px C) 3,000 px D) 300 px. **✅ B.**
5. A black background on a black tee prints as… A) Invisible B) A grayish rectangle C) Perfect D) Shiny. **✅ B.**

   **Reward:** 🏅 *Pixel Math Wizard*.

#### Day 22: DTG vs DTF vs Screen Printing

**Video:** "DTG vs DTF: Closer Look at Printful's Premium DTFlex Method" (Printful) https://www.youtube.com/watch?v=Sc_Xm1cBxbY (~6–10 min)

**Task:** Make a full-color DTG version and a 3-spot-color screen-print version. **Deliverable:** 2 versions.

**Quiz:**

1. DTG is best for… A) Huge 1-color runs B) Small runs of full-color, detailed designs C) Embroidery D) Metal. **✅ B.**
2. Screen printing is best for… A) One-off photos B) Bulk runs of simple, few-color designs C) Phone cases D) Stickers. **✅ B.**
3. Why limit colors for screen printing? A) Style B) Each color usually needs its own screen C) Colorblind printers D) No reason. **✅ B.**
4. DTF prints… A) Directly on fabric B) On a film that's heat-transferred to the garment C) Embroidery D) Sublimation. **✅ B.**
5. The screen version should avoid… A) Flat shapes B) Gradients and soft shadows C) Bold text D) Outlines. **✅ B.**

   **Reward:** 🏅 *Ink Master*.

#### Day 23: Mockups That Sell the Idea

**Videos:**

1. "How to Make a T-Shirt Mockup in Photoshop" (Printful) https://www.youtube.com/watch?v=aiihQyIaPto (~10 min)
2. "T-Shirt Mockup Design || Figma Photopea Tutorial" https://www.youtube.com/watch?v=4ZBYb23ngoM (~8 min)

**Task:** Place the tee art on 3 shirt colors in the Bonfire mockup file. Try Multiply blend mode. **Deliverable:** mockup board.

**Quiz:**

1. You send the printer… A) The mockup B) The separate transparent print file C) A screenshot D) A PDF mockup. **✅ B.**
2. Multiply on a light shirt… A) Brightens B) Lets fabric folds and shadows show through C) Adds bleed D) Converts to CMYK. **✅ B.**
3. Why test 3 shirt colors? A) Required B) The same art reads well or badly depending on garment contrast C) Cheaper D) DPI. **✅ B.**
4. A dark design on navy fails because of… A) Low value contrast B) Resolution C) File type D) Bleed. **✅ A.**
5. Mockup photos from the internet… A) Are free B) May be copyrighted, so use licensed or Community mockups C) Are print files D) Need bleed. **✅ B.**

   **Reward:** 🏅 *Showroom Star*.

#### Day 24: Hoodies, Hats & Embroidery

**Videos:**

1. "Do This, Not That: Printful Embroidery Tutorial for Beginners!" https://www.youtube.com/watch?v=vv6gbW4tJ0A (~10 min)
2. "How to Create Embroidery Designs with Printful's Design Maker" https://www.youtube.com/watch?v=OIE2cjfPJGs (~8 min)

**Task:** Make an embroidery hat version (≤6 flat colors, text ≥0.25 in, lines ≥0.05 in), and plan a hoodie with a chest logo and a back print. **Deliverable:** hat file plus hoodie layout.

**Quiz:**

1. Minimum embroidered text height? A) 0.05 B) 0.25 in C) 1 D) 2. **✅ B.**
2. Minimum line thickness? A) 0.001 B) 0.05 in C) 0.5 D) 1. **✅ B.**
3. Why do gradients fail in embroidery? A) Thread is solid color B) Too cheap C) Too shiny D) They don't fail. **✅ A.**
4. A tiny tagline in embroidery will… A) Stitch perfectly B) Blur or fill in, so remove or enlarge it C) Glow D) Turn into a gradient. **✅ B.**
5. A good hoodie plan is… A) One huge chest print B) Small chest logo plus a larger back design, separate files C) One file stretched everywhere D) No plan. **✅ B.**

   **Reward:** 🏅 *Thread Head*.

#### Day 25: All-Over Print Patterns

**Videos:**

1. "How to Design All-Over Print Apparel | Printful Tutorial 2026" https://www.youtube.com/watch?v=ZLHl0KQpSEM (~12 min)
2. "Create All-Over Print Pattern Designs for Free" (Printful) https://www.youtube.com/watch?v=H8iYo08qDeE (~8 min)

**Task:** Make a 1000×1000 seamless tile, with edge-crossing icons copied to the opposite edge. Preview it 3×3 and export JPG. **Deliverable:** tile plus preview.

**Quiz:**

1. "Seamless" means… A) No outlines B) Anything cut at one edge continues on the opposite edge C) One color D) Random placement. **✅ B.**
2. Format for all-over print? A) PNG only B) JPG C) SVG D) PPTX. **✅ B.**
3. Why do templates include seam areas? A) Decoration B) The design wraps across panels, so art must extend past cut edges C) Embroidery D) Bleed-free. **✅ B.**
4. A visible stripe every tile means… A) DPI B) Edge elements weren't copied exactly to the opposite side C) Font D) Color mode. **✅ B.**
5. Patterns rely on… A) Repetition and consistent spacing B) One giant focal point C) Tiny text D) Photos. **✅ A.**

   **Reward:** 🏆 **Level 5 complete.** Badge *Pattern Weaver*; Blot wears her tee.

### LEVEL 6: THE METAL & STITCH WORKSHOP (Days 26–28)

#### Day 26: Enamel Pins

**Videos:**

1. "[PIN MAKING 101] How To Design Enamel Pins ~ Part 1!" https://www.youtube.com/watch?v=xDn6iEXP_2o (~10 min)
2. "The Ultimate Guide to Creating Custom Enamel Pins" https://www.youtube.com/watch?v=-AxpA48Bezk (~10–15 min)

**Task:** Design a 1.25 in pin with metal-line outlines, ≤5 flat colors, no gradients and text ≥5 pt. Export SVG plus PDF. **Deliverable:** pin vector.

**Quiz:**

1. Pin colors must be… A) Blended B) Separated by raised metal lines C) Gradients D) Printed. **✅ B.**
2. Minimum metal line? A) 0.02 mm B) 0.2 mm C) 2 mm D) 5 mm. **✅ B.**
3. For a sunset gradient you'd use… A) Hard enamel B) A printed pin, or flat bands C) A soft enamel gradient D) Embroidery. **✅ B.**
4. Soft vs hard enamel? A) Soft is smooth and polished B) Soft has recessed enamel with raised metal you can feel; hard is flat and polished C) Same D) Hard is cheaper. **✅ B.**
5. A beginner pin size is… A) 0.25 in B) About 1–1.5 in C) 6 in D) 12 in. **✅ B.**

   **Reward:** 🏅 *Metal Liner*.

#### Day 27: Patches & Keychains

**Video:** "How to Make Custom Embroidered Patches! What You Need to Know" https://www.youtube.com/watch?v=40QnBG07Flc (~10 min)

**Task:** Make a 3 in round patch (bold shapes, ≤6 thread colors, thick border) and an acrylic keychain (white border, cut line, hole tab). **Deliverable:** 2 files.

**Quiz:**

1. Why does AI art often fail as a patch? A) Too simple B) Fine textures, gradients and tiny details can't be stitched C) It's vector D) Too small. **✅ B.**
2. The fix? A) Upscale B) Redraw as bold, flat shapes with few colors C) Add noise D) Add a gradient. **✅ B.**
3. The patch border should be… A) Hairline B) Thick and simple C) Dotted D) Missing. **✅ B.**
4. A keychain file needs… A) A mockup only B) Art, a cut line and a hole or tab area C) PPTX D) A gradient. **✅ B.**
5. Which uses thread? A) Pin B) Patch C) Both D) Neither. **✅ B.**

   **Reward:** 🏅 *Stitch Smith*.

#### Day 28: Phone Cases, Mugs, Totes & Packaging

**Videos:**

1. "Easy Custom Phone Case Tutorial (Printify)" https://www.youtube.com/watch?v=ZJVivm48UEo (~6 min)
2. "Mug Design Tutorial - Printify Mug Tutorial 11oz & 15oz" https://www.youtube.com/watch?v=ZW9dsdcWZ5U (~8 min)
3. "How to Create a Custom Tote Bag (Printify)" https://www.youtube.com/watch?v=EKjylNTRVAY (~6 min)

**Task:** Make a phone case (300 DPI, camera area clear), a mug wrap (away from the handle), a tote front and a sticker backing card. **Deliverable:** 4 files.

**Quiz:**

1. Phone case resolution? A) 72 B) 150 C) 300 D) 30 DPI. **✅ C.**
2. On a phone case, keep art away from… A) The center B) The camera cutout and curved edges C) The bottom D) Nowhere. **✅ B.**
3. A mug design is… A) Tall and narrow B) Wide and horizontal C) Circular D) Square. **✅ B.**
4. Why check 11oz and 15oz separately? A) Same template B) Different print areas C) Colors D) No reason. **✅ B.**
5. Packaging should… A) Hide the brand B) Match the collection's palette and mascot C) Be random D) Be black. **✅ B.**

   **Reward:** 🏆 **Level 6 complete.** Blot wears her pin and patch.

### LEVEL 7: THE LAUNCH WINDOW (Days 29–30)

#### Day 29: Collection Board & Portfolio

**Video:** "How to Actually Use Claude Design Like a Pro" https://www.youtube.com/watch?v=3ZBY7oVZpuM (~15 min)

**Task:** Build a Figma "Collection Board" (palette, mascot, stickers, tee, hat, pin, patch, case, mug). Then have Claude Design turn it into a one-page lookbook and export it as a PDF. **Deliverable:** board plus lookbook.

**Quiz:**

1. A strong portfolio shows… A) Everything B) Your best, most cohesive pieces plus a bit of process C) Only sketches D) Only AI output. **✅ B.**
2. What's safest to share publicly? A) Your home address B) A pen name and your designs C) Your phone number D) Your school schedule. **✅ B.**
3. What makes a collection a "line"? A) Different styles B) Shared palette, mascot, line weight and theme C) Different fonts D) Random products. **✅ B.**
4. Why include process shots? A) Filler B) They show real skill and ownership beyond AI output C) Printers need them D) DPI. **✅ B.**
5. The lookbook is best exported as… A) An SVG print file B) A PDF to show people C) A pin file D) An embroidery file. **✅ B.**

   **Reward:** 🏅 *Collection Curator*.

#### Day 30: Capstone Boss: Launch Your Merch Line

**Video:** "Color Theory for Digital Artists & Beginners" https://www.youtube.com/watch?v=5m4YjFFHxRo (~10–15 min)

**Task:** Final pass on the whole line: 3 stickers, 1 tee (DTG plus a 3-color version), 1 pin, 1 patch or hat, 1 extra product, mockups, and a "PRINT_READY" folder. She chooses the theme. Finish with a family launch night. **Deliverable:** the complete folder plus a 3-slide presentation.

**Quiz:**

1. Which file goes to which vendor? A) SVG to the tee, PNG to the pin maker B) Transparent sRGB PNG to the Printful tee; vector to the pin maker; vector PDF or 300-PPI PNG with cut line to the sticker printer C) Mockups to all D) PPTX to all. **✅ B.**
2. 1200×1600 px art at 12×16 in is… A) 300 B) 150 C) 100 D) 72 DPI. **✅ C.** That's below the 150 minimum.
3. One color harmony across the line supports… A) Contrast B) Unity C) Bleed D) Resolution. **✅ B.**
4. The mascot is full color on stickers but 5 flat colors on the pin. That's… A) Inconsistency B) Adapting to production limits while keeping identity C) A mistake D) Illegal. **✅ B.**
5. Claude Design's best role was… A) Final print files B) Exploring, mood boards and presentation, while Figma made the production files C) Embroidery digitizing D) Ordering. **✅ B.**

   **Reward:** 🏆 **"Launch Legend."** The studio lights up. Order one real product as a trophy.

## Recommendations

1. **Pass mark 4/5, unlimited retries, always.** For an anxious learner, turn on "open-video mode" so the video stays visible during the quiz.
2. **Reward independence on purpose:** *Solo Flight* and *Own Idea* should be worth the most XP.
3. **One real print is worth 100 badges.** Order a small sticker run after Day 20 and a tee or pin after Day 30.
4. **Go at her pace.** If a day takes two sessions, that's fine. Rain Day shields exist for exactly this.

## Caveats

- Video lengths and some channel names couldn't be confirmed. Preview every video, especially ones with sponsor or course pitches.
- Quizzes are based on each video's topic and on official specs, not full transcripts. Adjust any question a video doesn't cover.
- Printers disagree on some specs (bleed, CMYK vs RGB). Always follow the specific printer's file guidelines.
- Claude Design is in research preview, so features may change.
