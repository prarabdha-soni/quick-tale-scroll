import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Loader2, LogOut } from "lucide-react";

type Submission = {
  id: string;
  title: string;
  body: string;
  status: string;
  submitter_name: string | null;
  created_at: string;
};

export default function AdminPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id);
      const admin = (roles ?? []).some((r) => r.role === "admin");
      setIsAdmin(admin);
      setAuthChecked(true);
      if (admin) loadRows();
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const loadRows = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("story_submissions")
      .select("id, title, body, status, submitter_name, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load", description: error.message, variant: "destructive" });
    } else {
      setRows((data ?? []) as Submission[]);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    setBusyId(id);
    const { error } = await supabase
      .from("story_submissions")
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq("id", id);
    setBusyId(null);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: status === "approved" ? "Approved" : "Rejected" });
    loadRows();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  if (!authChecked) {
    return (
      <main className="min-h-dvh flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-xl font-semibold">Not authorized</h1>
        <p className="text-sm text-muted-foreground max-w-sm">
          Your account does not have admin access. Sign in with the admin email.
        </p>
        <Button variant="outline" onClick={signOut}>Sign out</Button>
      </main>
    );
  }

  const pending = rows.filter((r) => r.status === "pending");
  const reviewed = rows.filter((r) => r.status !== "pending");

  return (
    <main className="min-h-dvh bg-background">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur">
        <div>
          <h1 className="text-lg font-semibold">Story admin</h1>
          <p className="text-xs text-muted-foreground">Approve or reject submissions</p>
        </div>
        <Button variant="ghost" size="sm" onClick={signOut} className="gap-1.5">
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-6 space-y-8">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Pending ({pending.length})
          </h2>
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : pending.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pending submissions.</p>
          ) : (
            <div className="space-y-3">
              {pending.map((r) => (
                <article key={r.id} className="rounded-xl border bg-card p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{r.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {r.submitter_name ?? "Anonymous"} · {new Date(r.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap text-sm text-foreground/90 max-h-60 overflow-y-auto rounded-md bg-muted/40 p-3 mb-3">
                    {r.body}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateStatus(r.id, "approved")}
                      disabled={busyId === r.id}
                      className="gap-1.5"
                    >
                      <Check className="h-4 w-4" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(r.id, "rejected")}
                      disabled={busyId === r.id}
                      className="gap-1.5"
                    >
                      <X className="h-4 w-4" /> Reject
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Reviewed ({reviewed.length})
          </h2>
          <div className="space-y-2">
            {reviewed.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border bg-card/60 px-3 py-2 text-sm">
                <span className="truncate">{r.title}</span>
                <span
                  className={
                    "ml-3 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium " +
                    (r.status === "approved"
                      ? "bg-primary/10 text-primary"
                      : "bg-destructive/10 text-destructive")
                  }
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
