"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Save, Search } from "lucide-react";
import { useState } from "react";

type Category = { _id: string; label: string; slug: string };

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const [newLabel, setNewLabel] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed");
      return res.json() as Promise<{ items: Category[] }>;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (label: string) => {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label }),
      });
      if (!res.ok) throw new Error("Failed");
    },
    onSuccess: () => { toast.success("Category created"); queryClient.invalidateQueries({ queryKey: ["categories"] }); setNewLabel(""); },
    onError: () => toast.error("Create failed"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, label }: { id: string; label: string }) => {
      const slug = label.toLowerCase().replace(/\s+/g, "-");
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, slug }),
      });
      if (!res.ok) throw new Error("Failed");
    },
    onSuccess: () => { toast.success("Category updated"); queryClient.invalidateQueries({ queryKey: ["categories"] }); setEditId(null); },
    onError: () => toast.error("Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
    },
    onSuccess: () => { toast.success("Category deleted"); queryClient.invalidateQueries({ queryKey: ["categories"] }); },
    onError: () => toast.error("Delete failed"),
  });

  const categories = data?.items ?? [];
  const q = search.trim().toLowerCase();
  const filtered = q
    ? categories.filter((c) => c.label.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q))
    : categories;

  return (
    <div className="space-y-4 px-4 lg:px-6">
      <h2 className="text-lg font-semibold">Categories</h2>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input placeholder="New category label" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && newLabel.trim()) createMutation.mutate(newLabel.trim()); }} />
            <Button onClick={() => { if (newLabel.trim()) createMutation.mutate(newLabel.trim()); }} disabled={!newLabel.trim()}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="border-b p-3">
            <div className="relative max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
                className="pl-8"
              />
            </div>
          </div>
          {isLoading ? (
            <div className="p-4 space-y-2">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
          ) : (
            <div className="divide-y">
              {filtered.map((c) => (
                <div key={c._id} className="flex items-center gap-3 p-3">
                  {editId === c._id ? (
                    <>
                      <Input value={editLabel} onChange={(e) => setEditLabel(e.target.value)} className="flex-1" />
                      <Button size="sm" onClick={() => updateMutation.mutate({ id: c._id, label: editLabel })}><Save className="h-4 w-4" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditId(null)}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 font-medium">{c.label}</span>
                      <Button size="sm" variant="ghost" onClick={() => { setEditId(c._id); setEditLabel(c.label); }}><Pencil className="h-4 w-4" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteMutation.mutate(c._id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </>
                  )}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  {q ? "No categories match your search." : "No categories yet."}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
