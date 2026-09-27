// Night Studio pictures: shrink her uploads before they're saved, and turn a design into Lumi-sized pixels.
import { SLOTS, SLOT_KEYS } from "./lumi/art.js";

const canvasOf = (w, h) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
};
const decode = async (blob) => {
  try {
    return await createImageBitmap(blob);
  } catch {
    throw new Error("Chrome can't open that kind of picture. Try a PNG or JPG (in Figma: Export → PNG).");
  }
};

// Shrink a picture to at most 1600 px on its long side and save it as WebP (small files, and see-through areas stay
// see-through). Screenshots on big screens are often 5,000 px wide; that detail isn't needed for her gallery.
export const prepareUpload = async (file) => {
  if (file.type && !file.type.startsWith("image/")) throw new Error("That isn't a picture. Choose a PNG or JPG.");
  const bmp = await decode(file);
  const k = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const w = Math.max(1, Math.round(bmp.width * k)), h = Math.max(1, Math.round(bmp.height * k));
  const c = canvasOf(w, h), ctx = c.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bmp, 0, 0, w, h);
  bmp.close?.();
  const blob = await new Promise((resolve) => c.toBlob(resolve, "image/webp", 0.85));
  return { blob: blob ?? file, w, h };
};

// ---------- her design as Lumi pixels ----------
// 1. Find the design: if the picture has see-through areas, that's the background; otherwise the most common corner
//    colour is. Crop to what's left.  2. Fit it into the slot (1 px margin), averaging colours.  3. Round the patch.
// 4. Reduce to a few colours (k-means).  5. Add a 1-px dark outline, like a die-cut sticker.
// Returns { rows, pal } for Lumi (letters from SLOT_KEYS; "o" is Lumi's own outline colour).
const hex = (r, g, b) => "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const dist2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;

const findDesign = (bmp) => {
  const W = Math.min(256, bmp.width), H = Math.max(1, Math.round((bmp.height * W) / bmp.width));
  const c = canvasOf(W, H), ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(bmp, 0, 0, W, H);
  const px = ctx.getImageData(0, 0, W, H).data, at = (x, y) => (y * W + x) * 4;
  const corners = [at(0, 0), at(W - 1, 0), at(0, H - 1), at(W - 1, H - 1)];
  const clear = corners.some((i) => px[i + 3] < 128);
  const counts = new Map();
  for (const i of corners) {
    const key = `${px[i] >> 4},${px[i + 1] >> 4},${px[i + 2] >> 4}`;
    counts.set(key, [(counts.get(key)?.[0] ?? 0) + 1, [px[i], px[i + 1], px[i + 2]]]);
  }
  const bg = clear ? null : [...counts.values()].sort((a, b) => b[0] - a[0])[0][1];
  const isBg = (i) => (bg ? dist2([px[i], px[i + 1], px[i + 2]], bg) < 40 * 40 : px[i + 3] < 128);
  let x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (!isBg(at(x, y))) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  if (x1 < 0) return { bg, box: [0, 0, bmp.width, bmp.height] }; // nothing stands out: use the whole picture
  const k = bmp.width / W;
  return { bg, box: [x0 * k, y0 * k, (x1 - x0 + 1) * k, (y1 - y0 + 1) * k] };
};

const kmeans = (colours, n) => {
  // Start from colours spread across the brightness range, so the result is the same every time.
  const sorted = [...colours].sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]));
  let centres = Array.from({ length: Math.min(n, sorted.length) }, (_, i) => sorted[Math.floor(((i + 0.5) * sorted.length) / Math.min(n, sorted.length))]);
  let label = [];
  for (let round = 0; round < 8; round++) {
    label = colours.map((c) => centres.reduce((best, m, j) => (dist2(c, m) < dist2(c, centres[best]) ? j : best), 0));
    centres = centres.map((m, j) => {
      const mine = colours.filter((_, i) => label[i] === j);
      return mine.length ? [0, 1, 2].map((ch) => mine.reduce((s, c) => s + c[ch], 0) / mine.length) : m;
    });
  }
  return { centres, label };
};

export const pixelate = async (blob, slotName) => {
  const slot = SLOTS[slotName], letters = SLOT_KEYS[slotName];
  const bmp = await decode(blob);
  const { bg, box } = findDesign(bmp);
  // Fit the design inside the slot, leaving 1 px for the outline.
  const iw = slot.w - 2, ih = slot.h - 2, k = Math.min(iw / box[2], ih / box[3]);
  const dw = Math.max(1, Math.round(box[2] * k)), dh = Math.max(1, Math.round(box[3] * k));
  const ox = 1 + Math.floor((iw - dw) / 2), oy = 1 + Math.floor((ih - dh) / 2);
  const c = canvasOf(slot.w, slot.h), ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bmp, box[0], box[1], box[2], box[3], ox, oy, dw, dh);
  bmp.close?.();
  const px = ctx.getImageData(0, 0, slot.w, slot.h).data;
  // Which pixels are part of the design.
  const on = [], colours = [];
  for (let y = 0; y < slot.h; y++) {
    for (let x = 0; x < slot.w; x++) {
      const i = (y * slot.w + x) * 4, rgb = [px[i], px[i + 1], px[i + 2]];
      const inCircle = !slot.round || (x + 0.5 - slot.w / 2) ** 2 + (y + 0.5 - slot.h / 2) ** 2 <= (slot.w / 2 - 1) ** 2;
      const solid = px[i + 3] >= 128 && !(bg && dist2(rgb, bg) < 40 * 40) && inCircle;
      on.push(solid);
      if (solid) colours.push(rgb);
    }
  }
  // A design that is all background (a plain square, say) keeps its square.
  if (!colours.length) for (let i = 0; i < on.length; i++) if (px[i * 4 + 3] >= 128) { on[i] = true; colours.push([px[i * 4], px[i * 4 + 1], px[i * 4 + 2]]); }
  const { centres, label } = kmeans(colours, letters.length);
  const pal = {};
  centres.forEach((m, j) => (pal[letters[j]] = hex(...m)));
  const cells = [];
  let next = 0;
  for (let i = 0; i < on.length; i++) cells.push(on[i] ? letters[label[next++]] : ".");
  // Outline: a see-through pixel next to the design becomes Lumi's dark outline colour.
  const at = (x, y) => (x < 0 || y < 0 || x >= slot.w || y >= slot.h ? "." : cells[y * slot.w + x]);
  const rows = [];
  for (let y = 0; y < slot.h; y++) {
    let r = "";
    for (let x = 0; x < slot.w; x++) {
      const ch = at(x, y);
      const edge = ch === "." && [at(x - 1, y), at(x + 1, y), at(x, y - 1), at(x, y + 1)].some((n) => n !== "." && n !== "o");
      r += edge ? "o" : ch;
    }
    rows.push(r);
  }
  return { rows, pal };
};
