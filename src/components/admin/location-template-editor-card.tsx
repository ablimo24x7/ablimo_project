"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Save, Wand2, Plus } from "lucide-react";
import { SectionLibraryEditor } from "./section-library-editor";
import type { PageSection } from "@/components/services/sections/section-types";
import type { SectionInstance, SectionScope } from "@/components/section-library/types";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { buildCountryTemplate } from "@/components/section-library/presets/country-presets";
import { buildCityTemplate } from "@/components/section-library/presets/city-presets";
import { buildRouteTemplate } from "@/components/section-library/presets/route-presets";

const TEMPLATE_LANG = "en-US";

async function loadDict(): Promise<Dictionary> {
  return ((await import(
    /* webpackChunkName: "dict-template" */ `@/app/[lang]/dictionaries/${TEMPLATE_LANG}.json`
  )) as { default: unknown }).default as Dictionary;
}

function buildTemplateSections(
  pageType: "country" | "city" | "route",
  refKey: string,
  dict: Dictionary
): SectionInstance[] {
  if (pageType === "country") return buildCountryTemplate(refKey, dict);
  if (pageType === "city") {
    const [countrySlug, citySlug] = refKey.split("/");
    if (!countrySlug || !citySlug) throw new Error("Invalid city refKey");
    return buildCityTemplate(countrySlug, citySlug, dict);
  }
  return buildRouteTemplate(refKey, dict);
}

interface LocationTemplateEditorCardProps {
  pageType: "country" | "city" | "route";
  /** country: `united-arab-emirates` · city: `united-arab-emirates/dubai` · route: country slug */
  refKey: string;
  scope: SectionScope;
  title: string;
  description?: string;
  /** Entity FAQs (country/city) — previewed read-only in context-bound FAQ sections. */
  faqContextItems?: Array<{ q: string; a: string }>;
}

export function LocationTemplateEditorCard({
  pageType,
  refKey,
  scope,
  title,
  description,
  faqContextItems,
}: LocationTemplateEditorCardProps) {
  const [docId, setDocId] = React.useState<string | null>(null);
  const [sections, setSections] = React.useState<SectionInstance[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [buildingDefault, setBuildingDefault] = React.useState(false);
  const [dirty, setDirty] = React.useState(false);

  // Slugs are edited character by character in the parent form — debounce
  // so template fetches don't fire on every keystroke.
  const [debouncedRefKey, setDebouncedRefKey] = React.useState(refKey);
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedRefKey(refKey), 500);
    return () => clearTimeout(timer);
  }, [refKey]);

  React.useEffect(() => {
    let stale = false;
    const run = async () => {
      try {
        const res = await fetch(
          `/api/location-templates?pageType=${pageType}&refKey=${encodeURIComponent(
            debouncedRefKey
          )}`
        );
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data = await res.json();
        const doc = Array.isArray(data.items) ? data.items[0] : undefined;
        if (stale) return;
        setDocId(doc ? doc._id : null);
        setSections(
          doc ? ((Array.isArray(doc.template) ? doc.template : []) as SectionInstance[]) : []
        );
        setDirty(false);
      } catch {
        if (stale) return;
        setDocId(null);
        setSections([]);
        setDirty(false);
        toast.error(`Failed to load ${title} template`);
      } finally {
        if (!stale) setLoading(false);
      }
    };
    void run();
    return () => {
      stale = true;
    };
  }, [pageType, debouncedRefKey, title]);

  const [preset, setPreset] = React.useState<{
    name: string;
    description: string;
    icon: string;
    sections: SectionInstance[];
  } | null>(null);
  React.useEffect(() => {
    let stale = false;
    const [refCountry, refCity] = debouncedRefKey.split("/");
    const validRef =
      pageType === "city" ? !!refCountry && !!refCity : !!debouncedRefKey;
    if (!validRef) {
      setPreset(null);
      return;
    }
    void (async () => {
      try {
        const dict = await loadDict();
        const sections = buildTemplateSections(pageType, debouncedRefKey, dict);
        if (stale) return;
        setPreset({
          name: `Default ${pageType} template`,
          description: `Prefills the ${pageType} page with its standard sections`,
          icon: "Layout",
          sections,
        });
      } catch {
        if (!stale) setPreset(null);
      }
    })();
    return () => {
      stale = true;
    };
  }, [pageType, debouncedRefKey]);

  const buildDefault = async () => {
    setBuildingDefault(true);
    try {
      const dict = await loadDict();
      const built = buildTemplateSections(pageType, refKey, dict);
      setSections(built);
      setDirty(true);
      toast.info(
        docId
          ? "Default template loaded — review and Save to replace the stored one"
          : "Default template loaded — Save to create it"
      );
    } catch {
      toast.error("Failed to build the default template");
    } finally {
      setBuildingDefault(false);
    }
  };

  const save = async () => {
    if (sections === null) return;
    if (!docId && sections.length === 0) {
      toast.error("Add sections (or load the default template) before saving");
      return;
    }
    setSaving(true);
    try {
      const url = docId
        ? `/api/location-templates/${docId}`
        : `/api/location-templates`;
      const body = docId
        ? { template: sections }
        : { pageType, refKey, template: sections };
      const res = await fetch(url, {
        method: docId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || `Save failed (${res.status})`);
      }
      const saved = await res.json();
      if (saved && saved._id) setDocId(saved._id);
      setDirty(false);
      toast.success(`${title} saved`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <Label className="text-sm font-semibold">{title}</Label>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={buildDefault}
            disabled={loading || buildingDefault || saving}
          >
            {buildingDefault ? (
              <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Wand2 className="mr-1 h-3.5 w-3.5" />
            )}
            {docId ? "Load default" : "Create from default"}
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={save}
            disabled={loading || saving || sections === null || (!docId && !dirty && sections.length === 0)}
          >
            {saving ? (
              <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="mr-1 h-3.5 w-3.5" />
            )}
            {docId ? "Save changes" : "Create template"}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-6">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading template…
        </div>
      ) : (
        <div className="space-y-3">
          {sections !== null && sections.length === 0 && (
            <div className="flex items-center justify-between rounded-md border border-dashed px-3 py-2 text-xs text-muted-foreground">
              <span>
                No template yet.
                {docId
                  ? " Add sections below or load the default."
                  : " Load the default to prefill it with this page's sections."}
              </span>
              {!docId && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7"
                  onClick={buildDefault}
                  disabled={buildingDefault}
                >
                  {buildingDefault ? (
                    <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Plus className="mr-1 h-3.5 w-3.5" />
                  )}
                  Load default
                </Button>
              )}
            </div>
          )}
          <SectionLibraryEditor
            sections={(sections ?? []) as PageSection[]}
            onChange={(next) => {
              setSections(next as SectionInstance[]);
              setDirty(true);
            }}
            scope={scope}
            presets={preset ? [preset] : []}
            faqContextItems={faqContextItems}
          />
        </div>
      )}
    </div>
  );
}
