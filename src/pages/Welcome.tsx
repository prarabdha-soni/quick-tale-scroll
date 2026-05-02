import { useNavigate } from "react-router-dom";
import { BookOpen, Sparkles, Globe2 } from "lucide-react";
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
    <main className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col items-center overflow-hidden bg-[#0a0604] px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-amber-50">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl" />

      {/* Brand */}
      <div className="relative flex items-center gap-2">
        <BookOpen className="h-7 w-7 text-amber-500" strokeWidth={2.5} />
        <span className="font-serif text-2xl font-bold tracking-tight text-amber-500">Nishu</span>
      </div>

      {/* Headline */}
      <div className="relative mt-6 text-center">
        <p className="font-serif text-sm font-semibold uppercase tracking-[0.25em] text-amber-500/90">
          Stories From Around The World
        </p>
        <h1 className="mt-2 font-serif text-3xl font-extrabold leading-tight text-amber-50 sm:text-4xl">
          Replace Scrolling With&nbsp;
          <span className="text-amber-400">The Best Story App</span>
        </h1>
        <p className="mt-2 text-sm text-amber-100/70">
          Bite-sized tales, classics & community voices — anywhere, anytime.
        </p>
      </div>

      {/* Badges */}
      <div className="relative mt-5 grid w-full grid-cols-3 gap-2">
        <Badge icon={<Globe2 className="h-4 w-4" />} highlight="120+" subtitle="countries" />
        <Badge icon={<Sparkles className="h-4 w-4" />} highlight="2M+" subtitle="readers" />
        <Badge highlight="4.9★" subtitle="App of 2026" />
      </div>

      {/* Hero image */}
      <div className="relative mt-5 w-full flex-1 overflow-hidden rounded-2xl border border-amber-900/40 shadow-2xl shadow-black/60">
        <img
          src={heroImg}
          alt="Legendary storytellers from around the world"
          width={1024}
          height={1024}
          className="h-full w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0a0604] via-transparent to-transparent" />
      </div>

      {/* Quote */}
      <p className="relative mt-5 px-2 text-center font-serif text-base italic leading-snug text-amber-200/90 sm:text-lg">
        “The best app to fall in love with reading again.”
      </p>

      {/* CTA */}
      <Button
        type="button"
        onClick={handleContinue}
        className="relative mt-5 h-14 w-full rounded-2xl bg-amber-500 text-lg font-bold text-[#1a0e05] shadow-lg shadow-amber-500/30 hover:bg-amber-400"
      >
        Get Started
      </Button>

      <p className="relative mt-3 text-center text-xs text-amber-100/50">
        Terms &amp; Conditions <span className="mx-1">•</span> Privacy Policy
      </p>
    </main>
  );
};

function Badge({ icon, highlight, subtitle }: { icon?: React.ReactNode; highlight: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-amber-900/40 bg-amber-500/5 px-2 py-2 text-center">
      {icon ? <span className="mb-0.5 text-amber-400">{icon}</span> : null}
      <p className="font-serif text-base font-bold text-amber-400 leading-none">{highlight}</p>
      <p className="mt-1 text-[10px] text-amber-100/80">{subtitle}</p>
    </div>
  );
}

export default WelcomePage;
