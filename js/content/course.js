// Night Studio: the course's fixed rules and texts. The 30 days themselves are in days.js.
// Everything here comes from docs/research.md unless a comment says otherwise. Change numbers freely: XP and badges are
// calculated from her progress every time, so a change applies to everything she has already done.
// Everything is bundled into COURSE at the bottom: the "course pack" the game engine runs (index.html starts it).

import { DAYS } from "./days.js";

// Correct answers (out of 5) needed to pass a day's quiz. Retries are unlimited.
export const PASS = 4;

// XP for each thing she does. The two secret badges are worth the most, on purpose (research: reward independence).
export const XP = { video: 10, task: 40, quiz: 30, perfect: 10, twist: 15, soloFlight: 50, ownIdea: 50 };

// How many "I added my own twist" ticks earn the Own Idea badge.
export const OWN_IDEA_TWISTS = 3;

// The 7 studio rooms (the research's levels) and the gift each one gives when its last day is done.
// gift.kind: "star" = she picks the colour of Lumi's star; "trick" = Lumi learns a move she can play by tapping it;
// "wear" = she picks which of her designs Lumi wears (slots are in js/lumi/art.js); "lights" = the studio lights up.
export const ROOMS = [
  {
    n: 1, name: "The Sketch Lamp", first: 1, last: 6, icon: "🪔",
    blurb: "Find your way around Figma: shapes, color, type and your first export.",
    gift: { kind: "star", title: "Lumi's star takes your color", text: "Pick the color of Lumi's star. It stays that way." },
  },
  {
    n: 2, name: "The Vector Forge", first: 7, last: 12, icon: "⚒️",
    blurb: "Pen tool, cookie-cutter shapes, components, auto layout and export.",
    gift: { kind: "trick", trick: "spin", title: "Lumi learned to spin", text: "Tap Lumi any time to see it spin." },
  },
  {
    n: 3, name: "The AI Sidekick Nook", first: 13, last: 15, icon: "🤖",
    blurb: "Brainstorm with Claude Design, then build your mascot by hand in Figma.",
    gift: { kind: "trick", trick: "fly", title: "Lumi learned to fly", text: "Tap Lumi to see it fly around its corner." },
  },
  {
    n: 4, name: "The Sticker Lab", first: 16, last: 20, icon: "🧪",
    blurb: "Die-cut, kiss-cut, bleed, holo, and a print-ready sticker pack.",
    gift: { kind: "wear", slots: ["belly"], title: "Lumi wears your sticker", text: "Pick the design Lumi wears on its tummy." },
  },
  {
    n: 5, name: "The Thread Loft", first: 21, last: 25, icon: "🧵",
    blurb: "T-shirts, printing methods, mockups, embroidery and patterns.",
    gift: { kind: "wear", slots: ["belly"], trick: "dance", title: "Lumi wears your tee print (and learned to dance)", text: "Pick the print Lumi wears." },
  },
  {
    n: 6, name: "The Metal & Stitch Workshop", first: 26, last: 28, icon: "📌",
    blurb: "Enamel pins, patches, keychains, cases, mugs and totes.",
    gift: { kind: "wear", slots: ["pin", "patch"], title: "Lumi wears your pin and patch", text: "Pick a design for each." },
  },
  {
    n: 7, name: "The Launch Window", first: 29, last: 30, icon: "🚀",
    blurb: "Your collection, your lookbook, your launch night.",
    gift: { kind: "lights", title: "The studio lights up", text: "Your whole collection is on the wall. Dress Lumi any way you like." },
  },
];

// Badges that aren't tied to a day. They stay hidden ("???") on her shelf until she earns them.
export const SECRET_BADGES = [
  { id: "solo-flight", name: "Solo Flight", icon: "🕊️", how: "Finished a task all by yourself." },
  { id: "own-idea", name: "Own Idea", icon: "💡", how: "Added your own twist three times." },
];

// What Lumi may say: 1–3 words, warm, never an answer or an order. {name} = her pen name.
export const LUMI_WORDS = {
  hello: ["Hi, {name}!", "Hello again!", "Hi there!"],
  missed: ["Missed you!", "Welcome back!"],
  firstWake: ["Oh! Hi!", "Good evening!"],
  flavor: ["Ooh!", "Nice pick!", "Love that!"],
  watched: ["Nice!", "Got it!", "Good one!"],
  upload: ["Wow!", "You made this!", "So cool!"],
  checkin: ["Thanks!", "Noted!"],
  twist: ["Your idea!", "Love it!"],
  right: ["Yes!", "Right!", "Exactly!"],
  wrong: ["Almost!", "Close one!", "Hmm…"],
  pass: ["You did it!", "Brilliant!", "Nailed it!"],
  retry: ["Again?", "One more?"],
  gift: ["For you!", "Ta-da!"],
  bye: ["See you!", "Sleep well!", "Night night!"],
};

// The grown-ups page: the research's parent playbook and recommendations, in its own words where possible.
export const PLAYBOOK = [
  ["Co-pilot, not judge", "Sit beside her for the first 5 minutes, then move to “nearby.” Ask “Which of these two do you like?” rather than “What do you want to make?” Open-ended prompts can freeze a reluctant learner; 2–3 choices give autonomy without overwhelm."],
  ["Praise the process, specifically", "“You kept the text inside the safe zone,” not “You're so talented.”"],
  ["Show work safely", "Her gallery stays private in this browser. Hold a family “gallery night” with Show Family, and order one real print as a capstone reward. Share online only if she wants to, with a pen name."],
  ["Plugins and Community files", "Check who made a plugin before installing it. Duplicating a Community file makes her own copy."],
  ["Original characters only", "No fan art of brands or characters for anything that might be sold."],
  ["Claude Design is a work tool", "Open it for the design task and close it when done. Claude's consumer plans are for adults (18+), so on Days 13, 14, 19, 29 and 30 you drive the keyboard while she decides what to type and which result to keep."],
  ["Go at her pace", "If a day takes two sessions, that's fine. Days unlock as soon as she finishes, and her lanterns never go out."],
  ["One real print is worth 100 badges", "Order a small sticker run after Day 20, and a tee or pin after Day 30."],
];

// Things to set up once, before Day 1 (added for the game).
export const SETUP = [
  "A free Figma account (the Starter plan is enough) on this computer.",
  "Bookmark this page in Chrome. Don't use an Incognito or Guest window: they forget her progress.",
  "Headphones, so she can watch the videos in her own bubble.",
  "Your Claude account with Claude Design for Days 13, 14, 19, 29 and 30 (you drive, she directs).",
  "Preview the videos (list below) and skim the day texts once.",
];

// The research's print-spec cheat sheet.
export const CHEAT_SHEET = [
  ["Pixel math", "pixels = inches × DPI. 12 in × 300 DPI = 3,600 px. A 12×16 in print at 300 DPI needs 3,600 × 4,800 px. Design at 1× in Figma and export at 2× or 3×."],
  ["Stickers (Sticker Mule)", "Vector or ≥300 PPI. Cut line as a 0.05–1 pt magenta stroke. 1/8 in (0.125 in) bleed. Minimum font 6 pt, minimum line 1 pt. CMYK recommended. Text can't be printed full-bleed."],
  ["Stickers (general)", "A 3×4 in sticker with 1/8 in bleed needs a 3.25×4.25 in canvas. Keep key detail about 1/8 in inside the cut line."],
  ["T-shirts (Printful)", "Transparent PNG, sRGB, minimum 150 DPI, best not above 300 DPI. Front print area up to 12×16 in. A black background on a black shirt prints as a grayish rectangle. JPG works better for all-over print."],
  ["CMYK vs RGB", "Figma is RGB. Printful apparel asks for sRGB; sticker and paper printers prefer CMYK. The “Print for Figma” plugin adds CMYK export and 0.125 in bleed."],
  ["Enamel pins", "Vector files, no gradients, every color separated by metal. Metal lines ≥0.2 mm, color areas ≥0.3 mm, text ≥5 pt. A beginner size is about 1–1.5 in."],
  ["Embroidery (Printful)", "Text at least 0.25 in tall, lines at least 0.05 in thick."],
  ["Figma export", "SVG and PDF export at 1× only, because they're vector. Figma's PNG files may say 72 or 144 DPI in their file info; printers go by the pixel size, so check the pixels (12×16 in at 300 DPI = 3,600 × 4,800 px)."],
];

// Real-world rewards the research recommends, shown to grown-ups once she gets there.
export const PRINT_REWARDS = [
  { afterDay: 20, text: "She finished the Sticker Lab. Order a small real sticker run of her pack as a trophy." },
  { afterDay: 30, text: "She launched her line! Order one real product (a tee or a pin) as the capstone reward." },
];

// Pen-name ideas for the first screen (the research: share only under a pen name).
export const PEN_NAMES = ["Moth", "Ink Owl", "Night Fern", "Quiet Comet", "Pixel Fox", "Moon Doodle", "Velvet Crow", "Lamp Moth", "Paper Star", "Nova"];

// The course pack: everything above in one object. js/main.js runs whichever pack its page hands it (lumia.html
// hands it js/content/lumia/course.js). `id` is also the save name, so never change it: her progress lives under it.
export const COURSE = {
  id: "night-studio",
  title: "Night Studio",
  DAYS, ROOMS, PASS, XP, OWN_IDEA_TWISTS, SECRET_BADGES, LUMI_WORDS, PLAYBOOK, SETUP, CHEAT_SHEET, PRINT_REWARDS, PEN_NAMES,
  roomWord: "Room",
  text: {
    kicker: "After hours",
    welcome: "Welcome to Night Studio",
    lead: "This is your secret design studio. In 30 short evenings you'll go from your first shape in Figma to print-ready stickers, t-shirts, pins and patches.",
    start: "Light the lamp",
    finishedTitle: "Your studio is lit up ✨",
    finished: "You finished all 30 days. Visit your shelf, dress Lumi, or replay any day you like.",
    grownUps: "Night Studio follows the research in docs/research.md: small private wins, real choices, unlimited retries, and you as co-pilot rather than judge.",
  },
  // Shown on the map once the last day is done.
  next: { href: "lumia.html", title: "Next: Lumia Merch Lab →", text: "A real client wants merch. 15 evenings designing stickers, tees, mugs and more for Lumia, and your best pieces get printed." },
};
