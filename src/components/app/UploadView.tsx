import { useState } from "react";
import { ClipboardPaste, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function UploadView() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedOk, setSubmittedOk] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setError(null);
    const t = title.trim();
    const b = body.trim();
    if (!t) return setError("Add a title.");
    if (b.length < 12) return setError("Story is too short.");

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-story", {
        body: { title: t, body: b, submitterName: name.trim() || undefined },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setSubmittedOk(true);
      setTitle("");
      setBody("");
      setName("");
      toast({
        title: "Story submitted!",
        description: data?.emailSent
          ? "Sent for approval. It will appear once approved."
          : "Saved. Approval email could not be sent — set up an email domain in Cloud.",
      });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-1 pb-2 pt-1">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Submit your short story. It is sent for approval and only appears in the app once approved.
      </p>

      <section className="rounded-2xl border border-dashed border-primary/35 bg-card/90 p-4 shadow-sm sm:p-5">
        <div className="mb-3 flex items-start gap-2.5">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-book-page">
            <ClipboardPaste className="h-4 w-4 text-primary" aria-hidden />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-book-ink">Submit a story</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Use a <span className="font-medium text-book-ink">blank line</span> between paragraphs to split swipe sections.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="sub-name" className="text-book-ink">Your name (optional)</Label>
            <Input
              id="sub-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              placeholder="e.g. Aarav"
              className="bg-book-page/80"
              autoComplete="off"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sub-title" className="text-book-ink">Title</Label>
            <Input
              id="sub-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              placeholder="e.g. The last train home"
              className="bg-book-page/80"
              autoComplete="off"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sub-body" className="text-book-ink">Story</Label>
            <Textarea
              id="sub-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={20000}
              placeholder={"Write or paste your story here…\n\nNew paragraph after a blank line becomes the next section."}
              rows={8}
              className="min-h-[10rem] resize-y bg-book-page/80 font-serif text-[15px] leading-relaxed"
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          {submittedOk ? (
            <p className="text-xs font-medium text-primary">
              Submitted! It will appear in the app once approved by the admin.
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button type="button" onClick={handleSubmit} disabled={submitting} className="focus-ring gap-1.5">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {submitting ? "Submitting…" : "Submit for approval"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
