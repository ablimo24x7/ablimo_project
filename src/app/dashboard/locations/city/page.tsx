"use client";

import { useQuery } from "@tanstack/react-query";
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
import { Pencil, Plane, MessageSquare, Search, ExternalLink } from "lucide-react";
import { useState } from "react";

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
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["location-cities"],
    queryFn: async () => {
      const res = await fetch("/api/locations/cities");
      if (!res.ok) throw new Error("Failed to load cities");
      return res.json() as Promise<CitiesResponse>;
    },
  });

  const cities = data?.cities ?? [];
  const q = search.trim().toLowerCase();
  const filteredCities = q
    ? cities.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q) ||
          c.countryName.toLowerCase().includes(q) ||
          c.countrySlug.toLowerCase().includes(q)
      )
    : cities;

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
          <div className="border-b p-3">
            <div className="relative max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by city or country..."
                className="pl-8"
              />
            </div>
          </div>
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
                {filteredCities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                      {q ? "No cities match your search." : "No cities yet. Open a country and add its cities."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCities.map((c) => (
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
                          <Button variant="ghost" size="sm" asChild title="View on site">
                            <Link href={`/locations/${c.countrySlug}/${c.slug}`} target="_blank">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild title="Manage cities of this country">
                            <Link href={`/dashboard/locations/${c.countryId}/city`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
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
