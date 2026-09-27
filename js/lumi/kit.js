// Character kit: motion math, poses, acted emotion changes and pixel-art drawing, shared by every
// character in src/characters/. See the lumia-character-animation skill.
// The motion math and the emotion system are ported from JohnHeibel/ClaudeAnimationBase@0ac8bf2
// (MIT, © 2026 John Heibel; see ./LICENSE-ClaudeAnimationBase).
// Everything is a pure function of t (seconds): no state survives between frames, no Math.random.
//
// Night Studio copy: this is Lumia_marketing/video/src/characters/kit.tsx with the TypeScript types removed.
// Three changes, each marked "Night Studio" below: the React drawing parts (Pixels, Bubble) became paint(), which
// draws on a <canvas>; sprite() no longer builds SVG paths; and Scale2x works on typed arrays with reused buffers,
// so a squashed or leaning Lumi costs about 1.5 ms a frame instead of stalling the page. The maths is unchanged.

// ---------- motion math ----------
export const TAU = Math.PI * 2;
// Named clip, not clamp: reels/kit.tsx exports clamp as interpolate options.
export const clip = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, k) => a + (b - a) * k;
export const seg = (t, a, b) => clip((t - a) / (b - a)); // 0..1 progress of t through [a, b]
export const ease = (x) => { x = clip(x); return x * x * (3 - 2 * x); };
export const easeIn = (x) => Math.pow(clip(x), 3);
export const easeOut = (x) => 1 - Math.pow(1 - clip(x), 3);
export const backOut = (x) => { x = clip(x); const s = 1.9; return 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2); };
export const wob = (t, hz = 1, ph = 0) => Math.sin((t * hz + ph) * TAU);
export const hash = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
// Damped wobble kicked at t0: 0 before, then a wobble that dies away (secondary motion, settles).
// The kit calls it spring; renamed so it isn't confused with Remotion's 0→1 spring().
export const wobble = (t, t0, k = 6, w = 18) => (t < t0 ? 0 : Math.exp(-k * (t - t0)) * Math.sin(w * (t - t0)));
export const ring = (t, events, k = 6, w = 18) => events.reduce((s, e) => s + wobble(t, e, k, w), 0);
// Point on a thrown or jumping arc from p0 to p1, peaking h px above the straight line; k = 0..1 along the flight.
export const arcPt = (p0, p1, h, k) => [
  lerp(p0[0], p1[0], k),
  lerp(p0[1], p1[1], k) - h * 4 * k * (1 - k),
];
// Beats at 120 bpm by default: a 0.5 s beat divides the 4 s loops, so loops stay seamless.
export const beat = (t, bpm = 120) => (t * bpm) / 60;
export const pulse = (t, bpm = 120, k = 6) => { const b = beat(t, bpm); return Math.exp(-(b - Math.floor(b)) * k); };
export const mixCol = (a, b, k) => {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const c = (i) => Math.round(lerp((pa >> i) & 255, (pb >> i) & 255, clip(k)));
  return "#" + ((1 << 24) + (c(16) << 16) + (c(8) << 8) + c(0)).toString(16).slice(1);
};

// ---------- poses ----------
// Every field is zero-neutral: missing means "as drawn". Distances are art pixels, angles radians.
/**
 * What a character does in one frame. Every field is optional.
 * @typedef {object} Pose
 * @property {number} [dx]      move right, art px
 * @property {number} [dy]      move down, art px (-dy = up)
 * @property {number} [rot]     lean around the ground point, + = clockwise
 * @property {number} [sq]      + squash, - stretch; keeps volume (sx = 1 + .6sq, sy = 1 - sq)
 * @property {number} [grow]    scale change around the body centre, -1 = gone
 * @property {number} [fade]    0 opaque … 1 invisible
 * @property {number} [spin]    turn around a vertical axis: 0 front, 0.5 edge-on, 1 back, 2 front again (width = |cos(π spin)|)
 * @property {string} [armR]    which drawing each arm shows (the character's ARMS); missing = "rest"
 * @property {string} [armL]
 * @property {number} [turnR]   extra turn of each arm from its drawing, radians, + = up; keep within about ±0.4
 * @property {number} [turnL]
 * @property {{x: number, y: number, k: number}} [aim]  screen px target: the arm on that side points at it, the eyes look; k = 0..1
 * @property {string} [eyes]
 * @property {string} [mouth]
 * @property {number} [lookX]   -1..1, moves the eyes one art pixel
 * @property {number} [lookY]
 * @property {number} [squint]  0..1 eyelids; ≥ .85 draws closed eyes
 * @property {number} [blush]   change from the drawn blush: -1 hides it, +1 doubles it
 * @property {number} [talk]    0..1 mouth opening, overrides mouth while > 0
 * @property {{to: string, k: number}} [tint]  body colours mix toward `to`
 * @property {number} [glow]    the star brightens and throws pixel rays
 * @property {number} [starDy]
 * @property {number} [starGrow]
 * @property {{kind: string, k: number, age: number}} [emote]
 * @property {{kind: string, age: number}} [fx]
 */
// The number fields emotions() blends between two moods.
const BLEND = ["dx", "dy", "rot", "sq", "spin", "turnR", "turnL", "lookX", "lookY", "glow", "starDy"];

// Combine poses: numbers add up, anything else is taken from the last pose that sets it.
export const add = (...poses) => {
  const o = {};
  for (const p of poses) {
    if (!p) continue;
    for (const [k, v] of Object.entries(p)) {
      if (v === undefined) continue;
      o[k] = typeof v === "number" && typeof o[k] === "number" ? o[k] + v : v;
    }
  }
  return o;
};

// A hop that takes off at t0 and lands at t1, h art px high: crouch, stretch, round at the top, squash on landing.
export const jump = (t, t0, t1, h = 10) => {
  if (t < t0 - 0.2) return {};
  if (t < t0) return { sq: 0.18 * ease(seg(t, t0 - 0.2, t0)) };
  if (t < t1) { const k = (t - t0) / (t1 - t0); return { dy: -h * 4 * k * (1 - k), sq: -0.16 * Math.abs(1 - 2 * k) }; }
  const a = t - t1;
  return { sq: 0.22 * Math.exp(-8 * a) * Math.cos(20 * a) };
};
// A surprise "take" peaking at t0: a squash wind-up (6 frames), then a big stretch up that springs back. amt scales it.
export const take = (t, t0, amt = 1) => {
  if (t < t0 - 0.2) return {};
  if (t < t0) return { sq: 0.12 * amt * ease(seg(t, t0 - 0.2, t0)) };
  const a = t - t0;
  return { sq: -0.26 * amt * Math.exp(-6 * a) * Math.cos(16 * a), dy: -7 * amt * Math.exp(-7 * a) * Math.max(0, Math.cos(9 * a)) };
};

// Pose-to-pose acting: key poses at times (s). Between two keys the numbers ease from one pose to the next with the
// arriving key's easing (default ease); a hold is two keys with the same pose, and a field a key leaves out is "as
// drawn". Strings (arm drawings, eyes) switch halfway through a move. loop > 0 wraps t: end a loop on its first pose.
/** @typedef {[number, Pose, ((x: number) => number)?]} Key  a key pose: [time in s, pose, easing into it] */
export const keyed = (t, keys, loop = 0) => {
  if (loop > 0) t = ((t % loop) + loop) % loop;
  let i = 0;
  while (i + 1 < keys.length && t >= keys[i + 1][0]) i++;
  const [t0, a] = keys[i], nx = keys[i + 1];
  if (!nx || t <= t0) return a;
  const [t1, b, e = ease] = nx, k = e(seg(t, t0, t1)), o = {};
  const A = a, B = b;
  for (const f of Object.keys(A).concat(Object.keys(B))) {
    const va = A[f], vb = B[f];
    const v = typeof va === "number" || typeof vb === "number" ? lerp(va ?? 0, vb ?? 0, k) : k < 0.5 ? va : vb;
    if (v !== undefined) o[f] = v; // never an undefined field: it would hide a mood's own face in feel()
  }
  return o;
};
// Overlapping action: read one piece of acting a little early for the eyes and later for the arms (the left arm a
// touch later still, so the arms never move as twins) and the star, so the parts arrive one after another (seconds).
export const overlap = (at, t, lag = { eyes: -0.066, arms: 0.08, star: 0.16 }) => {
  const o = { ...at(t) };
  const from = (p, fields) => fields.forEach((f) => (p[f] === undefined ? delete o[f] : (o[f] = p[f])));
  from(at(t - lag.eyes), ["lookX", "lookY", "eyes"]);
  from(at(t - lag.arms), ["armR", "turnR"]);
  from(at(t - lag.arms - 0.05), ["armL", "turnL"]);
  from(at(t - lag.star), ["starDy"]);
  return o;
};

// ---------- emotions ----------
// A mood is a face AND a way of moving. body(t, age) is alive on its own; age = seconds since the mood began.
// take = how big the reaction is when the character switches INTO this mood; fade = the emote leaves after ~1.6 s.
/**
 * @typedef {object} Mood
 * @property {string} [eyes]
 * @property {string} [mouth]
 * @property {string} [emote]
 * @property {boolean} [fade]
 * @property {number} [take]
 * @property {{to: string, k: number}} [tint]
 * @property {number} [blush]
 * @property {number} [squint]
 * @property {(t: number, age: number) => Pose} [body]
 */
export const makeEmotions = (table) => {
  const mood = (name) => table[name] ?? table.neutral;
  // One mood, alive at time t (for loops). age defaults to t.
  const feel = (name, t, age = t, over = {}) => {
    const E = mood(name);
    return {
      eyes: E.eyes, mouth: E.mouth, tint: E.tint, blush: E.blush, squint: E.squint,
      emote: E.emote ? { kind: E.emote, k: 1, age } : undefined,
      ...(E.body ? E.body(t, age) : {}), ...over,
    };
  };
  // An acted timeline: keys = [[0, 'neutral'], [1.2, 'surprised'], [2, 'happy', { lookX: 1 }]]. Around each change
  // the eyes close and the face swaps under the blink, a take fires (anticipation before, reaction after), the pose
  // blends in with overshoot, colour and blush cross-fade, and the new emote pops in.
  const emotions = (t, keys, takeScale = 1) => {
    let i = 0;
    while (i + 1 < keys.length && t >= keys[i + 1][0]) i++;
    const [tc, name, over] = keys[i];
    const age = t - tc, E = mood(name), cur = feel(name, t, age, over);
    const tn = i + 1 < keys.length ? keys[i + 1][0] : Infinity;
    let squint = cur.squint ?? 0;
    if (tn - t < 0.1) squint = Math.max(squint, 1 - (tn - t) / 0.1);
    if (i > 0 && age < 0.14) squint = Math.max(squint, 1 - age / 0.14);
    const pk = i > 0 ? keys[i - 1] : null;
    if (pk && age < 0.5) {
      const prev = feel(pk[1], t, t - pk[0], pk[2]);
      const k = backOut(seg(age, 0, 0.4)), kc = ease(seg(age, 0, 0.3));
      for (const f of BLEND) cur[f] = lerp(prev[f] ?? 0, cur[f] ?? 0, k);
      cur.blush = lerp(prev.blush ?? 0, cur.blush ?? 0, kc);
      const a = prev.tint ?? cur.tint, b = cur.tint ?? prev.tint;
      if (a && b) cur.tint = { to: mixCol(a.to, b.to, kc), k: lerp(prev.tint?.k ?? 0, cur.tint?.k ?? 0, kc) };
      if (age < 0.08) Object.assign(cur, { armR: prev.armR, armL: prev.armL }); // the arms follow the face
    }
    const next = i + 1 < keys.length ? mood(keys[i + 1][1]) : null;
    const out = add(cur, pk ? take(t, tc, (E.take ?? 0.6) * takeScale) : {}, next ? take(t, tn, (next.take ?? 0.6) * takeScale) : {});
    out.squint = squint > 0 ? squint : undefined; // undefined lets the idle blink
    if (E.emote) {
      const same = pk && mood(pk[1]).emote === E.emote;
      out.emote = { kind: E.emote, age, k: same ? 1 : seg(age, 0.06, 0.32) * (E.fade && !over?.emote ? 1 - seg(age, 1.4, 1.8) : 1) };
    }
    return out;
  };
  return { feel, emotions };
};

// ---------- pixel art ----------
// A sprite is rows of palette letters ('.' = transparent), all the same width.
// Night Studio: the original also built one SVG <path> per colour here; the game paints rows on a canvas (paint()).
/** @typedef {{w: number, h: number, rows: readonly string[]}} Sprite */
export const sprite = (rows) => {
  const w = rows[0].length;
  rows.forEach((r, y) => {
    if (r.length !== w) throw new Error(`sprite row ${y} is ${r.length} wide, expected ${w}: '${r}'`);
  });
  return { w, h: rows.length, rows };
};

// Eyelids for any eye stamp: pixels above the lid go transparent (the skin shows), the lid row turns to `lid`.
// slant > 0 drops the lid toward column 0 (sad on a left eye; pass -slant for the right eye).
const lids = new Map();
export const lidded = (s, squint, slant = 0, lid = "o") => {
  const base = clip(squint) * (s.h - 1);
  const n = (c) => Math.round(base + slant * ((s.w - 1) / 2 - c));
  const key = s.rows[0].split("").map((_, c) => n(c)).join(",");
  if (!/[1-9]/.test(key)) return s;
  const cache = lids.get(s) ?? new Map();
  lids.set(s, cache);
  const hit = cache.get(key);
  if (hit) return hit;
  const out = sprite(s.rows.map((r, y) => r.split("").map((ch, c) => (ch === "." || y > n(c) ? ch : y < n(c) ? "." : lid)).join("")));
  cache.set(key, out);
  return out;
};

// ---------- posing on the pixel grid ----------
// Scaling or rotating finished pixel art in the browser mixes pixel sizes and angles ("mixels"). Instead, a figure is
// composed on a letter grid in art px (put), then squashed, leaned or turned on that same grid (warp), so every
// output pixel is still exactly one art pixel. Only whole-number screen scaling and translation happen later.
/** @typedef {{rows: readonly string[], x: number, y: number}} Placed */
/** @typedef {{x0: number, y0: number, px: string[][]}} Grid */
export const grid = (x0, y0, w, h) => ({ x0, y0, px: Array.from({ length: h }, () => Array(w).fill(".")) });
// Stamp rows at art (x, y); '.' stays see-through. map renames letters (e.g. to give a part its own palette).
export const put = (g, rows, x, y, map) => {
  rows.forEach((r, j) => {
    const row = g.px[y - g.y0 + j];
    if (!row) return;
    for (let i = 0; i < r.length; i++) {
      const c = r[i], X = x - g.x0 + i;
      if (c !== "." && X >= 0 && X < row.length) row[X] = map ? map(c) : c;
    }
  });
};
// The grid's used area as rows plus their art position.
export const placed = (g) => {
  const rows = g.px.map((r) => r.join(""));
  let x0 = Infinity, x1 = -1, y0 = -1, y1 = -1;
  rows.forEach((r, j) => {
    const a = r.search(/[^.]/);
    if (a < 0) return;
    x0 = Math.min(x0, a);
    x1 = Math.max(x1, r.replace(/\.+$/, "").length - 1);
    if (y0 < 0) y0 = j;
    y1 = j;
  });
  if (y0 < 0) return { rows: ["."], x: g.x0, y: g.y0 };
  return { rows: rows.slice(y0, y1 + 1).map((r) => r.slice(x0, x1 + 1)), x: g.x0 + x0, y: g.y0 + y0 };
};
// Shift pixels by whole art px: fn(x, y) gives the shift at each art point (hems, capes, hair, flames).
export const ripple = (src, fn, pad = 2) => {
  const W = src.rows[0].length, H = src.rows.length, rows = [];
  for (let y = -pad; y < H + pad; y++) {
    let r = "";
    for (let x = -pad; x < W + pad; x++) {
      const [dx, dy] = fn(src.x + x, src.y + y), sx = x - dx, sy = y - dy;
      r += sy >= 0 && sy < H && sx >= 0 && sx < W ? src.rows[sy][sx] : ".";
    }
    rows.push(r);
  }
  return { rows, x: src.x - pad, y: src.y - pad };
};

// Night Studio: Scale2x (EPX) on character codes in typed arrays. Same rules as the original string version: it
// doubles pixel art and rounds its diagonals instead of blurring them. The original built each 8x image as strings
// and kept every one, which made the garbage collector stall for up to seconds when a new figure warped every frame.
const DOT = 46; // "."
const scale2x = (src, w, h, out) => {
  const W = w * 2;
  for (let y = 0; y < h; y++) {
    const row = y * w;
    for (let x = 0; x < w; x++) {
      const P = src[row + x];
      const A = y > 0 ? src[row - w + x] : DOT;
      const B = x + 1 < w ? src[row + x + 1] : DOT;
      const C = x > 0 ? src[row + x - 1] : DOT;
      const D = y + 1 < h ? src[row + w + x] : DOT;
      const o = 2 * y * W + 2 * x;
      out[o] = C === A && C !== D && A !== B ? A : P;
      out[o + 1] = A === B && A !== C && B !== D ? B : P;
      out[o + W] = D === C && D !== B && C !== A ? C : P;
      out[o + W + 1] = B === D && B !== A && D !== C ? D : P;
    }
  }
  return out;
};
// Static art (arm drawings, emote stamps) keeps its 8x image, keyed by its rows array. A figure made fresh each
// frame uses shared scratch buffers instead, so nothing piles up.
const eights = new WeakMap();
const scratch = [];
const buffer = (keep, i, n) => (keep ? new Uint8Array(n) : scratch[i]?.length >= n ? scratch[i] : (scratch[i] = new Uint8Array(n)));
const x8 = (rows, keep) => {
  const hit = keep && eights.get(rows);
  if (hit) return hit;
  const w = rows[0].length, h = rows.length, n = w * h, one = buffer(keep, 0, n);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) one[y * w + x] = rows[y].charCodeAt(x);
  const two = scale2x(one, w, h, buffer(keep, 1, n * 4));
  const four = scale2x(two, w * 2, h * 2, buffer(keep, 2, n * 16));
  const big = scale2x(four, w * 4, h * 4, buffer(keep, 3, n * 64));
  if (keep) eights.set(rows, big);
  return big;
};
let line = new Uint8Array(256);
// Transform pixel art on its own grid: dst = A·src + t in art px (A = [a, b, c, d] as [[a, b], [c, d]]).
// Each output pixel samples the 8x Scale2x image of the source (the RotSprite method), so turned and squashed
// art keeps one pixel size and clean edges. keep = true reuses the 8x image the next time the same rows array is
// warped (pass it for static art only).
export const warp = (src, A, t, keep = false) => {
  const det = A[0] * A[3] - A[1] * A[2];
  if (Math.abs(det) < 1e-6) return { rows: ["."], x: 0, y: 0 };
  const inv = [A[3] / det, -A[1] / det, -A[2] / det, A[0] / det], W = src.rows[0].length, H = src.rows.length;
  const xs = [], ys = [];
  for (const [cx, cy] of [[src.x, src.y], [src.x + W, src.y], [src.x, src.y + H], [src.x + W, src.y + H]]) {
    xs.push(A[0] * cx + A[1] * cy + t[0]);
    ys.push(A[2] * cx + A[3] * cy + t[1]);
  }
  const bx = Math.floor(Math.min(...xs)), by = Math.floor(Math.min(...ys)), bw = Math.ceil(Math.max(...xs)) - bx, bh = Math.ceil(Math.max(...ys)) - by;
  const big = x8(src.rows, keep), W8 = W * 8, H8 = H * 8, rows = [];
  if (line.length < bw) line = new Uint8Array(bw);
  for (let Y = 0; Y < bh; Y++) {
    for (let X = 0; X < bw; X++) {
      const dx = bx + X + 0.5 - t[0], dy = by + Y + 0.5 - t[1];
      const ix = Math.floor((inv[0] * dx + inv[1] * dy - src.x) * 8), iy = Math.floor((inv[2] * dx + inv[3] * dy - src.y) * 8);
      line[X] = iy >= 0 && iy < H8 && ix >= 0 && ix < W8 ? big[iy * W8 + ix] : DOT;
    }
    rows.push(String.fromCharCode.apply(null, line.subarray(0, bw)));
  }
  return { rows, x: bx, y: by };
};
// Turn art by `angle` radians (+ = clockwise) around the art point `pivot`, on its own grid. Used for drawings that
// never change (arms), so their 8x image is kept by default.
export const turn = (src, angle, pivot, keep = true) => {
  const c = Math.cos(angle), s = Math.sin(angle), A = [c, -s, s, c];
  return warp(src, A, [pivot[0] - (c * pivot[0] - s * pivot[1]), pivot[1] - (s * pivot[0] + c * pivot[1])], keep);
};
// A flat pixel shadow: an ellipse rx × ry art px, every other pixel filled (reads as half-dark, stays GIF-safe).
const shadows = new Map();
export const shadowSprite = (rx, ry, sparse = false) => {
  const key = `${rx},${ry},${sparse}`;
  const hit = shadows.get(key);
  if (hit) return hit;
  const rows = [];
  for (let j = 0; j < ry * 2; j++) {
    let r = "";
    for (let i = 0; i < rx * 2; i++) {
      const u = (i + 0.5 - rx) / rx, v = (j + 0.5 - ry) / ry, on = sparse ? i % 2 === 0 && j % 2 === 0 : (i + j) % 2 === 0;
      r += u * u + v * v <= 1 && on ? "o" : ".";
    }
    rows.push(r);
  }
  const s = sprite(rows);
  shadows.set(key, s);
  return s;
};

// Night Studio: draw rows of palette letters on a canvas, top-left at art (x, y). One fillRect per run of the same
// letter, grouped by colour so fillStyle changes once per colour. The caller's transform scales by a whole number
// (and may mirror), so every art pixel lands on whole device pixels and stays crisp. A letter without a colour
// stays see-through.
export const paint = (ctx, rows, pal, x = 0, y = 0) => {
  const runs = new Map();
  for (let j = 0; j < rows.length; j++) {
    const r = rows[j];
    for (let i = 0; i < r.length; ) {
      const c = r[i];
      let n = 1;
      while (i + n < r.length && r[i + n] === c) n++;
      if (c !== ".") {
        let list = runs.get(c);
        if (!list) runs.set(c, (list = []));
        list.push(i, j, n);
      }
      i += n;
    }
  }
  for (const [c, list] of runs) {
    const col = pal[c];
    if (!col) continue;
    ctx.fillStyle = col;
    for (let k = 0; k < list.length; k += 3) ctx.fillRect(x + list[k], y + list[k + 1], list[k + 2], 1);
  }
};
