// Lumia Merch Lab: the 15 days of the course. Every day is a brief from her client, Lumia.
//
// How to edit a day (it's all plain text, no coding needed):
// - Change any words inside the "double quotes". Keep the quotes, commas and brackets as they are.
// - Swap a video: paste the new 11-character YouTube id (the part after "watch?v=") into `id`,
//   then update its title, channel and min (the minutes she will actually watch).
// - Play only part of a video: set `start` and `end` in seconds (2:30 is 150).
//   `start: 0` starts at the beginning; `end: null` plays to the end.
// - `{flavor}` inside a step is replaced by the option she picks on that day's flavor card.
// - Quiz `answer` counts from 0: first option = 0, second = 1, third = 2, fourth = 3.
//   The game shuffles the options every attempt, so their order here doesn't matter.
// - Never renumber, reorder or delete days: her saved progress is stored by day number.
// - Sizes: pixels = mm ÷ 25.4 × 300 (print at 300 DPI). Every Lumi pose in the Brand Kit is an 80 × 108 px frame,
//   and it only grows by whole numbers (8× = 640 × 864 px ≈ 54 × 73 mm).

const CLAUDE = "With your grown-up at the keyboard, open Claude Design — you decide what to type and which result to keep.";

export const DAYS = [
  {
    day: 1,
    room: 1,
    title: "Meet Your Client",
    goal: "Build a Lumia brand kit page in Figma: the logo, the colours, the fonts and the client's rules.",
    videos: [
      { id: "jkuSF0r73AQ", title: "What Is Clearspace For Logos?", channel: "Will Paterson", min: 7, start: 0, end: null, note: "The clear-space rule, from a logo designer. He mentions his paid course; you don't need it." },
      { id: "BSQhCmuyoOM", title: "How to Create A Brand Style Guide from Scratch in Figma | Quick & Easy Tutorial", channel: "KDC Marketing", min: 9, start: 0, end: null, note: "Builds the same kind of page you'll make today. Skip the template ad." },
    ],
    flavor: {
      prompt: "Pick your brand kit's background",
      options: [
        { label: "🌙 Lumia ink", fill: "an ink (#0a0a08)" },
        { label: "✨ Lumia amber", fill: "an amber (#f6df9f)" },
        { label: "📄 Paper white", fill: "a white" },
      ],
    },
    task: {
      tool: "Figma",
      steps: [
        "Open the Brand Kit (top of this page). Download the star and the main logo in both ink and amber, and drag them into a new Figma file called Lumia Merch.",
        "Make a 1440×1024 frame called Brand Kit with {flavor} background, and place the logo version that stands out on it.",
        "Make colour styles for Lumia amber #f6df9f, Lumia ink #0a0a08 and 4 of Lumi's colours (click a colour in the Brand Kit to copy its code).",
        "Make two text styles: Heading in Marcellus, and Label in Space Grotesk Bold, in capitals with wide letter spacing.",
        "Draw the clear-space rule (a box around the logo, as wide as the star on every side) and write the client's rules in your Label style.",
        "Export the frame as PNG.",
      ],
      deliverable: "Brand Kit page (PNG)",
    },
    quiz: [
      {
        q: "The Lumia logo goes on a dark navy hoodie. Which version?",
        options: ["Ink, because the logo should always be ink", "Amber", "A gradient from amber to ink, for extra shine", "Navy, so it matches the hoodie"],
        answer: 1,
        why: "Amber stands out on dark colours and ink on light ones. Either way the logo is one flat colour.",
      },
      {
        q: "You need the word LUMIA on a mug. You…",
        options: ["Type it in Marcellus, since that's the logo's font", "Place the logo file", "Type it in any bold font that looks close enough", "Trace the letters with the Pen tool"],
        answer: 1,
        why: "Retyped letters never match the real logo exactly. The client's rule: always use the file.",
      },
      {
        q: "How much empty space goes around the logo?",
        options: ["None: the bigger the logo, the better", "At least the width of the star", "Exactly 1 px on every side", "Half the page, so nothing else fits"],
        answer: 1,
        why: "Clear space at least as wide as the star keeps the logo from being crowded by other things.",
      },
      {
        q: "Why make colour styles instead of typing hex codes each time?",
        options: ["Styles print with brighter colours than codes do", "One change updates every shape, and nobody mistypes a code", "Figma won't let you type a hex code anywhere except inside a style", "Styles shrink the file so it emails faster"],
        answer: 1,
        why: "A style is one source of truth: change it once and everything using it follows, with no typos.",
      },
      {
        q: "What is a brand guide for?",
        options: ["Choosing the cheapest printer in town", "Making every product look like it comes from the same company", "Hiding the logo from copycats online", "Deciding how much every single piece of merch should cost in shops"],
        answer: 1,
        why: "The rules on logo, colours and fonts are what make a sticker and a mug look like one brand.",
      },
    ],
    badge: { id: "client-kit", name: "Client Kit", icon: "🗂️" },
  },
  {
    day: 2,
    room: 1,
    title: "Lumi Pose Library",
    goal: "Turn Lumi's poses into crisp Figma components at whole-number sizes.",
    videos: [
      { id: "sC0vjllWjoc", title: "How to draw Pixel - art with Figma Grids less in 3 minutes #figma #figmatutorial", channel: "Maria Kutish", min: 4, start: 0, end: null, note: "" },
      { id: "2OCmZfB42XA", title: "How To Upsize Pixel Art Without Losing Quality", channel: "Spoon Graphics", min: 1, start: 0, end: null, note: "A quick one, shown in Photoshop: why pixel art only grows by whole steps." },
    ],
    flavor: {
      prompt: "Pick Lumi's star pose for your library",
      options: [
        { label: "👋 Wave", fill: "the Wave pose" },
        { label: "💛 Love", fill: "the Love pose" },
        { label: "💡 Aha!", fill: "the Aha! pose" },
      ],
    },
    task: {
      tool: "Figma",
      steps: [
        "In the Brand Kit, download {flavor} and 3 more of Lumi's poses at 4×.",
        "Drag them into a new frame called Lumi Poses. Don't resize them: if you need another size later, download that size instead.",
        "Turn each pose into a component named like Lumi/Wave and Lumi/Love, then select them all and Combine as variants.",
        "Under each pose, write its print size with your Label style: 4× is 320 × 432 px, about 27 × 37 mm at 300 DPI.",
        "Export the frame as PNG.",
      ],
      deliverable: "Lumi pose sheet (PNG)",
    },
    quiz: [
      {
        q: "A Lumi pose is 80 px wide. Which width keeps it crisp?",
        options: ["600 px (7.5×)", "640 px (8×)", "500 px (a nice round number)", "700 px (it fills the frame)"],
        answer: 1,
        why: "Only whole-number sizes give every Lumi pixel the same square. 80 × 8 = 640.",
      },
      {
        q: "You drag a 1× Lumi to 4× size inside Figma. What can go wrong?",
        options: ["Nothing: pixel art always stays sharp", "The edges can go soft and blurry", "Lumi changes to the wrong colours", "Figma deletes the picture"],
        answer: 1,
        why: "Stretched pictures get smoothed. Download the size you need instead of dragging.",
      },
      {
        q: "At 300 DPI, an 8× Lumi (640 px wide) prints about…",
        options: ["5 mm wide", "54 mm wide", "300 mm wide", "640 mm wide"],
        answer: 1,
        why: "640 ÷ 300 ≈ 2.13 inches, and 2.13 × 25.4 ≈ 54 mm.",
      },
      {
        q: "Why combine the poses as variants?",
        options: ["One click swaps the pose anywhere you used it", "Variants always print in CMYK colours", "It's the only way Figma exports a PNG", "It makes Lumi animate in the final file"],
        answer: 0,
        why: "With a Pose property, any Lumi in any design can switch pose without redrawing.",
      },
      {
        q: "“Lumi stays Lumi.” Which change breaks that rule?",
        options: ["Choosing the Love pose for a sticker", "Making Lumi purple to match a hoodie", "Using an 8× Lumi on a tote bag", "Leaving clear space between Lumi and the logo"],
        answer: 1,
        why: "Lumi keeps its own colours. Poses and sizes can change; the character can't.",
      },
    ],
    badge: { id: "pixel-keeper", name: "Pixel Keeper", icon: "👾" },
  },
  {
    day: 3,
    room: 1,
    title: "Merch Idea Board",
    goal: "Explore Lumia merch ideas with Claude Design, then choose your favourites.",
    videos: [
      { id: "To5nrYqvR44", title: "Meet Claude Slides, Claude Design and Claude Docs", channel: "Claude", min: 2, start: 0, end: null, note: "" },
      { id: "dk13EWYOVyY", title: "Claude Design for Non-Designers | Master 90% in 15 Minutes", channel: "Design with May", min: 15, start: 0, end: null, note: "" },
    ],
    flavor: {
      prompt: "Pick who the merch is for",
      options: [
        { label: "🧒 Young heroes", fill: "kids aged 6 to 10" },
        { label: "👨‍👩‍👧 Their grown-ups", fill: "parents of young players" },
        { label: "🎒 Whole families", fill: "families who play together" },
      ],
    },
    task: {
      tool: "Claude Design + Figma",
      steps: [
        CLAUDE,
        "Upload the Lumia star and two Lumi poses, and ask for a merch mood board for {flavor}. Add: “Only these colours: amber #f6df9f, ink #0a0a08, cream and gold. Flat logo, no gradients.”",
        "Ask for 3 versions, then use comments to point at what you like (“more like this tote”).",
        "Check every idea against the client's rules: flat logo, clear space, Lumi not recoloured. Cross out any that break a rule.",
        "Export the board as PDF, place it in Figma, and circle your 6 favourite products.",
      ],
      deliverable: "Idea board PDF with your 6 picks circled",
    },
    quiz: [
      {
        q: "Claude Design shows the Lumia logo with a shiny gold gradient. You…",
        options: ["Keep it, because it looks fancy", "Ask for it again in one flat colour", "Ask for an even shinier version", "Use it only on the back of the tee"],
        answer: 1,
        why: "The logo is always one flat colour, so a gradient logo goes back with a note.",
      },
      {
        q: "Why upload the real logo and Lumi instead of describing them?",
        options: ["So the ideas use the real art, not a lookalike", "Uploading makes Claude Design run faster", "Claude Design can't understand typed words", "Without an upload, PDF export is locked"],
        answer: 0,
        why: "A description gets you a guess. The real files keep the ideas on brand.",
      },
      {
        q: "Who chooses which ideas to keep?",
        options: ["Claude Design, since it made them", "You, the designer", "The print shop", "Whoever types the fastest"],
        answer: 1,
        why: "AI suggests; the designer decides. That's your job on this team.",
      },
      {
        q: "Lumia is for kids aged 6–10 and their families. Which idea fits best?",
        options: ["A spooky skull hoodie with blood drips", "A Lumi sticker sheet and a kids' tee", "A grey business tie with a tiny logo", "A perfume bottle with gold foil"],
        answer: 1,
        why: "Merch should suit the people who love the brand: here, young heroes and their families.",
      },
      {
        q: "What's Claude Design's job in this course?",
        options: ["Making the print files in exact millimetres", "Exploring and presenting ideas, while Figma makes the print files", "Ordering the merch from the shop for you", "Inventing fresh brand colours and fonts to replace Lumia's old ones"],
        answer: 1,
        why: "Claude Design is fast for ideas and showing work. Print files need Figma's exact sizes.",
      },
    ],
    badge: { id: "client-briefed", name: "Client Briefed", icon: "📋" },
  },
  {
    day: 4,
    room: 2,
    title: "Lumi Sticker Sheet",
    goal: "Design a kiss-cut sheet of Lumi stickers with white borders, cut lines and bleed.",
    videos: [
      { id: "5xnVfAY3W18", title: "How to design a sticker sheet in Illustrator", channel: "Sticker Mule", min: 3, start: 0, end: null, note: "Made in Illustrator, but the layout ideas work the same in Figma." },
    ],
    flavor: {
      prompt: "Pick your sheet's theme",
      options: [
        { label: "🌙 Night sky", fill: "a night-sky" },
        { label: "⚔️ Hero gear", fill: "a hero-gear" },
        { label: "✨ Star shower", fill: "a star-shower" },
      ],
    },
    task: {
      tool: "Figma",
      steps: [
        "Make an A6 frame, 105 × 148 mm: that's 1240 × 1748 px at 300 DPI.",
        "Place 4–6 Lumi poses (downloaded at 4×, never stretched) and the Lumia star, with {flavor} look.",
        "Give every sticker a white border about 3 mm (35 px) wide, and draw its cut line as a thin magenta stroke around the outside of the border.",
        "Leave at least 5 mm (60 px) between stickers, and add 3 mm of bleed around the whole sheet.",
        "Check the client's rules (flat logo, clear space, Lumi's own colours), then export as PNG and PDF.",
      ],
      deliverable: "Sticker sheet (PNG + PDF)",
    },
    quiz: [
      {
        q: "On a kiss-cut sheet, the knife cuts…",
        options: ["Through the sticker and the backing paper", "Through the sticker only, so it peels off the sheet", "Nothing at all: you cut them with scissors", "Only around the outside edge of the whole sheet, never the stickers"],
        answer: 1,
        why: "Kiss-cut just kisses the sticker layer, so the stickers stay on one sheet until you peel them.",
      },
      {
        q: "3 mm at 300 DPI is about…",
        options: ["3 px", "9 px", "35 px", "300 px"],
        answer: 2,
        why: "3 ÷ 25.4 × 300 ≈ 35 px.",
      },
      {
        q: "Why a white border around each Lumi?",
        options: ["The knife can wobble a little without cutting into Lumi", "White is the brand's main colour", "Printers can't print any colour closer than 5 mm to the edge of the paper", "The border makes the sticker waterproof"],
        answer: 0,
        why: "Cuts are never perfect. The border gives them room, and it makes Lumi pop.",
      },
      {
        q: "Lumi looks small, so you drag the 4× file up to 6.5×. Problem?",
        options: ["No problem at all", "6.5 isn't a whole number, so the pixels go soft and uneven", "The sticker gets cheaper to print", "The cut line disappears from the file"],
        answer: 1,
        why: "Whole numbers only. Download 8× instead.",
      },
      {
        q: "Bleed is…",
        options: ["Ink that soaks into the paper", "Background that runs past the cut, so no white slivers show", "A red warning colour for mistakes", "The layer of glue on the back of a sticker that makes it stay stuck down"],
        answer: 1,
        why: "If the cut shifts a little, the extra background hides it.",
      },
    ],
    badge: { id: "sheet-shaper", name: "Sheet Shaper", icon: "🌟" },
  },
  {
    day: 5,
    room: 2,
    title: "Enamel Pin",
    goal: "Simplify Lumi or the star into an enamel pin: metal lines, flat colours, no gradients.",
    videos: [
      { id: "BFbI90fK4S0", title: "Enamel Pin Design Tips: Separating Paint And Metal", channel: "Ultimate Promotions: Custom Enamel Pins & Medals", min: 2, start: 0, end: null, note: "" },
      { id: "VykVcQYJwFc", title: "DESIGNING ENAMEL PINS | My Top Tips to get the best designs possible! | Emily Harvey Art", channel: "Emily Harvey Art", min: 11, start: 0, end: null, note: "" },
    ],
    flavor: {
      prompt: "Pick your pin's metal",
      options: [
        { label: "🥇 Gold", fill: "gold" },
        { label: "🥈 Silver", fill: "silver" },
        { label: "⚫ Black nickel", fill: "black nickel" },
      ],
    },
    task: {
      tool: "Claude Design + Figma",
      steps: [
        CLAUDE,
        "Upload a Lumi pose and the star, and ask: “Show me 4 simpler versions of this for a 30 mm enamel pin: flat colours, thick outlines, no gradients, no tiny pixels.”",
        "Pick the clearest one. In Figma, make a 354 × 354 px frame (30 mm at 300 DPI) and rebuild it with shapes and the Pen tool: smooth outlines instead of pixel steps.",
        "Outline every colour with a {flavor} metal line at least 0.2 mm thick (3 px or more here), and use 5 colours or fewer from Lumi's palette.",
        "Export as SVG and PDF.",
      ],
      deliverable: "Pin vector (SVG + PDF)",
    },
    quiz: [
      {
        q: "Why can't Lumi's pixel art go straight onto a pin?",
        options: ["Pins are only allowed to be round", "Its 1-pixel details are too small for metal lines and enamel", "Pin factories have a rule that pixel art is never allowed on any pin", "Pins can't be yellow or cream"],
        answer: 1,
        why: "Every colour needs a metal wall around it, so tiny details have to become bigger, simpler shapes.",
      },
      {
        q: "Which job did Claude Design do today?",
        options: ["Making the factory's final vector file", "Choosing the metal for you", "Exploring simpler versions quickly", "Ordering 100 pins from a factory"],
        answer: 2,
        why: "It sketched options fast; you rebuilt the winner precisely in Figma.",
      },
      {
        q: "30 mm at 300 DPI is about…",
        options: ["30 px", "354 px", "900 px", "3,000 px"],
        answer: 1,
        why: "30 ÷ 25.4 × 300 ≈ 354 px.",
      },
      {
        q: "Which simplified pin still looks like Lumi?",
        options: ["All gold, so it matches the metal", "Cream body, gold star and dark eyes, in simple shapes", "No eyes, to save colours", "Just the Lumia logo star instead"],
        answer: 1,
        why: "Keep the things people recognise (body colour, star, eyes) and simplify the rest.",
      },
      {
        q: "Why does the pin stay a concept in this course?",
        options: ["Pins can't use brand logos", "Factories usually need 50–100 pieces, which costs a lot", "Pins are banned in some countries", "Figma can't export the special file type that pin factories always need"],
        answer: 1,
        why: "Big minimum orders make pins a later project. The design and specs are ready when Lumia is.",
      },
    ],
    badge: { id: "metal-mind", name: "Metal Mind", icon: "📌" },
  },
  {
    day: 6,
    room: 2,
    title: "Patch + Keychain",
    goal: "Design a round embroidered patch and an acrylic Lumi keychain.",
    videos: [
      { id: "40QnBG07Flc", title: "How to Make Custom Embroidered Patches! What You Need to Know", channel: "Monterey Company", min: 6, start: 0, end: null, note: "" },
      { id: "NjY0TsBP0mA", title: "How to Make Acrylic Charms with Vograce! | Start to Finish Tutorial", channel: "Winterstar Art", min: 8, start: 0, end: null, note: "Sponsored by a charm maker; watch for the cut line and the white layer." },
    ],
    flavor: {
      prompt: "Pick your patch's border",
      options: [
        { label: "🟡 Amber", fill: "an amber" },
        { label: "⚫ Ink", fill: "an ink" },
        { label: "🤍 Cream", fill: "a cream" },
      ],
    },
    task: {
      tool: "Figma",
      steps: [
        "Patch: make a 76 mm circle (898 px). Inside, place the star or the stacked logo, and give it {flavor} border 3 mm (35 px) thick.",
        "Simplify it for thread: letters at least 6 mm tall, lines at least 1.5 mm (18 px), no gradients, 6 colours or fewer.",
        "Keychain: place one Lumi pose at 8× (about 54 × 73 mm) and give it a 3 mm white border all around.",
        "Add a 5 mm hole at the top for the ring (inside the border), then draw the cut line around the outside.",
        "Export both as PNG and PDF.",
      ],
      deliverable: "Patch + keychain (PNG + PDF)",
    },
    quiz: [
      {
        q: "Embroidered letters should be at least…",
        options: ["1 mm tall", "6 mm tall", "60 mm tall", "Any size: thread is precise"],
        answer: 1,
        why: "Thread is thick. Smaller letters blur into blobs.",
      },
      {
        q: "Why do patches need thick lines?",
        options: ["Thin lines use more ink", "Thread can't stitch hair-thin lines", "Patches are only seen from far away", "Thick lines glow in the dark"],
        answer: 1,
        why: "A stitch has a width of its own, so very thin lines can't be sewn cleanly.",
      },
      {
        q: "Where does an acrylic keychain's hole go?",
        options: ["Cut through the outside edge", "Right in the middle of Lumi's face", "Inside the cut line, with acrylic all around it", "Nowhere: the buyer drills it later"],
        answer: 2,
        why: "The ring needs plastic all around the hole, or it snaps off.",
      },
      {
        q: "An 8× Lumi is 640 × 864 px. At 300 DPI that's about…",
        options: ["8 × 8 mm", "21 × 29 mm", "54 × 73 mm", "640 × 864 mm"],
        answer: 2,
        why: "640 px ≈ 54 mm and 864 px ≈ 73 mm at 300 DPI: a nice keychain size.",
      },
      {
        q: "Which patch follows the client's rules?",
        options: ["The logo with a rainbow gradient", "An ink star on amber, with clear space around it", "LUMIA typed in a fun bubbly font", "Lumi recoloured green for spring, with the logo right next to it"],
        answer: 1,
        why: "Flat logo colour, clear space, and the real star: all three rules kept.",
      },
    ],
    badge: { id: "stitch-scout", name: "Stitch Scout", icon: "🧵" },
  },
  {
    day: 7,
    room: 3,
    title: "Grown-up Tee",
    goal: "Place the Lumia star on a tee's left chest and design a back print, for light and dark shirts.",
    videos: [
      { id: "e_RgCeCHELg", title: "Logo Placement 101: Tips to make the Perfect Shirt!", channel: "Mylo Prints", min: 10, start: 0, end: null, note: "" },
      { id: "f6ElBXsg1CU", title: "Tee Shirt Design Placement - What Size Should The Artwork Be?", channel: "Ryonet", min: 1, start: 0, end: null, note: "Sizes are in inches: 3.5 in is about 90 mm." },
    ],
    flavor: {
      prompt: "Pick your back print",
      options: [
        { label: "⭐ Big star", fill: "the vector star, big" },
        { label: "🌟 Stacked logo", fill: "the stacked logo" },
        { label: "👋 Lumi waving", fill: "Lumi waving at 32×" },
      ],
    },
    task: {
      tool: "Figma",
      steps: [
        "Make two frames: Chest, 531 × 531 px (45 mm at 300 DPI), and Back, 3071 × 3543 px (260 × 300 mm).",
        "In Chest, place the vector star 531 px wide. Make an ink version for light shirts and an amber version for dark shirts.",
        "In Back, design {flavor}, with clear space around it and no wider than 260 mm.",
        "Sketch a placement guide: a tee outline with the chest star centred about 85 mm below the shoulder seam, and the back print's top about 120 mm below the neckline.",
        "Export each print as a transparent PNG at 1×, named like tee-chest-ink.png.",
      ],
      deliverable: "Chest + back print files (PNG) and a placement sketch",
    },
    quiz: [
      {
        q: "45 mm at 300 DPI is about…",
        options: ["45 px", "135 px", "531 px", "1,350 px"],
        answer: 2,
        why: "45 ÷ 25.4 × 300 ≈ 531 px.",
      },
      {
        q: "A black tee. Which star?",
        options: ["Amber", "Ink", "Ink with an amber glow", "Black, to match the shirt"],
        answer: 0,
        why: "Amber on dark, ink on light, and never a glow.",
      },
      {
        q: "Why a transparent background for tee prints?",
        options: ["Transparent files are smaller to email", "Otherwise a box of background colour prints around the art", "Printers only accept see-through files", "So the ink dries faster on the shirt and doesn't crack in the washing machine"],
        answer: 1,
        why: "Anything that isn't transparent gets printed, including a white or coloured box.",
      },
      {
        q: "The PNG star is about 1,550 px wide, but the back needs 3,071 px. You…",
        options: ["Stretch the PNG to 3,071 px", "Use the vector SVG star, which stays sharp at any size", "Print the back much smaller than planned, since big prints always look blurry", "Take a bigger screenshot of it"],
        answer: 1,
        why: "Vectors are made of maths, not pixels, so they never go blurry when they grow.",
      },
      {
        q: "Why is a left-chest print small?",
        options: ["Printers can't print anything bigger there", "It sits like a badge, and 45 mm reads well in that spot", "The client doesn't like big logos", "Shirts shrink in the wash"],
        answer: 1,
        why: "A chest mark works like a name badge: small, neat and easy to spot.",
      },
    ],
    badge: { id: "chest-champ", name: "Chest Champ", icon: "👕" },
  },
  {
    day: 8,
    room: 3,
    title: "Kids' Tee, Your Slogan",
    goal: "Pick or write a slogan that fits Lumia, and design a kids' tee around it.",
    videos: [
      { id: "bHTLYCrwNKA", title: "How to make text based t-shirt designs that sell", channel: "Passive Owl", min: 12, start: 0, end: null, note: "It talks about selling online; just watch for the text-layout tips." },
    ],
    flavor: {
      prompt: "Start from a client-approved slogan (or write your own in step 2)",
      options: [
        { label: "⚔️ Outsmart the dungeon.", fill: "“Outsmart the dungeon.”" },
        { label: "🦸 Heroes wanted. Brains required.", fill: "“Heroes wanted. Brains required.”" },
        { label: "🗡️ Swords & sums.", fill: "“Swords & sums.”" },
      ],
    },
    task: {
      tool: "Claude Design + Figma",
      steps: [
        CLAUDE,
        "Start from {flavor}, or write your own: 5 words or fewer, kind, about heroes and adventure. Lumia's rule for kids' merch: no words like “learning” or “homeschool”.",
        "Ask Claude Design for 4 tee layouts with your slogan in bold capitals, plus the Lumia star or a Lumi pose, using only amber, ink and Lumi's colours.",
        "Rebuild your favourite in Figma: a 2362 × 2362 px frame (200 × 200 mm), the slogan in Space Grotesk Bold, and the logo as the file (never retyped).",
        "Select the text and flatten it (⌘E) so the printer gets shapes, not a font. Export a transparent PNG.",
      ],
      deliverable: "Kids' tee print (PNG) with your slogan",
    },
    quiz: [
      {
        q: "Which slogan breaks Lumia's kids' rule?",
        options: ["Outsmart the dungeon.", "Heroes wanted. Brains required.", "Learning has never been this fun!", "Swords & sums."],
        answer: 2,
        why: "Kids' merch talks about the world and its heroes, never about “learning”.",
      },
      {
        q: "Why flatten the text before sending it to a printer?",
        options: ["Flattened text prints in brighter colours", "Their computer may not have your font, so letters could change", "It makes the letters bigger", "Printers charge extra for every letter that's still a font instead of a shape"],
        answer: 1,
        why: "Flattened letters are plain shapes, so they look exactly the same on any computer.",
      },
      {
        q: "Good tee slogans are usually…",
        options: ["Short and readable from across a room", "A full paragraph about the brand", "Tiny and light grey", "Set in five different fonts"],
        answer: 0,
        why: "People read a tee in a second or two, so a few bold words win.",
      },
      {
        q: "Claude Design wrote LUMIA in a fancy font on the tee. You…",
        options: ["Keep it: it's close enough", "Make it bigger so it's easier to read", "Replace it with the logo file", "Add a gradient to make it pop"],
        answer: 2,
        why: "Never retype the name. The logo file is the only real Lumia logo.",
      },
      {
        q: "200 mm at 300 DPI is about…",
        options: ["200 px", "600 px", "2,362 px", "6,000 px"],
        answer: 2,
        why: "200 ÷ 25.4 × 300 ≈ 2,362 px.",
      },
    ],
    badge: { id: "slogan-smith", name: "Slogan Smith", icon: "💬" },
  },
  {
    day: 9,
    room: 3,
    title: "Hoodie, Cap + Tote",
    goal: "Make an embroidery-friendly mark for a hoodie and a cap, and lay out a tote bag.",
    videos: [
      { id: "RgIhEZt5qJA", title: "Designing Custom Patches for Hats | What You Need to Know", channel: "Monterey Company", min: 5, start: 0, end: null, note: "" },
      { id: "XvJ0bA_jg-o", title: "Printful Embroidery Tutorial For Beginners", channel: "Printful Custom Printing", min: 4, start: 0, end: null, note: "" },
    ],
    flavor: {
      prompt: "Pick your tote's colour",
      options: [
        { label: "🤍 Natural cotton", fill: "a natural (cream) cotton" },
        { label: "⚫ Black", fill: "a black" },
        { label: "🟡 Amber", fill: "an amber" },
      ],
    },
    task: {
      tool: "Figma",
      steps: [
        "Cap: make a 100 × 50 mm frame (1181 × 591 px) and centre the star (vector) about 45 mm wide.",
        "Hoodie chest: a 90 mm square (1063 px) with the stacked logo. Check the thread rules: letters at least 6 mm tall, lines at least 1.5 mm, no gradients.",
        "Tote: a 300 × 350 mm frame (3543 × 4134 px) for {flavor} bag. Use whichever logo colour stands out on it.",
        "Add one Lumi pose (16× or 32×) to the tote, with clear space between Lumi and the logo.",
        "Export all three as transparent PNGs.",
      ],
      deliverable: "Cap, hoodie and tote files (PNG)",
    },
    quiz: [
      {
        q: "On an amber tote, the logo should be…",
        options: ["Amber", "Ink", "Cream", "A gold gradient"],
        answer: 1,
        why: "Amber on amber disappears. Ink stands out on light colours.",
      },
      {
        q: "Embroidered lines should be at least about…",
        options: ["0.1 mm", "1.5 mm", "15 mm", "Any width at all"],
        answer: 1,
        why: "Below about 1.5 mm, thread can't form a clean line.",
      },
      {
        q: "Why is the star a good choice for a cap?",
        options: ["Caps can't hold any letters", "It's a simple, bold shape that stitches cleanly", "Star thread is the cheapest", "The client has a rule that the full logo can never go on any cap"],
        answer: 1,
        why: "Simple shapes with no tiny details are perfect for embroidery.",
      },
      {
        q: "A 32× Lumi is 2,560 px wide. At 300 DPI that's about…",
        options: ["32 mm", "217 mm", "300 mm", "2,560 mm"],
        answer: 1,
        why: "2,560 ÷ 300 × 25.4 ≈ 217 mm: a good size for a tote.",
      },
      {
        q: "Lumi and the logo touch on your tote. Which rule is broken?",
        options: ["Flat colour", "Clear space", "Crisp pixels", "None: touching is fine"],
        answer: 1,
        why: "The logo needs empty space around it, at least as wide as the star.",
      },
    ],
    badge: { id: "wear-wizard", name: "Wear Wizard", icon: "🧢" },
  },
  {
    day: 10,
    room: 4,
    title: "Mug Wrap + Bottle",
    goal: "Design a seamless Lumia pattern and a mug wrap that stays clear of the handle.",
    videos: [
      { id: "N_cuT0hvmhI", title: "How to Create a Seamless Repeating Pattern - Passive Income Idea | Figma Tutorial", channel: "Kari Artspace", min: 7, start: 0, end: null, note: "" },
      { id: "iHxzvUmR0jI", title: "Creating the Mug Template", channel: "The Printful", min: 1, start: 0, end: null, note: "An old video, but it shows how a mug wrap works." },
    ],
    flavor: {
      prompt: "Pick your pattern's mood",
      options: [
        { label: "🌙 Starry night", fill: "starry-night" },
        { label: "🟨 Pixel party", fill: "pixel-party" },
        { label: "🍯 Calm amber", fill: "calm amber" },
      ],
    },
    task: {
      tool: "Claude Design + Figma",
      steps: [
        CLAUDE,
        "Ask Claude Design for 3 {flavor} pattern ideas using only the Lumia star, small pixel squares and Lumia's colours.",
        "In Figma, rebuild your favourite as a 600 × 600 px tile that repeats seamlessly: anything that sticks out of one edge comes back in on the opposite edge.",
        "Mug wrap: a 2362 × 1004 px frame (200 × 85 mm). Fill it with your pattern, put the wide logo on the side facing the drinker, and keep 10 mm (118 px) clear where the handle goes.",
        "Bottle label: 220 × 70 mm (2598 × 827 px) with the same pattern and the star. Export both as PNG.",
      ],
      deliverable: "Mug wrap + bottle label (PNG)",
    },
    quiz: [
      {
        q: "A seamless tile means…",
        options: ["It has no colours in it", "Its edges match, so copies join with no visible line", "It's one big picture with no repeats", "It's sewn onto the mug"],
        answer: 1,
        why: "When the edges line up, the pattern can repeat forever without a seam.",
      },
      {
        q: "Why keep the art away from the handle?",
        options: ["Handles get too hot when the mug is full, and that heat would melt the ink", "The handle covers that strip, so art there gets hidden or cut", "The client doesn't like handles", "Ink can't stick to white"],
        answer: 1,
        why: "That strip is hidden by the handle, so important art there would be lost.",
      },
      {
        q: "Mug templates…",
        options: ["Are always exactly 200 × 85 mm", "Differ between shops, so you ask for theirs", "Don't exist: you guess the size", "Are the same as tee sizes"],
        answer: 1,
        why: "Mugs come in many sizes. The shop's own template is the one to trust.",
      },
      {
        q: "Which pattern follows the client's rules?",
        options: ["Stars with a rainbow gradient", "Small flat amber stars on ink", "Lumi recoloured blue", "LUMIA retyped in a comic font"],
        answer: 1,
        why: "Flat brand colours, the real star, and no retyped name: on brand.",
      },
      {
        q: "Who turns the AI pattern idea into the real print file?",
        options: ["Claude Design, automatically", "The mug shop", "You, in Figma", "Nobody: the idea is enough"],
        answer: 2,
        why: "The idea is a sketch. The tile and the exact wrap size are built in Figma.",
      },
    ],
    badge: { id: "pattern-pilot", name: "Pattern Pilot", icon: "☕" },
  },
  {
    day: 11,
    room: 4,
    title: "Notebook, Bookmark, Bag Tag",
    goal: "Design a matching school set with components, so one change updates everything.",
    videos: [
      { id: "JQkq-zsVDi0", title: "DIY bookmark tutorial in Canva | How to design a bookmark", channel: "Wallifyer", min: 8, start: 0, end: null, note: "Made in Canva; the layout ideas work the same in Figma." },
    ],
    flavor: {
      prompt: "Pick your set's hero",
      options: [
        { label: "👋 Lumi waving", fill: "Lumi waving" },
        { label: "💡 Lumi's aha!", fill: "Lumi's aha! face" },
        { label: "⭐ The star", fill: "the Lumia star" },
      ],
    },
    task: {
      tool: "Figma",
      steps: [
        "Make three frames: Notebook cover A5 (148 × 210 mm = 1748 × 2480 px), Bookmark 50 × 180 mm (591 × 2126 px), and Bag tag 55 × 85 mm (650 × 1004 px).",
        "Build a Header component (the logo plus a strip of your mug pattern) and use an instance of it on all three.",
        "Put {flavor} on each item, from your Lumi Poses components.",
        "Add 3 mm of bleed to each and a round hole on the bag tag. Change the main Header once and watch all three update.",
        "Export all three as PNG and PDF.",
      ],
      deliverable: "School set (PNG + PDF)",
    },
    quiz: [
      {
        q: "You change the main component's colour. Its instances…",
        options: ["Stay the same forever", "Update too", "Get deleted", "Turn grey until you save"],
        answer: 1,
        why: "That's the magic of components: change the main one and every copy follows.",
      },
      {
        q: "A5 is…",
        options: ["100 × 100 mm", "148 × 210 mm", "210 × 297 mm", "50 × 180 mm"],
        answer: 1,
        why: "A5 is half of an A4 sheet: 148 × 210 mm.",
      },
      {
        q: "What makes a set look professional?",
        options: ["Each item uses a different style", "Repeating the same colours, logo and pattern", "Using every font you have", "Making it cost more"],
        answer: 1,
        why: "Repetition makes separate items look like one family.",
      },
      {
        q: "Where does a bag tag's hole go?",
        options: ["Right through the logo", "Away from the art, inside the cut line", "Outside the tag", "Anywhere: holes don't need planning"],
        answer: 1,
        why: "A hole through the logo or too close to the edge ruins the tag.",
      },
      {
        q: "148 mm at 300 DPI is about…",
        options: ["148 px", "444 px", "1,748 px", "4,440 px"],
        answer: 2,
        why: "148 ÷ 25.4 × 300 ≈ 1,748 px.",
      },
    ],
    badge: { id: "set-sensei", name: "Set Sensei", icon: "📓" },
  },
  {
    day: 12,
    room: 5,
    title: "Plush Concept",
    goal: "Plan a Lumi plush with a front, side and back turnaround sheet.",
    videos: [
      { id: "GuWAhysR1qY", title: "How to draw CHARACTER TURNAROUNDS (The EASY WAY)", channel: "Joshua  Adeoye", min: 5, start: 0, end: null, note: "" },
      { id: "ZWWBjcH3q2M", title: "Plush Pattern Basics: From Drawing to 3D", channel: "The Plushie Class", min: 14, start: 0, end: null, note: "Mentions a paid class at the end; you don't need it." },
    ],
    flavor: {
      prompt: "Pick the plush's size",
      options: [
        { label: "🤏 Keychain (10 cm)", fill: "a 10 cm keychain" },
        { label: "🧸 Hug size (25 cm)", fill: "a 25 cm hug-size" },
        { label: "🛏️ Pillow (40 cm)", fill: "a 40 cm pillow" },
      ],
    },
    task: {
      tool: "Claude Design + Figma",
      steps: [
        CLAUDE,
        "Upload Lumi's poses and ask: “Turn this pixel character into {flavor} plush concept: front, side and back views, soft rounded shapes, the same colours.”",
        "Keep what makes Lumi Lumi: the cream body, the gold star above its head, the dark eyes. Use comments until the three views match.",
        "In Figma, make a 1920 × 1080 Plush Concept frame: the three views in a row, a Lumi pose for reference, and notes with arrows (felt star, embroidered eyes, fabric colours as hex codes).",
        "Export as PNG.",
      ],
      deliverable: "Plush turnaround sheet (PNG)",
    },
    quiz: [
      {
        q: "A turnaround sheet shows…",
        options: ["Three different characters", "The same character from the front, side and back", "A repeating pattern tile", "The price of each part"],
        answer: 1,
        why: "The maker needs every side to sew a 3D toy from a flat drawing.",
      },
      {
        q: "Why embroidered eyes on a plush for young kids?",
        options: ["Embroidery glows at night", "There are no small hard parts that could come off", "Buttons are hard to draw", "Buttons would make the plush too heavy for a young kid to carry around"],
        answer: 1,
        why: "Small hard parts can come loose, so toys for young kids use stitched details.",
      },
      {
        q: "Which detail must stay the same to keep Lumi recognisable?",
        options: ["The background colour", "The gold star above its head", "The pixel size", "The file name"],
        answer: 1,
        why: "The star is part of Lumi's silhouette. Without it, it's just a ghost.",
      },
      {
        q: "Why is the plush a concept only?",
        options: ["Plush toys can't be designed in Figma", "A custom plush sample costs hundreds of euros", "Lumi is too small to sew", "It breaks the brand rule that Lumi can only ever appear as pixel art"],
        answer: 1,
        why: "Samples are expensive, so the concept sheet is the right first step.",
      },
      {
        q: "On the sheet you write #e9d9b8 next to the body. That's…",
        options: ["A size in millimetres", "The exact fabric colour, so the maker can match it", "The price in dinars", "A pose name"],
        answer: 1,
        why: "Hex codes tell the maker exactly which colour you mean.",
      },
    ],
    badge: { id: "plush-planner", name: "Plush Planner", icon: "🧸" },
  },
  {
    day: 13,
    room: 5,
    title: "Welcome Kit",
    goal: "Design a welcome box, a hang tag and a thank-you card for new Lumia heroes.",
    videos: [
      { id: "37C5J6pVJvA", title: "How to Design on a Mailer Box Dieline | Packaging Design 101", channel: "PackMojo", min: 9, start: 0, end: null, note: "" },
      { id: "1ynIX1pBGxs", title: "SMALL BUSINESS TIP - DIY Thank You & Backing Cards With Canva or Procreate", channel: "OMDO Studio (om-doe)", min: 10, start: 0, end: null, note: "" },
    ],
    flavor: {
      prompt: "Pick your kit's opening line",
      options: [
        { label: "⚔️ Welcome, hero.", fill: "“Welcome, hero.”" },
        { label: "🌟 Your adventure starts here.", fill: "“Your adventure starts here.”" },
        { label: "🗝️ The dungeon awaits.", fill: "“The dungeon awaits.”" },
      ],
    },
    task: {
      tool: "Claude Design + Figma",
      steps: [
        CLAUDE,
        "Ask Claude Design for 3 packaging looks for a small Lumia welcome box, using the logo file, amber and ink, and the line {flavor}.",
        "In Figma, draw the box dieline: a 100 × 100 × 40 mm box unfolded flat (lid, 4 sides, glue flaps). Cut lines solid, fold lines dashed.",
        "Put the stacked logo in the middle of the lid and your pattern on the sides, with 3 mm of bleed.",
        "Make a hang tag (50 × 90 mm) and a thank-you card (A6) in the same style. Export everything as PDF.",
      ],
      deliverable: "Box dieline + hang tag + card (PDF)",
    },
    quiz: [
      {
        q: "On a dieline, dashed lines usually mean…",
        options: ["Cut here", "Fold here", "Glue here", "Print gold here"],
        answer: 1,
        why: "Solid lines are cuts and dashed lines are folds: a shared language with box makers.",
      },
      {
        q: "A dieline is…",
        options: ["A 3D picture of the box", "The box unfolded flat, with cut and fold lines", "A font for packaging", "A mug template"],
        answer: 1,
        why: "It's the flat map that gets printed, cut and folded into a box.",
      },
      {
        q: "Glue flaps are there to…",
        options: ["Hold the logo in place", "Hold the box together once it's folded", "Make the box lighter", "Show the price"],
        answer: 1,
        why: "Flaps tuck or glue under the sides so the box keeps its shape.",
      },
      {
        q: "The thank-you card says “Thanks for learning with Lumia!” What's off?",
        options: ["Nothing at all", "Lumia's kids' copy avoids “learning” words", "Cards can't have text", "It needs a gradient behind the words so the text is easier to read"],
        answer: 1,
        why: "Kids' copy talks about the world and adventures, like “Welcome, hero.”",
      },
      {
        q: "Why do the box, tag and card share colours and pattern?",
        options: ["It saves paper", "Opening it feels like one brand", "Printers require it", "So nobody reads the card"],
        answer: 1,
        why: "Unboxing is part of the merch. Matching pieces make it feel special and official.",
      },
    ],
    badge: { id: "unboxing-ace", name: "Unboxing Ace", icon: "🎁" },
  },
  {
    day: 14,
    room: 6,
    title: "Mockups + Lookbook",
    goal: "Show your Lumia collection on mockups and in a lookbook.",
    videos: [
      { id: "r9DTEdr2QUk", title: "How to make mockups in Figma?", channel: "Artboard Studio", min: 4, start: 0, end: null, note: "" },
      { id: "l_Aa5uDG1aI", title: "Design a Stunning Fashion Lookbook in Canva: Step by Step Guide for Beginners", channel: "Genius Junkie", min: 4, start: 0, end: null, note: "Made in Canva: watch for how the pages are laid out." },
    ],
    flavor: {
      prompt: "Pick your lookbook's cover",
      options: [
        { label: "🌙 Ink night", fill: "an ink-night" },
        { label: "✨ Amber glow", fill: "an amber" },
        { label: "📸 Photo wall", fill: "a photo-wall" },
      ],
    },
    task: {
      tool: "Figma + Claude Design",
      steps: [
        "In Figma, make a Collection board: put each design on a simple mockup (tee, mug, tote, sticker sheet) using flat shapes and the Multiply blend mode.",
        "Line them up with even spacing, and label each one in your Label style.",
        CLAUDE,
        "Upload the board and ask for a 6-page lookbook with {flavor} cover using the logo-with-tagline file: cover, the whole collection, 3 close-ups, and a closing page.",
        "Check every page against the client's rules, fix anything that's off, and export the lookbook as PDF.",
      ],
      deliverable: "Collection board + lookbook PDF",
    },
    quiz: [
      {
        q: "A mockup is…",
        options: ["The final print file", "A picture of how the product will look, made before printing", "A cheap copy of someone else's design, made to look like your own work", "A receipt from the shop"],
        answer: 1,
        why: "Mockups help everyone imagine the product before anything is printed.",
      },
      {
        q: "Why use the same spacing and labels on every page?",
        options: ["PDF export needs it", "Consistency makes the collection look professional", "It uses fewer colours", "It's random"],
        answer: 1,
        why: "A tidy, repeated layout lets the designs be the stars.",
      },
      {
        q: "Multiply on a tee mockup…",
        options: ["Doubles the price", "Lets the fabric's shadows show through the print", "Makes the print vanish", "Copies the layer five times so the print looks thicker and brighter"],
        answer: 1,
        why: "Multiply blends the print into the fabric so folds and shadows look real.",
      },
      {
        q: "Is the lookbook the file you send to the printer?",
        options: ["Yes, always", "No: printers need the real print files", "Only for mugs", "Only if it's a PDF"],
        answer: 1,
        why: "The lookbook shows the collection. Each product still needs its own print file.",
      },
      {
        q: "The logo-with-tagline file is best for…",
        options: ["Tiny bag tags", "Covers, like the lookbook's first page", "Inside a sticker's white border", "Behind a mug's handle"],
        answer: 1,
        why: "The tagline version is the biggest lockup, made for title spots like covers.",
      },
    ],
    badge: { id: "lookbook-legend", name: "Lookbook Legend", icon: "📸" },
  },
  {
    day: 15,
    room: 6,
    title: "Print Hand-off",
    goal: "Package 3–5 print-ready files and write the email that gets them printed.",
    videos: [
      { id: "zN07nHnO4rk", title: "Design for Print in Figma (Quick Guide: Bleed, Crop & Export)", channel: "MBD Studio Design", min: 4, start: 0, end: null, note: "" },
      { id: "X0XKgRTn294", title: "What is Print for Figma? - Export Print-Ready PDFs in Seconds", channel: "Plugcamp", min: 2, start: 0, end: null, note: "A free plugin for bleed and CMYK, handy if a shop asks for CMYK." },
    ],
    flavor: {
      prompt: "Pick your first print",
      options: [
        { label: "👕 The tee", fill: "the tee" },
        { label: "✨ The sticker sheet", fill: "the sticker sheet" },
        { label: "🛍️ The tote", fill: "the tote" },
      ],
    },
    task: {
      tool: "Figma",
      steps: [
        "Pick 3–5 items to print, starting with {flavor}. The pin, patch and plush stay concepts.",
        "Check each file: 300 DPI at real size, transparent PNG or PDF, text flattened, 3 mm of bleed on anything that's cut, the logo flat and with clear space.",
        "Export them into a folder called PRINT_READY, with names like lumia-tee-chest-amber_45mm.png.",
        "Write a short email for your grown-up to send to the print shop: what you'd like printed, the sizes in mm, how many, and “Could you send me your file specs?”",
        "Show your grown-up the folder and the email. They approve it, send it, and place the order.",
      ],
      deliverable: "PRINT_READY folder + spec-request email",
    },
    quiz: [
      {
        q: "Which file is print-ready?",
        options: ["A screenshot of the mockup", "A 300-DPI transparent PNG at real size, with flattened text", "A 72-DPI JPG copied from the lookbook, since it already has every design", "A link to the Figma file"],
        answer: 1,
        why: "Real size, enough pixels, no background box and no fonts to go missing.",
      },
      {
        q: "Why ask the shop for their specs?",
        options: ["To make them work faster", "Every shop has its own sizes and file rules", "It's only to be polite", "Shops don't actually need files, since they redraw every design by hand"],
        answer: 1,
        why: "Universal specs get you close. The shop's own rules get it exactly right.",
      },
      {
        q: "The name lumia-tee-chest-amber_45mm.png tells the shop…",
        options: ["Nothing useful", "What it is, its colour and its print size", "The price", "Your password"],
        answer: 1,
        why: "Clear file names prevent mix-ups, like an ink logo going onto a black shirt.",
      },
      {
        q: "Why print at a shop at home instead of one abroad?",
        options: ["Shops abroad can't print logos", "No customs fees, and it's faster", "Local shops only print stickers", "It's the law that merch must be printed in the country where it's sold"],
        answer: 1,
        why: "Packages from outside the country can add taxes and fees, and take longer.",
      },
      {
        q: "Who gives the final OK before the order?",
        options: ["The print shop", "Your grown-up, the client", "Claude Design", "Nobody needs to"],
        answer: 1,
        why: "Clients approve before anything is made. That's how real design jobs work.",
      },
    ],
    badge: { id: "drop-day", name: "Drop Day", icon: "🚀" },
  },
];
