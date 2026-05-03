import { useMemo, useState, type ReactNode } from "react";
import { BookOpen, ChevronRight, Clock, Globe2, Moon, Sparkles, Timer, type LucideIcon } from "lucide-react";

import { ShareStoryWhatsAppButton } from "@/components/app/ShareStoryWhatsAppButton";
import { cn } from "@/lib/utils";
import type { Story } from "@/data/stories";
import type { ContinueReading } from "@/lib/continue-reading";

type HomeViewProps = {
  stories: Story[];
  onOpenStory: (storyIndex: number, pageIndex?: number) => void;
  continueReading: ContinueReading | null;
};

function StoryThumb({ story, className }: { story: Story; className?: string }) {
  const [loaded, setLoaded] = useState(false);

  if (!story.coverImage) {
    return (
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-[#0c1222] via-[#151c33] to-[#0a1628]",
          "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_30%_20%,hsl(267_85%_62%/0.35),transparent_55%)]",
          "after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_80%_90%,hsl(195_70%_45%/0.2),transparent_45%)]",
          className,
        )}
        aria-hidden
      >
        <span className="pointer-events-none absolute left-[18%] top-[22%] h-1 w-1 rounded-full bg-white/45 blur-[0.5px]" />
        <span className="pointer-events-none absolute right-[24%] top-[35%] h-0.5 w-0.5 rounded-full bg-white/35" />
        <span className="pointer-events-none absolute bottom-[28%] left-[30%] h-0.5 w-0.5 rounded-full bg-white/30" />
        <Moon className="relative z-[1] h-7 w-7 text-indigo-100/95 drop-shadow-[0_0_24px_hsl(267_90%_70%/0.35)]" strokeWidth={1.35} />
      </div>
    );
  }
  return (
    <div className={cn("relative shrink-0 overflow-hidden bg-muted ring-1 ring-white/10", className)}>
      {!loaded ? <div className="thumb-shimmer absolute inset-0 bg-muted" aria-hidden /> : null}
      <img
        src={story.coverImage}
        alt={story.coverAlt ?? ""}
        className={cn("h-full w-full object-cover transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function SectionTitle({ children, icon: Icon }: { children: ReactNode; icon?: LucideIcon }) {
  return (
    <h3 className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
      {Icon ? <Icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} aria-hidden /> : null}
      {children}
    </h3>
  );
}

const THOUGHTS = [
  "Nothing needs solving tonight—only softening.",
  "Let the next breath be a little slower than the last.",
  "The night is long enough for every worry to wait.",
  "Wherever you are on the map, rest belongs here too.",
] as const;

const FEATURE_PILLS = [
  { Icon: Timer, label: "5s cadence" },
  { Icon: Sparkles, label: "Soft fades" },
  { Icon: Globe2, label: "HI · EN" },
] as const;

export function HomeView({ stories, onOpenStory, continueReading }: HomeViewProps) {
  const hero = stories[0];
  const heroIndex = 0;
  const altStory = stories.length > 1 ? stories[1] : null;
  const altIndex = 1;
  const continueStory = continueReading ? stories[continueReading.storyIndex] : null;
  const continueProgress =
    continueStory && continueReading ? ((continueReading.pageIndex + 1) / continueStory.pages.length) * 100 : 0;

  const thoughtOfDay = useMemo(() => {
    const i = new Date().getDate() % THOUGHTS.length;
    return THOUGHTS[i];
  }, []);

  if (!hero) {
    return (
      <div className="px-4 py-12 text-center text-muted-foreground">
        <p>No sleep story is available yet.</p>
      </div>
    );
  }

  const heroLang = /[\u0900-\u097F]/.test(hero.title) ? "HI" : "EN";

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-0 pb-6 pt-1 sm:px-0">
      {/* Hero — editorial / global */}
      {/* Featured */}
      <section className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:delay-75">
        <SectionTitle icon={Sparkles}>Tonight&apos;s story</SectionTitle>

        <div className="group relative overflow-hidden rounded-[1.35rem] border border-primary/12 bg-gradient-to-b from-card to-card/95 shadow-[0_20px_50px_-28px_hsl(var(--primary)/0.45)] ring-1 ring-black/[0.03] dark:ring-white/[0.06]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />

          <div className="flex flex-col sm:flex-row sm:items-stretch">
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-auto sm:min-h-[11rem] sm:w-[9.25rem] md:w-[10rem]">
              <StoryThumb story={hero} className="h-full min-h-[11rem] w-full rounded-none sm:rounded-l-[1.35rem] sm:rounded-r-none" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-transparent" />
              <span className="absolute left-3 top-3 inline-flex items-center rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md sm:left-auto sm:right-14 sm:top-3">
                {heroLang === "HI" ? "हिंदी" : "English"}
              </span>
              <span className="absolute bottom-3 left-3 rounded-md bg-black/40 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-white/95 backdrop-blur-sm sm:bottom-auto sm:left-auto sm:right-3 sm:top-14">
                {heroLang}
              </span>
              <ShareStoryWhatsAppButton
                story={hero}
                variant="secondary"
                size="icon"
                className="absolute right-3 top-3 z-20 h-10 w-10 rounded-full border border-white/25 bg-white/95 text-[#128C7E] shadow-lg backdrop-blur-md dark:bg-black/55 dark:text-[#25D366]"
              />
            </div>

            <button
              type="button"
              onClick={() => onOpenStory(heroIndex, 0)}
              className="focus-ring flex min-w-0 flex-1 flex-col justify-center gap-2 p-5 text-left transition active:scale-[0.995] sm:p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{hero.genre}</p>
              <h3 className="font-serif text-xl font-bold leading-[1.18] tracking-tight text-book-ink sm:text-[1.35rem]">{hero.title}</h3>
              {hero.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {hero.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-primary/15 bg-primary/[0.06] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
              <p className="line-clamp-3 pt-1 text-[14px] leading-relaxed text-muted-foreground sm:line-clamp-2">{hero.hook}</p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-xs text-muted-foreground">
                <span className="font-medium text-book-ink/85">{hero.author}</span>
                <span className="text-border">·</span>
                <span className="tabular-nums">~{hero.estimatedMinutes} min</span>
              </div>
              <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-[gap,transform] group-hover:gap-2.5 group-hover:shadow-lg group-hover:shadow-primary/30">
                Begin listening
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} aria-hidden />
              </span>
            </button>
          </div>
        </div>
      </section>

      {altStory ? (
        <section className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-600 motion-safe:delay-100">
          <SectionTitle icon={BookOpen}>Also in English</SectionTitle>
          <button
            type="button"
            onClick={() => onOpenStory(altIndex, 0)}
            className="focus-ring flex w-full items-center gap-4 rounded-[1.15rem] border border-border/80 bg-card/90 p-3.5 text-left shadow-sm ring-1 ring-black/[0.02] transition-[border-color,box-shadow,transform] hover:border-primary/25 hover:shadow-md active:scale-[0.99] dark:ring-white/[0.04]"
          >
            <StoryThumb story={altStory} className="h-[4.25rem] w-[3.35rem] shrink-0 rounded-xl shadow-inner" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded bg-secondary/90 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-muted-foreground">EN</span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{altStory.genre}</p>
              </div>
              <p className="mt-1 truncate font-semibold text-book-ink">{altStory.title}</p>
              <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{altStory.hook}</p>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-primary/80" aria-hidden />
          </button>
        </section>
      ) : null}

      <section className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-600 motion-safe:delay-100">
        <SectionTitle icon={BookOpen}>Continue</SectionTitle>
        {continueStory && continueReading ? (
          <div
            role="button"
            tabIndex={0}
            onClick={() => onOpenStory(continueReading.storyIndex, continueReading.pageIndex)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onOpenStory(continueReading.storyIndex, continueReading.pageIndex);
            }}
            className="focus-ring group relative w-full overflow-hidden rounded-[1.15rem] border border-primary/18 bg-gradient-to-br from-card via-card to-primary/[0.06] p-[1px] text-left shadow-[0_16px_48px_-24px_hsl(var(--primary)/0.35)] transition-[transform,box-shadow] hover:border-primary/30 hover:shadow-[0_20px_56px_-22px_hsl(var(--primary)/0.4)] active:scale-[0.995]"
          >
            <div className="flex items-stretch gap-3 rounded-[1.1rem] bg-card/75 p-3.5 backdrop-blur-md sm:gap-4 sm:p-4">
              <StoryThumb story={continueStory} className="h-[5.25rem] w-[3.65rem] shrink-0 rounded-xl shadow-md ring-1 ring-white/10 sm:h-[5.75rem] sm:w-20" />
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <span className="mb-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-sm">
                  Resume
                </span>
                <p className="truncate font-semibold text-book-ink">{continueStory.title}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                  Part {continueReading.pageIndex + 1} of {continueStory.pages.length}
                </p>
                <div className="reader-border mt-3 h-1.5 overflow-hidden rounded-full bg-secondary/90">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-violet-500 to-accent transition-[width] motion-reduce:transition-none"
                    style={{ width: `${continueProgress}%` }}
                  />
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-center justify-center gap-1.5 pr-0.5 sm:flex-row sm:gap-2">
                <ShareStoryWhatsAppButton
                  story={continueStory}
                  pageIndex={continueReading.pageIndex}
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border-border text-[#128C7E] hover:bg-[#25D366]/10"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenStory(continueReading.storyIndex, continueReading.pageIndex);
                  }}
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105"
                  aria-label="Continue sleep story"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-[1.15rem] border border-dashed border-primary/22 bg-card/60 px-5 py-10 text-center backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/[0.09] ring-1 ring-primary/18">
              <BookOpen className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>
            <p className="mt-4 text-sm font-semibold text-book-ink">Your evening starts above</p>
            <p className="mx-auto mt-2 max-w-[19rem] text-sm leading-relaxed text-muted-foreground">
              Tap <span className="font-medium text-book-ink/90">Begin listening</span>, or swipe pages at your own pace. Auto-advance runs every
              five seconds.
            </p>
            <p className="mx-auto mt-3 max-w-[19rem] text-[13px] leading-relaxed text-book-ink/75">
              ऊपर से शुरू करें—पेज हर पाँच सेकंड पर बदलते हैं, या खुद की गति से पढ़ें।
            </p>
          </div>
        )}
      </section>

      <section className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-600 motion-safe:delay-150 relative overflow-hidden rounded-[1.25rem] border border-accent/18 bg-gradient-to-br from-accent/[0.08] via-card to-primary/[0.06] px-5 py-6 shadow-lg shadow-primary/[0.06]">
        <div className="pointer-events-none absolute -right-8 top-0 h-24 w-24 rounded-full bg-accent/20 blur-2xl" aria-hidden />
        <div className="relative">
          <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
            <Globe2 className="h-3.5 w-3.5 opacity-90" strokeWidth={2.5} aria-hidden />
            From our desk
          </h3>
          <p className="mt-3 font-serif text-lg font-medium italic leading-relaxed text-book-ink">&ldquo;{thoughtOfDay}&rdquo;</p>
        </div>
      </section>

      <div className="h-1 shrink-0" />
    </div>
  );
}
