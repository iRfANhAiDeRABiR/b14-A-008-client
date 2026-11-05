import { EventGridSkeleton } from "@/components/shared/loading-skeleton"
import { Container } from "@/components/shared/container"
import { Skeleton } from "@/components/ui/skeleton"

export default function JoinedEventsLoading() {
  return (
    <div className="min-h-screen bg-background py-10 sm:py-16">
      <Container className="space-y-8">
        <div className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <EventGridSkeleton count={6} />
      </Container>
    </div>
  )
}

