"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SERVICE_FEATURE_ICON_OPTIONS } from "@/components/services/service-icons";
import { SERVICE_STATUSES, SERVICE_IMAGE_SIDES } from "@/lib/validations/service";
import { toast } from "sonner";
import slugify from "slugify";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Layout,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionLibraryEditor } from "@/components/admin/section-library-editor";
import { MediaInput } from "@/components/admin/media-input";
import type { PageSection } from "@/components/services/sections/section-types";

type ServiceFeature = {
  icon: string;
  title: string;
  desc: string;
};

type ServiceCard = {
  image: string;
  tag: string;
  title: string;
  desc: string;
};

type ServiceSection = {
  image: string;
  imageAlt: string;
  title: string;
  paragraphs: string[];
  bullets: { text: string }[];
  imageSide: "left" | "right";
  dark: boolean;
};

type ServiceFaq = {
  q: string;
  a: string;
};

type ServiceData = {
  _id?: string;
  slug: string;
  title: string;
  subtitle: string;
  desc: string;
  heroImage: string;
  breadcrumb: string;
  features: ServiceFeature[];
  cardsHeading: string;
  cardsDesc: string;
  cards: ServiceCard[];
  sections: ServiceSection[];
  faqs: ServiceFaq[];
  ctaTitle: string;
  ctaDesc: string;
  ctaLabel: string;
  ctaHref: string;
  pageSections: PageSection[];
  status: string;
  showInMenu: boolean;
  order: number;
  locale: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };
};

const defaultService: ServiceData = {
  slug: "",
  title: "",
  subtitle: "",
  desc: "",
  heroImage: "",
  breadcrumb: "",
  features: [],
  cardsHeading: "",
  cardsDesc: "",
  cards: [],
  sections: [],
  faqs: [],
  ctaTitle: "",
  ctaDesc: "",
  ctaLabel: "",
  ctaHref: "",
  pageSections: [],
  status: "published",
  showInMenu: true,
  order: 0,
  locale: "en",
  seo: { metaTitle: "", metaDescription: "", ogImage: "" },
};

interface ServiceEditorProps {
  initialData?: ServiceData;
  mode?: "create" | "edit";
}

function normalizeService(data?: ServiceData): ServiceData {
  const d: ServiceData = data ?? ({} as ServiceData);
  return {
    ...defaultService,
    ...d,
    features: d.features?.map((f) => ({ icon: f.icon ?? "", title: f.title ?? "", desc: f.desc ?? "" })) ?? [],
    cards: d.cards?.map((c) => ({ image: c.image ?? "", tag: c.tag ?? "", title: c.title ?? "", desc: c.desc ?? "" })) ?? [],
    sections:
      d.sections?.map((s) => ({
        image: s.image ?? "",
        imageAlt: s.imageAlt ?? "",
        title: s.title ?? "",
        paragraphs: s.paragraphs ?? [],
        bullets: s.bullets ?? [],
        imageSide: s.imageSide ?? "left",
        dark: s.dark ?? false,
      })) ?? [],
    faqs: d.faqs?.map((f) => ({ q: f.q ?? "", a: f.a ?? "" })) ?? [],
    pageSections: (d.pageSections ?? []) as PageSection[],
    seo: {
      metaTitle: d.seo?.metaTitle ?? "",
      metaDescription: d.seo?.metaDescription ?? "",
      ogImage: d.seo?.ogImage ?? "",
    },
  };
}

const ParagraphCard = ({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) => (
  <Card>
    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-base">{title}</CardTitle>
      {action}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export function ServiceEditor({ initialData, mode = "create" }: ServiceEditorProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = React.useState<ServiceData>(() => normalizeService(initialData));
  const [openSections, setOpenSections] = React.useState<Record<number, boolean>>({});

  const isEdit = mode === "edit" && !!form._id;

  const mutation = useMutation({
    mutationFn: async (payload: ServiceData) => {
      const url = isEdit ? `/api/services/${form._id}` : "/api/services";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success(isEdit ? "Service updated" : "Service created");
      queryClient.invalidateQueries({ queryKey: ["services"] });
      router.push("/dashboard/services");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const update = <K extends keyof ServiceData>(key: K, value: ServiceData[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !isEdit) {
        next.slug = slugify(String(value), { lower: true, strict: true });
        if (!next.breadcrumb) next.breadcrumb = String(value);
      }
      // Auto-generate SEO metaTitle when title changes and SEO fields are empty
      if (key === "title" && !prev.seo.metaTitle) {
        next.seo = { ...next.seo, metaTitle: `${String(value)} | AB.Limo` };
      }
      // Auto-generate SEO metaDescription when subtitle/desc changes and SEO field is empty
      if ((key === "subtitle" || key === "desc") && !prev.seo.metaDescription) {
        const desc = String(value).trim();
        if (desc) next.seo = { ...next.seo, metaDescription: desc.slice(0, 160) };
      }
      // Auto-generate SEO metaDescription from title if subtitle is set and desc is empty
      if (key === "subtitle" && !prev.seo.metaDescription && prev.title) {
        const subtitle = String(value).trim();
        if (subtitle) {
          next.seo = { ...next.seo, metaDescription: subtitle.slice(0, 160) };
        }
      }
      return next;
    });
  };

  const updateSeo = (patch: Partial<ServiceData["seo"]>) =>
    setForm((prev) => ({ ...prev, seo: { ...prev.seo, ...patch } }));

  const regenerateSeo = () => {
    setForm((prev) => {
      const metaTitle = prev.seo.metaTitle || `${prev.title} | AB.Limo`;
      let metaDescription = prev.seo.metaDescription;
      if (!metaDescription) {
        metaDescription = prev.subtitle?.trim().slice(0, 160) || prev.desc?.trim().slice(0, 160) || prev.title;
      }
      const keywords = [
        prev.title,
        "AB.Limo",
        "luxury chauffeur",
        "premium transportation",
        "executive travel",
      ].filter(Boolean).join(", ");
      return {
        ...prev,
        seo: {
          metaTitle,
          metaDescription,
          ogImage: prev.seo.ogImage || prev.heroImage || "",
        },
      };
    });
    toast.success("SEO fields regenerated from content");
  };

  const addAt = <T,>(key: keyof ServiceData, item: T) =>
    setForm(
      (prev) => ({ ...prev, [key]: [...(prev[key] as unknown as T[]), item] }) as ServiceData
    );

  const updateAt = <K extends keyof ServiceData>(
    key: K,
    index: number,
    item: ServiceData[K] extends Array<infer T> ? T : never
  ) =>
    setForm((prev) => {
      const arr = [...(prev[key] as unknown as Array<typeof item>)];
      arr[index] = item;
      return { ...prev, [key]: arr } as ServiceData;
    });

  const removeAt = <K extends keyof ServiceData>(key: K, index: number) =>
    setForm((prev) => {
      const arr = (prev[key] as unknown as unknown[]).filter((_, i) => i !== index);
      return { ...prev, [key]: arr } as ServiceData;
    });

  const move = <K extends keyof ServiceData>(key: K, index: number, dir: -1 | 1) =>
    setForm((prev) => {
      const arr = [...(prev[key] as unknown as unknown[])];
      const target = index + dir;
      if (target < 0 || target >= arr.length) return prev;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return { ...prev, [key]: arr } as ServiceData;
    });

  const toggleSection = (index: number) =>
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    mutation.mutate({
      ...form,
      status: form.status,
      locale: form.locale || "en",
    });
  };

  const viewUrl = form.slug ? `/services/${form.slug}` : null;

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 px-4 pb-8 lg:px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {isEdit ? "Edit Service" : "New Service"}
        </h2>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          {isEdit && viewUrl && (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.open(viewUrl, "_blank")}
              >
                <ExternalLink className="h-4 w-4 mr-1" /> Preview Live
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.open(viewUrl, "_blank")}
              >
                View on Site
              </Button>
            </>
          )}
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Executive & Corporate Mobility" />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="executive-corporate-mobility" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="sections">
            <TabsList className="w-full">
              <TabsTrigger value="sections" className="flex-1">
                <Layout className="h-4 w-4 mr-1" /> Page Sections
              </TabsTrigger>
              <TabsTrigger value="legacy" className="flex-1">Legacy Content</TabsTrigger>
            </TabsList>

            <TabsContent value="sections" className="mt-4">
              <SectionLibraryEditor
                sections={form.pageSections}
                onChange={(sections) => update("pageSections", sections)}
                serviceSlug={form.slug}
              />
            </TabsContent>

            <TabsContent value="legacy" className="mt-4 space-y-6">
              <ParagraphCard title="Content">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input value={form.title} onChange={(e) => update("title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Breadcrumb</Label>
                <Input value={form.breadcrumb} onChange={(e) => update("breadcrumb", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Textarea rows={2} value={form.subtitle} onChange={(e) => update("subtitle", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Short Description (menu / index)</Label>
                <Textarea rows={2} value={form.desc} onChange={(e) => update("desc", e.target.value)} />
              </div>
              <MediaInput
                label="Hero Image"
                value={form.heroImage}
                onChange={(url) => update("heroImage", url)}
                accept="image"
              />
              {form.heroImage && (
                <img src={form.heroImage} alt="Hero preview" className="mt-2 h-40 w-full rounded-md object-cover" />
              )}
            </div>
          </ParagraphCard>

          {/* Features */}
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base">Feature Cards</CardTitle>
              <Button type="button" size="sm" variant="outline" onClick={() => addAt("features", { icon: "", title: "", desc: "" })}>
                <Plus className="h-4 w-4 mr-1" /> Add Feature
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.features.length === 0 && (
                <p className="text-sm text-muted-foreground">No features yet.</p>
              )}
              {form.features.map((f, i) => (
                <div key={i} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Feature {i + 1}</span>
                    <div className="flex items-center gap-1">
                      <Button type="button" variant="ghost" size="sm" onClick={() => move("features", i, -1)} disabled={i === 0}>
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => move("features", i, 1)} disabled={i === form.features.length - 1}>
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeAt("features", i)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <Select value={f.icon} onValueChange={(v) => v && updateAt("features", i, { ...f, icon: v })}>
                        <SelectTrigger><SelectValue placeholder="Pick an icon" /></SelectTrigger>
                        <SelectContent>
                          {SERVICE_FEATURE_ICON_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input value={f.title} onChange={(e) => updateAt("features", i, { ...f, title: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea rows={2} value={f.desc} onChange={(e) => updateAt("features", i, { ...f, desc: e.target.value })} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Cards */}
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base">Cards Grid</CardTitle>
              <Button type="button" size="sm" variant="outline" onClick={() => addAt("cards", { image: "", tag: "", title: "", desc: "" })}>
                <Plus className="h-4 w-4 mr-1" /> Add Card
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Heading</Label>
                  <Input value={form.cardsHeading} onChange={(e) => update("cardsHeading", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input value={form.cardsDesc} onChange={(e) => update("cardsDesc", e.target.value)} />
                </div>
              </div>
              {form.cards.length === 0 && (
                <p className="text-sm text-muted-foreground">No cards yet.</p>
              )}
              {form.cards.map((c, i) => (
                <div key={i} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Card {i + 1}</span>
                    <div className="flex items-center gap-1">
                      <Button type="button" variant="ghost" size="sm" onClick={() => move("cards", i, -1)} disabled={i === 0}>
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => move("cards", i, 1)} disabled={i === form.cards.length - 1}>
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeAt("cards", i)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <MediaInput
                      label="Image"
                      value={c.image}
                      onChange={(url) => updateAt("cards", i, { ...c, image: url })}
                      accept="image"
                    />
                    <div className="space-y-2">
                      <Label>Tag</Label>
                      <Input value={c.tag} onChange={(e) => updateAt("cards", i, { ...c, tag: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={c.title} onChange={(e) => updateAt("cards", i, { ...c, title: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea rows={2} value={c.desc} onChange={(e) => updateAt("cards", i, { ...c, desc: e.target.value })} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sections */}
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base">Sections</CardTitle>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  addAt("sections", { image: "", imageAlt: "", title: "", paragraphs: [], bullets: [], imageSide: "left", dark: false });
                }}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Section
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.sections.length === 0 && (
                <p className="text-sm text-muted-foreground">No sections yet.</p>
              )}
              {form.sections.map((s, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection(i)}
                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                  >
                    <span className="text-sm font-medium">{s.title || `Section ${i + 1}`}</span>
                    <div className="flex items-center gap-1">
                      <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); move("sections", i, -1); }} disabled={i === 0}>
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); move("sections", i, 1); }} disabled={i === form.sections.length - 1}>
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); removeAt("sections", i); }}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                      {openSections[i] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </button>
                  {openSections[i] && (
                    <div className="px-4 pb-4 space-y-3 border-t pt-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input value={s.title} onChange={(e) => updateAt("sections", i, { ...s, title: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label>Image Alt</Label>
                          <Input value={s.imageAlt} onChange={(e) => updateAt("sections", i, { ...s, imageAlt: e.target.value })} />
                        </div>
                      </div>
                      <MediaInput
                        label="Image"
                        value={s.image}
                        onChange={(url) => updateAt("sections", i, { ...s, image: url })}
                        accept="image"
                      />
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Image Side</Label>
                          <Select value={s.imageSide} onValueChange={(v) => v && updateAt("sections", i, { ...s, imageSide: v as "left" | "right" })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {SERVICE_IMAGE_SIDES.map((side) => (
                                <SelectItem key={side} value={side}>{side === "left" ? "Left" : "Right"}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <Label>Dark Background</Label>
                          <Switch checked={s.dark} onCheckedChange={(v) => updateAt("sections", i, { ...s, dark: v })} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Paragraphs (one per line)</Label>
                        <Textarea
                          rows={3}
                          value={s.paragraphs.join("\n")}
                          onChange={(e) =>
                            updateAt("sections", i, {
                              ...s,
                              paragraphs: e.target.value.split("\n").filter((p) => p.trim() !== ""),
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Bullets (one per line)</Label>
                        <Textarea
                          rows={3}
                          value={s.bullets.map((b) => b.text).join("\n")}
                          onChange={(e) =>
                            updateAt("sections", i, {
                              ...s,
                              bullets: e.target.value
                                .split("\n")
                                .filter((p) => p.trim() !== "")
                                .map((text) => ({ text })),
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base">FAQs</CardTitle>
              <Button type="button" size="sm" variant="outline" onClick={() => addAt("faqs", { q: "", a: "" })}>
                <Plus className="h-4 w-4 mr-1" /> Add FAQ
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.faqs.length === 0 && (
                <p className="text-sm text-muted-foreground">No FAQs yet.</p>
              )}
              {form.faqs.map((f, i) => (
                <div key={i} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">FAQ {i + 1}</span>
                    <div className="flex items-center gap-1">
                      <Button type="button" variant="ghost" size="sm" onClick={() => move("faqs", i, -1)} disabled={i === 0}>
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => move("faqs", i, 1)} disabled={i === form.faqs.length - 1}>
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeAt("faqs", i)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Question</Label>
                    <Input value={f.q} onChange={(e) => updateAt("faqs", i, { ...f, q: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Answer</Label>
                    <Textarea rows={3} value={f.a} onChange={(e) => updateAt("faqs", i, { ...f, a: e.target.value })} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* CTA */}
          <ParagraphCard title="Call To Action">
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={form.ctaTitle} onChange={(e) => update("ctaTitle", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Label</Label>
                  <Input value={form.ctaLabel} onChange={(e) => update("ctaLabel", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea rows={2} value={form.ctaDesc} onChange={(e) => update("ctaDesc", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Link (optional)</Label>
                <Input value={form.ctaHref} onChange={(e) => update("ctaHref", e.target.value)} placeholder={`/${"en-US"}/services`} />
              </div>
            </div>
          </ParagraphCard>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <ParagraphCard title="Publish">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => v && update("status", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SERVICE_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label>Show In Menu</Label>
                <Switch checked={form.showInMenu} onCheckedChange={(v) => update("showInMenu", v)} />
              </div>
              <div className="space-y-2">
                <Label>Order</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.order}
                  onChange={(e) => update("order", Number(e.target.value))}
                />
              </div>
            </div>
          </ParagraphCard>

          <ParagraphCard title="SEO">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Search Engine Optimization</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={regenerateSeo}
                  className="text-xs h-7"
                >
                  Regenerate SEO
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input value={form.seo.metaTitle} onChange={(e) => updateSeo({ metaTitle: e.target.value })} placeholder={`${form.title || "Service Title"} | AB.Limo`} />
                <p className="text-xs text-muted-foreground">{form.seo.metaTitle.length}/200 characters</p>
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea rows={3} value={form.seo.metaDescription} onChange={(e) => updateSeo({ metaDescription: e.target.value })} placeholder="Auto-generated from subtitle or description..." />
                <p className="text-xs text-muted-foreground">{form.seo.metaDescription.length}/160 characters</p>
              </div>
              <MediaInput
                label="OG Image"
                value={form.seo.ogImage}
                onChange={(url) => updateSeo({ ogImage: url })}
                accept="image"
              />
              <p className="text-xs text-muted-foreground">Fallback: hero image</p>
            </div>
          </ParagraphCard>
        </div>
      </div>
    </form>
  );
}

export type { ServiceData };