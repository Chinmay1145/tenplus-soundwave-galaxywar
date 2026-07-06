// Brand logos with layered fallback so a mark ALWAYS renders:
//   1. Explicit override URL     — hand-picked, highest quality (Wikipedia SVG etc.).
//   2. simple-icons CDN          — clean monochrome SVG marks, extremely reliable.
//   3. Clearbit logo API         — colour marks for real company domains.
//   4. Google favicon            — last-resort raster.
//   5. Inline SVG letter avatar  — never 404s.
//
// The consumer (<img onError>) walks the list, so every brand renders
// something recognisable — and callers can also pass a direct `url` prop
// to bypass the chain entirely.

/** Hand-curated override URLs. Add any URL here (or pass one via <BrandImage url="…" />). */
const OVERRIDES: Record<string, string> = {
  Apple: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZSt52hUSVHlor7fe9QDeZJt6KVxfyV_nTIwe15ljS3V5UbK_LhAAzPsA&s=10",
  Sony: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
  Bose: "https://media.designrush.com/inspirations/129781/conversions/_1529420017_491_Bose-Logo-Design-preview.jpg",
  Sennheiser: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAdnS4LpVrHr9XMpIsCi3lkEGZLcRSdiBIueBAQBs8Tg&s=10",
  JBL: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Logo_of_JBL.svg/3840px-Logo_of_JBL.svg.png",
  Beats: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS6h6m3ro_W__LIgZj0CaeSkZYHQ0rWl3ZUEcRpGn9Gg&s=10",
  Nothing: "https://cdn.nothing.community/2025-12-14/1765733320-179713-nothing-01.jpg",
  Samsung: "https://images.samsung.com/is/image/samsung/assets/in/about-us/brand/logo/mo/256_144_2.png?$512_N_PNG$",
  OnePlus: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMuazVcKOFwv5czfx4XaSPfc18cxIyqS3KiV8lTdjh8A&s=10",
  Marshall: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrW1wWX6wvNuiCYy4_-KoY3AKTvfU71NFWWuw-hl8WqA&s=10",
  Razer: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ44iqR7BdFYA8zcn8dpriS0wF8WJAeTmgzWqWdL68g2A&s=10",
  Logitech: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2xOCyWHjQvYKpGTs6dPI6CUNSgLnN4GVr9w40vDshWoLYl1n97hOsBec&s=10",
  Xiaomi: "https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg",
  Google: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  Huawei: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-KRYegXRYwWdQ00vYiazZbCnEHXlcsUESMDey_RX9Z5BGHa_ut8cVZkI&s=10",
  Skullcandy: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzPWE8I0Eyag7FF6hFDDT45p3l21ik5LHskt4XEAycZKEM6w_mscxxKEs&s=10",
  Jabra: "https://images.seeklogo.com/logo-png/44/2/jabra-headsets-logo-png_seeklogo-442434.png",
  Soundcore: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWMvf-_LQ5rkl1L_pha52mtff6xclUnClI-pSi7YZ6l-SppVCm5nYIAzsj&s=10", 
  Realme: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUj2I1m-JizO-6nyVoHUsn73AQg0TU1q2SLV5B9OUmWbkbGlotiUW1B-U&s=10",
  Audeze: "https://pbs.twimg.com/profile_images/1930721018492198913/zsebxvXg_400x400.png",
  AKG: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTjlmHEVgJkAg_CNUtb6zTjHRGCV8n8_PyxDKfffK2NXKzvwr54",
  Shure: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuUeAooKyU4au0srI1M-HZ8DzDP5AECH-jnE4tlTOomu0X7uAFX_PxlyRR&s=10",
  Bang: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ5n188v0NWOkuxYcZ64QN74Z_fCW8ZdpDQSvSl-CY8m765jfYjTPOehct&s=10",
  "Bang & Olufsen": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Bang_%26_Olufsen_logo.svg",
  Boat: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuEQPTC85W_yZtsgIfWZpU0ifVd5VkfedIoGSwb-Cc4iomPoQEUsBEaNk&s=10",
};

const DOMAINS: Record<string, string> = {
  Apple: "apple.com", Sony: "sony.com", Bose: "bose.com", Sennheiser: "sennheiser.com",
  JBL: "jbl.com", Beats: "beatsbydre.com", Nothing: "nothing.tech", Samsung: "samsung.com",
  OnePlus: "oneplus.com", Realme: "realme.com", Jabra: "jabra.com", Skullcandy: "skullcandy.com",
  Soundcore: "soundcore.com", Marshall: "marshallheadphones.com", Audeze: "audeze.com",
  Shure: "shure.com", AKG: "akg.com", HyperX: "hyperx.com", Razer: "razer.com",
  Logitech: "logitech.com", Bang: "bang-olufsen.com", "Bang & Olufsen": "bang-olufsen.com",
  Boat: "boat-lifestyle.com", Xiaomi: "mi.com", Huawei: "huawei.com", Google: "google.com",
};

const SI_SLUGS: Record<string, string> = {
  Apple: "apple", Sony: "sony", Bose: "bose", Sennheiser: "sennheiser",
  JBL: "jbl", Beats: "beats", Nothing: "nothing", Samsung: "samsung",
  OnePlus: "oneplus", Razer: "razer", Logitech: "logitech", HyperX: "hyperx",
  Xiaomi: "xiaomi", Huawei: "huawei", Google: "google", Marshall: "marshall",
  Shure: "shure", Jabra: "jabra", Skullcandy: "skullcandy",
  Realme: "realme", Soundcore: "anker", Audeze: "audeze",
};

function letterAvatar(brand: string, tint = "#111"): string {
  const letter = (brand || "?").charAt(0).toUpperCase();
  const safeTint = tint.replace("#", "%23");
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>` +
    `<rect width='40' height='40' rx='10' fill='${safeTint}'/>` +
    `<text x='50%25' y='55%25' text-anchor='middle' dominant-baseline='middle' ` +
    `font-family='Inter,sans-serif' font-size='20' font-weight='800' fill='%23fff'>` +
    `${letter}</text></svg>`;
  return `data:image/svg+xml;utf8,${svg}`;
}

/** Primary logo URL for a brand (override → simple-icons → clearbit → avatar). */
export function brandLogo(brand: string, size = 128): string {
  if (OVERRIDES[brand]) return OVERRIDES[brand];
  const slug = SI_SLUGS[brand];
  if (slug) return `https://cdn.simpleicons.org/${slug}`;
  const domain = DOMAINS[brand];
  if (domain) return `https://logo.clearbit.com/${domain}?size=${size}`;
  return letterAvatar(brand);
}

/** Ordered fallback chain for use with <img onError>. */
export function brandLogoSources(brand: string, size = 128): string[] {
  const list: string[] = [];
  if (OVERRIDES[brand]) list.push(OVERRIDES[brand]);
  const slug = SI_SLUGS[brand];
  if (slug) list.push(`https://cdn.simpleicons.org/${slug}`);
  const domain = DOMAINS[brand];
  if (domain) {
    list.push(`https://logo.clearbit.com/${domain}?size=${size}`);
    list.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`);
  }
  list.push(letterAvatar(brand));
  return list;
}

export function brandSlug(brand: string): string | undefined {
  return SI_SLUGS[brand];
}
