import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
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
      {/* Brand */}
      <div className="flex items-center gap-2">
        <BookOpen className="h-7 w-7 text-amber-500" strokeWidth={2.5} />
        <span className="font-serif text-2xl font-bold tracking-tight text-amber-500">Nishu</span>
      </div>

      {/* Headline */}
      <div className="mt-6 text-center">
        <p className="font-serif text-lg font-semibold uppercase tracking-wide text-amber-500/90 sm:text-xl">
          Replace Scrolling With
        </p>
        <h1 className="mt-1 font-serif text-3xl font-extrabold leading-tight text-amber-50 sm:text-4xl">
          The Best Story App
        </h1>
      </div>

      {/* Badges */}
      <div className="mt-5 grid w-full grid-cols-2 gap-3">
        <Badge title="Trusted by" highlight="2 Million +" subtitle="story lovers" />
        <Badge title="" highlight="Best Story" subtitle="App of 2026" />
      </div>

      {/* Hero image */}
      <div className="mt-5 w-full flex-1 overflow-hidden rounded-2xl border border-amber-900/40 shadow-2xl shadow-black/60">
        <img
          src={heroImg}
          alt="Legendary storytellers"
          width={1024}
          height={1024}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Quote */}
      <p className="mt-5 px-2 text-center font-serif text-base italic leading-snug text-amber-200/90 sm:text-lg">
        “ I absolutely love it. <br />
        The best app to read stories. ”
      </p>

      {/* CTA */}
      <Button
        type="button"
        onClick={handleContinue}
        className="mt-5 h-14 w-full rounded-2xl bg-amber-500 text-lg font-bold text-[#1a0e05] shadow-lg shadow-amber-500/30 hover:bg-amber-400"
      >
        Continue
      </Button>

      <p className="mt-3 text-center text-xs text-amber-100/50">
        Terms &amp; Conditions <span className="mx-1">•</span> Privacy Policy
      </p>
    </main>
  );
};

function Badge({ title, highlight, subtitle }: { title: string; highlight: string; subtitle: string }) {
  return (
    <div className="relative flex items-center justify-center px-6 py-2 text-center">
      {/* Left laurel */}
      <span aria-hidden className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl text-amber-500/80">
        ❦
      </span>
      <span aria-hidden className="absolute right-0 top-1/2 -translate-y-1/2 scale-x-[-1] text-2xl text-amber-500/80">
        ❦
      </span>
      <div>
        {title ? <p className="text-[10px] font-medium text-amber-100/80">{title}</p> : null}
        <p className="font-serif text-base font-bold text-amber-400">{highlight}</p>
        <p className="text-[10px] text-amber-100/80">{subtitle}</p>
      </div>
    </div>
  );
}

export default WelcomePage;
