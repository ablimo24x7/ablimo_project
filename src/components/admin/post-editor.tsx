"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { allIsoCountries } from "@/lib/iso3166";
import { toast } from "sonner";
import slugify from "slugify";

type PostData = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  status: string;
  templateType: string;
  country: string;
  city: string;
  routeFrom: string;
  routeTo: string;
  airportName: string;
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
  templateType: "country",
  country: "",
  city: "",
  routeFrom: "",
  routeTo: "",
  airportName: "",
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

export function PostEditor({ initialData, mode = "create" }: PostEditorProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = React.useState<PostData>(() => normalizePost(initialData));
  const [tagInput, setTagInput] = React.useState("");

  const countryOptions = React.useMemo(() => allIsoCountries(), []);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed");
      return res.json() as Promise<{ items: Array<{ _id: string; label: string; slug: string }> }>;
    },
  });
  const categoryItems = categories?.items ?? [];

  const isEdit = mode === "edit" && form._id;

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
      if (key === "title" && !isEdit) {
        next.slug = slugify(String(value), { lower: true, strict: true });
      }
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
    if (!form.category) {
      toast.error("Category is required");
      return;
    }
    mutation.mutate(form);
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
              onClick={() => window.open(`/en-US/blog/${form.slug}?preview=true`, "_blank")}
            >
              View on Site
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
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => updateField("slug", e.target.value)} />
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
                <Label>HTML Content</Label>
                <Textarea rows={12} value={form.bodyContent} onChange={(e) => updateField("bodyContent", e.target.value)} placeholder="Paste HTML content here..." />
              </div>
              <div className="space-y-2">
                <Label>Key Takeaways</Label>
                <Textarea rows={6} value={form.keyTakeawaysContent} onChange={(e) => updateField("keyTakeawaysContent", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Final Thoughts</Label>
                <Textarea rows={6} value={form.finalThoughtsContent} onChange={(e) => updateField("finalThoughtsContent", e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Publish</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => {
                    if (!v) return;
                    const cat = categoryItems.find((c) => c.slug === v);
                    updateField("category", v);
                    updateField("categoryLabel", cat?.label || v);
                  }}
                >
                  <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                  <SelectContent>
                    {categoryItems.map((c) => (
                      <SelectItem key={c._id} value={c.slug}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
            <CardHeader><CardTitle>Template</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Template Type</Label>
                <Select value={form.templateType} onValueChange={(v) => v && updateField("templateType", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="country">Country</SelectItem>
                    <SelectItem value="city">City</SelectItem>
                    <SelectItem value="city-to-city">City-to-City</SelectItem>
                    <SelectItem value="airport">Airport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(form.templateType === "country" || form.templateType === "city") && (
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select value={form.country} onValueChange={(v) => v && updateField("country", v)}>
                    <SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger>
                    <SelectContent>
                      {countryOptions.map((c) => (
                        <SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {(form.templateType === "city" || form.templateType === "city-to-city") && (
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input value={form.city} onChange={(e) => updateField("city", e.target.value)} />
                </div>
              )}
              {form.templateType === "city-to-city" && (
                <>
                  <div className="space-y-2">
                    <Label>Route From</Label>
                    <Input value={form.routeFrom} onChange={(e) => updateField("routeFrom", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Route To</Label>
                    <Input value={form.routeTo} onChange={(e) => updateField("routeTo", e.target.value)} />
                  </div>
                </>
              )}
              {form.templateType === "airport" && (
                <div className="space-y-2">
                  <Label>Airport Name</Label>
                  <Input value={form.airportName} onChange={(e) => updateField("airportName", e.target.value)} />
                </div>
              )}
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
