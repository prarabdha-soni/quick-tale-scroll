import { useEffect, useMemo, useState } from "react";
import { Headphones, Moon, Pause, Play, Share2, Timer } from "lucide-react";

const PODCASTS = [
  {
    title: "The Lake That Listened",
    category: "Sleep story",
    duration: "4 min",
    narrator: "Nishu Calm",
    text:
      "Close your eyes and imagine a quiet lake under a silver moon. Every ripple carries away one small worry. A lantern floats from the shore, warm and gentle, guiding you toward a soft forest path. The night is safe, the air is cool, and every breath makes the world a little slower.",
  },
  {
    title: "वो आख़िरी वॉइस नोट",
    category: "Viral short",
    duration: "2 min",
    narrator: "Nishu Hindi",
    text:
      "रात के ठीक बारह बजे अनाया के फोन पर उसके भाई का वॉइस नोट आया। आवाज़ कांप रही थी—दीदी, दरवाज़ा मत खोलना। अनाया जम गई, क्योंकि उसका भाई तो शाम से घर के अंदर ही सो रहा था। तभी दरवाज़े पर दस्तक हुई, और अंदर कमरे से भाई की नींद में आवाज़ आई—दीदी, मेरा फोन कहाँ है?",
  },
] as const;

export function PodcastView() {
  const [playing, setPlaying] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const selectedPodcast = PODCASTS[selectedIndex];
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

  const utterance = useMemo(() => {
    if (typeof window === "undefined" || !("SpeechSynthesisUtterance" in window)) return null;
    const item = new SpeechSynthesisUtterance(selectedPodcast.text);
    item.rate = 0.82;
    item.pitch = 0.9;
    item.volume = 0.9;
    item.lang = selectedPodcast.title.match(/[\u0900-\u097F]/) ? "hi-IN" : "en-US";
    item.onend = () => setPlaying(false);
    return item;
  }, [selectedPodcast]);

  useEffect(() => {
    return () => {
      if (canSpeak) window.speechSynthesis.cancel();
    };
  }, [canSpeak]);

  const togglePlayback = () => {
    if (!canSpeak || !utterance) return;
    if (playing) {
      window.speechSynthesis.pause();
      setPlaying(false);
      return;
    }
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    } else {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
    setPlaying(true);
  };

  const sharePodcast = async () => {
    const message = `${selectedPodcast.title}\n${selectedPodcast.category} · ${selectedPodcast.duration}\n\n${selectedPodcast.text}\n\n— Nishu Stories`;
    if (navigator.share) {
      await navigator.share({ title: selectedPodcast.title, text: message }).catch(() => undefined);
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-0.5 pb-4 pt-3 sm:px-0">
      <section className="rounded-3xl border border-primary/15 bg-gradient-to-br from-card via-secondary/70 to-accent/10 p-5 shadow-book">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">For You</p>
            <h2 className="mt-1 text-3xl font-extrabold leading-tight tracking-tight text-book-ink">Podcasts</h2>
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <Headphones className="h-6 w-6" strokeWidth={2.25} aria-hidden />
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Calm audio stories for slow evenings, quiet breaks, and sleep time.
        </p>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between gap-2">
          <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-book-ink">Recommended today</h3>
          <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent">Sample</span>
        </div>

        <article className="overflow-hidden rounded-3xl border border-primary/15 bg-book-page shadow-book ring-1 ring-primary/5">
          <div className="flex gap-2 overflow-x-auto border-b border-border/60 bg-card/60 p-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PODCASTS.map((podcast, index) => (
              <button
                key={podcast.title}
                type="button"
                onClick={() => {
                  if (canSpeak) window.speechSynthesis.cancel();
                  setPlaying(false);
                  setSelectedIndex(index);
                }}
                className={`focus-ring shrink-0 rounded-full border px-3 py-2 text-xs font-bold transition ${
                  selectedIndex === index
                    ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "border-border/80 bg-background/70 text-book-ink hover:bg-background"
                }`}
              >
                {podcast.category}
              </button>
            ))}
          </div>
          <div className="relative min-h-[14rem] p-5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-accent/15" aria-hidden />
            <div className="relative flex min-h-[11.5rem] flex-col justify-between">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-[11px] font-bold text-primary shadow-sm backdrop-blur-sm">
                  <Moon className="h-3.5 w-3.5" aria-hidden />
                  {selectedPodcast.category}
                </span>
                <button
                  type="button"
                  onClick={sharePodcast}
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-primary shadow-md backdrop-blur-sm transition hover:bg-background"
                  aria-label="Share podcast"
                  title="Share podcast"
                >
                  <Share2 className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                </button>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{selectedPodcast.narrator}</p>
                <h3 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-book-ink">{selectedPodcast.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{selectedPodcast.text}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-border/70 bg-card/70 p-4 backdrop-blur-sm">
            <button
              type="button"
              onClick={togglePlayback}
              disabled={!canSpeak}
              className="focus-ring flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={playing ? "Pause sample audio story" : "Play sample audio story"}
            >
              {playing ? <Pause className="h-6 w-6" strokeWidth={2.5} /> : <Play className="ml-0.5 h-6 w-6" strokeWidth={2.5} />}
            </button>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center justify-between gap-2 text-xs font-semibold text-muted-foreground">
                <span>{playing ? "Playing" : "Ready"}</span>
                <span className="inline-flex items-center gap-1 tabular-nums">
                  <Timer className="h-3.5 w-3.5" aria-hidden />
                  {selectedPodcast.duration}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-primary to-accent transition-all" />
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}