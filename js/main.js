// Night Studio starts here. It loads her progress, wakes Lumi's corner, and shows the screen the address asks for.
// The part after # decides the screen: #/ studio map · #/day/3 · #/levelup/2 · #/shelf · #/grown-ups.
import { DAYS } from "./content/days.js";
import { LUMI_WORDS, ROOMS } from "./content/course.js";
import * as rules from "./rules.js";
import { openStore } from "./store.js";
import { createLumi } from "./lumi/director.js";
import { h, pick, setMuted } from "./ui.js";
import * as map from "./screens/map.js";
import * as day from "./screens/day.js";
import * as levelup from "./screens/levelup.js";
import * as shelf from "./screens/shelf.js";
import * as grownups from "./screens/grownups.js";

const SCREENS = { "": map, day, levelup, shelf, "grown-ups": grownups };
const app = document.getElementById("app");
const store = openStore();
const lumi = createLumi(document.getElementById("lumi"));
let P = store.load();
const today = () => rules.localDate(new Date());

// Keep Lumi's look and tricks in step with her progress.
const syncLumi = () => {
  lumi.dress({ star: P.lumi.star, wear: P.lumi.wear });
  lumi.tricks(rules.tricks(P));
};

// The header: her pen name, XP and lanterns, and the sound switch.
const muteBtn = document.getElementById("mute");
const renderHeader = () => {
  document.getElementById("stat-name").textContent = P.penName || "";
  document.getElementById("stat-xp").textContent = `⭐ ${rules.xp(P, DAYS)} XP`;
  document.getElementById("stat-lanterns").textContent = `🏮 ${rules.lanterns(P)}`;
  muteBtn.textContent = P.muted ? "🔕" : "🔔";
  muteBtn.setAttribute("aria-pressed", String(P.muted));
  muteBtn.title = P.muted ? "Sounds are off" : "Sounds are on";
  document.body.classList.toggle("named", !!P.penName);
};

// Everything a screen needs, in one object.
const ctx = {
  get P() {
    return P;
  },
  DAYS, ROOMS, rules, store, lumi, today,
  // Change progress through the rules, save it, and refresh what depends on it.
  commit(action) {
    const before = P;
    P = rules.act(P, action, today());
    if (P !== before) {
      store.save(P);
      renderHeader();
      syncLumi();
    }
    return P;
  },
  // Swap in a whole new progress (restore or reset on the grown-ups page).
  replace(next) {
    P = next;
    store.save(P);
    renderHeader();
    syncLumi();
    lumi.base(rules.awake(P) ? "neutral" : "sleepy");
  },
  go(hash) {
    if (location.hash === hash) route();
    else location.hash = hash;
  },
  // Something for Lumi to say (1–3 words), from content/course.js.
  words: (kind) => pick(LUMI_WORDS[kind], P.penName),
};

let cleanup = null;
const route = () => {
  const [name = "", arg = ""] = location.hash.replace(/^#\/?/, "").split("/");
  const screen = SCREENS[name] ? name : "";
  // A finished room's gift is opened before anything else (the grown-ups page is always reachable).
  if (screen !== "grown-ups" && P.penName) {
    const gift = rules.pendingLevelUp(P);
    if (gift && !(screen === "levelup" && Number(arg) === gift)) return ctx.go(`#/levelup/${gift}`);
  }
  if (screen === "day" && (!P.penName || !DAYS[Number(arg) - 1] || rules.dayStatus(P, Number(arg)) === "locked")) return ctx.go("#/");
  if (screen === "levelup" && !ROOMS[Number(arg) - 1]) return ctx.go("#/");
  cleanup?.();
  cleanup = null;
  app.replaceChildren();
  window.scrollTo(0, 0);
  document.body.dataset.screen = screen || "map";
  if (lumi.away()) lumi.act("enter");
  cleanup = SCREENS[screen].render(app, ctx, arg) ?? null;
  app.focus({ preventScroll: true });
};

muteBtn.addEventListener("click", () => {
  ctx.commit({ type: "mute", muted: !P.muted });
  setMuted(P.muted);
});
setMuted(P.muted);
syncLumi();
renderHeader();
if (rules.awake(P)) {
  lumi.base("neutral");
  lumi.act("enter", P.penName ? ctx.words(rules.welcomeBack(P, today()) ? "missed" : "hello") : null);
} else {
  lumi.base("sleepy"); // Lumi dozes in the dark studio until Day 1 is done
}
store.persist(); // ask Chrome to keep her work even when the disk gets full
window.addEventListener("hashchange", route);
// Another tab changed her progress: pick it up.
window.addEventListener("storage", (e) => {
  if (e.key === "night-studio:progress") {
    P = store.load();
    renderHeader();
    syncLumi();
    route();
  }
});
route();

// ---------- ?dev: shortcuts for testing (open the game with ?dev in the address) ----------
if (new URLSearchParams(location.search).has("dev")) {
  // A made-up picture for day n (a coloured blob with the day number), so pickers have something to show.
  const fakePicture = (n) => {
    const c = h("canvas", { width: 400, height: 400 }), g = c.getContext("2d");
    const hue = (n * 47) % 360;
    g.fillStyle = `hsl(${hue} 70% 60%)`;
    g.beginPath();
    g.arc(200, 200, 150, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = `hsl(${(hue + 180) % 360} 60% 30%)`;
    g.font = "bold 150px sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(String(n), 200, 210);
    return new Promise((resolve) => c.toBlob(resolve, "image/webp", 0.85));
  };
  window.nightStudio = {
    get P() {
      return P;
    },
    // Finish every day before day n (a picture, a check-in, a passed quiz), as if she had played them.
    async skipTo(n) {
      for (let d = 1; d < n; d++) {
        if (P.days[d]?.doneAt) continue;
        const key = `d${String(d).padStart(2, "0")}-dev`;
        await store.putImage({ key, day: d, blob: await fakePicture(d), w: 400, h: 400, at: Date.now() });
        P = rules.act(P, { type: "upload", day: d, key }, today());
        P = rules.act(P, { type: "checkin", day: d, answer: d % 4 ? "help" : "solo" }, today());
        P = rules.act(P, { type: "quiz", day: d, score: d % 3 ? 4 : 5 }, today());
      }
      if (!P.penName) P = rules.act(P, { type: "name", name: "Tester" }, today());
      store.save(P);
      renderHeader();
      syncLumi();
      lumi.base("neutral");
      route();
    },
    lumi,
  };
  console.info("Night Studio dev mode: nightStudio.skipTo(n), nightStudio.P, nightStudio.lumi");
}
