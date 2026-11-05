import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { GallerySection } from "@/components/home/gallery-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { EventCard } from "@/components/events/event-card"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { Event } from "@/types/event"

const sampleEvents: Event[] = [
  {
    _id: "preview-1",
    title: "Winter Clothes Distribution",
    description:
      "Distribute warm clothes, jackets and socks to underprivileged families and children in Mirpur during the cold season.",
    eventType: "Donation",
    imageUrl:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    location: "Mirpur 10, Dhaka",
    eventDate: "2026-12-15T10:00:00.000Z",
    createdBy: "organizer@togetherwecare.org",
  },
  {
    _id: "preview-2",
    title: "Blanket Distribution for Needy Families",
    description:
      "Providing heavy winter blankets to homeless individuals and vulnerable residents across Mohammadpur area.",
    eventType: "Donation",
    imageUrl:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    location: "Mohammadpur, Dhaka",
    eventDate: "2026-12-20T14:30:00.000Z",
    createdBy: "relief@togetherwecare.org",
  },
  {
    _id: "preview-3",
    title: "Community Tree Plantation Drive",
    description:
      "Planting 300 fruit and medicinal trees along public walkways and park borders to enhance urban green cover.",
    eventType: "Plantation",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    location: "Dhanmondi Lake Park, Dhaka",
    eventDate: "2027-01-05T09:00:00.000Z",
    createdBy: "green@togetherwecare.org",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />

      <SectionWrapper variant="default">
        <Container className="space-y-12">
          <SectionHeading
            badge="Event Cards Preview"
            title="Featured Community Initiatives"
            subtitle="Explore how volunteer opportunities are showcased across the platform with standardized cards, dates, and locations."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <GallerySection />
      <NewsletterSection />
    </main>
  )
}
