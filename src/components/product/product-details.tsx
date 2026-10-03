import { Plus } from "lucide-react"
import type { ReactNode } from "react"

// Collapsible information panels built on <details>, so they work without
// client JavaScript and keep their native keyboard behaviour.
export function DetailsPanel({
  title,
  defaultOpen,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  return (
    <details open={defaultOpen} className="group border-b">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 eyebrow [&::-webkit-details-marker]:hidden">
        {title}
        <Plus
          aria-hidden
          className="size-3.5 transition-transform group-open:rotate-45"
        />
      </summary>
      <div className="pb-6 text-sm text-muted-foreground">{children}</div>
    </details>
  )
}
