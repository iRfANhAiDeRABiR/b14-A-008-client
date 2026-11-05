"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  User,
  Mail,
  Image as ImageIcon,
  Lock,
  Loader2,
  AlertCircle,
  ImageOff,
  Save,
} from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required.")
    .min(2, "Full name must be at least 2 characters long.")
    .max(50, "Full name cannot exceed 50 characters."),
  image: z
    .string()
    .url("Please enter a valid image URL.")
    .or(z.literal("")),
})

export type ProfileFormValues = z.infer<typeof profileSchema>

export interface ProfileUser {
  id: string
  name: string
  email: string
  image?: string | null
}

interface ProfileUpdateFormProps {
  user: ProfileUser
}

export function ProfileUpdateForm({ user }: ProfileUpdateFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [failedImageUrl, setFailedImageUrl] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      image: user.image || "",
    },
  })

  React.useEffect(() => {
    reset({
      name: user.name || "",
      image: user.image || "",
    })
  }, [user, reset])

  const watchImageUrl = useWatch({
    control,
    name: "image",
  })

  const isImageError = Boolean(
    watchImageUrl && failedImageUrl === watchImageUrl
  )

  const onSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true)
    try {
      const { error } = await authClient.updateUser({
        name: values.name.trim(),
        image: values.image.trim() || undefined,
      })

      if (error) {
        toast.error(
          error.message || "Failed to update profile. Please try again."
        )
        return
      }

      toast.success("Profile updated successfully!")
      router.refresh()
    } catch {
      toast.error("Unable to update profile. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="profile-name"
          className="flex items-center gap-2 text-xs font-semibold text-foreground uppercase tracking-wider"
        >
          <User className="size-3.5 text-primary" />
          <span>Full Name</span>
        </label>
        <input
          id="profile-name"
          type="text"
          disabled={isSubmitting}
          placeholder="Enter your full name"
          {...register("name")}
          className={`h-11 w-full rounded-xl border bg-background px-3.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            errors.name
              ? "border-destructive focus:border-destructive"
              : "border-border focus:border-primary"
          }`}
        />
        {errors.name && (
          <p className="flex items-center gap-1.5 text-xs text-destructive font-medium pt-0.5">
            <AlertCircle className="size-3.5 shrink-0" />
            <span>{errors.name.message}</span>
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="profile-email"
            className="flex items-center gap-2 text-xs font-semibold text-foreground uppercase tracking-wider"
          >
            <Mail className="size-3.5 text-muted-foreground" />
            <span>Email Address</span>
          </label>
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
            <Lock className="size-3" />
            <span>Read-only</span>
          </span>
        </div>
        <input
          id="profile-email"
          type="email"
          disabled
          value={user.email}
          className="h-11 w-full rounded-xl border border-border/80 bg-muted/50 px-3.5 text-sm text-muted-foreground cursor-not-allowed select-none"
        />
        <p className="text-[11px] text-muted-foreground">
          Email address is tied to your account authentication and cannot be changed here.
        </p>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="profile-image"
          className="flex items-center gap-2 text-xs font-semibold text-foreground uppercase tracking-wider"
        >
          <ImageIcon className="size-3.5 text-primary" />
          <span>Profile Photo URL</span>
        </label>
        <input
          id="profile-image"
          type="url"
          disabled={isSubmitting}
          placeholder="https://example.com/avatar.jpg"
          {...register("image")}
          className={`h-11 w-full rounded-xl border bg-background px-3.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            errors.image
              ? "border-destructive focus:border-destructive"
              : "border-border focus:border-primary"
          }`}
        />
        {errors.image && (
          <p className="flex items-center gap-1.5 text-xs text-destructive font-medium pt-0.5">
            <AlertCircle className="size-3.5 shrink-0" />
            <span>{errors.image.message}</span>
          </p>
        )}

        {watchImageUrl && (
          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-1.5 font-medium">
              Photo Preview
            </p>
            <div className="relative size-20 overflow-hidden rounded-2xl border-2 border-border bg-muted/60">
              {isImageError ? (
                <div className="flex h-full w-full flex-col items-center justify-center p-2 text-center text-[10px] text-muted-foreground">
                  <ImageOff className="size-4 text-muted-foreground/60 mb-0.5" />
                  <span>Broken URL</span>
                </div>
              ) : (
                <Image
                  src={watchImageUrl}
                  alt="Profile preview"
                  fill
                  unoptimized
                  className="object-cover"
                  onError={() => setFailedImageUrl(watchImageUrl)}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="w-full sm:w-auto h-11 px-7 rounded-xl font-semibold gap-2 shadow-xs"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="size-4" />
              <span>Save Changes</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

