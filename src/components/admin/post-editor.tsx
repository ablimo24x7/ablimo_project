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
import { MediaInput } from "./media-input";
import type { TextImageSectionType, CardsSectionType } from "@/lib/validations/location";
import { CITY_TEMPLATE_PRESETS } from "@/components/services/Templates/City";
import { COUNTRY_TEMPLATE_PRESETS } from "@/components/services/Templates/Country";
import type { PageSection } from "@/components/services/sections/section-types";
import { usePermissions } from "@/hooks/use-permissions";
import { StructurePermissionsProvider } from "@/components/providers/structure-permissions";
import { toSlug } from "@/lib/slug";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  buildArabicSections,
  collectSectionTextPaths,
  getPathValue,
  sectionPath,
  type TranslationMap,
} from "@/lib/arabic-content";

type SectionUnion = TextImageSectionType | CardsSectionType | PageSection;

type FaqItem = { q: string; a: string };

/** Languages the editor can edit on a single post. */
type EditorLang = "en" | "ar";

/**
 * Distinguish PageSection-shaped content (or empty, i.e. never built yet)
 * from legacy TextImageSection/CardsSection content, so opening a country
 * article never wipes its saved legacy sections.
 */
function looksLikePageSections(secs: SectionUnion[]): boolean {
  return (
    secs.length === 0 ||
    secs.every(
      (s) => typeof (s as PageSection).order === "number" && typeof (s as PageSection).enabled === "boolean",
    )
  );
}

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
  archiveTag: string;
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
  /**
   * Arabic content for this post.
   * `ar` holds hand-written Arabic, `autoAr` the Google translations used
   * when a field has no hand-written value.
   */
  translations: {
    ar: TranslationMap;
    autoAr: TranslationMap;
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
  archiveTag: "",
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
  translations: { ar: {}, autoAr: {} },
};

interface PostEditorProps {
  initialData?: PostData;
  initialBlogType?: "country" | "city" | "blog";
  mode?: "create" | "edit";
}

/** Marks a field whose Arabic value comes from the automatic translation. */
function AutoBadge() {
  return (
    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
      auto
    </span>
  );
}

/** A single Arabic field of the post editor. */
function ArField({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  rows = 3,
  auto,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  auto?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label>{label}</Label>
        {auto && <AutoBadge />}
      </div>
      {multiline ? (
        <Textarea
          dir="rtl"
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <Input
          dir="rtl"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function normalizePost(data?: PostData): PostData {  const d: Partial<PostData> = data ?? {};
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
    translations: {
      ar: { ...(d.translations?.ar ?? {}) },
      autoAr: { ...(d.translations?.autoAr ?? {}) },
    },
    sections: Array.isArray(d.sections) ? d.sections : [],
  };
}

export function PostEditor({ initialData, initialBlogType = "country", mode = "create" }: PostEditorProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = React.useState<PostData>(() => normalizePost(initialData));
  const [tagInput, setTagInput] = React.useState("");
  const [activeLang, setActiveLang] = React.useState<EditorLang>("en");
  const isDirtyRef = React.useRef(false);
  const { canCreate, canUpdate, canManageStructure } = usePermissions();

  // ── Arabic helpers ───────────────────────────────────────
  // `ar` holds hand-written Arabic, `autoAr` the Google translations the
  // server generated for the fields the editor left empty. A field resolves
  // to hand-written Arabic first, then to the automatic translation.
  const arMap = form.translations.ar;
  const autoMap = form.translations.autoAr;

  const arValue = React.useCallback(
    (path: string) => arMap[path] ?? autoMap[path] ?? "",
    [arMap, autoMap]
  );

  const setTranslations = React.useCallback(
    (
      updater: (prev: PostData["translations"]) => PostData["translations"]
    ) => {
      isDirtyRef.current = true;
      setForm((prev) => ({ ...prev, translations: updater(prev.translations) }));
    },
    []
  );

  /** Write (or clear) a hand-written Arabic value for a content path. */
  const setArValue = React.useCallback(
    (path: string, value: string) => {
      setTranslations((prev) => {
        const next = { ...prev.ar };
        if (value.trim()) next[path] = value;
        else delete next[path];
        return { ...prev, ar: next };
      });
    },
    [setTranslations]
  );

  /** True when the Arabic value of a path comes from the auto-translation. */
  const isAutoAr = React.useCallback(
    (path: string) => !(path in arMap) && path in autoMap,
    [arMap, autoMap]
  );

  /** The template sections with their Arabic text applied. */
  const arabicSections = React.useMemo(
    () => buildArabicSections(form.sections as unknown[], arValue),
    [form.sections, arValue]
  );

  /**
   * Persist edits made in the Arabic tab. Only text that actually changed
   * becomes hand-written Arabic; everything else keeps following the
   * automatic translation.
   */
  const handleArabicSectionsChange = React.useCallback(
    (next: SectionUnion[]) => {
      const previousArabic = arabicSections as unknown as Array<{ id?: string }>;
      const english = form.sections as unknown as Array<{ id?: string }>;
      const nextMap: TranslationMap = { ...arMap };

      next.forEach((section) => {
        const id = typeof section?.id === "string" ? section.id : "";
        if (!id) return;
        const previousSection = previousArabic.find((s) => s?.id === id);
        const englishSection = english.find((s) => s?.id === id);

        collectSectionTextPaths(section).forEach((relative) => {
          const nextValue = getPathValue(section, relative);
          const previousValue = previousSection
            ? getPathValue(previousSection, relative)
            : undefined;
          const baseline =
            previousValue !== undefined
              ? previousValue
              : getPathValue(englishSection, relative);
          if (nextValue === baseline) return;

          const path = sectionPath(id, relative);
          if (typeof nextValue === "string" && nextValue.trim()) {
            nextMap[path] = nextValue;
          } else {
            delete nextMap[path];
          }
        });
      });

      setTranslations((prev) => ({ ...prev, ar: nextMap }));
    },
    [arabicSections, form.sections, arMap, setTranslations]
  );

  // Repopulate the form when fresh server data arrives (e.g. a background
  // refetch returning the saved post), unless the user already made edits.
  React.useEffect(() => {
    if (!initialData || isDirtyRef.current) return;
    setForm(normalizePost(initialData));
  }, [initialData]);

  const blogType: "country" | "city" | "blog" =
    initialData?.templateType === "service-city"
      ? "city"
      : initialData?.templateType === "blog"
        ? "blog"
        : initialBlogType;

  const templateType =
    blogType === "city" ? "service-city" : blogType === "blog" ? "blog" : "service-country";

  /** True when the post is rendered through the PageSection template system. */
  const usesPageSections =
    blogType === "city" ||
    (blogType === "country" &&
      form.contentMode !== "wysiwyg" &&
      looksLikePageSections(form.sections));

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
      if (blogType === "blog") {
        // Standalone blog: the slug starts from the title, then stays stable
        // (and editable) so published /blogs/... URLs never break on rename.
        if (key === "title" && !prev.slug) {
          next.slug = toSlug(String(value));
        }
      } else {
        next.slug = generateSlug(service, country, city, blogType === "city" ? "city" : "country");
      }

      // Auto-generate SEO from title when title changes and SEO fields are empty
      if (key === "title" && !prev.seo_metadata.metaTitle) {
        next.seo_metadata = { ...next.seo_metadata, metaTitle: `${String(value)} | AB` };
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
      const metaTitle = prev.seo_metadata.metaTitle || `${prev.title} | AB`;
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
    if (blogType === "blog") {
      if (!form.slug.trim()) {
        toast.error("Slug is required — it is generated from the title");
        return;
      }
    } else {
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Post" : "New Post"}
          </h2>
          <Tabs
            value={activeLang}
            onValueChange={(value) => setActiveLang(value as EditorLang)}
          >
            <TabsList>
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="ar">العربية</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          {isEdit && form.slug && (
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                window.open(
                  `${activeLang === "ar" ? "/ar" : ""}/${
                    blogType === "blog"
                      ? `blogs/${form.slug}`
                      : `services/${form.slug.replace(/^services\//, "")}`
                  }?preview=true`,
                  "_blank"
                )
              }
            >
              Preview{activeLang === "ar" ? " (AR)" : ""}
            </Button>
          )}
          {canUpdate && (
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : isEdit ? "Update" : "Create"}
            </Button>
          )}
        </div>
      </div>

      {activeLang === "ar" && (
        <p className="text-xs text-muted-foreground">
          Arabic overrides the English copy. Any field left empty keeps the
          automatic Google translation of the English text — type over it to
          replace the translation with your own wording.
        </p>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Content{activeLang === "ar" ? " (Arabic)" : ""}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeLang === "ar" ? (
                <>
                  <ArField
                    label="Title (Arabic) *"
                    value={arValue("title")}
                    auto={isAutoAr("title")}
                    onChange={(v) => setArValue("title", v)}
                    placeholder="Automatic translation of the English title"
                  />
                  <ArField
                    label="Excerpt (Arabic)"
                    value={arValue("excerpt")}
                    auto={isAutoAr("excerpt")}
                    multiline
                    onChange={(v) => setArValue("excerpt", v)}
                    placeholder="Automatic translation of the English excerpt"
                  />
                  <ArField
                    label="Author Name (Arabic)"
                    value={arValue("authorName")}
                    auto={isAutoAr("authorName")}
                    onChange={(v) => setArValue("authorName", v)}
                    placeholder="Automatic translation of the English author name"
                  />
                  {blogType === "blog" && (
                    <>
                      <ArField
                        label="Category (Arabic)"
                        value={arValue("categoryLabel")}
                        auto={isAutoAr("categoryLabel")}
                        onChange={(v) => setArValue("categoryLabel", v)}
                        placeholder="Automatic translation of the English category"
                      />
                      <ArField
                        label="Archive Tag (Arabic)"
                        value={arValue("archiveTag")}
                        auto={isAutoAr("archiveTag")}
                        onChange={(v) => setArValue("archiveTag", v)}
                        placeholder="Automatic translation of the English archive tag"
                      />
                    </>
                  )}
                </>
              ) : (
                <>
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
                <Label>Slug {blogType === "blog" ? "" : "(auto-generated)"}</Label>
                <Input
                  value={form.slug}
                  readOnly={blogType !== "blog"}
                  onChange={
                    blogType === "blog"
                      ? (e) => updateField("slug", toSlug(e.target.value))
                      : undefined
                  }
                  className={blogType !== "blog" ? "bg-muted" : undefined}
                  placeholder={
                    blogType === "blog"
                      ? "Generated from the title — edit to customize"
                      : "Select service and location to generate slug"
                  }
                />
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
              <MediaInput
                label="Cover Image"
                value={form.articleMedia.heroCoverMedia.url}
                onChange={(url) => updateField("articleMedia", { heroCoverMedia: { url } })}
                accept="image"
              />
              {form.articleMedia.heroCoverMedia.url && (
                <img src={form.articleMedia.heroCoverMedia.url} alt="Cover preview" className="mt-2 h-32 w-full rounded-md object-cover" />
              )}
              {blogType === "blog" && (
                <div className="space-y-2">
                  <Label>Archive Tag</Label>
                  <Input
                    value={form.archiveTag}
                    onChange={(e) => updateField("archiveTag", e.target.value)}
                    placeholder="e.g. Control Room Archive: Riyadh"
                  />
                  <p className="text-xs text-muted-foreground">
                    Chip shown on the featured image (leave empty to hide).
                  </p>
                </div>
              )}
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>
                Body Content{activeLang === "ar" ? " (Arabic)" : ""}
              </CardTitle>
              {activeLang === "en" && blogType !== "city" && (
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
              {activeLang === "en" && blogType !== "blog" && (
                <div className="text-xs text-muted-foreground">Page Sections Builder</div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {activeLang === "ar" ? (
                <>
                  {usesPageSections ? (
                    <>
                      <div dir="rtl">
                        <SectionLibraryEditor
                          sections={(arabicSections as unknown as PageSection[]) || []}
                          onChange={(sections) =>
                            handleArabicSectionsChange(sections as SectionUnion[])
                          }
                          structureLocked
                          textOnly
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Section structure, images and styling are managed in the
                        English tab — only the copy is translated here.
                      </p>
                    </>
                  ) : form.contentMode === "wysiwyg" ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label>Content (Arabic)</Label>
                          {isAutoAr("bodyContent") && <AutoBadge />}
                        </div>
                        <div dir="rtl">
                          <WysiwygEditor
                            value={arValue("bodyContent")}
                            onChange={(v) => setArValue("bodyContent", v)}
                            placeholder="Automatic translation of the English content"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label>Key Takeaways (Arabic)</Label>
                          {isAutoAr("keyTakeawaysContent") && <AutoBadge />}
                        </div>
                        <div dir="rtl">
                          <WysiwygEditor
                            value={arValue("keyTakeawaysContent")}
                            onChange={(v) => setArValue("keyTakeawaysContent", v)}
                            placeholder="Automatic translation of the English key takeaways"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label>Final Thoughts (Arabic)</Label>
                          {isAutoAr("finalThoughtsContent") && <AutoBadge />}
                        </div>
                        <div dir="rtl">
                          <WysiwygEditor
                            value={arValue("finalThoughtsContent")}
                            onChange={(v) => setArValue("finalThoughtsContent", v)}
                            placeholder="Automatic translation of the English final thoughts"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <SectionEditor
                        sections={
                          (arabicSections as unknown as (TextImageSectionType | CardsSectionType)[]) || []
                        }
                        onChange={(sections) =>
                          handleArabicSectionsChange(sections as SectionUnion[])
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Section structure is managed in the English tab — only
                        the copy is translated here.
                      </p>
                    </>
                  )}
                </>
              ) : blogType === "city" ? (
                <SectionLibraryEditor
                  sections={(form.sections as PageSection[]) || []}
                  onChange={(sections) => {
                    updateField("sections", sections as SectionUnion[]);
                    updateField("contentMode", "page-sections");
                  }}
                  presets={CITY_TEMPLATE_PRESETS}
                  citySlug={form.citySlug}
                />
              ) : blogType === "country" &&
                form.contentMode !== "wysiwyg" &&
                looksLikePageSections(form.sections) ? (
                <SectionLibraryEditor
                  sections={(form.sections as PageSection[]) || []}
                  onChange={(sections) => {
                    updateField("sections", sections as SectionUnion[]);
                    updateField("contentMode", "page-sections");
                  }}
                  presets={COUNTRY_TEMPLATE_PRESETS}
                  countrySlug={form.countrySlug}
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
              <CardTitle>FAQs{activeLang === "ar" ? " (Arabic)" : ""}</CardTitle>
              {activeLang === "en" && canManageStructure && (
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
              {form.faqs.map((faq, faqIndex) =>
                activeLang === "ar" ? (
                  <div key={faqIndex} className="rounded-lg border p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        FAQ {faqIndex + 1}
                      </span>
                      {isAutoAr(`faq.${faqIndex}.q`) && <AutoBadge />}
                    </div>
                    <Input
                      dir="rtl"
                      placeholder="Question (Arabic)"
                      value={arValue(`faq.${faqIndex}.q`)}
                      onChange={(e) => setArValue(`faq.${faqIndex}.q`, e.target.value)}
                    />
                    <Textarea
                      dir="rtl"
                      rows={3}
                      placeholder="Answer (Arabic)"
                      value={arValue(`faq.${faqIndex}.a`)}
                      onChange={(e) => setArValue(`faq.${faqIndex}.a`, e.target.value)}
                    />
                  </div>
                ) : (
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
                )
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publish{activeLang === "ar" ? " (Arabic)" : ""}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeLang === "ar" ? (
                blogType === "blog" ? (
                  <ArField
                    label="Category (Arabic)"
                    value={arValue("categoryLabel")}
                    auto={isAutoAr("categoryLabel")}
                    onChange={(v) => setArValue("categoryLabel", v)}
                    placeholder="Automatic translation of the English category"
                  />
                ) : form.categoryLabel ? (
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <p className="text-sm text-muted-foreground">{form.categoryLabel}</p>
                  </div>
                ) : null
              ) : (
                <>
              {blogType === "blog" && (
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={form.categoryLabel}
                    onChange={(e) => {
                      const label = e.target.value;
                      updateField("categoryLabel", label);
                      updateField("category", toSlug(label) || "uncategorized");
                    }}
                    placeholder="e.g. Travel Tips"
                  />
                  <p className="text-xs text-muted-foreground">
                    Optional. Shown as the badge on the blog listing.
                  </p>
                </div>
              )}
              {form.categoryLabel && blogType !== "blog" && (
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
                </>
              )}
            </CardContent>
          </Card>

          {blogType !== "blog" && activeLang === "en" && (
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
              <div className="space-y-2">
                <Label>WhatsApp Override Number</Label>
                <Input
                  value={form.whatsappNumber}
                  onChange={(e) => updateField("whatsappNumber", e.target.value)}
                  placeholder="+1234567890"
                />
                <p className="text-xs text-muted-foreground">
                  Optional. When set, the chat widget on this service page sends
                  WhatsApp messages to this number instead of the country or city
                  service number. Leave empty to inherit the global number.
                </p>
              </div>
            </CardContent>
          </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>SEO{activeLang === "ar" ? " (Arabic)" : ""}</CardTitle>
                {activeLang === "en" && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={regenerateSeo}
                    className="text-xs h-7"
                  >
                    Regenerate SEO
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeLang === "ar" ? (
                <>
                  <ArField
                    label="Meta Title (Arabic)"
                    value={arValue("seo.metaTitle")}
                    auto={isAutoAr("seo.metaTitle")}
                    onChange={(v) => setArValue("seo.metaTitle", v)}
                    placeholder="Automatic translation of the English meta title"
                  />
                  <ArField
                    label="Meta Description (Arabic)"
                    value={arValue("seo.metaDescription")}
                    auto={isAutoAr("seo.metaDescription")}
                    multiline
                    onChange={(v) => setArValue("seo.metaDescription", v)}
                    placeholder="Automatic translation of the English meta description"
                  />
                  <p className="text-xs text-muted-foreground">
                    The social image is shared between both languages.
                  </p>
                </>
              ) : (
                <>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Meta Title</Label>
                  <TranslateButton
                    text={form.seo_metadata.metaTitle}
                    onTranslated={(v) => updateField("seo_metadata", { ...form.seo_metadata, metaTitle: v })}
                  />
                </div>
                <Input value={form.seo_metadata.metaTitle} onChange={(e) => updateField("seo_metadata", { ...form.seo_metadata, metaTitle: e.target.value })} placeholder={`${form.title || "Article Title"} | AB`} />
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
              <MediaInput
                label="OG Image"
                value={form.seo_metadata.ogImage}
                onChange={(url) => updateField("seo_metadata", { ...form.seo_metadata, ogImage: url })}
                accept="image"
              />
              <p className="text-xs text-muted-foreground">Fallback: hero cover image</p>
                </>
              )}
            </CardContent>
          </Card>

          {activeLang === "en" && (
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
          )}
        </div>
      </div>
    </form>
    </StructurePermissionsProvider>
  );
}
