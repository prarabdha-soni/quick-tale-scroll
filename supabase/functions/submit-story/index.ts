import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const APPROVER_EMAIL = "prarabdha21@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { title, body, submitterName } = await req.json();
    if (!title?.trim() || !body?.trim() || body.trim().length < 12) {
      return new Response(JSON.stringify({ error: "Title and a longer body are required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const { data, error } = await supabase
      .from("story_submissions")
      .insert({
        title: title.trim().slice(0, 200),
        body: body.trim().slice(0, 20000),
        submitter_name: submitterName?.trim()?.slice(0, 100) ?? null,
      })
      .select("id, approval_token, title, body, submitter_name")
      .single();

    if (error) throw error;

    // Build approval/reject URLs (point to the approve-story edge function)
    const fnBase = `${supabaseUrl}/functions/v1/approve-story`;
    const approveUrl = `${fnBase}?token=${data.approval_token}&action=approve`;
    const rejectUrl = `${fnBase}?token=${data.approval_token}&action=reject`;

    // Try to send approval email via Lovable Email
    let emailSent = false;
    let emailError: string | null = null;
    try {
      const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
      if (lovableApiKey) {
        const html = `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#222">
            <h2 style="margin:0 0 8px">📚 New story submission</h2>
            <p style="color:#666;margin:0 0 16px">${data.submitter_name ? `From: ${escapeHtml(data.submitter_name)}` : "Anonymous submitter"}</p>
            <h3 style="margin:16px 0 8px">${escapeHtml(data.title)}</h3>
            <div style="white-space:pre-wrap;background:#f7f7f7;padding:16px;border-radius:8px;border:1px solid #eee;font-size:14px;line-height:1.6">${escapeHtml(data.body)}</div>
            <div style="margin-top:24px;display:flex;gap:12px">
              <a href="${approveUrl}" style="background:#16a34a;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">✅ Approve</a>
              <a href="${rejectUrl}" style="background:#dc2626;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">❌ Reject</a>
            </div>
            <p style="color:#999;margin-top:24px;font-size:12px">Approving will publish this story on Nishu Stories immediately.</p>
          </div>
        `;
        const resp = await fetch("https://ai.gateway.lovable.dev/v1/email/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${lovableApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: APPROVER_EMAIL,
            subject: `New story for approval: ${data.title}`,
            html,
          }),
        });
        if (resp.ok) emailSent = true;
        else emailError = `Email gateway returned ${resp.status}`;
      } else {
        emailError = "LOVABLE_API_KEY not configured";
      }
    } catch (e) {
      emailError = (e as Error).message;
    }

    return new Response(
      JSON.stringify({
        ok: true,
        id: data.id,
        emailSent,
        emailError,
        approveUrl, // returned for fallback (e.g. testing without email domain)
        rejectUrl,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
