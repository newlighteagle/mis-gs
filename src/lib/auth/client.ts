"use client"

import { signOut as nextAuthSignOut } from "next-auth/react"

// Client-side wrapper for signOut
export function signOut(options?: { callbackUrl?: string }) {
  return nextAuthSignOut({ callbackUrl: options?.callbackUrl || "/login" })
}

