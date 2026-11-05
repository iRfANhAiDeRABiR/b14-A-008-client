import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  PlusCircle,
  Users,
  MapPin,
  HeartHandshake,
  Sparkles,
} from "lucide-react"
import { Container } from "@/components/shared/container"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const trustIndicators = [
    {
      label: "Community Driven",
      icon: Users,
    },
    {
      label: "Local Initiatives",
      icon: MapPin,
    },
    {
      label: "Meaningful Impact",
      icon: HeartHandshake,
    },
  ]

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24 bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-semibold text-secondary-foreground shadow-xs">
              <Sparkles className="size-3.5 text-primary shrink-0" />
              <span>Together, We Make a Difference</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
                Small Actions. <br className="hidden sm:inline" />
                <span className="text-primary">Stronger Communities.</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Discover meaningful community initiatives, connect with passionate volunteers and take part in activities that make a real difference in people&apos;s lives.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/upcoming-events"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-12 px-6 gap-2 text-base font-semibold shadow-sm hover:shadow-md transition-all justify-center"
                )}
              >
                <span>Explore Events</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/create-event"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 px-6 gap-2 text-base font-semibold border-border hover:bg-secondary/60 transition-all justify-center"
                )}
              >
                <PlusCircle className="size-4 text-primary" />
                <span>Create an Event</span>
              </Link>
            </div>

            <div className="pt-6 border-t border-border grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
              {trustIndicators.map((indicator) => {
                const Icon = indicator.icon
                return (
                  <div key={indicator.label} className="flex items-center gap-2 sm:gap-2.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-foreground leading-tight">
                      {indicator.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80"
                  alt="Volunteers planting saplings and trees together in community service project"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="absolute -bottom-5 -left-3 sm:-bottom-7 sm:-left-5 max-w-[260px] sm:max-w-[280px] rounded-xl bg-card/95 backdrop-blur-md p-4 border border-border shadow-lg space-y-1.5">
                <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
                  <HeartHandshake className="size-4 shrink-0" />
                  <span>Volunteer Spirit</span>
                </div>
                <p className="font-heading text-sm font-semibold text-foreground leading-snug">
                  &ldquo;Be the reason someone smiles today.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
