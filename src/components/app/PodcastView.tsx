import { useEffect, useRef, useState } from "react";
import { Headphones, Moon, Pause, Play, Share2, Timer } from "lucide-react";

const PODCAST = {
  title: "भिखारी की दावत",
  category: "Hindi audio story",
  duration: "9:34",
  narrator: "Real voice audio",
  audioSrc: "/audio/bhikhari-ki-dawat.mp3",
  text: "एक दिल छू लेने वाली हिंदी कहानी — भिखारी की दावत।",
} as const;

export function PodcastView() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    await audio.play();
    setPlaying(true);
  };

  const sharePodcast = () => {
    const audioUrl = typeof window !== "undefined" ? `${window.location.origin}${PODCAST.audioSrc}` : PODCAST.audioSrc;
    const message = `${PODCAST.title}\n${PODCAST.category} · ${PODCAST.duration}\n\n${PODCAST.text}\n${audioUrl}\n\n— Nishu Stories`;
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
          <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent">Real voice</span>
        </div>

        <article className="overflow-hidden rounded-3xl border border-primary/15 bg-book-page shadow-book ring-1 ring-primary/5">
          <div className="relative min-h-[14rem] p-5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-accent/15" aria-hidden />
            <div className="relative flex min-h-[11.5rem] flex-col justify-between">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-[11px] font-bold text-primary shadow-sm backdrop-blur-sm">
                  <Moon className="h-3.5 w-3.5" aria-hidden />
                  {PODCAST.category}
                </span>
                <button
                  type="button"
                  onClick={sharePodcast}
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-primary shadow-md backdrop-blur-sm transition hover:bg-background"
                  aria-label="Share podcast on WhatsApp"
                  title="Share on WhatsApp"
                >
                  <Share2 className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                </button>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{PODCAST.narrator}</p>
                <h3 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-book-ink">{PODCAST.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{PODCAST.text}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-border/70 bg-card/70 p-4 backdrop-blur-sm">
            <audio
              ref={audioRef}
              src={PODCAST.audioSrc}
              preload="metadata"
              onEnded={() => setPlaying(false)}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
              onTimeUpdate={(e) => {
                const audio = e.currentTarget;
                setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
              }}
            />
            <button
              type="button"
              onClick={togglePlayback}
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
                  {PODCAST.duration}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <button
              type="button"
              onClick={sharePodcast}
              className="focus-ring hidden shrink-0 items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-2 text-xs font-bold text-accent transition hover:bg-accent/15 sm:inline-flex"
              aria-label="Share podcast on WhatsApp"
            >
              <Share2 className="h-4 w-4" strokeWidth={2.25} aria-hidden />
              WhatsApp
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}