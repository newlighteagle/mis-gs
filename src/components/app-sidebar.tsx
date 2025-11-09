"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Map,
  GraduationCap,
  FileText,
  Database,
  LogOut,
} from "lucide-react"
import { signOut } from "@/lib/auth/client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface NavItem {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  module?: string
  role?: "administrator" | "user"
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const navMain: NavGroup[] = [
  {
    title: "Main Dashboard",
    items: [
      {
        title: "Main Data",
        url: "/main-dashboard/main-data",
        icon: LayoutDashboard,
      },
      {
        title: "KPI",
        url: "/main-dashboard/kpi",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Detail Dashboard",
    items: [
      {
        title: "Farmer",
        url: "/detail-dashboard/farmer",
        icon: Users,
        module: "farmer",
      },
      {
        title: "Parcel",
        url: "/detail-dashboard/parcel",
        icon: Map,
        module: "parcel",
      },
      {
        title: "Training",
        url: "/detail-dashboard/training",
        icon: GraduationCap,
        module: "training",
      },
      {
        title: "BMP",
        url: "/detail-dashboard/bmp",
        icon: FileText,
        module: "bmp",
      },
      {
        title: "NKT",
        url: "/detail-dashboard/nkt",
        icon: FileText,
        module: "nkt",
      },
      {
        title: "K3",
        url: "/detail-dashboard/k3",
        icon: FileText,
        module: "k3",
      },
    ],
  },
  {
    title: "Master Data",
    items: [
      {
        title: "District",
        url: "/master-data/district",
        icon: Database,
        role: "administrator",
      },
      {
        title: "ICS",
        url: "/master-data/ics",
        icon: Database,
        role: "administrator",
      },
      {
        title: "Farmer",
        url: "/master-data/farmer",
        icon: Database,
        role: "administrator",
      },
      {
        title: "Parcel",
        url: "/master-data/parcel",
        icon: Database,
        role: "administrator",
      },
      {
        title: "Training",
        url: "/master-data/training",
        icon: Database,
        role: "administrator",
      },
      {
        title: "BMP",
        url: "/master-data/bmp",
        icon: Database,
        role: "administrator",
      },
      {
        title: "NKT",
        url: "/master-data/nkt",
        icon: Database,
        role: "administrator",
      },
      {
        title: "K3",
        url: "/master-data/k3",
        icon: Database,
        role: "administrator",
      },
    ],
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole?: "administrator" | "user"
  userModules?: string[]
}

export function AppSidebar({ userRole, userModules, ...props }: AppSidebarProps) {
  const pathname = usePathname()

  // Debug: Log role untuk troubleshooting
  React.useEffect(() => {
    console.log("[SIDEBAR] User Role:", userRole)
    console.log("[SIDEBAR] User Modules:", userModules)
  }, [userRole, userModules])

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" })
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <LayoutDashboard className="h-6 w-6" />
          <span className="font-semibold text-lg">MIS Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navMain.map((group) => {
          // Filter items based on role and module access
          const filteredItems = group.items.filter((item) => {
            // Main Dashboard - accessible to all authenticated users
            if (group.title === "Main Dashboard") {
              return true
            }
            
            // Master Data only for administrators
            if (group.title === "Master Data") {
              // Only show Master Data if user is administrator
              if (userRole === "administrator") {
                return true
              }
              return false
            }
            
            // Detail Dashboard - check module access if module is specified
            // If no module specified in user data, allow access (for backward compatibility)
            if (item.module) {
              // If userModules is empty or undefined, allow access
              if (!userModules || userModules.length === 0) {
                return true
              }
              // Otherwise check if user has access to this module
              if (!userModules.includes(item.module)) {
                return false
              }
            }
            
            return true
          })

          // Don't render group if no items after filtering
          if (filteredItems.length === 0) {
            return null
          }

          return (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.url
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={item.url}>
                            <Icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
      <div className="mt-auto border-t border-sidebar-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      <SidebarRail />
    </Sidebar>
  )
}
