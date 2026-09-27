// Emotes and bursts: pixel marks that show a feeling or an event without words (the ! over a head, rising
// hearts, a sparkle burst). Any character can use them; each character decides where its anchors are.
// Every animation repeats every 2 s or less, so it loops cleanly inside a 4 s move.
// Night Studio copy of Lumia_marketing/video/src/characters/emotes.tsx: the stamps are unchanged; the React
// components became canvas functions (stamp, emote, burst) below.
import { backOut, easeOut, paint, seg, sprite, TAU, warp } from "./kit.js";

export const EMOTE_PAL = {
  k: "#0b0a20", w: "#fdf5e1", r: "#e04a5a", R: "#f7a1ad", y: "#ffd65a", Y: "#fff4b8", b: "#6fb7f0", B: "#d4f1ff",
};

export const STAMPS = {
  exclaim: sprite([
    ".kkk.",
    "kyyyk",
    "kyYyk",
    "kyyyk",
    "kyyyk",
    ".kyk.",
    ".kyk.",
    "..k..",
    ".kkk.",
    "kyyyk",
    ".kkk.",
  ]),
  question: sprite([
    "..kkkk..",
    ".kyYyyk.",
    "kyykkyyk",
    ".kk.kyyk",
    "...kyyk.",
    "..kyyk..",
    "..kyyk..",
    "..kkkk..",
    "........",
    "..kkkk..",
    "..kyyk..",
    "..kkkk..",
  ]),
  heart: sprite([
    ".kk.kk.",
    "kRrkrrk",
    "krrrrrk",
    ".krrrk.",
    "..krk..",
    "...k...",
  ]),
  z: sprite([
    "kkkkkk",
    "kwwwwk",
    "kkkwkk",
    ".kwkk.",
    "kwwwwk",
    "kkkkkk",
  ]),
  sweat: sprite([
    "..k..",
    ".kBk.",
    ".kbk.",
    "kBbbk",
    "kbbbk",
    "kbbbk",
    ".kkk.",
  ]),
  tear: sprite([
    ".k.",
    "kBk",
    "kbk",
    "kbk",
    ".k.",
  ]),
  sparkle: sprite([
    "...k...",
    "..kYk..",
    ".kkYkk.",
    "kYYwYYk",
    ".kkYkk.",
    "..kYk..",
    "...k...",
  ]),
  dot: sprite([
    ".kk.",
    "kwwk",
    "kwwk",
    ".kk.",
  ]),
  puff: sprite([
    "..kkk..",
    ".kwwwk.",
    "kwwwwwk",
    "kwwBwwk",
    ".kkkkk.",
  ]),
};

const frac = (x) => x - Math.floor(x);

// Night Studio: the React components below (Stamp, Emote, Burst) became plain functions that paint on a canvas.
// They draw in art px: the caller sets the canvas transform (move to the anchor, scale by the pixel size).

// One stamp anchored at its bottom centre, grown (k) and turned (rot) around that point on its own pixel grid, then
// drawn at whole art px: never scaled by the browser, so its pixels stay the character's size.
export const stamp = (ctx, s, x, y, k = 1, rot = 0) => {
  if (k <= 0.02) return;
  const at = { rows: s.rows, x: -Math.floor(s.w / 2), y: -s.h }, c = k * Math.cos(rot), n = k * Math.sin(rot);
  const g = Math.abs(k - 1) < 0.02 && Math.abs(rot) < 0.01 ? at : warp(at, [c, -n, n, c], [0, 0], true);
  paint(ctx, g.rows, EMOTE_PAL, Math.round(x) + g.x, Math.round(y) + g.y);
};

// kind: '!' '?' 'hearts' 'zzz' 'sweat' 'tear' 'dots' 'sparkle'. k = 0..1 presence (pops in with overshoot),
// age = seconds since it appeared, (x, y) = its anchor in the character's art px, dir = -1 drifts to the left.
export const emote = (ctx, kind, k, age, x, y, dir = 1) => {
  if (k <= 0) return;
  const pop = backOut(k);
  const three = (f) => [0, 1, 2].forEach((i) => f(i, frac(age / 2 + i / 3)));
  switch (kind) {
    case "!":
      return stamp(ctx, STAMPS.exclaim, x, y - 1.5 * Math.abs(Math.sin(age * TAU)), pop);
    case "?":
      return stamp(ctx, STAMPS.question, x, y, pop, 0.15 * Math.sin(age * Math.PI));
    case "hearts":
      return three((i, ph) =>
        stamp(ctx, STAMPS.heart, x + dir * 3 * Math.sin(ph * TAU + i), y - ph * 18, pop * Math.min(1, ph * 6) * (1 - seg(ph, 0.8, 1))),
      );
    case "zzz":
      return three((i, ph) =>
        stamp(ctx, STAMPS.z, x + dir * ph * 10, y - ph * 16, pop * (0.6 + 0.5 * ph) * Math.min(1, ph * 8) * (1 - seg(ph, 0.85, 1))),
      );
    case "sweat": {
      const ph = frac(age / 2);
      return stamp(ctx, STAMPS.sweat, x, y + ph * 6, pop * Math.min(1, ph * 8) * (1 - seg(ph, 0.85, 1)));
    }
    case "tear": {
      const ph = frac(age / 2);
      return stamp(ctx, STAMPS.tear, x, y + 10 * easeOut(seg(ph, 0.25, 0.9)), pop * Math.min(1, ph * 5) * (1 - seg(ph, 0.9, 1)));
    }
    case "dots":
      return [0, 1, 2].forEach((i) =>
        stamp(ctx, STAMPS.dot, x + dir * i * 5, y, pop * backOut(seg(frac(age / 2), 0.1 + i * 0.2, 0.2 + i * 0.2))),
      );
    case "sparkle":
      return stamp(ctx, STAMPS.sparkle, x, y, pop * (0.75 + 0.25 * Math.abs(Math.sin(age * TAU))));
    default:
      throw new Error(`unknown emote '${kind}'`);
  }
};

// Bursts around a centre (art px): 'sparkles' (enter, correct), 'puffs' (exit), 'rays' (a glowing star; amount = glow).
export const burst = (ctx, kind, age, x, y, r = 12, amount = 1) => {
  if (kind === "rays") {
    const len = Math.round(amount * 4);
    if (len < 1) return;
    for (let d = 0; d < 8; d++) {
      const ux = Math.round(Math.cos((d * TAU) / 8)), uy = Math.round(Math.sin((d * TAU) / 8));
      const r0 = d % 2 ? Math.round(r * 0.75) : r;
      for (let s = 0; s < len - (d % 2); s++) {
        ctx.fillStyle = s === 0 ? EMOTE_PAL.w : EMOTE_PAL.Y;
        ctx.fillRect(Math.round(x + ux * (r0 + s)), Math.round(y + uy * (r0 + s)), 1, 1);
      }
    }
    return;
  }
  if (age < 0 || age > 0.9) return;
  const s = kind === "puffs" ? STAMPS.puff : STAMPS.sparkle;
  const dist = r + (kind === "puffs" ? 18 : 26) * easeOut(age / 0.7);
  for (let i = 0; i < 8; i++) {
    const a = (i * TAU) / 8 + 0.2;
    stamp(ctx, s, x + Math.cos(a) * dist, y + Math.sin(a) * dist * 0.8, (1 - seg(age, 0.35, 0.8)) * Math.min(1, age * 12));
  }
};
