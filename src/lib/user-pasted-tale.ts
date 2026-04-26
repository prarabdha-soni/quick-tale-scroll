import type { Story, StoryPage } from "@/data/stories";

const STORAGE_KEY = "qts-pasted-tale-v1";

/** 0-based index where the pasted tale is inserted (human-visible 4th slot). */
export const USER_TALE_INSERT_INDEX = 3;

export type PastedTalePayload = {
  title: string;
  body: string;
};

export function loadPastedTale(): PastedTalePayload | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as { title?: string; body?: string };
    const title = typeof v.title === "string" ? v.title.trim() : "";
    const body = typeof v.body === "string" ? v.body.trim() : "";
    if (!title || !body) return null;
    return { title, body };
  } catch {
    return null;
  }
}

export function savePastedTale(payload: PastedTalePayload) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ title: payload.title.trim(), body: payload.body.trim() }));
  } catch {
    /* ignore */
  }
}

export function clearPastedTale() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

function splitBodyToPages(body: string): StoryPage[] {
  const trimmed = body.trim();
  const blocks = trimmed.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
  if (blocks.length > 0) return blocks.map((text) => ({ text }));
  return [{ text: trimmed }];
}

export function talePayloadToStory(payload: PastedTalePayload): Story {
  const pages = splitBodyToPages(payload.body);
  const fullText = pages.map((p) => p.text).join(" ");
  const words = fullText.split(/\s+/).filter(Boolean).length;
  const estimatedMinutes = Math.max(1, Math.min(45, Math.round(words / 200)));
  const hookSource = pages[0]?.text ?? payload.title;
  const hook = hookSource.length > 140 ? `${hookSource.slice(0, 137)}…` : hookSource;

  return {
    title: payload.title.trim(),
    author: "You",
    genre: "Your tale",
    coverImage: "/stories/aakhiri-library.png",
    coverAlt: "Your pasted tale",
    tags: ["Personal"],
    hook,
    estimatedMinutes,
    pages,
  };
}

export function mergeCatalogWithPasted(catalog: Story[], payload: PastedTalePayload | null): Story[] {
  if (!payload) return catalog;
  const user = talePayloadToStory(payload);
  const i = USER_TALE_INSERT_INDEX;
  return [...catalog.slice(0, i), user, ...catalog.slice(i)];
}
