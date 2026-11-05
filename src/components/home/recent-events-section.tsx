"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, AlertCircle, RefreshCw, CalendarX } from "lucide-react"
import { Event } from "@/types/event"
import { getUpcomingEvents } from "@/lib/api"
import { EventCard } from "@/components/events/event-card"
import { EventGridSkeleton } from "@/components/shared/loading-skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function RecentEventsSection() {
  const [events, setEvents] = React.useState<Event[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const fetchEvents = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getUpcomingEvents(6)
      const now = new Date().setHours(0, 0, 0, 0)
      const futureEvents = data
        .filter((ev) => {
          const date = new Date(ev.eventDate).getTime()
          return !isNaN(date) && date >= now
        })
        .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
        .slice(0, 6)

      setEvents(futureEvents)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the events service right now."
      )
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  return (
    <SectionWrapper variant="default">
      <Container className="space-y-12">
        <SectionHeading
          badge="Get Involved"
          title="Upcoming Community Events"
          subtitle="Discover meaningful activities happening around your community and become part of something positive."
        />

        {loading ? (
          <EventGridSkeleton count={6} />
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-destructive/20 bg-destructive/5 text-center space-y-4 max-w-xl mx-auto">
            <div className="flex size-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <AlertCircle className="size-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Unable to Load Events
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The events server is currently not responding. Please check your network connection or try again.
              </p>
            </div>
            <Button
              onClick={fetchEvents}
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
            title="No Upcoming Events Yet"
            description="Be the first to create a community event and inspire others to make a difference."
            actionLabel="Create an Event"
            actionHref="/create-event"
          />
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>

            <div className="flex justify-center pt-2">
              <Link
                href="/upcoming-events"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 px-7 gap-2 rounded-xl border-border text-foreground hover:bg-secondary/60 hover:text-primary transition-all font-semibold"
                )}
              >
                <span>View All Events</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        )}
      </Container>
    </SectionWrapper>
  )
}

