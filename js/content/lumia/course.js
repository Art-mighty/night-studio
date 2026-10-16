// Lumia Merch Lab: the sequel to Night Studio. Its fixed rules and texts; the 15 days themselves are in days.js.
// She's a junior designer now, and Lumia is her first client: every day is a brief for real Lumia merch, made inside
// the brand's rules (from Lumia_marketing/brand and its brand skill). Everything is bundled into COURSE at the bottom,
// the course pack lumia.html hands to the game engine. Change numbers freely: XP and badges are worked out from her
// progress every time.
import { DAYS } from "./days.js";
import * as NS from "../course.js";

// The same pass mark, XP and secret badges as Night Studio, so the two courses feel like one studio.
const { PASS, XP, OWN_IDEA_TWISTS, SECRET_BADGES, PEN_NAMES } = NS;

// The 6 levels and the gift each one gives when its last day is done (gift kinds are explained in ../course.js).
// The tricks are feelings Lumi didn't know in Night Studio; spin, fly and dance come along from there.
export const ROOMS = [
  {
    n: 1, name: "The Brief", first: 1, last: 3, icon: "📋",
    blurb: "Meet your client: the Lumia brand kit, Lumi's poses, and a first board of merch ideas.",
    gift: { kind: "trick", trick: "aha", title: "Lumi learned the lightbulb face", text: "Tap Lumi any time to see its “aha!”" },
  },
  {
    n: 2, name: "Collectibles", first: 4, last: 6, icon: "📌",
    blurb: "A Lumi sticker sheet, an enamel pin, a patch and a keychain.",
    gift: { kind: "wear", slots: ["pin", "patch"], title: "Lumi wears your pin and patch", text: "Pick a design for each." },
  },
  {
    n: 3, name: "Wear It", first: 7, last: 9, icon: "👕",
    blurb: "A grown-up tee, a kids' tee with your own slogan, a hoodie, a cap and a tote.",
    gift: { kind: "wear", slots: ["belly"], trick: "love", title: "Lumi wears your tee print (and learned to love it)", text: "Pick the print Lumi wears." },
  },
  {
    n: 4, name: "Desk & School", first: 10, last: 11, icon: "✏️",
    blurb: "A mug, a water bottle, a notebook, a bookmark and a bag tag.",
    gift: { kind: "trick", trick: "surprised", title: "Lumi learned to be amazed", text: "Tap Lumi to see its “whoa!”" },
  },
  {
    n: 5, name: "Gifts", first: 12, last: 13, icon: "🎁",
    blurb: "A Lumi plush concept and a welcome kit for new Lumia heroes.",
    gift: { kind: "star", title: "Lumi's star, Lumia edition", text: "Pick a colour for Lumi's star, or keep the one you have." },
  },
  {
    n: 6, name: "The Drop", first: 14, last: 15, icon: "🚀",
    blurb: "Mockups, a lookbook, and your print-ready files for the real order.",
    gift: { kind: "lights", title: "Your Lumia drop is on the wall", text: "Every design you made for Lumia, together. Dress Lumi any way you like." },
  },
];

// What Lumi may say: 1–3 words, warm, never an answer or an order. {name} = her pen name.
export const LUMI_WORDS = {
  ...NS.LUMI_WORDS,
  hello: ["Hi, {name}!", "Hello, designer!", "Client's here!"],
  upload: ["Wow!", "On brand!", "Client-ready!", "So cool!"],
};

// Lines from Lumia's brand story that may go on kids' merch (Day 8 also lets her write her own).
export const SLOGANS = ["Outsmart the dungeon.", "Heroes wanted. Brains required.", "Swords & sums."];

// The Brand Kit screen (#/brand-kit). Files are in lumia/brand (see its README). Lumi's poses are drawn from the game's
// own pixel data, so they need no files.
export const BRAND = {
  title: "Lumia Brand Kit",
  intro: "Everything your client gave you. Use these files exactly as they are: that's what makes merch look official.",
  rules: [
    ["Flat colour only.", "The logo is always one flat colour: ink or amber. No gradients, glows, shadows or new colours."],
    ["Pick the colour that stands out.", "Ink logo on light backgrounds, amber logo on dark ones."],
    ["Never type the name.", "Don't write LUMIA in a font to stand in for the logo. Always use the logo file."],
    ["Give it room.", "Keep empty space around the logo at least as wide as the star."],
    ["Lumi's star isn't the logo.", "The little star above Lumi's head is part of the character. The Lumia star mark is its own thing."],
    ["Crisp pixels.", "Lumi is pixel art: grow it only by whole numbers (2×, 4×, 8×). Never blur, smooth or stretch it."],
    ["Lumi stays Lumi.", "Use Lumi's own poses and colours. No new characters, and no recolouring Lumi."],
  ],
  logos: [
    { file: "lumia/brand/logos/Lumia-mark-ink.png", name: "Star · ink", use: "Small spots: chest, stickers, tags" },
    { file: "lumia/brand/logos/Lumia-mark-amber.png", name: "Star · amber", use: "Small spots on dark colours", dark: true },
    { file: "lumia/brand/logos/Lumia-mark-ink-transparent.svg", name: "Star · ink (vector)", use: "Big prints and pins: sharp at any size" },
    { file: "lumia/brand/logos/Lumia-mark-amber-transparent.svg", name: "Star · amber (vector)", use: "Big prints on dark colours", dark: true },
    { file: "lumia/brand/logos/Lumia-lockup-Marcellus-ink.png", name: "Logo · ink", use: "The main logo" },
    { file: "lumia/brand/logos/Lumia-lockup-Marcellus-amber.png", name: "Logo · amber", use: "The main logo on dark colours", dark: true },
    { file: "lumia/brand/logos/Lumia-lockup-Marcellus-wide-ink.png", name: "Wide logo · ink", use: "Long spots: mug wraps, banners" },
    { file: "lumia/brand/logos/Lumia-lockup-Marcellus-wide-amber.png", name: "Wide logo · amber", use: "Long spots on dark colours", dark: true },
    { file: "lumia/brand/logos/Lumia-lockup-Marcellus-stacked-ink.png", name: "Stacked logo · ink", use: "Square spots: totes, notebooks, box lids" },
    { file: "lumia/brand/logos/Lumia-lockup-Marcellus-stacked-amber.png", name: "Stacked logo · amber", use: "Square spots on dark colours", dark: true },
    { file: "lumia/brand/logos/Lumia-lockup-Marcellus-tagline-ink.png", name: "Logo + tagline · ink", use: "Covers: lookbook, hang tags" },
    { file: "lumia/brand/logos/Lumia-lockup-Marcellus-tagline-amber.png", name: "Logo + tagline · amber", use: "Covers on dark colours", dark: true },
  ],
  // [move from js/lumi/moves.js, name]
  poses: [
    ["idle", "Hello"], ["wave", "Wave"], ["correct", "Yay"], ["love", "Love"],
    ["aha", "Aha!"], ["think", "Thinking"], ["surprised", "Whoa"], ["sleepy", "Sleepy"],
  ],
  colours: [
    ["#f6df9f", "Lumia amber"], ["#0a0a08", "Lumia ink"],
    ["#e9d9b8", "Lumi cream"], ["#fdf5e1", "Lumi glow"], ["#e8af7e", "Lumi blush"],
    ["#fcd173", "Star yellow"], ["#e0b05b", "Star gold"], ["#ba8130", "Star dark gold"],
    ["#0b0a20", "Lumi outline"], ["#2e3354", "Lumi eye blue"],
  ],
  fonts: [
    { name: "Marcellus", link: "https://fonts.google.com/specimen/Marcellus", use: "the logo's font. Use it for headings, never to retype LUMIA." },
    { name: "Space Grotesk", link: "https://fonts.google.com/specimen/Space+Grotesk", use: "small lines and slogans, in Bold capitals with wide letter spacing." },
  ],
};

// The grown-ups page.
export const PLAYBOOK = [
  ["A friendly client", "You're the Lumia team now. Give notes the way a kind client would: “The logo needs more room”, not “That's wrong.” One or two notes per design is plenty."],
  ["Why using a brand is OK here", "Night Studio said “original characters only.” Lumia is different: its owner asked her to design for it, so the logo and Lumi are hers to use, inside the brand rules."],
  ["Claude Design is a work tool", "Claude's consumer plans are for adults (18+), so on Days 3, 5, 8, 10, 12, 13 and 14 you drive the keyboard while she decides what to type and which result to keep. Figma always makes the final print file."],
  ["Keep the designs in the family for now", "They're Lumia's merch. Don't post them publicly until you've decided what Lumia will release, and then only under her pen name if she wants."],
  ["The print order is the trophy", "After Day 15 she picks 3–5 items. You approve them, send her spec-request email to a print shop, and place the order (see “Where to print” below)."],
  ["Go at her pace", "If a day takes two sessions, that's fine. Days unlock as soon as she finishes, and her lanterns never go out."],
];

export const SETUP = [
  "Open this page in the same Chrome profile as Night Studio, so her pen name and Lumi come along.",
  "She already has Figma from Night Studio. Marcellus and Space Grotesk are built into Figma, so there's nothing to install.",
  "Your Claude account with Claude Design for Days 3, 5, 8, 10, 12, 13 and 14 (you drive, she directs).",
  "Optional: choose a print shop now (see “Where to print” below) and ask for their file specs early.",
  "Preview the videos (list below) and skim the day texts once.",
];

// Universal print specs (almost every shop accepts these), plus where to print in Serbia.
export const CHEAT_SHEET = [
  ["The universal print file", "300 DPI at the real print size; PNG with a transparent background, or PDF; all text turned into outlines; 3 mm of bleed on anything that gets cut. Almost every shop accepts this."],
  ["Pixel math in mm", "pixels = mm ÷ 25.4 × 300. A 45 mm chest star = 531 px. A 260 mm back print = 3,071 px."],
  ["Lumi at print size", "Every Lumi pose in the Brand Kit is an 80 × 108 px frame. Grow it only by whole numbers: 8× = 640 × 864 px, about 54 × 73 mm at 300 DPI; 32× is about 22 × 29 cm. Never 7.5×."],
  ["Logo at print size", "The PNG logos are about 1,550 px wide: enough for up to about 13 cm at 300 DPI. For anything bigger, use the vector SVG star."],
  ["Lumia tee placement", "Left chest: the star 45 mm wide, its centre about 85 mm below the shoulder seam. Back: up to 260 mm wide, its top about 120 mm below the neckline. Ink on light shirts, amber on dark."],
  ["Stickers", "3 mm bleed, a cut line 2–3 mm outside the art (a white border), text at least 3 mm inside the cut. On a kiss-cut sheet, leave 5 mm between stickers."],
  ["Mugs and bottles", "A standard 330 ml (11 oz) mug wrap is about 200 × 85 mm, but every shop's template differs, so ask. Keep the art 10 mm away from the handle."],
  ["Embroidery", "Text at least 6 mm tall, lines at least 1.5 mm thick, no gradients, 6 thread colours or fewer."],
  ["Enamel pins, patches, plush", "Pins and patches usually need 50–100 pieces, and a plush sample costs hundreds of euros, so in this course they stay concepts with real specs."],
  ["CMYK vs RGB", "Figma works in RGB. Most local DTF and DTG tee printers print fine from an RGB PNG; paper and sticker printers may ask for a CMYK PDF. When in doubt, ask the shop."],
  ["Where to print (Belgrade)", "Shops that print single pieces: Novoprint (novoprint.rs: tees from 1 piece, about 1,100 RSD, about 2 days; die-cut stickers per sheet) and Izrada flajera (tees from 1 piece). Some shops need 10–20 pieces (Copycentar, SKRIN Studio). For mugs, ask first. Checked October 2026, so confirm before ordering."],
  ["Why not an online shop?", "Printful and similar shops ship to Serbia, but Serbia isn't in the EU: expect about 20% VAT, possibly about 10% duty, and a courier clearance fee on top. A local shop is quicker and you can see samples."],
];

// Shown to grown-ups once she gets there.
export const PRINT_REWARDS = [
  { afterDay: 6, text: "Her Lumi sticker sheet is ready: a small real sticker run would make a great surprise." },
  { afterDay: 15, text: "The Lumia drop is done! Pick 3–5 items from her PRINT_READY folder, send her spec-request email to a print shop, and order them." },
];

// The course pack (see ../course.js). carryFrom: on her first open, her pen name and Lumi come over from Night Studio.
export const COURSE = {
  id: "lumia-merch-lab",
  title: "Lumia Merch Lab",
  carryFrom: NS.COURSE,
  DAYS, ROOMS, PASS, XP, OWN_IDEA_TWISTS, SECRET_BADGES, LUMI_WORDS, PLAYBOOK, SETUP, CHEAT_SHEET, PRINT_REWARDS, PEN_NAMES, BRAND,
  roomWord: "Level",
  text: {
    kicker: "New client",
    welcome: "Welcome to Lumia Merch Lab",
    lead: "Your first real client is Lumia, a world for young heroes, and Lumi is its mascot. In 15 evenings you'll design stickers, tees, mugs and more with their logo and Lumi, and your best pieces get printed for real.",
    start: "Take the job",
    finishedTitle: "The Lumia drop is ready ✨",
    finished: "You finished all 15 days. Show your grown-up your PRINT_READY folder, then visit your shelf or dress Lumi.",
    grownUps: "Lumia Merch Lab is Night Studio's sequel: she designs real merch for Lumia, inside its brand rules. Same promises as before: small private wins, real choices, unlimited retries, and you as a friendly client rather than a judge.",
  },
};
