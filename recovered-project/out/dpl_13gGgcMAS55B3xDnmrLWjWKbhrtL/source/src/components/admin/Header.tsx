"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserMenu } from "@/components/admin/UserMenu";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <SidebarTrigger />
      <div className="flex-1" />
      <UserMenu />
    </header>
  );
}
