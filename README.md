# Mission MarkeTech — Event Link Generator

A self-hosted AddEvent alternative for virtual events. Create shareable links that let anyone add your Google Meet event to Google Calendar, Outlook, Apple Calendar, or Yahoo Calendar.

---

## Setup: Supabase (one-time)

1. Go to https://supabase.com and sign in to your project
2. Click **SQL Editor** in the left sidebar
3. Paste and run this query to create the events table:

```sql
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  description TEXT,
  meet_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON events
  FOR ALL USING (true) WITH CHECK (true);
```

---

## Deploy to Vercel

1. Go to https://vercel.com and sign up (free) with Google
2. Click **Add New → Project**
3. Click **"Import from your computer"** or drag this entire folder
4. Leave all settings as default
5. Click **Deploy**
6. You'll get a URL like `https://missionmarketech-events.vercel.app`

### Optional: Connect your domain (events.missionmarke.tech)

After deploying to Vercel:
1. In Vercel dashboard → your project → **Settings → Domains**
2. Add `events.missionmarke.tech`
3. Vercel will show you a CNAME record to add
4. Log in to wherever you registered missionmarke.tech
5. Add that CNAME record to your DNS settings
6. Wait 5–10 minutes — done!

---

## How to Use

- Visit your app URL (only you need this link)
- Fill in event details and click **Generate Event Link**
- Copy the shareable link and paste it into emails, Mailchimp, wherever
- Attendees land on a clean page and click whichever calendar they use

---

## Tech Stack
- Next.js 14 (React)
- Supabase (database)
- No external dependencies for the calendar logic — pure URL generation
