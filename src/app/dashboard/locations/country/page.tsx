"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
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
import { Plus, Pencil, Trash2, MapPin, Plane, Building2, Search } from "lucide-react";
import { useState } from "react";

export type AirportShape = { slug: string; name: string; iata: string; citySlug?: string };
export type CityShape = { slug: string; name: string; countrySlug?: string; airports: AirportShape[] };
export type CountryShape = { code: string; slug: string; name: string; cities: CityShape[] };

type LocationsResponse = { countries: CountryShape[]; routes: unknown[] };

export default function CountriesPage() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await fetch("/api/locations");
      if (!res.ok) throw new Error("Failed to load locations");
      return res.json() as Promise<LocationsResponse>;
    },
  });

  // We need the _id for delete/edit. Fetch a lightweight list including _id.
  const { data: meta } = useQuery({
    queryKey: ["locations-meta"],
    queryFn: async () => {
      const res = await fetch("/api/locations/meta");
      if (!res.ok) throw new Error("Failed");
      return res.json() as Promise<{ countries: Array<{ _id: string; slug: string; name: string; code: string; cityCount: number; airportCount: number }> }>;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/locations/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Delete failed");
      }
    },
    onSuccess: () => {
      toast.success("Country deleted");
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      queryClient.invalidateQueries({ queryKey: ["locations-meta"] });
      setDeleteId(null);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const countries = meta?.countries ?? [];
  const q = search.trim().toLowerCase();
  const filteredCountries = q
    ? countries.filter(
        (c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
      )
    : countries;

  return (
    <div className="space-y-4 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Countries</h2>
          <p className="text-sm text-muted-foreground">
            {data?.countries.length ? `${data.countries.length} countries in the network.` : "Manage the countries in the network."}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/locations/new">
            <Plus className="mr-2 h-4 w-4" /> New Country
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="border-b p-3">
            <div className="relative max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, slug or code..."
                className="pl-8"
              />
            </div>
          </div>
          {isLoading ? (
            <div className="p-4 space-y-2">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead className="text-center">Cities</TableHead>
                  <TableHead className="text-center">Airports</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCountries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                      {q ? "No countries match your search." : "No locations yet. Create your first country."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCountries.map((c) => (
                    <TableRow key={c._id}>
                      <TableCell>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-muted-foreground">/{c.slug}</div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className="uppercase">{c.code}</Badge></TableCell>
                      <TableCell className="text-center">
                        <Link
                          href={`/dashboard/locations/${c._id}/city`}
                          className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
                        >
                          <MapPin className="h-4 w-4" />{c.cityCount}
                        </Link>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4" />{c.airportCount}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="sm" asChild title="Cities">
                            <Link href={`/dashboard/locations/${c._id}/city`}><Building2 className="h-4 w-4" /></Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild title="Edit country">
                            <Link href={`/dashboard/locations/${c._id}`}><Pencil className="h-4 w-4" /></Link>
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteId(c._id)} title="Delete country">
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
            <AlertDialogTitle>Delete Country?</AlertDialogTitle>
            <AlertDialogDescription>This will also remove all its cities and airports. This cannot be undone.</AlertDialogDescription>
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
