"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2, ChevronDown, ChevronUp, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { allIsoCountries, validateCountry } from "@/lib/iso3166";
import { toSlug } from "@/lib/slug";

type AirportRecord = {
  _id?: string;
  slug: string;
  name: string;
  iata: string;
  aliases: string[];
  type: string;
  status: string;
};

type CityRecord = {
  _id?: string;
  slug: string;
  name: string;
  aliases: string[];
  status: string;
  airports: AirportRecord[];
};

type CountryRecord = {
  _id?: string;
  name: string;
  code: string;
  slug: string;
  description: string;
  status: string;
  cities: CityRecord[];
};

const DEFAULTS: CountryRecord = {
  name: "",
  code: "",
  slug: "",
  description: "",
  status: "published",
  cities: [],
};

const STATUS_OPTIONS = ["draft", "published", "archived"] as const;
const AIRPORT_TYPES = ["international", "domestic", "regional"] as const;

function blankAirport(): AirportRecord {
  return { slug: "", name: "", iata: "", aliases: [], type: "international", status: "published" };
}

function blankCity(): CityRecord {
  return { slug: "", name: "", aliases: [], status: "published", airports: [] };
}

interface LocationEditorProps {
  initialData?: CountryRecord;
  mode?: "create" | "edit";
}

export function LocationEditor({ initialData, mode = "create" }: LocationEditorProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEdit = mode === "edit" && !!initialData?._id;

  const [form, setForm] = React.useState<CountryRecord>(
    initialData ? { ...DEFAULTS, ...initialData } : DEFAULTS
  );
  const [expandedCity, setExpandedCity] = React.useState<number | null>(null);

  const isoCountries = React.useMemo(() => allIsoCountries(), []);

  const mutation = useMutation({
    mutationFn: async (payload: CountryRecord) => {
      const url = isEdit && initialData?._id
        ? `/api/locations/${initialData._id}`
        : "/api/locations";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save country");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success(isEdit ? "Country updated" : "Country created");
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      queryClient.invalidateQueries({ queryKey: ["locations-meta"] });
      router.push("/dashboard/locations");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateField = <K extends keyof CountryRecord>(key: K, value: CountryRecord[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCountryName = (name: string) => {
    setForm((prev) => {
      const next = { ...prev, name };
      const iso = validateCountry(name);
      if (iso) {
        next.code = iso.code;
        if (!isEdit) next.slug = name.trim() ? toSlug(iso.name) : next.slug;
      } else if (!isEdit) {
        next.slug = name.trim() ? toSlug(name) : next.slug;
      }
      return next;
    });
  };

  const addCity = () => {
    const nextIndex = form.cities.length;
    setForm((prev) => ({ ...prev, cities: [...prev.cities, blankCity()] }));
    setExpandedCity(nextIndex);
  };

  const removeCity = (index: number) => {
    setForm((prev) => ({
      ...prev,
      cities: prev.cities.filter((_, i) => i !== index),
    }));
  };

  const updateCity = (
    index: number,
    key: Exclude<keyof CityRecord, "airports" | "aliases">,
    value: string
  ) => {
    setForm((prev) => {
      const cities = [...prev.cities];
      cities[index] = {
        ...cities[index],
        [key]: value,
        ...(key === "name" && !cities[index]._id
          ? { slug: value.trim() ? toSlug(value) : cities[index].slug }
          : {}),
      };
      return { ...prev, cities };
    });
  };

  const addAirport = (cityIndex: number) => {
    setForm((prev) => {
      const cities = [...prev.cities];
      cities[cityIndex] = {
        ...cities[cityIndex],
        airports: [...cities[cityIndex].airports, blankAirport()],
      };
      return { ...prev, cities };
    });
  };

  const removeAirport = (cityIndex: number, airportIndex: number) => {
    setForm((prev) => {
      const cities = [...prev.cities];
      cities[cityIndex] = {
        ...cities[cityIndex],
        airports: cities[cityIndex].airports.filter((_, i) => i !== airportIndex),
      };
      return { ...prev, cities };
    });
  };

  const updateAirport = (
    cityIndex: number,
    airportIndex: number,
    key: keyof AirportRecord,
    value: string
  ) => {
    setForm((prev) => {
      const cities = [...prev.cities];
      const airports = [...cities[cityIndex].airports];
      airports[airportIndex] = {
        ...airports[airportIndex],
        [key]: value,
        ...(key === "name" && !airports[airportIndex]._id
          ? { slug: value.trim() ? toSlug(value) : airports[airportIndex].slug }
          : {}),
      };
      cities[cityIndex] = { ...cities[cityIndex], airports };
      return { ...prev, cities };
    });
  };

  const updateAirportAliases = (
    cityIndex: number,
    airportIndex: number,
    value: string
  ) => {
    setForm((prev) => {
      const cities = [...prev.cities];
      const airports = [...cities[cityIndex].airports];
      airports[airportIndex] = {
        ...airports[airportIndex],
        aliases: value
          .split(",")
          .map((a) => a.trim().toLowerCase())
          .filter(Boolean),
      };
      cities[cityIndex] = { ...cities[cityIndex], airports };
      return { ...prev, cities };
    });
  };

  const updateCityAliases = (cityIndex: number, value: string) => {
    setForm((prev) => {
      const cities = [...prev.cities];
      cities[cityIndex] = {
        ...cities[cityIndex],
        aliases: value
          .split(",")
          .map((a) => a.trim().toLowerCase())
          .filter(Boolean),
      };
      return { ...prev, cities };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Country is required");
      return;
    }
    if (!validateCountry(form.name)) {
      toast.error("Invalid or unknown country. Please pick a real ISO-3166 country.");
      return;
    }
    mutation.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {isEdit ? "Edit Country" : "New Country"}
        </h2>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Country</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country-name">Country name *</Label>
                <Input
                  id="country-name"
                  list="iso-countries"
                  placeholder="Start typing a country, e.g. United Arab Emirates"
                  value={form.name}
                  onChange={(e) => handleCountryName(e.target.value)}
                />
                <datalist id="iso-countries">
                  {isoCountries.map((c) => (
                    <option key={c.code} value={c.name} />
                  ))}
                </datalist>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country-code">ISO Code</Label>
                  <Input
                    id="country-code"
                    className="uppercase"
                    placeholder="ae"
                    maxLength={2}
                    value={form.code}
                    onChange={(e) => updateField("code", e.target.value.toLowerCase())}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country-slug">Slug</Label>
                  <Input
                    id="country-slug"
                    value={form.slug}
                    onChange={(e) => updateField("slug", toSlug(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country-description">Description</Label>
                <Textarea
                  id="country-description"
                  rows={3}
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Cities</CardTitle>
              <Button type="button" size="sm" onClick={addCity}>
                <Plus className="mr-1 h-4 w-4" /> Add City
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.cities.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No cities yet. Add the main cities you serve in this country.
                </p>
              )}

              {form.cities.map((city, cityIndex) => {
                const isOpen = expandedCity === cityIndex;
                return (
                  <div key={`${city._id ?? "new"}-${cityIndex}`} className="rounded-lg border">
                    <div className="flex items-center gap-2 p-3">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => setExpandedCity(isOpen ? null : cityIndex)}
                      >
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                      <div className="flex-1">
                        <div className="font-medium">
                          {city.name || <span className="text-muted-foreground">Unnamed city</span>}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          /{city.slug}
                          {city.airports.length > 0 && ` · ${city.airports.length} airport${city.airports.length === 1 ? "" : "s"}`}
                        </div>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeCity(cityIndex)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>

                    {isOpen && (
                      <div className="space-y-4 border-t p-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>City name</Label>
                            <Input
                              value={city.name}
                              onChange={(e) => updateCity(cityIndex, "name", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Slug</Label>
                            <Input
                              value={city.slug}
                              onChange={(e) => updateCity(cityIndex, "slug", toSlug(e.target.value))}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 space-y-2">
                            <Label>Aliases (comma-separated)</Label>
                            <Input
                              value={(city.aliases ?? []).join(", ")}
                              placeholder="e.g. Madinah, Madina"
                              onChange={(e) => updateCityAliases(cityIndex, e.target.value)}
                            />
                          </div>
                          <AvailabilityBadge
                            type="city"
                            slug={city.slug}
                            aliases={city.aliases ?? []}
                            countryCode={form.code}
                            exclude={form._id}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Airports</Label>
                          <Button type="button" size="sm" variant="outline" onClick={() => addAirport(cityIndex)}>
                            <Plus className="mr-1 h-4 w-4" /> Add Airport
                          </Button>
                        </div>

                        {city.airports.length === 0 && (
                          <p className="text-sm text-muted-foreground">
                            No airports for {city.name || "this city"}. Optional.
                          </p>
                        )}

                        <div className="space-y-3">
                          {city.airports.map((airport, airportIndex) => (
                            <div key={`${airport._id ?? "new"}-${airportIndex}`} className="rounded-lg bg-muted/50 p-3">
                              <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                  <Label>Airport name</Label>
                                  <Input
                                    value={airport.name}
                                    onChange={(e) => updateAirport(cityIndex, airportIndex, "name", e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>IATA</Label>
                                  <Input
                                    className="uppercase"
                                    placeholder="DXB"
                                    maxLength={3}
                                    value={airport.iata}
                                    onChange={(e) => updateAirport(cityIndex, airportIndex, "iata", e.target.value.toUpperCase())}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Slug</Label>
                                  <Input
                                    value={airport.slug}
                                    onChange={(e) => updateAirport(cityIndex, airportIndex, "slug", toSlug(e.target.value))}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Type</Label>
                                  <Select
                                    value={airport.type}
                                    onValueChange={(v) => v && updateAirport(cityIndex, airportIndex, "type", v)}
                                  >
                                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      {AIRPORT_TYPES.map((t) => (
                                        <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex items-center gap-2 sm:col-span-2">
                                  <div className="flex-1 space-y-2">
                                    <Label>Aliases (comma-separated)</Label>
                                    <Input
                                      value={(airport.aliases ?? []).join(", ")}
                                      placeholder="e.g. Doha Intl, Old Doha Airport"
                                      onChange={(e) => updateAirportAliases(cityIndex, airportIndex, e.target.value)}
                                    />
                                  </div>
                                  <AvailabilityBadge
                                    type="airport"
                                    slug={airport.slug}
                                    aliases={airport.aliases ?? []}
                                    countryCode={form.code}
                                    citySlug={city.slug || toSlug(city.name)}
                                    exclude={form._id}
                                  />
                                </div>
                              </div>
                              <div className="mt-3 flex items-center justify-end">
                                <Button type="button" size="sm" variant="ghost" onClick={() => removeAirport(cityIndex, airportIndex)}>
                                  <Trash2 className="mr-1 h-4 w-4 text-destructive" /> Remove
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Publish</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => v && updateField("status", v)}
                >
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap gap-1">
                {form.status !== "published" && (
                  <Badge variant="outline">Hidden from site</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Cities</span>
                <span className="font-medium text-foreground">{form.cities.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Airports</span>
                <span className="font-medium text-foreground">
                  {form.cities.reduce((n, c) => n + c.airports.length, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Slug</span>
                <span className="font-medium text-foreground break-all text-right">/{form.slug}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}

interface AvailabilityBadgeProps {
  type: "airport" | "city";
  slug: string;
  aliases: string[];
  countryCode: string;
  citySlug?: string;
  exclude?: string;
}

function AvailabilityBadge({
  type,
  slug,
  aliases,
  countryCode,
  citySlug,
  exclude,
}: AvailabilityBadgeProps) {
  const [state, setState] = React.useState<"idle" | "checking" | "ok" | "conflict">("idle");

  const primary = slug || aliases[0] || "";

  React.useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      if (!primary) {
        setState("idle");
        return;
      }
      setState("checking");
      const params = new URLSearchParams({ type, slug: primary });
      if (aliases.length) params.set("aliases", aliases.join(","));
      if (countryCode) params.set("countryCode", countryCode);
      if (type === "airport" && citySlug) params.set("citySlug", citySlug);
      if (exclude) params.set("exclude", exclude);
      try {
        const res = await fetch(`/api/locations/check?${params.toString()}`);
        const data = await res.json();
        if (cancelled) return;
        if (data.conflictType === "parent") {
          // Parent just created in the same payload — skip the parent link check
          setState("idle");
        } else {
          setState(data.available ? "ok" : "conflict");
        }
      } catch {
        if (!cancelled) setState("idle");
      }
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, primary, aliases.join(","), countryCode, citySlug, exclude]);

  if (state === "checking") {
    return <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />;
  }
  if (state === "ok") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
        <CheckCircle2 className="h-3.5 w-3.5" /> Available
      </span>
    );
  }
  if (state === "conflict") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-destructive">
        <XCircle className="h-3.5 w-3.5" /> Slug/alias already taken
      </span>
    );
  }
  return null;
}