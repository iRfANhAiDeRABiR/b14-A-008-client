import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { format, isValid } from "date-fns"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { Event } from "@/types/event"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface EventCardProps {
  event: Event
  className?: string
  actions?: React.ReactNode
  extraBadge?: React.ReactNode
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

export function EventCard({ event, className, actions, extraBadge }: EventCardProps) {
  const badgeVariant = getBadgeVariant(event.eventType)
  const formattedDate = formatDate(event.eventDate)

  return (
    <Card
      className={cn(
        "group h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        className
      )}
    >
      <div>
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={event.imageUrl || "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={badgeVariant} className="shadow-xs backdrop-blur-xs font-semibold px-3 py-1">
              {event.eventType}
            </Badge>
          </div>
          {extraBadge && (
            <div className="absolute top-3 right-3 z-10">
              {extraBadge}
            </div>
          )}
        </div>

        <CardHeader className="p-5 pb-3 space-y-2">
          <CardTitle className="font-heading text-lg sm:text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {event.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
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

      <CardFooter className="p-5 pt-0">
        {actions ? (
          <div className="w-full flex items-center gap-2">{actions}</div>
        ) : (
          <Link
            href={`/events/${event._id}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full justify-between h-10 px-4 text-sm font-semibold rounded-xl group/btn"
            )}
          >
            <span>View Event</span>
            <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

