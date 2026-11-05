import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { GallerySection } from "@/components/home/gallery-section"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <NewsletterSection />
    </main>
  )
}
