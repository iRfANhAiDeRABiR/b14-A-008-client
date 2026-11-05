import { Sparkles } from "lucide-react"
import { requireAuth } from "@/lib/auth-guard"
import { Container } from "@/components/shared/container"
import { CreateEventForm } from "@/components/events/create-event-form"

export default async function CreateEventPage() {
  await requireAuth("/create-event")

  return (
    <div className="min-h-screen bg-background py-10 sm:py-16">
      <Container className="max-w-3xl space-y-8">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            <span>Community Action</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Create a Community Event
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
            Bring people together and turn your ideas into meaningful community action.
          </p>
        </div>

        <CreateEventForm />
      </Container>
    </div>
  )
}
