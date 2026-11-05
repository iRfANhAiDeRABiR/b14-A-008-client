"use client"

import * as React from "react"
import { Moon, Sun, Laptop, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const emptySubscribe = () => () => {}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className={cn("size-9 rounded-xl border-border bg-background text-foreground", className)}
        aria-label="Toggle theme"
      >
        <Sun className="size-4 opacity-50" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "size-9 rounded-xl border-border bg-background text-foreground hover:bg-secondary/60 hover:text-foreground transition-colors cursor-pointer",
              className
            )}
            aria-label="Select theme"
          >
            {theme === "dark" ? (
              <Sun className="size-4 text-amber-400 transition-all duration-300" />
            ) : (
              <Moon className="size-4 text-primary transition-all duration-300" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-36 p-1.5 rounded-xl">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center justify-between cursor-pointer rounded-lg text-xs font-medium py-2 px-2.5"
        >
          <div className="flex items-center gap-2">
            <Sun className="size-4 text-amber-500" />
            <span>Light</span>
          </div>
          {theme === "light" && <Check className="size-3.5 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center justify-between cursor-pointer rounded-lg text-xs font-medium py-2 px-2.5"
        >
          <div className="flex items-center gap-2">
            <Moon className="size-4 text-indigo-400" />
            <span>Dark</span>
          </div>
          {theme === "dark" && <Check className="size-3.5 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center justify-between cursor-pointer rounded-lg text-xs font-medium py-2 px-2.5"
        >
          <div className="flex items-center gap-2">
            <Laptop className="size-4 text-muted-foreground" />
            <span>System</span>
          </div>
          {theme === "system" && <Check className="size-3.5 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
