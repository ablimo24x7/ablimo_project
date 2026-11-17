"use client";

import * as React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MediaInput } from "@/components/admin/media-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus, Trash2, GripVertical, Copy, ChevronDown, ChevronUp, ExternalLink,
  Layout, LayoutGrid, PanelLeft, Car, FileText, HelpCircle, Megaphone, RefreshCw, Columns2,
  Building2, Plane, Route, Gauge, Camera, ChevronRight,
} from "lucide-react";
import { WysiwygEditor } from "@/components/ui/wysiwyg-editor";
import {
  SECTION_TYPES,
  type PageSection,
  type SectionTypeConfig,
} from "@/components/services/sections/section-types";
import { ICON_OPTIONS } from "@/components/services/sections/section-icons";
import { TEMPLATE_PRESETS, type TemplatePreset } from "@/components/services/sections/section-defaults";
import { useCanManageStructure } from "@/components/providers/structure-permissions";
import type { SectionScope, SectionInstance } from "@/components/section-library/types";
import { getDefinitionsForScope, getDefinition } from "@/components/section-library/definitions";
import { resolveCityMeta, localizeSectionsForCity } from "@/lib/city-localization";
import { resolveCountryMeta, localizeSectionsForCountry } from "@/lib/country-localization";

const SECTION_ICONS: Record<string, React.ElementType> = {
  hero: Layout,
  marquee: RefreshCw,
  serviceCards: LayoutGrid,
  mediaContent: PanelLeft,
  textMediaGrid: Columns2,
  fleetGrid: Car,
  contactForm: FileText,
  faq: HelpCircle,
  ctaBanner: Megaphone,
  introText: FileText,
  citiesGrid: Building2,
  airportsGrid: Plane,
  routesGrid: Route,
  routeStats: Gauge,
  cityVisuals: Camera,
  breadcrumb: ChevronRight,
  dubaiHero: Layout,
  cityHero: Layout,
  dubaiFleet: Car,
  cityFleet: Car,
  dubaiJourneys: Route,
  cityJourneys: Route,
  dubaiServices: LayoutGrid,
  cityServices: LayoutGrid,
  dubaiCta: Megaphone,
  cityCta: Megaphone,
};

// Preset shape accepted by the editor — service presets (PageSection) are
// assignable, and location presets (SectionInstance types) fit directly.
type LibraryPreset = Omit<TemplatePreset, "sections"> & { sections: SectionInstance[] };

interface SectionLibraryEditorProps {
  sections: PageSection[];
  onChange: (sections: PageSection[]) => void;
  serviceSlug?: string;
  previewUrl?: string;
  scope?: SectionScope;
  presets?: LibraryPreset[];
  /**
   * City context — when set, applying a template localizes city-specific
   * copy (textMediaGrid regeneration + Riyadh token substitution) for
   * this city instead of pasting the Riyadh-hardcoded wording.
   */
  citySlug?: string;
  /**
   * Country context — when set (and no citySlug), applying a template
   * localizes country-specific copy (textMediaGrid regeneration + UAE
   * token substitution) for this country instead of pasting the
   * UAE-flagship wording. UAE keeps the template's original wording.
   */
  countrySlug?: string;
  /** Live entity FAQs (country/city) — shown read-only in context-bound FAQ sections. */
  faqContextItems?: Array<{ q: string; a: string }>;
  /**
   * Lock the section structure: no adding, removing, duplicating, reordering
   * or applying templates. Used by the Arabic tab, where only the copy of the
   * existing sections may change.
   */
  structureLocked?: boolean;
  /**
   * Show only the copy fields (Content + Items) and hide styling/behaviour
   * tabs. Used by the Arabic tab.
   */
  textOnly?: boolean;
}

export function SectionLibraryEditor({
  sections,
  onChange,
  serviceSlug,
  previewUrl: previewUrlProp,
  scope = "service",
  presets,
  citySlug,
  countrySlug,
  faqContextItems,
  structureLocked = false,
  textOnly = false,
}: SectionLibraryEditorProps) {
  // Location scopes get no service templates by default — callers pass
  // scope-specific presets (or none, which shows the empty state).
  const activePresets: LibraryPreset[] =
    presets ?? (scope === "service" ? TEMPLATE_PRESETS : []);
  const addPanelConfigs: SectionTypeConfig[] =
    scope === "service"
      ? SECTION_TYPES
      : (getDefinitionsForScope(scope) as unknown as SectionTypeConfig[]);
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({});
  const [showAddPanel, setShowAddPanel] = React.useState(false);
  const [showPresets, setShowPresets] = React.useState(false);
  const canManage = useCanManageStructure();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addSection = (config: SectionTypeConfig, variant?: string) => {
    const newSection = config.defaults();
    if (variant) newSection.variant = variant;
    newSection.order = sections.length;
    onChange([...sections, newSection]);
    setExpandedSections((prev) => ({ ...prev, [newSection.id]: true }));
    setShowAddPanel(false);
  };

  const removeSection = (id: string) => {
    onChange(sections.filter((s) => s.id !== id));
  };

  const duplicateSection = React.useCallback((section: PageSection) => {
    const clone = JSON.parse(JSON.stringify(section));
    clone.id = `sec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    clone.order = sections.length;
    onChange([...sections, clone]);
    setExpandedSections((prev) => ({ ...prev, [clone.id]: true }));
  }, [sections, onChange, setExpandedSections]);

  const updateSection = (id: string, updates: Partial<PageSection>) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(sections, oldIndex, newIndex).map((s: PageSection, i: number) => ({ ...s, order: i }));
    onChange(reordered);
  };

  const applyPreset = (presetIndex: number) => {
    const preset = activePresets[presetIndex];
    if (!preset) return;
    const withOrder = preset.sections.map((s, i) => {
      const freshId = `sec-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`;
      return {
        ...JSON.parse(JSON.stringify(s)),
        id: freshId,
        order: i,
        items: (s.items || []).map((item, j) => ({
          ...JSON.parse(JSON.stringify(item)),
          id: `itm-${Date.now()}-${i}-${j}-${Math.random().toString(36).substr(2, 9)}`,
        })),
      };
    });
    // Localize city-specific copy for the target city. Riyadh keeps the
    // template's original hand-written wording; unknown/empty cities fall
    // back to the raw preset. Country presets are written in UAE voice —
    // the same rule applies: UAE (or no country selected) keeps the base.
    const cityMeta = citySlug ? resolveCityMeta(citySlug) : null;
    const countryMeta = !citySlug && countrySlug ? resolveCountryMeta(countrySlug) : null;
    const localized = cityMeta
      ? cityMeta.slug !== "riyadh"
        ? localizeSectionsForCity(withOrder as unknown as Record<string, unknown>[], cityMeta)
        : withOrder
      : countryMeta && countryMeta.slug !== "uae"
        ? localizeSectionsForCountry(withOrder as unknown as Record<string, unknown>[], countryMeta)
        : withOrder;
    onChange(localized as unknown as PageSection[]);
    setShowPresets(false);
  };

  const resolvedPreviewUrl = previewUrlProp || (serviceSlug ? `/services/${serviceSlug}` : null);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Page Sections</h3>
        <div className="flex gap-2">
          {resolvedPreviewUrl && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => window.open(resolvedPreviewUrl, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-1" /> Preview
            </Button>
          )}
          {canManage && !structureLocked && (
            <Button type="button" size="sm" variant="outline" onClick={() => setShowPresets(!showPresets)}>
              Templates
            </Button>
          )}
          {canManage && !structureLocked && (
            <Button type="button" size="sm" onClick={() => setShowAddPanel(!showAddPanel)}>
              <Plus className="h-4 w-4 mr-1" /> Add Section
            </Button>
          )}
        </div>
      </div>

      {/* Preset Selector */}
      {showPresets && (
        <Card className="border-dashed">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-3">Replace all sections with a template:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activePresets.map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => applyPreset(i)}
                  className="text-left p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="font-medium text-sm">{preset.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{preset.description}</div>
                  <div className="text-xs text-abBlue mt-2">{preset.sections.length} sections</div>
                </button>
              ))}
              {activePresets.length === 0 && (
                <p className="text-xs text-muted-foreground col-span-full">
                  No templates available for this page type.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Section Panel */}
      {showAddPanel && (
        <Card className="border-dashed">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-3">Choose a section type:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {addPanelConfigs.map((config) => {
                const Icon = SECTION_ICONS[config.type] || Layout;
                return (
                  <button
                    key={config.type}
                    type="button"
                    onClick={() => addSection(config)}
                    className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors text-center"
                  >
                    <Icon className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm font-medium">{config.label}</span>
                    <span className="text-xs text-muted-foreground mt-1">{config.variants.length} variants</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {sections.length === 0 && (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">No sections yet. Add a section or choose a template.</p>
          <div className="flex gap-2 justify-center">
            {canManage && !structureLocked && (
              <Button type="button" variant="outline" onClick={() => setShowPresets(true)}>
                Choose Template
              </Button>
            )}
            {canManage && !structureLocked && (
              <Button type="button" onClick={() => setShowAddPanel(true)}>
                <Plus className="h-4 w-4 mr-1" /> Add Section
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Sortable Sections */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {[...sections]
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((section) => (
                <SortableSectionItem
                  key={section.id}
                  scope={scope}
                  section={section}
                  faqContextItems={faqContextItems}
                  structureLocked={structureLocked}
                  textOnly={textOnly}
                  isExpanded={expandedSections[section.id] || false}
                  onToggle={() => setExpandedSections((p) => ({ ...p, [section.id]: !p[section.id] }))}
                  onRemove={() => removeSection(section.id)}
                  onDuplicate={() => duplicateSection(section)}
                  onUpdate={(updates) => updateSection(section.id, updates)}
                />
              ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

// ── Sortable Section Item ────────────────────────────────────────

interface SortableSectionItemProps {
  scope: SectionScope;
  section: PageSection;
  faqContextItems?: Array<{ q: string; a: string }>;
  structureLocked?: boolean;
  textOnly?: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onUpdate: (updates: Partial<PageSection>) => void;
}

function SortableSectionItem({
  scope,
  section,
  faqContextItems,
  structureLocked = false,
  textOnly = false,
  isExpanded,
  onToggle,
  onRemove,
  onDuplicate,
  onUpdate,
}: SortableSectionItemProps) {
  const canManage = useCanManageStructure();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    disabled: structureLocked,
  });
  const config =
    SECTION_TYPES.find((s) => s.type === section.type) ??
    (getDefinition(section.type) as unknown as SectionTypeConfig | undefined);
  const Icon = SECTION_ICONS[section.type] || Layout;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 0,
  };

  const heading = (section.content as Record<string, string>).heading;
  const label =
    section.type === "hero"
      ? (section.content as Record<string, string>).title || "Hero"
      : section.type === "serviceCards"
      ? heading || "Service Cards"
      : section.type === "faq"
      ? heading || "FAQ"
      : scope !== "service" && heading
      ? heading
      : config?.label || section.type;

  return (
    <div ref={setNodeRef} style={style} className="border rounded-lg overflow-hidden bg-card">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 text-left cursor-pointer hover:bg-muted/50"
      >
        <div className="flex items-center gap-3">
          <div
            {...attributes}
            {...listeners}
            className={structureLocked ? "opacity-40" : "cursor-grab active:cursor-grabbing"}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <Icon className="h-4 w-4 text-muted-foreground" />
          <div>
            <span className="text-sm font-medium">{label}</span>
            <span className="text-xs text-muted-foreground ml-2">
              {section.variant} · {section.enabled ? "visible" : "hidden"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {!structureLocked && (
            <Switch
              checked={section.enabled}
              onCheckedChange={(v) => onUpdate({ enabled: v })}
              className="scale-75"
            />
          )}
          {canManage && !structureLocked && (
            <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onDuplicate}>
              <Copy className="h-3.5 w-3.5" />
            </Button>
          )}
          {canManage && !structureLocked && (
            <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onRemove}>
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          )}
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {isExpanded && (
        <SectionEditorPanel
          section={section}
          scope={scope}
          faqContextItems={faqContextItems}
          textOnly={textOnly}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}

// ── Section Editor Panel ─────────────────────────────────────────

interface SectionEditorPanelProps {
  scope?: SectionScope;
  section: PageSection;
  faqContextItems?: Array<{ q: string; a: string }>;
  structureLocked?: boolean;
  textOnly?: boolean;
  onUpdate: (updates: Partial<PageSection>) => void;
}

function SectionEditorPanel({ section, scope = "service", faqContextItems, structureLocked = false, textOnly = false, onUpdate }: SectionEditorPanelProps) {
  return (
    <div className="px-4 pb-4 border-t pt-4">
      <Tabs defaultValue="content">
        <TabsList className="w-full">
          <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
          <TabsTrigger value="items" className="flex-1">Items</TabsTrigger>
          {!textOnly && (
            <>
              <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
              <TabsTrigger value="appearance" className="flex-1">Style</TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="content" className="mt-4">
          <ContentTab section={section} scope={scope} structureLocked={structureLocked} onUpdate={onUpdate} />
        </TabsContent>

        <TabsContent value="items" className="mt-4">
          <ItemsTab
            section={section}
            scope={scope}
            faqContextItems={faqContextItems}
            structureLocked={structureLocked}
            onUpdate={onUpdate}
          />
        </TabsContent>

        {!textOnly && (
          <>
            <TabsContent value="settings" className="mt-4">
              <SettingsTab section={section} scope={scope} onUpdate={onUpdate} />
            </TabsContent>

            <TabsContent value="appearance" className="mt-4">
              <AppearanceTab section={section} scope={scope} onUpdate={onUpdate} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}

// ── Content Tab ──────────────────────────────────────────────────

function ContentTab({ section, scope = "service", structureLocked = false, onUpdate }: SectionEditorPanelProps) {
  const canManage = useCanManageStructure();
  const c = section.content as Record<string, unknown>;

  const updateContent = (key: string, value: unknown) => {
    onUpdate({ content: { ...section.content, [key]: value } });
  };

  const updateSettings = (key: string, value: unknown) => {
    onUpdate({ settings: { ...section.settings, [key]: value } });
  };

  const sectionSettings = (section.settings || {}) as Record<string, unknown>;
  const sectionType = section.type as string;
  const imageRows = Object.entries((c.images as Record<string, string>) || {});
  const writeImageRows = (next: [string, string][]) =>
    updateContent("images", Object.fromEntries(next));

  const cityImagesEditor = (
    <div className="border-t pt-4 mt-4">
      <Label className="text-sm font-medium mb-2 block">City Images (slug → URL)</Label>
      <p className="text-xs text-muted-foreground mb-3">Map each city slug to an image URL. Unmapped cities fall back to the default photo.</p>
      {imageRows.map(([slug, url], i) => (
        <div key={i} className="flex gap-2 items-center mb-2">
          <Input
            value={slug}
            onChange={(e) => {
              const next = imageRows.slice();
              next[i] = [e.target.value, url];
              writeImageRows(next);
            }}
            placeholder="City slug (e.g. dubai)"
            className="flex-1"
          />
          <div className="flex-[2] min-w-0">
            <MediaInput
              value={url}
              onChange={(nextUrl) => {
                const next = imageRows.slice();
                next[i] = [slug, nextUrl];
                writeImageRows(next);
              }}
              accept="image"
              placeholder="https://... image URL"
            />
          </div>
          {canManage && !structureLocked && (
            <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => writeImageRows(imageRows.filter((_, idx) => idx !== i))}>
              <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
          )}
        </div>
      ))}
      {canManage && !structureLocked && (
        <Button type="button" variant="outline" size="sm" onClick={() => writeImageRows([...imageRows, ["", ""]])}>
          <Plus className="h-4 w-4 mr-1" /> Add Image
        </Button>
      )}
    </div>
  );

  switch (sectionType) {
    case "hero":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Eyebrow Badge</Label>
            <Input value={(c.eyebrow as string) || ""} onChange={(e) => updateContent("eyebrow", e.target.value)} placeholder="B2B Mobility Framework" />
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={(c.title as string) || ""} onChange={(e) => updateContent("title", e.target.value)} placeholder="Executive & Corporate Mobility Solutions." />
          </div>
          <div className="space-y-2">
            <Label>Title Highlight (gold text)</Label>
            <Input value={(c.titleHighlight as string) || ""} onChange={(e) => updateContent("titleHighlight", e.target.value)} placeholder="Mobility Solutions." />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <WysiwygEditor value={(c.description as string) || ""} onChange={(v) => updateContent("description", v)} placeholder="Service description..." />
          </div>
          {scope === "route" && cityImagesEditor}
        </div>
      );

    case "marquee":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Speed</Label>
            <Select
              value={(sectionSettings.speed as string) || "normal"}
              onValueChange={(v) => updateSettings("speed", v)}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="slow">Slow</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="fast">Fast</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Opacity (%)</Label>
            <Input
              type="number"
              min={0}
              max={100}
              step={5}
              value={((sectionSettings.opacity as number) ?? 50)}
              onChange={(e) => updateSettings("opacity", parseInt(e.target.value) || 50)}
            />
          </div>
          <div className="border-t pt-4 mt-4">
            <Label className="text-sm font-medium mb-3 block">Marquee Items</Label>
            {((c.items as Array<{id: string; icon: string; label: string}>) || []).map((item, idx) => (
              <div key={item.id} className="flex items-center gap-2 mb-2">
                <Select
                  value={item.icon || ""}
                  onValueChange={(v) => {
                    if (!v) return;
                    const newItems = [...((c.items as Array<{id: string; icon: string; label: string}>) || [])];
                    newItems[idx] = { ...newItems[idx], icon: v };
                    updateContent("items", newItems);
                  }}
                >
                  <SelectTrigger className="w-[120px]"><SelectValue placeholder="Icon" /></SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={item.label || ""}
                  onChange={(e) => {
                    const newItems = [...((c.items as Array<{id: string; icon: string; label: string}>) || [])];
                    newItems[idx] = { ...newItems[idx], label: e.target.value };
                    updateContent("items", newItems);
                  }}
                  placeholder="Label text"
                  className="flex-1"
                />
                {canManage && !structureLocked && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newItems = ((c.items as Array<{id: string; icon: string; label: string}>) || []).filter((_, i) => i !== idx);
                      updateContent("items", newItems);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {canManage && !structureLocked && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newItems = [...((c.items as Array<{id: string; icon: string; label: string}>) || []), { id: `item-${Date.now()}`, icon: "Building", label: "" }];
                  updateContent("items", newItems);
                }}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Item
              </Button>
            )}
          </div>
        </div>
      );

    case "serviceCards":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Eyebrow</Label>
            <Input value={(c.eyebrow as string) || ""} onChange={(e) => updateContent("eyebrow", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={(c.heading as string) || ""} onChange={(e) => updateContent("heading", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <WysiwygEditor value={(c.description as string) || ""} onChange={(v) => updateContent("description", v)} />
          </div>
          <div className="border-t pt-4 mt-4">
            <Label className="text-sm font-medium mb-3 block">Header CTA Button</Label>
            <div className="space-y-3">
              <Input
                value={((c.sectionCta as Record<string, string>)?.label) || ""}
                onChange={(e) => updateContent("sectionCta", { ...(c.sectionCta as Record<string, string> || {}), label: e.target.value })}
                placeholder="Button label (leave empty to hide)"
              />
              <Input
                value={((c.sectionCta as Record<string, string>)?.href) || ""}
                onChange={(e) => updateContent("sectionCta", { ...(c.sectionCta as Record<string, string> || {}), href: e.target.value })}
                placeholder="Button URL"
              />
              <Select
                value={((c.sectionCta as Record<string, string>)?.style) || "primary"}
                onValueChange={(v) => updateContent("sectionCta", { ...(c.sectionCta as Record<string, string> || {}), style: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary (Gold)</SelectItem>
                  <SelectItem value="secondary">Secondary (Outlined)</SelectItem>
                  <SelectItem value="outline">Outline (Gray)</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={((c.sectionCta as Record<string, string>)?.icon) || ""}
                onValueChange={(v) => updateContent("sectionCta", { ...(c.sectionCta as Record<string, string> || {}), icon: v })}
              >
                <SelectTrigger><SelectValue placeholder="No icon" /></SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="border-t pt-4 mt-4">
            <Label className="text-sm font-medium mb-3 block">Bottom CTA Button (below cards)</Label>
            <div className="space-y-3">
              <Input
                value={((c.bottomCta as Record<string, string>)?.label) || ""}
                onChange={(e) => updateContent("bottomCta", { ...(c.bottomCta as Record<string, string> || {}), label: e.target.value })}
                placeholder="Button label (leave empty to hide)"
              />
              <Input
                value={((c.bottomCta as Record<string, string>)?.href) || ""}
                onChange={(e) => updateContent("bottomCta", { ...(c.bottomCta as Record<string, string> || {}), href: e.target.value })}
                placeholder="Button URL"
              />
              <Select
                value={((c.bottomCta as Record<string, string>)?.style) || "primary"}
                onValueChange={(v) => updateContent("bottomCta", { ...(c.bottomCta as Record<string, string> || {}), style: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary (Gold)</SelectItem>
                  <SelectItem value="secondary">Secondary (Outlined)</SelectItem>
                  <SelectItem value="outline">Outline (Gray)</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={((c.bottomCta as Record<string, string>)?.icon) || ""}
                onValueChange={(v) => updateContent("bottomCta", { ...(c.bottomCta as Record<string, string> || {}), icon: v })}
              >
                <SelectTrigger><SelectValue placeholder="No icon" /></SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      );

    case "mediaContent":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Eyebrow</Label>
            <Input value={(c.eyebrow as string) || ""} onChange={(e) => updateContent("eyebrow", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={(c.heading as string) || ""} onChange={(e) => updateContent("heading", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <WysiwygEditor value={(c.description as string) || ""} onChange={(v) => updateContent("description", v)} />
          </div>
          <div className="space-y-2">
            <Label>Media Window Title</Label>
            <Input
              value={(c.mediaTitle as string) || ""}
              onChange={(e) => updateContent("mediaTitle", e.target.value)}
              placeholder="AB Command Center"
            />
          </div>
          <div className="border-t pt-4 mt-4">
            <Label className="text-sm font-medium mb-3 block">Action Buttons (below items list)</Label>
            {((c.actions || []) as Array<Record<string, unknown>>).map((action, ai) => (
              <div key={ai} className="flex gap-2 items-center mb-2">
                <Input
                  value={(action.label as string) || ""}
                  onChange={(e) => {
                    const actions = [...((c.actions || []) as Array<Record<string, unknown>>)];
                    actions[ai] = { ...actions[ai], label: e.target.value };
                    updateContent("actions", actions);
                  }}
                  placeholder="Label"
                  className="flex-1"
                />
                <Input
                  value={(action.href as string) || ""}
                  onChange={(e) => {
                    const actions = [...((c.actions || []) as Array<Record<string, unknown>>)];
                    actions[ai] = { ...actions[ai], href: e.target.value };
                    updateContent("actions", actions);
                  }}
                  placeholder="URL"
                  className="flex-1"
                />
                <Select
                  value={(action.style as string) || "primary"}
                  onValueChange={(v) => {
                    const actions = [...((c.actions || []) as Array<Record<string, unknown>>)];
                    actions[ai] = { ...actions[ai], style: v };
                    updateContent("actions", actions);
                  }}
                >
                  <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                  </SelectContent>
                </Select>
                {canManage && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => {
                      const actions = [...((c.actions || []) as Array<Record<string, unknown>>)];
                      actions.splice(ai, 1);
                      updateContent("actions", actions);
                    }}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
            {canManage && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  const actions = [...((c.actions || []) as Array<Record<string, unknown>>), { label: "", href: "", style: "primary" }];
                  updateContent("actions", actions);
                }}
              >
                <Plus className="h-3 w-3 mr-1" /> Add Action Button
              </Button>
            )}
          </div>
        </div>
      );

    case "textMediaGrid":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Eyebrow</Label>
            <Input value={(c.eyebrow as string) || ""} onChange={(e) => updateContent("eyebrow", e.target.value)} placeholder="Infrastructure Alignment" />
          </div>
          <div className="space-y-2">
            <Label>Eyebrow Icon</Label>
            <Select value={(c.eyebrowIcon as string) || ""} onValueChange={(v) => updateContent("eyebrowIcon", v)}>
              <SelectTrigger><SelectValue placeholder="Select icon" /></SelectTrigger>
              <SelectContent>
                {ICON_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Heading (before highlight)</Label>
            <Input value={(c.heading as string) || ""} onChange={(e) => updateContent("heading", e.target.value)} placeholder="Powering Riyadh's" />
          </div>
          <div className="space-y-2">
            <Label>Heading Highlight (blue text)</Label>
            <Input value={(c.headingHighlight as string) || ""} onChange={(e) => updateContent("headingHighlight", e.target.value)} placeholder="Vision 2030" />
          </div>
          <div className="space-y-2">
            <Label>Heading (after highlight)</Label>
            <Input value={(c.headingAfter as string) || ""} onChange={(e) => updateContent("headingAfter", e.target.value)} placeholder="Corporate Ecosystem." />
          </div>
          <div className="space-y-2">
            <Label>Description (rich text paragraphs)</Label>
            <WysiwygEditor value={(c.description as string) || ""} onChange={(v) => updateContent("description", v)} placeholder="SEO paragraphs..." />
          </div>

          {/* Media & Layout Controls */}
          <div className="border-t border-gray-800 pt-5 mt-6 space-y-4">
            <div>
              <Label className="text-sm font-semibold text-white">Media Layout & Position</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Control where and how media images or stat cards appear beside or below the text.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Media Position</Label>
                <Select
                  value={(sectionSettings.mediaPosition as string) || "right"}
                  onValueChange={(v) => updateSettings("mediaPosition", v)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="right">Media on Right (Text Left)</SelectItem>
                    <SelectItem value="left">Media on Left (Text Right)</SelectItem>
                    <SelectItem value="bottom">Media Below Text (Horizontal Row)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Media Display Mode</Label>
                <Select
                  value={(sectionSettings.mediaLayout as string) || "mosaic"}
                  onValueChange={(v) => updateSettings("mediaLayout", v)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mosaic">Mosaic Grid (2-Col Asymmetric)</SelectItem>
                    <SelectItem value="row">Horizontal Row / Flex</SelectItem>
                    <SelectItem value="single">Single Featured Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Media Tiles / Images Manager */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Media Tiles ({((c.media || []) as Array<Record<string, unknown>>).length})
                </Label>
                {canManage && !structureLocked && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => {
                      const id = `itm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                      const currentMedia = ((c.media || []) as Array<Record<string, unknown>>);
                      const nextCol = currentMedia.length % 2 === 0 ? "left" : "right";
                      updateContent("media", [
                        ...currentMedia,
                        { id, type: "image", column: nextCol, size: "tall", image: "", imageAlt: "", overlay: "none" },
                      ]);
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Media Tile
                  </Button>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                Images and stats configured here are displayed in an aesthetic grid or flex row alongside your text.
              </p>

              {((c.media || []) as Array<Record<string, unknown>>).length === 0 ? (
                <div className="p-4 border border-dashed rounded-lg text-center bg-muted/10 space-y-2">
                  <p className="text-xs text-muted-foreground">No media tiles added yet. The text will render full-width.</p>
                  {canManage && !structureLocked && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        const id = `itm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                        updateContent("media", [
                          { id: `${id}-1`, type: "stat", column: "left", size: "short", statValue: "100%", statLabel: "Guaranteed Dispatch" },
                          { id: `${id}-2`, type: "image", column: "left", size: "tall", image: "", imageAlt: "Featured Image", overlay: "blue" },
                          { id: `${id}-3`, type: "image", column: "right", size: "tall", image: "", imageAlt: "Regional Operations", overlay: "gradient" },
                          { id: `${id}-4`, type: "stat", column: "right", size: "short", statValue: "24/7", statLabel: "Live Command" },
                        ]);
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" /> Load Recommended 4-Tile Preset
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {((c.media || []) as Array<Record<string, unknown>>).map((tile, ti) => {
                    const updateTile = (updates: Record<string, unknown>) => {
                      const tiles = [...((c.media || []) as Array<Record<string, unknown>>)];
                      tiles[ti] = { ...tiles[ti], ...updates };
                      updateContent("media", tiles);
                    };
                    const isImage = (tile.type as string) !== "stat";
                    return (
                      <div key={(tile.id as string) || ti} className="border border-gray-800 rounded-lg p-3 bg-muted/20 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-300">Tile {ti + 1}: {isImage ? "Image" : "Stat Card"}</span>
                          {canManage && !structureLocked && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-destructive/20"
                              onClick={() => {
                                updateContent(
                                  "media",
                                  ((c.media || []) as Array<Record<string, unknown>>).filter((_, i) => i !== ti)
                                );
                              }}
                            >
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <Select value={(tile.type as string) || "image"} onValueChange={(v) => updateTile({ type: v })}>
                            <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="image">Image</SelectItem>
                              <SelectItem value="stat">Stat Card</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={(tile.column as string) || "left"} onValueChange={(v) => updateTile({ column: v })}>
                            <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="left">Left Col</SelectItem>
                              <SelectItem value="right">Right Col</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={(tile.size as string) || "tall"} onValueChange={(v) => updateTile({ size: v })}>
                            <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tall">Tall</SelectItem>
                              <SelectItem value="short">Short</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {isImage ? (
                          <div className="space-y-2">
                            <MediaInput
                              value={(tile.image as string) || ""}
                              onChange={(url) => updateTile({ image: url })}
                              accept="image"
                              placeholder="Image URL"
                            />
                            {(tile.image as string) && (
                              <img
                                src={tile.image as string}
                                alt={(tile.imageAlt as string) || ""}
                                className="h-24 w-full rounded object-cover border border-gray-700"
                              />
                            )}
                            <Input
                              value={(tile.imageAlt as string) || ""}
                              onChange={(e) => updateTile({ imageAlt: e.target.value })}
                              placeholder="Alt text"
                              className="h-8 text-xs"
                            />
                            <div className="grid grid-cols-2 gap-2 items-center">
                              <Select value={(tile.overlay as string) || "none"} onValueChange={(v) => updateTile({ overlay: v })}>
                                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">No Overlay</SelectItem>
                                  <SelectItem value="blue">Blue Tint</SelectItem>
                                  <SelectItem value="gradient">Bottom Gradient</SelectItem>
                                </SelectContent>
                              </Select>
                              <div className="flex items-center gap-2">
                                <Switch checked={!!tile.contain} onCheckedChange={(v) => updateTile({ contain: v })} />
                                <Label className="text-xs">Contain on dark bg</Label>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={(tile.statValue as string) || ""}
                              onChange={(e) => updateTile({ statValue: e.target.value })}
                              placeholder="100%"
                              className="h-8 text-xs"
                            />
                            <Input
                              value={(tile.statLabel as string) || ""}
                              onChange={(e) => updateTile({ statLabel: e.target.value })}
                              placeholder="Guaranteed Dispatch"
                              className="h-8 text-xs"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      );

    case "fleetGrid":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Eyebrow</Label>
            <Input value={(c.eyebrow as string) || ""} onChange={(e) => updateContent("eyebrow", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={(c.heading as string) || ""} onChange={(e) => updateContent("heading", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <WysiwygEditor value={(c.description as string) || ""} onChange={(v) => updateContent("description", v)} />
          </div>
          <div className="border-t pt-4 mt-4">
            <Label className="text-sm font-medium mb-3 block">Header Right-Side Link</Label>
            <div className="space-y-3">
              <Input
                value={((c.headerAction as Record<string, string>)?.label) || ""}
                onChange={(e) => updateContent("headerAction", { ...(c.headerAction as Record<string, string> || {}), label: e.target.value })}
                placeholder="Link text (leave empty to hide)"
              />
              <Input
                value={((c.headerAction as Record<string, string>)?.href) || ""}
                onChange={(e) => updateContent("headerAction", { ...(c.headerAction as Record<string, string> || {}), href: e.target.value })}
                placeholder="Link URL"
              />
            </div>
          </div>
          <div className="border-t pt-4 mt-4">
            <Label className="text-sm font-medium mb-3 block">Bottom CTA Button</Label>
            <div className="space-y-3">
              <Input
                value={((c.bottomCta as Record<string, string>)?.label) || ""}
                onChange={(e) => updateContent("bottomCta", { ...(c.bottomCta as Record<string, string> || {}), label: e.target.value })}
                placeholder="Button label (leave empty to hide)"
              />
              <Input
                value={((c.bottomCta as Record<string, string>)?.href) || ""}
                onChange={(e) => updateContent("bottomCta", { ...(c.bottomCta as Record<string, string> || {}), href: e.target.value })}
                placeholder="Button URL"
              />
              <Select
                value={((c.bottomCta as Record<string, string>)?.style) || "secondary"}
                onValueChange={(v) => updateContent("bottomCta", { ...(c.bottomCta as Record<string, string> || {}), style: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary (Gold)</SelectItem>
                  <SelectItem value="secondary">Secondary (Outlined)</SelectItem>
                  <SelectItem value="outline">Outline (Gray)</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={((c.bottomCta as Record<string, string>)?.icon) || ""}
                onValueChange={(v) => updateContent("bottomCta", { ...(c.bottomCta as Record<string, string> || {}), icon: v })}
              >
                <SelectTrigger><SelectValue placeholder="No icon" /></SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      );

    case "contactForm":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Eyebrow</Label>
            <Input value={(c.eyebrow as string) || ""} onChange={(e) => updateContent("eyebrow", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={(c.heading as string) || ""} onChange={(e) => updateContent("heading", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <WysiwygEditor value={(c.description as string) || ""} onChange={(v) => updateContent("description", v)} />
          </div>
          <div className="space-y-2">
            <Label>Submit Button Label</Label>
            <Input value={(c.submitLabel as string) || ""} onChange={(e) => updateContent("submitLabel", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Success Title</Label>
            <Input value={(c.successTitle as string) || ""} onChange={(e) => updateContent("successTitle", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Success Message</Label>
            <Input value={(c.successMessage as string) || ""} onChange={(e) => updateContent("successMessage", e.target.value)} />
          </div>
        </div>
      );

    case "faq":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Eyebrow</Label>
            <Input value={(c.eyebrow as string) || ""} onChange={(e) => updateContent("eyebrow", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={(c.heading as string) || ""} onChange={(e) => updateContent("heading", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <WysiwygEditor value={(c.description as string) || ""} onChange={(v) => updateContent("description", v)} />
          </div>
          <div className="border-t pt-4 mt-4">
            <Label className="text-sm font-medium mb-3 block">CTA Bar (below FAQ list)</Label>
            <p className="text-xs text-muted-foreground mb-2">Configure the “Still have questions?” bar. Edit button labels, URLs, styles, and icons below.</p>
          </div>
        </div>
      );

    case "ctaBanner":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={(c.heading as string) || ""} onChange={(e) => updateContent("heading", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <WysiwygEditor value={(c.description as string) || ""} onChange={(v) => updateContent("description", v)} />
          </div>
        </div>
      );

    case "introText":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Eyebrow</Label>
            <Input value={(c.eyebrow as string) || ""} onChange={(e) => updateContent("eyebrow", e.target.value)} placeholder="About {country}" />
          </div>
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={(c.heading as string) || ""} onChange={(e) => updateContent("heading", e.target.value)} />
          </div>
          <div className="border-t pt-4 mt-4">
            <Label className="text-sm font-medium mb-2 block">Intro Paragraphs</Label>
            <p className="text-xs text-muted-foreground mb-3">Rich text paragraphs shown in order. Tokens like {"{country}"} and {"{city}"} resolve at render time.</p>
            {((c.paragraphs as string[]) || []).map((paragraph, pi) => (
              <div key={pi} className="flex gap-2 items-start mb-2">
                <WysiwygEditor
                  className="flex-1"
                  value={paragraph}
                  onChange={(v) => {
                    const next = [...((c.paragraphs as string[]) || [])];
                    next[pi] = v;
                    updateContent("paragraphs", next);
                  }}
                />
                {canManage && !structureLocked && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 shrink-0"
                    onClick={() => updateContent("paragraphs", ((c.paragraphs as string[]) || []).filter((_, i) => i !== pi))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {canManage && !structureLocked && (
              <Button type="button" variant="outline" size="sm" onClick={() => updateContent("paragraphs", [...((c.paragraphs as string[]) || []), ""])}>
                <Plus className="h-4 w-4 mr-1" /> Add Paragraph
              </Button>
            )}
          </div>
        </div>
      );

    case "citiesGrid":
    case "airportsGrid":
    case "routesGrid":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={(c.heading as string) || ""} onChange={(e) => updateContent("heading", e.target.value)} placeholder="Cities We Serve in {country}" />
          </div>
          {sectionType === "citiesGrid" && (
            <div className="space-y-2">
              <Label>Description</Label>
              <WysiwygEditor value={(c.description as string) || ""} onChange={(v) => updateContent("description", v)} />
            </div>
          )}
          <div className="border-t pt-4 mt-4">
            <Label className="text-sm font-medium mb-2 block">Data Source</Label>
            <p className="text-xs text-muted-foreground">Live from this location&apos;s data — grid entries are always kept in sync.</p>
          </div>
        </div>
      );

    case "routeStats":
      return (
        <div>
          <Label className="text-sm font-medium mb-2 block">Stat Cards</Label>
          <p className="text-xs text-muted-foreground">Add or edit distance, duration, and pricing cards in the Items tab. Use {"{distance}"} and {"{duration}"} tokens to fill from route data.</p>
        </div>
      );

    case "cityVisuals":
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Origin Label</Label>
              <Input value={(c.fromLabel as string) || "From"} onChange={(e) => updateContent("fromLabel", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Destination Label</Label>
              <Input value={(c.toLabel as string) || "To"} onChange={(e) => updateContent("toLabel", e.target.value)} />
            </div>
          </div>
          {cityImagesEditor}
        </div>
      );

    case "breadcrumb":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Home Label</Label>
            <Input value={(c.homeLabel as string) || ""} onChange={(e) => updateContent("homeLabel", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Locations Label</Label>
            <Input value={(c.rootLabel as string) || ""} onChange={(e) => updateContent("rootLabel", e.target.value)} />
          </div>
        </div>
      );

    case "dubaiHero":
    case "cityHero":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Badge Text</Label>
            <Input
              value={(c.badge as string) || ""}
              onChange={(e) => updateContent("badge", e.target.value)}
              placeholder="CHAUFFEUR SERVICE IN DUBAI"
            />
          </div>
          <div className="space-y-2">
            <Label>Title (City Name)</Label>
            <Input
              value={(c.title as string) || ""}
              onChange={(e) => updateContent("title", e.target.value)}
              placeholder="Dubai"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <WysiwygEditor
              value={(c.description as string) || ""}
              onChange={(v) => updateContent("description", v)}
              placeholder="City hero description..."
            />
          </div>
          <div className="space-y-2">
            <Label>Background Image</Label>
            <MediaInput
              value={((section.appearance as Record<string, unknown>)?.background as string) || (c.backgroundImage as string) || ""}
              onChange={(url) => {
                updateContent("backgroundImage", url);
                onUpdate({
                  appearance: {
                    ...section.appearance,
                    background: url,
                  },
                });
              }}
              accept="image"
              placeholder="/hero/B4.jpg.jpeg or /hero/city-riyadh.jpg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Book Now Button Label</Label>
              <Input
                value={(c.bookNowLabel as string) || ""}
                onChange={(e) => updateContent("bookNowLabel", e.target.value)}
                placeholder="BOOK NOW"
              />
            </div>
            <div className="space-y-2">
              <Label>View Fleet Button Label</Label>
              <Input
                value={(c.viewFleetLabel as string) || ""}
                onChange={(e) => updateContent("viewFleetLabel", e.target.value)}
                placeholder="VIEW THE FLEET"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Default Pick Up (Booking Bar)</Label>
              <Input
                value={(c.pickupDefault as string) || ""}
                onChange={(e) => updateContent("pickupDefault", e.target.value)}
                placeholder="Dubai International (DXB)"
              />
            </div>
            <div className="space-y-2">
              <Label>Default Drop Off (Booking Bar)</Label>
              <Input
                value={(c.dropoffDefault as string) || ""}
                onChange={(e) => updateContent("dropoffDefault", e.target.value)}
                placeholder="DIFC, Gate Avenue"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Skyline Illustration</Label>
            <Select
              value={(c.skyline as string) || "auto"}
              onValueChange={(v) => updateContent("skyline", v)}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto (Detect by City)</SelectItem>
                <SelectItem value="dubai">Dubai Skyline</SelectItem>
                <SelectItem value="riyadh">Riyadh Skyline</SelectItem>
                <SelectItem value="none">None (Hide Skyline)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );

    case "dubaiFleet":
    case "cityFleet":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Eyebrow</Label>
            <Input
              value={(c.eyebrow as string) || ""}
              onChange={(e) => updateContent("eyebrow", e.target.value)}
              placeholder="THE DUBAI FLEET"
            />
          </div>
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input
              value={(c.heading as string) || ""}
              onChange={(e) => updateContent("heading", e.target.value)}
              placeholder="Choose your class"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <WysiwygEditor
              value={(c.description as string) || ""}
              onChange={(v) => updateContent("description", v)}
              placeholder="Every vehicle is late model, black and detailed..."
            />
          </div>
        </div>
      );

    case "dubaiJourneys":
    case "cityJourneys":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Eyebrow</Label>
            <Input
              value={(c.eyebrow as string) || ""}
              onChange={(e) => updateContent("eyebrow", e.target.value)}
              placeholder="POPULAR JOURNEYS"
            />
          </div>
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input
              value={(c.heading as string) || ""}
              onChange={(e) => updateContent("heading", e.target.value)}
              placeholder="Across Dubai and beyond"
            />
          </div>
        </div>
      );

    case "dubaiServices":
    case "cityServices":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Eyebrow</Label>
            <Input
              value={(c.eyebrow as string) || ""}
              onChange={(e) => updateContent("eyebrow", e.target.value)}
              placeholder="SERVICES IN DUBAI"
            />
          </div>
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input
              value={(c.heading as string) || ""}
              onChange={(e) => updateContent("heading", e.target.value)}
              placeholder="One partner for every movement"
            />
          </div>
        </div>
      );

    case "dubaiCta":
    case "cityCta":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input
              value={(c.heading as string) || ""}
              onChange={(e) => updateContent("heading", e.target.value)}
              placeholder="Your chauffeur is ready in Dubai."
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              value={(c.description as string) || ""}
              onChange={(e) => updateContent("description", e.target.value)}
              placeholder="Available around the clock. Reply within minutes at hello@ab.limo"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Button Label</Label>
              <Input
                value={(c.buttonLabel as string) || ""}
                onChange={(e) => updateContent("buttonLabel", e.target.value)}
                placeholder="BOOK NOW"
              />
            </div>
            <div className="space-y-2">
              <Label>Button Target URL</Label>
              <Input
                value={(c.buttonHref as string) || ""}
                onChange={(e) => updateContent("buttonHref", e.target.value)}
                placeholder="/contact"
              />
            </div>
          </div>
        </div>
      );

    default:
      return <p className="text-sm text-muted-foreground">No content fields for this section type.</p>;
  }
}

// ── Items Tab ────────────────────────────────────────────────────

function ItemsTab({ section, onUpdate, faqContextItems, structureLocked = false }: SectionEditorPanelProps) {
  const canManage = useCanManageStructure();
  const c = section.content as Record<string, unknown>;
  const items = (section.items || []) as Record<string, unknown>[];
  const isContextFaq =
    section.type === "faq" &&
    ((section.settings as Record<string, unknown>)?.source as string) === "context.faqs";

  const updateContentItem = (key: string, value: unknown) => {
    onUpdate({ content: { ...section.content, [key]: value } });
  };

  const addItem = () => {
    const id = `itm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    let newItem: Record<string, unknown> = { id };
    const sType = section.type as string;

    if (sType === "serviceCards") {
      newItem = { ...newItem, icon: "", title: "", description: "", actions: [] };
    } else if (sType === "fleetGrid") {
      newItem = { ...newItem, badge: "", image: "", category: "", name: "", capacity: "", bags: "" };
    } else if (sType === "faq" || sType === "mediaContent" || sType === "textMediaGrid") {
      const existingItems = (c.items || []) as Array<Record<string, unknown>>;
      if (sType === "faq") {
        updateContentItem("items", [...existingItems, { id, question: "", answer: "" }]);
      } else {
        updateContentItem("items", [...existingItems, { id, icon: "", heading: "", description: "" }]);
      }
      return;
    } else if (sType === "hero" || sType === "ctaBanner") {
      newItem = { label: "", href: "", style: "primary", icon: "" };
    } else if (sType === "routeStats") {
      newItem = { ...newItem, icon: "Gauge", label: "", value: "" };
    } else if (sType === "dubaiJourneys" || sType === "cityJourneys") {
      newItem = { ...newItem, tag: "AIRPORT TRANSFER", title: "", price: "From [PRICE]", pickup: "", dropoff: "" };
    } else if (sType === "dubaiServices" || sType === "cityServices") {
      newItem = { ...newItem, title: "", href: "/services" };
    } else if (sType === "dubaiFleet" || sType === "cityFleet") {
      newItem = { ...newItem, name: "", model: "", specs: "", description: "", image: "", fleetSlug: "" };
    }

    onUpdate({ items: [...items, newItem] });
  };

  const removeItem = (index: number) => {
    if (section.type === "faq" || section.type === "mediaContent" || section.type === "textMediaGrid") {
      const existingItems = (c.items || []) as Array<Record<string, unknown>>;
      updateContentItem("items", existingItems.filter((_, i) => i !== index));
    } else {
      onUpdate({ items: items.filter((_, i) => i !== index) });
    }
  };

  const updateItem = (index: number, updates: Record<string, unknown>) => {
    if (section.type === "faq" || section.type === "mediaContent" || section.type === "textMediaGrid") {
      const existingItems = (c.items || []) as Array<Record<string, unknown>>;
      const updated = [...existingItems];
      updated[index] = { ...updated[index], ...updates };
      updateContentItem("items", updated);
    } else {
      const updated = [...items];
      updated[index] = { ...updated[index], ...updates };
      onUpdate({ items: updated });
    }
  };

  const currentItems = (section.type === "faq" || section.type === "mediaContent" || section.type === "textMediaGrid")
    ? ((c.items || []) as Array<Record<string, unknown>>)
    : items;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          {(section.type as string) === "faq" ? "FAQ Questions" :
           (section.type as string) === "serviceCards" ? "Service Cards" :
           (section.type as string) === "fleetGrid" ? "Fleet Vehicles" :
           (section.type as string) === "hero" ? "CTA Buttons" :
           (section.type as string) === "ctaBanner" ? "CTA Buttons" :
           (section.type as string) === "dubaiJourneys" || (section.type as string) === "cityJourneys" ? "Popular Journeys" :
           (section.type as string) === "dubaiServices" || (section.type as string) === "cityServices" ? "Service Links" :
           (section.type as string) === "dubaiFleet" || (section.type as string) === "cityFleet" ? "Vehicle Classes" :
           (section.type as string) === "routeStats" ? "Route Stats" :
           (section.type as string) === "mediaContent" || (section.type as string) === "textMediaGrid" ? "Feature Items" :
           "Items"}
        </Label>
        {canManage && !structureLocked && (
          <Button type="button" size="sm" variant="outline" onClick={addItem}>
            <Plus className="h-3 w-3 mr-1" /> Add
          </Button>
        )}
      </div>

      {/* Context-bound FAQ sections: preview the live entity FAQs */}
      {isContextFaq && (
        <div className="rounded-lg border bg-muted/40 p-3 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            Live FAQs are shown on the page from the Country/City FAQs on the
            Locations editor — edit them there.
            {faqContextItems && faqContextItems.length > 0
              ? ` Currently ${faqContextItems.length}.`
              : " None saved yet."}
          </p>
          {faqContextItems && faqContextItems.length > 0 && (
            <ul className="space-y-1">
              {faqContextItems.slice(0, 6).map((f, i) => (
                <li key={i} className="text-xs text-muted-foreground truncate">
                  • {f.q}
                </li>
              ))}
              {faqContextItems.length > 6 && (
                <li className="text-xs text-muted-foreground">
                  …and {faqContextItems.length - 6} more
                </li>
              )}
            </ul>
          )}
        </div>
      )}

      {currentItems.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4 border-2 border-dashed rounded-lg">
          {isContextFaq
            ? "No extra FAQs — anything you add here appears after the live FAQs listed above."
            : "No items yet. Click Add to create one."}
        </p>
      )}

      <div className="space-y-3">
        {currentItems.map((item, i) => (
          <ItemEditor
            key={(item.id as string) || i}
            sectionType={section.type}
            item={item}
            index={i}
            structureLocked={structureLocked}
            onUpdate={(updates) => updateItem(i, updates)}
            onRemove={() => removeItem(i)}
          />
        ))}
      </div>

      {/* FAQ CTA Buttons (stored in section.items) */}
      {section.type === "faq" && (
        <div className="border-t pt-4 mt-4">
          <Label className="text-sm font-medium mb-3 block">CTA Bar Buttons</Label>
          <p className="text-xs text-muted-foreground mb-2">Buttons shown in the “Still have questions?” bar below FAQ items.</p>
          {((section.items || []) as Array<Record<string, unknown>>).map((item, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <Input
                value={(item.label as string) || ""}
                onChange={(e) => {
                  const items = [...((section.items || []) as Array<Record<string, unknown>>)];
                  items[i] = { ...items[i], label: e.target.value };
                  onUpdate({ items });
                }}
                placeholder="Button label"
                className="flex-1"
              />
              <Input
                value={(item.href as string) || ""}
                onChange={(e) => {
                  const items = [...((section.items || []) as Array<Record<string, unknown>>)];
                  items[i] = { ...items[i], href: e.target.value };
                  onUpdate({ items });
                }}
                placeholder="URL"
                className="flex-1"
              />
              <Select
                value={(item.style as string) || "primary"}
                onValueChange={(v) => {
                  const items = [...((section.items || []) as Array<Record<string, unknown>>)];
                  items[i] = { ...items[i], style: v };
                  onUpdate({ items });
                }}
              >
                <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary (Gold)</SelectItem>
                  <SelectItem value="secondary">Secondary (Border)</SelectItem>
                  <SelectItem value="outline">Outline (Gray)</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={(item.icon as string) || ""}
                onValueChange={(v) => {
                  const items = [...((section.items || []) as Array<Record<string, unknown>>)];
                  items[i] = { ...items[i], icon: v };
                  onUpdate({ items });
                }}
              >
                <SelectTrigger className="w-32"><SelectValue placeholder="No icon" /></SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {canManage && !structureLocked && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => {
                    const items = [...((section.items || []) as Array<Record<string, unknown>>)];
                    items.splice(i, 1);
                    onUpdate({ items });
                  }}
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              )}
            </div>
          ))}
          {canManage && !structureLocked && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                const items = [...((section.items || []) as Array<Record<string, unknown>>), { label: "", href: "", style: "primary", icon: "" }];
                onUpdate({ items });
              }}
            >
              <Plus className="h-3 w-3 mr-1" /> Add CTA Button
            </Button>
          )}
        </div>
      )}

      {/* Media Grid Tiles (textMediaGrid) */}
      {section.type === "textMediaGrid" && (
        <div className="border-t pt-4 mt-4">
          <Label className="text-sm font-medium mb-1 block">Media Grid Tiles</Label>
          <p className="text-xs text-muted-foreground mb-3">
            Mosaic tiles shown beside the text. Mix images and stat cards across the left/right columns.
          </p>
          {((c.media || []) as Array<Record<string, unknown>>).map((tile, ti) => {
            const updateTile = (updates: Record<string, unknown>) => {
              const tiles = [...((c.media || []) as Array<Record<string, unknown>>)];
              tiles[ti] = { ...tiles[ti], ...updates };
              updateContentItem("media", tiles);
            };
            const isImage = (tile.type as string) !== "stat";
            return (
              <div key={(tile.id as string) || ti} className="border rounded-lg p-3 mb-3 space-y-2 bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Tile {ti + 1}</span>
                  {canManage && !structureLocked && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() =>
                        updateContentItem(
                          "media",
                          ((c.media || []) as Array<Record<string, unknown>>).filter((_, i) => i !== ti)
                        )
                      }
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Select value={(tile.type as string) || "image"} onValueChange={(v) => updateTile({ type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="stat">Stat Card</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={(tile.column as string) || "left"} onValueChange={(v) => updateTile({ column: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left Col</SelectItem>
                      <SelectItem value="right">Right Col</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={(tile.size as string) || "tall"} onValueChange={(v) => updateTile({ size: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tall">Tall</SelectItem>
                      <SelectItem value="short">Short</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {isImage ? (
                  <>
                    <MediaInput
                      value={(tile.image as string) || ""}
                      onChange={(url) => updateTile({ image: url })}
                      accept="image"
                      placeholder="Image URL"
                    />
                    {(tile.image as string) && (
                      <img
                        src={tile.image as string}
                        alt={(tile.imageAlt as string) || ""}
                        className="h-20 w-full rounded object-cover border border-gray-700"
                      />
                    )}
                    <Input
                      value={(tile.imageAlt as string) || ""}
                      onChange={(e) => updateTile({ imageAlt: e.target.value })}
                      placeholder="Alt text"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Select value={(tile.overlay as string) || "none"} onValueChange={(v) => updateTile({ overlay: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Overlay</SelectItem>
                          <SelectItem value="blue">Blue Tint</SelectItem>
                          <SelectItem value="gradient">Bottom Gradient</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex items-center gap-2">
                        <Switch checked={!!tile.contain} onCheckedChange={(v) => updateTile({ contain: v })} />
                        <Label className="text-xs">Contain on dark bg</Label>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={(tile.statValue as string) || ""}
                      onChange={(e) => updateTile({ statValue: e.target.value })}
                      placeholder="100%"
                    />
                    <Input
                      value={(tile.statLabel as string) || ""}
                      onChange={(e) => updateTile({ statLabel: e.target.value })}
                      placeholder="TGA Compliant"
                    />
                  </div>
                )}
              </div>
            );
          })}
          {canManage && !structureLocked && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                const id = `itm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                updateContentItem("media", [
                  ...((c.media || []) as Array<Record<string, unknown>>),
                  { id, type: "image", column: "right", size: "tall", image: "", imageAlt: "", overlay: "none" },
                ]);
              }}
            >
              <Plus className="h-3 w-3 mr-1" /> Add Media Tile
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Item Editor ──────────────────────────────────────────────────

interface ItemEditorProps {
  sectionType: string;
  item: Record<string, unknown>;
  index: number;
  structureLocked?: boolean;
  onUpdate: (updates: Record<string, unknown>) => void;
  onRemove: () => void;
}

function ItemEditor({ sectionType, item, index, structureLocked = false, onUpdate, onRemove }: ItemEditorProps) {
  const [expanded, setExpanded] = React.useState(false);

  const getItemLabel = () => {
    if (sectionType === "faq") return (item.question as string) || `FAQ ${index + 1}`;
    if (sectionType === "serviceCards") return (item.title as string) || `Card ${index + 1}`;
    if (sectionType === "fleetGrid") return (item.name as string) || `Vehicle ${index + 1}`;
    if (sectionType === "hero" || sectionType === "ctaBanner") return (item.label as string) || `Button ${index + 1}`;
    if (sectionType === "routeStats") return (item.label as string) || `Stat ${index + 1}`;
    if (sectionType === "dubaiJourneys" || sectionType === "cityJourneys") return (item.title as string) || `Journey ${index + 1}`;
    if (sectionType === "dubaiServices" || sectionType === "cityServices") return (item.title as string) || `Service ${index + 1}`;
    if (sectionType === "dubaiFleet" || sectionType === "cityFleet") return (item.name as string) || `Vehicle Class ${index + 1}`;
    return (item.heading as string) || `Item ${index + 1}`;
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-muted/30">
      <div className="flex items-center justify-between p-3">
        <button type="button" onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-left flex-1">
          <span className="text-xs text-muted-foreground w-6">{index + 1}.</span>
          <span className="text-sm font-medium truncate">{getItemLabel()}</span>
        </button>
        <div className="flex items-center gap-1">
          {!structureLocked && (
            <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onRemove}>
              <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
          )}
          {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </div>
      </div>

      {expanded && (
        <div className="px-3 pb-3 border-t pt-3 space-y-3">
          {sectionType === "faq" && (
            <>
              <div className="space-y-2">
                <Label>Question</Label>
                <Input value={(item.question as string) || ""} onChange={(e) => onUpdate({ question: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Answer</Label>
                <WysiwygEditor value={(item.answer as string) || ""} onChange={(v) => onUpdate({ answer: v })} />
              </div>
            </>
          )}

          {sectionType === "serviceCards" && (
            <>
              <div className="space-y-2">
                <Label>Icon</Label>
                <Select value={(item.icon as string) || ""} onValueChange={(v) => onUpdate({ icon: v })}>
                  <SelectTrigger><SelectValue placeholder="Select icon" /></SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={(item.title as string) || ""} onChange={(e) => onUpdate({ title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <WysiwygEditor value={(item.description as string) || ""} onChange={(v) => onUpdate({ description: v })} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={!!item.wide} onCheckedChange={(v) => onUpdate({ wide: v })} />
                <Label className="text-xs">Wide card (spans 2 columns)</Label>
              </div>
              <div className="space-y-2">
                <Label>CTA Buttons</Label>
                {((item.actions || []) as Array<Record<string, unknown>>).map((action, ai) => (
                  <div key={ai} className="flex gap-2 items-center">
                    <Input
                      value={(action.label as string) || ""}
                      onChange={(e) => {
                        const actions = [...((item.actions || []) as Array<Record<string, unknown>>)];
                        actions[ai] = { ...actions[ai], label: e.target.value };
                        onUpdate({ actions });
                      }}
                      placeholder="Label"
                      className="flex-1"
                    />
                    <Input
                      value={(action.href as string) || ""}
                      onChange={(e) => {
                        const actions = [...((item.actions || []) as Array<Record<string, unknown>>)];
                        actions[ai] = { ...actions[ai], href: e.target.value };
                        onUpdate({ actions });
                      }}
                      placeholder="URL"
                      className="flex-1"
                    />
                    <Select
                      value={(action.style as string) || "accent"}
                      onValueChange={(v) => {
                        const actions = [...((item.actions || []) as Array<Record<string, unknown>>)];
                        actions[ai] = { ...actions[ai], style: v };
                        onUpdate({ actions });
                      }}
                    >
                      <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accent">Accent</SelectItem>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="outline">Outline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const actions = [...((item.actions || []) as Array<Record<string, unknown>>), { label: "", href: "", style: "accent" }];
                    onUpdate({ actions });
                  }}
                >
                  <Plus className="h-3 w-3 mr-1" /> Add CTA
                </Button>
              </div>
            </>
          )}

          {sectionType === "fleetGrid" && (
            <>
              <div className="space-y-2">
                <MediaInput
                  label="Vehicle Image"
                  value={(item.image as string) || ""}
                  onChange={(url) => onUpdate({ image: url })}
                  accept="image"
                />
                {(item.image as string) ? (
                  <div className="mt-2 relative h-32 rounded-md overflow-hidden border border-gray-700 bg-black">
                    <img src={item.image as string} alt={item.name as string || "Vehicle preview"} className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="mt-2 relative h-32 rounded-md overflow-hidden border border-dashed border-gray-600 bg-black flex flex-col items-center justify-center">
                    <svg className="w-12 h-12 text-gray-600 mb-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                    </svg>
                    <span className="text-gray-500 text-[10px]">Paste image URL above</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Image Alt Text</Label>
                <Input value={(item.imageAlt as string) || ""} onChange={(e) => onUpdate({ imageAlt: e.target.value })} placeholder="Mercedes S-Class Black" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Badge</Label>
                  <Input value={(item.badge as string) || ""} onChange={(e) => onUpdate({ badge: e.target.value })} placeholder="Executive Mobility" />
                </div>
                <div className="space-y-2">
                  <Label>Badge Style</Label>
                  <Select value={(item.badgeStyle as string) || "default"} onValueChange={(v) => onUpdate({ badgeStyle: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="accent">Accent (Gold)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input value={(item.category as string) || ""} onChange={(e) => onUpdate({ category: e.target.value })} placeholder="Executive Sedan" />
                </div>
                <div className="space-y-2">
                  <Label>Vehicle Name</Label>
                  <Input value={(item.name as string) || ""} onChange={(e) => onUpdate({ name: e.target.value })} placeholder="Mercedes S-Class (Black)" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Capacity</Label>
                  <Input value={(item.capacity as string) || ""} onChange={(e) => onUpdate({ capacity: e.target.value })} placeholder="3 Pax" />
                </div>
                <div className="space-y-2">
                  <Label>Bags</Label>
                  <Input value={(item.bags as string) || ""} onChange={(e) => onUpdate({ bags: e.target.value })} placeholder="2 Bags" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Capacity Icon</Label>
                  <Select value={(item.capacityIcon as string) || "Users"} onValueChange={(v) => onUpdate({ capacityIcon: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ICON_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Bags Icon</Label>
                  <Select value={(item.bagsIcon as string) || "Briefcase"} onValueChange={(v) => onUpdate({ bagsIcon: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ICON_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Vehicle Actions</Label>
                {((item.actions || []) as Array<Record<string, unknown>>).map((action, ai) => (
                  <div key={ai} className="flex gap-2 items-center">
                    <Input
                      value={(action.label as string) || ""}
                      onChange={(e) => {
                        const actions = [...((item.actions || []) as Array<Record<string, unknown>>)];
                        actions[ai] = { ...actions[ai], label: e.target.value };
                        onUpdate({ actions });
                      }}
                      placeholder="Label"
                      className="flex-1"
                    />
                    <Input
                      value={(action.href as string) || ""}
                      onChange={(e) => {
                        const actions = [...((item.actions || []) as Array<Record<string, unknown>>)];
                        actions[ai] = { ...actions[ai], href: e.target.value };
                        onUpdate({ actions });
                      }}
                      placeholder="URL"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => {
                        const actions = [...((item.actions || []) as Array<Record<string, unknown>>)];
                        actions.splice(ai, 1);
                        onUpdate({ actions });
                      }}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const actions = [...((item.actions || []) as Array<Record<string, unknown>>), { label: "Request Allocation", href: "/contact" }];
                    onUpdate({ actions });
                  }}
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Action
                </Button>
              </div>
            </>
          )}

          {(sectionType === "hero" || sectionType === "ctaBanner") && (
            <>
              <div className="space-y-2">
                <Label>Button Label</Label>
                <Input value={(item.label as string) || ""} onChange={(e) => onUpdate({ label: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>URL</Label>
                <Input value={(item.href as string) || ""} onChange={(e) => onUpdate({ href: e.target.value })} placeholder="#section or /path" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Style</Label>
                  <Select value={(item.style as string) || "primary"} onValueChange={(v) => onUpdate({ style: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary (Gold)</SelectItem>
                      <SelectItem value="secondary">Secondary (Border)</SelectItem>
                      <SelectItem value="ghost">Ghost (Link)</SelectItem>
                      <SelectItem value="link">Underline Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Select value={(item.icon as string) || ""} onValueChange={(v) => onUpdate({ icon: v })}>
                    <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
                    <SelectContent>
                      {ICON_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Icon Position</Label>
                  <Select value={(item.iconPosition as string) || "left"} onValueChange={(v) => onUpdate({ iconPosition: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch checked={!!item.openInNewTab} onCheckedChange={(v) => onUpdate({ openInNewTab: v })} />
                  <Label className="text-xs">Open in new tab</Label>
                </div>
              </div>
            </>
          )}

          {(sectionType === "mediaContent" || sectionType === "textMediaGrid") && (
            <>
              <div className="space-y-2">
                <Label>Icon</Label>
                <Select value={(item.icon as string) || ""} onValueChange={(v) => onUpdate({ icon: v })}>
                  <SelectTrigger><SelectValue placeholder="Select icon" /></SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Heading</Label>
                <Input value={(item.heading as string) || ""} onChange={(e) => onUpdate({ heading: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <WysiwygEditor value={(item.description as string) || ""} onChange={(v) => onUpdate({ description: v })} />
              </div>
            </>
          )}

          {sectionType === "routeStats" && (
            <>
              <div className="space-y-2">
                <Label>Icon</Label>
                <Select value={(item.icon as string) || ""} onValueChange={(v) => onUpdate({ icon: v })}>
                  <SelectTrigger><SelectValue placeholder="Select icon" /></SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Label</Label>
                <Input value={(item.label as string) || ""} onChange={(e) => onUpdate({ label: e.target.value })} placeholder="Total Distance" />
              </div>
              <div className="space-y-2">
                <Label>Value</Label>
                <Input value={(item.value as string) || ""} onChange={(e) => onUpdate({ value: e.target.value })} placeholder="{distance}" />
                <p className="text-xs text-muted-foreground">Tokens like {"{distance}"} and {"{duration}"} fill from route data at render.</p>
              </div>
            </>
          )}

          {(sectionType === "dubaiJourneys" || sectionType === "cityJourneys") && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Tag / Category</Label>
                  <Input
                    value={(item.tag as string) || ""}
                    onChange={(e) => onUpdate({ tag: e.target.value })}
                    placeholder="AIRPORT TRANSFER or CITY"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Price Label</Label>
                  <Input
                    value={(item.price as string) || ""}
                    onChange={(e) => onUpdate({ price: e.target.value })}
                    placeholder="From AED 350 or From [SAR PRICE]"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Journey Route Title</Label>
                <Input
                  value={(item.title as string) || ""}
                  onChange={(e) => onUpdate({ title: e.target.value })}
                  placeholder="DXB to Downtown Dubai"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Pickup Location</Label>
                  <Input
                    value={(item.pickup as string) || ""}
                    onChange={(e) => onUpdate({ pickup: e.target.value })}
                    placeholder="Pickup location"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Dropoff Location</Label>
                  <Input
                    value={(item.dropoff as string) || ""}
                    onChange={(e) => onUpdate({ dropoff: e.target.value })}
                    placeholder="Dropoff location"
                  />
                </div>
              </div>
            </>
          )}

          {(sectionType === "dubaiServices" || sectionType === "cityServices") && (
            <>
              <div className="space-y-1">
                <Label className="text-xs">Service Title</Label>
                <Input
                  value={(item.title as string) || ""}
                  onChange={(e) => onUpdate({ title: e.target.value })}
                  placeholder="Executive and Corporate Mobility"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Target URL</Label>
                <Input
                  value={(item.href as string) || ""}
                  onChange={(e) => onUpdate({ href: e.target.value })}
                  placeholder="/services/corporate-transportation"
                />
              </div>
            </>
          )}

          {(sectionType === "dubaiFleet" || sectionType === "cityFleet") && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Class Name</Label>
                  <Input
                    value={(item.name as string) || ""}
                    onChange={(e) => onUpdate({ name: e.target.value })}
                    placeholder="Standard Sedan"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Car Model</Label>
                  <Input
                    value={(item.model as string) || ""}
                    onChange={(e) => onUpdate({ model: e.target.value })}
                    placeholder="Ford Taurus / BYD Seal 7"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Specs & Capacity</Label>
                <Input
                  value={(item.specs as string) || ""}
                  onChange={(e) => onUpdate({ specs: e.target.value })}
                  placeholder="Sedan · 3 guests · 2 bags"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Vehicle Description</Label>
                <Textarea
                  value={(item.description as string) || ""}
                  onChange={(e) => onUpdate({ description: e.target.value })}
                  placeholder="Describe the comfort, capacity, and ideal use of this vehicle."
                  rows={4}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Vehicle Image</Label>
                <MediaInput
                  value={(item.image as string) || ""}
                  onChange={(url) => onUpdate({ image: url })}
                  accept="image"
                  placeholder="/cars/sedans/FAURD TAURUS.png"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Fleet Slug</Label>
                <Input
                  value={(item.fleetSlug as string) || ""}
                  onChange={(e) => onUpdate({ fleetSlug: e.target.value })}
                  placeholder="ford-taurus"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ── Settings Tab ─────────────────────────────────────────────────

function SettingsTab({ section, scope = "service", onUpdate }: SectionEditorPanelProps) {
  const settings = section.settings as Record<string, unknown>;
  const config =
    scope === "service"
      ? SECTION_TYPES.find((s) => s.type === section.type)
      : (getDefinition(section.type) as unknown as SectionTypeConfig | undefined);

  const updateSettings = (key: string, value: unknown) => {
    onUpdate({ settings: { ...section.settings, [key]: value } });
  };

  return (
    <div className="space-y-4">
      {/* Variant */}
      {config && config.variants.length > 1 && (
        <div className="space-y-2">
          <Label>Layout Variant</Label>
          <Select value={section.variant ?? undefined} onValueChange={(v) => onUpdate({ variant: v ?? undefined })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {config.variants.map((v) => (
                <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Data source toggle (location scopes: inline vs live page data) */}
      {scope !== "service" && (section.type === "faq" || section.type === "serviceCards") && (
        <div className="space-y-2">
          <Label>Data Source</Label>
          <Select value={(settings.source as string) || "inline"} onValueChange={(v) => updateSettings("source", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="inline">Manual (edit items in the Items tab)</SelectItem>
              {section.type === "faq" && (
                <SelectItem value="context.faqs">Page FAQs (auto)</SelectItem>
              )}
              {section.type === "serviceCards" && (
                <SelectItem value="context.services">Location services (auto)</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Hero settings */}
      {section.type === "hero" && (
        <>
          <div className="space-y-2">
            <Label>Min Height</Label>
            <Select value={(settings.minHeight as string) || "85vh"} onValueChange={(v) => updateSettings("minHeight", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="50vh">50vh (Compact)</SelectItem>
                <SelectItem value="60vh">60vh (Short)</SelectItem>
                <SelectItem value="75vh">75vh (Medium)</SelectItem>
                <SelectItem value="85vh">85vh (Tall)</SelectItem>
                <SelectItem value="100vh">100vh (Full)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Content Position</Label>
            <Select value={(settings.contentPosition as string) || "left"} onValueChange={(v) => updateSettings("contentPosition", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Overlay Opacity</Label>
            <Select value={String(settings.overlayOpacity || 85)} onValueChange={(v) => updateSettings("overlayOpacity", Number(v))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50% (Light)</SelectItem>
                <SelectItem value="65">65%</SelectItem>
                <SelectItem value="75">75%</SelectItem>
                <SelectItem value="85">85% (Default)</SelectItem>
                <SelectItem value="95">95% (Heavy)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Button Layout</Label>
            <Select value={(settings.buttonLayout as string) || "row"} onValueChange={(v) => updateSettings("buttonLayout", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="row">Row (Side by side)</SelectItem>
                <SelectItem value="column">Column (Stacked)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Service Cards settings */}
      {section.type === "serviceCards" && (
        <>
          <div className="space-y-2">
            <Label>Columns</Label>
            <Select value={(settings.columns as string) || "3"} onValueChange={(v) => updateSettings("columns", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 Columns</SelectItem>
                <SelectItem value="3">3 Columns</SelectItem>
                <SelectItem value="4">4 Columns</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={settings.showHeader !== false}
              onCheckedChange={(v) => updateSettings("showHeader", v)}
            />
            <Label>Show section header</Label>
          </div>
        </>
      )}

      {/* Media Content settings */}
      {section.type === "mediaContent" && (
        <>
          <div className="space-y-2">
            <Label>Media Position</Label>
            <Select value={(settings.mediaPosition as string) || "right"} onValueChange={(v) => updateSettings("mediaPosition", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Container Width</Label>
            <Select value={(settings.containerWidth as string) || "default"} onValueChange={(v) => updateSettings("containerWidth", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="narrow">Narrow</SelectItem>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="wide">Wide</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Text Media Grid settings */}
      {section.type === "textMediaGrid" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Media Position</Label>
            <Select value={(settings.mediaPosition as string) || "right"} onValueChange={(v) => updateSettings("mediaPosition", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="right">Right (Content Left, Media Right)</SelectItem>
                <SelectItem value="left">Left (Media Left, Content Right)</SelectItem>
                <SelectItem value="bottom">Bottom (Horizontal Row Below)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Media Display Mode</Label>
            <Select value={(settings.mediaLayout as string) || "mosaic"} onValueChange={(v) => updateSettings("mediaLayout", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mosaic">Mosaic Grid (2-Col Asymmetric)</SelectItem>
                <SelectItem value="row">Horizontal Row / Flex</SelectItem>
                <SelectItem value="single">Single Featured Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Fleet Grid settings */}
      {section.type === "fleetGrid" && (
        <div className="space-y-2">
          <Label>Columns</Label>
          <Select value={(settings.columns as string) || "4"} onValueChange={(v) => updateSettings("columns", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 Columns</SelectItem>
              <SelectItem value="3">3 Columns</SelectItem>
              <SelectItem value="4">4 Columns</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Contact Form settings */}
      {section.type === "contactForm" && (
        <div className="space-y-2">
          <Label>Form Layout</Label>
          <Select value={(settings.layout as string) || "centered"} onValueChange={(v) => updateSettings("layout", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="centered">Centered</SelectItem>
              <SelectItem value="full">Full Width</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* FAQ settings */}
      {section.type === "faq" && (
        <div className="space-y-2">
          <Label>FAQ Style</Label>
          <Select value={(settings.variant as string) || "default"} onValueChange={(v) => updateSettings("variant", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Accordion</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* CTA Banner settings */}
      {section.type === "ctaBanner" && (
        <div className="space-y-2">
          <Label>Banner Layout</Label>
          <Select value={(settings.layout as string) || "centered"} onValueChange={(v) => updateSettings("layout", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="centered">Centered</SelectItem>
              <SelectItem value="split">Split (Left/Right)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

// ── Appearance Tab ───────────────────────────────────────────────

function AppearanceTab({ section, onUpdate }: SectionEditorPanelProps) {
  const appearance = section.appearance as Record<string, unknown>;

  const updateAppearance = (key: string, value: unknown) => {
    onUpdate({ appearance: { ...section.appearance, [key]: value } });
  };

  return (
    <div className="space-y-4">
      {/* Theme */}
      <div className="space-y-2">
        <Label>Theme</Label>
        <Select value={(appearance.theme as string) || "dark"} onValueChange={(v) => updateAppearance("theme", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="dark">Dark (abDarkGray)</SelectItem>
            <SelectItem value="darker">Darker (abBlack)</SelectItem>
            {section.type === "mediaContent" && (
              <SelectItem value="light">Light (White)</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Vertical Padding */}
      <div className="space-y-2">
        <Label>Section Padding</Label>
        <Select value={(appearance.padding as string) || "lg"} onValueChange={(v) => updateAppearance("padding", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None (Hero)</SelectItem>
            <SelectItem value="sm">Small (py-12)</SelectItem>
            <SelectItem value="md">Medium (py-16)</SelectItem>
            <SelectItem value="lg">Large (py-24)</SelectItem>
            <SelectItem value="xl">Extra Large (py-32)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Border Top */}
      <div className="flex items-center gap-2">
        <Switch
          checked={appearance.border === true}
          onCheckedChange={(v) => updateAppearance("border", v)}
        />
        <Label>Show top border divider</Label>
      </div>

      {/* Text Alignment */}
      <div className="space-y-2">
        <Label>Header Text Alignment</Label>
        <Select value={(appearance.textAlign as string) || "left"} onValueChange={(v) => updateAppearance("textAlign", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Hero-specific */}
      {section.type === "hero" && (
        <>
          <div className="space-y-2">
            <MediaInput
              label="Background Image"
              value={(appearance.background as string) || ""}
              onChange={(url) => updateAppearance("background", url)}
              accept="image"
            />
            {(appearance.background as string) && (
              <img
                src={appearance.background as string}
                alt={(appearance.backgroundAlt as string) || "Background preview"}
                className="mt-2 h-32 w-full rounded-md object-cover"
              />
            )}
          </div>
          <div className="space-y-2">
            <Label>Background Image Alt Text</Label>
            <Input
              value={(appearance.backgroundAlt as string) || ""}
              onChange={(e) => updateAppearance("backgroundAlt", e.target.value)}
              placeholder="Describe the background image"
            />
          </div>
          <div className="space-y-2">
            <Label>Overlay Gradient Style</Label>
            <Select value={(appearance.overlayGradient as string) || "default"} onValueChange={(v) => updateAppearance("overlayGradient", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default (Left→Right dark fade)</SelectItem>
                <SelectItem value="left-heavy">Left Heavy (Darkest left)</SelectItem>
                <SelectItem value="bottom-heavy">Bottom Heavy (Bottom-to-top)</SelectItem>
                <SelectItem value="center-heavy">Center Heavy (Dark vignette)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Media Content / Text Media Grid-specific */}
      {(section.type === "mediaContent" || section.type === "textMediaGrid") && (
        <div className="flex items-center gap-2">
          <Switch
            checked={appearance.pattern === true}
            onCheckedChange={(v) => updateAppearance("pattern", v)}
          />
          <Label>Show dot pattern background</Label>
        </div>
      )}

      {/* Background image for non-hero sections */}
      {section.type !== "hero" && (
        <div className="space-y-2">
          <MediaInput
            label="Section Background Image (optional backdrop)"
            value={(appearance.background as string) || ""}
            onChange={(url) => updateAppearance("background", url)}
            accept="image"
          />
          {section.type === "textMediaGrid" && (
            <p className="text-xs text-muted-foreground">
              Note: To add the images and stat cards that appear alongside or below your text, go to the <strong>Content</strong> tab → <strong>Media Layout & Position</strong>.
            </p>
          )}
          {(appearance.background as string) && (
            <img
              src={appearance.background as string}
              alt={(appearance.backgroundAlt as string) || "Background preview"}
              className="mt-2 h-32 w-full rounded-md object-cover"
            />
          )}
          <Label>Background Image Alt Text</Label>
          <Input
            value={(appearance.backgroundAlt as string) || ""}
            onChange={(e) => updateAppearance("backgroundAlt", e.target.value)}
            placeholder="Describe the background image"
          />
        </div>
      )}
    </div>
  );
}
