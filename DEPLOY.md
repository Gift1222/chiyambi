# Deploying (GitHub + Vercel + Supabase)

1. Supabase: create a project, then Project Settings > Database > Connection string > URI (Transaction pooler, port 6543). Put it in `DATABASE_URI`.
2. Create the tables ONCE, from your computer:
   - copy `.env.example` to `.env`, fill DATABASE_URI with the **Direct / Session** connection (port 5432), add PAYLOAD_SECRET
   - `pnpm install` then `pnpm dev`, open http://localhost:3000/admin and create your first admin user.
   Payload creates the tables in Supabase automatically in dev mode.
3. Push to GitHub, import in Vercel, add env vars: `DATABASE_URI` (pooler, 6543), `PAYLOAD_SECRET`, and add a Blob store under Vercel > Storage (adds `BLOB_READ_WRITE_TOKEN`).
4. Deploy. Admin is at `/admin`.
