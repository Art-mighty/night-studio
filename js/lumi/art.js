// Lumi, Lumia's mascot: a cream pixel ghost with a gold star. Cut-out puppet data for Lumi.tsx.
// Source: brand/characters/lumi/source.jpg (1280², a 12.8 px grid = 100×100 art px; Lumi is 69×91). Made with
//   python3 skills/lumia-character-animation/scripts/pixelate.py brand/characters/lumi/source.jpg --cell 12.8 \
//     --palette '<PAL below>' --cut star=24,0,39,12 --cut arm=58,43,68,62 --cut eyeL=26,31,33,40:c \
//     --cut eyeR=44,31,50,40:c --cut mouth=36,43,42,47:c --cut blushL=24,42,30,45:c --cut blushR=47,41,53,44:c
// then edited by hand: the star took its stem (row 13), the arm got a round shoulder that hides behind the body, the left
// stub was cut out of BODY (rows 49-69 repainted as the continuing rim) and the other arm poses were drawn (ARMS).
// Fix a pixel by editing its letter. Coordinates are art px from the top-left of BODY.
// Night Studio copy of Lumia_marketing/video/src/characters/lumi/art.ts: types removed, pixel data unchanged;
// SLOTS, SLOT_KEYS and STARS are added at the end.
import { sprite } from "./kit.js";

export const PAL = {
  o: "#0b0a20", // outline, pupils
  e: "#2e3354", // eye blue
  m: "#7f85a2", // eye mid
  s: "#9ca1b4", // eye glint edge
  d: "#ba8130", // dark gold
  g: "#e0b05b", // gold
  y: "#fcd173", // yellow rim, star
  l: "#fde895", // light rim
  p: "#fef5b4", // pale rim, star light
  c: "#e9d9b8", // cream body
  h: "#fdf5e1", // highlight, eye glint
  b: "#e8af7e", // blush
  t: "#e5866d", // tongue
};
// Letters that belong to the body and the star, so tints (moods) and glow change them. Outline and eyes stay.
export const TINTED = "cdghlpy";
export const TINTS = { blue: "#a3bde6", rosy: "#f6b3c3", gold: "#ffd35c", pale: "#fffbf2" };
export const STAR_LIGHT = "#fffbe0";

// Anchors in art px. ground = the point under the tail that <Lumi x y> places.
export const AT = {
  ground: [34, 91], centre: [34, 52],
  starAt: [24, 0], starCentre: [32, 7],
  eyeL: [30, 36], eyeR: [47.5, 36], mouth: [39.5, 45.5], blushL: [24, 42], blushR: [47, 41],
  emote: [58, 17], dots: [50, 15], sweat: [7, 31], tear: [29, 42], bubble: [13, 24],
};

export const BODY = sprite([
  ".....................................................................",
  ".....................................................................",
  ".....................................................................",
  ".....................................................................",
  ".....................................................................",
  ".....................................................................",
  ".....................................................................",
  ".....................................................................",
  ".....................................................................",
  ".....................................................................",
  ".....................................................................",
  ".....................................................................",
  ".....................................................................",
  ".........................oooooooooooo................................",
  "......................ooooooooddddoooooo.............................",
  "....................ooooolpppppddpppyooooo...........................",
  "..................oooopppyyyyyyyyyyypppyoooo.........................",
  ".................ooollyyyyyyyccccccccccppyooo........................",
  "...............ooollyyyyyycccccccccccccccppyooo......................",
  "..............oollgyyyyycccccccccccccccccccppyoo.....................",
  ".............oollgggyyccccccccccccccchhhhhcccpyoo....................",
  "............oollgggggccccccccccccccchhhhhhhhccpyoo...................",
  "...........oollgggggcccccccccccccccchhhhhhhhhccpyoo..................",
  "..........oollgggggccccccccccccccccchhhhhhhhhhccpyoo.................",
  "..........oglgggggccccccccccccccccccchhhhhhhhhcccpyo.................",
  ".........oolgggggccccccccccccccccccccchhhhhhhhccccpoo................",
  "........oolggggggcccccccccccccccccccccccchhhhcccccpyoo...............",
  "........oolgggggcccccccccccccccccccccccccccccccccccpoo...............",
  ".......oolggggggcccccccccccccccccccccccccccccccccccpyoo..............",
  ".......oolgggggcccccccccccccccccccccccccccccccccccccpoo..............",
  "......oolggggggcccccccccccccccccccccccccccccccccccccpyoo.............",
  "......oolgggggcccccccccccccccccccccccccccccccccccccccpoo.............",
  "......oglgggggcccccccccccccccccccccccccccccccccccccccpyo.............",
  ".....oolggggggcccccccccccccccccccccccccccccccccccccccpyoo............",
  ".....oolgggggcccccccccccccccccccccccccccccccccccccccccpoo............",
  ".....oolgggggcccccccccccccccccccccccccccccccccccccccccpoo............",
  ".....oolgggggcccccccccccccccccccccccccccccccccccccccccpyo............",
  ".....oglgggggcccccccccccccccccccccccccccccccccccccccccpyo............",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolgggggcccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....oolggggggccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....ooldgggggccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....ooyddggggccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....ooydddgggccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....ooyddddggccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....ooydddddgccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....ooydddddgccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....ooyddddggccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....ooyddddggccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "....odyddddggccccccccccccccccccccccccccccccccccccccccccpdo...........",
  "...ooyydddggggcccccccccccccccccccccccccccccccccccccccccpdo...........",
  "...ooyddddggggcccccccccccccccccccccccccccccccccccccccccpdo...........",
  "...ooyddddggggcccccccccccccgccccccccccccccccgccccccccccpoo...........",
  "...odydddgggggccccccccccccgggccccccccccccccgggcccccccccpoo...........",
  "..ooyddddggggggccccccccccggggccccccccccccccgggccccccccgpoo...........",
  "..ooyddddggddggccccccccccgggggccccccccccccgggggcccccccgpoo...........",
  "..ooydddddddddggccccccccggddggccccccccccccggdggccccccglyoo...........",
  "..ooydddddddoddgcccccccggddddggcccccccccccgdodggcccccgloo............",
  "..oodydddddooodggcccccggddoodggccccccccccgdooodggcccggloo............",
  "...oodyyydoooodgggcccgggdoooddggcccccccccgdooodggggggldoo............",
  "....ooooooo..oddgggggggddo.oodgggcccccccgdoo.oodggggldoo.............",
  ".....ooooo...oodggggggddoo..oddgggcccccggdo...oodllldoo..............",
  "..............oddggggddoo...ooddggggggggdoo....ooooooo...............",
  "..............ooddddddoo.....ooddggggggdoo......ooooo................",
  "...............oooooooo.......oodddddddoo............................",
  "................oooooo.........ooooooooo.............................",
  "................................ooooooo..............................",
]);

// Arms are drawings. Each arm shows one of its drawings (pose armR / armL), turned at most about 25° for in-betweens
// (turnR / turnL). at = where the drawing's top-left sits in BODY coordinates, pivot = the shoulder it turns around,
// tip = its drawn direction (drawings with a tip can point: <Lumi> picks the one nearest the target), front = painted
// over the body (hand on cheek) instead of behind it. Roots are round and flat on the pivot, so turning never opens a
// gap. The left arm's drawings mirror the right's without the highlight: it's on the shadow side.

export const ARMS = {
  R: {
    // relaxed at the side, mirroring the left stub (neutral, talk, sad, sleepy)
    rest: {
      s: sprite([
        "....cggo........",
        "....ccggo.......",
        "...ccccgoooo....",
        "...cccccgooo....",
        "..ccccccggoo....",
        "..cccccccgoo....",
        ".cccccccccgoo...",
        ".cccccccccggo...",
        "ggcccccccccgoo..",
        "gdgccccccccggo..",
        "dddgccccccccgoo.",
        "doddgcccccccgdo.",
        ".ooddgccccccggoo",
        ".dooddgcccccggoo",
        ".ddooddggccgggoo",
        "..ddooddgggggdoo",
        "..dddooddddddoo.",
        "..gdd.oooooooo..",
        "........ooooo...",
      ]),
      at: [46, 51], pivot: [51, 56], tip: [59, 65], front: true,
    },
    // the source's raised arm: waves, cheers (with the other arm up too), points up
    wave: {
      s: sprite([
        "..........oooo...",
        "........ooooooo..",
        ".......ooogcccoo.",
        "......oogcchhcgoo",
        "......ogcchhhcgoo",
        "......gcchhcccgoo",
        "......cccccccggoo",
        ".....occcccccgdoo",
        "...oocccccccggoo.",
        ".oocccccccccgdoo.",
        ".occccgccccgdoo..",
        "occcccgcccgddo...",
        "occcccgccgddoo...",
        "ccccccgcgddoo....",
        "ccccccddddoo.....",
        "ccccccdddoo......",
        "occcccddoo.......",
        "occcccdoo........",
        ".occccoo.........",
        ".ooccco..........",
        "...ooc...........",
        ".....o...........",
      ]),
      at: [52, 43], pivot: [58, 57], tip: [64, 44],
    },
    // straight out: points, presents, flies
    out: {
      s: sprite([
        "cccccoooooooooooo....",
        "cccccccccccccccccoo..",
        "cccccccccccchhhcccco.",
        "ccccccccccchhhhhcccco",
        "cccccccccccchhhccccoo",
        "ccccccccccccccccccgoo",
        "cccccccccccccccccgdoo",
        "cccccggggggggggggdoo.",
        "cccccdddddddddddoo...",
        "cccccooooooooooo.....",
      ]),
      at: [52, 52], pivot: [58, 57], tip: [71, 56],
    },
    // hand on the cheek, over the body (love, oops, think)
    cheek: {
      s: sprite([
        "...oooo.....",
        "..occhho....",
        ".occhhhco...",
        ".occchccco..",
        ".ogcccccco..",
        ".ogccccccco.",
        "..ogccccccco",
        "..ogccccccco",
        "...ogccccpdo",
        "...ogccccpdo",
        "...odgcccpdo",
        "....odgccpdo",
        "....odgccpdo",
        ".....odgcpdo",
        ".....odgcpdo",
        "......odgpdo",
        "......odgpdo",
        ".......odpdo",
        ".......odpdo",
        "........opdo",
      ]),
      at: [46, 42], pivot: [56, 57], front: true,
    },
  },
  L: {
    // the source's left stub, cut out of BODY (it carries its shadow on the body)
    rest: {
      s: sprite([
        ".......d........",
        ".......d........",
        ".......doggc....",
        ".......oggcc....",
        "....oooogcccc...",
        "....ooogccccc...",
        "....ooggcccccc..",
        "....oogccccccc..",
        "...oogccccccccc.",
        "...oggccccccccc.",
        "..oogcccccccccgg",
        "..oggccccccccgdg",
        ".oogccccccccgddd",
        ".odgcccccccgddod",
        "ooggccccccgddoo.",
        "ooggcccccgddood.",
        "oogggccggddoodd.",
        "oodgggggddoodd..",
        ".ooddddddooddd..",
        "..oooooooo.ddg..",
        "...ooooo........",
      ]),
      at: [0, 49], pivot: [10, 56], tip: [2, 65], front: true,
    },
    wave: {
      s: sprite([
        "...oooo..........",
        "..ooooooo........",
        ".oocccgooo.......",
        "oogcccccgoo......",
        "oogccccccgo......",
        "oogcccccccg......",
        "ooggccccccc......",
        "oodgccccccco.....",
        ".ooggcccccccoo...",
        ".oodgcccccccccoo.",
        "..oodgccccgcccco.",
        "...oddgcccgccccco",
        "...ooddgccgccccco",
        "....ooddgcgcccccc",
        ".....ooddddcccccc",
        "......oodddcccccc",
        ".......ooddccccco",
        "........oodccccco",
        ".........oocccco.",
        "..........occcoo.",
        "...........coo...",
        "...........o.....",
      ]),
      at: [-7, 43], pivot: [3, 57], tip: [-3, 44],
    },
    out: {
      s: sprite([
        "....ooooooooooooccccc",
        "..ooccccccccccccccccc",
        ".occccccccccccccccccc",
        "occcccccccccccccccccc",
        "ooccccccccccccccccccc",
        "oogcccccccccccccccccc",
        "oodgccccccccccccccccc",
        ".oodggggggggggggccccc",
        "...oodddddddddddccccc",
        ".....oooooooooooccccc",
      ]),
      at: [-11, 52], pivot: [3, 57], tip: [-10, 56],
    },
    cheek: {
      s: sprite([
        ".....oooo...",
        "....occcco..",
        "...occcccco.",
        "..occccccco.",
        "..occccccgo.",
        ".occcccccgo.",
        "occcccccgo..",
        "occcccccgo..",
        "oolccccgo...",
        "oolccccgo...",
        "oolcccgdo...",
        "oolccgdo....",
        "oolccgdo....",
        "oolcgdo.....",
        "oolcgdo.....",
        "oolgdo......",
        "oolgdo......",
        "ooldo.......",
        "ooldo.......",
        "oolo........",
      ]),
      at: [4, 42], pivot: [5, 57], front: true,
    },
  },
};

// Includes its stem, which plugs into the head's top outline.
export const STAR = sprite([
  ".......dd.......",
  "......dddd......",
  "......dypd......",
  ".....ddyhdd.....",
  "....ddyyppdd....",
  "...ddgyyppydd...",
  ".dddyygyppphddd.",
  "ddyyyyyyppppppdd",
  "ddyyyyyyyyyyyydd",
  ".dddyyyyygyyddd.",
  "...ddgyyyggdd...",
  "....ddyyygdd....",
  ".....ddyydd.....",
  "......dyyd......",
]);

export const BLUSH = sprite([".bbbbb.", "bbbbbbb", "bbbbbbb", ".bbbbb."]);

// Eyes come in [left, right] pairs, drawn centred on AT.eyeL and AT.eyeR. normal is the source art.
// Half-closed eyes (sad, sleepy, blinks) are the open eyes with lids: see lidded() in ../kit.
export const EYES = {
  normal: [
    sprite([
      "..oooo..",
      ".oooomo.",
      "ooooshso",
      "oooohhso",
      "ooooomoo",
      "oooooooo",
      "oeeoooeo",
      "oheeeeeo",
      ".omeeeo.",
      "..oooo..",
    ]),
    sprite([
      "..ooo..",
      ".ooomo.",
      "oooshso",
      "ooohhso",
      "oooomoo",
      "ooooooo",
      "oeoooeo",
      "oheeeeo",
      ".oeeeo.",
      "..ooo..",
    ]),
  ],
  // aha: the source eyes with an extra sparkle
  shine: [
    sprite([
      "..oooo..",
      ".oooomo.",
      "ooooshso",
      "oooohhso",
      "ooooomoo",
      "oohooooo",
      "ohhhooeo",
      "ohheeeeo",
      ".omeeeo.",
      "..oooo..",
    ]),
    sprite([
      "..ooo..",
      ".ooomo.",
      "oooshso",
      "ooohhso",
      "oooomoo",
      "oohoooo",
      "ohhhoeo",
      "ohheeeo",
      ".oeeeo.",
      "..ooo..",
    ]),
  ],
  wide: [sprite(["..oooo..", ".ohhhho.", "ohhhhhho", "ohhoohho", "ohhoohho", "ohhhhhho", ".ohhhho.", "..oooo.."]), sprite(["..oooo..", ".ohhhho.", "ohhhhhho", "ohhoohho", "ohhoohho", "ohhhhhho", ".ohhhho.", "..oooo.."])],
  happy: [sprite(["..ooo..", ".oo.oo.", "oo...oo"]), sprite(["..ooo..", ".oo.oo.", "oo...oo"])],
  closed: [sprite(["o.....o", ".ooooo."]), sprite(["o.....o", ".ooooo."])],
  heart: [sprite([".oo.oo.", "ohtotto", "ottttto", ".ottto.", "..oto..", "...o..."]), sprite([".oo.oo.", "ohtotto", "ottttto", ".ottto.", "..oto..", "...o..."])],
  squeeze: [sprite(["oo....", ".ooo..", "...ooo", ".ooo..", "oo...."]), sprite(["....oo", "..ooo.", "ooo...", "..ooo.", "....oo"])],
};

// sad and sleepy are the source eyes under slanted lids (SLANT: rows the lid drops per column toward the outside).
EYES.sad = EYES.normal;
EYES.sleepy = EYES.normal;
export const SLANT = { sad: 0.7, sleepy: 0.3 };
// Eye types that can blink or take lids. The others are already closed or squeezed.
export const OPEN_EYES = ["normal", "shine", "wide", "heart", "sad", "sleepy"];

// Mouths are drawn centred on AT.mouth. smile is the source art.
export const MOUTHS = {
  smile: sprite([
    "ooooooo",
    "ooooooo",
    "otttooo",
    ".ottto.",
    "..ooo..",
  ]),
  grin: sprite(["ooooooooo", "ooooooooo", ".ootttoo.", "..ottto..", "...ooo..."]),
  open: sprite([".ooo.", "ooooo", "ooooo", "ottto", "ottto", ".ooo."]),
  o: sprite([".o.", "oto", ".o."]),
  flat: sprite(["ooooo"]),
  frown: sprite(["..ooo..", ".ooooo.", "oo...oo"]),
  wobble: sprite([".o.o.o.", "o.o.o.o"]),
  cat: sprite(["o..o..o", ".oo.oo."]),
};

// ---------- Night Studio additions ----------
// Where her designs sit on the body (art px from BODY's top-left). All three rectangles are on cream pixels, clear of
// the face and the resting arms. w × h is the size her picture is pixelated to (see js/images.js).
export const SLOTS = {
  belly: { x: 23, y: 51, w: 21, h: 18 }, // her sticker (Room 4), then her tee print (Room 5)
  pin: { x: 15, y: 47, w: 7, h: 7 }, // her enamel pin (Room 6)
  patch: { x: 15, y: 70, w: 9, h: 9, round: true }, // her patch (Room 6)
};
// The letters each slot's colours may use. Lumi's own palettes never use them.
export const SLOT_KEYS = { belly: "012345", pin: "6789", patch: "!#$%&*" };
// Star colours she can pick at the end of Room 1. Each maps the star's letters (d dark, g gold, y yellow, p pale,
// h highlight) to new shades; gold is the star as drawn.
export const STARS = {
  gold: null,
  rose: { d: "#b8456a", g: "#de6f93", y: "#f59ab5", p: "#fcd3e0", h: "#fff0f5" },
  mint: { d: "#2f8f6f", g: "#4fb893", y: "#7fdcb6", p: "#c7f3e2", h: "#f0fff9" },
  sky: { d: "#3a6fb0", g: "#5a93d6", y: "#8bbcf2", p: "#cfe4fb", h: "#f2f8ff" },
  lilac: { d: "#7453b0", g: "#9676d2", y: "#b9a0ec", p: "#e1d5fa", h: "#f7f2ff" },
  coral: { d: "#c2553a", g: "#e57a5c", y: "#fba486", p: "#fed6c8", h: "#fff3ee" },
};
