# Swetha & Shivaanandha — local website repository

The complete editable wedding website source is in this repository. It runs on your computer without a Sites account, Cloudflare account, API key or cloud deployment. The existing hosted publication is separate from this local copy.

## Run locally

Install Node.js 22.13 or newer. Open a terminal in this folder, then run:

```powershell
npm ci
npm run dev
```

Open **http://localhost:5173**. Stop the server with Ctrl+C.

The development command automatically creates the local RSVP database. Responses stay on this computer in `.wrangler/state/`, which Git ignores. The setup can run repeatedly without deleting existing responses. This local database does not contain responses from the hosted website.

## Other commands

```powershell
npm run build       # Build the application
npm start           # Serve the built application locally
npm run lint        # Check source code
npm run db:setup    # Create the local RSVP table independently
```

## Edit the website

- `app/page.tsx`: hero, names, language switch and navigation.
- `components/celebration.tsx`: story, events, countdown, venues, gallery and RSVP form.
- `app/globals.css`: typography, colours, layouts and animations.
- `public/images/`: website artwork and photos.
- `public/wedding.ics`: downloadable calendar events.
- `app/api/rsvp/route.ts`: validated RSVP submission endpoint.
- `db/`: RSVP schema and database operations.

The frontend uses React with Vinext/Vite. The RSVP backend uses Cloudflare's local D1 emulator. The original hosting configuration and supporting framework files remain available in the code, but local development does not publish anything.

## Wedding details

- Engagement: 12 November 2026, 6:30–8:00 PM IST, M.P. Mahal, Karuppayurani, Madurai.
- Wedding: 13 November 2026, 9:00–10:20 AM IST, the same venue.
- Reception: 15 November 2026, 10:30 AM onwards, Crystal Convention Centre, Panjappur, Trichy.

The website includes English and Tamil, responsive layouts, accessible gallery controls, reduced-motion support and a live countdown. Language changes preserve form values. RSVP submission saves attendance; it does not send email or SMS.

The website currently uses the original watercolor artwork. The separately enhanced couple portrait is in the sibling `../photo-edits/` folder. See `ARTWORK.md` for artwork details.

## Keep or share the code

This folder is a Git repository. The sibling `wedding-source.zip` contains the tracked source and website assets, excluding installed dependencies, build output, local RSVP data and runtime caches. After extracting it, run the same installation and development commands above. To preserve Git history, keep this repository folder or clone it locally.
