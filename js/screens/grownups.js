// For grown-ups (#/grown-ups): how she's doing (lightly: no quiz attempt counts are ever kept), keeping her work safe,
// and the research's playbook and print cheat sheet. Nothing on this page is hidden from her.
import { h, toast } from "../ui.js";

const CHECKIN = { solo: "All by myself", help: "With a little help", together: "We did it together" };
const nice = (date) => new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" });
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export const render = (el, ctx) => {
  const R = ctx.rules, P = ctx.P, today = ctx.today();
  const { CHEAT_SHEET, PLAYBOOK, PRINT_REWARDS, SETUP } = ctx.course;
  ctx.lumi.base(R.awake(P) ? "neutral" : "sleepy");

  // ----- how it's going -----
  const done = ctx.DAYS.filter((d) => P.days[d.day]?.doneAt);
  const cur = R.currentDay(P, ctx.DAYS.length);
  const rewards = PRINT_REWARDS.filter((r) => P.days[r.afterDay]?.doneAt);
  const progress = h(
    "section.card",
    h("h2", "How it's going"),
    h(
      "div.stats-grid",
      h("div", h("b", `${done.length} / ${ctx.DAYS.length}`), h("span", "days done")),
      h("div", h("b", R.xp(P, ctx.DAYS)), h("span", `XP (of ${R.maxXp(ctx.DAYS)})`)),
      h("div", h("b", R.lanterns(P)), h("span", R.lanterns(P) === 1 ? "evening in the studio" : "evenings in the studio")),
      h("div", h("b", cur ? `Day ${cur}` : "Finished"), h("span", "up next")),
    ),
    rewards.map((r) => h("p.reward-note", "🎁 ", r.text)),
    done.length
      ? h(
          "table.days",
          h("thead", h("tr", h("th", "Day"), h("th", "Done"), h("th", "How it went (her words)"), h("th", "Own twist"))),
          h(
            "tbody",
            done.map((d) => {
              const s = P.days[d.day];
              return h("tr", h("td", `${d.day}. ${d.title}`), h("td", nice(s.doneAt)), h("td", CHECKIN[s.checkin] ?? "–"), h("td", s.twist ? "✓" : ""));
            }),
          ),
        )
      : h("p.muted", "Nothing finished yet. Day 1 is waiting."),
    h("p.small.muted", "On purpose, the game keeps no count of quiz attempts or wrong answers. Praise the process: “you kept the text inside the safe zone,” not “you're so talented.”"),
  );

  // ----- keeping her work safe -----
  const status = h("p", "Checking storage…");
  Promise.all([ctx.store.persisted(), navigator.storage?.estimate?.() ?? {}]).then(([kept, est]) => {
    const last = ctx.store.lastBackup();
    const ago = last ? R.daysBetween(last, today) : null;
    status.replaceChildren(
      kept ? "✓ Chrome is keeping this site's data safe. " : "Chrome may clear this site's data if the disk gets very full, so keep a backup. ",
      est.usage ? `Using ${(est.usage / 1e6).toFixed(1)} MB. ` : "",
      last ? `Last backup: ${ago === 0 ? "today" : `${ago} day${ago === 1 ? "" : "s"} ago`}.` : "No backup yet.",
    );
  });
  const backupBtn = h(
    "button.big",
    {
      type: "button",
      onclick: async () => {
        backupBtn.disabled = true;
        try {
          const blob = await ctx.store.backup(ctx.P, today);
          const a = h("a", { href: URL.createObjectURL(blob), download: `${ctx.course.id}-backup-${today}.json` });
          document.body.append(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(a.href), 10000);
          toast("Backup saved to your Downloads folder ✓");
          ctx.go("#/grown-ups");
        } finally {
          backupBtn.disabled = false;
        }
      },
    },
    "Download a backup",
  );
  const restoreInput = h("input", {
    type: "file",
    accept: ".json,application/json",
    hidden: true,
    onchange: async () => {
      const file = restoreInput.files[0];
      restoreInput.value = "";
      if (!file || !confirm("Replace everything in this browser with that backup?")) return;
      try {
        ctx.replace(await ctx.store.restore(await file.text()));
        toast("Restored ✓");
        ctx.go("#/grown-ups");
      } catch (e) {
        toast(e.message);
      }
    },
  });
  const typed = h("input.reset-word", { type: "text", placeholder: "Type RESET", autocomplete: "off", "aria-label": "Type RESET to confirm" });
  const resetBtn = h(
    "button.danger",
    {
      type: "button",
      onclick: async () => {
        if (typed.value.trim() !== "RESET") return toast("To start over, type RESET (in capitals) first.");
        ctx.replace(await ctx.store.reset());
        toast("Everything was reset.");
        ctx.go("#/");
      },
    },
    "Start over",
  );
  const safety = h(
    "section.card",
    h("h2", "Keep her work safe"),
    h("p", "Her progress and pictures live only in this browser on this computer. A backup is one file with everything in it."),
    status,
    h("div.row", backupBtn, h("button.ghost", { type: "button", onclick: () => restoreInput.click() }, "Restore from a backup"), restoreInput),
    h("details.danger-zone", h("summary", "Start over from Day 1"), h("p", "This deletes her progress and pictures in this browser. Download a backup first."), h("div.row", typed, resetBtn)),
  );

  // ----- the research's playbook, setup, cheat sheet, and the videos to preview -----
  const setup = h("section.card", h("h2", "Before Day 1"), h("ul.checklist", SETUP.map((s) => h("li", s))));
  const playbook = h("section.card", h("h2", "The co-pilot playbook"), h("dl.playbook", PLAYBOOK.map(([t, d]) => [h("dt", t), h("dd", d)])));
  const cheat = h("section.card", h("h2", "Print-spec cheat sheet"), h("dl.playbook", CHEAT_SHEET.map(([t, d]) => [h("dt", t), h("dd", d)])));
  const videos = h(
    "section.card",
    h("h2", "Videos to preview"),
    h("p.muted", "Every video, with the part the game plays. Some have sponsor segments; the notes say so."),
    h(
      "ol.video-list",
      ctx.DAYS.map((d) =>
        h(
          "li",
          h("strong", `Day ${d.day}: ${d.title}`),
          h(
            "ul",
            d.videos.map((v) =>
              h(
                "li",
                h("a", { href: `https://www.youtube.com/watch?v=${v.id}${v.start ? `&t=${v.start}s` : ""}`, target: "_blank", rel: "noopener" }, v.title),
                ` · ${v.channel} · ${v.min} min`,
                v.start || v.end ? ` · plays ${mmss(v.start ?? 0)}–${v.end ? mmss(v.end) : "end"}` : "",
                v.note ? ` · ${v.note}` : "",
              ),
            ),
          ),
        ),
      ),
    ),
  );

  el.append(
    h("nav.crumbs", h("a", { href: "#/" }, "← Studio")),
    h("header.page-head", h("h1", "For grown-ups"), h("p.lead", ctx.course.text.grownUps)),
    progress,
    safety,
    setup,
    playbook,
    cheat,
    videos,
    h("p.small.muted.credits", "Lumi is Lumia's mascot. Its motion code includes ClaudeAnimationBase (MIT License, see js/lumi/)."),
  );
};
