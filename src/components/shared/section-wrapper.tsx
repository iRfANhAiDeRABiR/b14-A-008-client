import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps extends React.ComponentProps<"section"> {
  variant?: "default" | "muted" | "card"
}

export function SectionWrapper({
  className,
  variant = "default",
  ...props
}: SectionWrapperProps) {
  const variantClasses = {
    default: "bg-background",
    muted: "bg-muted/40 border-y border-border/50",
    card: "bg-card border-y border-border/50",
  }

  return (
    <section
      className={cn(
        "py-12 sm:py-16 lg:py-20",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}

