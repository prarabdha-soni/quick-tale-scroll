import { useEffect, useState } from "react";
import { ClipboardPaste, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type PasteYourStorySectionProps = {
  saved: { title: string; body: string } | null;
  onSave: (title: string, body: string) => void;
  onClear: () => void;
};

export function PasteYourStorySection({ saved, onSave, onClear }: PasteYourStorySectionProps) {
  const [title, setTitle] = useState(saved?.title ?? "");
  const [body, setBody] = useState(saved?.body ?? "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(saved?.title ?? "");
    setBody(saved?.body ?? "");
    setError(null);
  }, [saved?.title, saved?.body]);

  const handleSave = () => {
    const t = title.trim();
    const b = body.trim();
    if (!t) {
      setError("Add a title.");
      return;
    }
    if (b.length < 12) {
      setError("Paste a bit more story text (at least a short paragraph).");
      return;
    }
    setError(null);
    onSave(t, b);
  };

  return (
    <section className="rounded-2xl border border-dashed border-primary/35 bg-card/90 p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-start gap-2.5">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-book-page">
          <ClipboardPaste className="h-4 w-4 text-primary" aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-book-ink">Your story</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Paste a short tale with a title. It is saved on this device and is inserted <span className="font-semibold text-book-ink">after the built-in library tales</span> in Story and Books.
            Use a <span className="font-medium text-book-ink">blank line</span> between paragraphs to split swipe sections.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="paste-title" className="text-book-ink">
            Title
          </Label>
          <Input
            id="paste-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. The last train home"
            className="bg-book-page/80"
            autoComplete="off"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="paste-body" className="text-book-ink">
            Story
          </Label>
          <Textarea
            id="paste-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={"Paste here…\n\nNew paragraph after a blank line becomes the next section."}
            rows={8}
            className="min-h-[10rem] resize-y bg-book-page/80 font-serif text-[15px] leading-relaxed"
          />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {saved ? <p className="text-xs font-medium text-primary">Saved on this device — look for it after the built-in tales in the list.</p> : null}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Button type="button" variant="default" className="focus-ring" onClick={handleSave}>
            Save to library
          </Button>
          {saved ? (
            <Button type="button" variant="outline" className="focus-ring gap-1.5 border-destructive/40 text-destructive hover:bg-destructive/10" onClick={onClear}>
              <Trash2 className="h-4 w-4" aria-hidden />
              Remove
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
