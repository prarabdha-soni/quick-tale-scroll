const STORAGE_KEY = "qts-reader-prefs";

export type ReaderTheme = "light" | "sepia" | "dark";
export type FontScale = 0 | 1 | 2 | 3;

export type ReaderPreferences = {
  theme: ReaderTheme;
  fontScale: FontScale;
};

const defaultPrefs: ReaderPreferences = {
  theme: "light",
  fontScale: 1,
};

export function loadReaderPreferences(): ReaderPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPrefs;
    const v = JSON.parse(raw) as Partial<ReaderPreferences>;
    const theme = v.theme === "sepia" || v.theme === "dark" || v.theme === "light" ? v.theme : defaultPrefs.theme;
    const fs = v.fontScale;
    const fontScale = fs === 0 || fs === 1 || fs === 2 || fs === 3 ? fs : defaultPrefs.fontScale;
    return { theme, fontScale };
  } catch {
    return defaultPrefs;
  }
}

export function saveReaderPreferences(next: ReaderPreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}
