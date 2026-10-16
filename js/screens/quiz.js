// The quiz: 5 questions, one at a time, in a new order each attempt (the answers move around too). After each
// answer she sees "Yes!" or "Not quite" and one sentence of why. 4 of 5 passes, and she can always try again.
import { h, chime } from "../ui.js";

// Runs one attempt inside `host`. onFinish(score) is called when all 5 are answered (pass or not).
export const mountQuiz = (host, ctx, day, onFinish) => {
  const qs = ctx.rules.deck(day.quiz);
  let i = 0, score = 0;
  const box = h("div.quiz", { "aria-live": "polite" });
  host.replaceChildren(box);
  host.scrollIntoView({ behavior: "smooth", block: "start" });

  const show = () => {
    const q = qs[i];
    ctx.lumi.base("think");
    const why = h("p.why", { hidden: true });
    const next = h("button.big", { type: "button", hidden: true, onclick: () => (++i < qs.length ? show() : finish()) }, i + 1 < qs.length ? "Next question →" : "See my score");
    const answer = (j) => {
      const ok = j === q.answer;
      options.forEach((b, k) => {
        b.disabled = true;
        if (k === q.answer) b.classList.add("right");
      });
      if (ok) score++;
      else options[j].classList.add("wrong");
      why.hidden = false;
      why.replaceChildren(h("strong", ok ? "Yes! " : "Not quite. "), q.why);
      chime(ok ? "right" : "wrong");
      ctx.lumi.react(ok ? "correct" : "oops", ctx.words(ok ? "right" : "wrong"));
      next.hidden = false;
      next.focus({ preventScroll: true });
    };
    const options = q.options.map((o, j) => h("button.option", { type: "button", onclick: () => answer(j) }, h("span.letter", "ABCD"[j]), h("span", o)));
    box.replaceChildren(
      h("p.q-progress", h("span", `Question ${i + 1} of ${qs.length}`), h("span.dots", qs.map((_, k) => h("i" + (k < i ? ".done" : k === i ? ".now" : ""))))),
      h("h3.q", q.q),
      h("div.options", options),
      why,
      next,
    );
  };

  const finish = () => {
    ctx.lumi.base("neutral");
    const PASS = ctx.course.PASS, passed = score >= PASS, perfect = score === qs.length;
    onFinish(score);
    box.replaceChildren(
      h("div.score" + (passed ? ".pass" : ""), h("b", score), h("span", ` of ${qs.length}`)),
      h("h3", perfect ? "Perfect! 🌟" : passed ? "You passed! 🎉" : "So close."),
      h("p", passed ? "Nice work. Everything you just answered is part of your toolkit now." : `You need ${PASS} to pass. The questions shuffle every time, and the videos above are there if you want another look.`),
      h("div.row", h("button" + (passed ? ".ghost" : ".big"), { type: "button", onclick: () => mountQuiz(host, ctx, day, onFinish) }, passed ? "Practice again" : "Try again")),
    );
    if (passed) {
      chime("win");
      ctx.lumi.react("correct", ctx.words("pass"));
      if (ctx.rules.tricks(ctx.P).includes("dance")) ctx.lumi.act("dance");
    } else {
      chime("soft");
      ctx.lumi.react("love", ctx.words("retry"));
    }
  };

  show();
};
