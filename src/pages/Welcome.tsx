import { useNavigate } from "react-router-dom";
import { ArrowRight, Moon, Headphones, BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/welcome-hero.jpg";
import storyImg from "@/assets/story-lamp-lake.jpg";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    try {
      localStorage.setItem("nishu-welcome-seen", "1");
    } catch {
      /* ignore */
    }
    navigate("/");
  };

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-[#0B1437] text-white">
      {/* Full-bleed hero image */}
      <div aria-hidden className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          className="h-full w-full object-cover"
          width={1280}
          height={1280}
        />
        {/* Layered gradients for calm app feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1437]/30 via-[#0B1437]/55 to-[#0B1437]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Soft glowing aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-indigo-400/20 blur-[120px]" />
        <div className="absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-rose-300/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
        {/* Brand row */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20">
              <Moon className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-lg font-semibold tracking-wide">Nishu</span>
          </div>
          <button
            onClick={handleContinue}
            className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur hover:bg-white/10"
          >
            Skip
          </button>
        </header>

        {/* Spacer to let hero breathe */}
        <div className="flex-1" />

        {/* Headline */}
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-white/60">
            Sleep · Stories · Calm
          </p>
          <h1 className="mt-4 font-serif text-[2.6rem] font-light leading-[1.1] tracking-tight">
            The Best{" "}
            <span className="font-medium italic text-amber-200">Story App</span>
            <br />
            in your pocket.
          </h1>
          <p className="mx-auto mt-4 max-w-xs text-[15px] leading-relaxed text-white/70">
            Drift away with bedtime tales & global folklore — narrated for the quiet moments of your day.
          </p>
        </div>

        {/* Story of the day card */}
        <div className="mt-7 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-2xl shadow-black/40">
          <div className="flex items-center gap-3 p-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10">
              <img
                src={storyImg}
                alt="A glowing lamp by a still lake"
                width={1024}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/80">
                Story of the day
              </p>
              <p className="mt-0.5 truncate font-serif text-base font-medium text-white">
                A Lamp by the Lake
              </p>
              <div className="mt-1 flex items-center gap-3 text-[11px] text-white/60">
                <span className="flex items-center gap-1">
                  <Headphones className="h-3 w-3" /> 8 min
                </span>
                <span>·</span>
                <span>🇮🇳 Hindi · EN</span>
              </div>
            </div>
            <button
              type="button"
              aria-label="Play story preview"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0B1437] shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <Play className="h-4 w-4 fill-current" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-5 space-y-3">
          <Button
            type="button"
            onClick={handleContinue}
            className="group relative h-14 w-full overflow-hidden rounded-full bg-white text-base font-semibold text-[#0B1437] shadow-[0_15px_40px_-10px_rgba(255,255,255,0.35)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <span className="flex items-center justify-center gap-2">
              <BookOpen className="h-4 w-4" />
              Begin Your Journey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>

          <p className="text-center text-[11px] text-white/50">
            Free forever · No ads · Loved in 120+ countries
          </p>
        </div>
      </div>
    </main>
  );
};

export default WelcomePage;
