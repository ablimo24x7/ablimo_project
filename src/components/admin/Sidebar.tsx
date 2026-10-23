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
  MessageSquare,
  ImageIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePermissions } from "@/hooks/use-permissions";

const adminNav: {
  title: string;
  url: string;
  icon: LucideIcon;
  requiresManage?: boolean;
  subItems?: { title: string; url: string }[];
}[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Posts", url: "/dashboard/posts", icon: FileText },
  { title: "Media", url: "/dashboard/media", icon: ImageIcon },
  { title: "Categories", url: "/dashboard/categories", icon: FolderTree },
  {
    title: "Services",
    url: "/dashboard/services",
    icon: CarFront,
    subItems: [
      { title: "Country Services", url: "/dashboard/services/country" },
      { title: "City Services", url: "/dashboard/services/city" },
    ],
  },
  { title: "Chat Widget", url: "/dashboard/chat", icon: MessageSquare },
  {
    title: "Locations",
    url: "/dashboard/locations",
    icon: MapPinned,
    subItems: [
      { title: "Country", url: "/dashboard/locations/country" },
      { title: "City", url: "/dashboard/locations/city" },
    ],
  },
  { title: "Users", url: "/dashboard/users", icon: Users, requiresManage: true },
  { title: "Permissions", url: "/dashboard/settings/permissions", icon: ShieldCheck, requiresManage: true },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { canManage } = usePermissions();
  const visibleNav = adminNav.filter((item) => !item.requiresManage || canManage);

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
              {visibleNav.map((item) => {
                const inSection = pathname.startsWith(item.url);
                return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.subItems ? inSection : pathname === item.url}
                    render={<Link href={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  {item.subItems && (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            render={<Link href={subItem.url} />}
                            isActive={pathname === subItem.url}
                          >
                            <span>{subItem.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
                );
              })}
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
