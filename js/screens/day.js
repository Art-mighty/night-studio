// One day (#/day/N): pick a flavor → watch the videos → make the thing and add a picture → a quick check-in → the quiz
// → the reward. Every step saves as she goes, so she can stop and come back at any time. The day counts as done once
// it has a picture and a passed quiz; the videos are optional (they earn XP).
import { chime, h, picture, toast, uploadZone, videoCard, xpFloat } from "../ui.js";
import { prepareUpload } from "../images.js";
import { mountQuiz } from "./quiz.js";
import { minutes } from "./map.js";

const CHECKIN = [["solo", "All by myself"], ["help", "With a little help"], ["together", "We did it together"]];

export const render = (el, ctx, arg) => {
  const n = Number(arg), day = ctx.DAYS[n - 1], room = ctx.rules.roomOf(n), R = ctx.rules;
  const { PASS, SECRET_BADGES, XP } = ctx.course;
  const urls = [], stops = [];
  const D = () => ctx.P.days[n] ?? {};
  ctx.lumi.base(R.awake(ctx.P) ? "neutral" : "sleepy");

  // Celebrate the moment the day becomes done (picture + passed quiz), then show the reward.
  const wasDone = () => !!D().doneAt;
  const afterChange = (before) => {
    if (!before && wasDone()) {
      chime("win");
      if (n === 1) {
        ctx.lumi.base("neutral"); // Day 1 wakes Lumi for good
        ctx.lumi.react("surprised", ctx.words("firstWake"));
        setTimeout(() => ctx.lumi.act("wave"), 1600);
      } else ctx.lumi.react("correct", ctx.words("pass"));
      drawReward(true);
    }
  };
  const secretToast = (id) => {
    const b = SECRET_BADGES.find((x) => x.id === id);
    chime("gift");
    toast(`Secret badge unlocked: ${b.icon} ${b.name} · +${id === "solo-flight" ? XP.soloFlight : XP.ownIdea} XP`, 4500);
  };

  // ① flavor
  const flavorSec = h("section.card.step");
  const drawFlavor = () => {
    const chosen = D().flavor;
    flavorSec.replaceChildren(
      h("h2", h("span.num", "1"), day.flavor.prompt),
      h("p.muted", "Your call. It changes the task a little, never what you learn."),
      h(
        "div.choices",
        day.flavor.options.map((o, i) =>
          h(
            "button.choice" + (chosen === i ? ".on" : ""),
            {
              type: "button",
              "aria-pressed": String(chosen === i),
              onclick: () => {
                ctx.commit({ type: "flavor", day: n, index: i });
                chime("soft");
                ctx.lumi.react("aha", ctx.words("flavor"));
                drawFlavor();
                drawSteps();
              },
            },
            o.label,
          ),
        ),
      ),
    );
  };

  // ② videos
  const videosSec = h(
    "section.card.step",
    h("h2", h("span.num", "2"), day.videos.length > 1 ? "Watch the videos" : "Watch the video"),
    h("p.muted", `Optional, but each one you watch is +${XP.video} XP, and the quiz is based on them.`),
    day.videos.map((v, i) =>
      videoCard(v, i + 1, {
        watched: (D().watched ?? []).includes(v.id),
        onWatched: (btn) => {
          ctx.commit({ type: "watch", day: n, id: v.id });
          xpFloat(btn, XP.video);
          chime("soft");
          ctx.lumi.react("happy", ctx.words("watched"));
        },
      }),
    ),
  );

  // ③ the task, with her picture
  const stepsList = h("ol.steps");
  const drawSteps = () => {
    const option = day.flavor.options[D().flavor], ticked = new Set(D().steps ?? []);
    stepsList.replaceChildren(
      ...day.task.steps.map((s, i) =>
        h(
          "li",
          h(
            "label.check",
            h("input", { type: "checkbox", checked: ticked.has(i), onchange: () => ctx.commit({ type: "step", day: n, index: i }) }),
            h("span", R.fillFlavor(s, option)),
          ),
        ),
      ),
    );
  };
  const thumbs = h("div.thumbs");
  const drawThumbs = async () => {
    const keys = D().uploads ?? [];
    const found = await Promise.all(keys.map(async (key) => [key, await ctx.store.getImage(key).catch(() => null)]));
    thumbs.replaceChildren(
      ...found.filter(([, rec]) => rec).map(([key, rec]) =>
        h(
          "figure.thumb",
          picture(rec.blob, `Your picture for Day ${n}`, urls),
          h(
            "button.remove",
            {
              type: "button",
              title: "Remove this picture",
              "aria-label": "Remove this picture",
              onclick: async () => {
                if (!confirm("Remove this picture from your gallery?")) return;
                await ctx.store.deleteImage(key);
                ctx.commit({ type: "unupload", day: n, key });
                drawThumbs();
              },
            },
            "✕",
          ),
        ),
      ),
    );
  };
  const addPictures = async (files) => {
    for (const file of files.slice(0, 3)) {
      const before = wasDone(), first = !D().taskAt;
      try {
        const { blob, w, h: height } = await prepareUpload(file);
        const key = `d${String(n).padStart(2, "0")}-${Date.now().toString(36)}`;
        await ctx.store.putImage({ key, day: n, blob, w, h: height, at: Date.now() });
        ctx.commit({ type: "upload", day: n, key });
        if (first) xpFloat(zone.el, XP.task);
        chime("right");
        ctx.lumi.react("love", ctx.words("upload"));
        await drawThumbs();
        drawCheckin();
        afterChange(before);
      } catch (e) {
        toast(e.message || "That picture didn't work. Try a PNG or JPG.");
      }
    }
  };
  const zone = uploadZone(addPictures);
  stops.push(zone.stop);
  const taskSec = h(
    "section.card.step",
    h("h2", h("span.num", "3"), "Make it"),
    h("p.tool", `In ${day.task.tool}`),
    stepsList,
    h("p.deliverable", h("strong", "Your picture: "), day.task.deliverable),
    zone.el,
    thumbs,
  );

  // ④ check-in (after the first picture): no wrong answers, and a twist she can claim.
  const checkSec = h("section.card.step.checkin");
  const drawCheckin = () => {
    const d = D();
    checkSec.hidden = !d.taskAt;
    if (!d.taskAt) return;
    checkSec.replaceChildren(
      h("h2", h("span.num", "4"), "How did it go?"),
      d.checkin
        ? h("p", `You said: “${CHECKIN.find(([id]) => id === d.checkin)[1]}.” Thanks for telling me.`)
        : h(
            "div.choices",
            CHECKIN.map(([id, label]) =>
              h(
                "button.choice",
                {
                  type: "button",
                  onclick: () => {
                    const had = R.secretBadges(ctx.P).includes("solo-flight");
                    ctx.commit({ type: "checkin", day: n, answer: id });
                    ctx.lumi.react("happy", ctx.words("checkin"));
                    if (!had && R.secretBadges(ctx.P).includes("solo-flight")) secretToast("solo-flight");
                    drawCheckin();
                  },
                },
                label,
              ),
            ),
          ),
      h("p.small.muted", "Every answer is a good answer. (Grown-ups can see this one.)"),
      h(
        "label.check.twist",
        h("input", {
          type: "checkbox",
          checked: !!d.twist,
          disabled: !!d.twist,
          onchange: (e) => {
            const had = R.secretBadges(ctx.P).includes("own-idea");
            ctx.commit({ type: "twist", day: n });
            xpFloat(e.target, XP.twist);
            chime("soft");
            ctx.lumi.react("surprised", ctx.words("twist"));
            if (!had && R.secretBadges(ctx.P).includes("own-idea")) secretToast("own-idea");
            drawCheckin();
          },
        }),
        h("span", `I added my own twist: I changed the task my way (+${XP.twist} XP)`),
      ),
    );
  };

  // ⑤ quiz (never locked: she can take it whenever she feels ready)
  const quizSec = h("section.card.step.quiz-sec");
  const onFinish = (score) => {
    const before = wasDone();
    ctx.commit({ type: "quiz", day: n, score });
    if (score >= PASS && !D().taskAt) toast("Quiz passed ✓ Add a picture of your work to finish the day.", 4500);
    afterChange(before);
  };
  const drawQuizIntro = () => {
    const q = D().quiz, passed = (q?.best ?? 0) >= PASS;
    quizSec.replaceChildren(
      h("h2", h("span.num", "5"), "Quick quiz"),
      h("p.muted", `${day.quiz.length} questions, one at a time. ${PASS} right passes. Retry as often as you like; the questions shuffle each time.`),
      passed ? h("p", `Passed ✓ Best score: ${q.best} of ${day.quiz.length}.`) : "",
      h("button" + (passed ? ".ghost" : ".big"), { type: "button", onclick: () => mountQuiz(quizSec, ctx, day, onFinish) }, passed ? "Practice again" : q ? "Try again" : "Start the quiz"),
    );
  };

  // ⑥ reward
  const rewardSec = h("section.card.reward", { hidden: true });
  const drawReward = (fresh = false) => {
    const d = D();
    if (!d.doneAt) return;
    const nextDay = ctx.DAYS[n], lastOfRoom = n === room.last;
    rewardSec.hidden = false;
    rewardSec.classList.toggle("fresh", fresh);
    rewardSec.replaceChildren(
      h("div.badge-big", day.badge.icon),
      h("h2", `Day ${n} done · ${day.badge.name}`),
      h("p", `+${R.dayXp(d, day)} XP from today · a lantern is lit 🏮`),
      h(
        "div.row",
        lastOfRoom ? h("a.big", { href: `#/levelup/${room.n}` }, `🎁 Open your ${room.name} gift`) : nextDay ? h("a.big", { href: `#/day/${n + 1}` }, `Keep going: Day ${n + 1}`) : h("a.big", { href: "#/shelf" }, "See your shelf"),
        h("button.ghost", { type: "button", onclick: goodnight }, "Done for tonight"),
      ),
    );
    if (fresh) rewardSec.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const goodnight = () => {
    ctx.lumi.act("exit", ctx.words("bye"));
    el.replaceChildren(
      h(
        "section.card.night",
        h("h1", "Good night 🌙"),
        h("p.lead", "Your work is saved in this browser. The lamp will be on whenever you come back."),
        h("a.big", { href: "#/" }, "Back to the studio"),
      ),
    );
  };

  el.append(
    h("nav.crumbs", h("a", { href: "#/" }, "← Studio"), h("span", `${room.icon} ${ctx.course.roomWord} ${room.n} · ${room.name}`)),
    h(
      "header.day-head",
      h("p.kicker", `Day ${n} of ${ctx.DAYS.length}`),
      h("h1", day.title),
      h("p.lead", day.goal),
      h("p.meta", `About ${minutes(day)} minutes · ${day.task.tool}`),
    ),
    flavorSec,
    videosSec,
    taskSec,
    checkSec,
    quizSec,
    rewardSec,
  );
  drawFlavor();
  drawSteps();
  drawThumbs();
  drawCheckin();
  drawQuizIntro();
  drawReward();

  return () => {
    stops.forEach((stop) => stop());
    urls.forEach((u) => URL.revokeObjectURL(u));
  };
};
