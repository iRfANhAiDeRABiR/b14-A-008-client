import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionWrapper } from "@/components/shared/section-wrapper"

export function GallerySection() {
  const galleryItems = [
    {
      title: "Winter Clothes Distribution",
      category: "Donation Drive",
      src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Blanket Distribution for Needy Families",
      category: "Community Relief",
      src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Community Tree Plantation",
      category: "Environmental",
      src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Neighborhood Cleanup Campaign",
      category: "Sanitation",
      src: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Food Distribution for Underprivileged People",
      category: "Hunger Relief",
      src: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Community Educational Support",
      category: "Education",
      src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    },
  ]

  return (
    <SectionWrapper variant="default">
      <Container className="space-y-12">
        <SectionHeading
          badge="Community in Action"
          title="Moments That Make a Difference"
          subtitle="Explore the spirit of kindness, teamwork and positive change through community service activities."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.title}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted shadow-xs"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-5 space-y-1 text-white">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase">
                  {item.category}
                </span>
                <h3 className="font-heading text-base sm:text-lg font-semibold leading-snug text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}

