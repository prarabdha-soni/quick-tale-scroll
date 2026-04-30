import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Story } from "@/data/stories";
import { talePayloadToStory } from "@/lib/user-pasted-tale";

export type ApprovedRow = {
  id: string;
  title: string;
  body: string;
  created_at: string;
};

export function useApprovedStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const { data, error } = await supabase
        .from("story_submissions")
        .select("id, title, body, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      if (cancelled) return;
      if (error) {
        console.error("Failed to load approved stories", error);
        setStories([]);
      } else {
        setStories((data ?? []).map((r) => talePayloadToStory({ title: r.title, body: r.body })));
      }
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel("story_submissions_approved")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "story_submissions" },
        () => load(),
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  return { stories, loading };
}
