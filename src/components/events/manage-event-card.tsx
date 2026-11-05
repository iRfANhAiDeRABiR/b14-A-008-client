"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { format, isValid } from "date-fns"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { Event } from "@/types/event"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { EditEventDialog } from "@/components/events/edit-event-dialog"
import { DeleteEventDialog } from "@/components/events/delete-event-dialog"
import { cn } from "@/lib/utils"

interface ManageEventCardProps {
  event: Event
  onUpdated: (updated: Event) => void
  onDeleted: (id: string) => void
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

function formatDate(dateInput: string | Date | undefined): string {
  if (!dateInput) return "Date to be announced"
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput
  return isValid(date) ? format(date, "MMMM d, yyyy") : "Date to be announced"
}

export function ManageEventCard({
  event,
  onUpdated,
  onDeleted,
}: ManageEventCardProps) {
  const badgeVariant = getBadgeVariant(event.eventType)
  const formattedDate = formatDate(event.eventDate)

  const isUpcoming = React.useMemo(() => {
    if (!event.eventDate) return false
    const eventTime = new Date(event.eventDate).getTime()
    const todayMidnight = new Date().setHours(0, 0, 0, 0)
    return !isNaN(eventTime) && eventTime >= todayMidnight
  }, [event.eventDate])

  return (
    <Card className="group h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 hover:shadow-md">
      <div>
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={
              event.imageUrl ||
              "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
            }
            alt={event.title}
            fill
            unoptimized
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 z-10">
            <Badge
              variant={badgeVariant}
              className="shadow-xs backdrop-blur-xs font-semibold px-2.5 py-0.5 text-xs"
            >
              {event.eventType}
            </Badge>
          </div>

          <div className="absolute top-3 right-3 z-10">
            {isUpcoming ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/90 text-white px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-xs shadow-xs">
                <span className="size-1.5 rounded-full bg-white animate-pulse" />
                <span>Upcoming</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-zinc-600/90 text-white px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-xs shadow-xs">
                <span>Completed</span>
              </span>
            )}
          </div>
        </div>

        <CardHeader className="p-5 pb-3 space-y-1.5">
          <CardTitle className="font-heading text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {event.title}
          </CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </CardHeader>

        <CardContent className="p-5 pt-0 space-y-2 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-primary shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-primary shrink-0" />
            <span>{formattedDate}</span>
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-5 pt-2 border-t border-border/70 flex flex-wrap items-center justify-between gap-2">
        <Link
          href={`/events/${event._id}`}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "h-9 px-2.5 text-xs text-muted-foreground hover:text-foreground gap-1.5"
          )}
        >
          <ExternalLink className="size-3.5" />
          <span>View Details</span>
        </Link>

        <div className="flex items-center gap-2">
          <EditEventDialog event={event} onUpdated={onUpdated} />
          <DeleteEventDialog
            eventId={event._id}
            eventTitle={event.title}
            onDeleted={onDeleted}
          />
        </div>
      </CardFooter>
    </Card>
  )
}

