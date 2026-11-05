import { requireAuth } from "@/lib/auth-guard"
import { Container } from "@/components/shared/container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, ShieldCheck } from "lucide-react"

export default async function ProfilePage() {
  const { user } = await requireAuth("/profile")

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U"

  return (
    <div className="min-h-[70vh] py-12 sm:py-16">
      <Container className="max-w-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <User className="size-5" />
          </div>
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              User Profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your community account information
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card space-y-6 shadow-xs">
          <div className="flex items-center gap-4">
            <Avatar className="size-16 border-2 border-border">
              {user.image && <AvatarImage src={user.image} alt={user.name} />}
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="font-heading text-lg font-bold text-foreground">
                {user.name}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                <ShieldCheck className="size-3.5" />
                <span>Verified Community Member</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Email Address
              </p>
              <p className="text-sm font-medium text-foreground mt-0.5">
                {user.email}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                User ID
              </p>
              <p className="text-xs font-mono text-muted-foreground mt-0.5 break-all">
                {user.id}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

