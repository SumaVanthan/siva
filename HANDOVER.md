# Wedding website — handover

## Start on this Windows computer

The project is installed locally. Double-click **START-WEDDING.cmd**. It opens the website at **http://127.0.0.1:5173/**. Keep the terminal window open while using it; press **Ctrl+C** to stop the server. If it is already running from this folder, the launcher reuses it.

## Move to another computer

1. Extract `wedding-handover.zip` into a normal writable folder.
2. Install Node.js **22.13 or newer**, including npm. Reopen your terminal after installation.
3. Double-click **SETUP.cmd**. The first setup needs internet to install the locked dependencies.
4. Double-click **START-WEDDING.cmd**.

Alternatively, on Windows, macOS or Linux, open a terminal in the extracted folder and run:

```sh
npm ci
npm run dev
```

No hosting account, API key or database login is required. The server listens on this computer's loopback address. Google Fonts and map links use the internet.

## Files to edit

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Main invitation, names, hero, language switch and navigation |
| `components/celebration.tsx` | Couple, story, events, countdown, venues, gallery and RSVP |
| `app/globals.css` | Colours, typography, spacing and responsive layouts |
| `public/images/` | Artwork currently displayed by the website |
| `public/wedding.ics` | Downloadable event calendar |
| `handover-assets/couple-portrait.png` | Enhanced portrait supplied separately for future use |
| `app/api/rsvp/route.ts` | RSVP validation and saving |
| `db/local-schema.sql` | Local RSVP table setup |

English and Tamil copy are both present in the components. Update both when changing text. The enhanced portrait is included as a handover asset; the current page still uses its original artwork.

## RSVP data

Local responses are saved under `.wrangler/state/`. This folder is private to the local computer and excluded from the source ZIP and Git. To transfer existing local responses, stop the server and copy the entire `.wrangler/state/` folder separately to the same location on the recipient's computer. Setup preserves existing responses. Cloud-hosted responses are a separate database and are not downloaded by this handover.

## Developer checks

```sh
npm run lint
npx tsc --noEmit
npm run build
```

`npm start` serves the built application locally through Wrangler, usually at `http://127.0.0.1:8787/`; use the URL printed in its terminal.

## Troubleshooting

- **Node is missing or too old:** install a supported Node.js version and reopen the launcher.
- **Dependency installation failed:** check internet access and retry `SETUP.cmd`. Keep the error message if help is needed.
- **Port 5173 is busy:** close the other application using it. The launcher will not stop unrelated processes.
- **RSVP cannot save:** run `npm run db:setup`, then restart the website.

The handover ZIP contains source code, the dependency lockfile, website assets, the enhanced portrait and these launchers. It excludes installed packages, generated builds, local responses and tool caches. Keep the original `wedding` folder to retain its Git history.
