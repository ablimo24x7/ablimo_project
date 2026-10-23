"use client";

import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Film, ImageIcon, Search, Upload } from "lucide-react";
import {
  acceptAttrFor,
  formatBytes,
  uploadMediaFile,
  type MediaAccept,
  type MediaItem,
} from "@/lib/media-upload";
import { usePermissions } from "@/hooks/use-permissions";
import { cn } from "@/lib/utils";

type MediaListResponse = { items: MediaItem[]; total: number; page: number; limit: number };

type KindFilter = "all" | "image" | "video";

function filterToParam(accept: MediaAccept, filter: KindFilter): string | undefined {
  if (accept === "image") return "image";
  if (accept === "video") return "video";
  return filter === "all" ? undefined : filter;
}

export function MediaGridItem({
  item,
  selected,
  onSelect,
}: {
  item: MediaItem;
  selected?: boolean;
  onSelect?: (item: MediaItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-muted text-left transition-colors hover:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        selected && "border-ring ring-2 ring-ring/40"
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        {item.kind === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.url}
            alt={item.alt || item.filename}
            loading="lazy"
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Film className="size-8 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="space-y-0.5 p-2">
        <p className="truncate text-xs font-medium">{item.filename}</p>
        <p className="text-[11px] text-muted-foreground">
          {item.kind === "video" ? "Video · " : ""}
          {formatBytes(item.size)}
        </p>
      </div>
    </button>
  );
}

export function MediaPicker({
  open,
  onOpenChange,
  onSelect,
  accept = "all",
  selectedUrl,
  showHeader = true,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
  accept?: MediaAccept;
  selectedUrl?: string;
  showHeader?: boolean;
}) {
  const queryClient = useQueryClient();
  const { canUpload } = usePermissions();
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [kindFilter, setKindFilter] = React.useState<KindFilter>("all");
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const kindParam = filterToParam(accept, kindFilter);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["media-picker", debouncedSearch, kindParam],
    queryFn: async (): Promise<MediaListResponse> => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("q", debouncedSearch);
      if (kindParam) params.set("kind", kindParam);
      params.set("limit", "48");
      const res = await fetch(`/api/media?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load media");
      return res.json();
    },
    enabled: open,
  });

  const items = data?.items ?? [];

  const handleUpload = async (file: File) => {
    if (accept === "image" && !file.type.startsWith("image/")) {
      toast.error("Only image files are allowed here");
      return;
    }
    if (accept === "video" && !file.type.startsWith("video/")) {
      toast.error("Only video files are allowed here");
      return;
    }
    setUploading(true);
    setProgress(0);
    try {
      const media = await uploadMediaFile(file, setProgress);
      queryClient.invalidateQueries({ queryKey: ["media-picker"] });
      queryClient.invalidateQueries({ queryKey: ["media"] });
      toast.success("File uploaded");
      onSelect(media.url);
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => onOpenChange(next)}>
      <DialogContent className="sm:max-w-2xl">
        {showHeader && (
          <DialogHeader>
            <DialogTitle>Media Library</DialogTitle>
            <DialogDescription>
              Select an existing file{canUpload ? " or upload a new one" : ""}.
            </DialogDescription>
          </DialogHeader>
        )}

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files..."
              className="pl-8"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptAttrFor(accept)}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
              e.target.value = "";
            }}
          />
          {canUpload && (
            <Button
              type="button"
              size="sm"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-1 size-3.5" />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          )}
        </div>

        {uploading && <Progress value={progress} className="w-full" />}

        {accept === "all" && (
          <div className="flex gap-1 rounded-lg bg-muted p-1">
            {(["all", "image", "video"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setKindFilter(f)}
                className={cn(
                  "flex-1 rounded-md px-2 py-1 text-xs font-medium capitalize transition-colors",
                  kindFilter === f
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f === "all" ? "All" : `${f}s`}
              </button>
            ))}
          </div>
        )}

        <div className="max-h-[50vh] overflow-y-auto pr-1">
          {isLoading ? (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10 text-center text-sm text-muted-foreground">
              <ImageIcon className="size-8" />
              <p>
                No media found.{canUpload ? " Upload a file to get started." : ""}
              </p>
            </div>
          ) : (
            <div
              className={cn(
                "grid grid-cols-3 gap-2 sm:grid-cols-4",
                isFetching && "opacity-60"
              )}
            >
              {items.map((item) => (
                <MediaGridItem
                  key={item._id}
                  item={item}
                  selected={selectedUrl === item.url}
                  onSelect={(m) => {
                    onSelect(m.url);
                    onOpenChange(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
