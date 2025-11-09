import { redirect } from "next/navigation"

export default async function Home() {
  // Skip authentication - redirect directly to dashboard
  redirect("/main-dashboard/main-data")
}
