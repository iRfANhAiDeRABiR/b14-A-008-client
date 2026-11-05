"use client"

import * as React from "react"
import Image from "next/image"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  Pencil,
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
import { Event } from "@/types/event"
import { getTokenFromClient } from "@/lib/getTokenFromClient"
import { updateEvent } from "@/lib/api"
import { getTomorrowDateString } from "@/components/events/create-event-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const EVENT_CATEGORIES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Healthcare",
  "Other",
] as const

const editEventSchema = z.object({
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

export type EditEventFormValues = z.infer<typeof editEventSchema>

interface EditEventDialogProps {
  event: Event
  onUpdated: (updated: Event) => void
}

function formatInitialDate(dateInput: string | Date | undefined): string {
  if (!dateInput) return ""
  try {
    const d = new Date(dateInput)
    return d.toISOString().split("T")[0]
  } catch {
    return ""
  }
}

export function EditEventDialog({ event, onUpdated }: EditEventDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [failedImageUrl, setFailedImageUrl] = React.useState<string | null>(null)
  const tomorrowMin = React.useMemo(() => getTomorrowDateString(), [])

  const initialDateStr = React.useMemo(
    () => formatInitialDate(event.eventDate),
    [event.eventDate]
  )

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditEventFormValues>({
    resolver: zodResolver(editEventSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      imageUrl: event.imageUrl,
      location: event.location,
      eventDate: initialDateStr,
    },
  })

  React.useEffect(() => {
    if (open) {
      reset({
        title: event.title,
        description: event.description,
        eventType: event.eventType,
        imageUrl: event.imageUrl,
        location: event.location,
        eventDate: formatInitialDate(event.eventDate),
      })
    }
  }, [open, event, reset])

  const watchImageUrl = useWatch({
    control,
    name: "imageUrl",
  })

  const isImageError = Boolean(
    watchImageUrl && failedImageUrl === watchImageUrl
  )

  const onSubmit = async (values: EditEventFormValues) => {
    setIsSubmitting(true)
    try {
      const token = await getTokenFromClient()
      const updated = await updateEvent(event._id, values, token)
      toast.success("Your event has been updated successfully!")
      setOpen(false)
      onUpdated({ ...event, ...values, ...updated })
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update event. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 gap-1.5 text-xs font-semibold border-border hover:bg-secondary/60 hover:text-foreground"
          >
            <Pencil className="size-3.5 text-primary" />
            <span>Edit</span>
          </Button>
        }
      />
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <DialogHeader className="pb-2">
          <DialogTitle className="font-heading text-xl font-bold text-foreground">
            Edit Event
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Update the details for &ldquo;{event.title}&rdquo;.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2">
          <div className="space-y-1.5">
            <label
              htmlFor="edit-title"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider"
            >
              <Type className="size-3.5 text-primary" />
              <span>Event Title</span>
            </label>
            <input
              id="edit-title"
              type="text"
              disabled={isSubmitting}
              placeholder="e.g. Winter Clothes Distribution"
              {...register("title")}
              className={`h-10 w-full rounded-xl border bg-background px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="edit-eventType"
                className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider"
              >
                <Tag className="size-3.5 text-primary" />
                <span>Event Category</span>
              </label>
              <div className="relative">
                <select
                  id="edit-eventType"
                  disabled={isSubmitting}
                  {...register("eventType")}
                  className={`h-10 w-full appearance-none rounded-xl border bg-background pl-3 pr-9 text-sm text-foreground transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.eventType
                      ? "border-destructive focus:border-destructive"
                      : "border-border focus:border-primary"
                  }`}
                >
                  {EVENT_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
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
                htmlFor="edit-eventDate"
                className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider"
              >
                <Calendar className="size-3.5 text-primary" />
                <span>Event Date</span>
              </label>
              <input
                id="edit-eventDate"
                type="date"
                min={tomorrowMin}
                disabled={isSubmitting}
                {...register("eventDate")}
                className={`h-10 w-full rounded-xl border bg-background px-3 text-sm text-foreground transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 ${
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
              htmlFor="edit-location"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider"
            >
              <MapPin className="size-3.5 text-primary" />
              <span>Location</span>
            </label>
            <input
              id="edit-location"
              type="text"
              disabled={isSubmitting}
              placeholder="e.g. Mirpur 10, Dhaka"
              {...register("location")}
              className={`h-10 w-full rounded-xl border bg-background px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${
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
              htmlFor="edit-imageUrl"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider"
            >
              <ImageIcon className="size-3.5 text-primary" />
              <span>Thumbnail Image URL</span>
            </label>
            <input
              id="edit-imageUrl"
              type="url"
              disabled={isSubmitting}
              placeholder="https://example.com/event.jpg"
              {...register("imageUrl")}
              className={`h-10 w-full rounded-xl border bg-background px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${
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
              <div className="relative aspect-[16/9] w-full max-w-xs overflow-hidden rounded-xl border border-border bg-muted/60 mt-2">
                {isImageError ? (
                  <div className="flex h-full w-full flex-col items-center justify-center p-3 text-center text-xs text-muted-foreground">
                    <ImageOff className="size-5 text-muted-foreground/60 mb-1" />
                    <span>Unable to preview image</span>
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
              htmlFor="edit-description"
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider"
            >
              <FileText className="size-3.5 text-primary" />
              <span>Event Description</span>
            </label>
            <textarea
              id="edit-description"
              rows={4}
              disabled={isSubmitting}
              placeholder="Describe event details..."
              {...register("description")}
              className={`w-full rounded-xl border bg-background p-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y leading-relaxed ${
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

          <div className="pt-3 border-t border-border/70 flex justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => setOpen(false)}
              className="h-10 px-4 rounded-xl border-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 px-6 rounded-xl font-semibold gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Updating Event...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

