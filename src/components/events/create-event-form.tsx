"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  Calendar,
  MapPin,
  Tag,
  Image as ImageIcon,
  FileText,
  Type,
  Loader2,
  AlertCircle,
  ImageOff,
  ChevronDown,
} from "lucide-react"
import { getTokenFromClient } from "@/lib/getTokenFromClient"
import { createEvent } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function getTomorrowDateString(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const year = tomorrow.getFullYear()
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0")
  const day = String(tomorrow.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const EVENT_CATEGORIES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Healthcare",
  "Other",
] as const

const createEventSchema = z.object({
  title: z
    .string()
    .min(1, "Event title is required.")
    .min(5, "Event title must be at least 5 characters long.")
    .max(100, "Event title cannot exceed 100 characters."),
  description: z
    .string()
    .min(1, "Event description is required.")
    .min(20, "Event description must be at least 20 characters long.")
    .max(2000, "Event description cannot exceed 2000 characters."),
  eventType: z
    .string()
    .min(1, "Please select an event category.")
    .refine(
      (val) => EVENT_CATEGORIES.includes(val as (typeof EVENT_CATEGORIES)[number]),
      "Please select a valid event category."
    ),
  imageUrl: z
    .string()
    .min(1, "Thumbnail image URL is required.")
    .url("Please enter a valid image URL."),
  location: z
    .string()
    .min(1, "Event location is required.")
    .min(3, "Location must be at least 3 characters long.")
    .max(150, "Location cannot exceed 150 characters."),
  eventDate: z
    .string()
    .min(1, "Event date is required.")
    .refine((val) => {
      if (!val) return false
      const [year, month, day] = val.split("-").map(Number)
      if (!year || !month || !day) return false
      const selected = new Date(year, month - 1, day, 0, 0, 0, 0).getTime()
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      return selected >= tomorrow.getTime()
    }, "Event date must be in the future (starting from tomorrow)."),
})

export type CreateEventFormValues = z.infer<typeof createEventSchema>

export function CreateEventForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [failedImageUrl, setFailedImageUrl] = React.useState<string | null>(null)
  const tomorrowMin = React.useMemo(() => getTomorrowDateString(), [])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      eventType: "",
      imageUrl: "",
      location: "",
      eventDate: "",
    },
  })

  const watchImageUrl = useWatch({
    control,
    name: "imageUrl",
  })

  const isImageError = Boolean(
    watchImageUrl && failedImageUrl === watchImageUrl
  )

  const onSubmit = async (values: CreateEventFormValues) => {
    setIsSubmitting(true)
    try {
      const token = await getTokenFromClient()
      await createEvent(values, token)
      toast.success("Your community event has been created successfully!")
      router.push("/upcoming-events")
      router.refresh()
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to create event. Please verify your details and try again."
      )
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-sm">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1.5">
            <label
              htmlFor="title"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider"
            >
              <Type className="size-3.5 text-primary" />
              <span>
                Event Title <span className="text-destructive">*</span>
              </span>
            </label>
            <input
              id="title"
              type="text"
              disabled={isSubmitting}
              placeholder="e.g. Winter Clothes Distribution"
              {...register("title")}
              className={`h-11 w-full rounded-xl border bg-background px-3.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.title
                  ? "border-destructive focus:border-destructive"
                  : "border-border focus:border-primary"
              }`}
            />
            {errors.title && (
              <p className="flex items-center gap-1 text-xs text-destructive font-medium pt-0.5">
                <AlertCircle className="size-3.5 shrink-0" />
                <span>{errors.title.message}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label
                htmlFor="eventType"
                className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider"
              >
                <Tag className="size-3.5 text-primary" />
                <span>
                  Event Category <span className="text-destructive">*</span>
                </span>
              </label>
              <div className="relative">
                <select
                  id="eventType"
                  disabled={isSubmitting}
                  {...register("eventType")}
                  className={`h-11 w-full appearance-none rounded-xl border bg-background pl-3.5 pr-10 text-sm text-foreground transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.eventType
                      ? "border-destructive focus:border-destructive"
                      : "border-border focus:border-primary"
                  }`}
                >
                  <option value="">Select a category</option>
                  {EVENT_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.eventType && (
                <p className="flex items-center gap-1 text-xs text-destructive font-medium pt-0.5">
                  <AlertCircle className="size-3.5 shrink-0" />
                  <span>{errors.eventType.message}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="eventDate"
                className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider"
              >
                <Calendar className="size-3.5 text-primary" />
                <span>
                  Event Date <span className="text-destructive">*</span>
                </span>
              </label>
              <input
                id="eventDate"
                type="date"
                min={tomorrowMin}
                disabled={isSubmitting}
                {...register("eventDate")}
                className={`h-11 w-full rounded-xl border bg-background px-3.5 text-sm text-foreground transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                  errors.eventDate
                    ? "border-destructive focus:border-destructive"
                    : "border-border focus:border-primary"
                }`}
              />
              {errors.eventDate && (
                <p className="flex items-center gap-1 text-xs text-destructive font-medium pt-0.5">
                  <AlertCircle className="size-3.5 shrink-0" />
                  <span>{errors.eventDate.message}</span>
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="location"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider"
            >
              <MapPin className="size-3.5 text-primary" />
              <span>
                Event Location <span className="text-destructive">*</span>
              </span>
            </label>
            <input
              id="location"
              type="text"
              disabled={isSubmitting}
              placeholder="e.g. Mirpur 10, Dhaka"
              {...register("location")}
              className={`h-11 w-full rounded-xl border bg-background px-3.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.location
                  ? "border-destructive focus:border-destructive"
                  : "border-border focus:border-primary"
              }`}
            />
            {errors.location && (
              <p className="flex items-center gap-1 text-xs text-destructive font-medium pt-0.5">
                <AlertCircle className="size-3.5 shrink-0" />
                <span>{errors.location.message}</span>
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="imageUrl"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider"
            >
              <ImageIcon className="size-3.5 text-primary" />
              <span>
                Thumbnail Image URL <span className="text-destructive">*</span>
              </span>
            </label>
            <input
              id="imageUrl"
              type="url"
              disabled={isSubmitting}
              placeholder="https://example.com/community-event.jpg"
              {...register("imageUrl")}
              className={`h-11 w-full rounded-xl border bg-background px-3.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.imageUrl
                  ? "border-destructive focus:border-destructive"
                  : "border-border focus:border-primary"
              }`}
            />
            {errors.imageUrl && (
              <p className="flex items-center gap-1 text-xs text-destructive font-medium pt-0.5">
                <AlertCircle className="size-3.5 shrink-0" />
                <span>{errors.imageUrl.message}</span>
              </p>
            )}

            {watchImageUrl && (
              <div className="relative aspect-[16/9] w-full max-w-md overflow-hidden rounded-xl border border-border bg-muted/60 mt-3">
                {isImageError ? (
                  <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-xs text-muted-foreground">
                    <ImageOff className="size-6 text-muted-foreground/60 mb-1.5" />
                    <span>Unable to preview image. Please verify the URL.</span>
                  </div>
                ) : (
                  <Image
                    src={watchImageUrl}
                    alt="Event thumbnail preview"
                    fill
                    unoptimized
                    className="object-cover"
                    onError={() => setFailedImageUrl(watchImageUrl)}
                  />
                )}
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="description"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider"
            >
              <FileText className="size-3.5 text-primary" />
              <span>
                Event Description <span className="text-destructive">*</span>
              </span>
            </label>
            <textarea
              id="description"
              rows={5}
              disabled={isSubmitting}
              placeholder="Describe the purpose of your community event, activities and expected contribution..."
              {...register("description")}
              className={`w-full rounded-xl border bg-background p-3.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y leading-relaxed ${
                errors.description
                  ? "border-destructive focus:border-destructive"
                  : "border-border focus:border-primary"
              }`}
            />
            {errors.description && (
              <p className="flex items-center gap-1 text-xs text-destructive font-medium pt-0.5">
                <AlertCircle className="size-3.5 shrink-0" />
                <span>{errors.description.message}</span>
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              Published events will be visible on the public Upcoming Events discovery board.
            </p>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto h-11 px-8 rounded-xl font-semibold gap-2 shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Creating Event...</span>
                </>
              ) : (
                <span>Create Event</span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
