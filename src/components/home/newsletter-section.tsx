"use client"

import * as React from "react"
import { Mail, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { Container } from "@/components/shared/container"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { Button } from "@/components/ui/button"

export function NewsletterSection() {
  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmed = email.trim()
    if (!trimmed) {
      toast.error("Please enter your email address.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) {
      toast.error("Please enter a valid email address.")
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setEmail("")
      toast.success("Thank you for subscribing to TogetherWeCare updates!")
    }, 600)
  }

  return (
    <SectionWrapper variant="muted">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-[#14532D] p-8 sm:p-12 lg:p-16 text-white shadow-lg">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-white/10 text-emerald-300 mx-auto shadow-inner">
              <Mail className="size-7" />
            </div>

            <div className="space-y-3">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Stay Connected. Make a Difference.
              </h2>
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl mx-auto">
                Get updates about upcoming community initiatives, volunteering opportunities and meaningful ways to support your local community.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto w-full"
            >
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4 text-emerald-200">
                  <Mail className="size-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-12 w-full rounded-xl border border-white/20 bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-emerald-200/70 outline-none transition-colors focus:border-white focus:bg-white/15"
                />
              </div>
              <Button
                type="submit"
                loading={loading}
                className="h-12 w-full sm:w-auto shrink-0 rounded-xl bg-white text-[#14532D] hover:bg-emerald-50 px-6 font-semibold shadow-xs"
              >
                Subscribe
              </Button>
            </form>

            <div className="flex items-center justify-center gap-2 text-xs text-emerald-200/80">
              <CheckCircle2 className="size-3.5 text-emerald-300" />
              <span>Stay inspired. We respect your privacy and won&apos;t send unnecessary emails.</span>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}

