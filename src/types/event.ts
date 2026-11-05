export type EventCategory =
  | "Cleanup"
  | "Plantation"
  | "Donation"
  | "Education"
  | "Healthcare"
  | "Other"

export interface EventOrganizer {
  userId?: string
  name?: string
  email?: string
  image?: string
}

export interface Event {
  _id: string
  title: string
  description: string
  eventType: EventCategory | string
  imageUrl: string
  location: string
  eventDate: string | Date
  createdBy?: string | EventOrganizer
  createdAt?: string | Date
  joinedCount?: number
  status?: string
}

export interface CreateEventInput {
  title: string
  description: string
  eventType: EventCategory | string
  imageUrl: string
  location: string
  eventDate: string
}

export interface EventPagination {
  currentPage: number
  totalPages: number
  totalEvents: number
  limit: number
}

export interface EventsResponse {
  events: Event[]
  pagination: EventPagination
}

export interface GetEventsParams {
  search?: string
  eventType?: string
  location?: string
  sort?: "nearest" | "latest" | string
  page?: number
  limit?: number
}
