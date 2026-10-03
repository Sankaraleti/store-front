import Link from "next/link";
import {
  Container,
  Eyebrow,
  ProductGrid,
  Section,
  Stack,
} from "@/components/layout/primitives";
import { ProductCard } from "@/components/product/product-card";
import { buttonVariants } from "@/components/ui/button";
import { getProducts } from "@/lib/catalog";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="flex flex-1 flex-col">
      <Section className="flex min-h-[70svh] items-center">
        <Container>
          <Stack className="items-center gap-6 text-center">
            <Eyebrow className="text-muted-foreground">New season</Eyebrow>
            <h1 className="heading-display">Store Front</h1>
            <div className="cluster justify-center">
              <Link href="#featured" className={buttonVariants()}>
                Shop now
              </Link>
            </div>
          </Stack>
        </Container>
      </Section>

      <Section id="featured" aria-labelledby="featured-heading" className="pt-0">
        <Container className="stack gap-8">
          <h2 id="featured-heading" className="eyebrow text-center">
            Featured
          </h2>
          <ProductGrid>
            {products.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ProductGrid>
        </Container>
      </Section>
    </main>
  );
}
