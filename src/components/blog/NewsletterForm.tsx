"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface NewsletterFormProps {
  locale: string;
  placeholder: string;
  buttonLabel: string;
  successMessage: string;
  errorMessage: string;
  loadingMessage: string;
}

export function NewsletterForm({
  locale,
  placeholder,
  buttonLabel,
  successMessage,
  errorMessage,
  loadingMessage,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="w-full bg-abDarkGray border border-abGreen text-abGreen p-4 font-bold text-sm rounded-sm flex items-center justify-center gap-2">
        <Check className="w-4 h-4" />
        {successMessage}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={placeholder}
          className="flex-grow bg-abDarkGray border border-gray-700 text-white px-4 py-3.5 focus:outline-none focus:border-abBlue focus:ring-1 focus:ring-abBlue rounded-sm transition-colors text-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-abBlue hover:bg-abServiceBlue text-abBlack font-bold px-8 py-3.5 rounded-sm transition-colors text-sm whitespace-nowrap disabled:opacity-60"
        >
          {status === "loading" ? loadingMessage : buttonLabel}
        </button>
      </div>
      {status === "error" && (
        <p className="text-abRed text-xs font-bold" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
