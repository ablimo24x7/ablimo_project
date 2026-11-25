"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, Images } from "lucide-react";
import { MediaPicker } from "./media-picker";
import { acceptAttrFor, uploadMediaFile, type MediaAccept } from "@/lib/media-upload";
import { usePermissions } from "@/hooks/use-permissions";

/**
 * URL text input with Vercel Blob upload + media library picker buttons.
 * `value` / `onChange` keep the same contract as the plain URL inputs it
 * replaces — the URL string is still the source of truth in the form.
 */
export function MediaInput({
  value,
  onChange,
  accept = "image",
  label,
  required,
  placeholder = "https://...",
  disabled,
  id,
}: {
  value: string;
  onChange: (url: string) => void;
  accept?: MediaAccept;
  label?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}) {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const { canUpload } = usePermissions();

  const handleFile = async (file: File) => {
    const wantsImage = accept === "image";
    const wantsVideo = accept === "video";
    if (wantsImage && !file.type.startsWith("image/")) {
      toast.error("Only image files are allowed here");
      return;
    }
    if (wantsVideo && !file.type.startsWith("video/")) {
      toast.error("Only video files are allowed here");
      return;
    }
    setUploading(true);
    setProgress(0);
    try {
      const media = await uploadMediaFile(file, setProgress);
      onChange(media.url);
      toast.success("File uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={inputId}>
          {label}
          {required ? " *" : ""}
        </Label>
      )}
      <div className="flex gap-2">
        <Input
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled || uploading}
          className="flex-1"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptAttrFor(accept)}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
        {canUpload && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled || uploading}
            onClick={() => fileInputRef.current?.click()}
            title="Upload a file"
          >
            <Upload className="size-3.5" />
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || uploading}
          onClick={() => setPickerOpen(true)}
          title="Browse media library"
        >
          <Images className="size-3.5" />
        </Button>
      </div>
      {uploading && <Progress value={progress} className="w-full" />}
      <MediaPicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={onChange}
        accept={accept}
        selectedUrl={value}
        showHeader={false}
      />
    </div>
  );
}
