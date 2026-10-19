"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { TranslateButton } from "./TranslateButton";
import { LocationTemplateEditorCard } from "./location-template-editor-card";

export type FaqRecord = {
  q: string;
  a: string;
};

export type AirportRecord = {
  _id?: string;
  slug: string;
  name: string;
  nameAr: string;
  iata: string;
  aliases: string[];
  type: string;
  status: string;
};

export type CityRecord = {
  _id?: string;
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  aliases: string[];
  status: string;
  airports: AirportRecord[];
  faqs: FaqRecord[];
  faqsAr: FaqRecord[];
};

export type CountryRecord = {
  _id?: string;
  name: string;
  nameAr: string;
  code: string;
  slug: string;
  description: string;
  descriptionAr: string;
  status: string;
  cities: CityRecord[];
  faqs: FaqRecord[];
  faqsAr: FaqRecord[];
};

type CountryPayload = Omit<CountryRecord, "cities"> & {
  cities?: CityRecord[];
};

const DEFAULTS: CountryRecord = {
  name: "",
  nameAr: "",
  code: "",
  slug: "",
  description: "",
  descriptionAr: "",
  status: "published",
  cities: [],
  faqs: [],
  faqsAr: [],
};

const STATUS_OPTIONS = ["draft", "published", "archived"] as const;
const AIRPORT_TYPES = ["international", "domestic", "regional"] as const;

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

  const isoCountries = React.useMemo(() => allIsoCountries(), []);

  const mutation = useMutation({
    mutationFn: async (payload: CountryPayload) => {
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
    onSuccess: (data) => {
      toast.success(isEdit ? "Country updated" : "Country created");
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      queryClient.invalidateQueries({ queryKey: ["locations-meta"] });
      const createdId = !isEdit
        ? (data as { _id?: string } | undefined)?._id
        : undefined;
      if (createdId) {
        queryClient.invalidateQueries({ queryKey: ["location", createdId] });
        router.push(`/dashboard/locations/${createdId}`);
      } else {
        router.push("/dashboard/locations");
      }
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

  // ── Country FAQ helpers ──────────────────────────────────
  const addCountryFaq = () => {
    setForm((prev) => ({ ...prev, faqs: [...prev.faqs, { q: "", a: "" }] }));
  };

  const removeCountryFaq = (index: number) => {
    setForm((prev) => ({ ...prev, faqs: prev.faqs.filter((_, i) => i !== index) }));
  };

  const updateCountryFaq = (index: number, key: "q" | "a", value: string) => {
    setForm((prev) => {
      const faqs = [...prev.faqs];
      faqs[index] = { ...faqs[index], [key]: value };
      return { ...prev, faqs };
    });
  };

  const moveCountryFaq = (index: number, dir: -1 | 1) => {
    setForm((prev) => {
      const faqs = [...prev.faqs];
      const target = index + dir;
      if (target < 0 || target >= faqs.length) return prev;
      [faqs[index], faqs[target]] = [faqs[target], faqs[index]];
      return { ...prev, faqs };
    });
  };

  // ── Country Arabic FAQ helpers ──────────────────────────────
  const addCountryFaqAr = () => {
    setForm((prev) => ({ ...prev, faqsAr: [...prev.faqsAr, { q: "", a: "" }] }));
  };

  const removeCountryFaqAr = (index: number) => {
    setForm((prev) => ({ ...prev, faqsAr: prev.faqsAr.filter((_, i) => i !== index) }));
  };

  const updateCountryFaqAr = (index: number, key: "q" | "a", value: string) => {
    setForm((prev) => {
      const faqsAr = [...prev.faqsAr];
      faqsAr[index] = { ...faqsAr[index], [key]: value };
      return { ...prev, faqsAr };
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
    const payload: CountryPayload = { ...form };
    // Cities have their own screen — leave the stored array untouched on save.
    if (isEdit) delete payload.cities;
    mutation.mutate(payload);
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

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Country</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="country-name">Country name *</Label>
                    <TranslateButton
                      text={form.name}
                      onTranslated={(v, dir) => dir === "ar" ? updateField("nameAr", v) : updateField("nameAr", "")}
                    />
                  </div>
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
                <div className="space-y-2">
                  <Label htmlFor="country-name-ar">Arabic Name</Label>
                  <Input
                    id="country-name-ar"
                    placeholder="الاسم بالعربية"
                    value={form.nameAr}
                    onChange={(e) => updateField("nameAr", e.target.value)}
                    dir="rtl"
                  />
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
                  <div className="flex items-center gap-2">
                    <Label htmlFor="country-description">Description</Label>
                    <TranslateButton
                      text={form.description}
                      onTranslated={(v, dir) => dir === "ar" ? updateField("descriptionAr", v) : updateField("descriptionAr", "")}
                    />
                  </div>
                  <Textarea
                    id="country-description"
                    rows={3}
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country-description-ar">Arabic Description</Label>
                  <Textarea
                    id="country-description-ar"
                    rows={3}
                    placeholder="الوصف بالعربية"
                    value={form.descriptionAr}
                    onChange={(e) => updateField("descriptionAr", e.target.value)}
                    dir="rtl"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Country FAQs</CardTitle>
                <Button type="button" size="sm" onClick={addCountryFaq}>
                  <Plus className="mr-1 h-4 w-4" /> Add FAQ
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {form.faqs.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No FAQs yet. Add frequently asked questions about this country.
                  </p>
                )}
                {form.faqs.map((faq, faqIndex) => (
                  <div key={faqIndex} className="rounded-lg border p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">FAQ {faqIndex + 1}</span>
                      <div className="flex items-center gap-1">
                        <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => moveCountryFaq(faqIndex, -1)} disabled={faqIndex === 0}>
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => moveCountryFaq(faqIndex, 1)} disabled={faqIndex === form.faqs.length - 1}>
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                        <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => removeCountryFaq(faqIndex)}>
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Question"
                        value={faq.q}
                        onChange={(e) => updateCountryFaq(faqIndex, "q", e.target.value)}
                      />
                      <TranslateButton
                        text={faq.q}
                        onTranslated={(v, dir) => {
                          if (dir === "ar") updateCountryFaqAr(faqIndex, "q", v);
                          else updateCountryFaqAr(faqIndex, "q", "");
                        }}
                      />
                    </div>
                    <div className="flex items-start gap-2">
                      <Textarea
                        rows={3}
                        placeholder="Answer"
                        value={faq.a}
                        onChange={(e) => updateCountryFaq(faqIndex, "a", e.target.value)}
                        className="flex-1"
                      />
                      <TranslateButton
                        text={faq.a}
                        onTranslated={(v, dir) => {
                          if (dir === "ar") updateCountryFaqAr(faqIndex, "a", v);
                          else updateCountryFaqAr(faqIndex, "a", "");
                        }}
                        className="mt-2"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Country FAQs (Arabic)</CardTitle>
                <Button type="button" size="sm" onClick={addCountryFaqAr}>
                  <Plus className="mr-1 h-4 w-4" /> Add FAQ
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {form.faqsAr.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No Arabic FAQs yet.
                  </p>
                )}
                {form.faqsAr.map((faq, faqIndex) => (
                  <div key={faqIndex} className="rounded-lg border p-3 space-y-3" dir="rtl">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">FAQ {faqIndex + 1}</span>
                      <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => removeCountryFaqAr(faqIndex)}>
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                    <Input
                      placeholder="السؤال"
                      value={faq.q}
                      onChange={(e) => updateCountryFaqAr(faqIndex, "q", e.target.value)}
                    />
                    <Textarea
                      rows={3}
                      placeholder="الإجابة"
                      value={faq.a}
                      onChange={(e) => updateCountryFaqAr(faqIndex, "a", e.target.value)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Page Templates</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Sections that render this country&apos;s page. One template
                  serves every language — Arabic pages show it translated
                  automatically on the frontend.
                </p>
              </CardHeader>
              <CardContent>
                {isEdit && form.slug ? (
                  <LocationTemplateEditorCard
                    pageType="country"
                    refKey={form.slug}
                    scope="country"
                    title="Country Page Template"
                    description={`Renders the /locations/${form.slug} page`}
                    faqContextItems={form.faqs}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Save the country first — page templates are stored against its
                    slug and appear here once the country exists.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
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
                  <span>FAQs</span>
                  <span className="font-medium text-foreground">
                    {form.faqs.length + form.cities.reduce((n, c) => n + c.faqs.length, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Slug</span>
                  <span className="font-medium text-foreground break-all text-right">/{form.slug}</span>
                </div>
                {isEdit && form._id && (
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/dashboard/locations/${form._id}/city`}>
                      Manage Cities
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </aside>
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

export function AvailabilityBadge({
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