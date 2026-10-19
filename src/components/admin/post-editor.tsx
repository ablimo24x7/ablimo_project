"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
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
import { Badge } from "@/components/ui/badge";
import { WysiwygEditor } from "@/components/ui/wysiwyg-editor";
import { SectionEditor } from "./section-editor";
import { SectionLibraryEditor } from "./section-library-editor";
import { toast } from "sonner";
import { Plus, Trash2, ChevronUp, ChevronDown, FileText, LayoutGrid } from "lucide-react";
import { TranslateButton } from "./TranslateButton";
import type { TextImageSectionType, CardsSectionType } from "@/lib/validations/location";
import { CITY_TEMPLATE_PRESETS } from "@/components/services/Templates/City";
import type { PageSection } from "@/components/services/sections/section-types";
import { usePermissions } from "@/hooks/use-permissions";
import { StructurePermissionsProvider } from "@/components/providers/structure-permissions";

type SectionUnion = TextImageSectionType | CardsSectionType | PageSection;

type FaqItem = { q: string; a: string };

type PostData = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  status: string;
  templateType: string;
  serviceSlug: string;
  countrySlug: string;
  country: string;
  citySlug: string;
  city: string;
  whatsappNumber: string;
  contentMode: "wysiwyg" | "sections" | "page-sections";
  bodyContent: string;
  keyTakeawaysContent: string;
  finalThoughtsContent: string;
  sections: SectionUnion[];
  featured: boolean;
  tags: string[];
  authorName: string;
  date: string;
  readTime: number;
  articleMedia: {
    heroCoverMedia: { url: string };
  };
  faqs: FaqItem[];
  seo_metadata: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };
};

const defaultPost: PostData = {
  title: "",
  slug: "",
  excerpt: "",
  category: "",
  categoryLabel: "",
  status: "published",
  templateType: "service-country",
  serviceSlug: "",
  countrySlug: "",
  country: "",
  citySlug: "",
  city: "",
  whatsappNumber: "",
  contentMode: "wysiwyg",
  bodyContent: "",
  keyTakeawaysContent: "",
  finalThoughtsContent: "",
  sections: [],
  featured: false,
  tags: [],
  authorName: "",
  date: new Date().toISOString().slice(0, 10),
  readTime: 5,
  articleMedia: { heroCoverMedia: { url: "" } },
  faqs: [],
  seo_metadata: { metaTitle: "", metaDescription: "", ogImage: "" },
};

interface PostEditorProps {
  initialData?: PostData;
  initialBlogType?: "country" | "city";
  mode?: "create" | "edit";
}

function normalizePost(data?: PostData): PostData {
  const d: Partial<PostData> = data ?? {};
  return {
    ...defaultPost,
    ...d,
    articleMedia: {
      heroCoverMedia: {
        url: d.articleMedia?.heroCoverMedia?.url ?? defaultPost.articleMedia.heroCoverMedia.url,
      },
    },
    faqs: (d.faqs ?? []).map((f) => ({ q: f.q ?? "", a: f.a ?? "" })),
    seo_metadata: {
      metaTitle: d.seo_metadata?.metaTitle ?? "",
      metaDescription: d.seo_metadata?.metaDescription ?? "",
      ogImage: d.seo_metadata?.ogImage ?? "",
    },
    sections: Array.isArray(d.sections) ? d.sections : [],
  };
}

export function PostEditor({ initialData, initialBlogType = "country", mode = "create" }: PostEditorProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = React.useState<PostData>(() => normalizePost(initialData));
  const [tagInput, setTagInput] = React.useState("");
  const isDirtyRef = React.useRef(false);
  const { canCreate, canUpdate, canManageStructure } = usePermissions();

  // Repopulate the form when fresh server data arrives (e.g. a background
  // refetch returning the saved post), unless the user already made edits.
  React.useEffect(() => {
    if (!initialData || isDirtyRef.current) return;
    setForm(normalizePost(initialData));
  }, [initialData]);

  const blogType: "country" | "city" =
    initialData?.templateType === "service-city" ? "city" : initialBlogType;

  const templateType = blogType === "city" ? "service-city" : "service-country";

  // Fetch all services from database
  const { data: servicesData } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const res = await fetch("/api/services?limit=100");
      if (!res.ok) return { items: [] };
      return res.json();
    },
  });
  const serviceOptions = (servicesData?.items ?? []).map((s: { slug: string; title: string }) => ({
    slug: s.slug,
    label: s.title,
  }));

  // Fetch all countries/locations from database
  const { data: locationsData } = useQuery({
    queryKey: ["admin-locations"],
    queryFn: async () => {
      const res = await fetch("/api/locations");
      if (!res.ok) return { countries: [] };
      return res.json();
    },
  });
  const countries = locationsData?.countries ?? [];

  const selectedCountry = React.useMemo(
    () => countries.find((c: { slug: string }) => c.slug === form.countrySlug),
    [form.countrySlug, countries]
  );

  const cityOptions = React.useMemo(
    () => selectedCountry?.cities ?? [],
    [selectedCountry]
  );

  const isEdit = mode === "edit" && form._id;

  const generateSlug = React.useCallback(
    (serviceSlug: string, countrySlug: string, citySlug: string, type: "country" | "city") => {
      if (type === "city" && serviceSlug && countrySlug && citySlug) {
        return `services/${serviceSlug}/${countrySlug}/${citySlug}`;
      }
      if (type === "country" && serviceSlug && countrySlug) {
        return `services/${serviceSlug}/${countrySlug}`;
      }
      return "";
    },
    []
  );

  const mutation = useMutation({
    mutationFn: async (payload: PostData) => {
      const body = { ...payload } as Record<string, unknown>;
      // Mongoose owns these — sending them back can desync the version key.
      delete body._id;
      delete body.__v;
      delete body.createdAt;
      delete body.updatedAt;

      const url = isEdit ? `/api/articles/${form._id}` : "/api/articles";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success(isEdit ? "Post updated" : "Post created");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (form._id) queryClient.invalidateQueries({ queryKey: ["post", form._id] });
      router.push("/dashboard/posts");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const updateField = <K extends keyof PostData>(key: K, value: PostData[K]) => {
    isDirtyRef.current = true;
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      const service = key === "serviceSlug" ? (value as string) : prev.serviceSlug;
      const country = key === "countrySlug" ? (value as string) : prev.countrySlug;
      const city = key === "citySlug" ? (value as string) : prev.citySlug;
      next.slug = generateSlug(service, country, city, blogType);

      // Auto-generate SEO from title when title changes and SEO fields are empty
      if (key === "title" && !prev.seo_metadata.metaTitle) {
        next.seo_metadata = { ...next.seo_metadata, metaTitle: `${String(value)} | AB.Limo` };
      }
      // Auto-generate SEO metaDescription from excerpt when excerpt changes and SEO field is empty
      if (key === "excerpt" && !prev.seo_metadata.metaDescription) {
        next.seo_metadata = { ...next.seo_metadata, metaDescription: String(value).slice(0, 160) };
      }
      // Auto-fill OG image from hero cover if empty
      if (key === "articleMedia" && !prev.seo_metadata.ogImage) {
        const media = value as PostData["articleMedia"];
        if (media?.heroCoverMedia?.url) {
          next.seo_metadata = { ...next.seo_metadata, ogImage: media.heroCoverMedia.url };
        }
      }

      return next;
    });
  };

  const regenerateSeo = () => {
    isDirtyRef.current = true;
    setForm((prev) => {
      const metaTitle = prev.seo_metadata.metaTitle || `${prev.title} | AB.Limo`;
      let metaDescription = prev.seo_metadata.metaDescription;
      if (!metaDescription) {
        metaDescription = prev.excerpt?.trim().slice(0, 160) || prev.title;
      }
      const ogImage = prev.seo_metadata.ogImage || prev.articleMedia?.heroCoverMedia?.url || "";
      return {
        ...prev,
        seo_metadata: { metaTitle, metaDescription, ogImage },
      };
    });
    toast.success("SEO fields regenerated from content");
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      updateField("tags", [...form.tags, t]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    updateField("tags", form.tags.filter((t) => t !== tag));
  };

  // ── FAQ helpers ──────────────────────────────────────────
  const addFaq = () => {
    updateField("faqs", [...form.faqs, { q: "", a: "" }]);
  };

  const removeFaq = (index: number) => {
    updateField("faqs", form.faqs.filter((_, i) => i !== index));
  };

  const updateFaq = (index: number, key: "q" | "a", value: string) => {
    const faqs = [...form.faqs];
    faqs[index] = { ...faqs[index], [key]: value };
    updateField("faqs", faqs);
  };

  const moveFaq = (index: number, dir: -1 | 1) => {
    const faqs = [...form.faqs];
    const target = index + dir;
    if (target < 0 || target >= faqs.length) return;
    [faqs[index], faqs[target]] = [faqs[target], faqs[index]];
    updateField("faqs", faqs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!form.serviceSlug) {
      toast.error("Service is required");
      return;
    }
    if (!form.countrySlug) {
      toast.error("Country is required");
      return;
    }
    if (blogType === "city" && !form.citySlug) {
      toast.error("City is required for city-specific articles");
      return;
    }
    mutation.mutate({ ...form, templateType });
  };

  if (!isEdit && !canCreate) {
    return (
      <div className="px-4 lg:px-6">
        <div className="max-w-lg rounded-lg border bg-muted/40 p-6 text-sm text-muted-foreground">
          Your role can edit existing posts only. Ask an administrator to create
          new posts.
        </div>
      </div>
    );
  }

  return (
    <StructurePermissionsProvider canManage={canManageStructure}>
    <form onSubmit={handleSubmit} className="grid gap-6 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {isEdit ? "Edit Post" : "New Post"}
        </h2>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          {isEdit && form.slug && (
            <Button
              type="button"
              variant="outline"
              onClick={() => window.open(`/services/${form.slug.replace(/^services\//, "")}?preview=true`, "_blank")}
            >
              Preview
            </Button>
          )}
          {canUpdate && (
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : isEdit ? "Update" : "Create"}
            </Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Title *</Label>
                  <TranslateButton
                    text={form.title}
                    onTranslated={(v) => updateField("title", v)}
                  />
                </div>
                <Input value={form.title} onChange={(e) => updateField("title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Slug (auto-generated)</Label>
                <Input value={form.slug} readOnly className="bg-muted" placeholder="Select service and location to generate slug" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Excerpt</Label>
                  <TranslateButton
                    text={form.excerpt}
                    onTranslated={(v) => updateField("excerpt", v)}
                  />
                </div>
                <Textarea rows={3} value={form.excerpt} onChange={(e) => updateField("excerpt", e.target.value)} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Author Name</Label>
                  <TranslateButton
                    text={form.authorName}
                    onTranslated={(v) => updateField("authorName", v)}
                  />
                </div>
                <Input value={form.authorName} onChange={(e) => updateField("authorName", e.target.value)} placeholder="e.g. Admin" />
              </div>
              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <Input value={form.articleMedia.heroCoverMedia.url} onChange={(e) => updateField("articleMedia", { heroCoverMedia: { url: e.target.value } })} placeholder="https://..." />
                {form.articleMedia.heroCoverMedia.url && (
                  <img src={form.articleMedia.heroCoverMedia.url} alt="Cover preview" className="mt-2 h-32 w-full rounded-md object-cover" />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Body Content</CardTitle>
              {blogType !== "city" && (
                <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                  <Button
                    type="button"
                    size="sm"
                    variant={form.contentMode === "wysiwyg" ? "default" : "ghost"}
                    className="h-7"
                    onClick={() => updateField("contentMode", "wysiwyg")}
                  >
                    <FileText className="h-3.5 w-3.5 mr-1" /> WYSIWYG
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={form.contentMode === "sections" ? "default" : "ghost"}
                    className="h-7"
                    onClick={() => updateField("contentMode", "sections")}
                  >
                    <LayoutGrid className="h-3.5 w-3.5 mr-1" /> Sections
                  </Button>
                </div>
              )}
              {blogType === "city" && (
                <div className="text-xs text-muted-foreground">Page Sections Builder</div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {blogType === "city" ? (
                <SectionLibraryEditor
                  sections={(form.sections as PageSection[]) || []}
                  onChange={(sections) => {
                    updateField("sections", sections as SectionUnion[]);
                    updateField("contentMode", "page-sections");
                  }}
                  presets={CITY_TEMPLATE_PRESETS}
                  citySlug={form.citySlug}
                />
              ) : form.contentMode === "wysiwyg" ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Content</Label>
                      <TranslateButton
                        text={form.bodyContent}
                        onTranslated={(v) => updateField("bodyContent", v)}
                        isHtml
                      />
                    </div>
                    <WysiwygEditor
                      value={form.bodyContent}
                      onChange={(v) => updateField("bodyContent", v)}
                      placeholder="Write your article content here..."
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Key Takeaways</Label>
                      <TranslateButton
                        text={form.keyTakeawaysContent}
                        onTranslated={(v) => updateField("keyTakeawaysContent", v)}
                        isHtml
                      />
                    </div>
                    <WysiwygEditor
                      value={form.keyTakeawaysContent}
                      onChange={(v) => updateField("keyTakeawaysContent", v)}
                      placeholder="Summarize the key points..."
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Final Thoughts</Label>
                      <TranslateButton
                        text={form.finalThoughtsContent}
                        onTranslated={(v) => updateField("finalThoughtsContent", v)}
                        isHtml
                      />
                    </div>
                    <WysiwygEditor
                      value={form.finalThoughtsContent}
                      onChange={(v) => updateField("finalThoughtsContent", v)}
                      placeholder="Wrap up your article..."
                    />
                  </div>
                </>
              ) : (
                <SectionEditor
                  sections={form.sections as (TextImageSectionType | CardsSectionType)[]}
                  onChange={(sections) => updateField("sections", sections as SectionUnion[])}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>FAQs</CardTitle>
              {canManageStructure && (
                <Button type="button" size="sm" onClick={addFaq}>
                  <Plus className="mr-1 h-4 w-4" /> Add FAQ
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              {form.faqs.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No FAQs yet. Add frequently asked questions for this article.
                </p>
              )}
              {form.faqs.map((faq, faqIndex) => (
                <div key={faqIndex} className="rounded-lg border p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">FAQ {faqIndex + 1}</span>
                    <div className="flex items-center gap-1">
                      <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => moveFaq(faqIndex, -1)} disabled={faqIndex === 0}>
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => moveFaq(faqIndex, 1)} disabled={faqIndex === form.faqs.length - 1}>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                      {canManageStructure && (
                        <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => removeFaq(faqIndex)}>
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Question"
                      value={faq.q}
                      onChange={(e) => updateFaq(faqIndex, "q", e.target.value)}
                    />
                    <TranslateButton
                      text={faq.q}
                      onTranslated={(v) => updateFaq(faqIndex, "q", v)}
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <Textarea
                      rows={3}
                      placeholder="Answer"
                      value={faq.a}
                      onChange={(e) => updateFaq(faqIndex, "a", e.target.value)}
                      className="flex-1"
                    />
                    <TranslateButton
                      text={faq.a}
                      onTranslated={(v) => updateFaq(faqIndex, "a", v)}
                      className="mt-2"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Publish</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {form.categoryLabel && (
                <div className="space-y-2">
                  <Label>Category</Label>
                  <p className="text-sm text-muted-foreground">{form.categoryLabel}</p>
                </div>
              )}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => v && updateField("status", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label>Featured</Label>
                <Switch checked={form.featured} onCheckedChange={(v) => updateField("featured", v)} />
              </div>
              <div className="space-y-2">
                <Label>Publication Date</Label>
                <Input type="date" value={form.date?.slice(0, 10) ?? ""} onChange={(e) => updateField("date", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Read Time (minutes)</Label>
                <Input type="number" min={1} value={form.readTime} onChange={(e) => updateField("readTime", Number(e.target.value))} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Service Location</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Service *</Label>
                <Select
                  value={form.serviceSlug}
                  onValueChange={(v) => {
                    if (!v) return;
                    updateField("serviceSlug", v);
                    const opt = serviceOptions.find((s: { slug: string }) => s.slug === v);
                    updateField("category", v);
                    updateField("categoryLabel", opt?.label || v);
                  }}
                >
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select a service" /></SelectTrigger>
                  <SelectContent className="min-w-[280px]">
                    {serviceOptions.map((s: { slug: string; label: string }) => (
                      <SelectItem key={s.slug} value={s.slug}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Country *</Label>
                <Select
                  value={form.countrySlug}
                  onValueChange={(v) => {
                    if (!v) return;
                    const country = countries.find((c: { slug: string }) => c.slug === v);
                    updateField("countrySlug", v);
                    updateField("country", country?.name || "");
                    if (blogType === "country") {
                      updateField("citySlug", "");
                      updateField("city", "");
                    }
                  }}
                >
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select a country" /></SelectTrigger>
                  <SelectContent className="min-w-[280px]">
                    {countries.map((c: { slug: string; name: string }) => (
                      <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {blogType === "city" && form.countrySlug && (
                <div className="space-y-2">
                  <Label>City *</Label>
                  <Select
                    value={form.citySlug}
                    onValueChange={(v) => {
                      if (!v) {
                        updateField("citySlug", "");
                        updateField("city", "");
                        return;
                      }
                      const city = cityOptions.find((c: { slug: string; name: string }) => c.slug === v);
                      updateField("citySlug", v);
                      updateField("city", city?.name || "");
                    }}
                  >
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select a city" /></SelectTrigger>
                    <SelectContent className="min-w-[280px]">
                      {cityOptions.map((c: { slug: string; name: string }) => (
                        <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Slug: {form.slug || "(auto-generated from selections)"}
              </p>
              {blogType === "city" && (
                <div className="space-y-2">
                  <Label>WhatsApp Number (page override)</Label>
                  <Input
                    value={form.whatsappNumber}
                    onChange={(e) => updateField("whatsappNumber", e.target.value)}
                    placeholder="+1234567890"
                  />
                  <p className="text-xs text-muted-foreground">
                    Optional. When set, the chat widget on this city service page sends
                    WhatsApp messages to this number instead of the country or city
                    service number. Leave empty to inherit the global number.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>SEO</CardTitle>
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
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Meta Title</Label>
                  <TranslateButton
                    text={form.seo_metadata.metaTitle}
                    onTranslated={(v) => updateField("seo_metadata", { ...form.seo_metadata, metaTitle: v })}
                  />
                </div>
                <Input value={form.seo_metadata.metaTitle} onChange={(e) => updateField("seo_metadata", { ...form.seo_metadata, metaTitle: e.target.value })} placeholder={`${form.title || "Article Title"} | AB.Limo`} />
                <p className="text-xs text-muted-foreground">{form.seo_metadata.metaTitle.length}/200 characters</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Meta Description</Label>
                  <TranslateButton
                    text={form.seo_metadata.metaDescription}
                    onTranslated={(v) => updateField("seo_metadata", { ...form.seo_metadata, metaDescription: v })}
                  />
                </div>
                <Textarea rows={3} value={form.seo_metadata.metaDescription} onChange={(e) => updateField("seo_metadata", { ...form.seo_metadata, metaDescription: e.target.value })} placeholder="Auto-generated from excerpt..." />
                <p className="text-xs text-muted-foreground">{form.seo_metadata.metaDescription.length}/160 characters</p>
              </div>
              <div className="space-y-2">
                <Label>OG Image URL</Label>
                <Input value={form.seo_metadata.ogImage} onChange={(e) => updateField("seo_metadata", { ...form.seo_metadata, ogImage: e.target.value })} placeholder="https://..." />
                <p className="text-xs text-muted-foreground">Fallback: hero cover image</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Tags</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {canManageStructure && (
                <div className="flex gap-2">
                  <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Add tag" />
                  <Button type="button" size="sm" onClick={addTag}>Add</Button>
                </div>
              )}
              <div className="flex flex-wrap gap-1">
                {form.tags.map((t) => (
                  canManageStructure ? (
                    <Badge key={t} variant="secondary" className="cursor-pointer" onClick={() => removeTag(t)}>
                      {t} &times;
                    </Badge>
                  ) : (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  )
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
    </StructurePermissionsProvider>
  );
}
