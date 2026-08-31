"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const SERVICE_FILTER_OPTIONS = [
  { slug: "all", label: "All Services" },
  { slug: "chauffeur-vip", label: "Chauffeur & VIP" },
  { slug: "airport-transfers", label: "Airport Transfers" },
  { slug: "corporate-transportation", label: "Corporate Transportation" },
  { slug: "event-transportation", label: "Event Transportation" },
  { slug: "bus-coach-hire", label: "Bus & Coach Hire" },
  { slug: "tourism-transportation", label: "Tourism Transportation" },
] as const;

type Post = {
  _id: string;
  title: string;
  slug: string;
  status: string;
  templateType: string;
  serviceSlug: string;
  countrySlug: string;
  citySlug: string;
  views: number;
  date: string;
};

export default function PostsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [serviceFilter, setServiceFilter] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey: ["posts", serviceFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (serviceFilter !== "all") params.set("service", serviceFilter);
      const qs = params.toString();
      const res = await fetch(`/api/articles${qs ? `?${qs}` : ""}`);
      if (!res.ok) throw new Error("Failed");
      return res.json() as Promise<{ items: Post[] }>;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
    },
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setDeleteId(null);
    },
    onError: () => toast.error("Delete failed"),
  });

  const posts = data?.items ?? [];

  return (
    <div className="space-y-4 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Posts</h2>
        <Button asChild>
          <Link href="/dashboard/posts/new">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Select value={serviceFilter} onValueChange={(v) => { if (v) setServiceFilter(v); }}>
          <SelectTrigger className="w-[220px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_FILTER_OPTIONS.map((s) => (
              <SelectItem key={s.slug} value={s.slug}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
                  <TableHead>Service</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                      No posts yet. Create your first post.
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell>
                        <div className="font-medium">{p.title}</div>
                        <div className="text-xs text-muted-foreground">/{p.slug}</div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className="capitalize">{p.serviceSlug || "—"}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {[p.countrySlug, p.citySlug].filter(Boolean).join(" / ") || "—"}
                      </TableCell>
                      <TableCell><Badge variant={p.status === "published" ? "default" : "secondary"} className="capitalize">{p.status}</Badge></TableCell>
                      <TableCell className="text-right tabular-nums">{p.views ?? 0}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/posts/${p._id}/edit`}><Pencil className="h-4 w-4" /></Link>
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteId(p._id)}>
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
            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
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
