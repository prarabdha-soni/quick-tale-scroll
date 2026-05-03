import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BookOpenText, Feather, Globe2, Headphones, Home, Upload } from "lucide-react";

import { HomeView } from "@/components/app/HomeView";
import { PodcastView } from "@/components/app/PodcastView";
import { UploadView } from "@/components/app/UploadView";
import { loadContinueReading, saveContinueReading, type ContinueReading } from "@/lib/continue-reading";
import { StoryReader } from "@/components/app/StoryReader";
import { stories as catalogStories } from "@/data/stories";
import { cn } from "@/lib/utils";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

type Tab = "home" | "story" | "podcast" | "upload";

const Index = () => {
  const [tab, setTab] = useState<Tab>("home");
  const mergedStories = useMemo(() => catalogStories, []);
  const [storyIndex, setStoryIndex] = useState(() => loadContinueReading()?.storyIndex ?? 0);
  const [pageIndex, setPageIndex] = useState(() => loadContinueReading()?.pageIndex ?? 0);

  useEffect(() => {
    saveContinueReading({ storyIndex, pageIndex });
  }, [storyIndex, pageIndex]);

  useEffect(() => {
    const story = mergedStories[storyIndex];
    if (!story) return;
    setPageIndex((p) => clamp(p, 0, Math.max(0, story.pages.length - 1)));
  }, [mergedStories, storyIndex]);

  const continueReading = useMemo((): ContinueReading | null => {
    if (storyIndex === 0 && pageIndex === 0) return null;
    return { storyIndex, pageIndex };
  }, [storyIndex, pageIndex]);

  const openStory = (si: number, pi = 0) => {
    const sIdx = clamp(si, 0, Math.max(0, mergedStories.length - 1));
    const story = mergedStories[sIdx];
    const pIdx = story ? clamp(pi, 0, story.pages.length - 1) : 0;
    setStoryIndex(sIdx);
    setPageIndex(pIdx);
    setTab("story");
  };

  const tabBtn = (id: Tab, label: string, icon: ReactNode) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      className={cn(
        "focus-ring flex flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-[10px] font-semibold transition-all duration-200 sm:text-[11px]",
        tab === id ? "bg-primary/15 text-primary shadow-sm shadow-primary/10" : "text-muted-foreground hover:bg-secondary/80 hover:text-book-ink",
      )}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <main
      className={cn(
        "relative mx-auto flex w-full max-w-md flex-col bg-library font-sans text-foreground writing-crisp",
        tab === "story" ? "h-[100dvh] overflow-hidden" : "min-h-dvh",
      )}
    >
      {tab !== "story" ? (
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-primary/10 bg-card/80 px-4 py-3 shadow-sm shadow-primary/5 backdrop-blur-xl pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-br from-card to-primary/12 shadow-md shadow-primary/15 ring-1 ring-primary/10">
              <Feather className="h-4 w-4 text-primary" strokeWidth={2.25} />
            </span>
            <div className="min-w-0">
              {tab === "home" ? (
                <div>
                  <h1 className="text-lg font-extrabold leading-tight tracking-tight text-book-ink">Quiet Tale</h1>
                  <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">Sleep stories · gentle pace</p>
                </div>
              ) : (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Quiet Tale</p>
                  <h1 className="text-lg font-extrabold leading-tight tracking-tight text-book-ink">
                    {tab === "podcast" && "Podcast"}
                    {tab === "upload" && "Upload"}
                  </h1>
                </>
              )}
            </div>
          </div>
          {tab === "home" ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border/60 bg-background/70 px-2 py-1 text-[9px] font-semibold tracking-wide text-muted-foreground shadow-sm backdrop-blur-sm sm:gap-1.5 sm:px-2.5 sm:text-[10px]">
              <Globe2 className="h-3 w-3 text-primary/90 sm:h-3.5 sm:w-3.5" strokeWidth={2.25} aria-hidden />
              <span className="tabular-nums">HI · EN</span>
            </span>
          ) : null}
        </header>
      ) : null}

      <div className={cn("flex min-h-0 flex-1 flex-col", tab === "story" ? "px-0 pb-20" : "px-3 pb-24 sm:px-4")}>
        {tab === "home" ? <HomeView stories={mergedStories} onOpenStory={openStory} continueReading={continueReading} /> : null}
        {tab === "upload" ? <UploadView /> : null}
        {tab === "story" ? (
          <StoryReader
            stories={mergedStories}
            storyIndex={storyIndex}
            pageIndex={pageIndex}
            onPageIndex={setPageIndex}
            onNavigateHome={() => setTab("home")}
          />
        ) : null}
        {tab === "podcast" ? <PodcastView /> : null}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-30 mx-auto w-full max-w-md rounded-t-2xl border border-b-0 border-primary/10 bg-card/90 shadow-[0_-12px_40px_-12px_hsl(var(--primary)/0.12)] backdrop-blur-xl pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1.5">
        <div className="grid grid-cols-4 gap-0.5 px-1 sm:gap-1 sm:px-2">
          {tabBtn("home", "Home", <Home className="h-5 w-5" />)}
          {tabBtn("story", "Story", <BookOpenText className="h-5 w-5" />)}
          {tabBtn("podcast", "Podcast", <Headphones className="h-5 w-5" />)}
          {tabBtn("upload", "Upload", <Upload className="h-5 w-5" />)}
        </div>
      </nav>
    </main>
  );
};

export default Index;
