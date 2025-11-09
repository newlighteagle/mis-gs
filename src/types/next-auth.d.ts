import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: "administrator" | "user"
      module?: string
      status?: "active" | "not-active"
    }
  }

  interface User {
    id: string
    role?: "administrator" | "user"
    module?: string
    status?: "active" | "not-active"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role?: "administrator" | "user"
    module?: string
    status?: "active" | "not-active"
  }
}

