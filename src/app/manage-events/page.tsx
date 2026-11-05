import { CalendarCheck } from "lucide-react"
import { requireAuth } from "@/lib/auth-guard"
import { Container } from "@/components/shared/container"
import { ManageEventsView } from "@/components/events/manage-events-view"

export default async function ManageEventsPage() {
  await requireAuth("/manage-events")

  return (
    <div className="min-h-screen bg-background py-10 sm:py-16">
      <Container className="space-y-8">
        <div className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <CalendarCheck className="size-3.5" />
            <span>Event Management</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Manage Your Events
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Keep your community initiatives organized. Update event details or manage activities you have created.
          </p>
        </div>

        <ManageEventsView />
      </Container>
    </div>
  )
}
