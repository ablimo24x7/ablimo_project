"use client";

import { useState, useRef } from "react";
import { Languages } from "lucide-react";
import { toast } from "sonner";
import { googleTranslate, googleTranslateHtml } from "@/lib/googleTranslate";
import { Button } from "@/components/ui/button";

interface TranslateButtonProps {
  text: string;
  onTranslated: (translated: string, direction: "ar" | "en") => void;
  isHtml?: boolean;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function TranslateButton({
  text,
  onTranslated,
  isHtml = false,
  size = "sm",
  className = "",
}: TranslateButtonProps) {
  const [loading, setLoading] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const originalRef = useRef<string | null>(null);

  const handleClick = async () => {
    if (isTranslated) {
      if (originalRef.current !== null) {
        onTranslated(originalRef.current, "en");
        originalRef.current = null;
      }
      setIsTranslated(false);
      toast.success("Restored original English");
      return;
    }

    if (!text || !text.trim()) {
      toast.warning("Nothing to translate");
      return;
    }

    setLoading(true);
    try {
      originalRef.current = text;
      const translated = isHtml
        ? await googleTranslateHtml(text, "ar")
        : await googleTranslate(text, "ar");
      onTranslated(translated, "ar");
      setIsTranslated(true);
      toast.success("Translated to Arabic");
    } catch {
      toast.error("Translation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size={size}
      onClick={handleClick}
      disabled={loading || !text?.trim()}
      className={`gap-1 ${
        isTranslated
          ? "text-amber-500 hover:text-amber-400 hover:bg-amber-500/10"
          : "text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10"
      } ${className}`}
      title={isTranslated ? "Restore English" : "Translate to Arabic"}
    >
      <Languages className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
      <span className="text-[10px] font-bold">{isTranslated ? "EN" : "AR"}</span>
    </Button>
  );
}
