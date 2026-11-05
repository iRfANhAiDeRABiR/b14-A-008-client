import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps extends React.ComponentProps<"div"> {
  title: string
  subtitle?: string
  badge?: string
  align?: "center" | "left"
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  align = "center",
  className,
  ...props
}: SectionHeadingProps) {
  const isCenter = align === "center"

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCenter ? "items-center text-center mx-auto max-w-3xl" : "items-start text-left max-w-3xl",
        className
      )}
      {...props}
    >
      {badge && (
        <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
          {badge}
        </span>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

