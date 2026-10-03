// Product catalogue. Static sample data for now; swap the accessors below for
// Drizzle queries once a products table exists; page code only uses the
// exported functions and types.

export type ProductImage = { src: string; alt: string }

export type Category = { slug: string; name: string }

export type Product = {
  slug: string
  name: string
  category: Category
  /** Minor units (cents) to avoid floating point rounding. */
  price: number
  /** Original price when the product is marked down. */
  compareAtPrice?: number
  currency: string
  sku: string
  summary: string
  details: string[]
  images: ProductImage[]
  /** Units available to sell. */
  stock: number
}

export type StockState = "in_stock" | "low_stock" | "out_of_stock"

export const LOW_STOCK_THRESHOLD = 3

const categories = {
  bags: { slug: "bags", name: "Bags" },
  shoes: { slug: "shoes", name: "Shoes" },
  accessories: { slug: "accessories", name: "Accessories" },
  readyToWear: { slug: "ready-to-wear", name: "Ready-to-wear" },
} satisfies Record<string, Category>

// Sample photography from Unsplash (free under the Unsplash License). The
// `w` parameter has Unsplash serve a 2000px original for Next to resize from.
function unsplash(id: string, alt: string): ProductImage {
  return { src: `https://images.unsplash.com/photo-${id}?w=2000&q=80`, alt }
}

const products: Product[] = [
  {
    slug: "structured-leather-tote",
    name: "Structured leather tote",
    category: categories.bags,
    price: 245000,
    currency: "USD",
    sku: "BG-1042-BRN",
    summary:
      "A roomy tote in burnished tan leather with long flat handles, sized to carry a laptop and the day's essentials.",
    details: [
      "Burnished calfskin",
      "Cotton-linen lining",
      "Interior zip pocket and two slip pockets",
      "Magnetic closure",
      "W 38cm x H 40cm x D 12cm",
      "Made in Italy",
    ],
    images: [
      unsplash(
        "1624687943971-e86af76d57de",
        "Tan leather tote hanging from a white door"
      ),
    ],
    stock: 12,
  },
  {
    slug: "calfskin-loafer",
    name: "Calfskin loafer",
    category: categories.shoes,
    price: 98000,
    currency: "USD",
    sku: "SH-2210-BRN",
    summary:
      "A polished loafer in chestnut calfskin with a moccasin construction, a stacked leather heel and a metal bit across the vamp.",
    details: [
      "Polished calfskin upper",
      "Leather lining and sole",
      "Gold-tone metal bit",
      "1.5cm stacked heel",
      "Made in Italy",
    ],
    images: [
      unsplash(
        "1616406432452-07bc5938759d",
        "Pair of chestnut leather loafers with metal bits, side view"
      ),
      unsplash(
        "1615979474401-8a6a344de5bd",
        "Pair of chestnut leather loafers seen from above"
      ),
    ],
    stock: 2,
  },
  {
    slug: "silk-twill-scarf",
    name: "Silk twill scarf",
    category: categories.accessories,
    price: 49500,
    currency: "USD",
    sku: "AC-3307-PUR",
    summary:
      "A square scarf in fine silk twill with a printed chain motif on a deep violet ground, finished with hand-rolled edges.",
    details: ["100% silk twill", "Hand-rolled edges", "90cm x 90cm", "Made in Italy"],
    images: [
      unsplash(
        "1551028442-ee84b4d3a50a",
        "Violet silk scarf with a white and gold chain print"
      ),
    ],
    stock: 24,
  },
  {
    slug: "double-faced-wool-coat",
    name: "Double-faced wool coat",
    category: categories.readyToWear,
    price: 380000,
    currency: "USD",
    sku: "RW-4120-CML",
    summary:
      "An unlined wrap coat cut from camel double-faced wool, with a notched lapel, a self-tie belt and a below-the-knee length.",
    details: [
      "90% wool, 10% cashmere",
      "Unlined, hand-finished seams",
      "Self-tie belt",
      "Dry clean only",
      "Made in Italy",
    ],
    images: [
      unsplash(
        "1539533113208-f6df8cc8b543",
        "Camel belted wool coat worn in front of a stone wall"
      ),
    ],
    stock: 0,
  },
  {
    slug: "mini-shoulder-bag",
    name: "Mini shoulder bag",
    category: categories.bags,
    price: 129000,
    compareAtPrice: 172000,
    currency: "USD",
    sku: "BG-1180-TAN",
    summary:
      "A compact shoulder bag in smooth tan leather with contrast stitching, two front pockets and a detachable strap.",
    details: [
      "Smooth calfskin with contrast stitching",
      "Two front flap pockets",
      "Detachable, adjustable strap",
      "W 24cm x H 16cm x D 8cm",
      "Made in Italy",
    ],
    images: [
      unsplash(
        "1657603738389-951c374b740c",
        "Tan leather shoulder bag with two front pockets and strap"
      ),
      unsplash(
        "1657603719375-8ffdacaac790",
        "Tan leather shoulder bag, front view of the flap pockets"
      ),
    ],
    stock: 5,
  },
  {
    slug: "smooth-leather-belt",
    name: "Smooth leather belt",
    category: categories.accessories,
    price: 52000,
    currency: "USD",
    sku: "AC-3051-BRN",
    summary:
      "A 4cm belt in oiled brown leather with stitched edges and a brushed metal buckle.",
    details: [
      "Oiled leather",
      "Stitched edges",
      "Brushed metal buckle",
      "4cm width",
      "Made in Italy",
    ],
    images: [
      unsplash(
        "1664286074176-5206ee5dc878",
        "Brown leather belt with a brushed metal buckle"
      ),
    ],
    stock: 1,
  },
]

export async function getProducts(): Promise<Product[]> {
  return products
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return products.find((product) => product.slug === slug)
}

/** Same-category items first, then the rest of the catalogue. */
export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  const others = products.filter((p) => p.slug !== product.slug)
  const sameCategory = others.filter(
    (p) => p.category.slug === product.category.slug
  )
  const rest = others.filter((p) => p.category.slug !== product.category.slug)
  return [...sameCategory, ...rest].slice(0, limit)
}

export function getStockState(product: Pick<Product, "stock">): StockState {
  if (product.stock <= 0) return "out_of_stock"
  if (product.stock <= LOW_STOCK_THRESHOLD) return "low_stock"
  return "in_stock"
}

export function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
  }).format(amount / 100)
}
