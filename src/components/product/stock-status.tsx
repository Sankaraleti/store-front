import { cn } from "@/lib/utils"
import { getStockState, type Product } from "@/lib/catalog"

export function StockStatus({
  product,
  className,
}: {
  product: Pick<Product, "stock">
  className?: string
}) {
  const state = getStockState(product)

  return (
    <p
      data-state={state}
      className={cn("flex items-center gap-2 text-xs", className)}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          state === "in_stock" && "bg-success",
          state === "low_stock" && "bg-sale",
          state === "out_of_stock" && "border border-muted-foreground"
        )}
      />
      {state === "in_stock" && "In stock"}
      {state === "low_stock" && `Only ${product.stock} left`}
      {state === "out_of_stock" && (
        <span className="text-muted-foreground">Sold out</span>
      )}
    </p>
  )
}
