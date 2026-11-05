"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { format, isValid } from "date-fns"
import { toast } from "sonner"
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  ArrowLeft,
  Share2,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Users,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ChevronRight,
  Home,
  Check,
} from "lucide-react"
import { Event, EventOrganizer } from "@/types/event"
import { getEventById, joinEvent, checkIfEventJoined } from "@/lib/api"
import { authClient } from "@/lib/auth-client"
import { getTokenFromClient } from "@/lib/getTokenFromClient"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Container } from "@/components/shared/container"
import { cn } from "@/lib/utils"

interface EventDetailsViewProps {
  id: string
}

function getBadgeVariant(eventType: string) {
  const normalized = eventType?.toLowerCase()?.trim() || ""
  if (normalized === "cleanup") return "cleanup"
  if (normalized === "plantation") return "plantation"
  if (normalized === "donation") return "donation"
  if (normalized === "education") return "education"
  if (normalized === "healthcare") return "healthcare"
  return "other"
}

function formatEventDate(dateInput: string | Date | undefined): string {
  if (!dateInput) return "Date to be announced"
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput
  return isValid(date) ? format(date, "EEEE, MMMM d, yyyy") : "Date to be announced"
}

function formatEventTime(dateInput: string | Date | undefined): string {
  if (!dateInput) return "TBA"
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput
  return isValid(date) ? format(date, "h:mm a") : "TBA"
}

function formatPostedDate(dateInput: string | Date | undefined): string | null {
  if (!dateInput) return null
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput
  return isValid(date) ? format(date, "MMM d, yyyy") : null
}

function getOrganizerInfo(createdBy?: string | EventOrganizer) {
  if (!createdBy) {
    return { name: "Community Organizer", email: null, initials: "CO", image: undefined }
  }
  if (typeof createdBy === "string") {
    const initials = createdBy.slice(0, 2).toUpperCase()
    return { name: createdBy, email: null, initials, image: undefined }
  }
  const name = createdBy.name || "Community Organizer"
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  return {
    name,
    email: createdBy.email || null,
    initials: initials || "CO",
    image: createdBy.image,
  }
}

function EventDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <Container className="space-y-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-40" />
        </div>

        <Skeleton className="h-72 sm:h-[420px] w-full rounded-2xl" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-10 w-4/5" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="space-y-3 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
          </div>

          <div className="space-y-6">
            <Skeleton className="h-72 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
        </div>
      </Container>
    </div>
  )
}

export function EventDetailsView({ id }: EventDetailsViewProps) {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const [event, setEvent] = React.useState<Event | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [notFound, setNotFound] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [reloadKey, setReloadKey] = React.useState(0)

  const [hasJoined, setHasJoined] = React.useState(false)
  const [isJoining, setIsJoining] = React.useState(false)

  React.useEffect(() => {
    let isMounted = true

    getEventById(id)
      .then((data) => {
        if (!isMounted) return
        if (!data) {
          setNotFound(true)
          setEvent(null)
        } else {
          setEvent(data)
          setNotFound(false)
        }
        setError(null)
        setLoading(false)
      })
      .catch((err) => {
        if (!isMounted) return
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load event details right now."
        )
        setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [id, reloadKey])

  React.useEffect(() => {
    let isMounted = true

    async function checkStatus() {
      if (!session?.user) return
      try {
        const token = await getTokenFromClient()
        const joined = await checkIfEventJoined(id, token)
        if (isMounted && joined) {
          setHasJoined(true)
        }
      } catch {
      }
    }

    checkStatus()

    return () => {
      isMounted = false
    }
  }, [id, session?.user])

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    setNotFound(false)
    setReloadKey((prev) => prev + 1)
  }

  const handleJoinClick = async () => {
    if (!session?.user) {
      router.push(`/login?callbackURL=${encodeURIComponent(`/events/${id}`)}`)
      return
    }

    if (hasJoined) {
      toast.info("You have already registered to participate in this event.")
      return
    }

    setIsJoining(true)
    try {
      const token = await getTokenFromClient()
      const res = await joinEvent(id, token)
      setHasJoined(true)
      setEvent((prev) =>
        prev
          ? {
              ...prev,
              joinedCount: (prev.joinedCount || 0) + 1,
            }
          : prev
      )
      toast.success(
        res.message || "Thank you for getting involved! You have joined this event."
      )
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to join event. Please try again."
      if (message.toLowerCase().includes("already joined")) {
        setHasJoined(true)
        toast.info("You have already joined this event.")
      } else {
        toast.error(message)
      }
    } finally {
      setIsJoining(false)
    }
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Event link copied to clipboard!")
    }
  }

  if (loading) {
    return <EventDetailsSkeleton />
  }

  if (notFound) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16">
        <Container className="max-w-md text-center space-y-6">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <AlertCircle className="size-8" />
          </div>
          <div className="space-y-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Event Not Found
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The event you&apos;re looking for may have been removed or is no longer available.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/upcoming-events"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full h-11 rounded-xl font-semibold gap-2"
              )}
            >
              <ArrowLeft className="size-4" />
              <span>Explore Upcoming Events</span>
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16">
        <Container className="max-w-md text-center space-y-6">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertCircle className="size-8" />
          </div>
          <div className="space-y-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Unable to Load Event
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {error || "An unexpected error occurred while loading this event."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={handleRetry}
              variant="default"
              className="flex-1 h-11 rounded-xl font-semibold gap-2"
            >
              <RefreshCw className="size-4" />
              <span>Retry</span>
            </Button>
            <Link
              href="/upcoming-events"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex-1 h-11 rounded-xl font-semibold gap-2 border-border"
              )}
            >
              <ArrowLeft className="size-4" />
              <span>Back to Events</span>
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  const badgeVariant = getBadgeVariant(event.eventType)
  const formattedDate = formatEventDate(event.eventDate)
  const formattedTime = formatEventTime(event.eventDate)
  const postedDate = formatPostedDate(event.createdAt)
  const organizer = getOrganizerInfo(event.createdBy)

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <Container className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground"
          >
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Home className="size-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/60" />
            <Link
              href="/upcoming-events"
              className="hover:text-foreground transition-colors"
            >
              Upcoming Events
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/60" />
            <span className="font-medium text-foreground truncate max-w-[200px] sm:max-w-xs">
              {event.title}
            </span>
          </nav>

          <Link
            href="/upcoming-events"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1.5 text-xs text-muted-foreground hover:text-foreground -mr-2"
            )}
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to All Events</span>
          </Link>
        </div>

        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border shadow-md bg-muted">
          <Image
            src={
              event.imageUrl ||
              "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80"
            }
            alt={event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
            <Badge
              variant={badgeVariant}
              className="px-3.5 py-1 text-xs font-semibold shadow-xs"
            >
              {event.eventType}
            </Badge>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 text-white px-3 py-1 text-xs font-semibold backdrop-blur-xs">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              <span>Active Event</span>
            </span>
          </div>

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleShare}
              className="size-9 p-0 rounded-full bg-background/80 hover:bg-background backdrop-blur-xs shadow-xs"
              aria-label="Share event"
            >
              <Share2 className="size-4" />
            </Button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-2">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight line-clamp-2 drop-shadow-sm">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-white/90">
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4 text-emerald-300 shrink-0" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="size-4 text-emerald-300 shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
              {event.joinedCount !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Users className="size-4 text-emerald-300 shrink-0" />
                  <span>{event.joinedCount} Volunteers</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-3">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                  About This Event
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/70 space-y-4">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Event Highlights & Schedule
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3.5 p-4 rounded-xl border border-border/80 bg-background/60">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Calendar className="size-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                        Date & Day
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {formattedDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl border border-border/80 bg-background/60">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Clock className="size-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                        Starting Time
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {formattedTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl border border-border/80 bg-background/60">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Tag className="size-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                        Cause Category
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {event.eventType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl border border-border/80 bg-background/60">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Sparkles className="size-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                        Participation
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        Open to All Volunteers
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {postedDate && (
                <div className="pt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span>Organized and published on {postedDate}</span>
                </div>
              )}
            </Card>

            <Card className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Gathering Point & Location
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Community service event venue
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/50 border border-border/60 space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {event.location}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Please arrive 15 minutes before the start time at the assembly area.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="rounded-2xl border-2 border-primary/30 bg-card p-6 shadow-sm space-y-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <HeartHandshake className="size-3.5" />
                  <span>Make An Impact</span>
                </div>
                <CardTitle className="font-heading text-xl font-bold text-foreground">
                  Join This Event
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Connect with fellow volunteers and help strengthen local communities through hands-on service.
                </p>
              </div>

              {event.joinedCount !== undefined && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/60 text-xs text-foreground font-medium">
                  <Users className="size-4 text-primary shrink-0" />
                  <span>
                    <strong className="text-primary font-bold">
                      {event.joinedCount + (hasJoined ? 1 : 0)}
                    </strong>{" "}
                    people have registered for this event
                  </span>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  onClick={handleJoinClick}
                  disabled={isJoining || hasJoined}
                  variant={hasJoined ? "outline" : "default"}
                  className={`w-full h-12 rounded-xl font-semibold gap-2 transition-all ${
                    hasJoined
                      ? "border-emerald-600/30 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 cursor-not-allowed"
                      : "shadow-xs"
                  }`}
                >
                  {isJoining ? (
                    <>
                      <RefreshCw className="size-4 animate-spin" />
                      <span>Joining Event...</span>
                    </>
                  ) : hasJoined ? (
                    <>
                      <CheckCircle2 className="size-5 text-emerald-600" />
                      <span>Already Joined</span>
                    </>
                  ) : (
                    <>
                      <HeartHandshake className="size-5" />
                      <span>Join Community Event</span>
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-center text-muted-foreground leading-normal">
                  {hasJoined
                    ? "You are registered for this community initiative. View all your registrations on the Joined Events page."
                    : "Free and open to all volunteers. You must be signed in to join."}
                </p>
              </div>

              <div className="pt-3 border-t border-border/60 space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="size-3.5 text-primary shrink-0" />
                  <span>Open to individuals and families</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="size-3.5 text-primary shrink-0" />
                  <span>Tools and materials provided on-site</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="size-3.5 text-primary shrink-0" />
                  <span>Volunteer appreciation recognition</span>
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
              <CardHeader className="p-0 pb-1">
                <h3 className="font-heading text-base font-semibold text-foreground">
                  Event Organizer
                </h3>
              </CardHeader>
              <CardContent className="p-0 space-y-3.5">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 border border-border shadow-xs">
                    {organizer.image && (
                      <AvatarImage src={organizer.image} alt={organizer.name} />
                    )}
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {organizer.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-foreground">
                      {organizer.name}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-primary font-medium">
                      <ShieldCheck className="size-3.5" />
                      <span>Verified Community Host</span>
                    </div>
                  </div>
                </div>

                {organizer.email && (
                  <p className="text-xs text-muted-foreground break-all">
                    Contact: {organizer.email}
                  </p>
                )}

                <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                  Responsible for organizing schedules, coordinating volunteer roles, and ensuring event safety.
                </p>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-2.5">
              <Link
                href="/upcoming-events"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full h-11 rounded-xl text-xs font-semibold gap-2 border-border"
                )}
              >
                <ArrowLeft className="size-3.5" />
                <span>Explore More Events</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

