// Her shelf (#/shelf): the badges she earned, her private gallery, and Show Family, a full-screen slideshow for a
// family gallery night. Nothing leaves this browser.
import { h, picture, plural } from "../ui.js";
import { SECRET_BADGES } from "../content/course.js";

export const render = (el, ctx) => {
  const R = ctx.rules, P = ctx.P, urls = [];
  const earned = new Set(R.badges(P, ctx.DAYS));
  ctx.lumi.base(R.awake(P) ? "neutral" : "sleepy");

  const badgeTiles = [
    ...ctx.DAYS.map((d) => {
      const on = earned.has(d.badge.id);
      return h("div.badge" + (on ? ".on" : ""), { title: on ? `${d.badge.name}, Day ${d.day}` : `Finish Day ${d.day}` }, h("span.icon", on ? d.badge.icon : "·"), h("span.name", on ? d.badge.name : `Day ${d.day}`));
    }),
    ...SECRET_BADGES.map((b) => {
      const on = earned.has(b.id);
      return h("div.badge.secret" + (on ? ".on" : ""), { title: on ? b.how : "A secret badge" }, h("span.icon", on ? b.icon : "?"), h("span.name", on ? b.name : "???"));
    }),
  ];

  const gallery = h("div.gallery", h("p.muted", "Loading your work…"));
  const showBtn = h("button.big", { type: "button", disabled: true }, "Show Family ▶");
  el.append(
    h("header.page-head", h("h1", "Your shelf"), h("p.lead", `${plural(earned.size, "badge")} · ${plural(R.lanterns(P), "lantern")} · ${R.xp(P, ctx.DAYS)} XP`)),
    h("section.card", h("h2", "Badges"), h("div.badges", badgeTiles)),
    h(
      "section.card",
      h("h2", "Your gallery"),
      h("p.muted", "Only you can see these. Show Family plays them full screen, for a family gallery night."),
      showBtn,
      R.roomDone(P, ctx.ROOMS[6]) ? h("p", h("a", { href: "#/levelup/7" }, "Dress Lumi ✨")) : null,
      gallery,
    ),
  );

  ctx.store.allImages().then((pics) => {
    pics.sort((a, b) => a.day - b.day || a.at - b.at);
    if (!pics.length) {
      gallery.replaceChildren(h("p.muted", "Your pictures will appear here as you finish each day's task."));
      return;
    }
    const byRoom = new Map();
    for (const p of pics) {
      const r = R.roomOf(p.day);
      if (!byRoom.has(r)) byRoom.set(r, []);
      byRoom.get(r).push(p);
    }
    gallery.replaceChildren(
      ...[...byRoom].map(([r, list]) =>
        h(
          "div.gallery-room",
          h("h3", `${r.icon} ${r.name}`),
          h("div.thumbs", list.map((p) => h("figure.thumb", h("button", { type: "button", onclick: () => slideshow(pics, pics.indexOf(p)) }, picture(p.blob, `Day ${p.day}`, urls)), h("figcaption", `Day ${p.day}`)))),
        ),
      ),
    );
    showBtn.disabled = false;
    showBtn.addEventListener("click", () => slideshow(pics, 0));
  });

  // A full-screen slideshow: arrow keys or buttons to move, Esc to close.
  const slideshow = (pics, start) => {
    let i = start;
    const img = h("img", { alt: "" }), caption = h("p.caption");
    const show = () => {
      const p = pics[i], day = ctx.DAYS[p.day - 1];
      img.src = urls[urls.push(URL.createObjectURL(p.blob)) - 1];
      caption.textContent = `Day ${p.day} · ${day.title}${P.penName ? ` · by ${P.penName}` : ""}`;
    };
    const step = (k) => { i = (i + k + pics.length) % pics.length; show(); };
    const dlg = h(
      "dialog.show",
      { onclose: () => dlg.remove(), onkeydown: (e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); } },
      h("figure", img, caption),
      h(
        "div.show-nav",
        h("button", { type: "button", "aria-label": "Previous", onclick: () => step(-1) }, "←"),
        h("button", { type: "button", onclick: () => dlg.close() }, "Close"),
        h("button", { type: "button", "aria-label": "Next", onclick: () => step(1) }, "→"),
      ),
    );
    document.body.append(dlg);
    show();
    dlg.showModal();
  };

  return () => urls.forEach((u) => URL.revokeObjectURL(u));
};
