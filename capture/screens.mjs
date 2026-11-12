// Renders Tivren Budget's screens (screens.html, drawn from the app's own styles,
// colours, translations and icons) to raw/<lang>/<name>.png at the iPhone 17
// Pro's resolution, 1206×2622. Demo data lives in screens.html.
//   node screens.mjs [lang]     (en or ro; default en)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

import { fontUrls, loadAppData } from "./app-data.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LANG = process.argv[2] ?? "en";
const OUT = path.join(HERE, "raw", LANG);
fs.mkdirSync(OUT, { recursive: true });

// name → what to render. Signed-in screens show Ana's account.
export const SCREENS = {
  home: { screen: "home", signedIn: true },
  "home-guest": { screen: "home" },
  "home-dark": { screen: "home", signedIn: true, theme: "dark" },
  insights: { screen: "insights", signedIn: true },
  "insights-dark": { screen: "insights", signedIn: true, theme: "dark" },
  savings: { screen: "savings", signedIn: true },
  plan: { screen: "plan", signedIn: true },
  settings: { screen: "settings", signedIn: true },
  "settings-guest": { screen: "settings" },
};

const data = await loadAppData();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 402, height: 874 }, deviceScaleFactor: 3 });
await page.goto(pathToFileURL(path.join(HERE, "screens.html")).href);
await page.evaluate(([d, f]) => window.setup(d, f), [data, fontUrls()]);

// Where each tagged card sits (in 3x pixels), so slides and the promo can lift it out.
const crops = {};
const only = process.argv[3];
for (const [name, options] of Object.entries(SCREENS)) {
  if (only && name !== only) continue;
  await page.evaluate((o) => window.render(o), { lang: LANG, ...options });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(120);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  const boxes = await page.$$eval("[data-crop]", (els) => els.map((el) => {
    const r = el.getBoundingClientRect();
    return { key: el.dataset.crop, x: r.x, y: r.y, w: r.width, h: r.height, radius: parseFloat(getComputedStyle(el).borderTopLeftRadius) };
  }));
  for (const { key, ...box } of boxes) crops[`${name}.${key}`] = Object.fromEntries(Object.entries(box).map(([k, v]) => [k, Math.round(v * 3)]));
  console.log("screen", LANG, name);
}
if (!only) fs.writeFileSync(path.join(OUT, "crops.json"), JSON.stringify(crops, null, 2));
await browser.close();
