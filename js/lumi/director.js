// Lumi's director: owns the canvas in Lumi's corner and decides what Lumi does in every frame.
// Screens never draw Lumi themselves. They send small requests:
//   lumi.base("think")             the mood Lumi returns to on this screen (neutral, happy, think, sleepy, love)
//   lumi.react("correct", "Yes!")  a short reaction, then back to the base mood (+ an optional word bubble)
//   lumi.act("wave")               a move: wave, enter, exit, spin, fly, dance, or a feeling trick (aha, love, surprised)
//   lumi.say("Wow!")               a word bubble only: 1–3 words, never an answer or an order
//   lumi.dress({ star, wear })     her star colour and the designs Lumi wears (from her progress)
//   lumi.tricks(["wave", "spin"])  the moves a tap on Lumi plays, one after another
// It draws at most 30 times a second, and the browser pauses it whenever the tab is hidden.
import { add } from "./kit.js";
import { composeLumi, paintLumi } from "./lumi.js";
import { dance, emotions, enter, exit, fly, spin, wave } from "./moves.js";

// The canvas covers 130 × 126 art px; the point under Lumi's tail sits at (64, 112), with room around it for hops,
// flying and sparkle bursts.
const ART_W = 130, ART_H = 126, GROUND = [64, 112];
// Lumi's body at rest inside that box (for the tap button).
const BODY_BOX = { x: 30, y: 21, w: 69, h: 91 };
// How long each reaction lasts before Lumi goes back to its base mood, in seconds.
const REACT_LEN = { correct: 1.8, oops: 1.8, surprised: 1.6, aha: 1.8, happy: 2.2, love: 2.4, think: 2, neutral: 1, sad: 2, sleepy: 3 };
// Night Studio: feelings a tap can play as a trick (gifts in Lumia Merch Lab).
const FEELING_TRICKS = ["aha", "love", "surprised"];
// Numbers in a pose fade toward 0 near the end of a looping move, so it settles instead of snapping.
const soften = (pose, k) => {
  const o = {};
  for (const [f, v] of Object.entries(pose)) o[f] = typeof v === "number" && f !== "fade" ? v * k : v;
  return o;
};
const fadeOut = (u, len) => Math.min(1, Math.max(0, (len - u) / 0.3));
// Timed moves: how long each lasts (s), the mood that goes with it, and its pose at local time u.
const ACTS = {
  wave: { len: 2, mood: "happy", pose: (u) => wave(u, 0) },
  enter: { len: 1.2, mood: "happy", pose: (u) => enter(u, 0) },
  exit: { len: Infinity, mood: "happy", pose: (u) => add(u < 0.85 ? wave(u, -0.27) : {}, exit(u, 0.85)) },
  spin: { len: 1.4, mood: "happy", pose: (u) => spin(u, 0.1) },
  dance: { len: 4, mood: null, pose: (u) => soften(add({ eyes: "happy", mouth: "grin", blush: 0.4 }, dance(u)), fadeOut(u, 4)) },
  fly: {
    len: 4, mood: null,
    pose: (u) => soften(add({ eyes: "happy", mouth: "grin" }, fly(u, Math.cos((u * Math.PI) / 2)), { dx: 10 * Math.sin((u * Math.PI) / 2), dy: 4 * Math.sin(u * Math.PI) }), fadeOut(u, 4)),
  },
};

export const createLumi = (root) => {
  const canvas = root.querySelector("canvas"), bubble = root.querySelector(".lumi-bubble"), tap = root.querySelector(".lumi-tap");
  const ctx = canvas.getContext("2d");
  const start = performance.now(), now = () => (performance.now() - start) / 1000;
  const calm = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  let fps = calm ? 15 : 30, s = 2, dpr = 1;
  let keys = [[0, "neutral"]], baseMood = "neutral";
  let acting = [], star = null, wear = null, trickList = [], nextTrick = 0, bubbleTimer = 0;

  // Size the canvas so one art pixel is a whole number of device pixels (crisp on every screen).
  const fit = () => {
    dpr = window.devicePixelRatio || 1;
    const cssPerArt = window.innerWidth < 700 ? 1.25 : 2;
    s = Math.max(1, Math.round(cssPerArt * dpr));
    canvas.width = ART_W * s;
    canvas.height = ART_H * s;
    const k = s / dpr;
    canvas.style.width = `${ART_W * k}px`;
    canvas.style.height = `${ART_H * k}px`;
    Object.assign(tap.style, { left: `${BODY_BOX.x * k}px`, top: `${BODY_BOX.y * k}px`, width: `${BODY_BOX.w * k}px`, height: `${BODY_BOX.h * k}px` });
  };

  // Moods live on a small timeline (see emotions() in moves.js). A change is scheduled 0.2 s ahead so Lumi can blink
  // and wind up before it; we keep the mood in force and the one before it (the change blends out of it).
  const schedule = (mood, len) => {
    const t = now(), at = t + 0.2;
    keys = keys.filter((k) => k[0] < at);
    let i = 0;
    while (i + 1 < keys.length && keys[i + 1][0] <= t) i++;
    keys = keys.slice(Math.max(0, i - 1));
    keys.push([at, mood]);
    if (len) keys.push([at + len, baseMood]);
  };

  const poseAt = (t) => {
    let pose = emotions(t, keys);
    acting = acting.filter((a) => t < a.t0 + a.len);
    for (const a of acting) if (t >= a.t0) pose = add(pose, a.pose(t - a.t0));
    return pose;
  };

  let last = 0, cost = 0, n = 0;
  const draw = () => {
    const t0 = performance.now(), t = now();
    const fr = composeLumi({ t, x: GROUND[0] * s, y: GROUND[1] * s, scale: s, pose: poseAt(t), star, wear });
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paintLumi(ctx, fr);
    bubble.style.left = `${fr.bubble[0] / dpr}px`;
    bubble.style.top = `${fr.bubble[1] / dpr}px`;
    // If this computer is slow, draw less often instead of making the page feel sluggish.
    cost += performance.now() - t0;
    if (++n === 30) {
      if (cost / n > 12) fps = 15;
      cost = n = 0;
    }
  };
  const tick = (ms) => {
    requestAnimationFrame(tick);
    if (ms - last < 1000 / fps - 4) return;
    last = ms;
    draw();
  };

  const api = {
    base(mood) {
      if (mood === baseMood) return;
      baseMood = mood;
      schedule(mood);
    },
    react(mood, words) {
      schedule(mood, REACT_LEN[mood] ?? 1.8);
      if (words) api.say(words);
    },
    act(name, words) {
      const a = ACTS[name];
      // Night Studio: Lumia Merch Lab's gifts are feelings; as tricks they play as a short reaction.
      if (!a) return FEELING_TRICKS.includes(name) ? api.react(name, words) : undefined;
      if (name === "enter") acting = [];
      else acting = acting.filter((x) => x.name !== name);
      acting.push({ name, t0: now() + (name === "enter" ? 0 : 0.1), len: a.len, pose: a.pose });
      if (a.mood) schedule(a.mood, Math.min(a.len, 3));
      if (words) api.say(words);
    },
    say(words) {
      if (!words) return;
      if (words.trim().split(/\s+/).length > 3) console.warn(`Lumi only says 1–3 words: "${words}"`);
      bubble.textContent = words;
      bubble.classList.add("show");
      clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(() => bubble.classList.remove("show"), 1900);
    },
    dress(look = {}) {
      star = look.star ?? null;
      wear = look.wear ?? null;
    },
    tricks(list) {
      trickList = list;
    },
    // True after "exit" until the next "enter" (Lumi has said goodnight).
    away() {
      return acting.some((a) => a.name === "exit");
    },
    // A tap plays her unlocked tricks in turn. While Lumi dozes, a tap only makes it stir.
    tapped() {
      if (baseMood === "sleepy") return api.react("surprised", "Oh! Hi!");
      if (!trickList.length) return api.react("happy");
      api.act(trickList[nextTrick++ % trickList.length]);
    },
  };

  tap.addEventListener("click", () => api.tapped());
  window.addEventListener("resize", fit);
  fit();
  requestAnimationFrame(tick);
  return api;
};
