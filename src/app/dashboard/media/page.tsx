"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Film,
  ImageIcon,
  Pencil,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { MediaGridItem } from "@/components/admin/media-picker";
import {
  formatBytes,
  uploadMediaFile,
  type MediaItem,
} from "@/lib/media-upload";
import { usePermissions } from "@/hooks/use-permissions";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 24;

type MediaListResponse = {
  items: MediaItem[];
  total: number;
  page: number;
  limit: number;
};

type KindFilter = "all" | "image" | "video";

export default function MediaPage() {
  const queryClient = useQueryClient();
  const { canUpload, canUpdate, canDelete } = usePermissions();

  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [kindFilter, setKindFilter] = React.useState<KindFilter>("all");
  const [page, setPage] = React.useState(1);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [editItem, setEditItem] = React.useState<MediaItem | null>(null);
  const [editAlt, setEditAlt] = React.useState("");
  const [deleteItem, setDeleteItem] = React.useState<MediaItem | null>(null);

  React.useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const kindParam = kindFilter === "all" ? undefined : kindFilter;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["media", debouncedSearch, kindParam, page],
    queryFn: async (): Promise<MediaListResponse> => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(PAGE_SIZE));
      if (debouncedSearch) params.set("q", debouncedSearch);
      if (kindParam) params.set("kind", kindParam);
      const res = await fetch(`/api/media?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load media");
      return res.json();
    },
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      setUploading(true);
      setProgress(0);
      try {
        return await uploadMediaFile(file, setProgress);
      } finally {
        setUploading(false);
        setProgress(0);
      }
    },
    onSuccess: () => {
      toast.success("File uploaded");
      queryClient.invalidateQueries({ queryKey: ["media"] });
      queryClient.invalidateQueries({ queryKey: ["media-picker"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, alt }: { id: string; alt: string }) => {
      const res = await fetch(`/api/media/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alt }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Update failed");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Media updated");
      queryClient.invalidateQueries({ queryKey: ["media"] });
      setEditItem(null);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Delete failed");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Media deleted");
      queryClient.invalidateQueries({ queryKey: ["media"] });
      queryClient.invalidateQueries({ queryKey: ["media-picker"] });
      setDeleteItem(null);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <div className="space-y-4 px-4 lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Media</h2>
        {canUpload && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadMutation.mutate(file);
                e.target.value = "";
              }}
            />
            <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? "Uploading..." : "Upload File"}
            </Button>
          </>
        )}
      </div>

      {uploading && <Progress value={progress} className="w-full" />}

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by filename or alt text..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {(["all", "image", "video"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setKindFilter(f);
                setPage(1);
              }}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors",
                kindFilter === f
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f === "all" ? "All" : `${f}s`}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center text-sm text-muted-foreground">
              <ImageIcon className="size-8" />
              <p>No media found.</p>
              {canUpload && (
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" /> Upload your first file
                </Button>
              )}
            </div>
          ) : (
            <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6", isFetching && "opacity-60")}>
              {items.map((item) => (
                <div key={item._id} className="space-y-1">
                  <MediaGridItem item={item} />
                  <div className="flex items-center justify-between px-0.5">
                    <span className="truncate text-[10px] text-muted-foreground">
                      {item.kind === "video" ? (
                        <Film className="inline size-3 mr-0.5" />
                      ) : null}
                      {formatBytes(item.size)}
                    </span>
                    <div className="flex gap-0.5">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        title="Copy URL"
                        onClick={() => copyUrl(item.url)}
                      >
                        <Copy className="size-3" />
                      </Button>
                      {canUpdate && (
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          title="Edit alt text"
                          onClick={() => {
                            setEditItem(item);
                            setEditAlt(item.alt || "");
                          }}
                        >
                          <Pencil className="size-3" />
                        </Button>
                      )}
                      {canDelete && (
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          title="Delete"
                          onClick={() => setDeleteItem(item)}
                        >
                          <Trash2 className="size-3 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {total} file{total === 1 ? "" : "s"} · Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Alt text edit dialog */}
      <Dialog open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Media</DialogTitle>
          </DialogHeader>
          {editItem && (
            <div className="space-y-3">
              {editItem.kind === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={editItem.url}
                  alt={editItem.alt || editItem.filename}
                  className="h-32 w-full rounded-md object-cover"
                />
              ) : (
                <video src={editItem.url} controls className="h-32 w-full rounded-md bg-black object-contain" />
              )}
              <p className="truncate text-xs text-muted-foreground">{editItem.filename}</p>
              <div className="space-y-1.5">
                <Label htmlFor="media-alt">Alt Text</Label>
                <Input
                  id="media-alt"
                  value={editAlt}
                  onChange={(e) => setEditAlt(e.target.value)}
                  placeholder="Describe this media"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditItem(null)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                editItem && updateMutation.mutate({ id: editItem._id, alt: editAlt })
              }
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Media?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the file from storage. Any page still
              referencing this URL will show a broken image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground"
              onClick={() => deleteItem && deleteMutation.mutate(deleteItem._id)}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
