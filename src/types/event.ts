export type EventCategory =
  | "Cleanup"
  | "Plantation"
  | "Donation"
  | "Education"
  | "Healthcare"
  | "Other"

export interface Event {
  _id: string
  title: string
  description: string
  eventType: EventCategory | string
  imageUrl: string
  location: string
  eventDate: string | Date
  createdBy?: string
  createdAt?: string | Date
  joinedCount?: number
}

