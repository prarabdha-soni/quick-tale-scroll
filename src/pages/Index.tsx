import { useMemo, useState } from "react";
import { Bookmark, BookOpenText, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Feather, Film } from "lucide-react";

import { Button } from "@/components/ui/button";

type Story = {
  title: string;
  author: string;
  genre: string;
  pages: string[];
};

const stories: Story[] = [
  {
    title: "आख़िरी घंटी",
    author: "अनाम लेखक",
    genre: "हिंदी रहस्य",
    pages: [
      "रात के ग्यारह बजे कॉलेज की पुरानी लाइब्रेरी में सिर्फ़ आरव बचा था। बाहर बारिश थी, और अंदर किताबों की गंध में एक अजीब-सी ठंड घुली हुई थी।",
      "वह परीक्षा की तैयारी कर रहा था, तभी गलियारे में लगी पुरानी घंटी अपने आप बज उठी। वह घंटी वर्षों से बंद थी, यह बात हर छात्र जानता था।",
      "आरव ने सोचा शायद हवा होगी, लेकिन अगली घंटी के साथ उसकी मेज़ पर रखी किताब अपने आप खुल गई। पन्ने वहीं रुके जहाँ किसी ने लाल स्याही से लिखा था: मत मुड़ना।",
      "उसने फिर भी पीछे देखा। गलियारे के अंत में एक लड़की खड़ी थी, सफ़ेद सलवार में, भीगे बालों के साथ। उसका चेहरा साफ़ नहीं दिख रहा था।",
      "लड़की ने कोई आवाज़ नहीं की। बस हाथ उठाकर उसे अपने पीछे आने का इशारा किया। आरव का डर और जिज्ञासा एक साथ जाग गए।",
      "वह उसके पीछे-पीछे बंद रिकॉर्ड रूम तक पहुँचा। दरवाज़ा बिना छुए खुल गया, और अंदर धूल से ढकी फ़ाइलों के बीच एक पुरानी तस्वीर रखी थी।",
      "तस्वीर में वही लड़की थी—पर उसके साथ आरव भी खड़ा था। नीचे तारीख़ लिखी थी: 18 जुलाई 1998। आरव का जन्म भी तब नहीं हुआ था।",
      "उसके हाथ काँपने लगे। तभी घंटी फिर बजी, इस बार बहुत पास से। लड़की ने पहली बार कहा, तुम हर बार देर से याद करते हो।",
      "कमरा घूमने लगा। फ़ाइलें हवा में उड़ने लगीं। आरव ने आँखें बंद कर लीं, और जब खोलीं तो वह फिर अपनी मेज़ पर बैठा था। सुबह हो चुकी थी।",
      "किताब खुली पड़ी थी। लाल स्याही में अब एक नई पंक्ति लिखी थी: अगली बार घंटी बजे, तो मत भूलना कि तुम कौन थे।",
    ],
  },
  {
    title: "The Wrong Lamp",
    author: "Anonymous",
    genre: "Reality fracture",
    pages: [
      "The punch landed before he saw it coming. One moment he was a college student in a shouting crowd; the next, the pavement rushed up like a black wave.",
      "He did not wake in a hospital. He woke in an apartment he somehow knew was his, late for a job he somehow remembered having.",
      "Years began to pass with the quiet certainty of real life. He met a woman at a bookstore, laughed with her over coffee, and learned the shape of her smile by heart.",
      "They married in spring. They bought a small house, argued over paint, burned dinners, paid bills, and filled rooms with ordinary, unremarkable happiness.",
      "Children came, loud and bright. There were school mornings, fever nights, tiny shoes by the door, and family dinners where everyone talked at once.",
      "Nothing felt like a dream. Every day had weight: work, exhaustion, birthdays, private jokes, old photographs, and love that settled deep into his bones.",
      "Then one afternoon, in the living room, he noticed the lamp. It stood beside the couch, but its angles were wrong, as if reality had folded badly around it.",
      "He stared. The shade stretched, bent, and pulled at his vision. His wife asked what was wrong. His children grew quiet. He could not look away.",
      "The lamp became a crack in everything. The walls shivered. His family's voices warped into a distant echo, and the life he had built collapsed into light.",
      "He woke on the ground, friends leaning over him. Only seconds had passed since the fight. But he had lost a wife, children, and years—and never knew which life was real.",
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
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [swipeExit, setSwipeExit] = useState<{ x: number; y: number } | null>(null);
  const [mode, setMode] = useState<"text" | "video">("text");

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

  const resetDrag = () => {
    setSwipeExit(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const animatePageTurn = (direction: 1 | -1) => {
    setSwipeExit({ x: direction === 1 ? -900 : 900, y: 0 });
    window.setTimeout(() => {
      turnPage(direction);
      resetDrag();
    }, 180);
  };

  const animateStoryChange = (direction: 1 | -1) => {
    setSwipeExit({ x: 0, y: direction === 1 ? -900 : 900 });
    window.setTimeout(() => {
      changeStory(direction);
      resetDrag();
    }, 180);
  };

  const handleTouchEnd = (x: number, y: number) => {
    if (!touchStart) return;
    const dx = x - touchStart.x;
    const dy = y - touchStart.y;
    const horizontal = Math.abs(dx) > Math.abs(dy);

    if (horizontal && Math.abs(dx) > 70) {
      animatePageTurn(dx < 0 ? 1 : -1);
    } else if (!horizontal && Math.abs(dy) > 70) {
      animateStoryChange(dy < 0 ? 1 : -1);
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
    setTouchStart(null);
  };

  const activeOffset = swipeExit ?? dragOffset;
  const cardStyle = {
    transform: `translate3d(${activeOffset.x}px, ${activeOffset.y}px, 0) rotate(${activeOffset.x / 24}deg)`,
    transition: touchStart ? "none" : "transform 180ms ease-out",
  };

  return (
    <main className="min-h-screen overflow-hidden bg-library text-foreground writing-crisp">
      <section className="mx-auto flex h-screen w-full max-w-5xl flex-col px-3 py-3 pb-24 sm:px-5">
        <header className="flex items-center justify-between gap-4 pb-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/25 bg-book-page shadow-sm">
              <Feather className="h-5 w-5 text-primary" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-primary">Folio Home</p>
              <h1 className="text-2xl font-bold leading-none text-book-ink sm:text-3xl">Short Stories</h1>
            </div>
          </div>
          <p className="text-sm font-semibold text-primary">{storyIndex + 1} / {stories.length}</p>
        </header>

        <div className="flex min-h-0 flex-1 items-stretch py-1">
          <article
            className="relative mx-auto flex h-full w-full max-w-3xl touch-none animate-story-rise flex-col select-none"
            style={cardStyle}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              setTouchStart({ x: event.clientX, y: event.clientY });
            }}
            onPointerMove={(event) => {
              if (!touchStart || swipeExit) return;
              setDragOffset({ x: event.clientX - touchStart.x, y: event.clientY - touchStart.y });
            }}
            onPointerUp={(event) => handleTouchEnd(event.clientX, event.clientY)}
            onPointerCancel={() => {
              setTouchStart(null);
              setDragOffset({ x: 0, y: 0 });
            }}
          >
            {mode === "text" ? (
              <>
                <div className="absolute -left-2 top-5 h-[86%] w-5 rounded-l-sm bg-book-edge shadow-book" />
                <div className="relative min-h-0 flex-1 overflow-hidden rounded-sm border border-book-edge bg-book-page shadow-book">
                  <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-border/80" />
                  <div className="pointer-events-none absolute inset-0 shadow-page-turn" />
                  <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(hsl(var(--book-ink))_1px,transparent_1px)] [background-size:100%_2rem]" />

                  <div key={`${story.title}-${pageIndex}`} className="relative flex h-full animate-page-settle flex-col p-6 sm:p-9 md:p-12">
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
                        <p>Swipe up for next story · left or right for pages</p>
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
              </>
            ) : (
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-sm border border-book-edge bg-card shadow-book">
                <div className="absolute inset-0 bg-library/70" />
                <div className="relative flex h-full flex-col justify-between p-7 md:p-12">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-primary">Video story</p>
                    <h2 className="mt-2 max-w-xl text-4xl font-bold leading-tight text-book-ink sm:text-6xl">{story.title}</h2>
                  </div>
                  <div className="mx-auto flex aspect-[9/16] w-full max-w-xs flex-col items-center justify-center rounded-sm border border-border bg-book-page p-6 text-center shadow-page-turn">
                    <Film className="h-12 w-12 text-primary" />
                    <p className="mt-5 text-xl font-bold text-book-ink">Short video edition</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">A vertical story feed placeholder for narrated clips and visual micro-fiction.</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Swipe up to move through video stories.</p>
                </div>
              </div>
            )}
          </article>
        </div>
      </section>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 px-4 py-3 shadow-book backdrop-blur-sm">
        <div className="mx-auto grid max-w-sm grid-cols-2 gap-3">
          <Button variant={mode === "text" ? "folio" : "bookmark"} onClick={() => setMode("text")}>
            <BookOpenText />
            Text
          </Button>
          <Button variant={mode === "video" ? "folio" : "bookmark"} onClick={() => setMode("video")}>
            <Film />
            Video
          </Button>
        </div>
      </nav>
    </main>
  );
};

export default Index;