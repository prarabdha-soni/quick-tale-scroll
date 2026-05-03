import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

/** Matches `supabase/migrations/...handle_new_user_admin` — this email gets `admin` in `user_roles` when the Auth user is created. */
export const PROVISIONED_ADMIN_EMAIL = "prarabdha21@gmail.com";

function describeAuthError(err: unknown): string {
  const code = typeof err === "object" && err !== null && "code" in err ? String((err as { code?: string }).code) : "";
  const name = typeof err === "object" && err !== null && "name" in err ? String((err as { name?: string }).name) : "";
  const msg = err instanceof Error ? err.message : String(err);
  const reasons =
    typeof err === "object" && err !== null && "reasons" in err && Array.isArray((err as { reasons?: unknown }).reasons)
      ? ((err as { reasons: string[] }).reasons || []).filter((r) => typeof r === "string")
      : [];

  if (code === "invalid_credentials" || /invalid login credentials/i.test(msg)) {
    return (
      "No matching Supabase Auth user. In the Supabase Dashboard: Authentication → Users → Add user — use this email and the password you choose there (confirm the user if prompted). No app signup is required."
    );
  }
  if (code === "weak_password" || name === "AuthWeakPasswordError" || /password.*weak|too weak/i.test(msg)) {
    const detail = reasons.length > 0 ? ` ${reasons.join(" ")}` : "";
    return `${msg}${detail} You can also adjust minimum strength under Supabase → Authentication → Providers → Email.`;
  }
  return msg;
}

export default function AuthPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState(
    () => import.meta.env.VITE_AUTH_PREFILL_EMAIL ?? PROVISIONED_ADMIN_EMAIL,
  );
  const [password, setPassword] = useState(() => import.meta.env.VITE_AUTH_PREFILL_PASSWORD ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate("/admin", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      toast({ title: "Auth error", description: describeAuthError(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/admin`,
    });
    if (result.error) {
      toast({ title: "Google sign-in failed", description: result.error.message, variant: "destructive" });
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-6 shadow-sm">
        <h1 className="mb-1 text-center text-xl font-semibold">Admin sign in</h1>
        <p className="mb-3 text-center text-xs leading-relaxed text-muted-foreground">
          Password is <span className="font-medium text-foreground">not</span> stored in this app. Create the user once in Supabase:{" "}
          <span className="font-medium text-foreground">Authentication → Users → Add user</span>, email{" "}
          <span className="font-mono text-[11px] text-foreground/90">{PROVISIONED_ADMIN_EMAIL}</span>, set a strong password there, then sign in
          here with the same password.
        </p>
        <p className="mb-5 text-center text-[11px] text-muted-foreground">
          Your database trigger assigns <span className="font-medium text-foreground">admin</span> to that email automatically.
        </p>

        <Button type="button" variant="outline" className="mb-4 w-full" onClick={handleGoogle} disabled={loading}>
          Continue with Google
        </Button>

        <div className="relative my-4 text-center text-xs text-muted-foreground">
          <span className="relative z-10 bg-card px-2">or</span>
          <div className="absolute inset-x-0 top-1/2 -z-0 h-px bg-border" />
        </div>

        <form onSubmit={handleEmail} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-[11px] leading-snug text-muted-foreground">
              Enter the password you set in Supabase when you added this user (e.g. mixed case, numbers—per your project rules).
            </p>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}
