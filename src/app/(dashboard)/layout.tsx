import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Skip authentication - allow all access
  // Set default role to administrator so Master Data is visible
  const userRole = "administrator" as "administrator" | "user"
  const userModules: string[] = [] // Empty modules = access to all

  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} userModules={userModules} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm text-muted-foreground">
              Guest User
            </span>
            <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
              {userRole}
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

