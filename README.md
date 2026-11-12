# Tivren Budget website

Presentation page for Tivren Budget, the household budgeting app for iPhone and
Android. For now it only announces the app as **coming soon**: no download or
store links anywhere. React + TypeScript + Vite + Tailwind CSS v4, hosted on
Netlify. Same setup as `tivren-timesheet-website`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run lint
```

## Deploy

Hosted on Netlify at https://tivren-budget.netlify.app. Pushing to `main` builds and publishes the
site (settings in `netlify.toml`). One-time setup in Netlify: import this repo,
and under Site configuration → Environment variables add `NODE_AUTH_TOKEN` (a
GitHub token with `read:packages`, marked secret, Builds scope) so npm can
install `@moldovanalexandruvasile/unity-marketing` from GitHub Packages.

## At launch

- Replace the "Coming soon" placeholders (`components/StoreSoon*.tsx`, the
  header's `SoonBadge`) with App Store / Google Play links.
- Fill in the placeholders in the app's legal texts (company name, CUI, address,
  emails, hosting provider), remove the draft notice there, then `npm run sync:legal`.
- Optionally swap the drawn screens for real device screenshots.

## Languages

English and Romanian, with react-i18next. Site text lives in
`src/i18n/locales/{en,ro}.json` (same keys in both). Visitors get their
browser's language (Romanian for any `ro-*`, English otherwise) until they pick
one from the RO / EN menu; that choice is remembered.

## Styling

`src/index.css` holds the theme: the app's greens (from
`casita-react-native/src/theme/constants/color-tokens.ts`) as Tailwind colours,
with dark-mode values, and Plus Jakarta Sans, the app's heading font.

## Screens, showcase slides and promo video

Everything in `public/media` (and the full-size slides in `marketing/slides`,
2880×1800) is made by `capture/`. The app isn't built for this: its screens
are **drawn from its own code**. `capture/screens.html` lays out Home,
Insights, Savings, the monthly Plan and Settings with the same spacing, radii,
fonts and colours as the app's components (`makeStyles`), and `app-data.mjs`
reads the theme colours, the EN/RO translations and the Hugeicons straight
from `../casita-react-native`. The demo data (Ana's household, in euros, or
lei for Romanian) lives at the top of `screens.html`. Screens come signed in
(Ana Popescu) and as a guest.

```bash
cd capture
npm install && npx playwright install chromium
node screens.mjs en   # app screens, 1206×2622 (iPhone 17 Pro) → raw/en/ + card positions
node slides.mjs en    # showcase slides (slides.html) → marketing/slides/en + public/media/slides
node promo.mjs en     # ~30 s promo (promo.html) → public/media/promo.mp4 + poster
```

Romanian: the same with `ro` (into `public/media/ro/`). The hero's phone shows
`raw/<lang>/home.png` and `home-dark.png` as JPEGs in `public/media/[ro/]app/`
(`sips -Z 1960 -s format jpeg`). `promo.mjs en 3 10.2` renders stills at those
seconds instead, for checking a change. The video is encoded with AVFoundation
(`encode.swift`), so it needs macOS but no ffmpeg. After a UI change in the app,
re-check `screens.html` against the changed components, then re-run all three.

## Terms and Conditions, Privacy Policy

`terms.html` and `privacy.html` show the app's own legal texts (English and
Romanian), copied from `casita-react-native/src/i18n/locales/<lang>/legal.json`
into `src/legal/` with their "last updated" date (`LEGAL_LAST_UPDATED` in the
app). After changing them in the app, run `npm run sync:legal` here and commit.
The draft notice shows on the site as long as the app has one (`draftNotice`).

## SEO

- **Site address:** `VITE_SITE_URL` in `.env` (with the trailing `/`) is used for the
  canonical links, social card, structured data and sitemap. Change it there if
  the site moves to a custom domain.
- **Pre-rendered HTML:** `npm run build` ends with `scripts/prerender.mjs`, which
  renders each page in English (`src/prerender.tsx`) into its `<div id="root">`,
  so search engines and link previews see the real content. In the browser,
  `src/mount.tsx` takes over that HTML for English visitors and re-renders it
  for Romanian ones.
- **Head tags** (`index.html`): description, canonical, Open Graph and Twitter
  cards, and JSON-LD (`WebSite` + `MobileApplication`).
- **Social card:** `public/og-image.jpg` (1200×630), made by `capture/og.mjs`
  from `og.html` and the real home screen (`node screens.mjs en` first).
- **robots.txt and sitemap.xml** are written into `dist/` at build time. While
  the legal texts are drafts, `privacy.html` and `terms.html` carry
  `noindex` and stay out of the sitemap; remove that tag once they're final.
- The site is at its domain's root, so crawlers read `robots.txt` and find the
  sitemap from it. Submitting `sitemap.xml` in Google Search Console speeds that
  up (`public/google66728fbf56a6b89f.html` verifies the site there).
