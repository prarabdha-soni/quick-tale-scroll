import { PasteYourStorySection } from "@/components/app/PasteYourStorySection";

type UploadViewProps = {
  pastedTale: { title: string; body: string } | null;
  onSavePastedTale: (title: string, body: string) => void;
  onClearPastedTale: () => void;
};

export function UploadView({ pastedTale, onSavePastedTale, onClearPastedTale }: UploadViewProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-1 pb-2 pt-1">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Add your own short story here. It stays on this device only and shows up in the <span className="font-medium text-book-ink">Story</span> and{" "}
        <span className="font-medium text-book-ink">Books</span> tabs like the built-in tales.
      </p>
      <PasteYourStorySection saved={pastedTale} onSave={onSavePastedTale} onClear={onClearPastedTale} />
    </div>
  );
}
