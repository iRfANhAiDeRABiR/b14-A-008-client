"use client"

import * as React from "react"
import Link from "next/link"
import {
  Search,
  X,
  AlertCircle,
  RefreshCw,
  CalendarX,
  PlusCircle,
} from "lucide-react"
import { Event } from "@/types/event"
import { getMyEvents } from "@/lib/api"
import { getTokenFromClient } from "@/lib/getTokenFromClient"
import { ManageEventCard } from "@/components/events/manage-event-card"
import { EventGridSkeleton } from "@/components/shared/loading-skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import { Button, buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { cn } from "@/lib/utils"

export function ManageEventsView() {
  const [events, setEvents] = React.useState<Event[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [reloadKey, setReloadKey] = React.useState(0)
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        const token = await getTokenFromClient()
        const data = await getMyEvents(token)
        if (isMounted) {
          setEvents(data)
          setError(null)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load your events right now."
          )
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [reloadKey])

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    setReloadKey((prev) => prev + 1)
  }

  const handleEventUpdated = (updated: Event) => {
    setEvents((prev) =>
      prev.map((ev) => (ev._id === updated._id ? updated : ev))
    )
  }

  const handleEventDeleted = (deletedId: string) => {
    setEvents((prev) => prev.filter((ev) => ev._id !== deletedId))
  }

  const filteredEvents = React.useMemo(() => {
    if (!searchQuery.trim()) return events
    const query = searchQuery.trim().toLowerCase()
    return events.filter(
      (ev) =>
        ev.title?.toLowerCase().includes(query) ||
        ev.location?.toLowerCase().includes(query) ||
        ev.eventType?.toLowerCase().includes(query)
    )
  }, [events, searchQuery])

  return (
    <Container className="space-y-8">
      {!loading && !error && events.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-card shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, location or category..."
              className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-9 text-xs sm:text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5"
                aria-label="Clear filter"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-bold text-foreground">
                {filteredEvents.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-foreground">{events.length}</span>{" "}
              {events.length === 1 ? "event" : "events"}
            </p>

            <Link
              href="/create-event"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "h-9 px-3.5 rounded-xl font-semibold gap-1.5 shadow-xs shrink-0"
              )}
            >
              <PlusCircle className="size-4" />
              <span>Create Event</span>
            </Link>
          </div>
        </div>
      )}

      {loading ? (
        <EventGridSkeleton count={6} />
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl border border-destructive/20 bg-destructive/5 text-center space-y-4 max-w-xl mx-auto">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertCircle className="size-7" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              Unable to Load Your Events
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {error}
            </p>
          </div>
          <Button
            onClick={handleRetry}
            variant="outline"
            size="sm"
            className="gap-2 border-border"
          >
            <RefreshCw className="size-4" />
            <span>Retry</span>
          </Button>
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          icon={CalendarX}
          title="You Haven't Created Any Events Yet"
          description="Start making a difference in your community by organizing your first social development event."
          actionLabel="Create Your First Event"
          actionHref="/create-event"
        />
      ) : filteredEvents.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No Events Matching Search"
          description="We couldn't find any of your created events matching the search keyword. Try a different query."
          actionLabel="Clear Search"
          onAction={() => setSearchQuery("")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <ManageEventCard
              key={event._id}
              event={event}
              onUpdated={handleEventUpdated}
              onDeleted={handleEventDeleted}
            />
          ))}
        </div>
      )}
    </Container>
  )
}
