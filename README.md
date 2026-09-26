# skyline-ledger-keepalive

Cloudflare Worker that pings the SkylineChurchLedger Supabase project once a day
(12:00 UTC) so the free tier doesn't auto-pause it.

## Deploy

```bash
cd skyline-ledger-keepalive
npx wrangler secret put SUPABASE_ANON_KEY   # paste anon/publishable key from Supabase → Project Settings → API Keys
npx wrangler deploy
```

## Test

- Open the worker URL printed by `wrangler deploy` → should return `{"ok":true,"status":200,...}`
- Or: `npx wrangler dev --test-scheduled` then `curl "http://localhost:8787/__scheduled?cron=0+12+*+*+*"`
- Cron runs show in Cloudflare dashboard → Workers → skyline-ledger-keepalive → Logs.
