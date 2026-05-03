import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Globe2, Sparkles, Star, Quote } from "lucide-react";
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
    <main className="relative min-h-dvh w-full overflow-hidden bg-[#FAF7F2] text-stone-900">
      {/* Soft pastel mesh */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 h-[26rem] w-[26rem] rounded-full bg-rose-200/60 blur-[110px]" />
        <div className="absolute top-1/3 -right-32 h-[24rem] w-[24rem] rounded-full bg-sky-200/60 blur-[110px]" />
        <div className="absolute bottom-[-8rem] left-1/3 h-[22rem] w-[22rem] rounded-full bg-amber-200/70 blur-[110px]" />
      </div>

      {/* Paper grain dots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(120,90,60,0.08) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
        {/* Brand row */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-amber-400 shadow-md shadow-rose-200">
              <BookOpen className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight">Nishu</span>
          </div>
          <span className="rounded-full border border-stone-200 bg-white/70 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-stone-500 backdrop-blur">
            Worldwide
          </span>
        </header>

        {/* Hero card — story book style */}
        <div className="relative mt-6 flex-1">
          <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-300/40">
            <img
              src={heroImg}
              alt="Storytellers from around the world"
              width={1024}
              height={1024}
              className="h-64 w-full object-cover"
            />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />

            {/* Country chips floating */}
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/90 px-3 py-1 text-xs font-medium text-stone-700 shadow-sm backdrop-blur-md">
              <Globe2 className="h-3.5 w-3.5 text-rose-500" />
              120+ countries
            </div>
            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-stone-200 bg-white/90 px-3 py-1 text-xs font-semibold text-stone-700 shadow-sm backdrop-blur-md">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              4.9
            </div>

            {/* Mini story snippet inside card */}
            <div className="relative -mt-6 px-5 pb-5">
              <div className="rounded-2xl border border-stone-200 bg-[#FFFDF8] p-4 shadow-sm">
                <Quote className="h-4 w-4 text-rose-400" />
                <p className="mt-1 font-serif text-[15px] leading-snug text-stone-700">
                  “Once upon a quiet night, a little lamp by the lake whispered a story that crossed
                  oceans…”
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="font-medium uppercase tracking-wider">Story of the day</span>
                  <span>🇮🇳 · 🇯🇵 · 🇫🇷 · 🇧🇷</span>
                </div>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="mt-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">
              Stories · From every corner
            </p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-stone-900 sm:text-[2.75rem]">
              The Best{" "}
              <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Story App
              </span>
              <br />
              in your pocket.
            </h1>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-stone-600">
              Folktales, bedtime classics & fresh voices from around the world — beautifully told.
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
            className="group relative h-14 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(244,63,94,0.55)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start Reading
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          </Button>

          <p className="text-center text-[11px] text-stone-500">
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
    <div className="rounded-2xl border border-stone-200 bg-white/80 px-2 py-3 text-center shadow-sm backdrop-blur-md">
      <span className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 text-rose-500">
        {icon}
      </span>
      <p className="text-base font-bold leading-none text-stone-900">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wider text-stone-500">{label}</p>
    </div>
  );
}

export default WelcomePage;
