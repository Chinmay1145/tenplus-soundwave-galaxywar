import hero from "@/assets/hero-earbuds.jpg";
import white from "@/assets/product-white.jpg";
import silver from "@/assets/product-silver.jpg";
import neckband from "@/assets/product-neckband.jpg";
import black from "@/assets/product-black.jpg";
import rose from "@/assets/product-rose.jpg";
import gamingImg from "@/assets/product-gaming.jpg";
import headphones from "@/assets/product-headphones.jpg";
import sport from "@/assets/product-sport.jpg";
import openImg from "@/assets/product-open.jpg";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  colors: { name: string; hex: string }[];
  badges?: string[];
  inStock: boolean;
  tagline: string;
  description: string;
  specs: Record<string, string>;
  features: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
};

export const CATEGORIES = [
  { slug: "tws", name: "True Wireless", icon: "Headphones" },
  { slug: "anc", name: "Premium ANC", icon: "Waves" },
  { slug: "gaming", name: "Gaming", icon: "Gamepad2" },
  { slug: "sports", name: "Sports", icon: "Activity" },
  { slug: "business", name: "Business", icon: "Briefcase" },
  { slug: "luxury", name: "Luxury", icon: "Crown" },
  { slug: "wired", name: "Wired", icon: "Cable" },
  { slug: "neckband", name: "Neckband", icon: "Disc" },
  { slug: "open-ear", name: "Open-Ear", icon: "Ear" },
  { slug: "studio", name: "Studio", icon: "Mic2" },
  { slug: "kids", name: "Kids", icon: "Baby" },
  { slug: "flagship", name: "Flagship", icon: "Sparkles" },
];

export const BRANDS = [
  "Apple", "Sony", "Bose", "Sennheiser", "JBL", "Beats", "Nothing",
  "Samsung", "OnePlus", "Realme", "Jabra", "Skullcandy", "Soundcore", "Marshall",
];

// ─── Rich, category-specific image pools (Unsplash editorial product shots) ───
// Each URL is a stable Unsplash photo id served via their CDN with sensible
// crop/quality params. Local bundled assets are kept as safe fallbacks and
// blended into rotations for extra variety.
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const POOL: Record<string, string[]> = {
  tws: [
    U("1590658268037-6bf12165a8df"),
    U("1606220588913-b3aacb4d2f46"),
    U("1631867675167-90a456a90863"),
    U("1572569511254-d8f925fe2cbb"),
    U("1608156639585-b3a032ef9689"),
    U("1655720845476-b6cba1c8e97e"),
  ],
  anc: [
    U("1583394838336-acd977736f90"),
    U("1545127398-14699f92334b"),
    U("1618366712010-f4ae9c647dcb"),
    U("1546435770-a3e426bf472b"),
    U("1487215078519-e21cc028cb29"),
  ],
  studio: [
    U("1524678606370-a47ad25cb82a"),
    U("1505740420928-5e560c06d30e"),
    U("1558537348-c0f8e733989d"),
    U("1546435770-a3e426bf472b"),
  ],
  gaming: [
    U("1591105327764-4d42fac00f7d"),
    U("1612444530582-fc66183b16f8"),
    U("1618478594486-c65b899c4936"),
    U("1629429407756-446d24da3d3f"),
  ],
  sports: [
    U("1608043152269-423dbba4e7e1"),
    U("1613040809024-b4ef7ba99bc3"),
    U("1590658268037-6bf12165a8df"),
  ],
  neckband: [
    U("1610438235354-a6ae5528385c"),
    U("1608043152269-423dbba4e7e1"),
  ],
  "open-ear": [
    U("1558756520-22cfe5d382ca"),
    U("1484704849700-f032a568e944"),
  ],
  wired: [
    U("1484704849700-f032a568e944"),
    U("1524678606370-a47ad25cb82a"),
  ],
  business: [
    U("1546435770-a3e426bf472b"),
    U("1618366712010-f4ae9c647dcb"),
    U("1487215078519-e21cc028cb29"),
  ],
  luxury: [
    U("1524678606370-a47ad25cb82a"),
    U("1583394838336-acd977736f90"),
    U("1546435770-a3e426bf472b"),
    U("1618366712010-f4ae9c647dcb"),
  ],
  flagship: [
    U("1590658268037-6bf12165a8df"),
    U("1608156639585-b3a032ef9689"),
    U("1583394838336-acd977736f90"),
  ],
  kids: [
    U("1655720845476-b6cba1c8e97e"),
    U("1618366712010-f4ae9c647dcb"),
  ],
};

// Brand-accent shots so each product gets a distinct hero, even inside a shared category.
const BRAND_ACCENT: Record<string, string> = {
  Apple: U("1600294037681-c80b4cb5b434"),
  Sony: U("1545127398-14699f92334b"),
  Bose: U("1546435770-a3e426bf472b"),
  Sennheiser: U("1618366712010-f4ae9c647dcb"),
  JBL: U("1583394838336-acd977736f90"),
  Beats: U("1558537348-c0f8e733989d"),
  Nothing: U("1631867675167-90a456a90863"),
  Samsung: U("1606220588913-b3aacb4d2f46"),
  OnePlus: U("1608156639585-b3a032ef9689"),
  Realme: U("1655720845476-b6cba1c8e97e"),
  Jabra: U("1487215078519-e21cc028cb29"),
  Skullcandy: U("1591105327764-4d42fac00f7d"),
  Soundcore: U("1572569511254-d8f925fe2cbb"),
  Marshall: U("1524678606370-a47ad25cb82a"),
  Shure: U("1505740420928-5e560c06d30e"),
  AKG: U("1546435770-a3e426bf472b"),
  Audeze: U("1583394838336-acd977736f90"),
  HyperX: U("1612444530582-fc66183b16f8"),
  Razer: U("1591105327764-4d42fac00f7d"),
  Logitech: U("1618478594486-c65b899c4936"),
  Bang: U("1524678606370-a47ad25cb82a"),
  Boat: U("1608043152269-423dbba4e7e1"),
  Xiaomi: U("1606220588913-b3aacb4d2f46"),
  Huawei: U("1590658268037-6bf12165a8df"),
  Google: U("1631867675167-90a456a90863"),
};

// Local bundled assets — used as final rotation frame so images always resolve
// even when the CDN is unreachable.
const LOCAL = [hero, white, silver, neckband, black, rose, gamingImg, headphones, sport, openImg];

function poolFor(category: string): string[] {
  return POOL[category] ?? POOL.tws;
}

function primary(category: string, brand: string, i: number): string {
  const pool = poolFor(category);
  return BRAND_ACCENT[brand] ?? pool[i % pool.length];
}

function rotationFor(category: string, brand: string, i: number): string[] {
  const pool = poolFor(category);
  const accent = BRAND_ACCENT[brand] ?? pool[(i + 1) % pool.length];
  const a = pool[i % pool.length];
  const b = pool[(i + 2) % pool.length];
  const local = LOCAL[i % LOCAL.length];
  return [accent, a, b, local];
}

function p(
  id: string,
  name: string,
  brand: string,
  category: string,
  price: number,
  mrp: number,
  tagline: string,
  i: number,
  extra: Partial<Product> = {},
): Product {
  return {
    id,
    name,
    brand,
    category,
    price,
    mrp,
    rating: 4.2 + ((i * 7) % 8) / 10,
    reviews: 120 + ((i * 113) % 4800),
    image: img(i),
    gallery: rotation(i),
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "White", hex: "#f5f5f5" },
      { name: "Red", hex: "#ff3b30" },
    ],
    inStock: i % 9 !== 0,
    tagline,
    description:
      "Engineered for true audio purists. Custom-tuned drivers, hybrid adaptive noise cancellation, and a seamless multi-device experience inside a precision-machined chassis.",
    specs: {
      Bluetooth: "5.3",
      Driver: "11mm Dynamic",
      "Frequency Response": "20Hz – 40kHz",
      ANC: "Hybrid Adaptive (-45dB)",
      Codec: "LDAC, AAC, SBC",
      "Battery (Earbud)": "8h",
      "Battery (Case)": "32h total",
      Charging: "USB-C + Wireless",
      "Water Resistance": "IPX5",
      Microphones: "6 mics + ENC",
      Latency: "55ms Game Mode",
      Weight: "5.1g each",
      Warranty: "1 Year",
    },
    features: [
      "Active Noise Cancellation",
      "Spatial Audio",
      "Multipoint Pairing",
      "Touch Controls",
      "Wireless Charging",
      "In-Ear Detection",
    ],
    ...extra,
  };
}

export const PRODUCTS: Product[] = [
  p("aurora-pro", "Aurora Pro", "Nothing", "tws", 14999, 19999, "Transparent design. Studio sound.", 0, { isBestSeller: true, badges: ["Editor's Pick"] }),
  p("airwave-3", "AirWave 3", "Apple", "luxury", 24900, 26900, "Spatial audio, redefined.", 1, { badges: ["New Launch"], isNew: true }),
  p("wf-1000xm6", "WF-1000XM6", "Sony", "anc", 23990, 27990, "Industry-leading noise cancellation.", 2, { isBestSeller: true }),
  p("qc-ultra", "QuietComfort Ultra", "Bose", "anc", 25900, 29900, "Immersive silence. Endless sound.", 3, { badges: ["Premium"] }),
  p("momentum-4", "Momentum True Wireless 4", "Sennheiser", "studio", 21990, 24990, "Audiophile grade. Wireless freedom.", 0),
  p("flip-buds", "Tune Flex Pro", "JBL", "tws", 6999, 8999, "Big bass. Bold design.", 1, { isNew: true }),
  p("studio-buds-plus", "Studio Buds+", "Beats", "sports", 18900, 19900, "Powerful, durable, your beat.", 2),
  p("buds-3-pro", "Galaxy Buds 3 Pro", "Samsung", "flagship", 19990, 23990, "Crystal-clear AI calls.", 3, { badges: ["AI"] }),
  p("buds-pro-3", "OnePlus Buds Pro 3", "OnePlus", "anc", 11999, 13999, "Co-engineered with Dynaudio.", 0),
  p("nord-buds", "Realme Buds Air 7", "Realme", "tws", 3499, 4499, "Beat the silence.", 1),
  p("elite-10", "Elite 10", "Jabra", "business", 22999, 26999, "All-day comfort. Crystal calls.", 2, { badges: ["Best Seller"] }),
  p("crusher", "Crusher ANC 2", "Skullcandy", "sports", 12990, 15990, "Sensory bass technology.", 3),
  p("liberty-5", "Liberty 5 Pro", "Soundcore", "tws", 8999, 11999, "Hi-res certified. ACAA 3.0.", 0),
  p("major-v", "Major V Wireless", "Marshall", "luxury", 16999, 19999, "Rock-and-roll, untethered.", 1, { badges: ["Limited Edition"] }),
  p("neck-bass", "BassFlex Neckband 200", "JBL", "neckband", 1999, 2999, "30hr playback. Magnetic earbuds.", 2),
  p("gamebuds-x", "GameBuds X", "Nothing", "gaming", 5999, 7999, "55ms latency. RGB ready.", 3, { isNew: true, badges: ["Low Latency"] }),
];

// ─── 54 additional products to reach a 70-product catalog ───────────────────
type Seed = [string, string, string, string, number, number, string, Partial<Product>?];

const EXTRA: Seed[] = [
  ["airwave-2", "AirWave 2", "Apple", "tws", 18900, 21900, "The everyday AirWave."],
  ["airwave-max", "AirWave Max Over-Ear", "Apple", "luxury", 59900, 62900, "Computational audio. Over-ear."],
  ["wf-1000xm5", "WF-1000XM5", "Sony", "anc", 19990, 22990, "Iconic noise cancellation."],
  ["linkbuds-open", "LinkBuds Open", "Sony", "open-ear", 17990, 19990, "Hear it all. Stream it all."],
  ["ult-wear", "ULT Wear", "Sony", "studio", 22999, 27999, "Massive ULT bass."],
  ["qc-earbuds-2", "QuietComfort Earbuds II", "Bose", "anc", 22900, 26900, "CustomTune your silence."],
  ["soundlink-mini", "SoundLink Mini Buds", "Bose", "tws", 9999, 12999, "Tiny case. Big Bose sound."],
  ["momentum-3-overear", "Momentum 4 Over-Ear", "Sennheiser", "studio", 31990, 36990, "60 hours of audiophile bliss."],
  ["accentum-plus", "Accentum Plus", "Sennheiser", "anc", 17990, 21990, "Hybrid ANC for the long haul."],
  ["live-pro-3", "Live Pro 3 TWS", "JBL", "tws", 9999, 12999, "Hi-res. Spatial 360."],
  ["tour-one-m3", "Tour One M3", "JBL", "anc", 18999, 22999, "Smart Tx with the case."],
  ["studio-pro", "Studio Pro Over-Ear", "Beats", "studio", 32900, 36900, "Powerful sound. 40hr battery."],
  ["fit-pro-2", "Fit Pro 2", "Beats", "sports", 14900, 17900, "Secure-fit wingtips."],
  ["solo-4", "Solo 4 Wireless", "Beats", "luxury", 22900, 24900, "On-ear icon, reimagined."],
  ["ear-2", "Ear (2)", "Nothing", "tws", 12999, 14999, "Transparent. Personal."],
  ["ear-stick", "Ear (stick)", "Nothing", "tws", 8499, 9999, "Designed to disappear."],
  ["cmf-buds-pro-2", "CMF Buds Pro 2", "Nothing", "anc", 4499, 5499, "Smart Dial. Big bass."],
  ["buds-3-fe", "Galaxy Buds 3 FE", "Samsung", "tws", 9999, 12999, "AI for everyone."],
  ["buds-2-pro", "Galaxy Buds 2 Pro", "Samsung", "anc", 15990, 18990, "24-bit Hi-Fi."],
  ["nord-buds-3-pro", "Nord Buds 3 Pro", "OnePlus", "tws", 3999, 4999, "Glass-finish, AI noise reduction."],
  ["buds-3", "OnePlus Buds 3", "OnePlus", "tws", 5499, 6999, "Dual drivers. Spatial audio."],
  ["narzo-buds", "Narzo Buds N1", "Realme", "tws", 1499, 1999, "Bass boost, daily driver."],
  ["buds-air-6", "Buds Air 6 Pro", "Realme", "anc", 4999, 6999, "50dB hybrid ANC."],
  ["elite-8-active", "Elite 8 Active", "Jabra", "sports", 18999, 22999, "Military-grade durability."],
  ["evolve2-75", "Evolve2 75", "Jabra", "business", 33999, 39999, "Office and commute, sorted."],
  ["crusher-evo", "Crusher Evo", "Skullcandy", "studio", 14990, 17990, "Personal sound, sensory bass."],
  ["indy-anc", "Indy ANC", "Skullcandy", "tws", 6990, 8990, "Skull-iQ smart features."],
  ["space-q45", "Space Q45", "Soundcore", "anc", 11999, 14999, "50hr ANC giant."],
  ["liberty-4-nc", "Liberty 4 NC", "Soundcore", "anc", 7999, 9999, "Adaptive ANC 2.0."],
  ["sport-x10", "Sport X10", "Soundcore", "sports", 5999, 7999, "Rotatable ear hooks."],
  ["motif-anc", "Motif ANC", "Marshall", "anc", 17999, 19999, "Tactile rock heritage."],
  ["minor-iv", "Minor IV", "Marshall", "tws", 11999, 13999, "30hr. Rock-star sound."],
  ["wave-300", "Wave Beam 300", "JBL", "neckband", 2499, 3499, "32hr neckband fun."],
  ["c100si", "C100SI Wired", "JBL", "wired", 499, 999, "The everyday wired pair."],
  ["se215", "SE215 Pro Wired", "Shure", "studio", 8999, 11999, "Reference monitoring."],
  ["aonic-50", "AONIC 50 Gen 2", "Shure", "studio", 36999, 42999, "Studio-grade, wireless."],
  ["k371", "K371 Studio", "AKG", "studio", 8990, 10990, "Closed-back reference."],
  ["y50bt", "Y50BT On-Ear", "AKG", "luxury", 12999, 14999, "Iconic foldable on-ear."],
  ["lcd-i4", "LCD-i4 IEM", "Audeze", "luxury", 149900, 169900, "Planar magnetic in-ear flagship."],
  ["maxwell", "Maxwell Gaming", "Audeze", "gaming", 32990, 36990, "Planar gaming over-ear."],
  ["cloud-ii", "Cloud II Wireless", "HyperX", "gaming", 8999, 11999, "30hr stamina, DTS spatial."],
  ["cloud-buds-2", "Cloud Buds II", "HyperX", "gaming", 4999, 6999, "Low-latency TWS for play."],
  ["barracuda-pro", "Barracuda Pro", "Razer", "gaming", 19999, 22999, "THX spatial. Hybrid ANC."],
  ["hammerhead-pro", "Hammerhead HyperSpeed", "Razer", "gaming", 12999, 14999, "Tri-mode wireless."],
  ["zone-vibe-100", "Zone Vibe 100", "Logitech", "business", 11999, 13999, "Light, soft, every-day calls."],
  ["g-pro-x2", "G Pro X2 Lightspeed", "Logitech", "gaming", 27999, 31999, "Pro-grade graphene drivers."],
  ["bo-h95", "Beoplay H95", "Bang", "luxury", 89900, 99900, "Anniversary craftsmanship."],
  ["bo-ex", "Beoplay EX", "Bang", "luxury", 39900, 44900, "Cast aluminium TWS."],
  ["airdopes-pro", "Airdopes 458 Pro", "Boat", "tws", 1799, 3499, "ENx™ tech, 50hr."],
  ["rockerz-550", "Rockerz 550", "Boat", "studio", 1999, 4499, "20hr playback, bold."],
  ["redmi-buds-5-pro", "Redmi Buds 5 Pro", "Xiaomi", "anc", 4999, 6999, "Dual driver hi-res."],
  ["mi-true-wireless-3", "Mi True Wireless 3", "Xiaomi", "tws", 3499, 4499, "Lightweight every-day TWS."],
  ["freebuds-pro-4", "FreeBuds Pro 4", "Huawei", "flagship", 17999, 21999, "Triple driver, dynamic ANC."],
  ["pixel-buds-pro-2", "Pixel Buds Pro 2", "Google", "anc", 22900, 25900, "Tensor A1 silicon. AI translation."],
];

EXTRA.forEach((s, idx) => {
  const [id, name, brand, category, price, mrp, tagline, extra] = s;
  PRODUCTS.push(p(id, name, brand, category, price, mrp, tagline, 4 + idx, extra));
});

export const ALL_BRANDS = Array.from(new Set(PRODUCTS.map((x) => x.brand)));

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
