import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Globe2, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/welcome-hero.jpg";

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
    <main className="relative min-h-dvh w-full overflow-hidden bg-[#070512] text-white">
      {/* Animated gradient mesh */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-fuchsia-600/30 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full bg-indigo-500/30 blur-[120px]" />
        <div className="absolute bottom-[-10rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-amber-400/20 blur-[120px]" />
      </div>

      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
        {/* Brand row */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-500 shadow-lg shadow-fuchsia-500/30">
              <BookOpen className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight">Nishu</span>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/70 backdrop-blur">
            v2026
          </span>
        </header>

        {/* Hero card */}
        <div className="relative mt-6 flex-1">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/50 backdrop-blur-xl">
            <img
              src={heroImg}
              alt="Storytellers from around the world"
              width={1024}
              height={1024}
              className="h-72 w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#070512] via-[#070512]/40 to-transparent" />

            {/* Floating chip */}
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Live now
            </div>

            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              4.9
            </div>
          </div>

          {/* Headline */}
          <div className="mt-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-300/90">
              Stories · Worldwide
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-[2.75rem]">
              The Best{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                Story App
              </span>
              <br />
              in your pocket.
            </h1>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              Bite-sized tales, timeless classics, and fresh voices — beautifully crafted for every moment.
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            <Stat icon={<Globe2 className="h-3.5 w-3.5" />} value="120+" label="countries" />
            <Stat icon={<Sparkles className="h-3.5 w-3.5" />} value="2M+" label="readers" />
            <Stat icon={<BookOpen className="h-3.5 w-3.5" />} value="10k+" label="stories" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 space-y-3">
          <Button
            type="button"
            onClick={handleContinue}
            className="group relative h-14 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 text-base font-bold text-white shadow-[0_10px_40px_-10px_rgba(217,70,239,0.6)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          </Button>

          <p className="text-center text-[11px] text-white/40">
            By continuing you agree to our{" "}
            <span className="underline-offset-2 hover:underline">Terms</span> &{" "}
            <span className="underline-offset-2 hover:underline">Privacy</span>
          </p>
        </div>
      </div>
    </main>
  );
};

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-3 text-center backdrop-blur-md">
      <span className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-fuchsia-300">
        {icon}
      </span>
      <p className="text-base font-bold leading-none">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wider text-white/50">{label}</p>
    </div>
  );
}

export default WelcomePage;
