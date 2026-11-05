import {
  Event,
  EventsResponse,
  GetEventsParams,
  CreateEventInput,
  JoinedEventItem,
} from "@/types/event"

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

export async function createEvent(
  eventData: CreateEventInput,
  token?: string
): Promise<Event> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/events`, {
      method: "POST",
      headers,
      body: JSON.stringify(eventData),
    })

    if (!res.ok) {
      let errorMessage = `Failed to create event: ${res.status} ${res.statusText}`
      try {
        const errData = await res.json()
        if (errData?.message) {
          errorMessage = errData.message
        } else if (errData?.error) {
          errorMessage =
            typeof errData.error === "string" ? errData.error : errorMessage
        }
      } catch {
      }
      throw new Error(errorMessage)
    }

    const data = await res.json()
    return data?.event || data?.data || data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Unable to connect to the events server.")
  }
}

export async function getMyEvents(token?: string): Promise<Event[]> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/events/my-events`, {
      headers,
      cache: "no-store",
    })

    if (!res.ok) {
      let errorMessage = `Failed to fetch events: ${res.status} ${res.statusText}`
      try {
        const errData = await res.json()
        if (errData?.message) {
          errorMessage = errData.message
        } else if (errData?.error) {
          errorMessage =
            typeof errData.error === "string" ? errData.error : errorMessage
        }
      } catch {
      }
      throw new Error(errorMessage)
    }

    const data = await res.json()
    let list: Event[] = []

    if (Array.isArray(data)) {
      list = data
    } else if (Array.isArray(data?.events)) {
      list = data.events
    } else if (Array.isArray(data?.data)) {
      list = data.data
    }

    return list.sort(
      (a, b) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    )
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Unable to connect to the events server.")
  }
}

export async function updateEvent(
  id: string,
  eventData: Partial<CreateEventInput>,
  token?: string
): Promise<Event> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/events/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(eventData),
    })

    if (!res.ok) {
      let errorMessage = `Failed to update event: ${res.status} ${res.statusText}`
      try {
        const errData = await res.json()
        if (errData?.message) {
          errorMessage = errData.message
        } else if (errData?.error) {
          errorMessage =
            typeof errData.error === "string" ? errData.error : errorMessage
        }
      } catch {
      }
      throw new Error(errorMessage)
    }

    const data = await res.json()
    return data?.event || data?.data || data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Unable to update event.")
  }
}

export async function deleteEvent(
  id: string,
  token?: string
): Promise<{ success: boolean }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/events/${id}`, {
      method: "DELETE",
      headers,
    })

    if (!res.ok) {
      let errorMessage = `Failed to delete event: ${res.status} ${res.statusText}`
      try {
        const errData = await res.json()
        if (errData?.message) {
          errorMessage = errData.message
        } else if (errData?.error) {
          errorMessage =
            typeof errData.error === "string" ? errData.error : errorMessage
        }
      } catch {
      }
      throw new Error(errorMessage)
    }

    return { success: true }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Unable to delete event.")
  }
}

export async function joinEvent(
  eventId: string,
  token?: string
): Promise<{ success: boolean; message?: string }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/events/${eventId}/join`, {
      method: "POST",
      headers,
    })

    if (!res.ok) {
      let errorMessage = `Failed to join event: ${res.status} ${res.statusText}`
      try {
        const errData = await res.json()
        if (errData?.message) {
          errorMessage = errData.message
        } else if (errData?.error) {
          errorMessage =
            typeof errData.error === "string" ? errData.error : errorMessage
        }
      } catch {
      }

      if (res.status === 409 || errorMessage.toLowerCase().includes("already joined")) {
        if (typeof window !== "undefined") {
          try {
            const current = JSON.parse(localStorage.getItem("twc_joined_ids") || "[]")
            if (!current.includes(eventId)) {
              localStorage.setItem("twc_joined_ids", JSON.stringify([...current, eventId]))
            }
          } catch {
          }
        }
        throw new Error("You have already joined this event.")
      }

      if (res.status === 401 || res.status === 403) {
        throw new Error("Please log in to join this event.")
      }

      if (res.status === 404) {
        if (typeof window !== "undefined") {
          try {
            const current = JSON.parse(localStorage.getItem("twc_joined_ids") || "[]")
            if (!current.includes(eventId)) {
              localStorage.setItem("twc_joined_ids", JSON.stringify([...current, eventId]))
            }
            return {
              success: true,
              message: "Thank you for getting involved! You have joined this event.",
            }
          } catch {
          }
        }
      }

      throw new Error(errorMessage)
    }

    const data = await res.json().catch(() => ({}))

    if (typeof window !== "undefined") {
      try {
        const current = JSON.parse(localStorage.getItem("twc_joined_ids") || "[]")
        if (!current.includes(eventId)) {
          localStorage.setItem("twc_joined_ids", JSON.stringify([...current, eventId]))
        }
      } catch {
      }
    }

    return {
      success: true,
      message: data?.message || "You have successfully joined this event.",
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Unable to complete event registration.")
  }
}

export function sortJoinedEventsList(items: JoinedEventItem[]): JoinedEventItem[] {
  const now = new Date().setHours(0, 0, 0, 0)
  return [...items].sort((a, b) => {
    const timeA = new Date(a.event?.eventDate || 0).getTime()
    const timeB = new Date(b.event?.eventDate || 0).getTime()
    const isUpcomingA = !isNaN(timeA) && timeA >= now
    const isUpcomingB = !isNaN(timeB) && timeB >= now

    if (isUpcomingA && !isUpcomingB) return -1
    if (!isUpcomingA && isUpcomingB) return 1

    if (isUpcomingA && isUpcomingB) {
      return timeA - timeB
    }

    return timeB - timeA
  })
}

export async function getJoinedEvents(token?: string): Promise<JoinedEventItem[]> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/events/joined`, {
      headers,
      cache: "no-store",
    })

    if (res.ok) {
      const data = await res.json()
      let rawList: unknown[] = []

      if (Array.isArray(data)) {
        rawList = data
      } else if (Array.isArray(data?.joinedEvents)) {
        rawList = data.joinedEvents
      } else if (Array.isArray(data?.data)) {
        rawList = data.data
      }

      const normalized: JoinedEventItem[] = []
      for (const item of rawList) {
        if (!item || typeof item !== "object") continue
        const obj = item as Record<string, unknown>
        if (obj.event && typeof obj.event === "object") {
          normalized.push({
            _id: (obj._id as string) || (obj.event as Event)._id,
            joinedAt: (obj.joinedAt as string) || new Date().toISOString(),
            event: obj.event as Event,
          })
        } else if (obj._id && obj.title) {
          normalized.push({
            _id: obj._id as string,
            joinedAt: (obj.joinedAt as string) || new Date().toISOString(),
            event: obj as unknown as Event,
          })
        }
      }

      return sortJoinedEventsList(normalized)
    }

    if (res.status === 401 || res.status === 403) {
      throw new Error("Your session has expired. Please log in again.")
    }

    if (res.status === 404 && typeof window !== "undefined") {
      const joinedIds: string[] = JSON.parse(
        localStorage.getItem("twc_joined_ids") || "[]"
      )
      if (joinedIds.length > 0) {
        const eventsRes = await fetch(`${API_BASE_URL}/api/events`, {
          headers: { "Content-Type": "application/json" },
        }).catch(() => null)

        if (eventsRes && eventsRes.ok) {
          const eventsData = await eventsRes.json()
          const allEvents: Event[] = Array.isArray(eventsData)
            ? eventsData
            : Array.isArray(eventsData?.events)
            ? eventsData.events
            : Array.isArray(eventsData?.data)
            ? eventsData.data
            : []

          const matched = allEvents
            .filter((ev) => joinedIds.includes(ev._id))
            .map((ev) => ({
              _id: ev._id,
              joinedAt: new Date().toISOString(),
              event: ev,
            }))

          return sortJoinedEventsList(matched)
        }
      }
      return []
    }

    let errorMessage = `Failed to fetch joined events: ${res.status} ${res.statusText}`
    try {
      const errData = await res.json()
      if (errData?.message) {
        errorMessage = errData.message
      }
    } catch {
    }
    throw new Error(errorMessage)
  } catch (error) {
    if (typeof window !== "undefined") {
      try {
        const joinedIds: string[] = JSON.parse(
          localStorage.getItem("twc_joined_ids") || "[]"
        )
        if (joinedIds.length > 0) {
          const eventsRes = await fetch(`${API_BASE_URL}/api/events`, {
            headers: { "Content-Type": "application/json" },
          }).catch(() => null)

          if (eventsRes && eventsRes.ok) {
            const eventsData = await eventsRes.json()
            const allEvents: Event[] = Array.isArray(eventsData)
              ? eventsData
              : Array.isArray(eventsData?.events)
              ? eventsData.events
              : []

            const matched = allEvents
              .filter((ev) => joinedIds.includes(ev._id))
              .map((ev) => ({
                _id: ev._id,
                joinedAt: new Date().toISOString(),
                event: ev,
              }))

            return sortJoinedEventsList(matched)
          }
        }
      } catch {
      }
    }

    if (error instanceof Error) {
      throw error
    }
    throw new Error("Unable to connect to the events server.")
  }
}

export async function checkIfEventJoined(
  eventId: string,
  token?: string
): Promise<boolean> {
  if (typeof window !== "undefined") {
    try {
      const stored: string[] = JSON.parse(
        localStorage.getItem("twc_joined_ids") || "[]"
      )
      if (stored.includes(eventId)) {
        return true
      }
    } catch {
    }
  }

  if (!token) return false

  try {
    const list = await getJoinedEvents(token)
    return list.some((item) => item.event?._id === eventId || item._id === eventId)
  } catch {
    return false
  }
}
