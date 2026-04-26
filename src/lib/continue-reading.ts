const STORAGE_KEY = "qts-continue";

export type ContinueReading = { storyIndex: number; pageIndex: number };

export function loadContinueReading(): ContinueReading | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as ContinueReading;
    if (typeof v?.storyIndex === "number" && typeof v?.pageIndex === "number") return v;
  } catch {
    /* ignore */
  }
  return null;
}

export function saveContinueReading(snapshot: ContinueReading) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* ignore */
  }
}
