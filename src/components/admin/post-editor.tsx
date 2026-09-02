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
import { toast } from "sonner";

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
  bodyContent: string;
  keyTakeawaysContent: string;
  finalThoughtsContent: string;
  featured: boolean;
  tags: string[];
  authorName: string;
  date: string;
  readTime: number;
  articleMedia: {
    heroCoverMedia: { url: string };
  };
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
  status: "draft",
  templateType: "service-country",
  serviceSlug: "",
  countrySlug: "",
  country: "",
  citySlug: "",
  city: "",
  bodyContent: "",
  keyTakeawaysContent: "",
  finalThoughtsContent: "",
  featured: false,
  tags: [],
  authorName: "",
  date: new Date().toISOString().slice(0, 10),
  readTime: 5,
  articleMedia: { heroCoverMedia: { url: "" } },
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
    seo_metadata: {
      metaTitle: d.seo_metadata?.metaTitle ?? "",
      metaDescription: d.seo_metadata?.metaDescription ?? "",
      ogImage: d.seo_metadata?.ogImage ?? "",
    },
  };
}

export function PostEditor({ initialData, initialBlogType = "country", mode = "create" }: PostEditorProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = React.useState<PostData>(() => normalizePost(initialData));
  const [tagInput, setTagInput] = React.useState("");
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
      const url = isEdit ? `/api/articles/${form._id}` : "/api/articles";
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
      toast.success(isEdit ? "Post updated" : "Post created");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/dashboard/posts");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const updateField = <K extends keyof PostData>(key: K, value: PostData[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      const service = key === "serviceSlug" ? (value as string) : prev.serviceSlug;
      const country = key === "countrySlug" ? (value as string) : prev.countrySlug;
      const city = key === "citySlug" ? (value as string) : prev.citySlug;
      next.slug = generateSlug(service, country, city, blogType);
      return next;
    });
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

  return (
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
              onClick={() => window.open(`/en-US/services/${form.slug.replace(/^services\//, "")}?preview=true`, "_blank")}
            >
              Preview
            </Button>
          )}
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input value={form.title} onChange={(e) => updateField("title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Slug (auto-generated)</Label>
                <Input value={form.slug} readOnly className="bg-muted" placeholder="Select service and location to generate slug" />
              </div>
              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea rows={3} value={form.excerpt} onChange={(e) => updateField("excerpt", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Author Name</Label>
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
            <CardHeader><CardTitle>Body Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Content</Label>
                <WysiwygEditor
                  value={form.bodyContent}
                  onChange={(v) => updateField("bodyContent", v)}
                  placeholder="Write your article content here..."
                />
              </div>
              <div className="space-y-2">
                <Label>Key Takeaways</Label>
                <WysiwygEditor
                  value={form.keyTakeawaysContent}
                  onChange={(v) => updateField("keyTakeawaysContent", v)}
                  placeholder="Summarize the key points..."
                />
              </div>
              <div className="space-y-2">
                <Label>Final Thoughts</Label>
                <WysiwygEditor
                  value={form.finalThoughtsContent}
                  onChange={(v) => updateField("finalThoughtsContent", v)}
                  placeholder="Wrap up your article..."
                />
              </div>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>SEO</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input value={form.seo_metadata.metaTitle} onChange={(e) => updateField("seo_metadata", { ...form.seo_metadata, metaTitle: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea rows={3} value={form.seo_metadata.metaDescription} onChange={(e) => updateField("seo_metadata", { ...form.seo_metadata, metaDescription: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>OG Image URL</Label>
                <Input value={form.seo_metadata.ogImage} onChange={(e) => updateField("seo_metadata", { ...form.seo_metadata, ogImage: e.target.value })} placeholder="https://..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Tags</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Add tag" />
                <Button type="button" size="sm" onClick={addTag}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {form.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="cursor-pointer" onClick={() => removeTag(t)}>
                    {t} &times;
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
