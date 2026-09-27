// Lumi: Lumia's mascot as a cut-out pixel puppet (body, two drawn arms and a star as layers, faces as stamps).
// Night Studio copy of Lumia_marketing/video/src/characters/lumi/Lumi.tsx: the same maths, drawn on a <canvas>.
// x, y = the point under its tail in canvas px; scale = canvas px per art px, a whole number. pose = what it does (see
// moves.js); the idle (float, fluttering hem, blinks, glances, star twinkle) is always added unless idle is false.
// flip mirrors it; shadow: false hides its shadow.
// Each frame is composed on Lumi's own pixel grid and squashed, leaned or turned there (warp in ./kit.js), so the
// pixels never mix sizes; the canvas only scales by a whole number and moves it.
import { burst, emote } from "./emotes.js";
import { add, clip, grid, lidded, mixCol, paint, placed, put, ripple, shadowSprite, sprite, turn, warp, wob } from "./kit.js";
import { ARMS, AT, BLUSH, BODY, EYES, MOUTHS, OPEN_EYES, PAL, SLANT, SLOTS, STAR, STAR_LIGHT, STARS, TINTED } from "./art.js";

const deg = (r) => (r * 180) / Math.PI;
const isOpen = (eyes) => OPEN_EYES.indexOf(eyes) >= 0;
// A drawing's drawn direction in degrees above horizontal, pointing outward (out = 1 for the right arm, -1 the left).
const dirOf = (a, out) => (a.tip ? deg(Math.atan2(a.pivot[1] - a.tip[1], (a.tip[0] - a.pivot[0]) * out)) : 0);
const EMOTE_AT = { dots: AT.dots, sweat: AT.sweat, tear: AT.tear };
const BODY_AT = { rows: BODY.rows, x: 0, y: 0 };
const SHADOW = { o: PAL.o };
const STAR_LIT = sprite(STAR.rows.map((r) => r.toUpperCase())); // the star in its own glowing letters

// Always-on life: a 2 s float with the star lagging behind it, arms swaying out of step (every 4/3 s), a star
// twinkle, two quick glances every 4 s (only when the pose isn't already directing the eyes), and blinks that close
// fast and open slowly (2 frames closing, 2 shut, 4 opening): one at 0.9 s and a double as the second glance returns.
const lid = (u) => (u < -0.067 || u > 0.2 ? 0 : u < 0 ? 1 + u / 0.067 : u < 0.067 ? 1 : 1 - (u - 0.067) / 0.133);
const idleOf = (t, seed, p) => {
  const float = (tt) => -2 + 2 * wob(tt, 0.5, seed);
  const bt = (((t + seed * 1.37) % 4) + 4) % 4, open = isOpen(p.eyes ?? "normal");
  const blink = p.squint === undefined && open ? Math.max(lid(bt - 0.9), lid(bt - 3.1), lid(bt - 3.37)) : 0;
  const free = open && p.lookX === undefined && p.lookY === undefined && !p.aim && !p.logo;
  const glance = !free ? [0, 0] : bt > 1.3 && bt < 1.9 ? [1, 0] : bt > 2.8 && bt < 3.25 ? [-1, -1] : [0, 0];
  return {
    dy: float(t),
    starDy: float(t - 0.15) - float(t),
    turnR: 0.06 * wob(t, 0.75, seed - 0.15),
    turnL: 0.05 * wob(t, 0.75, seed + 0.35),
    glow: 0.22 * Math.pow(Math.max(0, wob(t, 0.5, seed + 0.3)), 3),
    squint: blink > 0 ? blink : undefined,
    lookX: glance[0] || undefined,
    lookY: glance[1] || undefined,
  };
};
// The hem flutters: its rows sway and ripple by whole pixels, more toward the bottom, 15 drawings a second, 1 s cycle.
const hem = (t) => {
  const ph = (Math.floor(t * 15) / 15) * Math.PI * 2;
  return (x, y) => {
    const w = Math.pow(clip((y - 62) / 29), 1.4);
    return w > 0 ? [Math.round(1.3 * w * Math.sin(ph + 0.8 - y * 0.15)), Math.round(1.6 * w * Math.sin(ph - x * 0.3))] : [0, 0];
  };
};

const recolour = (pal, to, k) => {
  const o = { ...pal };
  for (const c of TINTED) o[c] = mixCol(pal[c], to, k);
  return o;
};
const place = (s, c, ox = 0, oy = 0) => ({ x: Math.round(c[0] - s.w / 2) + ox, y: Math.round(c[1] - s.h / 2) + oy });

// ---------- Night Studio: the <Lumi> component, split in two ----------
// composeLumi() is the component's maths (pure: the same options always give the same frame) and paintLumi() is its
// drawing, on a <canvas> instead of SVG. Options, as in the original: t = seconds; x, y = the point under the tail in
// canvas px; scale = canvas px per art px (a whole number); pose (see moves.js); flip; idle; seed; shadow.
// New: star = a STARS colour name for the star (missing = gold, as drawn); wear = her designs as pixel rows
// ({ belly, pin, patch }, each { rows, pal }; see SLOTS in art.js), worn on the cream body and hidden from behind.
// Removed: star-to-logo (it needs the Lumia logo) and the speech bubble (the game draws bubbles in HTML).

// Her designs are stamped onto a copy of the body, only over cream and highlight pixels, so the outline and rim stay.
// The copy is kept until the outfit changes.
let worn = { wear: undefined, at: BODY_AT };
const wornBody = (wear) => {
  if (worn.wear === wear) return worn.at;
  const px = BODY.rows.map((r) => r.split(""));
  for (const slot of Object.keys(SLOTS)) {
    const item = wear?.[slot];
    if (!item) continue;
    const { x, y } = SLOTS[slot];
    item.rows.forEach((r, j) => {
      const row = px[y + j];
      for (let i = 0; row && i < r.length; i++) if (r[i] !== "." && (row[x + i] === "c" || row[x + i] === "h")) row[x + i] = r[i];
    });
  }
  worn = { wear, at: wear ? { rows: px.map((r) => r.join("")), x: 0, y: 0 } : BODY_AT };
  return worn.at;
};

export const composeLumi = ({ t, x, y, scale = 5, pose = {}, flip = false, idle = true, seed = 0, shadow = true, star, wear }) => {
  const s = Math.round(scale), f = flip ? -1 : 1;
  const p = add(idle ? idleOf(t, seed, pose) : {}, pose);
  const X = Math.round(x + (p.dx ?? 0) * s * f), Y = Math.round(y + (p.dy ?? 0) * s);
  // Art px -> screen px, ignoring lean and squash (for aims, emotes and the bubble).
  const screen = (ax, ay) => [X + (ax - AT.ground[0]) * s * f, Y + (ay - AT.ground[1]) * s];

  // Arms: each shows a drawing (armR / armL) turned a little (turnR / turnL, + = up). aim: the arm on the target's side
  // switches to its drawing nearest the target and turns the rest of the way (at most 25°), and the eyes look there.
  const arms = { R: { name: p.armR ?? "rest", turn: p.turnR ?? 0 }, L: { name: p.armL ?? "rest", turn: p.turnL ?? 0 } };
  let lookX = p.lookX ?? 0, lookY = p.lookY ?? 0;
  if (p.aim) {
    const side = (p.aim.x - X) * f < 0 ? "L" : "R", out = side === "R" ? 1 : -1;
    let best = "", miss = 0;
    for (const name of Object.keys(ARMS[side])) {
      const a = ARMS[side][name], [px, py] = screen(a.pivot[0], a.pivot[1]);
      const d = deg(Math.atan2(py - p.aim.y, Math.abs(p.aim.x - px))) - dirOf(a, out);
      if (a.tip && (!best || Math.abs(d) < Math.abs(miss))) {
        best = name;
        miss = d;
      }
    }
    if (best && p.aim.k > 0.35) arms[side] = { name: best, turn: ((clip(miss, -25, 25) * Math.PI) / 180) * p.aim.k };
    const [ex, ey] = screen(AT.mouth[0], AT.eyeL[1]), a = Math.atan2(p.aim.y - ey, (p.aim.x - ex) * f);
    lookX += p.aim.k * Math.cos(a);
    lookY += p.aim.k * Math.sin(a);
  }

  // Palette: the body's mood tint, the blush strength, and the star's own letters (upper case) so it glows alone.
  // Night Studio: the star takes her chosen colour (tinted with the mood like the body), and her designs bring theirs.
  const glow = clip(p.glow ?? 0), blush = clip(1 + (p.blush ?? 0), 0, 2);
  const tinted = p.tint && p.tint.k > 0;
  const body = tinted ? recolour(PAL, p.tint.to, p.tint.k) : PAL;
  const pal = { ...body, b: blush > 1 ? mixCol(PAL.b, "#f28ca3", blush - 1) : mixCol(body.c, PAL.b, blush) };
  const own = STARS[star];
  for (const c of TINTED) {
    const base = own?.[c] ? (tinted ? mixCol(own[c], p.tint.to, p.tint.k) : own[c]) : body[c];
    pal[c.toUpperCase()] = mixCol(base, STAR_LIGHT, glow * 0.55);
  }
  for (const slot of Object.keys(SLOTS)) if (wear?.[slot]) Object.assign(pal, wear[slot].pal);

  const eyes = p.eyes ?? "normal", squint = clip(p.squint ?? 0), open = isOpen(eyes);
  const [eyeL, eyeR] = open && squint >= 0.85 ? EYES.closed : EYES[eyes] ?? EYES.normal;
  const slant = SLANT[eyes] ?? 0;
  const lid = (e, side) => (open && (squint > 0.1 || slant) && squint < 0.85 ? lidded(e, squint, slant * side) : e);
  const lx = Math.round(clip(lookX, -1, 1)), ly = Math.round(clip(lookY, -1, 1));
  const tk = p.talk ?? 0;
  const mouth = MOUTHS[tk > 0.05 ? (tk > 0.65 ? "open" : tk > 0.3 ? "smile" : "o") : p.mouth ?? "smile"] ?? MOUTHS.smile;

  // spin turns Lumi around a vertical axis: the figure narrows to |cos| on the grid, and while it faces away the back
  // view is the same body (no face is drawn into it) without the face, both arms behind.
  const facing = Math.cos(Math.PI * (p.spin ?? 0)), back = facing < 0, wide = Math.max(0.05, Math.abs(facing));

  // 1. Compose the frame on Lumi's pixel grid: arms behind the body, the body with its hem, the blush, arms in front of
  // the body (hand on cheek), the face, the star. Arms turn in whole degrees, + = up on both sides.
  const g = grid(-24, -24, 120, 124);
  const parts = ["R", "L"].map((side) => {
    const a = ARMS[side][arms[side].name] ?? ARMS[side].rest, d = Math.round(deg(arms[side].turn)) * (side === "R" ? -1 : 1);
    const at = { rows: a.s.rows, x: a.at[0], y: a.at[1] };
    return { front: !!a.front && !back, part: d ? turn(at, (d * Math.PI) / 180, a.pivot) : at };
  });
  for (const { front, part } of parts) if (!front) put(g, part.rows, part.x, part.y);
  const src = back ? BODY_AT : wornBody(wear);
  const bodyNow = idle ? ripple(src, hem(t + seed)) : src;
  put(g, bodyNow.rows, bodyNow.x, bodyNow.y);
  if (blush > 0.05 && !back) {
    put(g, BLUSH.rows, AT.blushL[0], AT.blushL[1]);
    put(g, BLUSH.rows, AT.blushR[0], AT.blushR[1]);
  }
  for (const { front, part } of parts) if (front) put(g, part.rows, part.x, part.y);
  if (!back) {
    for (const [e, c, side] of [[eyeL, AT.eyeL, 1], [eyeR, AT.eyeR, -1]]) {
      const at = place(e, c, lx, ly);
      put(g, lid(e, side).rows, at.x, at.y);
    }
    const m = place(mouth, AT.mouth);
    put(g, mouth.rows, m.x, m.y);
  }
  const starY = AT.starAt[1] + Math.round(p.starDy ?? 0);
  put(g, STAR_LIT.rows, AT.starAt[0], starY);

  // 2. Squash, lean, grow and spin it on the same grid, around the ground point (grow: around the body's centre).
  const sq = p.sq ?? 0, rot = p.rot ?? 0, gr = Math.max(0, 1 + (p.grow ?? 0)), fade = clip(p.fade ?? 0);
  const [gx, gy] = AT.ground, [cx, cy] = AT.centre;
  let fig = placed(g), starC = [AT.starCentre[0], AT.starCentre[1] + (starY - AT.starAt[1])];
  if (Math.abs(sq) > 0.004 || Math.abs(rot) > 0.002 || Math.abs(gr - 1) > 0.004 || wide < 0.996) {
    const c = Math.cos(rot), si = Math.sin(rot), sx = (1 + 0.6 * sq) * wide, sy = 1 - sq;
    const A = [gr * c * sx, -gr * si * sy, gr * si * sx, gr * c * sy];
    const T = [cx + gr * (gx - cx) - (A[0] * gx + A[1] * gy), cy + gr * (gy - cy) - (A[2] * gx + A[3] * gy)];
    fig = warp(fig, A, T);
    starC = [A[0] * starC[0] + A[1] * starC[1] + T[0], A[2] * starC[0] + A[3] * starC[1] + T[1]];
  }

  // The shadow stays on the ground at y and shrinks and thins as Lumi rises.
  const lift = clip(-(p.dy ?? 0) / 14), rx = Math.round(21 * (1 - 0.35 * lift) * Math.min(1, gr));
  const [emx, emy] = p.emote ? screen(...(EMOTE_AT[p.emote.kind] ?? AT.emote)) : [0, 0];
  const [fxx, fxy] = screen(cx, cy);
  return {
    s, f, X, Y, fade, pal,
    figure: fade < 1 && gr > 0.01 ? { rows: fig.rows, x: fig.x - gx, y: fig.y - gy } : null,
    rays: { x: Math.round(starC[0]) - gx, y: Math.round(starC[1]) - gy, amount: glow },
    shadow: shadow && fade < 1 && rx > 2 ? { rx, sparse: lift > 0.5, y: Math.round(y + 3 * s) } : null,
    fx: p.fx ? { kind: p.fx.kind, age: p.fx.age, x: fxx, y: fxy } : null,
    emote: p.emote ? { kind: p.emote.kind, k: p.emote.k, age: p.emote.age, x: emx, y: emy } : null,
    bubble: screen(AT.bubble[0], AT.bubble[1]),
  };
};

// Draw a composed frame, in the original's layer order: shadow, burst (behind the body), figure with its star rays,
// then the emote in screen space (so ? and z never read mirrored).
export const paintLumi = (ctx, fr) => {
  const { s, f, X, Y } = fr;
  if (fr.shadow) {
    ctx.setTransform(s, 0, 0, s, X, fr.shadow.y);
    paint(ctx, shadowSprite(fr.shadow.rx, 2, fr.shadow.sparse).rows, SHADOW, -fr.shadow.rx, -2);
  }
  if (fr.fx) {
    ctx.setTransform(s, 0, 0, s, fr.fx.x, fr.fx.y);
    burst(ctx, fr.fx.kind, fr.fx.age, 0, 0, 30);
  }
  if (fr.figure) {
    ctx.setTransform(s * f, 0, 0, s, X, Y);
    ctx.globalAlpha = 1 - fr.fade;
    paint(ctx, fr.figure.rows, fr.pal, fr.figure.x, fr.figure.y);
    burst(ctx, "rays", 0, fr.rays.x, fr.rays.y, 9, fr.rays.amount);
    ctx.globalAlpha = 1;
  }
  if (fr.emote) {
    ctx.setTransform(s, 0, 0, s, fr.emote.x, fr.emote.y);
    emote(ctx, fr.emote.kind, fr.emote.k, fr.emote.age, 0, 0, f);
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
};
