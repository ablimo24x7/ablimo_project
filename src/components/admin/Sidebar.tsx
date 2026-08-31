"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Users,
  ShieldCheck,
  Settings,
  MapPinned,
  CarFront,
  Briefcase,
  Plane,
  Building2,
  CalendarDays,
  Bus,
  Mountain,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const adminNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Posts", url: "/dashboard/posts", icon: FileText },
  { title: "Categories", url: "/dashboard/categories", icon: FolderTree },
  { title: "Services", url: "/dashboard/services", icon: CarFront },
  { title: "Locations", url: "/dashboard/locations", icon: MapPinned },
  { title: "Users", url: "/dashboard/users", icon: Users },
  { title: "Permissions", url: "/dashboard/settings/permissions", icon: ShieldCheck },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

const serviceNav = [
  { title: "Chauffeur & VIP", url: "/dashboard/posts?service=chauffeur-vip", icon: Briefcase },
  { title: "Airport Transfers", url: "/dashboard/posts?service=airport-transfers", icon: Plane },
  { title: "Corporate", url: "/dashboard/posts?service=corporate-transportation", icon: Building2 },
  { title: "Events", url: "/dashboard/posts?service=event-transportation", icon: CalendarDays },
  { title: "Bus & Coach", url: "/dashboard/posts?service=bus-coach-hire", icon: Bus },
  { title: "Tourism", url: "/dashboard/posts?service=tourism-transportation", icon: Mountain },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-foreground text-background">
                <span className="font-bold text-sm">AB</span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">AB.Limo</span>
                <span className="truncate text-xs">Dashboard</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={pathname === item.url} render={<Link href={item.url} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Blog by Service</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {serviceNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<a href="/" target="_blank" />}>
              <span>View Website</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
