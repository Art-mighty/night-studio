// The studio map (#/): tonight's day, her lanterns, and the course's rooms with their days. On her very first visit it's the
// welcome screen instead, where she picks a pen name.
import { h } from "../ui.js";

// Rough length of a day: the videos, about 30 minutes of making, and a few minutes of quiz.
export const minutes = (day) => Math.round(day.videos.reduce((s, v) => s + (v.min ?? 0), 0) + 30 + 6);

export const render = (el, ctx) => {
  if (!ctx.P.penName) return welcome(el, ctx);
  const { rules, DAYS, ROOMS, lumi, course } = ctx;
  const P = ctx.P, date = ctx.today();
  lumi.base(rules.awake(P) ? "neutral" : "sleepy");

  // After a break of two days or more: a kind hello, no guilt.
  let rain = null;
  if (rules.welcomeBack(P, date)) {
    const lit = rules.lanterns(P) === 1 ? "Your lantern is still lit" : `All ${rules.lanterns(P)} of your lanterns are still lit`;
    rain = h("section.card.rain", h("h2", "Welcome back ☂️"), h("p", `Rainy days happen. ${lit}, and your studio is just as you left it.`));
    ctx.commit({ type: "seenWelcome" });
  }

  const cur = rules.currentDay(P, DAYS.length);
  const tonight = cur ? DAYS[cur - 1] : null;
  const room = cur ? rules.roomOf(cur) : null;
  const next = tonight
    ? h(
        "section.card.tonight",
        h("p.kicker", `Tonight · Day ${cur} of ${DAYS.length}`),
        h("h1", tonight.title),
        h("p.lead", tonight.goal),
        h("p.meta", `${room.icon} ${course.roomWord} ${room.n} · ${room.name} · about ${minutes(tonight)} min`),
        h("a.big", { href: `#/day/${cur}` }, P.days[cur] ? `Continue Day ${cur}` : `Start Day ${cur}`),
      )
    : h(
        "section.card.tonight.all-done",
        h("p.kicker", `${DAYS.length} of ${DAYS.length}`),
        h("h1", course.text.finishedTitle),
        h("p.lead", course.text.finished),
        h("a.big", { href: "#/shelf" }, "Open your shelf"),
      );
  // Finished the whole course? Point the way to the next one, if there is one.
  const sequel = !tonight && course.next ? h("section.card.next-course", h("h2", h("a", { href: course.next.href }, course.next.title)), h("p", course.next.text)) : null;

  const lit = rules.lanterns(P);
  const lanterns = h(
    "section.lanterns",
    { "aria-label": `Lanterns lit: ${lit}` },
    h("div.lantern-row", Array.from({ length: Math.max(lit, 1) }, (_, i) => h("span.lantern" + (i < lit ? ".on" : ""), "🏮"))),
    h("p", lit ? `Lanterns lit: ${lit}. One for every evening you've spent in the studio.` : "Every evening you work here lights a lantern. They never go out."),
  );

  const rooms = ROOMS.map((r) => {
    const done = rules.roomDone(P, r), tiles = [];
    for (let n = r.first; n <= r.last; n++) {
      const status = rules.dayStatus(P, n), d = DAYS[n - 1];
      tiles.push(
        status === "locked"
          ? h("span.tile.locked", { title: `Day ${n} opens when Day ${n - 1} is done` }, h("b", n), h("small", "🔒"))
          : h(`a.tile.${status}`, { href: `#/day/${n}`, title: `Day ${n}: ${d.title}` }, h("b", n), h("small", status === "done" ? d.badge.icon : "✦")),
      );
    }
    return h(
      "section.room" + (done ? ".lit" : ""),
      h("header", h("span.room-icon", r.icon), h("div", h("h2", `${course.roomWord} ${r.n} · ${r.name}`), h("p", r.blurb))),
      h("div.tiles", tiles),
      h("p.gift", done ? h("a", { href: `#/levelup/${r.n}` }, `🎁 ${r.gift.title}`) : `🎁 Finish this ${course.roomWord.toLowerCase()} for a surprise`),
    );
  });

  el.append(...[rain, next, sequel, lanterns, h("div.rooms", rooms)].filter(Boolean));
};

const welcome = (el, ctx) => {
  ctx.lumi.base("sleepy");
  const input = h("input.pen", { type: "text", maxlength: 24, placeholder: "Your artist name", autocomplete: "off", spellcheck: "false", "aria-label": "Your artist name" });
  const t = ctx.course.text;
  const ideas = [...ctx.course.PEN_NAMES].sort(() => Math.random() - 0.5).slice(0, 3);
  const start = () => {
    const name = input.value.trim();
    if (!name) return input.focus();
    ctx.commit({ type: "name", name });
    ctx.go("#/");
  };
  input.addEventListener("keydown", (e) => e.key === "Enter" && start());
  el.append(
    h(
      "section.card.welcome",
      h("p.kicker", t.kicker),
      h("h1", t.welcome),
      h("p.lead", t.lead),
      h("p", "Nobody watches and nothing is shared. You can retry anything as many times as you like."),
      h("p", "That's Lumi in the corner, fast asleep. Finish Day 1 and it'll wake up."),
      h("label.field", h("span", "Pick an artist name (a pen name, not your real one):"), input),
      h("div.chips", ideas.map((name) => h("button.chip", { type: "button", onclick: () => { input.value = name; input.focus(); } }, name))),
      h("button.big", { type: "button", onclick: start }, t.start),
    ),
  );
  setTimeout(() => input.focus(), 50);
};
