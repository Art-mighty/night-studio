// Night Studio rules: everything the game decides, as pure functions. "Pure" means the same inputs always give the
// same answer and nothing else is touched: no page, no clock, no storage. That's why tests.html can check them all.
//
// P is her progress (shape in blank() below). days is the DAYS list from content/days.js. Dates are local calendar
// dates like "2026-10-01", passed in by the caller.
import { OWN_IDEA_TWISTS, PASS, ROOMS, XP } from "./content/course.js";

// ---------- dates ----------
// A Date as a local "YYYY-MM-DD" (not UTC, so a late-evening session counts for the right day).
export const localDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
// Whole days from date a to date b.
export const daysBetween = (a, b) => Math.round((Date.parse(`${b}T12:00:00`) - Date.parse(`${a}T12:00:00`)) / 86400000);

// ---------- progress ----------
// What she has done, never totals (XP and badges are worked out from this every time, so nothing is counted twice).
// days[n]: { flavor, steps: [i…], watched: [videoId…], uploads: [imageKey…], taskAt, checkin, twist,
//            quiz: { first, best }, doneAt }. No quiz attempt count is kept, on purpose.
export const blank = () => ({
  v: 1,
  penName: "",
  muted: false,
  lanterns: [], // local dates she studied on; never removed
  days: {},
  lumi: { star: null, wear: {} }, // her star colour and the designs Lumi wears ({ belly, pin, patch })
  seen: { levelUps: [], welcomeBack: null },
});

// ---------- days ----------
export const roomOf = (n) => ROOMS.find((r) => n >= r.first && n <= r.last);
export const isComplete = (d) => !!d?.taskAt && (d.quiz?.best ?? 0) >= PASS;
// "done", "open" (she can play it now) or "locked" (the day before isn't done yet).
export const dayStatus = (P, n) => (P.days[n]?.doneAt ? "done" : n === 1 || P.days[n - 1]?.doneAt ? "open" : "locked");
export const currentDay = (P, total = 30) => {
  for (let n = 1; n <= total; n++) if (dayStatus(P, n) === "open") return n;
  return null;
};
export const doneCount = (P) => Object.values(P.days).filter((d) => d.doneAt).length;

// ---------- the one way progress changes ----------
// act(P, action, date) returns a NEW progress object (P itself is never changed). An action on a locked day does
// nothing. Watching, uploading and finishing a quiz attempt light today's lantern. When a day has its picture and a
// passed quiz, it's marked done, and stays done even if a picture is deleted later.
export const act = (P, a, date) => {
  const n = a.day;
  if (n && dayStatus(P, n) === "locked") return P;
  const next = structuredClone(P);
  const d = n ? (next.days[n] ??= {}) : null;
  const studied = () => {
    if (!next.lanterns.includes(date)) next.lanterns = [...next.lanterns, date].sort();
  };
  switch (a.type) {
    case "name":
      next.penName = String(a.name).trim().slice(0, 24);
      break;
    case "mute":
      next.muted = !!a.muted;
      break;
    case "flavor":
      d.flavor = a.index;
      break;
    case "step": {
      const s = new Set(d.steps ?? []);
      s.has(a.index) ? s.delete(a.index) : s.add(a.index);
      d.steps = [...s].sort((x, y) => x - y);
      break;
    }
    case "watch":
      if (!(d.watched ?? []).includes(a.id)) d.watched = [...(d.watched ?? []), a.id];
      studied();
      break;
    case "upload":
      d.uploads = [...(d.uploads ?? []), a.key];
      d.taskAt ??= date;
      studied();
      break;
    case "unupload":
      d.uploads = (d.uploads ?? []).filter((k) => k !== a.key);
      break;
    case "checkin":
      d.checkin ??= a.answer; // "solo" | "help" | "together", answered once
      break;
    case "twist":
      if (d.taskAt) d.twist = true;
      break;
    case "quiz": {
      const q = (d.quiz ??= {});
      q.first ??= a.score; // the first FINISHED attempt
      q.best = Math.max(q.best ?? 0, a.score);
      studied();
      break;
    }
    case "star":
      next.lumi.star = a.star;
      break;
    case "wear":
      next.lumi.wear = { ...next.lumi.wear, [a.slot]: a.item };
      break;
    case "seenLevelUp":
      if (!next.seen.levelUps.includes(a.room)) next.seen.levelUps = [...next.seen.levelUps, a.room];
      break;
    case "seenWelcome":
      next.seen.welcomeBack = date;
      break;
    default:
      return P;
  }
  if (d && !d.doneAt && isComplete(d)) d.doneAt = date;
  return next;
};

// ---------- XP, badges, lanterns ----------
export const secretBadges = (P) => {
  const all = Object.values(P.days), out = [];
  if (all.some((d) => d.checkin === "solo")) out.push("solo-flight");
  if (all.filter((d) => d.twist).length >= OWN_IDEA_TWISTS) out.push("own-idea");
  return out;
};
// XP for one day. Video XP is capped at the day's number of videos, so swapping a video later never takes XP away.
export const dayXp = (d, day) => {
  if (!d) return 0;
  let x = Math.min(d.watched?.length ?? 0, day.videos.length) * XP.video;
  if (d.taskAt) x += XP.task;
  if ((d.quiz?.best ?? 0) >= PASS) x += XP.quiz;
  if (d.quiz?.first === day.quiz.length) x += XP.perfect;
  if (d.twist) x += XP.twist;
  return x;
};
export const xp = (P, days) => {
  let total = 0;
  for (const day of days) total += dayXp(P.days[day.day], day);
  const secret = secretBadges(P);
  if (secret.includes("solo-flight")) total += XP.soloFlight;
  if (secret.includes("own-idea")) total += XP.ownIdea;
  return total;
};
// The most XP the course can give (every video, perfect first tries, a twist every day, both secret badges).
export const maxXp = (days) =>
  days.reduce((s, day) => s + day.videos.length * XP.video + XP.task + XP.quiz + XP.perfect + XP.twist, 0) + XP.soloFlight + XP.ownIdea;
// Badge ids she has earned: one per finished day, plus the secret ones.
export const badges = (P, days) => [...days.filter((day) => P.days[day.day]?.doneAt).map((day) => day.badge.id), ...secretBadges(P)];
export const lanterns = (P) => P.lanterns.length;
// After a break of 2+ days she gets a "rainy days happen" welcome, once per day.
export const welcomeBack = (P, date) => {
  const last = P.lanterns.filter((d) => d < date).at(-1);
  return !!last && daysBetween(last, date) >= 2 && P.seen.welcomeBack !== date;
};

// ---------- rooms, gifts, Lumi ----------
export const roomDone = (P, room) => {
  for (let n = room.first; n <= room.last; n++) if (!P.days[n]?.doneAt) return false;
  return true;
};
// A finished room whose gift she hasn't opened yet (the game takes her to it).
export const pendingLevelUp = (P) => ROOMS.find((r) => roomDone(P, r) && !P.seen.levelUps.includes(r.n))?.n ?? null;
// Lumi dozes until Day 1 is done.
export const awake = (P) => !!P.days[1]?.doneAt;
// Moves a tap on Lumi plays: wave, plus each trick from a finished room.
export const tricks = (P) => ["wave", ...ROOMS.filter((r) => r.gift.trick && roomDone(P, r)).map((r) => r.gift.trick)];
// Her pictures from a room, newest first (the choices for what Lumi wears). No room = all her pictures.
export const wearChoices = (P, room, max = 3) => {
  const keys = [];
  const [from, to] = room ? [room.first, room.last] : [1, 30];
  for (let n = to; n >= from; n--) keys.push(...[...(P.days[n]?.uploads ?? [])].reverse());
  return keys.slice(0, max);
};

// ---------- quiz and task helpers ----------
const shuffle = (list, rand) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
// A fresh quiz attempt: questions in a new order, and each question's options too, with `answer` following its
// option. (130 of the research's 150 answers are "B", so fixed positions would give the game away.)
export const deck = (quiz, rand = Math.random) =>
  shuffle(
    quiz.map((q) => {
      const order = shuffle(q.options.map((_, i) => i), rand);
      return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) };
    }),
    rand,
  );
// Put her flavor pick into a task step ("Draw {flavor} with the Pen tool" → "Draw a sleepy owl with the Pen tool").
export const fillFlavor = (text, option) => text.replaceAll("{flavor}", option ? option.fill : "your pick");
