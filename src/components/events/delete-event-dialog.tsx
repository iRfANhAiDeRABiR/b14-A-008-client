"use client"

import * as React from "react"
import { Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { getTokenFromClient } from "@/lib/getTokenFromClient"
import { deleteEvent } from "@/lib/api"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface DeleteEventDialogProps {
  eventId: string
  eventTitle: string
  onDeleted: (id: string) => void
}

export function DeleteEventDialog({
  eventId,
  eventTitle,
  onDeleted,
}: DeleteEventDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const token = await getTokenFromClient()
      await deleteEvent(eventId, token)
      toast.success("Your event has been deleted successfully.")
      setOpen(false)
      onDeleted(eventId)
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete event. Please try again."
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 gap-1.5 text-xs font-semibold text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
          >
            <Trash2 className="size-3.5" />
            <span>Delete</span>
          </Button>
        }
      />
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-heading text-lg font-bold text-foreground">
            Delete This Event?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to delete &ldquo;{eventTitle}&rdquo;? This action cannot be undone and will permanently remove the event from our platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
          <AlertDialogCancel
            disabled={isDeleting}
            className="h-10 rounded-xl border-border"
          >
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-10 rounded-xl font-semibold gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Event</span>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

