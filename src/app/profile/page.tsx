import { User, ShieldCheck, Mail, Key, Sparkles } from "lucide-react"
import { requireAuth } from "@/lib/auth-guard"
import { Container } from "@/components/shared/container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ProfileUpdateForm } from "@/components/auth/profile-update-form"

export default async function ProfilePage() {
  const session = await requireAuth("/profile")
  const { user } = session

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U"

  return (
    <div className="min-h-screen bg-background py-10 sm:py-16">
      <Container className="space-y-8">
        <div className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <User className="size-3.5" />
            <span>Account Settings</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            My Profile
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Manage your personal information and keep your community profile up to date.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <Card className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/30 relative" />
            <div className="px-6 pb-6 pt-0 space-y-6 -mt-12">
              <div className="flex flex-col items-center text-center space-y-3">
                <Avatar className="size-24 border-4 border-card shadow-md">
                  {user.image && <AvatarImage src={user.image} alt={user.name} />}
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    {user.name}
                  </h2>
                  <p className="text-xs text-muted-foreground break-all">
                    {user.email}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-xs font-semibold">
                  <ShieldCheck className="size-3.5" />
                  <span>Verified Community Member</span>
                </div>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-border">
                <div className="flex items-start gap-3 text-xs">
                  <Mail className="size-4 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5 truncate">
                    <p className="text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                      Account Email
                    </p>
                    <p className="font-medium text-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <Key className="size-4 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5 truncate">
                    <p className="text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                      User Identifier
                    </p>
                    <p className="font-mono text-muted-foreground text-[11px] truncate">
                      {user.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <Sparkles className="size-4 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                      Platform Role
                    </p>
                    <p className="font-medium text-foreground">
                      Community Volunteer &amp; Organizer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-xs p-6 sm:p-8 space-y-6">
            <CardHeader className="p-0 pb-2 space-y-1">
              <CardTitle className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                Edit Profile Details
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                Update your public profile information. Your name and avatar will be shown across community events.
              </CardDescription>
            </CardHeader>

            <ProfileUpdateForm user={user} />
          </Card>
        </div>
      </Container>
    </div>
  )
}
