"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Plus, Pencil, Trash2, Route as RouteIcon } from "lucide-react";
import { useState } from "react";

type RouteRecord = {
  _id: string;
  fromCity: string;
  fromCityName: string;
  toCity: string;
  toCityName: string;
  distance: string;
  duration: string;
  countrySlug: string;
  status: string;
};

type RoutesResponse = {
  routes: RouteRecord[];
  databaseEnabled?: boolean;
};

export default function RoutesPage() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const res = await fetch("/api/locations/routes");
      if (!res.ok) throw new Error("Failed to load routes");
      return res.json() as Promise<RoutesResponse>;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/locations/routes/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Delete failed");
      }
    },
    onSuccess: () => {
      toast.success("Route deleted");
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      setDeleteId(null);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const routes = data?.routes ?? [];
  const databaseEnabled = data?.databaseEnabled ?? false;

  const cityName = (r: RouteRecord, which: "from" | "to") => {
    const slug = which === "from" ? r.fromCity : r.toCity;
    const name = which === "from" ? r.fromCityName : r.toCityName;
    return name ? `${name} (/${slug})` : `/${slug}`;
  };

  return (
    <div className="space-y-4 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Routes</h2>
          <p className="text-sm text-muted-foreground">
            {routes.length ? `${routes.length} city-to-city routes.` : "Manage city-to-city routes."}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/routes/new">
            <Plus className="mr-2 h-4 w-4" /> New Route
          </Link>
        </Button>
      </div>

      {!databaseEnabled && (
        <p className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
          Database is disabled (USE_DATABASE=false). Routes are served from the static dataset and cannot be edited.
        </p>
      )}

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
                  <TableHead>Route</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                      No routes yet. Create your first route.
                    </TableCell>
                  </TableRow>
                ) : (
                  routes.map((r) => (
                    <TableRow key={r._id}>
                      <TableCell>
                        <div className="flex items-center gap-2 font-medium">
                          {r.fromCityName || r.fromCity}
                          <RouteIcon className="h-4 w-4 text-muted-foreground" />
                          {r.toCityName || r.toCity}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {cityName(r, "from")} to {cityName(r, "to")}
                        </div>
                      </TableCell>
                      <TableCell>{r.distance || "—"}</TableCell>
                      <TableCell>{r.duration || "—"}</TableCell>
                      <TableCell><Badge variant="outline">{r.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/routes/${r._id}`}><Pencil className="h-4 w-4" /></Link>
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteId(r._id)}>
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
            <AlertDialogTitle>Delete Route?</AlertDialogTitle>
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