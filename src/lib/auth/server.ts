import "server-only"
import { auth as nextAuth } from "./config"

// Server-only wrapper for auth
export async function getServerSession() {
  return await nextAuth()
}

