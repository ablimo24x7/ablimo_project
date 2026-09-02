import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { AdminHeader } from "@/components/admin/Header";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import "@/app/[lang]/globals.css";

export const metadata = {
  title: "AB.Limo Admin Dashboard",
  description: "Admin panel for AB.Limo",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <QueryProvider>
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset>
            <AdminHeader />
            <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </QueryProvider>
    </AuthProvider>
  );
}
