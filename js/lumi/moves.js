// Lumi's moods and moves. A mood is a face plus a way of moving (EMO); an action is a timed thing Lumi does
// (wave, enter, exit, talk, point, spin, dance, fly). Compose them with add() and hand the result to <Lumi pose>:
//   pose={add(emotions(t, [[0, "neutral"], [1.2, "surprised"], [2.4, "happy"]]), talk(t, [[2.6, 4]]))}
// Lumi is a cheerful sidekick: it reacts and cheers, the kid or hero always solves the math.
// The acting is key poses with holds (keyed), read with overlap: the eyes lead, the body follows, the arms and the
// star settle last. Frame counts behind the timings are in the skill's animation guide (rule 4).
// Night Studio copy of Lumia_marketing/video/src/characters/lumi/moves.ts: types removed, star-to-logo removed
// (it turns the star into the Lumia logo); everything else unchanged.
import { add, backOut, beat, ease, easeOut, hash, jump, keyed, makeEmotions, overlap, pulse, seg, wob } from "./kit.js";
import { TINTS } from "./art.js";

const hop = (t, h) => -h * Math.abs(Math.sin(beat(t) * Math.PI)); // one small hop per beat (0.5 s)
const acted = (keys, loop = 0) => (t) => overlap((u) => keyed(u, keys, loop), t);

// ---------- the acting, as key poses (seconds; loops end on their first pose) ----------
// think: eyes up and aside, hand on cheek; a small "hmm" tilt, a moving hold, a glance the other way, and back.
const THINK = [
  [0, { lookX: 0.8, lookY: -0.8, rot: 0.03, armR: "cheek" }],
  [0.3, { lookX: 1, lookY: -1, rot: 0.07, dy: -0.6, armR: "cheek", turnR: 0.06 }, backOut],
  [1.7, { lookX: 0.9, lookY: -1, rot: 0.06, dy: -0.4, armR: "cheek", turnR: 0.05 }],
  [2, { lookX: 0.3, lookY: -1, rot: 0.02, armR: "cheek" }],
  [3.7, { lookX: 0.4, lookY: -0.9, rot: 0.02, armR: "cheek" }],
  [4, { lookX: 0.8, lookY: -0.8, rot: 0.03, armR: "cheek" }],
];
// aha: the star lights first, then the right arm shoots up ("got it!") and settles high.
const AHA = [
  [0, { armR: "wave", turnR: -0.1 }],
  [0.15, { armR: "wave", turnR: 0.35 }, backOut],
  [0.5, { armR: "wave", turnR: 0.25 }],
];
// correct: arms down in the crouch, both up at take-off and held through the hop, a dip on landing, a cheer pump.
const CORRECT = [
  [0, { armR: "rest", armL: "rest", turnR: -0.15, turnL: -0.15 }],
  [0.2, { armR: "rest", armL: "rest", turnR: -0.2, turnL: -0.2 }],
  [0.3, { armR: "wave", armL: "wave", turnR: 0.3, turnL: 0.3 }, backOut],
  [0.62, { armR: "wave", armL: "wave", turnR: 0.25, turnL: 0.25 }],
  [0.72, { armR: "wave", armL: "wave", turnR: 0.05, turnL: 0.05 }, easeOut],
  [0.9, { armR: "wave", armL: "wave", turnR: 0.3, turnL: 0.3 }, backOut],
  [1.1, { armR: "wave", armL: "wave", turnR: 0.15, turnL: 0.15 }],
];
// oops: a droop with the hand flying to the face, a moving hold, a small second slump.
const OOPS = [
  [0, { armR: "rest" }],
  [0.3, { sq: 0.08, dy: 2, rot: -0.05, armR: "cheek", turnR: 0.1 }, backOut],
  [0.9, { sq: 0.07, dy: 2, rot: -0.04, armR: "cheek", turnR: 0.04 }],
  [1.4, { sq: 0.07, dy: 2.4, rot: -0.05, armR: "cheek", turnR: 0.07 }],
];
// surprised: the hands fly up with the take, hold wide, then settle, still alert.
const SURPRISED = [
  [0, { armR: "wave", armL: "wave", turnR: 0.4, turnL: 0.4, sq: -0.12, dy: -2 }],
  [0.5, { armR: "wave", armL: "wave", turnR: 0.35, turnL: 0.35, sq: -0.1, dy: -2 }],
  [0.9, { armR: "wave", armL: "wave", turnR: 0.1, turnL: 0.05, sq: -0.06, dy: -1 }],
];
// sleepy: once a loop the head sinks as Lumi nods off (21 frames) and snaps back up (3 frames), eyes flying open.
const NOD = [
  [0, {}],
  [2.5, {}],
  [3.2, { dy: 2.5, rot: 0.06, squint: 0.5 }],
  [3.3, { dy: -0.8, rot: -0.03, squint: -0.5 }, backOut],
  [3.7, {}],
  [4, {}],
];
// sad: one sigh a loop, in over 10 frames and out over 20; the arms lift a little after the body.
const SIGH = [
  [0, {}],
  [1.8, {}],
  [2.13, { dy: -1.5, sq: -0.04, turnR: 0.1, turnL: 0.1 }],
  [2.8, {}],
  [4, {}],
];
// love: hands on cheeks, swaying side to side with a 20-frame hold on each side.
const SWAY = [
  [0, { rot: 0.07, dx: 1.5 }],
  [0.67, { rot: 0.07, dx: 1.5 }],
  [2, { rot: -0.07, dx: -1.5 }],
  [2.67, { rot: -0.07, dx: -1.5 }],
  [4, { rot: 0.07, dx: 1.5 }],
];

// body(t, age): t = shot time for loops, age = seconds since the mood began (one-shot reactions use age).
export const EMO = {
  neutral: { eyes: "normal", mouth: "smile", take: 0.3 },
  happy: {
    eyes: "happy", mouth: "grin", blush: 0.4, take: 0.6,
    // hops on the beat; the raised arm pumps 2 frames behind the hop
    body: (t) => ({ dy: hop(t, 2), sq: 0.06 * pulse(t), armR: "wave", turnR: 0.1 * Math.sin((beat(t) - 0.15) * Math.PI) }),
  },
  think: { eyes: "normal", mouth: "flat", emote: "dots", take: 0.4, body: acted(THINK, 4) },
  // The star is Lumi's light bulb.
  aha: {
    eyes: "shine", mouth: "grin", take: 0.8,
    body: (t, age) => add(acted(AHA)(age), { glow: 0.65 + 0.35 * Math.exp(-age * 3) + 0.1 * wob(t, 1), dy: hop(t, 1.5), sq: -0.05 }),
  },
  correct: {
    eyes: "happy", mouth: "grin", blush: 0.5, take: 0.3,
    body: (t, age) => add(jump(age, 0.22, 0.6, 12), acted(CORRECT)(age), { fx: { kind: "sparkles", age: age - 0.6 } }),
  },
  oops: {
    eyes: "squeeze", mouth: "wobble", emote: "sweat", take: 0.6, tint: { to: TINTS.pale, k: 0.12 },
    body: (t, age) => add(acted(OOPS)(age), { rot: 0.012 * wob(t, 2) }), // plus a nervous tremble
  },
  surprised: {
    eyes: "wide", mouth: "open", emote: "!", fade: true, take: 1,
    body: (t, age) => add(acted(SURPRISED)(age), { dy: hop(t, 0.6) }),
  },
  sleepy: {
    eyes: "sleepy", mouth: "o", emote: "zzz", take: 0.2,
    // Dozing: the eyes sink shut on each slow breath and half open again, and once a loop Lumi nods off.
    body: (t) => {
      const br = wob(t, 0.25);
      return add({ squint: 0.5 + 0.45 * Math.max(0, br), sq: 0.05 + 0.04 * br, rot: 0.05 * wob(t, 0.25, 0.25), dy: 1.5 + br, turnR: -0.1, turnL: -0.1 }, keyed(t, NOD, 4));
    },
  },
  sad: {
    eyes: "sad", squint: 0.15, mouth: "frown", emote: "tear", blush: -0.7, take: 0.3, tint: { to: TINTS.blue, k: 0.22 },
    body: (t) => add({ dy: 4, sq: 0.07 + 0.02 * wob(t, 0.25), lookY: 1, turnR: -0.2, turnL: -0.2 }, acted(SIGH, 4)(t)),
  },
  love: {
    eyes: "heart", mouth: "cat", emote: "hearts", blush: 1, take: 0.7, tint: { to: TINTS.rosy, k: 0.18 },
    body: (t) => add({ armR: "cheek", armL: "cheek", dy: hop(t, 1) }, keyed(t, SWAY, 4)),
  },
};
export const { feel, emotions } = makeEmotions(EMO);

// ---------- actions ----------
// Wave from t0: a wind-up, then three swings that shrink (100%, 85%, 70%) with a moving hold at each end, and a
// settle; the pattern repeats every 2 s. The body leans 2 frames behind the hand.
const WAVE = [
  [0, { turnR: 0 }],
  [0.27, { turnR: -0.22 }],
  [0.55, { turnR: 0.3 }, backOut],
  [0.75, { turnR: 0.28 }],
  [1.03, { turnR: -0.26 }],
  [1.23, { turnR: -0.24 }],
  [1.5, { turnR: 0.21 }],
  [1.7, { turnR: 0.19 }],
  [2, { turnR: 0 }],
];
export const wave = (t, t0 = 0) => {
  if (t < t0) return {};
  const u = t - t0, k = ease(seg(u, 0, 0.25));
  return { armR: "wave", turnR: k * (keyed(u, WAVE, 2).turnR ?? 0), rot: 0.12 * k * (keyed(u - 0.07, WAVE, 2).turnR ?? 0) };
};
// Pop in from a sparkle burst at t0 (invisible before), arms thrown up in a "ta-da" that settles after 0.8 s.
const TADA = [
  [0, { armR: "wave", armL: "wave", turnR: 0.35, turnL: 0.35 }],
  [0.6, { armR: "wave", armL: "wave", turnR: 0.3, turnL: 0.3 }],
  [0.8, { armR: "wave", armL: "wave", turnR: 0, turnL: 0 }],
];
export const enter = (t, t0 = 0) => {
  if (t < t0) return { grow: -1, fade: 1 };
  const a = t - t0;
  return add({ grow: backOut(seg(a, 0, 0.35)) - 1, squint: 1 - seg(a, 0.25, 0.4), fx: { kind: "sparkles", age: a } }, a < 0.8 ? acted(TADA)(a) : {});
};
// Squash, stretch up and vanish in a ring of puffs at t0 + 0.14 (no see-through fade, so GIFs stay clean).
export const exit = (t, t0 = 0) => {
  if (t < t0 - 0.15) return {};
  const a = t - t0;
  if (a < 0) return { sq: 0.15 * ease(seg(a, -0.15, 0)) };
  return { sq: -0.22 * seg(a, 0, 0.12), dy: -6 * easeOut(seg(a, 0, 0.14)), fade: a < 0.14 ? 0 : 1, squint: 1, fx: { kind: "puffs", age: a - 0.12 } };
};
// Mouth flaps inside [start, end] ranges, e.g. the word timings of a voiceover, 8 syllables a second. At the start
// of each range the right hand opens out in a small "presenting" gesture, 3 frames behind the first word.
export const talk = (t, ranges) => {
  for (const [a, b] of ranges) {
    if (t >= a && t < b) {
      const syl = Math.floor((t - a) * 8), g = t - a - 0.1;
      const hand = g > 0 && g < 0.9 ? { armR: "out", turnR: -0.42 + 0.12 * backOut(seg(g, 0, 0.25)) } : {}; // palm out, low
      return { talk: syl % 2 ? 0.1 : 0.35 + 0.65 * hash(syl + a * 7), ...hand };
    }
  }
  return {};
};
// Point at a target in screen px from t0 (with a little overshoot), and hold: the arm on that side swings to its
// nearest drawing, and the eyes get there first.
export const point = (t, t0, target) =>
  t < t0 ? {} : { aim: { ...target, k: backOut(seg(t, t0, t0 + 0.3)) } };

// Turn around once from t0 (1.1 s): a squash wind-up, a flip to the back, a short hold, a flip to the front with a
// little hop, a settle. spin narrows the figure on the pixel grid, so no pixel changes size.
const SPIN = [
  [0, {}],
  [0.2, { sq: 0.12 }],
  [0.47, { spin: 1, sq: -0.08, dy: -3, turnR: 0.25, turnL: 0.25 }],
  [0.6, { spin: 1, sq: -0.05, dy: -4, turnR: 0.25, turnL: 0.25 }],
  [0.87, { spin: 2, sq: -0.06, dy: -2, turnR: 0.1, turnL: 0.1 }],
  [1.1, { spin: 2 }, backOut],
];
export const spin = (t, t0 = 0) => (t < t0 ? {} : keyed(t - t0, SPIN));
// Dance on the 0.5 s beat: a hop with a squash on each landing, the arms up in turns, a lean that swaps every 2 beats.
export const dance = (t) => {
  const b = beat(t), n = Math.floor(b), ph = b - n, up = 0.15 + 0.25 * Math.sin(ph * Math.PI);
  return {
    dy: -3 * Math.sin(ph * Math.PI), sq: 0.12 * Math.exp(-ph * 10) - 0.05 * Math.sin(ph * Math.PI), rot: 0.06 * Math.sin((b * Math.PI) / 2),
    ...(n % 2 ? { armL: "wave", turnL: up } : { armR: "wave", turnR: up }),
  };
};
// Flying: lean into the direction of travel (dir = -1 left … 1 right), the leading arm reaching out, the other trailing
// low, a quick bob. In a reel, move <Lumi x y> along the path and add fly(t, dir).
export const fly = (t, dir) => ({
  rot: 0.14 * dir, dy: 1.5 * wob(t, 2), armR: "out", armL: "out",
  turnR: dir >= 0 ? 0.2 : -0.3, turnL: dir >= 0 ? -0.3 : 0.2,
});

// ---------- the move list (drives the model sheet and the exports) ----------
// Loops last exactly 4 s and every periodic term divides 4 s. One-shots start from neutral at 0.4 s and hold.
// key = the time of the pose used for stills. sfx = a suggested sound from public/sfx (reels add it with <Sfx>).

const once = (name) => (t) => emotions(t, [[0, "neutral"], [0.4, name]]);

export const MOVES = {
  idle: { len: 4, loop: true, key: 1, pose: () => ({}) },
  wave: { len: 4, loop: true, key: 0.55, pose: (t) => add(feel("happy", t), wave(t)) },
  enter: { len: 1.2, loop: false, key: 0.55, sfx: "sparkle.wav", pose: (t) => add(emotions(t, [[0, "neutral"], [0.55, "happy"]]), enter(t, 0.1)) },
  // a two-swing "bye" wave, then the poof
  exit: { len: 1.6, loop: false, key: 0.95, sfx: "whoosh.wav", pose: (t) => add(feel("happy", t), t < 0.85 ? wave(t, -0.27) : {}, exit(t, 0.85)) },
  think: { len: 4, loop: true, key: 1.3, sfx: "tick.wav", pose: (t) => feel("think", t) },
  // a thinking beat first, so the "got it" has something to answer
  aha: { len: 2.4, loop: false, key: 1.7, sfx: "chime.wav", pose: (t) => emotions(t, [[0, "neutral"], [0.3, "think"], [1.1, "aha"]]) },
  correct: { len: 1.8, loop: false, key: 0.81, sfx: "chime.wav", pose: once("correct") },
  oops: { len: 1.8, loop: false, key: 1, sfx: "clunk.wav", pose: once("oops") },
  surprised: { len: 1.6, loop: false, key: 0.7, sfx: "zap.wav", pose: once("surprised") },
  sleepy: { len: 4, loop: true, key: 1.5, pose: (t) => feel("sleepy", t) },
  sad: { len: 4, loop: true, key: 1, pose: (t) => feel("sad", t) },
  love: { len: 4, loop: true, key: 0.6, sfx: "sparkle.wav", pose: (t) => feel("love", t) },
  talk: { len: 4, loop: true, key: 0.6, pose: (t) => add(feel("neutral", t), talk(t, [[0.2, 1.7], [2.2, 3.7]])) },
  point: {
    len: 1.6, loop: false, key: 1.2, sfx: "whoosh.wav",
    pose: (t, at) => add(emotions(t, [[0, "neutral"], [0.4, "happy"]]), point(t, 0.4, { x: at.x + 70 * at.scale, y: at.y - 40 * at.scale })),
  },
  spin: { len: 1.6, loop: false, key: 0.65, sfx: "whoosh.wav", pose: (t) => add(feel("happy", t), spin(t, 0.3)) },
  dance: { len: 4, loop: true, key: 0.25, pose: (t) => add({ eyes: "happy", mouth: "grin", blush: 0.4 }, dance(t)) },
  // a small figure-8 in place: side to side every 4 s, up and down every 2 s, leaning into the way it's going
  fly: {
    len: 4, loop: true, key: 0.5, sfx: "whoosh.wav",
    pose: (t) => add({ eyes: "happy", mouth: "grin" }, fly(t, Math.cos((t * Math.PI) / 2)), { dx: 10 * Math.sin((t * Math.PI) / 2), dy: 4 * Math.sin(t * Math.PI) }),
  },
};
