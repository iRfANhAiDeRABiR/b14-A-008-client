import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, HeartHandshake } from "lucide-react";

export default function Home() {
  const colorSwatches = [
    { name: "Forest Green", hex: "#166534", bg: "bg-[#166534]", text: "text-white", role: "Primary" },
    { name: "Deep Green", hex: "#14532D", bg: "bg-[#14532D]", text: "text-white", role: "Primary Accent" },
    { name: "Light Green", hex: "#DCFCE7", bg: "bg-[#DCFCE7]", text: "text-[#14532D]", role: "Secondary" },
    { name: "Warm Cream", hex: "#FAF9F6", bg: "bg-[#FAF9F6]", text: "text-[#1F2937]", role: "Background" },
    { name: "Pure White", hex: "#FFFFFF", bg: "bg-[#FFFFFF]", text: "text-[#1F2937]", border: "border", role: "Card Surface" },
    { name: "Charcoal", hex: "#1F2937", bg: "bg-[#1F2937]", text: "text-white", role: "Foreground / Text" },
    { name: "Muted Gray", hex: "#6B7280", bg: "bg-[#6B7280]", text: "text-white", role: "Muted Text" },
  ];

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Brand Header */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium tracking-wide">
          <HeartHandshake className="size-4" />
          <span>TogetherWeCare Design System Preview</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-foreground tracking-tight">
          TogetherWeCare
        </h1>
        <p className="text-xl sm:text-2xl font-medium text-primary font-heading">
          Small Actions. Stronger Communities.
        </p>
        <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg">
          A community-driven social development platform connecting people with local volunteer events, donation drives, and sustainability initiatives.
        </p>
      </section>

      {/* Color Palette Section */}
      <section className="space-y-6">
        <div className="border-b border-border pb-3">
          <h2 className="text-2xl sm:text-3xl font-semibold font-heading">Brand Color Palette</h2>
          <p className="text-muted-foreground text-sm">Theme tokens established for consistent UI components and accessibility.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {colorSwatches.map((color) => (
            <div
              key={color.hex}
              className={`rounded-xl p-4 flex flex-col justify-between shadow-sm min-h-32 transition-transform hover:-translate-y-1 ${color.bg} ${color.text} ${color.border || ""}`}
            >
              <span className="text-xs font-medium opacity-80">{color.role}</span>
              <div>
                <p className="font-semibold text-sm">{color.name}</p>
                <p className="text-xs font-mono opacity-90">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Section */}
      <section className="space-y-6">
        <div className="border-b border-border pb-3">
          <h2 className="text-2xl sm:text-3xl font-semibold font-heading">Typography System</h2>
          <p className="text-muted-foreground text-sm">Headings set in Poppins; Body paragraphs set in Inter for readability.</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-muted-foreground">Heading 1 (Poppins Bold / 4xl-5xl)</span>
            <p className="text-4xl font-bold font-heading text-foreground">Make a Difference in Your City</p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono text-muted-foreground">Heading 2 (Poppins SemiBold / 3xl)</span>
            <p className="text-3xl font-semibold font-heading text-foreground">Upcoming Volunteer Opportunities</p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono text-muted-foreground">Heading 3 (Poppins Medium / 2xl)</span>
            <p className="text-2xl font-medium font-heading text-foreground">Community Clean-up Drives & Tree Plantations</p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono text-muted-foreground">Body Text (Inter Regular / Base)</span>
            <p className="text-base text-foreground leading-relaxed max-w-3xl">
              Local grassroots activities empower neighbors to support one another through shared initiatives, from winter clothes distribution drives to neighborhood park restoration projects.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono text-muted-foreground">Muted Caption (Inter / Sm)</span>
            <p className="text-sm text-muted-foreground">
              Last updated today. Verified community-hosted events only.
            </p>
          </div>
        </div>
      </section>

      {/* Button & Interactive Elements */}
      <section className="space-y-6">
        <div className="border-b border-border pb-3">
          <h2 className="text-2xl sm:text-3xl font-semibold font-heading">Buttons & Action Elements</h2>
          <p className="text-muted-foreground text-sm">Accessible button styles using the design system tokens.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 bg-card p-6 rounded-xl border border-border shadow-sm">
          <Button variant="default" size="lg">
            Primary Action
          </Button>
          <Button variant="secondary" size="lg">
            Secondary Action
          </Button>
          <Button variant="outline" size="lg">
            Outline Action
          </Button>
          <Button variant="destructive" size="lg">
            Destructive Action
          </Button>
        </div>
      </section>

      {/* Sample Event Card */}
      <section className="space-y-6">
        <div className="border-b border-border pb-3">
          <h2 className="text-2xl sm:text-3xl font-semibold font-heading">Sample Card Component</h2>
          <p className="text-muted-foreground text-sm">Example card demonstrating container, borders, badges, typography, and button integration.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="h-44 bg-gradient-to-br from-emerald-700 to-green-900 flex items-center justify-center text-white text-lg font-medium">
              Community Service Event
            </div>
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Donation</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="size-3.5" /> 34 Joined
                </span>
              </div>
              <CardTitle className="text-xl font-heading">Winter Clothes Distribution</CardTitle>
              <CardDescription className="line-clamp-2">
                Providing warm clothing and essential blankets to underprivileged families and children in the Mirpur community.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-primary shrink-0" />
                <span>Mirpur 10, Dhaka</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-primary shrink-0" />
                <span>November 20, 2026</span>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full">
                View Event Details
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
}
