import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground shadow-xs",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-2 px-4 text-sm has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-md px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 rounded-lg px-6 text-sm has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-md in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-md in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

function Button({
  className,
  variant = "default",
  size = "default",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin shrink-0" />}
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
