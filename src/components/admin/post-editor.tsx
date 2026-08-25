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
import { Badge } from "@/components/ui/badge";
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
  seo_metadata: {
    metaTitle: string;
    metaDescription: string;
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
  seo_metadata: { metaTitle: "", metaDescription: "" },
};

interface PostEditorProps {
  initialData?: PostData;
  mode?: "create" | "edit";
}

export function PostEditor({ initialData, mode = "create" }: PostEditorProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = React.useState<PostData>(initialData ?? defaultPost);
  const [tagInput, setTagInput] = React.useState("");

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
                  <Input value={form.country} onChange={(e) => updateField("country", e.target.value)} />
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
