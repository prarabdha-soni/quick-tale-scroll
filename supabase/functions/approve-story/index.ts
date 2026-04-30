import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const action = (url.searchParams.get("action") ?? "approve").toLowerCase();

  if (!token) return htmlResponse(400, "Missing token", "This approval link is invalid.");
  if (!["approve", "reject"].includes(action))
    return htmlResponse(400, "Invalid action", "Action must be approve or reject.");

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: existing, error: fetchErr } = await supabase
    .from("story_submissions")
    .select("id, title, status")
    .eq("approval_token", token)
    .maybeSingle();

  if (fetchErr) return htmlResponse(500, "Server error", fetchErr.message);
  if (!existing) return htmlResponse(404, "Not found", "No submission matches this link.");

  if (existing.status !== "pending") {
    return htmlResponse(
      200,
      "Already reviewed",
      `“${existing.title}” is already <b>${existing.status}</b>.`
    );
  }

  const newStatus = action === "approve" ? "approved" : "rejected";
  const { error: updErr } = await supabase
    .from("story_submissions")
    .update({ status: newStatus, reviewed_at: new Date().toISOString() })
    .eq("approval_token", token);

  if (updErr) return htmlResponse(500, "Update failed", updErr.message);

  return htmlResponse(
    200,
    newStatus === "approved" ? "✅ Approved" : "❌ Rejected",
    `“${existing.title}” has been <b>${newStatus}</b>.${newStatus === "approved" ? " It is now visible in the app." : ""}`
  );
});

function htmlResponse(status: number, title: string, message: string) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>body{font-family:system-ui,Arial,sans-serif;background:#faf7f2;color:#222;display:flex;min-height:100dvh;align-items:center;justify-content:center;margin:0;padding:24px}
  .card{background:#fff;border:1px solid #eee;border-radius:16px;padding:32px;max-width:420px;text-align:center;box-shadow:0 10px 30px -10px rgba(0,0,0,.1)}
  h1{margin:0 0 12px;font-size:22px}p{margin:0;color:#555;line-height:1.55}</style></head>
  <body><div class="card"><h1>${title}</h1><p>${message}</p></div></body></html>`;
  return new Response(html, { status, headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" } });
}
