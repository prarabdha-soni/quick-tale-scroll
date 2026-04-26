import type { Story } from "@/data/stories";

const EXCERPT_MAX = 450;

function clampPageIndex(pageIndex: number, pageCount: number): number {
  if (pageCount <= 0) return 0;
  return Math.max(0, Math.min(pageIndex, pageCount - 1));
}

/** Plain-text message for WhatsApp (Markdown-style *bold* is ok in WA). */
export function buildStoryWhatsAppMessage(story: Story, pageIndex: number): string {
  const i = clampPageIndex(pageIndex, story.pages.length);
  const raw = story.pages[i]?.text ?? "";
  let excerpt = raw.replace(/\s+/g, " ").trim();
  if (excerpt.length > EXCERPT_MAX) excerpt = excerpt.slice(0, EXCERPT_MAX).trimEnd() + "…";

  const origin = typeof window !== "undefined" && window.location?.origin ? window.location.origin : "";

  return [
    `*${story.title}*`,
    `${story.genre} · ${story.author}`,
    "",
    story.hook,
    "",
    `Part ${i + 1} / ${story.pages.length}`,
    "",
    excerpt,
    "",
    origin ? `— Nishu Stories\n${origin}` : "— Nishu Stories",
  ].join("\n");
}

export function shareStoryToWhatsApp(story: Story, pageIndex: number): void {
  const url = `https://wa.me/?text=${encodeURIComponent(buildStoryWhatsAppMessage(story, pageIndex))}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
