import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, Bookmark, ChevronLeft, ChevronRight, Coffee, Moon, Sun, Type } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Story } from "@/data/stories";
import { loadReaderPreferences, saveReaderPreferences, type FontScale, type ReaderTheme } from "@/lib/reader-preferences";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const FONT_STEPS: Record<FontScale, string> = {
  0: "text-[1.22rem] leading-[1.62] sm:text-[1.28rem]",
  1: "text-[1.38rem] leading-[1.64] sm:text-[1.48rem]",
  2: "text-[1.54rem] leading-[1.66] sm:text-[1.64rem]",
  3: "text-[1.72rem] leading-[1.68] sm:text-[1.82rem]",
};

type StoryReaderProps = {
  stories: Story[];
  storyIndex: number;
  pageIndex: number;
  onPageIndex: (index: number) => void;
  onNavigateHome: () => void;
};

export function StoryReader({ stories, storyIndex, pageIndex, onPageIndex, onNavigateHome }: StoryReaderProps) {
  const story = stories[storyIndex];
  const totalBlocks = story.pages.length;

  const [prefs, setPrefs] = useState(loadReaderPreferences);
  const { theme, fontScale } = prefs;

  const setTheme = useCallback((t: ReaderTheme) => {
    setPrefs((p) => {
      const next = { ...p, theme: t };
      saveReaderPreferences(next);
      return next;
    });
  }, []);

  const cycleTheme = useCallback(() => {
    const order: ReaderTheme[] = ["light", "sepia", "dark"];
    const i = order.indexOf(theme);
    setTheme(order[(i + 1) % order.length]);
  }, [theme, setTheme]);

  const cycleFont = useCallback(() => {
    setPrefs((p) => {
      const nextScale = ((p.fontScale + 1) % 4) as FontScale;
      const next = { ...p, fontScale: nextScale };
      saveReaderPreferences(next);
      return next;
    });
  }, []);

  const carouselRef = useRef<HTMLDivElement>(null);
  const pageIndexRef = useRef(pageIndex);
  pageIndexRef.current = pageIndex;

  const scrollRaf = useRef<number | null>(null);
  const prevStoryKey = useRef<number | null>(null);

  const readPct = totalBlocks <= 1 ? 100 : clamp((pageIndex / (totalBlocks - 1)) * 100, 0, 100);
  const approxBlock = pageIndex + 1;
  const minutesLeft = Math.max(
    0,
    Math.ceil(((totalBlocks - pageIndex - 1) / Math.max(1, totalBlocks)) * story.estimatedMinutes),
  );

  const scrollCarouselToPage = useCallback((index: number, behavior: ScrollBehavior) => {
    const el = carouselRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0) return;
    const i = clamp(index, 0, totalBlocks - 1);
    el.scrollTo({ left: i * w, behavior });
  }, [totalBlocks]);

  const syncIndexFromScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0) return;
    const next = clamp(Math.round(el.scrollLeft / w), 0, totalBlocks - 1);
    if (next !== pageIndexRef.current) onPageIndex(next);
  }, [onPageIndex, totalBlocks]);

  const onCarouselScroll = useCallback(() => {
    if (scrollRaf.current != null) cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(() => {
      scrollRaf.current = null;
      syncIndexFromScroll();
    });
  }, [syncIndexFromScroll]);

  useLayoutEffect(() => {
    const storyChanged = prevStoryKey.current !== storyIndex;
    if (storyChanged) prevStoryKey.current = storyIndex;

    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.queueMicrotask(() => {
      const el = carouselRef.current;
      if (!el) return;
      const w = el.clientWidth;
      if (w <= 0) return;
      if (storyChanged) {
        scrollCarouselToPage(pageIndex, "instant");
        return;
      }
      const current = Math.round(el.scrollLeft / w);
      if (current === pageIndex) return;
      scrollCarouselToPage(pageIndex, reduce ? "instant" : "smooth");
    });
  }, [storyIndex, pageIndex, scrollCarouselToPage]);

  useLayoutEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      scrollCarouselToPage(pageIndexRef.current, "instant");
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [scrollCarouselToPage, story.title, totalBlocks]);

  useLayoutEffect(() => {
    return () => {
      if (scrollRaf.current != null) cancelAnimationFrame(scrollRaf.current);
    };
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onScrollEnd = () => syncIndexFromScroll();
    el.addEventListener("scrollend", onScrollEnd);
    return () => el.removeEventListener("scrollend", onScrollEnd);
  }, [syncIndexFromScroll, storyIndex, totalBlocks]);

  const goPrev = useCallback(() => {
    onPageIndex(clamp(pageIndex - 1, 0, totalBlocks - 1));
  }, [onPageIndex, pageIndex, totalBlocks]);

  const goNext = useCallback(() => {
    onPageIndex(clamp(pageIndex + 1, 0, totalBlocks - 1));
  }, [onPageIndex, pageIndex, totalBlocks]);

  const themeIcon =
    theme === "light" ? <Sun className="h-5 w-5" /> : theme === "sepia" ? <Coffee className="h-5 w-5" /> : <Moon className="h-5 w-5" />;

  const surface =
    theme === "light"
      ? "reader-surface-light reader-bg"
      : theme === "sepia"
        ? "reader-surface-sepia reader-bg"
        : "reader-surface-dark reader-bg";

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col font-sans", surface)}>
      <div className="reader-border shrink-0 border-b bg-primary/[0.06] px-2 pt-[max(0.5rem,env(safe-area-inset-top))] backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-1 py-2 sm:gap-2">
          <Button type="button" variant="ghost" size="icon" className="focus-ring shrink-0 reader-ink" aria-label="Back to home" onClick={onNavigateHome}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="reader-ink min-w-0 flex-1 truncate text-center font-serif text-base font-semibold sm:text-lg">{story.title}</h2>
          <Button type="button" variant="ghost" size="icon" className="focus-ring reader-ink" aria-label={`Text size step ${fontScale + 1} of 4`} onClick={cycleFont}>
            <Type className="h-5 w-5" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="focus-ring reader-ink" aria-label={`Reading theme: ${theme}. Tap to change.`} onClick={cycleTheme}>
            {themeIcon}
          </Button>
        </div>
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-1 pb-2">
          <div className="reader-border h-0.5 flex-1 overflow-hidden rounded-full bg-black/10">
            <div className="h-full rounded-full bg-primary transition-[width] motion-reduce:transition-none" style={{ width: `${readPct}%` }} />
          </div>
          <div className="flex shrink-0 flex-col items-end gap-0.5 text-right">
            <span className="reader-muted tabular-nums text-[11px] font-medium">
              Part {approxBlock} / {totalBlocks}
            </span>
            <span className="reader-muted text-[10px]">{minutesLeft > 0 ? `~${minutesLeft} min left` : "End"}</span>
          </div>
        </div>
      </div>

      <article className="relative mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col">
        <div className="reader-border relative flex min-h-0 flex-1 flex-col overflow-hidden border-x border-b shadow-sm">
          <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.08] [background-image:linear-gradient(hsl(var(--book-ink))_1px,transparent_1px)] [background-size:100%_2rem]" />

          <Bookmark className="pointer-events-none absolute bottom-28 right-4 z-[1] h-14 w-14 rotate-[-10deg] text-primary/10 sm:bottom-24" />

          <div
            ref={carouselRef}
            onScroll={onCarouselScroll}
            onTouchEnd={() => requestAnimationFrame(() => syncIndexFromScroll())}
            onTouchCancel={() => requestAnimationFrame(() => syncIndexFromScroll())}
            style={{ touchAction: "pan-x" }}
            className="reader-bg relative z-0 flex min-h-0 flex-1 snap-x snap-mandatory flex-nowrap overflow-x-auto overflow-y-hidden overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Story pages — swipe left or right between sections, or use the buttons below"
          >
            {story.pages.map((page, idx) => (
              <section
                key={`${storyIndex}-p-${idx}`}
                className="min-w-full w-full shrink-0 snap-start snap-always"
                aria-label={`Part ${idx + 1} of ${totalBlocks}`}
              >
                <div
                  className="reader-bg flex h-full max-h-full min-h-0 flex-col overflow-y-auto overscroll-y-contain px-5 pb-28 pt-6 sm:px-8 sm:pb-24 sm:pt-8 md:px-12"
                  style={{ touchAction: "pan-y pinch-zoom" }}
                >
                  {idx === 0 ? (
                    <header className="reader-border mb-6 shrink-0 border-b pb-5">
                      <p className="reader-primary text-xs uppercase tracking-[0.22em]">{story.genre}</p>
                      <div className="mt-2 flex items-start justify-between gap-3">
                        <h1 className="reader-ink max-w-prose font-serif text-2xl font-bold leading-tight sm:text-3xl">{story.title}</h1>
                        <Bookmark className="reader-primary mt-1 h-5 w-5 shrink-0 opacity-80" />
                      </div>
                      <p className="reader-muted mt-2 text-sm">{story.hook}</p>
                    </header>
                  ) : (
                    <div className="reader-muted mb-5 flex shrink-0 items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em]">
                      <span className="reader-border h-px flex-1 bg-current opacity-30" aria-hidden />
                      Part {idx + 1}
                      <span className="reader-border h-px flex-1 bg-current opacity-30" aria-hidden />
                    </div>
                  )}

                  <div className="mx-auto w-full max-w-prose flex-1 pb-4">
                    {page.image ? (
                      <figure className="mb-5 shrink-0">
                        <div className="reader-border overflow-hidden rounded-lg border shadow-sm">
                          <img
                            src={page.image.src}
                            alt={page.image.alt}
                            className="max-h-[min(38vh,280px)] w-full object-cover sm:max-h-[min(42vh,340px)]"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <figcaption className="reader-muted mt-2 text-center text-[10px] uppercase tracking-[0.16em]">
                          {/[\u0900-\u097F]/.test(story.title) ? "दृश्य" : "Illustration"}
                        </figcaption>
                      </figure>
                    ) : null}
                    <p
                      className={cn(
                        "reader-ink font-serif",
                        FONT_STEPS[fontScale],
                        idx === 0 &&
                          "first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-serif first-letter:text-[3rem] first-letter:font-bold first-letter:leading-[0.85] first-letter:text-primary sm:first-letter:text-[3.35rem]",
                      )}
                    >
                      {page.text}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="reader-border reader-bg relative z-[2] flex shrink-0 items-center justify-between gap-2 border-t px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="focus-ring reader-border reader-ink gap-1 border bg-black/[0.03] px-3 sm:px-4"
              disabled={pageIndex <= 0}
              aria-label="Previous section"
              onClick={goPrev}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </Button>
            <p className="reader-muted min-w-0 truncate text-center text-[11px] tabular-nums sm:text-xs">
              Swipe sideways · {approxBlock} / {totalBlocks}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="focus-ring reader-border reader-ink gap-1 border bg-black/[0.03] px-3 sm:px-4"
              disabled={pageIndex >= totalBlocks - 1}
              aria-label="Next section"
              onClick={goNext}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
