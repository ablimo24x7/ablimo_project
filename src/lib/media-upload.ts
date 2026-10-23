"use client";

export type MediaItem = {
  _id: string;
  url: string;
  pathname: string;
  filename: string;
  contentType: string;
  kind: "image" | "video" | "other";
  size: number;
  alt: string;
  createdAt: string;
};

export type MediaAccept = "image" | "video" | "all";

export function acceptAttrFor(accept: MediaAccept): string {
  if (accept === "image") return "image/*";
  if (accept === "video") return "video/*";
  return "image/*,video/*";
}

export function kindForAccept(accept: MediaAccept): "image" | "video" | undefined {
  if (accept === "image" || accept === "video") return accept;
  return undefined;
}

export function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, i);
  return `${value >= 10 || i === 0 ? Math.round(value) : value.toFixed(1)} ${units[i]}`;
}

/**
 * Uploads a file to POST /api/media with progress reporting.
 * Uses XHR because fetch cannot report upload progress.
 */
export function uploadMediaFile(
  file: File,
  onProgress?: (percent: number) => void
): Promise<MediaItem> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/media?filename=${encodeURIComponent(file.name)}`);
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      let body: unknown = null;
      try {
        body = JSON.parse(xhr.responseText);
      } catch {
        /* non-JSON error body */
      }
      if (xhr.status >= 200 && xhr.status < 300 && body) {
        resolve(body as MediaItem);
      } else {
        const message =
          (body as { error?: string } | null)?.error || `Upload failed (${xhr.status})`;
        reject(new Error(message));
      }
    };
    xhr.onerror = () => reject(new Error("Upload failed — network error"));
    xhr.send(file);
  });
}
