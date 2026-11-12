// What the screen renderer needs from the app itself, read straight from the
// casita-react-native repo (default ../../casita-react-native, or CASITA_APP):
// the theme colours, the translations and the Hugeicons the screens use.
// The renderer (screens.html) draws the app's screens from the app's own
// components' styles; nothing here is copied by hand.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const APP = path.resolve(process.env.CASITA_APP ?? path.join(HERE, "../../casita-react-native"));

if (!fs.existsSync(path.join(APP, "src/theme/constants/color-tokens.ts"))) {
  throw new Error(`Tivren Budget app not found at ${APP} (set CASITA_APP)`);
}

// The Hugeicons each screen draws (same names as in the app's code).
const ICONS = [
  "Add01Icon", "Alert02Icon", "ArrowRight01Icon", "BabyBottleIcon", "Calendar03Icon", "Cancel01Icon",
  "Car01Icon", "Car03Icon", "ChartLineData01Icon", "CrownIcon", "ElectricHome01Icon", "Film01Icon",
  "Home01Icon", "InformationCircleIcon", "Layers01Icon", "LockKeyholeIcon", "Logout01Icon",
  "MedicineBottle01Icon", "MinusSignIcon", "MoneyReceive01Icon", "Notification01Icon", "PiggyBankIcon",
  "PlaneTakeoffIcon", "RepeatIcon", "Restaurant01Icon", "Settings01Icon", "Shield01Icon",
  "ShoppingCart01Icon", "UserGroupIcon", "Wallet01Icon", "Wallet02Icon", "Sun03Icon", "Moon02Icon",
  "SmartPhone01Icon", "Bus01Icon", "Coffee01Icon", "Login03Icon", "Sun01Icon", "PencilEdit02Icon", "ArrowDown01Icon",
];

const NAMESPACES = ["common", "home", "insights", "plan", "settings", "categories", "income", "vaults", "spendings", "household"];

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

export const loadAppData = async () => {
  // Node runs the app's .ts token file directly (type stripping).
  const { colorTokens } = await import(pathToFileURL(path.join(APP, "src/theme/constants/color-tokens.ts")).href);

  const icons = {};
  for (const name of ICONS) {
    const file = path.join(APP, "node_modules/@hugeicons/core-free-icons/dist/esm", `${name}.js`);
    icons[name] = (await import(pathToFileURL(file).href)).default;
  }

  const locales = {};
  for (const lang of ["en", "ro"]) {
    locales[lang] = Object.fromEntries(
      NAMESPACES.map((ns) => [ns, readJson(path.join(APP, "src/i18n/locales", lang, `${ns}.json`))]),
    );
  }

  return { colors: colorTokens, icons, locales };
};

/** The app's fonts, for @font-face in the renderer (file URLs). */
export const fontUrls = () => {
  const f = (pkg, dir, file) => pathToFileURL(path.join(APP, "node_modules/@expo-google-fonts", pkg, dir, file)).href;
  return {
    "Inter-400": f("inter", "400Regular", "Inter_400Regular.ttf"),
    "Inter-500": f("inter", "500Medium", "Inter_500Medium.ttf"),
    "Inter-600": f("inter", "600SemiBold", "Inter_600SemiBold.ttf"),
    "Inter-700": f("inter", "700Bold", "Inter_700Bold.ttf"),
    "Jakarta-600": f("plus-jakarta-sans", "600SemiBold", "PlusJakartaSans_600SemiBold.ttf"),
    "Jakarta-700": f("plus-jakarta-sans", "700Bold", "PlusJakartaSans_700Bold.ttf"),
    "Jakarta-800": f("plus-jakarta-sans", "800ExtraBold", "PlusJakartaSans_800ExtraBold.ttf"),
  };
};
