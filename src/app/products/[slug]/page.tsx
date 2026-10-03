import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow, ProductGrid, Section } from "@/components/layout/primitives";
import { DetailsPanel } from "@/components/product/product-details";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPrice } from "@/components/product/product-price";
import { StockStatus } from "@/components/product/stock-status";
import { Button } from "@/components/ui/button";
import {
  getProduct,
  getProducts,
  getRelatedProducts,
  getStockState,
} from "@/lib/catalog";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  return {
    title: `${product.name} | Store Front`,
    description: product.summary,
    openGraph: {
      title: product.name,
      description: product.summary,
      images: product.images.slice(0, 1).map((image) => image.src),
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const soldOut = getStockState(product) === "out_of_stock";

  return (
    <main className="flex-1">
      <Container className="pt-4 lg:pt-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-meta">
            <li>
              <Link href="/" className="link-subtle">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>{product.category.name}</li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-foreground">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-4 grid gap-8 lg:mt-6 lg:grid-cols-12 lg:gap-gutter">
          <ProductGallery
            images={product.images}
            productName={product.name}
            className="lg:col-span-7 xl:col-span-8"
          />

          <div className="min-w-0 lg:col-span-5 xl:col-span-4">
            <div className="stack gap-8 lg:sticky lg:top-header lg:max-w-md lg:py-8">
              <div className="stack gap-3">
                <Eyebrow className="text-muted-foreground">
                  {product.category.name}
                </Eyebrow>
                <h1 className="text-title">{product.name}</h1>
                <ProductPrice product={product} className="text-base" />
              </div>

              <div className="stack gap-4">
                <StockStatus product={product} />
                <Button type="button" fullWidth disabled={soldOut}>
                  {soldOut ? "Sold out" : "Add to bag"}
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">{product.summary}</p>

              <div className="border-t">
                <DetailsPanel title="Product details" defaultOpen>
                  <ul className="stack gap-1.5">
                    {product.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-meta">Style {product.sku}</p>
                </DetailsPanel>
                <DetailsPanel title="Delivery & returns">
                  <p>
                    Complimentary standard delivery on all orders. Returns are
                    accepted within 30 days of delivery in original condition.
                  </p>
                </DetailsPanel>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Section aria-labelledby="related-heading">
          <Container className="stack gap-8">
            <h2 id="related-heading" className="eyebrow text-center">
              You may also like
            </h2>
            <ProductGrid>
              {related.map((item) => (
                <li key={item.slug}>
                  <ProductCard product={item} />
                </li>
              ))}
            </ProductGrid>
          </Container>
        </Section>
      )}
    </main>
  );
}
