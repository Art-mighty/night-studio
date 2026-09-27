// Small helpers shared by the screens.

// h("button.big#go", { onclick: … }, "Start") builds an element: a tag with optional .classes and #id, then
// attributes (on… become event listeners, class/style/data-… work as usual, false/null are skipped), then children
// (text, elements, arrays; null and false are skipped). It's the whole "framework" of this game.
export const h = (sel, attrs, ...kids) => {
  const [, tag = "div", rest = ""] = /^([a-z0-9-]*)(.*)$/i.exec(sel);
  const el = document.createElement(tag || "div");
  for (const [, kind, name] of rest.matchAll(/([.#])([\w-]+)/g)) kind === "." ? el.classList.add(name) : (el.id = name);
  if (attrs && (typeof attrs !== "object" || attrs instanceof Node || Array.isArray(attrs))) {
    kids.unshift(attrs);
    attrs = null;
  }
  for (const [k, v] of Object.entries(attrs ?? {})) {
    if (v === false || v == null) continue;
    if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (k === "class") el.className += ` ${v}`;
    else if (k === "style" && typeof v === "object") for (const [p, val] of Object.entries(v)) p.startsWith("--") ? el.style.setProperty(p, val) : (el.style[p] = val);
    else if (k in el && typeof v !== "string") el[k] = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  const add = (kid) => {
    if (kid == null || kid === false) return;
    if (Array.isArray(kid)) kid.forEach(add);
    else el.append(kid instanceof Node ? kid : String(kid));
  };
  kids.forEach(add);
  return el;
};

// "1 lantern", "3 lanterns".
export const plural = (n, word, many = `${word}s`) => `${n} ${n === 1 ? word : many}`;

// Pick one of a list (for Lumi's words), filling in {name}.
export const pick = (list, name = "") => list[Math.floor(Math.random() * list.length)].replace("{name}", name);

// ---------- sound: a soft synthesized chime, no audio files ----------
let audio = null, muted = false;
export const setMuted = (m) => (muted = !!m);
const TUNES = {
  soft: [[880, 0, 0.5, 0.06]],
  right: [[784, 0, 0.35, 0.07], [1175, 0.08, 0.5, 0.06]],
  wrong: [[392, 0, 0.35, 0.05, "triangle"], [330, 0.12, 0.5, 0.04, "triangle"]],
  win: [[523, 0], [659, 0.09], [784, 0.18], [1047, 0.27, 0.9]],
  gift: [[784, 0], [988, 0.1], [1175, 0.2], [1568, 0.32, 1.1, 0.05]],
};
export const chime = (kind = "soft") => {
  if (muted) return;
  try {
    audio ??= new AudioContext();
    if (audio.state === "suspended") audio.resume();
  } catch {
    return;
  }
  const t = audio.currentTime + 0.02;
  for (const [freq, at, len = 0.6, vol = 0.07, type = "sine"] of TUNES[kind] ?? TUNES.soft) {
    const o = audio.createOscillator(), g = audio.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t + at);
    g.gain.exponentialRampToValueAtTime(vol, t + at + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + at + len);
    o.connect(g).connect(audio.destination);
    o.start(t + at);
    o.stop(t + at + len + 0.05);
  }
};

// A "+10 XP" that floats up from an element and fades.
export const xpFloat = (from, amount) => {
  if (!amount) return;
  const r = from.getBoundingClientRect();
  const el = h("div.xp-float", { style: { left: `${r.left + r.width / 2}px`, top: `${r.top}px` } }, `+${amount} XP`);
  document.body.append(el);
  el.addEventListener("animationend", () => el.remove());
};

// A short message at the bottom of the screen.
export const toast = (text, ms = 3200) => {
  const el = h("div.toast", { role: "status" }, text);
  document.body.append(el);
  setTimeout(() => el.classList.add("out"), ms);
  setTimeout(() => el.remove(), ms + 400);
};

// Mac or not, for keyboard hints.
export const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

// ---------- a video card: nothing loads from YouTube until she presses Play ----------
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
export const videoCard = (v, n, { watched, onWatched }) => {
  const start = v.start ?? 0;
  const watchUrl = `https://www.youtube.com/watch?v=${v.id}${start ? `&t=${start}s` : ""}`;
  const params = new URLSearchParams({ rel: "0", modestbranding: "1", playsinline: "1", autoplay: "1" });
  if (start) params.set("start", String(start));
  if (v.end) params.set("end", String(v.end));
  const screen = h(
    "button.video-poster",
    {
      type: "button",
      "aria-label": `Play video: ${v.title}`,
      onclick: () =>
        screen.replaceWith(
          h("iframe.video-frame", {
            src: `https://www.youtube-nocookie.com/embed/${v.id}?${params}`,
            title: v.title,
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
            allowfullscreen: true,
            referrerpolicy: "strict-origin-when-cross-origin",
          }),
        ),
    },
    h("span.play", "▶"),
    h("span.poster-title", v.title),
  );
  const done = h("button.watched", { type: "button", disabled: watched }, watched ? "Watched ✓" : "I watched it");
  done.addEventListener("click", () => {
    done.disabled = true;
    done.textContent = "Watched ✓";
    onWatched(done);
  });
  return h(
    "article.video",
    h("div.video-media", screen),
    h(
      "div.video-info",
      h("p.video-meta", `Video ${n} · ${v.channel} · about ${v.min} min`, v.end || start ? ` (plays ${mmss(start)}–${v.end ? mmss(v.end) : "end"})` : ""),
      v.note ? h("p.video-note", v.note) : null,
      h("div.video-actions", done, h("a.link", { href: watchUrl, target: "_blank", rel: "noopener" }, "Open on YouTube ↗")),
    ),
  );
};

// ---------- the upload box: drop, choose, or paste a picture ----------
// onFiles(files) gets the pictures. Returns { el, stop } — call stop() when the screen goes away (ends the paste
// listener).
export const uploadZone = (onFiles) => {
  const input = h("input", { type: "file", accept: "image/*", multiple: true, hidden: true, onchange: () => { if (input.files.length) onFiles([...input.files]); input.value = ""; } });
  const shot = isMac ? "⌘ Shift 4" : "Windows key + Shift + S";
  const paste = isMac ? "⌘ V" : "Ctrl V";
  const el = h(
    "div.drop",
    {
      tabindex: 0,
      role: "button",
      "aria-label": "Add a picture of your work",
      onclick: () => input.click(),
      onkeydown: (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), input.click()),
      ondragover: (e) => { e.preventDefault(); el.classList.add("over"); },
      ondragleave: () => el.classList.remove("over"),
      ondrop: (e) => {
        e.preventDefault();
        el.classList.remove("over");
        const files = [...(e.dataTransfer?.files ?? [])].filter((f) => f.type.startsWith("image/"));
        if (files.length) onFiles(files);
      },
    },
    input,
    h("strong", "Add a picture of your work"),
    h("span", "Drop it here, click to choose it, or take a screenshot (", h("kbd", shot), ") and paste it (", h("kbd", paste), ")."),
  );
  const onPaste = (e) => {
    const files = [...(e.clipboardData?.files ?? [])].filter((f) => f.type.startsWith("image/"));
    if (files.length) {
      e.preventDefault();
      onFiles(files);
    }
  };
  document.addEventListener("paste", onPaste);
  return { el, stop: () => document.removeEventListener("paste", onPaste) };
};

// Show a picture from her storage. Returns the <img> (its object URL is freed when the screen is cleaned up).
export const picture = (blob, alt, urls) => {
  const url = URL.createObjectURL(blob);
  urls.push(url);
  return h("img", { src: url, alt, loading: "lazy", decoding: "async" });
};
