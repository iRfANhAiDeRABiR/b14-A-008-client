import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function EventCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("overflow-hidden border border-border shadow-xs", className)}>
      <Skeleton className="h-48 w-full rounded-none" />
      <CardHeader className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent className="space-y-2 p-5 pt-0">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/5" />
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Skeleton className="h-9 w-full rounded-lg" />
      </CardFooter>
    </Card>
  )
}

export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function ImageSkeleton({
  className,
  aspectRatio = "aspect-video",
}: {
  className?: string
  aspectRatio?: string
}) {
  return <Skeleton className={cn("w-full rounded-xl", aspectRatio, className)} />
}

export function TextSkeleton({
  lines = 3,
  className,
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/5" : i % 2 === 0 ? "w-full" : "w-5/6"
          )}
        />
      ))}
    </div>
  )
}

export function ButtonSkeleton({
  size = "default",
  className,
}: {
  size?: "sm" | "default" | "lg"
  className?: string
}) {
  const sizeClasses = {
    sm: "h-8 w-20",
    default: "h-9 w-28",
    lg: "h-10 w-36",
  }
  return <Skeleton className={cn("rounded-lg", sizeClasses[size], className)} />
}

