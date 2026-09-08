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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Trash2,
  GripVertical,
  Copy,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Type,
  Heading1,
  Tag,
  Tags,
  MousePointerClick,
} from "lucide-react";
import type { TextImageSectionType, TextImageElementType, CardsSectionType, CardItemType, CardCtaType } from "@/lib/validations/location";

type SectionUnion = TextImageSectionType | CardsSectionType;

interface SectionEditorProps {
  sections: SectionUnion[];
  onChange: (sections: SectionUnion[]) => void;
}

function generateId(): string {
  return `sec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateElementId(): string {
  return `elm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function createNewSection(direction: "image_left" | "image_right" = "image_left"): TextImageSectionType {
  return {
    id: generateId(),
    type: "text_image",
    direction,
    image: {
      url: "", alt: "", title: "", caption: "", objectFit: "cover",
      objectPosition: "center", aspectRatio: "", borderRadius: "",
      width: "", height: "", maxWidth: "", link: "",
      overlay: false, overlayOpacity: "0.5",
    },
    elements: [],
    layout: { containerWidth: "", contentWidth: "", imageWidth: "", gap: "", alignment: "", verticalAlignment: "" },
    spacing: { padding: "", margin: "" },
    background: { color: "", gradient: "", image: "" },
    responsive: {
      mobile: { direction: "image_left", stack: true },
      tablet: { direction: "image_left", stack: false },
    },
    visibility: { desktop: true, tablet: true, mobile: true },
  };
}

function createNewCardsSection(): CardsSectionType {
  return {
    id: generateId(),
    type: "cards",
    title: "",
    subtitle: "",
    columns: "3",
    cards: [],
    layout: { containerWidth: "", contentWidth: "", gap: "" },
    spacing: { padding: "", margin: "" },
    background: { color: "", gradient: "" },
    visibility: { desktop: true, tablet: true, mobile: true },
  };
}

function createNewCard(): CardItemType {
  return {
    id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    icon: "",
    iconColor: "",
    title: "",
    description: "",
    ctas: [],
  };
}

function createNewCta(): CardCtaType {
  return { label: "", url: "", icon: "" };
}

function createNewElement(type: TextImageElementType["type"]): TextImageElementType {
  return {
    id: generateElementId(),
    type,
    content: "",
    headingLevel: "h2",
    url: "",
    target: "_self",
    icon: { library: "lucide", name: "", position: "right" },
    visible: true,
    style: {
      typography: { fontFamily: "", fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textTransform: "" },
      colors: { text: "", background: "" },
      spacing: {
        marginTop: "", marginBottom: "", marginLeft: "", marginRight: "",
        paddingTop: "", paddingBottom: "", paddingLeft: "", paddingRight: "",
      },
      borders: { border: "", borderRadius: "" },
    },
  };
}

const defaultStyleValues = {
  typography: { fontFamily: "", fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textTransform: "" },
  colors: { text: "", background: "" },
  spacing: {
    marginTop: "", marginBottom: "", marginLeft: "", marginRight: "",
    paddingTop: "", paddingBottom: "", paddingLeft: "", paddingRight: "",
  },
  borders: { border: "", borderRadius: "" },
};

export function SectionEditor({ sections, onChange }: SectionEditorProps) {
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({});

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addSection = (direction: "image_left" | "image_right" = "image_left") => {
    const newSection = createNewSection(direction);
    onChange([...sections, newSection]);
    setExpandedSections((prev) => ({ ...prev, [newSection.id]: true }));
  };

  const addCardsSection = () => {
    const newSection = createNewCardsSection();
    onChange([...sections, newSection]);
    setExpandedSections((prev) => ({ ...prev, [newSection.id]: true }));
  };

  const removeSection = (sectionId: string) => {
    onChange(sections.filter((s) => s.id !== sectionId));
  };

  const duplicateSection = (section: SectionUnion) => {
    const clone = JSON.parse(JSON.stringify(section));
    clone.id = generateId();
    if (clone.type === "text_image") {
      clone.elements = clone.elements.map((el: any) => ({ ...el, id: generateElementId() }));
    }
    if (clone.type === "cards") {
      clone.cards = clone.cards.map((c: any) => ({
        ...c,
        id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }));
    }
    onChange([...sections, clone]);
    setExpandedSections((prev) => ({ ...prev, [clone.id]: true }));
  };

  const updateSection = (sectionId: string, updates: Partial<SectionUnion>) => {
    onChange(sections.map((s) => (s.id === sectionId ? { ...s, ...updates } : s)) as SectionUnion[]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    onChange(arrayMove(sections, oldIndex, newIndex));
  };

  const getSectionLabel = (section: SectionUnion) => {
    if (section.type === "cards") return section.title || "Cards Section";
    const heading = (section as TextImageSectionType).elements?.find((e) => e.type === "heading");
    return heading?.content || "Text + Image";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Content Sections</h3>
        <div className="flex gap-2">
          <Button type="button" size="sm" variant="outline" onClick={() => addSection("image_left")}>
            <Plus className="h-4 w-4 mr-1" /> Image Left
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => addSection("image_right")}>
            <Plus className="h-4 w-4 mr-1" /> Image Right
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={addCardsSection}>
            <Plus className="h-4 w-4 mr-1" /> Cards
          </Button>
        </div>
      </div>

      {sections.length === 0 && (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">No sections yet. Add a section to get started.</p>
          <div className="flex gap-2 justify-center">
            <Button type="button" variant="outline" onClick={() => addSection("image_left")}>
              + Image Left Section
            </Button>
            <Button type="button" variant="outline" onClick={() => addSection("image_right")}>
              + Image Right Section
            </Button>
          </div>
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {sections.map((section) => (
              <SortableSectionItem
                key={section.id}
                section={section}
                isExpanded={expandedSections[section.id] || false}
                onToggle={() => setExpandedSections((prev) => ({ ...prev, [section.id]: !prev[section.id] }))}
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

interface SortableSectionItemProps {
  section: SectionUnion;
  isExpanded: boolean;
  onToggle: () => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onUpdate: (updates: Partial<SectionUnion>) => void;
}

function SortableSectionItem({ section, isExpanded, onToggle, onRemove, onDuplicate, onUpdate }: SortableSectionItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 0,
  };

  const sectionLabel = section.type === "cards"
    ? (section.title || "Cards Section")
    : (section.elements?.find((e) => e.type === "heading" && e.visible)?.content || "Text + Image");

  return (
    <div ref={setNodeRef} style={style} className="border rounded-lg overflow-hidden bg-card">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-muted/50"
      >
        <div className="flex items-center gap-3">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <span className="text-sm font-medium">
              {sectionLabel}
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              ({section.type === "cards" ? `${section.cards?.length || 0} cards` : `${section.direction === "image_left" ? "Image Left" : "Image Right"} · ${(section as TextImageSectionType).elements?.length || 0} elements`})
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onDuplicate}>
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onRemove}>
            <Trash2 className="h-3.5 w-3.5 text-destructive" />
          </Button>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {isExpanded && (
        section.type === "cards" ? (
          <CardsSectionPanel section={section} onUpdate={onUpdate as (u: any) => void} />
        ) : (
          <SectionEditorPanel section={section as TextImageSectionType} onUpdate={onUpdate as (u: any) => void} />
        )
      )}
    </div>
  );
}

interface SectionEditorPanelProps {
  section: TextImageSectionType;
  onUpdate: (updates: Partial<TextImageSectionType>) => void;
}

function SectionEditorPanel({ section, onUpdate }: SectionEditorPanelProps) {
  return (
    <div className="px-4 pb-4 space-y-4 border-t pt-4">
      <Tabs defaultValue="layout">
        <TabsList className="w-full">
          <TabsTrigger value="layout" className="flex-1">Layout</TabsTrigger>
          <TabsTrigger value="image" className="flex-1">Image</TabsTrigger>
          <TabsTrigger value="elements" className="flex-1">Elements</TabsTrigger>
          <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
        </TabsList>

        <TabsContent value="layout" className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layout Direction</Label>
              <Select
                value={section.direction}
                onValueChange={(v) => onUpdate({ direction: v as "image_left" | "image_right" })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="image_left">Image Left, Content Right</SelectItem>
                  <SelectItem value="image_right">Image Right, Content Left</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Gap</Label>
              <Input
                value={section.layout.gap}
                onChange={(e) => onUpdate({ layout: { ...section.layout, gap: e.target.value } })}
                placeholder="e.g. 2rem, 32px"
              />
            </div>
            <div className="space-y-2">
              <Label>Container Max Width</Label>
              <Input
                value={section.layout.containerWidth}
                onChange={(e) => onUpdate({ layout: { ...section.layout, containerWidth: e.target.value } })}
                placeholder="e.g. 1200px, 80rem"
              />
            </div>
            <div className="space-y-2">
              <Label>Vertical Alignment</Label>
              <Select
                value={section.layout.verticalAlignment || "center"}
                onValueChange={(v) => onUpdate({ layout: { ...section.layout, verticalAlignment: v || "center" } })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Top</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="end">Bottom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Visibility</Label>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={section.visibility.desktop}
                  onCheckedChange={(v) => onUpdate({ visibility: { ...section.visibility, desktop: v } })}
                />
                <Label>Desktop</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={section.visibility.tablet}
                  onCheckedChange={(v) => onUpdate({ visibility: { ...section.visibility, tablet: v } })}
                />
                <Label>Tablet</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={section.visibility.mobile}
                  onCheckedChange={(v) => onUpdate({ visibility: { ...section.visibility, mobile: v } })}
                />
                <Label>Mobile</Label>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="image" className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Image URL *</Label>
              <Input
                value={section.image.url}
                onChange={(e) => onUpdate({ image: { ...section.image, url: e.target.value } })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label>Alt Text</Label>
              <Input
                value={section.image.alt}
                onChange={(e) => onUpdate({ image: { ...section.image, alt: e.target.value } })}
                placeholder="Describe the image"
              />
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={section.image.title}
                onChange={(e) => onUpdate({ image: { ...section.image, title: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <Label>Link URL</Label>
              <Input
                value={section.image.link}
                onChange={(e) => onUpdate({ image: { ...section.image, link: e.target.value } })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label>Object Fit</Label>
              <Select
                value={section.image.objectFit}
                onValueChange={(v) => onUpdate({ image: { ...section.image, objectFit: v || "cover" } })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover">Cover</SelectItem>
                  <SelectItem value="contain">Contain</SelectItem>
                  <SelectItem value="fill">Fill</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Border Radius</Label>
              <Input
                value={section.image.borderRadius}
                onChange={(e) => onUpdate({ image: { ...section.image, borderRadius: e.target.value } })}
                placeholder="e.g. 12px, 1rem"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={section.image.overlay}
                onCheckedChange={(v) => onUpdate({ image: { ...section.image, overlay: v } })}
              />
              <Label>Dark Overlay</Label>
            </div>
            {section.image.overlay && (
              <div className="space-y-2">
                <Label>Overlay Opacity</Label>
                <Input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={section.image.overlayOpacity}
                  onChange={(e) => onUpdate({ image: { ...section.image, overlayOpacity: e.target.value } })}
                  className="w-24"
                />
              </div>
            )}
          </div>
          {section.image.url && (
            <img src={section.image.url} alt={section.image.alt} className="h-40 w-full rounded-md object-cover" />
          )}
        </TabsContent>

        <TabsContent value="elements" className="mt-4">
          <ElementsEditor section={section} onUpdate={onUpdate} />
        </TabsContent>

        <TabsContent value="style" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Section Background</Label>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Color</Label>
                <Input
                  value={section.background.color}
                  onChange={(e) => onUpdate({ background: { ...section.background, color: e.target.value } })}
                  placeholder="#1c1d21"
                />
              </div>
              <div className="space-y-2">
                <Label>Gradient</Label>
                <Input
                  value={section.background.gradient}
                  onChange={(e) => onUpdate({ background: { ...section.background, gradient: e.target.value } })}
                  placeholder="linear-gradient(...)"
                />
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Padding</Label>
              <Input
                value={section.spacing.padding}
                onChange={(e) => onUpdate({ spacing: { ...section.spacing, padding: e.target.value } })}
                placeholder="e.g. 4rem 0"
              />
            </div>
            <div className="space-y-2">
              <Label>Margin</Label>
              <Input
                value={section.spacing.margin}
                onChange={(e) => onUpdate({ spacing: { ...section.spacing, margin: e.target.value } })}
                placeholder="e.g. 2rem auto"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ElementsEditorProps {
  section: TextImageSectionType;
  onUpdate: (updates: Partial<TextImageSectionType>) => void;
}

function ElementsEditor({ section, onUpdate }: ElementsEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addElement = (type: TextImageElementType["type"]) => {
    onUpdate({ elements: [...section.elements, createNewElement(type)] });
  };

  const removeElement = (elementId: string) => {
    onUpdate({ elements: section.elements.filter((e) => e.id !== elementId) });
  };

  const updateElement = (elementId: string, updates: Partial<TextImageElementType>) => {
    onUpdate({
      elements: section.elements.map((e) => (e.id === elementId ? { ...e, ...updates } : e)),
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = section.elements.findIndex((e) => e.id === active.id);
    const newIndex = section.elements.findIndex((e) => e.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const newElements = arrayMove(section.elements, oldIndex, newIndex);
    onUpdate({ elements: newElements });
  };

  const elementTypes = [
    { type: "tag" as const, label: "Tag", icon: Tag },
    { type: "label" as const, label: "Label", icon: Tags },
    { type: "heading" as const, label: "Heading", icon: Heading1 },
    { type: "paragraph" as const, label: "Paragraph", icon: Type },
    { type: "button" as const, label: "Button", icon: MousePointerClick },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Content Elements</Label>
        <div className="flex flex-wrap gap-1">
          {elementTypes.map(({ type, label, icon: Icon }) => (
            <Button key={type} type="button" size="sm" variant="outline" onClick={() => addElement(type)}>
              <Icon className="h-3 w-3 mr-1" /> {label}
            </Button>
          ))}
        </div>
      </div>

      {section.elements.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4 border-2 border-dashed rounded-lg">
          No elements yet. Add content elements above.
        </p>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={section.elements.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {section.elements.map((element) => (
              <SortableElementItem
                key={element.id}
                element={element}
                onRemove={() => removeElement(element.id)}
                onUpdate={(updates) => updateElement(element.id, updates)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

interface SortableElementItemProps {
  element: TextImageElementType;
  onRemove: () => void;
  onUpdate: (updates: Partial<TextImageElementType>) => void;
}

function SortableElementItem({ element, onRemove, onUpdate }: SortableElementItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: element.id });
  const [isExpanded, setIsExpanded] = React.useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const typeConfig = {
    tag: { label: "Tag", icon: Tag, color: "bg-blue-500/10 text-blue-500" },
    label: { label: "Label", icon: Tags, color: "bg-green-500/10 text-green-500" },
    heading: { label: "Heading", icon: Heading1, color: "bg-purple-500/10 text-purple-500" },
    paragraph: { label: "Paragraph", icon: Type, color: "bg-orange-500/10 text-orange-500" },
    button: { label: "Button", icon: MousePointerClick, color: "bg-red-500/10 text-red-500" },
  };

  const config = typeConfig[element.type];

  return (
    <div ref={setNodeRef} style={style} className="border rounded-lg overflow-hidden bg-muted/30">
      <div className="flex items-center gap-2 p-3">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className={`px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
          <config.icon className="h-3 w-3 inline mr-1" />
          {config.label}
        </div>
        <span className="text-xs text-muted-foreground truncate flex-1">
          {element.content || "No content"}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => onUpdate({ visible: !element.visible })}
        >
          {element.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </Button>
        <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onRemove}>
          <Trash2 className="h-3 w-3 text-destructive" />
        </Button>
      </div>

      {isExpanded && (
        <ElementEditorPanel element={element} onUpdate={onUpdate} />
      )}
    </div>
  );
}

interface ElementEditorPanelProps {
  element: TextImageElementType;
  onUpdate: (updates: Partial<TextImageElementType>) => void;
}

function ElementEditorPanel({ element, onUpdate }: ElementEditorPanelProps) {
  const [activeTab, setActiveTab] = React.useState<"content" | "style">("content");

  return (
    <div className="px-3 pb-3 border-t pt-3 space-y-3">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={activeTab === "content" ? "default" : "outline"}
          onClick={() => setActiveTab("content")}
        >
          Content
        </Button>
        <Button
          type="button"
          size="sm"
          variant={activeTab === "style" ? "default" : "outline"}
          onClick={() => setActiveTab("style")}
        >
          Styling
        </Button>
      </div>

      {activeTab === "content" && (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Content</Label>
            {element.type === "paragraph" ? (
              <Textarea
                rows={3}
                value={element.content}
                onChange={(e) => onUpdate({ content: e.target.value })}
                placeholder="Enter paragraph text..."
              />
            ) : (
              <Input
                value={element.content}
                onChange={(e) => onUpdate({ content: e.target.value })}
                placeholder={`Enter ${element.type} content...`}
              />
            )}
          </div>

          {element.type === "heading" && (
            <div className="space-y-2">
              <Label>Heading Level</Label>
              <Select
                value={element.headingLevel || "h2"}
                onValueChange={(v) => onUpdate({ headingLevel: v as TextImageElementType["headingLevel"] })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">H1 - Page Title</SelectItem>
                  <SelectItem value="h2">H2 - Section</SelectItem>
                  <SelectItem value="h3">H3 - Subsection</SelectItem>
                  <SelectItem value="h4">H4 - Minor</SelectItem>
                  <SelectItem value="h5">H5 - Small</SelectItem>
                  <SelectItem value="h6">H6 - Tiny</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {element.type === "button" && (
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Button URL</Label>
                <Input
                  value={element.url || ""}
                  onChange={(e) => onUpdate({ url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>Open In</Label>
                <Select
                  value={element.target || "_self"}
                  onValueChange={(v) => onUpdate({ target: v || "_self" })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_self">Same Tab</SelectItem>
                    <SelectItem value="_blank">New Tab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "style" && (
        <div className="space-y-4">
          {/* Typography */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Typography</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={element.style?.typography?.fontFamily || ""}
                onChange={(e) => onUpdate({
                  style: {
                    ...element.style,
                    typography: { ...element.style?.typography, ...defaultStyleValues.typography, fontFamily: e.target.value },
                  },
                })}
                placeholder="Font Family"
              />
              <Input
                value={element.style?.typography?.fontSize || ""}
                onChange={(e) => onUpdate({
                  style: {
                    ...element.style,
                    typography: { ...element.style?.typography, ...defaultStyleValues.typography, fontSize: e.target.value },
                  },
                })}
                placeholder="Font Size (e.g. 1.5rem)"
              />
              <Input
                value={element.style?.typography?.fontWeight || ""}
                onChange={(e) => onUpdate({
                  style: {
                    ...element.style,
                    typography: { ...element.style?.typography, ...defaultStyleValues.typography, fontWeight: e.target.value },
                  },
                })}
                placeholder="Font Weight (e.g. 700)"
              />
              <Input
                value={element.style?.typography?.lineHeight || ""}
                onChange={(e) => onUpdate({
                  style: {
                    ...element.style,
                    typography: { ...element.style?.typography, ...defaultStyleValues.typography, lineHeight: e.target.value },
                  },
                })}
                placeholder="Line Height (e.g. 1.5)"
              />
              <Input
                value={element.style?.typography?.letterSpacing || ""}
                onChange={(e) => onUpdate({
                  style: {
                    ...element.style,
                    typography: { ...element.style?.typography, ...defaultStyleValues.typography, letterSpacing: e.target.value },
                  },
                })}
                placeholder="Letter Spacing"
              />
              <Select
                value={element.style?.typography?.textTransform || ""}
                onValueChange={(v) => onUpdate({
                  style: {
                    ...element.style,
                    typography: { ...element.style?.typography, ...defaultStyleValues.typography, textTransform: v || "" },
                  },
                })}
              >
                <SelectTrigger><SelectValue placeholder="Text Transform" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  <SelectItem value="uppercase">UPPERCASE</SelectItem>
                  <SelectItem value="lowercase">lowercase</SelectItem>
                  <SelectItem value="capitalize">Capitalize</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Colors</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={element.style?.colors?.text || ""}
                onChange={(e) => onUpdate({
                  style: {
                    ...element.style,
                    colors: { ...element.style?.colors, ...defaultStyleValues.colors, text: e.target.value },
                  },
                })}
                placeholder="Text Color (#hex or rgb)"
              />
              <Input
                value={element.style?.colors?.background || ""}
                onChange={(e) => onUpdate({
                  style: {
                    ...element.style,
                    colors: { ...element.style?.colors, ...defaultStyleValues.colors, background: e.target.value },
                  },
                })}
                placeholder="Background Color"
              />
            </div>
          </div>

          {/* Spacing */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Spacing</Label>
            <div className="grid grid-cols-4 gap-2">
              {(["marginTop", "marginBottom", "marginLeft", "marginRight"] as const).map((key) => (
                <Input
                  key={key}
                  value={element.style?.spacing?.[key] || ""}
                  onChange={(e) => onUpdate({
                    style: {
                      ...element.style,
                      spacing: { ...element.style?.spacing, ...defaultStyleValues.spacing, [key]: e.target.value },
                    },
                  })}
                  placeholder={key.replace("margin", "M")}
                />
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"] as const).map((key) => (
                <Input
                  key={key}
                  value={element.style?.spacing?.[key] || ""}
                  onChange={(e) => onUpdate({
                    style: {
                      ...element.style,
                      spacing: { ...element.style?.spacing, ...defaultStyleValues.spacing, [key]: e.target.value },
                    },
                  })}
                  placeholder={key.replace("padding", "P")}
                />
              ))}
            </div>
          </div>

          {/* Borders */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Borders</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={element.style?.borders?.border || ""}
                onChange={(e) => onUpdate({
                  style: {
                    ...element.style,
                    borders: { ...element.style?.borders, ...defaultStyleValues.borders, border: e.target.value },
                  },
                })}
                placeholder="Border (e.g. 1px solid #fff)"
              />
              <Input
                value={element.style?.borders?.borderRadius || ""}
                onChange={(e) => onUpdate({
                  style: {
                    ...element.style,
                    borders: { ...element.style?.borders, ...defaultStyleValues.borders, borderRadius: e.target.value },
                  },
                })}
                placeholder="Border Radius"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preview</Label>
            <div className="p-4 bg-muted rounded-lg">
              {element.type === "tag" && (
                <span
                  className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-abGold/20 text-abGold rounded-full"
                  style={{
                    fontFamily: element.style?.typography?.fontFamily,
                    fontSize: element.style?.typography?.fontSize,
                    fontWeight: element.style?.typography?.fontWeight,
                    color: element.style?.colors?.text,
                    backgroundColor: element.style?.colors?.background,
                    border: element.style?.borders?.border,
                    borderRadius: element.style?.borders?.borderRadius,
                    letterSpacing: element.style?.typography?.letterSpacing,
                    textTransform: element.style?.typography?.textTransform as any,
                  }}
                >
                  {element.content || "Tag"}
                </span>
              )}
              {element.type === "heading" && (
                <span
                  className="block text-2xl font-bold text-white"
                  style={{
                    fontFamily: element.style?.typography?.fontFamily,
                    fontSize: element.style?.typography?.fontSize,
                    fontWeight: element.style?.typography?.fontWeight,
                    lineHeight: element.style?.typography?.lineHeight,
                    letterSpacing: element.style?.typography?.letterSpacing,
                    color: element.style?.colors?.text,
                    backgroundColor: element.style?.colors?.background,
                  }}
                >
                  {element.content || "Heading"}
                </span>
              )}
              {element.type === "paragraph" && (
                <p
                  className="text-sm text-gray-300"
                  style={{
                    fontFamily: element.style?.typography?.fontFamily,
                    fontSize: element.style?.typography?.fontSize,
                    fontWeight: element.style?.typography?.fontWeight,
                    lineHeight: element.style?.typography?.lineHeight,
                    color: element.style?.colors?.text,
                  }}
                >
                  {element.content || "Paragraph text..."}
                </p>
              )}
              {element.type === "button" && (
                <span
                  className="inline-flex items-center gap-2 px-6 py-3 bg-abGold text-white font-semibold rounded-lg"
                  style={{
                    fontFamily: element.style?.typography?.fontFamily,
                    fontSize: element.style?.typography?.fontSize,
                    color: element.style?.colors?.text || "#fff",
                    backgroundColor: element.style?.colors?.background || undefined,
                    border: element.style?.borders?.border,
                    borderRadius: element.style?.borders?.borderRadius,
                  }}
                >
                  {element.content || "Button"}
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Cards Section Panel ──────────────────────────────────────
const CARD_ICON_OPTIONS = [
  "shield", "plane", "network", "building", "car", "map-pin",
  "clock", "users", "star", "briefcase", "heart", "check-circle",
  "globe", "phone", "mail", "calendar", "award", "zap",
];

interface CardsSectionPanelProps {
  section: CardsSectionType;
  onUpdate: (updates: Partial<CardsSectionType>) => void;
}

function CardsSectionPanel({ section, onUpdate }: CardsSectionPanelProps) {
  const updateCard = (cardIndex: number, updates: Partial<CardItemType>) => {
    const cards = [...section.cards];
    cards[cardIndex] = { ...cards[cardIndex], ...updates };
    onUpdate({ cards });
  };

  const addCard = () => {
    onUpdate({ cards: [...section.cards, createNewCard()] });
  };

  const removeCard = (cardIndex: number) => {
    onUpdate({ cards: section.cards.filter((_, i) => i !== cardIndex) });
  };

  const updateCta = (cardIndex: number, ctaIndex: number, updates: Partial<CardCtaType>) => {
    const cards = [...section.cards];
    const ctas = [...cards[cardIndex].ctas];
    ctas[ctaIndex] = { ...ctas[ctaIndex], ...updates };
    cards[cardIndex] = { ...cards[cardIndex], ctas };
    onUpdate({ cards });
  };

  const addCta = (cardIndex: number) => {
    const cards = [...section.cards];
    cards[cardIndex] = { ...cards[cardIndex], ctas: [...cards[cardIndex].ctas, createNewCta()] };
    onUpdate({ cards });
  };

  const removeCta = (cardIndex: number, ctaIndex: number) => {
    const cards = [...section.cards];
    cards[cardIndex] = { ...cards[cardIndex], ctas: cards[cardIndex].ctas.filter((_, i) => i !== ctaIndex) };
    onUpdate({ cards });
  };

  return (
    <div className="p-4 space-y-6 border-t">
      <Tabs defaultValue="content">
        <TabsList className="w-full">
          <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
          <TabsTrigger value="cards" className="flex-1">Cards ({section.cards.length})</TabsTrigger>
          <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Section Title</Label>
            <Input value={section.title} onChange={(e) => onUpdate({ title: e.target.value })} placeholder="Capital Operations" />
          </div>
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input value={section.subtitle} onChange={(e) => onUpdate({ subtitle: e.target.value })} placeholder="Optional subtitle" />
          </div>
          <div className="space-y-2">
            <Label>Columns</Label>
            <Select value={section.columns} onValueChange={(v) => onUpdate({ columns: v as "2" | "3" })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 Columns</SelectItem>
                <SelectItem value="3">3 Columns</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="cards" className="space-y-4 mt-4">
          {section.cards.map((card, ci) => (
            <Card key={card.id} className="bg-muted/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Card {ci + 1}</CardTitle>
                  <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => removeCard(ci)}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <Select value={card.icon || undefined} onValueChange={(v) => updateCard(ci, { icon: v || "" })}>
                      <SelectTrigger><SelectValue placeholder="Select icon" /></SelectTrigger>
                      <SelectContent>
                        {CARD_ICON_OPTIONS.map((ic) => (
                          <SelectItem key={ic} value={ic}>{ic}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Icon Color</Label>
                    <Input value={card.iconColor} onChange={(e) => updateCard(ci, { iconColor: e.target.value })} placeholder="#d4a853" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={card.title} onChange={(e) => updateCard(ci, { title: e.target.value })} placeholder="KAFD & Diplomatic Quarter" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={card.description} onChange={(e) => updateCard(ci, { description: e.target.value })} placeholder="Vetted chauffeurs with clearance..." rows={3} />
                </div>

                {/* CTAs */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>CTA Buttons</Label>
                    <Button type="button" variant="ghost" size="sm" className="h-6 text-xs" onClick={() => addCta(ci)}>
                      <Plus className="h-3 w-3 mr-1" /> Add CTA
                    </Button>
                  </div>
                  {card.ctas.map((cta, ti) => (
                    <div key={ti} className="flex gap-2 items-center">
                      <Input value={cta.label} onChange={(e) => updateCta(ci, ti, { label: e.target.value })} placeholder="Button text" className="flex-1" />
                      <Input value={cta.url} onChange={(e) => updateCta(ci, ti, { url: e.target.value })} placeholder="/link" className="flex-1" />
                      <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => removeCta(ci, ti)}>
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          <Button type="button" variant="outline" className="w-full" onClick={addCard}>
            <Plus className="h-4 w-4 mr-1" /> Add Card
          </Button>
        </TabsContent>

        <TabsContent value="style" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Container Width</Label>
            <Input value={section.layout.containerWidth} onChange={(e) => onUpdate({ layout: { ...section.layout, containerWidth: e.target.value } })} placeholder="1200px" />
          </div>
          <div className="space-y-2">
            <Label>Content Width</Label>
            <Input value={section.layout.contentWidth} onChange={(e) => onUpdate({ layout: { ...section.layout, contentWidth: e.target.value } })} placeholder="100%" />
          </div>
          <div className="space-y-2">
            <Label>Gap</Label>
            <Input value={section.layout.gap} onChange={(e) => onUpdate({ layout: { ...section.layout, gap: e.target.value } })} placeholder="24px" />
          </div>
          <div className="space-y-2">
            <Label>Padding</Label>
            <Input value={section.spacing.padding} onChange={(e) => onUpdate({ spacing: { ...section.spacing, padding: e.target.value } })} placeholder="4rem 2rem" />
          </div>
          <div className="space-y-2">
            <Label>Margin</Label>
            <Input value={section.spacing.margin} onChange={(e) => onUpdate({ spacing: { ...section.spacing, margin: e.target.value } })} placeholder="0 auto" />
          </div>
          <div className="space-y-2">
            <Label>Background Color</Label>
            <Input value={section.background.color} onChange={(e) => onUpdate({ background: { ...section.background, color: e.target.value } })} placeholder="#1a1b1e" />
          </div>
          <div className="space-y-2">
            <Label>Background Gradient</Label>
            <Input value={section.background.gradient} onChange={(e) => onUpdate({ background: { ...section.background, gradient: e.target.value } })} placeholder="linear-gradient(...)" />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Switch checked={section.visibility.desktop} onCheckedChange={(v) => onUpdate({ visibility: { ...section.visibility, desktop: v } })} />
              <Label className="text-xs">Desktop</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={section.visibility.tablet} onCheckedChange={(v) => onUpdate({ visibility: { ...section.visibility, tablet: v } })} />
              <Label className="text-xs">Tablet</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={section.visibility.mobile} onCheckedChange={(v) => onUpdate({ visibility: { ...section.visibility, mobile: v } })} />
              <Label className="text-xs">Mobile</Label>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
