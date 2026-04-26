import { useState } from "react";
import { Library } from "lucide-react";

import { ShareStoryWhatsAppButton } from "@/components/app/ShareStoryWhatsAppButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Story } from "@/data/stories";

type BooksViewProps = {
  stories: Story[];
  onOpenStory: (storyIndex: number) => void;
};

function CoverThumb({ story, className }: { story: Story; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn("relative shrink-0 overflow-hidden rounded-md border border-border bg-muted ring-1 ring-border/50", className)}>
      {!loaded ? <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden /> : null}
      <img
        src={story.coverImage}
        alt={story.coverAlt}
        className={cn("h-full w-full object-cover transition-opacity duration-200", loaded ? "opacity-100" : "opacity-0")}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export function BooksView({ stories, onOpenStory }: BooksViewProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-1 pb-2 pt-1">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Library className="h-5 w-5 text-primary" />
        <div>
          <h2 className="text-lg font-bold text-book-ink">Books</h2>
          <p className="text-xs text-muted-foreground">Spines out — tap a title to open it in the reader.</p>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {stories.map((s, i) => (
          <li key={`book-${i}-${s.title}`} className="flex gap-3 rounded-2xl border border-primary/10 bg-book-page p-3 shadow-md shadow-primary/5 ring-1 ring-transparent transition-shadow hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10">
            <CoverThumb story={s} className="aspect-[2/3] w-[4.5rem] shrink-0 sm:w-[5.25rem]" />
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
              <p className="text-[10px] uppercase tracking-[0.16em] text-primary">{s.genre}</p>
              <h3 className="font-semibold leading-snug text-book-ink">{s.title}</h3>
              <p className="text-xs text-muted-foreground">{s.author}</p>
              <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">{s.hook}</p>
              <p className="text-[10px] font-medium text-primary">~{s.estimatedMinutes} min · {s.pages.length} sections</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <Button variant="folio" size="sm" className="focus-ring" onClick={() => onOpenStory(i)}>
                  Open in Story
                </Button>
                <ShareStoryWhatsAppButton story={s} variant="outline" size="sm" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
