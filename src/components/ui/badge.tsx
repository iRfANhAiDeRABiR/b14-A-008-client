import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border-border text-foreground",
        cleanup:
          "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
        plantation:
          "border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-950/60 dark:text-green-300",
        donation:
          "border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
        education:
          "border-blue-200 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
        healthcare:
          "border-rose-200 bg-rose-100 text-rose-800 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300",
        other:
          "border-purple-200 bg-purple-100 text-purple-800 dark:border-purple-800 dark:bg-purple-950/60 dark:text-purple-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
