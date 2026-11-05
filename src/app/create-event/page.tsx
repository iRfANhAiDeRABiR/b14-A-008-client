import { requireAuth } from "@/lib/auth-guard"
import { Container } from "@/components/shared/container"
import { PlusCircle } from "lucide-react"

export default async function CreateEventPage() {
  const { user } = await requireAuth("/create-event")

  return (
    <div className="min-h-[70vh] py-12 sm:py-16">
      <Container className="max-w-3xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <PlusCircle className="size-5" />
          </div>
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Create Community Event
            </h1>
            <p className="text-sm text-muted-foreground">
              Signed in as {user.name} ({user.email})
            </p>
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-border bg-card">
          <p className="text-sm text-muted-foreground">
            The event creation workspace will be built in the upcoming milestone.
          </p>
        </div>
      </Container>
    </div>
  )
}

