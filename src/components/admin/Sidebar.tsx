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
  Globe,
  MapPin,
  MapPinned,
  Route,
  Plane,
  CarFront,
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
  { title: "Routes", url: "/dashboard/routes", icon: Route },
  { title: "Users", url: "/dashboard/users", icon: Users },
  { title: "Permissions", url: "/dashboard/settings/permissions", icon: ShieldCheck },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

const templateNav = [
  { title: "Country Blogs", url: "/dashboard/posts?template=country", icon: Globe },
  { title: "City Blogs", url: "/dashboard/posts?template=city", icon: MapPin },
  { title: "City-to-City", url: "/dashboard/posts?template=city-to-city", icon: Route },
  { title: "Airport Blogs", url: "/dashboard/posts?template=airport", icon: Plane },
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
          <SidebarGroupLabel>Blog Templates</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {templateNav.map((item) => (
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
