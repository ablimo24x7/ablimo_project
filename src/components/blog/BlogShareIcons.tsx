"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

interface BlogShareIconsProps {
  title: string;
  /** "meta" — flat icon row in the article meta bar. "sidebar" — round bordered buttons. */
  variant: "meta" | "sidebar";
  copyLinkLabel: string;
  linkCopiedLabel: string;
}

function linkedInUrl(url: string) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}

function xUrl(url: string, title: string) {
  return `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
}

export function BlogShareIcons({
  title,
  variant,
  copyLinkLabel,
  linkCopiedLabel,
}: BlogShareIconsProps) {
  const [copied, setCopied] = useState(false);
  // Set after mount so SSR HTML matches the first client render.
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    // Mount-only: reading location.href here keeps SSR HTML identical to the
    // first client render (window is unavailable on the server).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPageUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/insecure context) — ignore.
    }
  };

  const iconClass =
    variant === "meta" ? "w-5 h-5" : "w-4 h-4";

  const wrapperClass =
    variant === "meta"
      ? "flex items-center gap-3"
      : "flex items-center gap-3";

  const linkClass =
    variant === "meta"
      ? "text-gray-500 hover:text-abBlue transition-colors"
      : "w-10 h-10 rounded-full bg-abDarkGray border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-abBlue transition-colors";

  return (
    <div className={wrapperClass}>
      <a
        href={linkedInUrl(pageUrl)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={linkClass}
      >
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      <a
        href={xUrl(pageUrl, title)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
        className={linkClass}
      >
        <svg className={iconClass} fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
        </svg>
      </a>
      {variant === "meta" ? (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? linkCopiedLabel : copyLinkLabel}
          className="text-gray-500 hover:text-abBlue transition-colors"
        >
          {copied ? (
            <Check className="w-5 h-5 text-abGreen" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
      ) : (
        <a
          href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(pageUrl)}`}
          aria-label="Email"
          className={linkClass}
        >
          <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
      )}
      {variant === "meta" && copied && (
        <span className="text-xs text-abGreen font-mono">{linkCopiedLabel}</span>
      )}
    </div>
  );
}
