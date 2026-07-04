// Brand logo SVGs via simple-icons CDN (reliable, free, no key required).
// Falls back to a colored letter avatar when the brand isn't on simple-icons.
import nothingLogo from "@/assets/brands/nothing.png.asset.json";
import realmeLogo from "@/assets/brands/realme.png.asset.json";
import jabraLogo from "@/assets/brands/jabra.png.asset.json";
import skullcandyLogo from "@/assets/brands/skullcandy.png.asset.json";
import soundcoreLogo from "@/assets/brands/soundcore.png.asset.json";
import marshallLogo from "@/assets/brands/marshall.png.asset.json";
import shureLogo from "@/assets/brands/shure.png.asset.json";
import audezeLogo from "@/assets/brands/audeze.png.asset.json";
import hyperxLogo from "@/assets/brands/hyperx.png.asset.json";
import logitechLogo from "@/assets/brands/logitech.png.asset.json";

// Official uploaded brand assets take priority over CDN.
const CUSTOM: Record<string, string> = {
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


const SLUGS: Record<string, string> = {
  Apple: "apple",
  Sony: "sony",
  Bose: "bose",
  Sennheiser: "sennheiser",
  JBL: "jbl",
  Beats: "beats",
  Nothing: "nothing",
  Samsung: "samsung",
  OnePlus: "oneplus",
  Realme: "realme",
  Jabra: "jabra",
  Skullcandy: "skullcandy",
  Soundcore: "anker",
  Marshall: "marshall",
  Audeze: "audeze",
  Shure: "shure",
  AKG: "akg",
  HyperX: "hyperx",
  Razer: "razer",
  Logitech: "logitech",
  Bang: "bangolufsen",
  Boat: "boat",
  Xiaomi: "xiaomi",
  Huawei: "huawei",
  Google: "google",
};

const HEX: Record<string, string> = {
  Apple: "000000",
  Sony: "000000",
  Bose: "000000",
  Sennheiser: "0033A0",
  JBL: "FF6600",
  Beats: "E61E26",
  Nothing: "000000",
  Samsung: "1428A0",
  OnePlus: "EB0028",
  Realme: "FFC900",
  Jabra: "FF8200",
  Skullcandy: "000000",
  Soundcore: "00AEEF",
  Marshall: "000000",
};

export function brandLogo(brand: string, size = 80): string {
  if (CUSTOM[brand]) return CUSTOM[brand];
  const slug = SLUGS[brand];
  if (slug) {
    const color = HEX[brand];
    return color
      ? `https://cdn.simpleicons.org/${slug}/${color}`
      : `https://cdn.simpleicons.org/${slug}`;
  }
  const letter = (brand || "?").charAt(0).toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' rx='8' fill='%23111'/><text x='50%25' y='55%25' text-anchor='middle' font-family='Inter,sans-serif' font-size='20' font-weight='800' fill='%23fff'>${letter}</text></svg>`;
  return `data:image/svg+xml;utf8,${svg}`;
}

export function brandSlug(brand: string): string | undefined {
  return SLUGS[brand];
}

/** Ordered list of logo URLs to try, ending with the safe data-URI fallback. */
export function brandLogoSources(brand: string, size = 256): string[] {
  const sources: string[] = [];
  if (CUSTOM[brand]) sources.push(CUSTOM[brand]);
  const slug = SLUGS[brand];

  const sources: string[] = [];
  if (slug) {
    const color = HEX[brand];
    sources.push(color ? `https://cdn.simpleicons.org/${slug}/${color}` : `https://cdn.simpleicons.org/${slug}`);
    sources.push(`https://unpkg.com/simple-icons@latest/icons/${slug}.svg`);
  }
  sources.push(brandLogo(brand, size));
  return sources;
}