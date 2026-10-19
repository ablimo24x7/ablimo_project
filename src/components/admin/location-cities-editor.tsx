"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { toSlug } from "@/lib/slug";
import { TranslateButton } from "./TranslateButton";
import { LocationTemplateEditorCard } from "./location-template-editor-card";
import {
  AvailabilityBadge,
  type AirportRecord,
  type CityRecord,
  type CountryRecord,
} from "./location-editor";

const AIRPORT_TYPES = ["international", "domestic", "regional"] as const;

function blankAirport(): AirportRecord {
  return { slug: "", name: "", nameAr: "", iata: "", aliases: [], type: "international", status: "published" };
}

function blankCity(): CityRecord {
  return { slug: "", name: "", nameAr: "", description: "", descriptionAr: "", aliases: [], status: "published", airports: [], faqs: [], faqsAr: [] };
}

interface LocationCitiesEditorProps {
  initialData: CountryRecord;
}

export function LocationCitiesEditor({ initialData }: LocationCitiesEditorProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const countryId = initialData._id;

  const [cities, setCities] = React.useState<CityRecord[]>(initialData.cities ?? []);
  const [expandedCity, setExpandedCity] = React.useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: async (payload: CityRecord[]) => {
      if (!countryId) throw new Error("Country not found");
      const res = await fetch(`/api/locations/${countryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cities: payload }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save cities");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Cities updated");
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      queryClient.invalidateQueries({ queryKey: ["locations-meta"] });
      queryClient.invalidateQueries({ queryKey: ["location-cities"] });
      if (countryId) queryClient.invalidateQueries({ queryKey: ["location", countryId] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  // ── City helpers ────────────────────────────────────────
  const addCity = () => {
    const nextIndex = cities.length;
    setCities((prev) => [...prev, blankCity()]);
    setExpandedCity(nextIndex);
  };

  const removeCity = (index: number) => {
    setCities((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCity = (
    index: number,
    key: Exclude<keyof CityRecord, "airports" | "aliases" | "faqs" | "faqsAr">,
    value: string
  ) => {
    setCities((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [key]: value,
        ...(key === "name" && !next[index]._id
          ? { slug: value.trim() ? toSlug(value) : next[index].slug }
          : {}),
      };
      return next;
    });
  };

  const updateCityAliases = (index: number, value: string) => {
    setCities((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        aliases: value
          .split(",")
          .map((a) => a.trim().toLowerCase())
          .filter(Boolean),
      };
      return next;
    });
  };

  // ── Airport helpers ─────────────────────────────────────
  const addAirport = (cityIndex: number) => {
    setCities((prev) => {
      const next = [...prev];
      next[cityIndex] = { ...next[cityIndex], airports: [...next[cityIndex].airports, blankAirport()] };
      return next;
    });
  };

  const removeAirport = (cityIndex: number, airportIndex: number) => {
    setCities((prev) => {
      const next = [...prev];
      next[cityIndex] = {
        ...next[cityIndex],
        airports: next[cityIndex].airports.filter((_, i) => i !== airportIndex),
      };
      return next;
    });
  };

  const updateAirport = (
    cityIndex: number,
    airportIndex: number,
    key: keyof AirportRecord,
    value: string
  ) => {
    setCities((prev) => {
      const next = [...prev];
      const airports = [...next[cityIndex].airports];
      airports[airportIndex] = {
        ...airports[airportIndex],
        [key]: value,
        ...(key === "name" && !airports[airportIndex]._id
          ? { slug: value.trim() ? toSlug(value) : airports[airportIndex].slug }
          : {}),
      };
      next[cityIndex] = { ...next[cityIndex], airports };
      return next;
    });
  };

  const updateAirportAliases = (cityIndex: number, airportIndex: number, value: string) => {
    setCities((prev) => {
      const next = [...prev];
      const airports = [...next[cityIndex].airports];
      airports[airportIndex] = {
        ...airports[airportIndex],
        aliases: value
          .split(",")
          .map((a) => a.trim().toLowerCase())
          .filter(Boolean),
      };
      next[cityIndex] = { ...next[cityIndex], airports };
      return next;
    });
  };

  // ── City FAQ helpers ─────────────────────────────────────
  const addCityFaq = (cityIndex: number) => {
    setCities((prev) => {
      const next = [...prev];
      next[cityIndex] = { ...next[cityIndex], faqs: [...next[cityIndex].faqs, { q: "", a: "" }] };
      return next;
    });
  };

  const removeCityFaq = (cityIndex: number, faqIndex: number) => {
    setCities((prev) => {
      const next = [...prev];
      next[cityIndex] = { ...next[cityIndex], faqs: next[cityIndex].faqs.filter((_, i) => i !== faqIndex) };
      return next;
    });
  };

  const updateCityFaq = (cityIndex: number, faqIndex: number, key: "q" | "a", value: string) => {
    setCities((prev) => {
      const next = [...prev];
      const faqs = [...next[cityIndex].faqs];
      faqs[faqIndex] = { ...faqs[faqIndex], [key]: value };
      next[cityIndex] = { ...next[cityIndex], faqs };
      return next;
    });
  };

  const moveCityFaq = (cityIndex: number, faqIndex: number, dir: -1 | 1) => {
    setCities((prev) => {
      const next = [...prev];
      const faqs = [...next[cityIndex].faqs];
      const target = faqIndex + dir;
      if (target < 0 || target >= faqs.length) return prev;
      [faqs[faqIndex], faqs[target]] = [faqs[target], faqs[faqIndex]];
      next[cityIndex] = { ...next[cityIndex], faqs };
      return next;
    });
  };

  // ── City Arabic FAQ helpers ──────────────────────────────
  const addCityFaqAr = (cityIndex: number) => {
    setCities((prev) => {
      const next = [...prev];
      next[cityIndex] = { ...next[cityIndex], faqsAr: [...next[cityIndex].faqsAr, { q: "", a: "" }] };
      return next;
    });
  };

  const removeCityFaqAr = (cityIndex: number, faqIndex: number) => {
    setCities((prev) => {
      const next = [...prev];
      next[cityIndex] = { ...next[cityIndex], faqsAr: next[cityIndex].faqsAr.filter((_, i) => i !== faqIndex) };
      return next;
    });
  };

  const updateCityFaqAr = (cityIndex: number, faqIndex: number, key: "q" | "a", value: string) => {
    setCities((prev) => {
      const next = [...prev];
      const faqsAr = [...next[cityIndex].faqsAr];
      faqsAr[faqIndex] = { ...faqsAr[faqIndex], [key]: value };
      next[cityIndex] = { ...next[cityIndex], faqsAr };
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cities.some((c) => !c.name.trim())) {
      toast.error("Every city needs a name");
      return;
    }
    if (cities.some((c) => !c.slug.trim())) {
      toast.error("Every city needs a slug");
      return;
    }
    mutation.mutate(cities);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">
            Cities{initialData.name ? ` — ${initialData.name}` : ""}
          </h2>
          <p className="text-sm text-muted-foreground">
            Cities, airports, FAQs and page templates of this country.
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save Cities"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Cities</CardTitle>
              <Button type="button" size="sm" onClick={addCity}>
                <Plus className="mr-1 h-4 w-4" /> Add City
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {cities.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No cities yet. Add the main cities you serve in this country.
                </p>
              )}

              {cities.map((city, cityIndex) => {
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
                            <div className="flex items-center gap-2">
                              <Label>City name</Label>
                              <TranslateButton
                                text={city.name}
                                onTranslated={(v, dir) => dir === "ar" ? updateCity(cityIndex, "nameAr", v) : updateCity(cityIndex, "nameAr", "")}
                              />
                            </div>
                            <Input
                              value={city.name}
                              onChange={(e) => updateCity(cityIndex, "name", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Arabic Name</Label>
                            <Input
                              value={city.nameAr}
                              onChange={(e) => updateCity(cityIndex, "nameAr", e.target.value)}
                              dir="rtl"
                              placeholder="الاسم بالعربية"
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
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label>Description</Label>
                            <TranslateButton
                              text={city.description}
                              onTranslated={(v, dir) => dir === "ar" ? updateCity(cityIndex, "descriptionAr", v) : updateCity(cityIndex, "descriptionAr", "")}
                            />
                          </div>
                          <Textarea
                            rows={2}
                            value={city.description}
                            onChange={(e) => updateCity(cityIndex, "description", e.target.value)}
                            placeholder="City description"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Arabic Description</Label>
                          <Textarea
                            rows={2}
                            value={city.descriptionAr}
                            onChange={(e) => updateCity(cityIndex, "descriptionAr", e.target.value)}
                            dir="rtl"
                            placeholder="الوصف بالعربية"
                          />
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
                            countryCode={initialData.code}
                            exclude={countryId}
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
                                    countryCode={initialData.code}
                                    citySlug={city.slug || toSlug(city.name)}
                                    exclude={countryId}
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

                        <div className="space-y-3 pt-2">
                          <div className="flex items-center justify-between">
                            <Label>City FAQs</Label>
                            <Button type="button" size="sm" variant="outline" onClick={() => addCityFaq(cityIndex)}>
                              <Plus className="mr-1 h-4 w-4" /> Add FAQ
                            </Button>
                          </div>
                          {city.faqs.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                              No FAQs yet for {city.name || "this city"}.
                            </p>
                          )}
                          {city.faqs.map((faq, faqIndex) => (
                            <div key={faqIndex} className="rounded-lg bg-muted/50 p-3 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground">FAQ {faqIndex + 1}</span>
                                <div className="flex items-center gap-1">
                                  <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => moveCityFaq(cityIndex, faqIndex, -1)} disabled={faqIndex === 0}>
                                    <ChevronUp className="h-3 w-3" />
                                  </Button>
                                  <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => moveCityFaq(cityIndex, faqIndex, 1)} disabled={faqIndex === city.faqs.length - 1}>
                                    <ChevronDown className="h-3 w-3" />
                                  </Button>
                                  <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => removeCityFaq(cityIndex, faqIndex)}>
                                    <Trash2 className="h-3 w-3 text-destructive" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Input
                                  placeholder="Question"
                                  value={faq.q}
                                  onChange={(e) => updateCityFaq(cityIndex, faqIndex, "q", e.target.value)}
                                />
                                <TranslateButton
                                  text={faq.q}
                                  onTranslated={(v, dir) => dir === "ar" ? updateCityFaqAr(cityIndex, faqIndex, "q", v) : updateCityFaqAr(cityIndex, faqIndex, "q", "")}
                                />
                              </div>
                              <div className="flex items-start gap-2">
                                <Textarea
                                  rows={3}
                                  placeholder="Answer"
                                  value={faq.a}
                                  onChange={(e) => updateCityFaq(cityIndex, faqIndex, "a", e.target.value)}
                                  className="flex-1"
                                />
                                <TranslateButton
                                  text={faq.a}
                                  onTranslated={(v, dir) => dir === "ar" ? updateCityFaqAr(cityIndex, faqIndex, "a", v) : updateCityFaqAr(cityIndex, faqIndex, "a", "")}
                                  className="mt-2"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3 pt-2">
                          <div className="flex items-center justify-between">
                            <Label>City FAQs (Arabic)</Label>
                            <Button type="button" size="sm" variant="outline" onClick={() => addCityFaqAr(cityIndex)}>
                              <Plus className="mr-1 h-4 w-4" /> Add FAQ
                            </Button>
                          </div>
                          {city.faqsAr.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                              No Arabic FAQs yet.
                            </p>
                          )}
                          {city.faqsAr.map((faq, faqIndex) => (
                            <div key={faqIndex} className="rounded-lg bg-muted/50 p-3 space-y-3" dir="rtl">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground">FAQ {faqIndex + 1}</span>
                                <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => removeCityFaqAr(cityIndex, faqIndex)}>
                                  <Trash2 className="h-3 w-3 text-destructive" />
                                </Button>
                              </div>
                              <Input
                                placeholder="السؤال"
                                value={faq.q}
                                onChange={(e) => updateCityFaqAr(cityIndex, faqIndex, "q", e.target.value)}
                              />
                              <Textarea
                                rows={3}
                                placeholder="الإجابة"
                                value={faq.a}
                                onChange={(e) => updateCityFaqAr(cityIndex, faqIndex, "a", e.target.value)}
                              />
                            </div>
                          ))}
                        </div>

                        {/* City page template */}
                        {city._id && city.slug && initialData.slug && (
                          <div className="pt-4">
                            <LocationTemplateEditorCard
                              pageType="city"
                              refKey={`${initialData.slug}/${city.slug}`}
                              scope="city"
                              title="City Page Template"
                              description={`Sections rendered on the ${city.name || city.slug} page`}
                              faqContextItems={city.faqs}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Page Templates</CardTitle>
              <p className="text-sm text-muted-foreground">
                Sections that render every city-to-city route page of this
                country. One template serves every language — Arabic pages
                show it translated automatically on the frontend.
              </p>
            </CardHeader>
            <CardContent>
              {initialData.slug ? (
                <LocationTemplateEditorCard
                  pageType="route"
                  refKey={initialData.slug}
                  scope="route"
                  title="Route Page Template"
                  description="Shared by every city-to-city route page of this country"
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  The shared route template is stored against the country&apos;s
                  slug and appears here once the country exists.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Cities</span>
                <span className="font-medium text-foreground">{cities.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Airports</span>
                <span className="font-medium text-foreground">
                  {cities.reduce((n, c) => n + c.airports.length, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>FAQs</span>
                <span className="font-medium text-foreground">
                  {cities.reduce((n, c) => n + c.faqs.length, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Country</span>
                <span className="font-medium text-foreground break-all text-right">/{initialData.slug}</span>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/dashboard/locations/${countryId}`}>
                  Country Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </form>
  );
}
