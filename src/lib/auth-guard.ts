import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export async function getServerSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    return session
  } catch {
    return null
  }
}

export async function requireAuth(returnPath?: string) {
  const session = await getServerSession()

  if (!session?.user) {
    const safePath =
      returnPath &&
      returnPath.startsWith("/") &&
      !returnPath.startsWith("//") &&
      !returnPath.startsWith("/login") &&
      !returnPath.startsWith("/register")
        ? returnPath
        : ""

    const loginUrl = safePath
      ? `/login?callbackURL=${encodeURIComponent(safePath)}`
      : "/login"

    redirect(loginUrl)
  }

  return session
}

