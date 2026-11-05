"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HeartHandshake,
  Menu,
  User,
  PlusCircle,
  CalendarCheck,
  BookmarkCheck,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export interface NavbarUser {
  name: string
  email: string
  image?: string | null
}

export interface NavbarProps {
  user?: NavbarUser | null
  onLogout?: () => void
}

export function Navbar({ user = null, onLogout }: NavbarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/upcoming-events", label: "Upcoming Events" },
  ]

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U"

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs transition-transform group-hover:scale-105">
            <HeartHandshake className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Together<span className="text-primary">WeCare</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-semibold tracking-wider text-muted-foreground -mt-1">
              Community Platform
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary bg-secondary/80 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <TooltipProvider delay={150}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <DropdownMenuTrigger
                        render={
                          <button
                            type="button"
                            title={user.name}
                            aria-label={`User menu for ${user.name}`}
                            className="rounded-full ring-2 ring-primary/20 hover:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all cursor-pointer"
                          >
                            <Avatar className="size-9">
                              {user.image && (
                                <AvatarImage
                                  src={user.image}
                                  alt={user.name}
                                />
                              )}
                              <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold text-xs">
                                {userInitials}
                              </AvatarFallback>
                            </Avatar>
                          </button>
                        }
                      />
                    }
                  />
                  <TooltipContent side="bottom" align="end">
                    <p className="font-medium text-xs">{user.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenuContent align="end" className="w-56 p-1.5">
                <DropdownMenuLabel className="font-normal px-2 py-1.5">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-semibold font-heading text-foreground">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem render={<Link href="/profile" className="flex w-full items-center gap-2 cursor-pointer" />}>
                    <User className="size-4 text-muted-foreground" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href="/create-event" className="flex w-full items-center gap-2 cursor-pointer" />}>
                    <PlusCircle className="size-4 text-muted-foreground" />
                    <span>Create Event</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href="/manage-events" className="flex w-full items-center gap-2 cursor-pointer" />}>
                    <CalendarCheck className="size-4 text-muted-foreground" />
                    <span>Manage Events</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href="/joined-events" className="flex w-full items-center gap-2 cursor-pointer" />}>
                    <BookmarkCheck className="size-4 text-muted-foreground" />
                    <span>Joined Events</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onLogout}
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer flex items-center gap-2"
                >
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Log In
              </Link>
              <Link
                href="/register"
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                Join Now
              </Link>
            </div>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open mobile navigation"
                >
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[300px] sm:w-[360px] p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <SheetHeader className="text-left pb-4 border-b border-border">
                  <SheetTitle className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <HeartHandshake className="size-4" />
                    </div>
                    <span className="font-heading font-bold text-lg text-foreground">
                      Together<span className="text-primary">WeCare</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between",
                          isActive
                            ? "bg-secondary text-primary font-semibold"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        <span>{link.label}</span>
                      </Link>
                    )
                  })}
                </div>

                {user ? (
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center gap-3 px-2 py-1">
                      <Avatar className="size-10">
                        {user.image && <AvatarImage src={user.image} alt={user.name} />}
                        <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold text-xs">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="truncate">
                        <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <Link
                        href="/profile"
                        onClick={() => setMobileOpen(false)}
                        className="px-3.5 py-2 rounded-lg text-sm text-foreground hover:bg-muted flex items-center gap-2.5"
                      >
                        <User className="size-4 text-muted-foreground" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/create-event"
                        onClick={() => setMobileOpen(false)}
                        className="px-3.5 py-2 rounded-lg text-sm text-foreground hover:bg-muted flex items-center gap-2.5"
                      >
                        <PlusCircle className="size-4 text-muted-foreground" />
                        <span>Create Event</span>
                      </Link>
                      <Link
                        href="/manage-events"
                        onClick={() => setMobileOpen(false)}
                        className="px-3.5 py-2 rounded-lg text-sm text-foreground hover:bg-muted flex items-center gap-2.5"
                      >
                        <CalendarCheck className="size-4 text-muted-foreground" />
                        <span>Manage Events</span>
                      </Link>
                      <Link
                        href="/joined-events"
                        onClick={() => setMobileOpen(false)}
                        className="px-3.5 py-2 rounded-lg text-sm text-foreground hover:bg-muted flex items-center gap-2.5"
                      >
                        <BookmarkCheck className="size-4 text-muted-foreground" />
                        <span>Joined Events</span>
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="pt-6 border-t border-border">
                {user ? (
                  <Button
                    variant="outline"
                    className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive flex items-center justify-center gap-2"
                    onClick={() => {
                      setMobileOpen(false)
                      onLogout?.()
                    }}
                  >
                    <LogOut className="size-4" />
                    <span>Logout</span>
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center")}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className={cn(buttonVariants({ variant: "default" }), "w-full justify-center")}
                    >
                      Join Now
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

