// A room's gift (#/levelup/R). The game brings her here when she finishes a room's last day, and she can come back any
// time from the map. Some gifts come with a choice: the colour of Lumi's star, or which of her designs Lumi wears.
import { chime, h, picture, toast } from "../ui.js";
import { STARS } from "../lumi/art.js";
import { pixelate } from "../images.js";

const SLOT_NAMES = { belly: "On Lumi's tummy", pin: "Lumi's pin", patch: "Lumi's patch" };

export const render = (el, ctx, arg) => {
  const room = ctx.ROOMS[Number(arg) - 1], R = ctx.rules;
  if (!R.roomDone(ctx.P, room)) return ctx.go("#/");
  const first = !ctx.P.seen.levelUps.includes(room.n);
  ctx.commit({ type: "seenLevelUp", room: room.n });
  const urls = [], gift = room.gift, body = h("div.gift-body");
  ctx.lumi.base("happy");
  if (first) {
    chime("gift");
    ctx.lumi.react("surprised", ctx.words("gift"));
  }

  // Star colour (Room 1).
  const drawStars = () => {
    const now = ctx.P.lumi.star ?? "gold";
    starBox.replaceChildren(
      ...Object.keys(STARS).map((name) =>
        h(
          "button.swatch" + (now === name ? ".on" : ""),
          {
            type: "button",
            "aria-pressed": String(now === name),
            style: { "--c": STARS[name]?.y ?? "#fcd173" },
            onclick: () => {
              ctx.commit({ type: "star", star: name === "gold" ? null : name });
              chime("soft");
              ctx.lumi.react("aha", "Ooh!");
              drawStars();
            },
          },
          h("span.dot"),
          h("span", name),
        ),
      ),
    );
  };
  const starBox = h("div.swatches");

  // Which design Lumi wears in a slot: her pictures from this room (or from anywhere, for the last room).
  const wearPicker = async (slot, keys) => {
    const grid = h("div.thumbs.pick");
    body.append(h("div.wear", h("h3", SLOT_NAMES[slot]), grid));
    const mark = (btn) => [...grid.children].forEach((b) => b.classList.toggle("on", b === btn));
    for (const key of keys) {
      const rec = await ctx.store.getImage(key).catch(() => null);
      if (!rec) continue;
      const btn = h(
        "button.thumb" + (ctx.P.lumi.wear?.[slot]?.img === key ? ".on" : ""),
        {
          type: "button",
          "aria-label": "Lumi wears this design",
          onclick: async () => {
            try {
              const px = await pixelate(rec.blob, slot);
              ctx.commit({ type: "wear", slot, item: { img: key, ...px } });
              chime("right");
              ctx.lumi.react("love", ctx.words("upload"));
              mark(btn);
            } catch (e) {
              toast(e.message);
            }
          },
        },
        picture(rec.blob, "One of your designs", urls),
      );
      grid.append(btn);
    }
    const none = h(
      "button.thumb.none" + (ctx.P.lumi.wear?.[slot] ? "" : ".on"),
      { type: "button", onclick: () => { ctx.commit({ type: "wear", slot, item: null }); mark(none); } },
      "Nothing",
    );
    grid.append(none);
  };

  el.append(
    h(
      "section.card.levelup",
      h("p.kicker", `${ctx.course.roomWord} ${room.n} complete`),
      h("h1", `${room.icon} ${room.name}`),
      h("h2.gift-title", `🎁 ${gift.title}`),
      h("p.lead", gift.text),
      body,
      h("div.row", h("a.big", { href: "#/" }, "Back to the studio")),
    ),
  );

  if (gift.kind === "star") {
    body.append(starBox);
    drawStars();
  }
  if (gift.trick) body.append(h("button.ghost", { type: "button", onclick: () => ctx.lumi.act(gift.trick) }, `Show me the ${gift.trick}`));
  if (gift.kind === "wear") for (const slot of gift.slots) wearPicker(slot, R.wearChoices(ctx.P, room));
  if (gift.kind === "lights") {
    // The collection wall: every design she made, then "dress Lumi" from any of them.
    const wall = h("div.wall");
    body.append(wall);
    ctx.store.allImages().then((pics) => {
      pics.sort((a, b) => a.day - b.day || a.at - b.at);
      wall.append(...pics.map((p) => h("figure.frame", picture(p.blob, `Day ${p.day}`, urls), h("figcaption", `Day ${p.day}`))));
    });
    const all = R.wearChoices(ctx.P, null, 12);
    (async () => {
      for (const slot of ["belly", "pin", "patch"]) await wearPicker(slot, all);
    })();
  }

  return () => urls.forEach((u) => URL.revokeObjectURL(u));
};
