import { Metadata } from "next"
import { getEventById } from "@/lib/api"
import { EventDetailsView } from "@/components/events/event-details-view"

interface EventPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const event = await getEventById(id)
    if (event?.title) {
      return {
        title: `${event.title} | TogetherWeCare`,
        description:
          event.description ||
          "Join this community service event on TogetherWeCare.",
      }
    }
  } catch {
  }

  return {
    title: "Event Details | TogetherWeCare",
    description:
      "Find meaningful community activities, connect with volunteers and become part of positive change.",
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params
  return <EventDetailsView id={id} />
}

