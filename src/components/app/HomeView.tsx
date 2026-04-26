import { useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import {
  BookOpen,
  ChevronRight,
  Clock,
  Library,
  List,
  Sparkles,
  Star,
  Upload,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Story } from "@/data/stories";
import { filterStoriesByTag, uniqueTags } from "@/data/stories";
import type { ContinueReading } from "@/lib/continue-reading";

type HomeViewProps = {
  stories: Story[];
  onOpenStory: (storyIndex: number, pageIndex?: number) => void;
  continueReading: ContinueReading | null;
  /** Opens the Upload tab (optional). */
  onNavigateUpload?: () => void;
};

function greetingLine(): string {
  const h = new Date().getHours();
  if (h < 5) return "Still up? Perfect time for a tale.";
  if (h < 12) return "Good morning — start with something short.";
  if (h < 17) return "Good afternoon — steal ten minutes.";
  return "Good evening — wind down with words.";
}

function StoryThumb({ story, className }: { story: Story; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn("relative shrink-0 overflow-hidden bg-muted ring-1 ring-border/50", className)}>
      {!loaded ? <div className="thumb-shimmer absolute inset-0 bg-muted" aria-hidden /> : null}
      <img
        src={story.coverImage}
        alt={story.coverAlt}
        className={cn("h-full w-full object-cover transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function SectionTitle({ children, action, icon: Icon }: { children: ReactNode; action?: ReactNode; icon?: LucideIcon }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-2">
      <h3 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-book-ink">
        {Icon ? <Icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} aria-hidden /> : null}
        {children}
      </h3>
      {action}
    </div>
  );
}

const THOUGHTS = [
  "The last page is never the end — only where you paused to breathe.",
  "Small chapters add up to a life — read one more.",
  "If the story finds you at midnight, let it stay a while.",
] as const;

export function HomeView({ stories, onOpenStory, continueReading, onNavigateUpload }: HomeViewProps) {
  const [mood, setMood] = useState<string | null>(null);
  const moods = uniqueTags(stories);
  const featuredRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLElement>(null);

  const filtered = useMemo(() => filterStoriesByTag(stories, mood), [stories, mood]);
  const noMoodMatch = mood !== null && filtered.length === 0;
  const list = noMoodMatch ? stories : filtered;
  const hero = list[0] ?? stories[0];
  const heroIndex = stories.indexOf(hero);
  const restList = list.slice(1);
  const editorsPicks =
    restList.length > 0 ? restList.slice(0, 3) : stories.filter((s) => s !== hero).slice(0, 3);
  const continueStory = continueReading ? stories[continueReading.storyIndex] : null;
  const continueProgress =
    continueStory && continueReading ? ((continueReading.pageIndex + 1) / continueStory.pages.length) * 100 : 0;

  const stats = useMemo(() => {
    const totalMinutes = stories.reduce((acc, s) => acc + s.estimatedMinutes, 0);
    return {
      tales: stories.length,
      minutes: totalMinutes,
      moods: moods.length,
    };
  }, [stories, moods.length]);

  const thoughtOfDay = useMemo(() => {
    const i = new Date().getDate() % THOUGHTS.length;
    return THOUGHTS[i];
  }, []);

  const greet = useMemo(() => greetingLine(), []);

  const scrollTo = (ref: RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto px-0.5 pb-4 pt-2 sm:px-0">
      {/* Welcome + stats + quick actions */}
      <section className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-600">
        <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-card/90 px-4 py-4 shadow-md shadow-primary/5 backdrop-blur-sm">
          <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-primary/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
          <p className="relative text-xs font-medium text-muted-foreground">{greet}</p>
          <p className="relative mt-1.5 text-lg font-extrabold leading-snug tracking-tight text-book-ink">Stories for tonight&apos;s scroll</p>
          <p className="relative mt-1.5 max-w-[20rem] text-sm leading-relaxed text-muted-foreground">
            Pick a mood, tap a cover, read in short beats — your place saves automatically.
          </p>

          <div className="relative mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-border/60 bg-background/50 px-2 py-2.5 text-center backdrop-blur-sm">
              <p className="text-lg font-extrabold tabular-nums text-primary">{stats.tales}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Tales</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/50 px-2 py-2.5 text-center backdrop-blur-sm">
              <p className="text-lg font-extrabold tabular-nums text-accent">{stats.minutes}+</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Min read</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/50 px-2 py-2.5 text-center backdrop-blur-sm">
              <p className="text-lg font-extrabold tabular-nums text-book-ink">{stats.moods}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Moods</p>
            </div>
          </div>

          <div className="relative mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => scrollTo(featuredRef)}
              className="focus-ring inline-flex flex-1 min-w-[8.5rem] items-center justify-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2.5 text-xs font-bold text-primary transition hover:bg-primary/15 sm:flex-initial sm:min-w-0"
            >
              <Star className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
              Jump to featured
            </button>
            <button
              type="button"
              onClick={() => scrollTo(listRef)}
              className="focus-ring inline-flex flex-1 min-w-[8.5rem] items-center justify-center gap-2 rounded-xl border border-border bg-secondary/60 px-3 py-2.5 text-xs font-bold text-book-ink transition hover:bg-secondary sm:flex-initial sm:min-w-0"
            >
              <List className="h-4 w-4 shrink-0 opacity-80" strokeWidth={2.25} aria-hidden />
              All titles
            </button>
            {onNavigateUpload ? (
              <button
                type="button"
                onClick={onNavigateUpload}
                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3 py-2.5 text-xs font-bold text-accent transition hover:bg-accent/15 sm:w-auto sm:flex-1"
              >
                <Upload className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
                Paste your story
              </button>
            ) : null}
          </div>
        </div>
      </section>

      {noMoodMatch ? (
        <section className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 rounded-2xl border border-primary/20 bg-primary/8 px-4 py-3.5 text-sm text-book-ink">
          <span className="font-semibold">Nothing tagged with &ldquo;{mood}&rdquo;.</span>{" "}
          <button type="button" onClick={() => setMood(null)} className="focus-ring font-bold text-primary underline-offset-2 hover:underline">
            Clear filter
          </button>
          <span className="text-muted-foreground"> — full list below.</span>
        </section>
      ) : null}

      <section className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-600 motion-safe:delay-75">
        <SectionTitle icon={BookOpen}>Continue reading</SectionTitle>
        {continueStory && continueReading ? (
          <button
            type="button"
            onClick={() => onOpenStory(continueReading.storyIndex, continueReading.pageIndex)}
            className="focus-ring group relative w-full overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/[0.07] p-1 text-left shadow-lg shadow-primary/10 transition-[transform,box-shadow] hover:border-primary/35 hover:shadow-xl hover:shadow-primary/15 active:scale-[0.995]"
          >
            <div className="flex items-stretch gap-3 rounded-xl bg-card/60 p-3 backdrop-blur-sm sm:gap-4 sm:p-4">
              <StoryThumb story={continueStory} className="h-[5.25rem] w-[3.6rem] shrink-0 rounded-xl shadow-md ring-1 ring-border/40 sm:h-[5.75rem] sm:w-20" />
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <span className="mb-1 inline-flex w-fit items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                  Resume
                </span>
                <p className="truncate font-bold text-book-ink">{continueStory.title}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                  Section {continueReading.pageIndex + 1} of {continueStory.pages.length}
                </p>
                <div className="reader-border mt-2.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] motion-reduce:transition-none"
                    style={{ width: `${continueProgress}%` }}
                  />
                </div>
              </div>
              <div className="flex shrink-0 items-center pr-1">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
                  <ChevronRight className="h-5 w-5" strokeWidth={2.5} aria-hidden />
                </span>
              </div>
            </div>
          </button>
        ) : (
          <div className="rounded-2xl border border-dashed border-primary/25 bg-card/80 px-4 py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              <BookOpen className="h-7 w-7 text-primary" strokeWidth={2} aria-hidden />
            </div>
            <p className="mt-4 text-sm font-medium text-book-ink">No bookmark yet</p>
            <p className="mx-auto mt-1 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
              Open a story — we&apos;ll drop you back here next time, right where you left off.
            </p>
            <button
              type="button"
              onClick={() => onOpenStory(heroIndex >= 0 ? heroIndex : 0, 0)}
              className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/25 transition hover:bg-primary/90"
            >
              Start with featured <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>

      <section ref={featuredRef} className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-600 motion-safe:delay-100 scroll-mt-4">
        <SectionTitle
          icon={Sparkles}
          action={
            <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">
              {list.length} {list.length === 1 ? "tale" : "tales"}
            </span>
          }
        >
          Featured
        </SectionTitle>
        <button
          type="button"
          onClick={() => onOpenStory(heroIndex >= 0 ? heroIndex : 0, 0)}
          className="focus-ring group relative flex w-full flex-col overflow-hidden rounded-2xl border border-primary/15 bg-book-page text-left shadow-book ring-1 ring-primary/5 transition-[box-shadow,transform] hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/15 active:scale-[0.99] sm:flex-row sm:items-stretch"
        >
          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-[3/4] sm:w-[8.5rem] md:w-36">
            <StoryThumb story={hero} className="h-full w-full rounded-none sm:rounded-l-2xl sm:rounded-r-none" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent sm:hidden" />
            <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary shadow-sm backdrop-blur-sm sm:left-auto sm:right-3 sm:top-3">
              Spotlight
            </span>
          </div>
          <div className="relative flex min-w-0 flex-1 flex-col justify-center gap-1 p-4 sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{hero.genre}</p>
            <h2 className="text-xl font-extrabold leading-[1.15] tracking-tight text-book-ink sm:text-2xl">{hero.title}</h2>
            {hero.tags.length > 0 ? (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {hero.tags.slice(0, 4).map((t) => (
                  <span key={t} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:line-clamp-2">{hero.hook}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              <span className="font-medium text-book-ink/80">{hero.author}</span>
              <span className="mx-1.5 text-border">·</span>~{hero.estimatedMinutes} min
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition group-hover:gap-2">
              Start reading
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
            </span>
          </div>
        </button>
      </section>

      <section className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 motion-safe:delay-100">
        <SectionTitle icon={Wand2}>Mood filters</SectionTitle>
        <div className="-mx-0.5 flex gap-2 overflow-x-auto pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setMood(null)}
            className={cn(
              "focus-ring shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-all",
              mood === null
                ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                : "border-border/80 bg-card text-book-ink shadow-sm hover:border-primary/25 hover:bg-secondary/80",
            )}
          >
            All
          </button>
          {moods.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m === mood ? null : m)}
              className={cn(
                "focus-ring shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-all",
                mood === m
                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "border-border/80 bg-secondary/50 text-book-ink hover:border-primary/20 hover:bg-secondary",
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      <section className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 motion-safe:delay-150">
        <div className="mb-3 flex items-end justify-between gap-2">
          <h3 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-book-ink">
            <Library className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} aria-hidden />
            Editor&apos;s picks
          </h3>
          <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent">Curated</span>
        </div>
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pl-0.5 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {editorsPicks.map((s, idx) => {
            const realIndex = stories.indexOf(s);
            return (
              <button
                key={realIndex >= 0 ? `pick-${realIndex}` : `pick-f-${idx}`}
                type="button"
                onClick={() => onOpenStory(realIndex >= 0 ? realIndex : idx + 1, 0)}
                className="focus-ring snap-start snap-always min-w-[11.5rem] max-w-[12.5rem] shrink-0 overflow-hidden rounded-2xl border border-primary/10 bg-book-page text-left shadow-md ring-1 ring-transparent transition-[transform,box-shadow] hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10 hover:ring-primary/5 active:scale-[0.99]"
              >
                <div className="relative">
                  <StoryThumb story={s} className="aspect-[4/3] w-full rounded-none rounded-t-2xl" />
                  <span className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/35 ring-2 ring-background/90 backdrop-blur-sm">
                    <Sparkles className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                  {s.tags[0] ? (
                    <span className="absolute bottom-2 left-2 rounded-md bg-background/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary shadow-sm backdrop-blur-sm">
                      {s.tags[0]}
                    </span>
                  ) : null}
                </div>
                <div className="space-y-1 p-3.5 pt-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{s.genre}</p>
                  <p className="line-clamp-2 text-sm font-bold leading-snug text-book-ink">{s.title}</p>
                  <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">{s.hook}</p>
                  <p className="pt-0.5 text-[10px] font-bold text-primary">~{s.estimatedMinutes} min</p>
                </div>
              </button>
            );
          })}
        </div>
        {editorsPicks.length > 1 ? (
          <p className="pl-0.5 text-[10px] font-medium text-muted-foreground">Swipe cards for more picks →</p>
        ) : null}
      </section>

      <section ref={listRef} className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 motion-safe:delay-200 scroll-mt-4">
        <SectionTitle icon={List}>All stories</SectionTitle>
        <ul className="divide-y divide-border/80 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-md shadow-primary/5">
          {list.map((s) => {
            const i = stories.indexOf(s);
            const isFirst = s === list[0];
            const isLast = s === list[list.length - 1];
            return (
              <li key={i >= 0 ? `row-${i}` : `row-${s.title}`}>
                <button
                  type="button"
                  onClick={() => onOpenStory(i, 0)}
                  className={cn(
                    "focus-ring group flex w-full items-center gap-3 px-3 py-3.5 text-left transition-colors hover:bg-primary/[0.04] sm:gap-4 sm:px-4 sm:py-4",
                    isFirst && "rounded-t-2xl",
                    isLast && "rounded-b-2xl",
                  )}
                >
                  <StoryThumb story={s} className="h-[3.5rem] w-12 shrink-0 rounded-xl shadow-sm ring-1 ring-border/40 sm:h-16 sm:w-[3.35rem]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-book-ink">{s.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span className="rounded-md bg-secondary/80 px-1.5 py-0.5 font-semibold text-book-ink/90">{s.genre}</span>
                      {s.tags.slice(0, 2).map((t) => (
                        <span key={t} className="rounded-md bg-primary/8 px-1.5 py-0.5 font-semibold text-primary">
                          {t}
                        </span>
                      ))}
                      <span className="tabular-nums">{s.pages.length} sections</span>
                      <span>·</span>
                      <span className="tabular-nums">~{s.estimatedMinutes} min</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-primary/60 transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 motion-safe:delay-200 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/[0.12] via-card to-primary/[0.08] px-4 py-5 shadow-md shadow-primary/5">
        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
          <Wand2 className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          Thought of the day
        </h3>
        <p className="mt-2.5 text-base font-medium italic leading-relaxed text-book-ink">&ldquo;{thoughtOfDay}&rdquo;</p>
      </section>

      <div className="h-1 shrink-0" />
    </div>
  );
}
