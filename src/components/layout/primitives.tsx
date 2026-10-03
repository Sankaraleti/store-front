import type { ComponentProps, ElementType } from "react"
import { cn } from "@/lib/utils"

// Thin React wrappers over the layout utilities in globals.css, so pages can
// compose layouts without repeating class strings.

type PolymorphicProps<T extends ElementType> = { as?: T } & Omit<
  ComponentProps<T>,
  "as"
>

const containerWidths = {
  page: "container-page",
  content: "container-content",
  reading: "container-reading",
  bleed: "w-full",
} as const

export function Container<T extends ElementType = "div">({
  as,
  width = "page",
  className,
  ...props
}: PolymorphicProps<T> & { width?: keyof typeof containerWidths }) {
  const Comp = as ?? "div"
  return <Comp className={cn(containerWidths[width], className)} {...props} />
}

export function Section<T extends ElementType = "section">({
  as,
  spacing = "default",
  className,
  ...props
}: PolymorphicProps<T> & { spacing?: "default" | "sm" | "none" }) {
  const Comp = as ?? "section"
  return (
    <Comp
      className={cn(
        spacing === "default" && "py-section",
        spacing === "sm" && "py-section-sm",
        className
      )}
      {...props}
    />
  )
}

export function Stack<T extends ElementType = "div">({
  as,
  className,
  ...props
}: PolymorphicProps<T>) {
  const Comp = as ?? "div"
  return <Comp className={cn("stack", className)} {...props} />
}

export function ProductGrid<T extends ElementType = "ul">({
  as,
  className,
  ...props
}: PolymorphicProps<T>) {
  const Comp = as ?? "ul"
  return <Comp className={cn("grid-products", className)} {...props} />
}

export function Eyebrow<T extends ElementType = "p">({
  as,
  className,
  ...props
}: PolymorphicProps<T>) {
  const Comp = as ?? "p"
  return <Comp className={cn("eyebrow", className)} {...props} />
}
