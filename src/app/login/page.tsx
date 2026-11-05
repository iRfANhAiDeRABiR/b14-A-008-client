"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2, HeartHandshake, AlertCircle } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Container } from "@/components/shared/container"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required."),
})

type LoginFormValues = z.infer<typeof loginSchema>

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

function getSafeRedirectUrl(url: string | null): string {
  if (!url) return "/"
  if (url.startsWith("/") && !url.startsWith("//") && !url.startsWith("/\\")) {
    return url
  }
  return "/"
}

function LoginFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = getSafeRedirectUrl(
    searchParams.get("callbackUrl") || searchParams.get("returnUrl")
  )

  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true)
    try {
      const { data, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      })

      if (error) {
        toast.error(
          error.message || "Invalid email or password. Please try again."
        )
        setIsSubmitting(false)
        return
      }

      if (data) {
        toast.success("Welcome back! You have logged in successfully.")
        router.push(returnUrl)
        router.refresh()
      }
    } catch {
      toast.error("Unable to connect to the login service. Please try again.")
      setIsSubmitting(false)
    }
  }

  const handleGitHubLogin = async () => {
    setIsGitHubLoading(true)
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: returnUrl,
      })
    } catch {
      toast.error(
        "GitHub authentication failed. Please verify your credentials."
      )
      setIsGitHubLoading(false)
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <Container className="max-w-md w-full">
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs transition-transform group-hover:scale-105">
              <HeartHandshake className="size-6" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-foreground">
              Together<span className="text-primary">WeCare</span>
            </span>
          </Link>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Welcome Back!
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
            Sign in to discover community initiatives and continue making a difference.
          </p>
        </div>

        <Card className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
          <CardHeader className="p-0 pb-6">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting || isGitHubLoading}
              onClick={handleGitHubLogin}
              className="w-full h-11 rounded-xl border-border font-semibold gap-2.5 transition-all hover:bg-secondary/60 hover:text-foreground"
            >
              {isGitHubLoading ? (
                <Loader2 className="size-4 animate-spin text-primary" />
              ) : (
                <GitHubIcon className="size-4" />
              )}
              <span>Continue with GitHub</span>
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/70" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                <span className="bg-card px-3">Or continue with email</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-foreground uppercase tracking-wider"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  disabled={isSubmitting || isGitHubLoading}
                  placeholder="name@example.com"
                  {...register("email")}
                  className={`h-11 w-full rounded-xl border bg-background px-3.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.email
                      ? "border-destructive focus:border-destructive"
                      : "border-border focus:border-primary"
                  }`}
                />
                {errors.email && (
                  <p className="flex items-center gap-1 text-xs text-destructive font-medium pt-0.5">
                    <AlertCircle className="size-3.5 shrink-0" />
                    <span>{errors.email.message}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-foreground uppercase tracking-wider"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    disabled={isSubmitting || isGitHubLoading}
                    placeholder="••••••••"
                    {...register("password")}
                    className={`h-11 w-full rounded-xl border bg-background px-3.5 pr-10 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      errors.password
                        ? "border-destructive focus:border-destructive"
                        : "border-border focus:border-primary"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="flex items-center gap-1 text-xs text-destructive font-medium pt-0.5">
                    <AlertCircle className="size-3.5 shrink-0" />
                    <span>{errors.password.message}</span>
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isGitHubLoading}
                className="w-full h-11 rounded-xl font-semibold gap-2 mt-2 shadow-xs"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
            </form>

            <div className="pt-6 mt-6 border-t border-border/70 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-primary hover:underline transition-colors"
                >
                  Register
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

function LoginFormSkeleton() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-4">
        <div className="h-10 w-40 mx-auto rounded-xl bg-muted animate-pulse" />
        <div className="h-6 w-60 mx-auto rounded-md bg-muted animate-pulse" />
        <div className="h-80 w-full rounded-2xl bg-card border border-border animate-pulse" />
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={<LoginFormSkeleton />}>
      <LoginFormContent />
    </React.Suspense>
  )
}
