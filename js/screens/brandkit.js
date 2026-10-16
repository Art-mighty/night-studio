// The client's brand kit (#/brand-kit), only in courses whose pack has a BRAND (Lumia Merch Lab). Everything she needs
// on a merch day, one click away: the client's rules, the logo files, Lumi's poses, the colours and the fonts.
// Lumi's poses aren't image files: they're drawn from the same pixel data as Lumi in the corner, so they're always
// crisp and always in the official colours.
import { h, toast } from "../ui.js";
import { paint } from "../lumi/kit.js";
import { composeLumi } from "../lumi/lumi.js";
import { MOVES } from "../lumi/moves.js";

// Every pose is drawn in the same 80 × 108 art-pixel frame, standing on the same spot (FEET), so poses swap without
// jumping around. The frame fits all the poses below, including the hop in "Yay" and the arm in "Wave".
const FRAME = [80, 108], FEET = [40, 105];
// The sizes she can download: 1× is the 80 × 108 frame itself, 32× is about 22 × 29 cm at 300 DPI.
const SIZES = [1, 4, 8, 16, 32];

// One of Lumi's poses as a PNG data address, at a whole-number scale (1 art pixel = `scale` × `scale` real pixels).
const lumiPng = (move, scale) => {
  const m = MOVES[move], at = { x: FEET[0] * scale, y: FEET[1] * scale, scale };
  const fr = composeLumi({ t: m.key, ...at, idle: false, shadow: false, pose: m.pose(m.key, at) });
  const c = h("canvas", { width: FRAME[0] * scale, height: FRAME[1] * scale }), g = c.getContext("2d");
  g.setTransform(scale * fr.f, 0, 0, scale, fr.X, fr.Y);
  paint(g, fr.figure.rows, fr.pal, fr.figure.x, fr.figure.y);
  return c.toDataURL("image/png");
};

export const render = (el, ctx) => {
  const B = ctx.course.BRAND;
  ctx.lumi.base(ctx.rules.awake(ctx.P) ? "neutral" : "sleepy");

  const copy = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex);
      toast(`Copied ${hex}. Paste it into Figma's colour box.`);
    } catch {
      toast(`The colour is ${hex}`);
    }
  };

  el.append(
    h("header.page-head", h("h1", B.title), h("p.lead", B.intro)),
    h("section.card", h("h2", "The client's rules"), h("ol.rules", B.rules.map(([t, d]) => h("li", h("strong", t), " ", d)))),
    h(
      "section.card",
      h("h2", "Logos"),
      h("p.muted", "Click a logo to download it, then drag the file into Figma. Ink is for light backgrounds, amber for dark ones."),
      h(
        "div.kit-grid",
        B.logos.map((l) =>
          h(
            "a.kit-tile" + (l.dark ? ".on-dark" : ".on-light"),
            { href: l.file, download: l.file.split("/").pop() },
            h("img", { src: l.file, alt: l.name, loading: "lazy" }),
            h("span", l.name),
            h("small", l.use),
          ),
        ),
      ),
    ),
    h(
      "section.card",
      h("h2", "Lumi's poses"),
      h("p.muted", "Every pose comes in the same 80 × 108 pixel frame. Pixel art only grows by whole numbers: 4× means every Lumi pixel becomes a 4×4 square. Download the size you need, and never stretch it by hand in Figma."),
      h(
        "div.kit-grid",
        B.poses.map(([move, name]) =>
          h(
            "div.kit-tile.on-dark",
            h("img.pixel", { src: lumiPng(move, 4), alt: `Lumi, ${name}` }),
            h("span", name),
            // Big sizes are made only when clicked (a 32× Lumi is over 6 million pixels).
            h("small.sizes", SIZES.map((s) => h("a", { href: "#", download: `Lumi-${move}-${s}x.png`, onclick: (e) => { e.currentTarget.href = lumiPng(move, s); } }, `${s}×`))),
          ),
        ),
      ),
    ),
    h(
      "section.card",
      h("h2", "Colours"),
      h("p.muted", "Click a colour to copy its code."),
      h(
        "div.swatches.kit-colours",
        B.colours.map(([hex, name]) =>
          h("button.swatch", { type: "button", style: `--c:${hex}`, onclick: () => copy(hex) }, h("span.dot"), h("span", name), h("code", hex)),
        ),
      ),
    ),
    h(
      "section.card",
      h("h2", "Fonts"),
      h("p.muted", "Both are free Google Fonts, and Figma already has every Google Font: just type the name into Figma's font box."),
      h("ul.fonts", B.fonts.map((f) => h("li", h("a", { href: f.link, target: "_blank", rel: "noopener" }, f.name), " · ", f.use))),
    ),
  );
};
