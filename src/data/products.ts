import hero from "@/assets/hero-earbuds.jpg";
import white from "@/assets/product-white.jpg";
import silver from "@/assets/product-silver.jpg";
import neckband from "@/assets/product-neckband.jpg";
import black from "@/assets/product-black.jpg";
import rose from "@/assets/product-rose.jpg";
import gaming from "@/assets/product-gaming.jpg";
import headphones from "@/assets/product-headphones.jpg";
import sport from "@/assets/product-sport.jpg";
import open from "@/assets/product-open.jpg";

export type Product = {
  id: number;                 // sequential numeric id (1, 2, 3, ...)
  slug: string;                // url-friendly id, auto-derived from name
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
  "Shure", "AKG", "Audeze", "HyperX", "Razer", "Logitech", "Bang", "Boat",
  "Xiaomi", "Huawei", "Google",
];

// ─── IMAGE REGISTRY ──────────────────────────────────────────────────────────
// Add new images here first (import at top, then register with a short key).
// Anything added to this map becomes usable in PRODUCT_SEEDS below via its key.
export const IMAGES: Record<string, string> = {
  hero,
  white,
  silver,
  neckband,
  black,
  rose,
  gaming,
  headphones,
  sport,
  open,
};

const IMAGE_KEYS = Object.keys(IMAGES);

/**
 * Resolve an image reference into an actual image module.
 * - number  -> cycles through IMAGE_KEYS by index (old default behavior)
 * - string  -> looked up directly in IMAGES (e.g. "gaming", "hero")
 */
function resolveImage(ref: number | string): string {
  if (typeof ref === "number") {
    return IMAGES[IMAGE_KEYS[ref % IMAGE_KEYS.length]];
  }
  if (IMAGES[ref]) return IMAGES[ref];
  console.warn(`[products] Unknown image key "${ref}", falling back to hero.`);
  return IMAGES.hero;
}

/**
 * Build a 4-frame 360° rotation gallery.
 * - If explicit imageKeys are given for a product, use those (repeating/padding as needed).
 * - Otherwise fall back to the old auto-cycling behavior based on numeric index.
 */
function buildGallery(index: number, imageKeys?: (number | string)[]): string[] {
  if (imageKeys && imageKeys.length > 0) {
    return [0, 1, 2, 3].map((k) => resolveImage(imageKeys[k % imageKeys.length]));
  }
  return [0, 1, 2, 3].map((k) => resolveImage((index + k * 3) % IMAGE_KEYS.length));
}

// ─── SEED DEFINITION ─────────────────────────────────────────────────────────
// This is the single source of truth for products. Add new products by
// appending (or inserting, by id) a ProductSeed. IDs are sequential and
// explicit, so you can insert a product "in range" by giving it the id you
// want and shifting others, or simply append at the end for auto-increment.

export type ProductSeed = {
  id: number;                       // explicit sequential id — required
  name: string;
  brand: string;
  category: string;
  price: number;
  mrp: number;
  tagline: string;
  image?: number | string;          // primary image: index into IMAGE_KEYS, or a key like "gaming"
  gallery?: (number | string)[];    // optional explicit 360° gallery (image keys or indices)
  extra?: Partial<Product>;
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildProduct(seed: ProductSeed): Product {
  const { id, name, brand, category, price, mrp, tagline, image, gallery, extra } = seed;
  const imgRef = image ?? id;

  return {
    id,
    slug: slugify(name),
    name,
    brand,
    category,
    price,
    mrp,
    rating: 4.2 + ((id * 7) % 8) / 10,
    reviews: 120 + ((id * 113) % 4800),
    image: resolveImage(imgRef),
    gallery: buildGallery(id, gallery),
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "White", hex: "#f5f5f5" },
      { name: "Red", hex: "#ff3b30" },
    ],
    inStock: id % 9 !== 0,
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

// ─── PRODUCT SEEDS (sequential, by id) ───────────────────────────────────────
// To add a product: append a new object with the next free id (or any id
// inside a gap you want to fill). To insert "in range" (e.g. between id 5
// and 6), give it a decimal-free integer id and renumber following seeds,
// or just append — order in this array does not need to match id order,
// PRODUCTS is sorted by id automatically below.

export const PRODUCT_SEEDS: ProductSeed[] = [
  { id: 1, name: "Aurora Pro", brand: "Nothing", category: "tws", price: 14999, mrp: 19999, tagline: "Transparent design. Studio sound.", image: "white", gallery: ["white", "black", "silver", "hero"], extra: { isBestSeller: true, badges: ["Editor's Pick"] } },
  { id: 2, name: "AirWave 3", brand: "Apple", category: "luxury", price: 24900, mrp: 26900, tagline: "Spatial audio, redefined.", image: "rose", gallery: ["rose", "black", "silver", "hero"], extra: { badges: ["New Launch"], isNew: true } },
  { id: 3, name: "WF-1000XM6", brand: "Sony", category: "anc", price: 23990, mrp: 27990, tagline: "Industry-leading noise cancellation.", image: "black", gallery: ["black", "hero", "silver", "white"], extra: { isBestSeller: true } },
  { id: 4, name: "QuietComfort Ultra", brand: "Bose", category: "anc", price: 25900, mrp: 29900, tagline: "Immersive silence. Endless sound.", image: "black", gallery: ["black", "hero", "silver", "white"], extra: { badges: ["Premium"] } },
  { id: 5, name: "Momentum True Wireless 4", brand: "Sennheiser", category: "studio", price: 21990, mrp: 24990, tagline: "Audiophile grade. Wireless freedom.", image: "headphones", gallery: ["headphones", "black", "silver", "hero"] },
  { id: 6, name: "Tune Flex Pro", brand: "JBL", category: "tws", price: 6999, mrp: 8999, tagline: "Big bass. Bold design.", image: "white", gallery: ["white", "black", "silver", "hero"], extra: { isNew: true } },
  { id: 7, name: "Studio Buds+", brand: "Beats", category: "sports", price: 18900, mrp: 19900, tagline: "Powerful, durable, your beat.", image: "sport", gallery: ["sport", "black", "white", "silver"] },
  { id: 8, name: "Galaxy Buds 3 Pro", brand: "Samsung", category: "flagship", price: 19990, mrp: 23990, tagline: "Crystal-clear AI calls.", image: "hero", gallery: ["hero", "black", "silver", "white"], extra: { badges: ["AI"] } },
  { id: 9, name: "OnePlus Buds Pro 3", brand: "OnePlus", category: "anc", price: 11999, mrp: 13999, tagline: "Co-engineered with Dynaudio.", image: "black", gallery: ["black", "hero", "silver", "white"] },
  { id: 10, name: "Realme Buds Air 7", brand: "Realme", category: "tws", price: 3499, mrp: 4499, tagline: "Beat the silence.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 11, name: "Elite 10", brand: "Jabra", category: "business", price: 22999, mrp: 26999, tagline: "All-day comfort. Crystal calls.", image: "headphones", gallery: ["headphones", "black", "silver", "white"], extra: { badges: ["Best Seller"] } },
  { id: 12, name: "Crusher ANC 2", brand: "Skullcandy", category: "sports", price: 12990, mrp: 15990, tagline: "Sensory bass technology.", image: "sport", gallery: ["sport", "black", "white", "silver"] },
  { id: 13, name: "Liberty 5 Pro", brand: "Soundcore", category: "tws", price: 8999, mrp: 11999, tagline: "Hi-res certified. ACAA 3.0.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 14, name: "Major V Wireless", brand: "Marshall", category: "luxury", price: 16999, mrp: 19999, tagline: "Rock-and-roll, untethered.", image: "rose", gallery: ["rose", "black", "silver", "hero"], extra: { badges: ["Limited Edition"] } },
  { id: 15, name: "BassFlex Neckband 200", brand: "JBL", category: "neckband", price: 1999, mrp: 2999, tagline: "30hr playback. Magnetic earbuds.", image: "neckband", gallery: ["neckband", "black", "silver", "white"] },
  { id: 16, name: "GameBuds X", brand: "Nothing", category: "gaming", price: 5999, mrp: 7999, tagline: "55ms latency. RGB ready.", image: "gaming", gallery: ["gaming", "black", "silver", "hero"], extra: { isNew: true, badges: ["Low Latency"] } },

  { id: 17, name: "AirWave 2", brand: "Apple", category: "tws", price: 18900, mrp: 21900, tagline: "The everyday AirWave.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 18, name: "AirWave Max Over-Ear", brand: "Apple", category: "luxury", price: 59900, mrp: 62900, tagline: "Computational audio. Over-ear.", image: "rose", gallery: ["rose", "black", "silver", "hero"] },
  { id: 19, name: "WF-1000XM5", brand: "Sony", category: "anc", price: 19990, mrp: 22990, tagline: "Iconic noise cancellation.", image: "black", gallery: ["black", "hero", "silver", "white"] },
  { id: 20, name: "LinkBuds Open", brand: "Sony", category: "open-ear", price: 17990, mrp: 19990, tagline: "Hear it all. Stream it all.", image: "open", gallery: ["open", "white", "silver", "hero"] },
  { id: 21, name: "ULT Wear", brand: "Sony", category: "studio", price: 22999, mrp: 27999, tagline: "Massive ULT bass.", image: "headphones", gallery: ["headphones", "black", "silver", "hero"] },
  { id: 22, name: "QuietComfort Earbuds II", brand: "Bose", category: "anc", price: 22900, mrp: 26900, tagline: "CustomTune your silence.", image: "black", gallery: ["black", "hero", "silver", "white"] },
  { id: 23, name: "SoundLink Mini Buds", brand: "Bose", category: "tws", price: 9999, mrp: 12999, tagline: "Tiny case. Big Bose sound.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 24, name: "Momentum 4 Over-Ear", brand: "Sennheiser", category: "studio", price: 31990, mrp: 36990, tagline: "60 hours of audiophile bliss.", image: "headphones", gallery: ["headphones", "black", "silver", "hero"] },
  { id: 25, name: "Accentum Plus", brand: "Sennheiser", category: "anc", price: 17990, mrp: 21990, tagline: "Hybrid ANC for the long haul.", image: "black", gallery: ["black", "hero", "silver", "white"] },
  { id: 26, name: "Live Pro 3 TWS", brand: "JBL", category: "tws", price: 9999, mrp: 12999, tagline: "Hi-res. Spatial 360.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 27, name: "Tour One M3", brand: "JBL", category: "anc", price: 18999, mrp: 22999, tagline: "Smart Tx with the case.", image: "black", gallery: ["black", "hero", "silver", "white"] },
  { id: 28, name: "Studio Pro Over-Ear", brand: "Beats", category: "studio", price: 32900, mrp: 36900, tagline: "Powerful sound. 40hr battery.", image: "headphones", gallery: ["headphones", "black", "silver", "hero"] },
  { id: 29, name: "Fit Pro 2", brand: "Beats", category: "sports", price: 14900, mrp: 17900, tagline: "Secure-fit wingtips.", image: "sport", gallery: ["sport", "black", "white", "silver"] },
  { id: 30, name: "Solo 4 Wireless", brand: "Beats", category: "luxury", price: 22900, mrp: 24900, tagline: "On-ear icon, reimagined.", image: "rose", gallery: ["rose", "black", "silver", "hero"] },
  { id: 31, name: "Ear (2)", brand: "Nothing", category: "tws", price: 12999, mrp: 14999, tagline: "Transparent. Personal.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 32, name: "Ear (stick)", brand: "Nothing", category: "tws", price: 8499, mrp: 9999, tagline: "Designed to disappear.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 33, name: "CMF Buds Pro 2", brand: "Nothing", category: "anc", price: 4499, mrp: 5499, tagline: "Smart Dial. Big bass.", image: "black", gallery: ["black", "hero", "silver", "white"] },
  { id: 34, name: "Galaxy Buds 3 FE", brand: "Samsung", category: "tws", price: 9999, mrp: 12999, tagline: "AI for everyone.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 35, name: "Galaxy Buds 2 Pro", brand: "Samsung", category: "anc", price: 15990, mrp: 18990, tagline: "24-bit Hi-Fi.", image: "black", gallery: ["black", "hero", "silver", "white"] },
  { id: 36, name: "Nord Buds 3 Pro", brand: "OnePlus", category: "tws", price: 3999, mrp: 4999, tagline: "Glass-finish, AI noise reduction.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 37, name: "OnePlus Buds 3", brand: "OnePlus", category: "tws", price: 5499, mrp: 6999, tagline: "Dual drivers. Spatial audio.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 38, name: "Narzo Buds N1", brand: "Realme", category: "tws", price: 1499, mrp: 1999, tagline: "Bass boost, daily driver.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 39, name: "Buds Air 6 Pro", brand: "Realme", category: "anc", price: 4999, mrp: 6999, tagline: "50dB hybrid ANC.", image: "black", gallery: ["black", "hero", "silver", "white"] },
  { id: 40, name: "Elite 8 Active", brand: "Jabra", category: "sports", price: 18999, mrp: 22999, tagline: "Military-grade durability.", image: "sport", gallery: ["sport", "black", "white", "silver"] },
  { id: 41, name: "Evolve2 75", brand: "Jabra", category: "business", price: 33999, mrp: 39999, tagline: "Office and commute, sorted.", image: "headphones", gallery: ["headphones", "black", "silver", "white"] },
  { id: 42, name: "Crusher Evo", brand: "Skullcandy", category: "studio", price: 14990, mrp: 17990, tagline: "Personal sound, sensory bass.", image: "headphones", gallery: ["headphones", "black", "silver", "hero"] },
  { id: 43, name: "Indy ANC", brand: "Skullcandy", category: "tws", price: 6990, mrp: 8990, tagline: "Skull-iQ smart features.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 44, name: "Space Q45", brand: "Soundcore", category: "anc", price: 11999, mrp: 14999, tagline: "50hr ANC giant.", image: "black", gallery: ["black", "hero", "silver", "white"] },
  { id: 45, name: "Liberty 4 NC", brand: "Soundcore", category: "anc", price: 7999, mrp: 9999, tagline: "Adaptive ANC 2.0.", image: "black", gallery: ["black", "hero", "silver", "white"] },
  { id: 46, name: "Sport X10", brand: "Soundcore", category: "sports", price: 5999, mrp: 7999, tagline: "Rotatable ear hooks.", image: "sport", gallery: ["sport", "black", "white", "silver"] },
  { id: 47, name: "Motif ANC", brand: "Marshall", category: "anc", price: 17999, mrp: 19999, tagline: "Tactile rock heritage.", image: "black", gallery: ["black", "hero", "silver", "white"] },
  { id: 48, name: "Minor IV", brand: "Marshall", category: "tws", price: 11999, mrp: 13999, tagline: "30hr. Rock-star sound.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 49, name: "Wave Beam 300", brand: "JBL", category: "neckband", price: 2499, mrp: 3499, tagline: "32hr neckband fun.", image: "neckband", gallery: ["neckband", "black", "silver", "white"] },
  { id: 50, name: "C100SI Wired", brand: "JBL", category: "wired", price: 499, mrp: 999, tagline: "The everyday wired pair.", image: "silver", gallery: ["silver", "black", "white", "hero"] },
  { id: 51, name: "SE215 Pro Wired", brand: "Shure", category: "studio", price: 8999, mrp: 11999, tagline: "Reference monitoring.", image: "headphones", gallery: ["headphones", "black", "silver", "hero"] },
  { id: 52, name: "AONIC 50 Gen 2", brand: "Shure", category: "studio", price: 36999, mrp: 42999, tagline: "Studio-grade, wireless.", image: "headphones", gallery: ["headphones", "black", "silver", "hero"] },
  { id: 53, name: "K371 Studio", brand: "AKG", category: "studio", price: 8990, mrp: 10990, tagline: "Closed-back reference.", image: "headphones", gallery: ["headphones", "black", "silver", "hero"] },
  { id: 54, name: "Y50BT On-Ear", brand: "AKG", category: "luxury", price: 12999, mrp: 14999, tagline: "Iconic foldable on-ear.", image: "rose", gallery: ["rose", "black", "silver", "hero"] },
  { id: 55, name: "LCD-i4 IEM", brand: "Audeze", category: "luxury", price: 149900, mrp: 169900, tagline: "Planar magnetic in-ear flagship.", image: "rose", gallery: ["rose", "black", "silver", "hero"] },
  { id: 56, name: "Maxwell Gaming", brand: "Audeze", category: "gaming", price: 32990, mrp: 36990, tagline: "Planar gaming over-ear.", image: "gaming", gallery: ["gaming", "black", "silver", "hero"] },
  { id: 57, name: "Cloud II Wireless", brand: "HyperX", category: "gaming", price: 8999, mrp: 11999, tagline: "30hr stamina, DTS spatial.", image: "gaming", gallery: ["gaming", "black", "silver", "hero"] },
  { id: 58, name: "Cloud Buds II", brand: "HyperX", category: "gaming", price: 4999, mrp: 6999, tagline: "Low-latency TWS for play.", image: "gaming", gallery: ["gaming", "black", "silver", "hero"] },
  { id: 59, name: "Barracuda Pro", brand: "Razer", category: "gaming", price: 19999, mrp: 22999, tagline: "THX spatial. Hybrid ANC.", image: "gaming", gallery: ["gaming", "black", "silver", "hero"] },
  { id: 60, name: "Hammerhead HyperSpeed", brand: "Razer", category: "gaming", price: 12999, mrp: 14999, tagline: "Tri-mode wireless.", image: "gaming", gallery: ["gaming", "black", "silver", "hero"] },
  { id: 61, name: "Zone Vibe 100", brand: "Logitech", category: "business", price: 11999, mrp: 13999, tagline: "Light, soft, every-day calls.", image: "headphones", gallery: ["headphones", "black", "silver", "white"] },
  { id: 62, name: "G Pro X2 Lightspeed", brand: "Logitech", category: "gaming", price: 27999, mrp: 31999, tagline: "Pro-grade graphene drivers.", image: "gaming", gallery: ["gaming", "black", "silver", "hero"] },
  { id: 63, name: "Beoplay H95", brand: "Bang", category: "luxury", price: 89900, mrp: 99900, tagline: "Anniversary craftsmanship.", image: "rose", gallery: ["rose", "black", "silver", "hero"] },
  { id: 64, name: "Beoplay EX", brand: "Bang", category: "luxury", price: 39900, mrp: 44900, tagline: "Cast aluminium TWS.", image: "rose", gallery: ["rose", "black", "silver", "hero"] },
  { id: 65, name: "Airdopes 458 Pro", brand: "Boat", category: "tws", price: 1799, mrp: 3499, tagline: "ENx™ tech, 50hr.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 66, name: "Rockerz 550", brand: "Boat", category: "studio", price: 1999, mrp: 4499, tagline: "20hr playback, bold.", image: "headphones", gallery: ["headphones", "black", "silver", "hero"] },
  { id: 67, name: "Redmi Buds 5 Pro", brand: "Xiaomi", category: "anc", price: 4999, mrp: 6999, tagline: "Dual driver hi-res.", image: "black", gallery: ["black", "hero", "silver", "white"] },
  { id: 68, name: "Mi True Wireless 3", brand: "Xiaomi", category: "tws", price: 3499, mrp: 4499, tagline: "Lightweight every-day TWS.", image: "white", gallery: ["white", "black", "silver", "hero"] },
  { id: 69, name: "FreeBuds Pro 4", brand: "Huawei", category: "flagship", price: 17999, mrp: 21999, tagline: "Triple driver, dynamic ANC.", image: "hero", gallery: ["hero", "black", "silver", "white"] },
  { id: 70, name: "Pixel Buds Pro 2", brand: "Google", category: "anc", price: 22900, mrp: 25900, tagline: "Tensor A1 silicon. AI translation.", image: "black", gallery: ["black", "hero", "silver", "white"] },

  // ── ADD NEW PRODUCTS BELOW ──
  // Example — using a specific existing image key:
  // { id: 71, name: "New Buds X", brand: "Sony", category: "tws", price: 9999, mrp: 12999,
  //   tagline: "Fresh drop.", image: "sport", gallery: ["sport", "black", "white", "silver"] },
  //
  // Example — with all-new imported images:
  // 1) import myNewImg from "@/assets/product-newthing.jpg";
  // 2) register it: IMAGES.myNewImg = myNewImg;   (or add to the IMAGES map above)
  // 3) reference it by key: image: "myNewImg"
];

// ─── DERIVED EXPORTS ──────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = PRODUCT_SEEDS
  .slice()
  .sort((a, b) => a.id - b.id)
  .map(buildProduct);

export const ALL_BRANDS = Array.from(new Set(PRODUCTS.map((x) => x.brand)));

/** Look up a product by its numeric id. */
export function getProductById(id: number) {
  return PRODUCTS.find((prod) => prod.id === id);
}

/** Look up a product by its slug (derived from name), e.g. "aurora-pro". */
export function getProductBySlug(slug: string) {
  return PRODUCTS.find((prod) => prod.slug === slug);
}

/** Get products whose id falls within [startId, endId] inclusive. */
export function getProductsInRange(startId: number, endId: number) {
  return PRODUCTS.filter((prod) => prod.id >= startId && prod.id <= endId);
}

/** Back-compat helper if old code called getProduct(stringId) with a slug. */
export function getProduct(idOrSlug: number | string) {
  return typeof idOrSlug === "number"
    ? getProductById(idOrSlug)
    : getProductBySlug(idOrSlug);
}
