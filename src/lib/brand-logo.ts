// Brand logos with multi-source fallback:
//  0. Local override    — user-supplied official artwork (highest priority).
//  1. simple-icons CDN  — clean SVG marks for popular tech brands.
//  2. Clearbit Logo API — high quality, no key, works for real company domains.
//  3. Google favicon    — last-resort raster.
//  4. SVG letter avatar — inline data-URI, never 404s.

import audezeLogo from "@/assets/brands/audeze.png.asset.json";
import hyperxLogo from "@/assets/brands/hyperx.png.asset.json";
import jabraLogo from "@/assets/brands/jabra.png.asset.json";
import logitechLogo from "@/assets/brands/logitech.png.asset.json";
import marshallLogo from "@/assets/brands/marshall.png.asset.json";
import nothingLogo from "@/assets/brands/nothing.png.asset.json";
import realmeLogo from "@/assets/brands/realme.png.asset.json";
import shureLogo from "@/assets/brands/shure.png.asset.json";
import skullcandyLogo from "@/assets/brands/skullcandy.png.asset.json";
import soundcoreLogo from "@/assets/brands/soundcore.png.asset.json";

// Official brand artwork provided by the user. Always tried first.
const BRAND_LOGO_OVERRIDES: Record<string, string> = {
  Nothing: nothingLogo.url,
  Realme: realmeLogo.url,
  Jabra: jabraLogo.url,
  Skullcandy: skullcandyLogo.url,
  Soundcore: soundcoreLogo.url,
  Marshall: marshallLogo.url,
  Shure: shureLogo.url,
  Audeze: audezeLogo.url,
  HyperX: hyperxLogo.url,
  Logitech: logitechLogo.url,
};

const DOMAINS: Record<string, string> = {
  Apple: "apple.com",
  Sony: "sony.com",
  Bose: "bose.com",
  Sennheiser: "sennheiser.com",
  JBL: "jbl.com",
  Beats: "beatsbydre.com",
  Nothing: "nothing.tech",
  Samsung: "samsung.com",
  OnePlus: "oneplus.com",
  Realme: "realme.com",
  Jabra: "jabra.com",
  Skullcandy: "skullcandy.com",
  Soundcore: "soundcore.com",
  Marshall: "marshallheadphones.com",
  Audeze: "audeze.com",
  Shure: "shure.com",
  AKG: "akg.com",
  HyperX: "hyperx.com",
  Razer: "razer.com",
  Logitech: "logitech.com",
  Bang: "bang-olufsen.com",
  "Bang & Olufsen": "bang-olufsen.com",
  Boat: "boat-lifestyle.com",
  Xiaomi: "mi.com",
  Huawei: "huawei.com",
  Google: "google.com",
};

const SI_SLUGS: Record<string, string> = {
  Apple: "apple",
  // Sony is intentionally omitted from simple-icons (retired for trademark).
  // Falls back to the Clearbit wordmark via DOMAINS below.
  Bose: "bose",
  Sennheiser: "sennheiser",
  JBL: "jbl",
  Beats: "beats",
  Nothing: "nothing",
  Samsung: "samsung",
  OnePlus: "oneplus",
  Razer: "razer",
  Logitech: "logitech",
  HyperX: "hyperx",
  Xiaomi: "xiaomi",
  Huawei: "huawei",
  Google: "google",
  Marshall: "marshall",
  AKG: "akg",
  Bang: "bandolufsen",
  "Bang & Olufsen": "bandolufsen",
};

function wordmarkAvatar(brand: string, tint = "#111"): string {
  // Elegant wordmark fallback used when no image is available.
  const safeTint = tint.replace("#", "%23");
  const label = brand.replace(/&/g, "%26").toUpperCase();
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'>` +
    `<rect width='200' height='80' rx='10' fill='%23fff'/>` +
    `<text x='50%25' y='55%25' text-anchor='middle' dominant-baseline='middle' ` +
    `font-family='Inter,Helvetica,Arial,sans-serif' font-size='26' font-weight='900' ` +
    `letter-spacing='2' fill='${safeTint}'>${label}</text></svg>`;
  return `data:image/svg+xml;utf8,${svg}`;
}

/** Primary logo URL (override first, then simple-icons, Clearbit, else avatar). */
export function brandLogo(brand: string, size = 128): string {
  const override = BRAND_LOGO_OVERRIDES[brand];
  if (override) return override;
  const slug = SI_SLUGS[brand];
  if (slug) return `https://cdn.simpleicons.org/${slug}`;
  const domain = DOMAINS[brand];
  if (domain) return `https://logo.clearbit.com/${domain}?size=${size}`;
  return wordmarkAvatar(brand);
}

/** Ordered fallback chain for use with <img onError>. */
export function brandLogoSources(brand: string, size = 128): string[] {
  const list: string[] = [];
  const override = BRAND_LOGO_OVERRIDES[brand];
  const domain = DOMAINS[brand];
  const slug = SI_SLUGS[brand];

  if (override) list.push(override);
  if (slug) {
    list.push(`https://cdn.simpleicons.org/${slug}`);
    list.push(`https://cdn.simpleicons.org/${slug}/000000`);
  }
  if (domain) {
    list.push(`https://logo.clearbit.com/${domain}?size=${size}`);
    list.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`);
  }
  list.push(wordmarkAvatar(brand));
  return list;
}

export function brandSlug(brand: string): string | undefined {
  return SI_SLUGS[brand];
}
