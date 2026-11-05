import { Event } from "@/types/event"

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export async function getUpcomingEvents(limit: number = 6): Promise<Event[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/events?limit=${limit}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    if (!Array.isArray(data)) {
      if (Array.isArray(data?.events)) {
        return data.events
      }
      if (Array.isArray(data?.data)) {
        return data.data
      }
      return []
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Unable to connect to the events server.")
  }
}

