"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, RefreshCw } from "lucide-react";
import { useState } from "react";

type ServiceRow = {
  _id: string;
  slug: string;
  title: string;
  desc: string;
  status: string;
  showInMenu: boolean;
  order: number;
  heroImage?: string;
  faqCount: number;
  updatedAt?: string;
};

export default function ServicesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["services", q],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      const res = await fetch(`/api/services?${params.toString()}`);
      if (!res.ok) throw new Error("Failed");
      return res.json() as Promise<{ items: ServiceRow[]; total: number }>;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
    },
    onSuccess: () => {
      toast.success("Service deleted");
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setDeleteId(null);
    },
    onError: () => toast.error("Delete failed"),
  });

  const seedMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/services/seed", { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Seed failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast.success(`Seeded ${data.created} services (${data.existing} already existed)`);
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const services = data?.items ?? [];

  const openEdit = (id: string) => router.push(`/dashboard/services/${id}/edit`);

  return (
    <div className="space-y-4 px-4 lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Services</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => seedMutation.mutate()} disabled={seedMutation.isPending}>
            <RefreshCw className="mr-2 h-4 w-4" /> {seedMutation.isPending ? "Seeding..." : "Seed Defaults"}
          </Button>
          <Button asChild>
            <Link href="/dashboard/services/new">
              <Plus className="mr-2 h-4 w-4" /> New Service
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            refetch();
          }}
          placeholder="Search by title or slug..."
          className="max-w-xs"
        />
        {data && <span className="text-sm text-muted-foreground">{data.total} total</span>}
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-2">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Menu</TableHead>
                  <TableHead className="text-right">FAQs</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                      No services found. Click &quot;Seed Defaults&quot; to restore the bundled services.
                    </TableCell>
                  </TableRow>
                ) : (
                  services.map((s) => (
                    <TableRow key={s._id}>
                      <TableCell>
                        <div className="font-medium">{s.title}</div>
                        <div className="text-xs text-muted-foreground">/{s.slug}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={s.status === "published" ? "default" : "secondary"} className="capitalize">{s.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={s.showInMenu ? "outline" : "secondary"}>
                          {s.showInMenu ? "Shown" : "Hidden"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{s.faqCount ?? 0}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => openEdit(s._id)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteId(s._id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && deleteMutation.mutate(deleteId)} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}