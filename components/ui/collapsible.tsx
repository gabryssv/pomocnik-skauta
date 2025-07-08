/**
 * Minimal shadcn-style Collapsible wrapper.
 * Exposes Radix UI primitives so pages that already use:
 *   import { Collapsible, CollapsibleTrigger, CollapsibleContent }
 * continue to work without code changes.
 */

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cn } from "@/lib/utils"

export const Collapsible = ({
  className,
  ...props
}: CollapsiblePrimitive.CollapsibleProps & { className?: string }) => (
  <CollapsiblePrimitive.Root className={cn("w-full", className)} {...props} />
)

export const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsiblePrimitive.CollapsibleTriggerProps>(
  ({ className, ...props }, ref) => (
    <CollapsiblePrimitive.Trigger ref={ref} className={cn("w-full", className)} {...props} />
  ),
)
CollapsibleTrigger.displayName = "CollapsibleTrigger"

export const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsiblePrimitive.CollapsibleContentProps>(
  ({ className, ...props }, ref) => (
    <CollapsiblePrimitive.Content ref={ref} className={cn("overflow-hidden", className)} {...props} />
  ),
)
CollapsibleContent.displayName = "CollapsibleContent"
