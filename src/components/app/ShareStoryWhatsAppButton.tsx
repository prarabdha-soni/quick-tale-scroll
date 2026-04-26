import { Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Story } from "@/data/stories";
import { shareStoryToWhatsApp } from "@/lib/share-whatsapp";
import { cn } from "@/lib/utils";

type ShareStoryWhatsAppButtonProps = {
  story: Story;
  /** Section index to quote (defaults to start). */
  pageIndex?: number;
  className?: string;
  variant?: "ghost" | "outline" | "secondary";
  size?: "icon" | "sm";
};

export function ShareStoryWhatsAppButton({
  story,
  pageIndex = 0,
  className,
  variant = "ghost",
  size = "icon",
}: ShareStoryWhatsAppButtonProps) {
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(
        "focus-ring shrink-0",
        size === "icon" && "text-[#128C7E] hover:bg-[#25D366]/12 hover:text-[#075E54]",
        className,
      )}
      aria-label="Share this story to WhatsApp"
      title="Share to WhatsApp"
      onClick={(e) => {
        e.stopPropagation();
        shareStoryToWhatsApp(story, pageIndex);
      }}
    >
      {size === "icon" ? (
        <Share2 className="h-5 w-5" strokeWidth={2.25} />
      ) : (
        <>
          <Share2 className="h-4 w-4 text-[#128C7E]" strokeWidth={2.25} aria-hidden />
          WhatsApp
        </>
      )}
    </Button>
  );
}
