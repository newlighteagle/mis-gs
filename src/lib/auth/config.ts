import "server-only"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { getUserByEmail } from "@/lib/google-sheets/services"
import type { SecurityUser } from "@/lib/google-sheets/types"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user.email) {
        try {
          console.log(`[AUTH] Attempting sign in for: ${user.email}`)
          
          // Check if user exists in Security spreadsheet
          const securityUser = await getUserByEmail(user.email)
          
          if (!securityUser) {
            console.error(`[AUTH] User ${user.email} not found in security spreadsheet or not active`)
            return false
          }

          console.log(`[AUTH] User found:`, {
            email: securityUser.email,
            status: securityUser.status,
            role: securityUser.role,
            name: securityUser.name
          })

          if (securityUser.status !== "active") {
            console.error(`[AUTH] User ${user.email} is not active. Status: ${securityUser.status}`)
            return false
          }

          console.log(`[AUTH] Sign in successful for: ${user.email}`)
          return true
        } catch (error) {
          console.error("[AUTH] Error checking user in spreadsheet:", error)
          return false
        }
      }
      console.error("[AUTH] Invalid sign in attempt - no email or wrong provider")
      return false
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user?.email) {
        try {
          const securityUser = await getUserByEmail(user.email)
          if (securityUser) {
            token.id = securityUser.id
            token.name = securityUser.name
            token.email = securityUser.email
            // Normalize role: "admin" -> "administrator", default to "user"
            token.role = securityUser.role === "admin" ? "administrator" : (securityUser.role || "user")
            token.module = securityUser.module
            token.status = securityUser.status
          }
        } catch (error) {
          console.error("Error fetching user data in JWT callback:", error)
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
        session.user.role = token.role as "administrator" | "user"
        session.user.module = token.module as string | undefined
        session.user.status = token.status as "active" | "not-active"
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
})

// Export authOptions for backward compatibility if needed
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
}

