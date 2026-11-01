"use client";

import * as React from "react";
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
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Copy,
  Eye,
  EyeOff,
} from "lucide-react";
import type { TextImageSectionType, TextImageElementType } from "@/lib/validations/location";

interface CitySectionEditorProps {
  sections: TextImageSectionType[];
  onChange: (sections: TextImageSectionType[]) => void;
}

function generateId(): string {
  return `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateElementId(): string {
  return `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function createNewSection(): TextImageSectionType {
  return {
    id: generateId(),
    type: "text_image",
    direction: "image_left",
    image: {
      url: "",
      alt: "",
      title: "",
      caption: "",
      objectFit: "cover",
      objectPosition: "center",
      aspectRatio: "",
      borderRadius: "",
      width: "",
      height: "",
      maxWidth: "",
      link: "",
      overlay: false,
      overlayOpacity: "0.5",
    },
    elements: [],
    layout: {
      containerWidth: "",
      contentWidth: "",
      imageWidth: "",
      gap: "",
      alignment: "",
      verticalAlignment: "",
    },
    spacing: {
      padding: "",
      margin: "",
    },
    background: {
      color: "",
      gradient: "",
      image: "",
    },
    responsive: {
      mobile: { direction: "image_left", stack: true },
      tablet: { direction: "image_left", stack: false },
    },
    visibility: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
  };
}

function createNewElement(type: TextImageElementType["type"]): TextImageElementType {
  const base: TextImageElementType = {
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

  switch (type) {
    case "heading":
      return { ...base, headingLevel: "h2" };
    case "button":
      return {
        ...base,
        url: "",
        target: "_self",
        icon: { library: "lucide", name: "", position: "right" },
      };
    default:
      return base;
  }
}

export function CitySectionEditor({ sections, onChange }: CitySectionEditorProps) {
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({});
  const [expandedElements, setExpandedElements] = React.useState<Record<string, boolean>>({});

  const addSection = () => {
    const newSection = createNewSection();
    onChange([...sections, newSection]);
    setExpandedSections((prev) => ({ ...prev, [newSection.id]: true }));
  };

  const removeSection = (sectionId: string) => {
    onChange(sections.filter((s) => s.id !== sectionId));
  };

  const duplicateSection = (section: TextImageSectionType) => {
    const newSection = {
      ...JSON.parse(JSON.stringify(section)),
      id: generateId(),
      elements: section.elements.map((el) => ({
        ...el,
        id: generateElementId(),
      })),
    };
    onChange([...sections, newSection]);
    setExpandedSections((prev) => ({ ...prev, [newSection.id]: true }));
  };

  const updateSection = (sectionId: string, updates: Partial<TextImageSectionType>) => {
    onChange(
      sections.map((s) => (s.id === sectionId ? { ...s, ...updates } : s))
    );
  };

  const moveSection = (sectionId: string, direction: -1 | 1) => {
    const index = sections.findIndex((s) => s.id === sectionId);
    if (index === -1) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sections.length) return;
    const newSections = [...sections];
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    onChange(newSections);
  };

  const addElement = (sectionId: string, type: TextImageElementType["type"]) => {
    const newElement = createNewElement(type);
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;
    updateSection(sectionId, {
      elements: [...section.elements, newElement],
    });
    setExpandedElements((prev) => ({ ...prev, [newElement.id]: true }));
  };

  const removeElement = (sectionId: string, elementId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;
    updateSection(sectionId, {
      elements: section.elements.filter((e) => e.id !== elementId),
    });
  };

  const updateElement = (
    sectionId: string,
    elementId: string,
    updates: Partial<TextImageElementType>
  ) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;
    updateSection(sectionId, {
      elements: section.elements.map((e) => (e.id === elementId ? { ...e, ...updates } : e)),
    });
  };

  const moveElement = (sectionId: string, elementId: string, direction: -1 | 1) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;
    const index = section.elements.findIndex((e) => e.id === elementId);
    if (index === -1) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= section.elements.length) return;
    const newElements = [...section.elements];
    [newElements[index], newElements[newIndex]] = [newElements[newIndex], newElements[index]];
    updateSection(sectionId, { elements: newElements });
  };

  const toggleSectionExpanded = (sectionId: string) => {
    setExpandedSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const toggleElementExpanded = (elementId: string) => {
    setExpandedElements((prev) => ({ ...prev, [elementId]: !prev[elementId] }));
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base">Content Sections</CardTitle>
        <Button type="button" size="sm" variant="outline" onClick={addSection}>
          <Plus className="h-4 w-4 mr-1" /> Add Section
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No sections yet. Add a Text + Image section to get started.
          </p>
        )}
        {sections.map((section) => (
          <SectionItem
            key={section.id}
            section={section}
            isExpanded={expandedSections[section.id] || false}
            expandedElements={expandedElements}
            onToggle={() => toggleSectionExpanded(section.id)}
            onRemove={() => removeSection(section.id)}
            onDuplicate={() => duplicateSection(section)}
            onUpdate={(updates) => updateSection(section.id, updates)}
            onMove={(dir) => moveSection(section.id, dir)}
            onAddElement={(type) => addElement(section.id, type)}
            onRemoveElement={(elementId) => removeElement(section.id, elementId)}
            onUpdateElement={(elementId, updates) => updateElement(section.id, elementId, updates)}
            onMoveElement={(elementId, dir) => moveElement(section.id, elementId, dir)}
            onToggleElement={(elementId) => toggleElementExpanded(elementId)}
          />
        ))}
      </CardContent>
    </Card>
  );
}

interface SectionItemProps {
  section: TextImageSectionType;
  isExpanded: boolean;
  expandedElements: Record<string, boolean>;
  onToggle: () => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onUpdate: (updates: Partial<TextImageSectionType>) => void;
  onMove: (dir: -1 | 1) => void;
  onAddElement: (type: TextImageElementType["type"]) => void;
  onRemoveElement: (elementId: string) => void;
  onUpdateElement: (elementId: string, updates: Partial<TextImageElementType>) => void;
  onMoveElement: (elementId: string, dir: -1 | 1) => void;
  onToggleElement: (elementId: string) => void;
}

function SectionItem({
  section,
  isExpanded,
  expandedElements,
  onToggle,
  onRemove,
  onDuplicate,
  onUpdate,
  onMove,
  onAddElement,
  onRemoveElement,
  onUpdateElement,
  onMoveElement,
  onToggleElement,
}: SectionItemProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-muted/50"
      >
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {section.elements.find((e) => e.type === "heading")?.content || `Section ${section.id.slice(-4)}`}
          </span>
          <span className="text-xs text-muted-foreground">
            ({section.direction === "image_left" ? "Image Left" : "Image Right"})
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onMove(-1);
            }}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onMove(1);
            }}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t pt-4">
          {/* Direction */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layout Direction</Label>
              <Select
                value={section.direction}
                onValueChange={(v) => onUpdate({ direction: v as "image_left" | "image_right" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image_left">Image Left, Content Right</SelectItem>
                  <SelectItem value="image_right">Image Right, Content Left</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image Settings */}
          <div className="space-y-3">
            <Label>Image Settings</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Image URL</Label>
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
                  placeholder="Image description"
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
                <Label>Link</Label>
                <Input
                  value={section.image.link}
                  onChange={(e) => onUpdate({ image: { ...section.image, link: e.target.value } })}
                  placeholder="https://..."
                />
              </div>
            </div>
            {section.image.url && (
              <img
                src={section.image.url}
                alt={section.image.alt}
                className="mt-2 h-40 w-full rounded-md object-cover"
              />
            )}
          </div>

          {/* Content Elements */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Content Elements</Label>
              <div className="flex gap-1">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onAddElement("tag")}
                >
                  + Tag
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onAddElement("label")}
                >
                  + Label
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onAddElement("heading")}
                >
                  + Heading
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onAddElement("paragraph")}
                >
                  + Paragraph
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onAddElement("button")}
                >
                  + Button
                </Button>
              </div>
            </div>

            {section.elements.length === 0 && (
              <p className="text-sm text-muted-foreground">No elements yet. Add content elements above.</p>
            )}

            {section.elements.map((element) => (
              <ElementItem
                key={element.id}
                element={element}
                isExpanded={expandedElements[element.id] || false}
                onToggle={() => onToggleElement(element.id)}
                onRemove={() => onRemoveElement(element.id)}
                onUpdate={(updates) => onUpdateElement(element.id, updates)}
                onMove={(dir) => onMoveElement(element.id, dir)}
              />
            ))}
          </div>

          {/* Visibility */}
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
        </div>
      )}
    </div>
  );
}

interface ElementItemProps {
  element: TextImageElementType;
  isExpanded: boolean;
  onToggle: () => void;
  onRemove: () => void;
  onUpdate: (updates: Partial<TextImageElementType>) => void;
  onMove: (dir: -1 | 1) => void;
}

function ElementItem({
  element,
  isExpanded,
  onToggle,
  onRemove,
  onUpdate,
  onMove,
}: ElementItemProps) {
  const typeLabels: Record<TextImageElementType["type"], string> = {
    tag: "Tag",
    label: "Label",
    heading: "Heading",
    paragraph: "Paragraph",
    button: "Button",
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-muted/30">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 text-left cursor-pointer hover:bg-muted/50"
      >
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{typeLabels[element.type]}</span>
          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
            {element.content || "No content"}
          </span>
          {!element.visible && <EyeOff className="h-3 w-3 text-muted-foreground" />}
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onMove(-1);
            }}
          >
            <ArrowUp className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onMove(1);
            }}
          >
            <ArrowDown className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate({ visible: !element.visible });
            }}
          >
            {element.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <Trash2 className="h-3 w-3 text-destructive" />
          </Button>
        </div>
      </button>
      {isExpanded && (
        <div className="px-3 pb-3 space-y-3 border-t pt-3">
          <div className="space-y-2">
            <Label>Content</Label>
            {element.type === "paragraph" ? (
              <Textarea
                rows={3}
                value={element.content}
                onChange={(e) => onUpdate({ content: e.target.value })}
                placeholder="Enter paragraph content..."
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
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">H1</SelectItem>
                  <SelectItem value="h2">H2</SelectItem>
                  <SelectItem value="h3">H3</SelectItem>
                  <SelectItem value="h4">H4</SelectItem>
                  <SelectItem value="h5">H5</SelectItem>
                  <SelectItem value="h6">H6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {element.type === "button" && (
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>URL</Label>
                <Input
                  value={element.url || ""}
                  onChange={(e) => onUpdate({ url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>Target</Label>
                <Select
                  value={element.target || "_self"}
                  onValueChange={(v) => onUpdate({ target: v || "_self" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
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
    </div>
  );
}
