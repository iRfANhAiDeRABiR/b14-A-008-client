import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { EmptyState } from "@/components/shared/empty-state"
import {
  EventCardSkeleton,
  TextSkeleton,
  ButtonSkeleton,
} from "@/components/shared/loading-skeleton"
import {
  Calendar,
  MapPin,
  Users,
  CalendarX,
  Sparkles,
} from "lucide-react"

export default function Home() {
  const categories = [
    { name: "Cleanup", variant: "cleanup" as const },
    { name: "Plantation", variant: "plantation" as const },
    { name: "Donation", variant: "donation" as const },
    { name: "Education", variant: "education" as const },
    { name: "Healthcare", variant: "healthcare" as const },
    { name: "Other", variant: "other" as const },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Header Section */}
      <SectionWrapper variant="default">
        <Container>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1 text-xs font-semibold text-secondary-foreground">
              <Sparkles className="size-3.5" />
              Reusable UI Component System
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              TogetherWeCare
            </h1>
            <p className="font-heading text-xl sm:text-2xl font-medium text-primary">
              Small Actions. Stronger Communities.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Demonstrating our standardized buttons, responsive containers, category badges, loading skeletons, and empty states.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      {/* 1. Button Variants & States */}
      <SectionWrapper variant="muted">
        <Container>
          <SectionHeading
            badge="Interactive Controls"
            title="Buttons & States"
            subtitle="Accessible button states supporting primary, secondary, outline, destructive, loading, and disabled variants."
            className="mb-10"
          />
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-4 bg-card p-6 rounded-xl border border-border shadow-xs">
              <Button variant="default">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="destructive">Destructive Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="link">Link Button</Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 bg-card p-6 rounded-xl border border-border shadow-xs">
              <Button size="sm">Small Size</Button>
              <Button size="default">Default Size</Button>
              <Button size="lg">Large Size</Button>
              <Button loading>Loading State</Button>
              <Button disabled>Disabled State</Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 2. Category Badges */}
      <SectionWrapper variant="default">
        <Container>
          <SectionHeading
            badge="Metadata & Filters"
            title="Event Category Badges"
            subtitle="Consistent color-coded tags representing the social service categories available on the platform."
            className="mb-10"
          />
          <div className="flex flex-wrap items-center justify-center gap-3 bg-card p-6 rounded-xl border border-border shadow-xs">
            {categories.map((cat) => (
              <Badge key={cat.name} variant={cat.variant} className="text-xs px-3 py-1">
                {cat.name}
              </Badge>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* 3. Cards & Grid Layout */}
      <SectionWrapper variant="muted">
        <Container>
          <SectionHeading
            badge="Content Containers"
            title="Event Card & Information Display"
            subtitle="Consistent card surfaces with hover transitions, metadata icons, and responsive layouts."
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:-translate-y-1 hover:shadow-md transition-all">
              <div className="h-44 bg-gradient-to-br from-emerald-700 to-green-900 flex items-center justify-center text-white text-lg font-medium">
                Tree Plantation Drive
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="plantation">Plantation</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="size-3.5" /> 42 Volunteers
                  </span>
                </div>
                <CardTitle>Community Green Canopy Drive</CardTitle>
                <CardDescription>
                  Join hands with local residents to plant 500 indigenous trees across Mohammadpur residential parks.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary shrink-0" />
                  <span>Mohammadpur, Dhaka</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-primary shrink-0" />
                  <span>December 12, 2026</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Event</Button>
              </CardFooter>
            </Card>

            <Card className="hover:-translate-y-1 hover:shadow-md transition-all">
              <div className="h-44 bg-gradient-to-br from-amber-700 to-orange-900 flex items-center justify-center text-white text-lg font-medium">
                Winter Clothes Drive
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="donation">Donation</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="size-3.5" /> 68 Volunteers
                  </span>
                </div>
                <CardTitle>Warmth for Mirpur Families</CardTitle>
                <CardDescription>
                  Collecting and distributing jackets, blankets, and thermal clothing to support needy families this winter.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary shrink-0" />
                  <span>Mirpur 10, Dhaka</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-primary shrink-0" />
                  <span>December 18, 2026</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Event</Button>
              </CardFooter>
            </Card>

            <Card className="hover:-translate-y-1 hover:shadow-md transition-all">
              <div className="h-44 bg-gradient-to-br from-teal-700 to-emerald-900 flex items-center justify-center text-white text-lg font-medium">
                Neighborhood Clean-Up
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="cleanup">Cleanup</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="size-3.5" /> 29 Volunteers
                  </span>
                </div>
                <CardTitle>Lakeview Park Restoration</CardTitle>
                <CardDescription>
                  Clearing plastic waste and revitalizing the public walkway around Dhanmondi Lake area.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary shrink-0" />
                  <span>Dhanmondi, Dhaka</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-primary shrink-0" />
                  <span>January 5, 2027</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Event</Button>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </SectionWrapper>

      {/* 4. Loading Skeletons */}
      <SectionWrapper variant="default">
        <Container>
          <SectionHeading
            badge="Loading States"
            title="Reusable Skeleton Placeholders"
            subtitle="Smooth pulsing placeholders shown while events and content are being fetched."
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCardSkeleton />
            <div className="bg-card p-6 rounded-xl border border-border shadow-xs space-y-6 flex flex-col justify-between">
              <div>
                <p className="font-heading font-medium text-sm text-muted-foreground mb-4">Text Skeletons</p>
                <TextSkeleton lines={5} />
              </div>
              <div className="space-y-2">
                <p className="font-heading font-medium text-sm text-muted-foreground">Button Skeletons</p>
                <div className="flex gap-3">
                  <ButtonSkeleton size="sm" />
                  <ButtonSkeleton size="default" />
                </div>
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border shadow-xs space-y-4">
              <p className="font-heading font-medium text-sm text-muted-foreground">Image Placeholder Skeleton</p>
              <div className="aspect-video w-full rounded-lg bg-muted animate-pulse" />
              <TextSkeleton lines={2} />
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 5. Empty State */}
      <SectionWrapper variant="muted">
        <Container>
          <SectionHeading
            badge="Fallback Feedback"
            title="Empty State Component"
            subtitle="User-friendly fallback displayed when no events match filters or when lists are empty."
            className="mb-10"
          />
          <div className="max-w-2xl mx-auto">
            <EmptyState
              icon={CalendarX}
              title="No Upcoming Events Found"
              description="There are currently no community service events matching your selected criteria. Try adjusting your filters or create a new event."
              actionLabel="Explore All Events"
              actionHref="/upcoming-events"
            />
          </div>
        </Container>
      </SectionWrapper>
    </main>
  )
}
