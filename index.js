// Daily keep-alive for the SkylineChurchLedger Supabase project.
// Runs one tiny read so the free-tier project isn't paused for inactivity.

async function ping(env) {
  const url = `${env.SUPABASE_URL}/rest/v1/service_entries?select=id&limit=1`;
  const res = await fetch(url, {
    headers: {
      apikey: env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
    },
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Supabase keep-alive failed: ${res.status} ${body}`);
  return { status: res.status, at: new Date().toISOString() };
}

export default {
  // Cron trigger (see wrangler.toml)
  async scheduled(event, env, ctx) {
    const result = await ping(env);
    console.log("keepalive ok", result);
  },

  // Manual check: visit the worker URL to run it on demand
  async fetch(request, env) {
    try {
      return Response.json({ ok: true, ...(await ping(env)) });
    } catch (err) {
      return Response.json({ ok: false, error: err.message }, { status: 500 });
    }
  },
};
