"use client";

import { useQuery } from "@tanstack/react-query";
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
import { Pencil, Plane, MessageSquare } from "lucide-react";

export type CityListItem = {
  slug: string;
  name: string;
  nameAr: string;
  status: string;
  airportCount: number;
  faqCount: number;
  countryId: string;
  countryName: string;
  countrySlug: string;
};

type CitiesResponse = { cities: CityListItem[] };

export default function CitiesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["location-cities"],
    queryFn: async () => {
      const res = await fetch("/api/locations/cities");
      if (!res.ok) throw new Error("Failed to load cities");
      return res.json() as Promise<CitiesResponse>;
    },
  });

  const cities = data?.cities ?? [];

  return (
    <div className="space-y-4 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Cities</h2>
          <p className="text-sm text-muted-foreground">
            {cities.length ? `${cities.length} cities across the network.` : "Manage the cities in the network."}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/locations/country">Manage Countries</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-2">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : isError ? (
            <div className="p-4 text-sm text-destructive">Failed to load cities.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>City</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Airports</TableHead>
                  <TableHead className="text-center">FAQs</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                      No cities yet. Open a country and add its cities.
                    </TableCell>
                  </TableRow>
                ) : (
                  cities.map((c) => (
                    <TableRow key={`${c.countrySlug}/${c.slug}`}>
                      <TableCell>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-muted-foreground">/{c.slug}</div>
                      </TableCell>
                      <TableCell>
                        <div>{c.countryName}</div>
                        <div className="text-xs text-muted-foreground">/{c.countrySlug}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={c.status === "published" ? "outline" : "secondary"}
                          className="capitalize"
                        >
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4" />{c.airportCount}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center gap-1"><MessageSquare className="h-4 w-4" />{c.faqCount}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="sm" asChild title="Manage cities of this country">
                            <Link href={`/dashboard/locations/${c.countryId}/city`}><Pencil className="h-4 w-4" /></Link>
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
    </div>
  );
}
