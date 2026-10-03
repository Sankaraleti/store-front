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

function gallery(slug: string, name: string): ProductImage[] {
  return [
    { src: `/images/products/${slug}-1.svg`, alt: `${name}, front view` },
    { src: `/images/products/${slug}-2.svg`, alt: `${name}, detail view` },
    { src: `/images/products/${slug}-3.svg`, alt: `${name}, angled view` },
  ]
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
      "A roomy tote in grained calfskin with a reinforced base and rolled top handles, sized to carry a laptop and the day's essentials.",
    details: [
      "Grained calfskin",
      "Cotton-linen lining",
      "Interior zip pocket and two slip pockets",
      "Magnetic closure",
      "W 38cm x H 30cm x D 15cm",
      "Made in Italy",
    ],
    images: gallery("structured-leather-tote", "Structured leather tote"),
    stock: 12,
  },
  {
    slug: "calfskin-loafer",
    name: "Calfskin loafer",
    category: categories.shoes,
    price: 98000,
    currency: "USD",
    sku: "SH-2210-BLK",
    summary:
      "A polished loafer with a moccasin construction and a stacked leather heel, finished with a slim strap across the vamp.",
    details: [
      "Polished calfskin upper",
      "Leather sole with rubber insert",
      "1.5cm stacked heel",
      "Made in Italy",
    ],
    images: gallery("calfskin-loafer", "Calfskin loafer"),
    stock: 2,
  },
  {
    slug: "silk-twill-scarf",
    name: "Silk twill scarf",
    category: categories.accessories,
    price: 49500,
    currency: "USD",
    sku: "AC-3307-RED",
    summary:
      "A square scarf in fine silk twill with a printed frame motif and hand-rolled edges.",
    details: ["100% silk twill", "Hand-rolled edges", "90cm x 90cm", "Made in Italy"],
    images: gallery("silk-twill-scarf", "Silk twill scarf"),
    stock: 24,
  },
  {
    slug: "double-faced-wool-coat",
    name: "Double-faced wool coat",
    category: categories.readyToWear,
    price: 380000,
    currency: "USD",
    sku: "RW-4120-GRY",
    summary:
      "An unlined coat cut from double-faced wool, with a notched lapel, dropped shoulders and a relaxed, below-the-knee length.",
    details: [
      "90% wool, 10% cashmere",
      "Unlined, hand-finished seams",
      "Horn buttons",
      "Dry clean only",
      "Made in Italy",
    ],
    images: gallery("double-faced-wool-coat", "Double-faced wool coat"),
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
      "A compact shoulder bag in smooth leather with an arched top handle and a detachable strap.",
    details: [
      "Smooth calfskin",
      "Microfibre lining",
      "Detachable, adjustable strap",
      "W 22cm x H 16cm x D 7cm",
      "Made in Italy",
    ],
    images: gallery("mini-shoulder-bag", "Mini shoulder bag"),
    stock: 5,
  },
  {
    slug: "smooth-leather-belt",
    name: "Smooth leather belt",
    category: categories.accessories,
    price: 52000,
    currency: "USD",
    sku: "AC-3051-BLK",
    summary:
      "A 3cm belt in smooth leather with a brushed metal frame buckle.",
    details: ["Smooth calfskin", "Brushed metal buckle", "3cm width", "Made in Italy"],
    images: gallery("smooth-leather-belt", "Smooth leather belt"),
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
