import * as React from "react"
import {
  CalendarPlus,
  Search,
  Users,
  ClipboardCheck,
  HeartHandshake,
  Sprout,
  GraduationCap,
} from "lucide-react"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionWrapper } from "@/components/shared/section-wrapper"

export function FeaturesSection() {
  const features = [
    {
      title: "Create an Event",
      description:
        "Organize local social initiatives and invite your community to participate in meaningful activities.",
      icon: CalendarPlus,
    },
    {
      title: "Discover Opportunities",
      description:
        "Find upcoming community events, environmental activities and social development initiatives near you.",
      icon: Search,
    },
    {
      title: "Join the Movement",
      description:
        "Connect with people who share your passion and take part in activities that make a positive difference.",
      icon: Users,
    },
    {
      title: "Track Your Impact",
      description:
        "Keep track of the events you join and stay connected with your community activities.",
      icon: ClipboardCheck,
    },
  ]

  const impactHighlights = [
    {
      title: "Local Community Support",
      description:
        "Assisting underprivileged families and vulnerable neighbors through winter clothes drives, food relief, and mutual aid.",
      icon: HeartHandshake,
    },
    {
      title: "Environmental Responsibility",
      description:
        "Spearheading neighborhood tree plantations, public park cleanups, and waste reduction drives for greener cities.",
      icon: Sprout,
    },
    {
      title: "Social Development",
      description:
        "Fostering education programs, blood donation camps, and community workshops that empower local residents.",
      icon: GraduationCap,
    },
  ]

  return (
    <SectionWrapper variant="muted">
      <Container className="space-y-16 sm:space-y-20">
        <div className="space-y-12">
          <SectionHeading
            badge="Platform Features"
            title="Small Actions, Meaningful Impact"
            subtitle="Making community service easier, more accessible and more meaningful for everyone."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center rounded-full bg-secondary px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
              Community Impact
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Together, We Can Make a Difference
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Real change begins when people come together. Every volunteer, every initiative and every small act of kindness helps build a stronger community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
            {impactHighlights.map((highlight) => {
              const Icon = highlight.icon
              return (
                <div
                  key={highlight.title}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/40 border border-border/70 space-y-3.5 transition-colors hover:border-primary/30"
                >
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Icon className="size-7" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}

