import * as React from "react"
import Link from "next/link"
import { LucideIcon, CalendarX } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.ComponentProps<"div"> {
  icon?: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export function EmptyState({
  icon: Icon = CalendarX,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-8 text-center",
        className
      )}
      {...props}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground mb-4">
        <Icon className="size-7" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      {actionLabel && (
        <div className="mt-6">
          {actionHref ? (
            <Link
              href={actionHref}
              className={buttonVariants({ variant: "default" })}
            >
              {actionLabel}
            </Link>
          ) : (
            <Button onClick={onAction}>{actionLabel}</Button>
          )}
        </div>
      )}
    </div>
  )
}
