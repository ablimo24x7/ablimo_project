"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ArrowRight } from "lucide-react";

type RouteRecord = {
  _id?: string;
  fromCity: string;
  fromCityName: string;
  toCity: string;
  toCityName: string;
  distance: string;
  duration: string;
  countrySlug: string;
  status: string;
};

type CityOption = { slug: string; name: string; countryName: string; countrySlug: string };

const DEFAULTS: RouteRecord = {
  fromCity: "",
  fromCityName: "",
  toCity: "",
  toCityName: "",
  distance: "",
  duration: "",
  countrySlug: "",
  status: "published",
};

const STATUS_OPTIONS = ["draft", "published", "archived"] as const;

interface RouteEditorProps {
  initialData?: RouteRecord;
  mode?: "create" | "edit";
}

export function RouteEditor({ initialData, mode = "create" }: RouteEditorProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEdit = mode === "edit" && !!initialData?._id;

  const [form, setForm] = React.useState<RouteRecord>(
    initialData ? { ...DEFAULTS, ...initialData } : DEFAULTS
  );

  const { data: cityData } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await fetch("/api/locations");
      if (!res.ok) throw new Error("Failed to load cities");
      return res.json() as Promise<{ countries: Array<{ name: string; slug: string; cities: Array<{ slug: string; name: string }> }> }>;
    },
  });

  const cities: CityOption[] = React.useMemo(() => {
    const out: CityOption[] = [];
    for (const country of cityData?.countries ?? []) {
      for (const c of country.cities ?? []) {
        out.push({ slug: c.slug, name: c.name, countryName: country.name, countrySlug: country.slug });
      }
    }
    return out.sort((a, b) => a.name.localeCompare(b.name));
  }, [cityData]);

  const cityLabel = (slug: string) => {
    const c = cities.find((x) => x.slug === slug);
    return c ? `${c.name} — ${c.countryName}` : "";
  };

  const mutation = useMutation({
    mutationFn: async (payload: RouteRecord) => {
      const url = isEdit && initialData?._id
        ? `/api/locations/routes/${initialData._id}`
        : "/api/locations/routes";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save route");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success(isEdit ? "Route updated" : "Route created");
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      router.push("/dashboard/routes");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateField = <K extends keyof RouteRecord>(key: K, value: RouteRecord[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCityChange = (
    key: "fromCity" | "toCity",
    nameKey: "fromCityName" | "toCityName",
    value: string
  ) => {
    const slug = value.trim().toLowerCase();
    const found = cities.find((x) => x.slug === slug);
    setForm((prev) => ({
      ...prev,
      [key]: slug,
      [nameKey]: found ? found.name : prev[nameKey],
      ...(key === "fromCity" && found ? { countrySlug: found.countrySlug || prev.countrySlug } : {}),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fromCity.trim() || !form.toCity.trim()) {
      toast.error("Both cities are required");
      return;
    }
    if (form.fromCity === form.toCity) {
      toast.error("Route cannot be between the same city");
      return;
    }
    mutation.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {isEdit ? "Edit Route" : "New Route"}
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
            <CardHeader><CardTitle>Route</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from-city">From city *</Label>
                  <Input
                    id="from-city"
                    list="city-slugs"
                    placeholder="city slug, e.g. dubai"
                    value={form.fromCity}
                    onChange={(e) => handleCityChange("fromCity", "fromCityName", e.target.value)}
                  />
                  {form.fromCity && (
                    <p className="text-xs text-muted-foreground">{cityLabel(form.fromCity)}</p>
                  )}
                </div>
                <div className="space-y-2 flex items-end">
                  <Input
                    placeholder="From city name"
                    value={form.fromCityName}
                    onChange={(e) => updateField("fromCityName", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center text-muted-foreground">
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="to-city">To city *</Label>
                  <Input
                    id="to-city"
                    list="city-slugs"
                    placeholder="city slug, e.g. abu-dhabi"
                    value={form.toCity}
                    onChange={(e) => handleCityChange("toCity", "toCityName", e.target.value)}
                  />
                  {form.toCity && (
                    <p className="text-xs text-muted-foreground">{cityLabel(form.toCity)}</p>
                  )}
                </div>
                <div className="space-y-2 flex items-end">
                  <Input
                    placeholder="To city name"
                    value={form.toCityName}
                    onChange={(e) => updateField("toCityName", e.target.value)}
                  />
                </div>
              </div>

              <datalist id="city-slugs">
                {cities.map((c) => (
                  <option key={c.slug} value={c.slug}>{`${c.name} — ${c.countryName}`}</option>
                ))}
              </datalist>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="route-distance">Distance</Label>
                  <Input
                    id="route-distance"
                    placeholder="e.g. 120 km"
                    value={form.distance}
                    onChange={(e) => updateField("distance", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="route-duration">Duration</Label>
                  <Input
                    id="route-duration"
                    placeholder="e.g. 1h 30m"
                    value={form.duration}
                    onChange={(e) => updateField("duration", e.target.value)}
                  />
                </div>
              </div>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Route</span>
                <span className="font-medium text-foreground break-all text-right">
                  {form.fromCity || "…"} → {form.toCity || "…"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}