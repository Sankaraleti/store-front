import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Square, uppercase, widely tracked; hover is a colour inversion rather than
// a shade shift. Heights start at 40px so every size is a usable touch target.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border border-transparent text-2xs font-medium tracking-label whitespace-nowrap uppercase transition-colors select-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-40 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // solid black: primary commerce action (add to bag, checkout)
        default:
          "border-primary bg-primary text-primary-foreground hover:bg-primary/85",
        // hairline frame that fills on hover
        outline:
          "border-border-strong bg-transparent text-foreground hover:bg-foreground hover:text-background aria-expanded:bg-foreground aria-expanded:text-background",
        // for use over imagery and dark surfaces
        inverse:
          "border-background bg-background text-foreground hover:bg-transparent hover:text-background",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_6%)] aria-expanded:bg-secondary",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "border-destructive bg-transparent text-destructive hover:bg-destructive hover:text-background",
        link: "h-auto px-0 underline decoration-1 underline-offset-4 hover:decoration-transparent",
      },
      size: {
        default:
          "h-12 gap-2 px-8 has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6",
        xs: "h-8 gap-1.5 px-3 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-10 gap-1.5 px-5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-14 gap-2 px-10",
        icon: "size-10",
        "icon-xs": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-9",
        "icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-5",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  fullWidth,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
