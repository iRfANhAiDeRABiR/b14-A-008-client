import { Event, EventsResponse, GetEventsParams } from "@/types/event"

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

export async function getEvents(
  params: GetEventsParams = {}
): Promise<EventsResponse> {
  const query = new URLSearchParams()
  const page = params.page || 1
  const limit = params.limit || 9

  if (params.search?.trim()) {
    query.set("search", params.search.trim())
  }
  if (params.eventType && params.eventType !== "all") {
    query.set("eventType", params.eventType)
  }
  if (params.location?.trim()) {
    query.set("location", params.location.trim())
  }
  if (params.sort) {
    query.set("sort", params.sort)
  }
  query.set("page", page.toString())
  query.set("limit", limit.toString())

  const queryString = query.toString()
  const url = `${API_BASE_URL}/api/events${queryString ? `?${queryString}` : ""}`

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    if (data && typeof data === "object" && Array.isArray(data.events)) {
      return {
        events: data.events,
        pagination: {
          currentPage: data.pagination?.currentPage ?? page,
          totalPages: data.pagination?.totalPages ?? 1,
          totalEvents: data.pagination?.totalEvents ?? data.events.length,
          limit: data.pagination?.limit ?? limit,
        },
      }
    }

    if (data && typeof data === "object" && Array.isArray(data.data)) {
      return {
        events: data.data,
        pagination: {
          currentPage: data.currentPage ?? data.pagination?.currentPage ?? page,
          totalPages: data.totalPages ?? data.pagination?.totalPages ?? 1,
          totalEvents:
            data.total ??
            data.totalEvents ??
            data.pagination?.totalEvents ??
            data.data.length,
          limit: data.limit ?? data.pagination?.limit ?? limit,
        },
      }
    }

    if (Array.isArray(data)) {
      const now = new Date().setHours(0, 0, 0, 0)
      let list = data.filter((ev: Event) => {
        const time = new Date(ev.eventDate).getTime()
        return !isNaN(time) && time >= now
      })

      if (params.search?.trim()) {
        const s = params.search.trim().toLowerCase()
        list = list.filter(
          (ev: Event) =>
            ev.title?.toLowerCase().includes(s) ||
            ev.description?.toLowerCase().includes(s) ||
            ev.location?.toLowerCase().includes(s)
        )
      }

      if (params.eventType && params.eventType !== "all") {
        list = list.filter(
          (ev: Event) =>
            ev.eventType?.toLowerCase() === params.eventType?.toLowerCase()
        )
      }

      if (params.location?.trim()) {
        const loc = params.location.trim().toLowerCase()
        list = list.filter((ev: Event) =>
          ev.location?.toLowerCase().includes(loc)
        )
      }

      if (params.sort === "latest") {
        list.sort(
          (a: Event, b: Event) =>
            new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
        )
      } else {
        list.sort(
          (a: Event, b: Event) =>
            new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        )
      }

      const totalEvents = list.length
      const totalPages = Math.max(1, Math.ceil(totalEvents / limit))
      const startIndex = (page - 1) * limit
      const paginatedEvents = list.slice(startIndex, startIndex + limit)

      return {
        events: paginatedEvents,
        pagination: {
          currentPage: page,
          totalPages,
          totalEvents,
          limit,
        },
      }
    }

    return {
      events: [],
      pagination: {
        currentPage: page,
        totalPages: 1,
        totalEvents: 0,
        limit,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Unable to connect to the events server.")
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  if (!id || typeof id !== "string") {
    return null
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/events/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (res.status === 404) {
      return null
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch event: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    if (data && typeof data === "object") {
      if (data.event) {
        return data.event
      }
      if (data.data) {
        return data.data
      }
      if (data._id) {
        return data
      }
    }

    return null
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Unable to connect to the events server.")
  }
}
