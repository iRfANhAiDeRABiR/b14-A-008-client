import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.ComponentProps<"div"> {
  size?: "default" | "sm" | "md" | "lg" | "full"
}

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    default: "max-w-7xl",
    lg: "max-w-[1400px]",
    full: "max-w-full",
  }

  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
}

