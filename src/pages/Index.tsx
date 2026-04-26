import { useMemo, useState } from "react";
import { Bookmark, ChevronLeft, ChevronRight, Feather, Heart, Library, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";

type Story = {
  title: string;
  author: string;
  genre: string;
  pages: string[];
};

const stories: Story[] = [
  {
    title: "The Clockmaker's Rain",
    author: "Mara Vale",
    genre: "Quiet wonder",
    pages: [
      "On Tuesdays, the clockmaker wound the rain. Not the town clock, not the brass watches in his window, but the rain itself, which waited in a blue jar beside his kettle.",
      "He turned the little silver key three times, and clouds gathered over Bellwether Street with the obedience of well-trained pigeons.",
      "People loved him for this. The baker planned crust by him. The laundress cursed him kindly. Children left cups outside and called them oceans.",
      "Only Elian, who delivered letters, noticed the clockmaker never stepped into the weather he made. He watched from behind glass, dry as a secret.",
      "One morning Elian brought a letter with no stamp, no seal, and handwriting like reeds bending in wind. The clockmaker's hands trembled.",
      "Inside were seven words: Please let the rain remember me today. He folded the page as if it had weight enough to bruise.",
      "That afternoon he wound the jar four turns. Rain fell upward first, then sideways, then soft and straight, carrying the scent of violets.",
      "The town stopped. Even the horses bowed their heads. In every puddle stood the reflection of a woman no one had seen for twenty years.",
      "The clockmaker opened his door. Rain touched his sleeve. He laughed once, a rusty hinge becoming music.",
      "After that, Tuesdays came by themselves. The jar stayed empty, but Bellwether Street still smelled of violets whenever someone was missed enough.",
    ],
  },
  {
    title: "A Window Facing North",
    author: "Iris Bell",
    genre: "Domestic myth",
    pages: [
      "The boarding house had twelve windows, but only the north one told the truth. Mrs. Pell charged an extra coin for rooms that could bear it.",
      "Travelers asked what truth meant. She only shrugged and handed them a towel stiff with sun and lavender soap.",
      "A sailor saw himself old and landlocked. A bride saw a ring already missing. A merchant saw empty shelves and kinder hands.",
      "Then came Nola, carrying one suitcase, three books, and a silence too carefully wrapped to be ordinary grief.",
      "She rented the north room for a week and covered the window with a shawl before unpacking her comb.",
      "At night the glass whispered like ice in a pitcher. By dawn the shawl had slipped, and the room filled with pale uncompromising light.",
      "Nola looked. The window showed a cottage, a kettle, a desk, and herself writing a letter she had been afraid to receive.",
      "She sat there all morning, watching future ink dry. By supper she asked Mrs. Pell for paper.",
      "The letter began: Dear Nola, you may come home before you are forgiven. Forgiveness is smaller than the road.",
      "She left on the eighth day. The north window showed only sky, which Mrs. Pell considered the most truthful thing of all.",
    ],
  },
  {
    title: "The Last Orchard Light",
    author: "Theo Maren",
    genre: "Rural fable",
    pages: [
      "Every autumn, one apple in the orchard refused to fall. It glowed after dusk, gold as a coin and stubborn as an old argument.",
      "Grandfather said it belonged to the first person who could name what they wanted without lying.",
      "Neighbors came with ladders and speeches. They wanted wealth, health, a son returned, a debt erased. The apple stayed bright and high.",
      "Lina came last, because she was nine and no one thought wanting had ripened in her yet.",
      "She stood beneath the tree with mud on her hem and a beetle asleep in her palm.",
      "I want, she said, then stopped. The adults leaned closer, hungry for innocence to be useful.",
      "I want to want less when everyone is watching, Lina finished. The orchard went quiet enough to hear roots drink.",
      "The apple dropped into her hands, warm as bread. It split neatly in two before anyone could applaud.",
      "Inside were seeds black as ink. Lina planted them at the edge of the field where the poorest soil waited.",
      "Years later, every tree there bore one shining apple, and nobody climbed for them unless they came alone.",
    ],
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const Index = () => {
  const [storyIndex, setStoryIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [followed, setFollowed] = useState<Record<string, boolean>>({});

  const story = stories[storyIndex];
  const progress = useMemo(() => ((pageIndex + 1) / story.pages.length) * 100, [pageIndex, story.pages.length]);

  const turnPage = (direction: 1 | -1) => {
    setPageIndex((current) => clamp(current + direction, 0, story.pages.length - 1));
  };

  const changeStory = (direction: 1 | -1) => {
    setStoryIndex((current) => {
      const next = clamp(current + direction, 0, stories.length - 1);
      if (next !== current) setPageIndex(0);
      return next;
    });
  };

  const handleTouchEnd = (x: number, y: number) => {
    if (!touchStart) return;
    const dx = x - touchStart.x;
    const dy = y - touchStart.y;
    const horizontal = Math.abs(dx) > Math.abs(dy);

    if (horizontal && Math.abs(dx) > 42) turnPage(dx < 0 ? 1 : -1);
    if (!horizontal && Math.abs(dy) > 42) changeStory(dy < 0 ? 1 : -1);
    setTouchStart(null);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-library text-foreground writing-crisp">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 border-b border-border/70 pb-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/25 bg-book-page shadow-sm">
              <Feather className="h-5 w-5 text-primary" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-primary">Folio</p>
              <h1 className="text-2xl font-bold leading-none text-book-ink sm:text-3xl">Short Classics</h1>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            <Library className="h-4 w-4 text-accent" />
            <span>{stories.length} pocket stories</span>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-5 py-5 lg:grid-cols-[1fr_17rem]">
          <article
            className="relative mx-auto w-full max-w-3xl touch-none animate-story-rise"
            onTouchStart={(event) => setTouchStart({ x: event.touches[0].clientX, y: event.touches[0].clientY })}
            onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX, event.changedTouches[0].clientY)}
          >
            <div className="absolute -left-2 top-5 h-[88%] w-5 rounded-l-sm bg-book-edge shadow-book" />
            <div className="relative min-h-[68vh] overflow-hidden rounded-sm border border-book-edge bg-book-page shadow-book md:min-h-[72vh]">
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-border/80" />
              <div className="pointer-events-none absolute inset-0 shadow-page-turn" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(hsl(var(--book-ink))_1px,transparent_1px)] [background-size:100%_2rem]" />

              <div key={`${story.title}-${pageIndex}`} className="relative flex min-h-[68vh] flex-col p-7 animate-page-settle md:min-h-[72vh] md:p-12">
                <div className="mb-6 flex items-start justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-primary">{story.genre}</p>
                    <h2 className="mt-2 max-w-xl text-3xl font-bold leading-tight text-book-ink sm:text-5xl">{story.title}</h2>
                  </div>
                  <Bookmark className="mt-1 h-6 w-6 shrink-0 text-book-gold" />
                </div>

                <div className="flex flex-1 items-center">
                  <p className="max-w-2xl text-[1.62rem] leading-[1.55] text-book-ink sm:text-[2rem] sm:leading-[1.55]">
                    {story.pages[pageIndex]}
                  </p>
                </div>

                <footer className="mt-8 flex items-end justify-between gap-5 border-t border-border pt-4 text-sm text-muted-foreground">
                  <div>
                    <p className="text-book-ink">By {story.author}</p>
                    <p>Swipe left to turn · swipe up for next story</p>
                  </div>
                  <p className="font-semibold text-primary">{pageIndex + 1} / {story.pages.length}</p>
                </footer>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <Button variant="bookmark" size="icon" onClick={() => turnPage(-1)} disabled={pageIndex === 0} aria-label="Previous page">
                <ChevronLeft />
              </Button>
              <div className="h-2 flex-1 overflow-hidden rounded-sm bg-secondary">
                <div className="h-full rounded-sm bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <Button variant="bookmark" size="icon" onClick={() => turnPage(1)} disabled={pageIndex === story.pages.length - 1} aria-label="Next page">
                <ChevronRight />
              </Button>
            </div>
          </article>

          <aside className="rounded-sm border border-border/80 bg-card/70 p-4 shadow-sm backdrop-blur-sm lg:sticky lg:top-6">
            <div className="border-b border-border pb-4">
              <p className="text-xs uppercase tracking-[0.22em] text-primary">Author</p>
              <h3 className="mt-2 text-2xl font-bold text-book-ink">{story.author}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Curated miniature fiction for one quiet sitting.</p>
              <Button
                className="mt-4 w-full"
                variant={followed[story.author] ? "bookmark" : "folio"}
                onClick={() => setFollowed((current) => ({ ...current, [story.author]: !current[story.author] }))}
              >
                {followed[story.author] ? <Heart className="fill-current" /> : <UserPlus />}
                {followed[story.author] ? "Following" : "Follow author"}
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              {stories.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => {
                    setStoryIndex(index);
                    setPageIndex(0);
                  }}
                  className="w-full rounded-sm border border-border bg-book-page px-3 py-3 text-left transition hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <p className="text-sm font-bold text-book-ink">{item.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{index === storyIndex ? "Reading now" : "Swipe up queue"}</p>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Index;