// Night Studio storage. Her progress is small text, kept in localStorage (the browser's notebook); her pictures are
// kept in IndexedDB (the browser's bigger drawer). Both stay in this browser on this computer: nothing is ever sent
// anywhere. openStore("night-studio-test") gives the tests their own separate copy.
import { blank } from "./rules.js";

export const VERSION = 1;
// When the progress format changes, add a step here: MIGRATIONS[1] turns version-1 progress into version 2, and so on.
// Old saves are copied to "<name>:progress@v<n>" before they're upgraded.
const MIGRATIONS = {};

// Bring any saved progress up to today's shape: run the migrations, then fill anything missing with defaults.
export const migrate = (raw) => {
  let p = raw && typeof raw === "object" ? raw : {};
  const from = p.v ?? VERSION;
  if (from > VERSION) throw new Error("This was saved by a newer version of Night Studio. Update the game first.");
  for (let v = from; v < VERSION; v++) p = MIGRATIONS[v](p);
  const b = blank();
  return {
    ...b,
    ...p,
    v: VERSION,
    lanterns: Array.isArray(p.lanterns) ? p.lanterns : [],
    days: p.days && typeof p.days === "object" ? p.days : {},
    lumi: { ...b.lumi, ...p.lumi, wear: { ...(p.lumi?.wear ?? {}) } },
    seen: { ...b.seen, ...p.seen },
  };
};

const request = (r) => new Promise((resolve, reject) => { r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); });
const finished = (t) => new Promise((resolve, reject) => { t.oncomplete = () => resolve(); t.onerror = t.onabort = () => reject(t.error); });
const toBase64 = (blob) => new Promise((resolve, reject) => {
  const r = new FileReader();
  r.onload = () => resolve(String(r.result).split(",")[1]);
  r.onerror = () => reject(r.error);
  r.readAsDataURL(blob);
});
const fromBase64 = (data, type) => {
  const bin = atob(data), bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type });
};

export const openStore = (name = "night-studio") => {
  const KEY = `${name}:progress`, LAST_BACKUP = `${name}:lastBackup`, STORE = "images";
  let db = null;
  const open = () =>
    (db ??= new Promise((resolve, reject) => {
      const r = indexedDB.open(name, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(STORE, { keyPath: "key" });
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    }));
  const images = async (mode) => (await open()).transaction(STORE, mode);

  const store = {
    // ----- progress -----
    load() {
      let raw = null;
      try {
        raw = JSON.parse(localStorage.getItem(KEY) || "null");
        if (raw?.v && raw.v < VERSION) localStorage.setItem(`${KEY}@v${raw.v}`, JSON.stringify(raw));
      } catch {
        raw = null;
      }
      return migrate(raw);
    },
    save(P) {
      try {
        localStorage.setItem(KEY, JSON.stringify(P));
        return true;
      } catch {
        return false; // storage blocked or full: the game keeps working for this visit
      }
    },
    // ----- pictures: { key, day, blob, w, h, at } -----
    async putImage(rec) {
      const t = await images("readwrite");
      t.objectStore(STORE).put(rec);
      await finished(t);
    },
    async getImage(key) {
      return request((await images("readonly")).objectStore(STORE).get(key));
    },
    async allImages() {
      return request((await images("readonly")).objectStore(STORE).getAll());
    },
    async deleteImage(key) {
      const t = await images("readwrite");
      t.objectStore(STORE).delete(key);
      await finished(t);
    },
    // ----- keeping it safe -----
    // Ask Chrome to keep this site's data even when the disk gets full (Chrome decides quietly, no pop-up).
    persist: () => navigator.storage?.persist?.() ?? Promise.resolve(false),
    persisted: () => navigator.storage?.persisted?.() ?? Promise.resolve(false),
    lastBackup: () => localStorage.getItem(LAST_BACKUP),
    // Everything (progress + pictures) in one JSON file she or you can keep.
    async backup(P, date) {
      const pics = await store.allImages();
      const file = {
        kind: `${name}-backup`, // "night-studio-backup" for Night Studio, so its old backups still restore
        format: 1,
        exportedAt: new Date().toISOString(),
        progress: P,
        images: await Promise.all(pics.map(async (r) => ({ key: r.key, day: r.day, w: r.w, h: r.h, at: r.at, type: r.blob.type, data: await toBase64(r.blob) }))),
      };
      try {
        localStorage.setItem(LAST_BACKUP, date);
      } catch {}
      return new Blob([JSON.stringify(file)], { type: "application/json" });
    },
    // Replace everything with a backup file's contents. Returns the restored progress.
    async restore(text) {
      let file;
      try {
        file = JSON.parse(text);
      } catch {
        throw new Error("That file isn't a backup of this course.");
      }
      if (file?.kind !== `${name}-backup`) throw new Error("That file isn't a backup of this course.");
      const P = migrate(file.progress);
      const pics = (file.images ?? []).map((im) => ({ key: im.key, day: im.day, w: im.w, h: im.h, at: im.at, blob: fromBase64(im.data, im.type) }));
      const t = await images("readwrite");
      const s = t.objectStore(STORE);
      s.clear();
      for (const p of pics) s.put(p);
      await finished(t);
      store.save(P);
      return P;
    },
    // Start over: forget progress and pictures (the grown-ups page asks to type RESET first).
    async reset() {
      try {
        localStorage.removeItem(KEY);
      } catch {}
      const t = await images("readwrite");
      t.objectStore(STORE).clear();
      await finished(t);
      return blank();
    },
    // Remove this store completely (used by the tests to clean up after themselves).
    async destroy() {
      try {
        localStorage.removeItem(KEY);
        localStorage.removeItem(LAST_BACKUP);
      } catch {}
      if (db) (await db).close();
      db = null;
      await request(indexedDB.deleteDatabase(name)).catch(() => {});
    },
  };
  return store;
};
