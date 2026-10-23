"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { MediaInput } from "@/components/admin/media-input";
import { CHANNELS } from "@/lib/chat/channels";

interface ChannelConfig {
  id: string;
  enabled: boolean;
  label: string;
  phone: string;
  email: string;
  username: string;
  url: string;
  presetMessage: string;
  agentName: string;
  agentAvatar: string;
}

interface WidgetConfig {
  _id: string;
  name: string;
  enabled: boolean;
  channels: ChannelConfig[];
  position: "bottom-right" | "bottom-left";
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  iconSize: number;
  ctaMessage: string;
  ctaTextColor: string;
  ctaBgColor: string;
  showCta: boolean;
  animation: "none" | "bounce" | "pulse" | "shake";
  whatsappPopup: boolean;
  whatsappPopupHeader: string;
  whatsappPopupMsg: string;
  whatsappPopupMsgCountry: string;
  whatsappPopupMsgCity: string;
  universalWhatsappNumber: string;
  cityWhatsappNumber: string;
  countryWhatsappNumbers: { countrySlug: string; number: string }[];
  showAgents: boolean;
}

const DEFAULT_WIDGET: Omit<WidgetConfig, "_id"> = {
  name: "Default Widget",
  enabled: true,
  channels: CHANNELS.map((ch) => ({
    id: ch.id,
    enabled: false,
    label: ch.name,
    phone: "",
    email: "",
    username: "",
    url: "",
    presetMessage: "Hello! I have a question about your services.",
    agentName: "",
    agentAvatar: "",
  })),
  position: "bottom-right",
  primaryColor: "#25D366",
  backgroundColor: "#ffffff",
  textColor: "#333333",
  iconSize: 60,
  ctaMessage: "Chat with us!",
  ctaTextColor: "#ffffff",
  ctaBgColor: "#25D366",
  showCta: true,
  animation: "bounce",
  whatsappPopup: false,
  whatsappPopupHeader: "Chat with us on WhatsApp",
  whatsappPopupMsg: "Hi! I have a question about your services.",
  whatsappPopupMsgCountry: "Hi! I have a question about your services in {country}.",
  whatsappPopupMsgCity: "Hi! I have a question about your services in {city}.",
  universalWhatsappNumber: "",
  cityWhatsappNumber: "",
  countryWhatsappNumbers: [],
  showAgents: false,
};

export default function ChatWidgetPage() {
  const [config, setConfig] = useState<WidgetConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [countries, setCountries] = useState<{ slug: string; name: string }[]>([]);

  useEffect(() => {
    fetch("/api/locations")
      .then((r) => r.json())
      .then((data) => setCountries(data?.countries ?? []))
      .catch(() => setCountries([]));
  }, []);

  useEffect(() => {
    fetch("/api/chat/config")
      .then((r) => r.json())
      .then((data) => {
        if (data && data._id) {
          setConfig({ ...DEFAULT_WIDGET, ...data } as WidgetConfig);
        } else {
          setConfig({ ...DEFAULT_WIDGET, _id: "" } as WidgetConfig);
        }
      })
      .catch(() => {
        setConfig({ ...DEFAULT_WIDGET, _id: "" } as WidgetConfig);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    if (!config) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/chat/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error("Failed");
      const saved = await res.json();
      setConfig(saved);
      toast.success("Widget configuration saved");
    } catch {
      toast.error("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const updateChannel = (channelId: string, field: string, value: unknown) => {
    if (!config) return;
    setConfig({
      ...config,
      channels: config.channels.map((ch) =>
        ch.id === channelId ? ({ ...ch, [field]: value } as ChannelConfig) : ch
      ),
    });
  };

  const updateConfig = (field: string, value: unknown) => {
    if (!config) return;
    setConfig({ ...config, [field]: value } as WidgetConfig);
  };

  const countryNumbers = config?.countryWhatsappNumbers ?? [];

  const updateCountryNumber = (index: number, field: string, value: string) => {
    if (!config) return;
    const next = countryNumbers.map((c, i) => (i === index ? { ...c, [field]: value } : c));
    updateConfig("countryWhatsappNumbers", next);
  };

  const addCountryNumber = () => {
    if (!config) return;
    updateConfig("countryWhatsappNumbers", [
      ...countryNumbers,
      { countrySlug: "", number: "" },
    ]);
  };

  const removeCountryNumber = (index: number) => {
    if (!config) return;
    updateConfig(
      "countryWhatsappNumbers",
      countryNumbers.filter((_, i) => i !== index)
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6 px-4 lg:px-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!config) return null;

  const enabledCount = config.channels.filter((c) => c.enabled).length;

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Chat Widget</h2>
          <p className="text-sm text-muted-foreground">
            Configure the floating chat widget that appears on your website
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Enable Widget</Label>
                <Switch
                  checked={config.enabled}
                  onCheckedChange={(v) => updateConfig("enabled", v)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Select
                    value={config.position}
                    onValueChange={(v) => updateConfig("position", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Animation</Label>
                  <Select
                    value={config.animation}
                    onValueChange={(v) => updateConfig("animation", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="bounce">Bounce</SelectItem>
                      <SelectItem value="pulse">Pulse</SelectItem>
                      <SelectItem value="shake">Shake</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) =>
                        updateConfig("primaryColor", e.target.value)
                      }
                      className="w-10 h-10 rounded cursor-pointer border-0"
                    />
                    <Input
                      value={config.primaryColor}
                      onChange={(e) =>
                        updateConfig("primaryColor", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.backgroundColor}
                      onChange={(e) =>
                        updateConfig("backgroundColor", e.target.value)
                      }
                      className="w-10 h-10 rounded cursor-pointer border-0"
                    />
                    <Input
                      value={config.backgroundColor}
                      onChange={(e) =>
                        updateConfig("backgroundColor", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Icon Size (px)</Label>
                  <Input
                    type="number"
                    min={40}
                    max={80}
                    value={config.iconSize}
                    onChange={(e) =>
                      updateConfig("iconSize", parseInt(e.target.value) || 60)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CTA (Call to Action)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Show CTA</Label>
                <Switch
                  checked={config.showCta}
                  onCheckedChange={(v) => updateConfig("showCta", v)}
                />
              </div>
              {config.showCta && (
                <>
                  <div className="space-y-2">
                    <Label>CTA Message</Label>
                    <Input
                      value={config.ctaMessage}
                      onChange={(e) =>
                        updateConfig("ctaMessage", e.target.value)
                      }
                      placeholder="Chat with us!"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>CTA Text Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.ctaTextColor}
                          onChange={(e) =>
                            updateConfig("ctaTextColor", e.target.value)
                          }
                          className="w-10 h-10 rounded cursor-pointer border-0"
                        />
                        <Input
                          value={config.ctaTextColor}
                          onChange={(e) =>
                            updateConfig("ctaTextColor", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>CTA Background Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.ctaBgColor}
                          onChange={(e) =>
                            updateConfig("ctaBgColor", e.target.value)
                          }
                          className="w-10 h-10 rounded cursor-pointer border-0"
                        />
                        <Input
                          value={config.ctaBgColor}
                          onChange={(e) =>
                            updateConfig("ctaBgColor", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Popup</CardTitle>
              <CardDescription>
                Show a custom WhatsApp popup before opening the chat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Enable WhatsApp Popup</Label>
                <Switch
                  checked={config.whatsappPopup}
                  onCheckedChange={(v) => updateConfig("whatsappPopup", v)}
                />
              </div>
              {config.whatsappPopup && (
                <>
                  <div className="space-y-2">
                    <Label>Popup Header</Label>
                    <Input
                      value={config.whatsappPopupHeader}
                      onChange={(e) =>
                        updateConfig("whatsappPopupHeader", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Default Message</Label>
                    <Textarea
                      value={config.whatsappPopupMsg}
                      onChange={(e) =>
                        updateConfig("whatsappPopupMsg", e.target.value)
                      }
                      rows={3}
                      placeholder="Hi! I have a question about your {service} service."
                    />
                    <p className="text-xs text-muted-foreground">
                      Used on service pages and when no page context applies. Use <code className="bg-muted px-1 rounded">{'{service}'}</code> to auto-insert the current service name. On country/city service pages the location is added automatically (e.g. &quot;...service in Dammam.&quot;) — use <code className="bg-muted px-1 rounded">{'{country}'}</code> or <code className="bg-muted px-1 rounded">{'{city}'}</code> in the message to place it yourself instead. Leave empty for default message.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Country Pages Message</Label>
                    <Textarea
                      value={config.whatsappPopupMsgCountry}
                      onChange={(e) =>
                        updateConfig("whatsappPopupMsgCountry", e.target.value)
                      }
                      rows={3}
                      placeholder="Hi! I have a question about your services in {country}."
                    />
                    <p className="text-xs text-muted-foreground">
                      Used on country location pages (e.g. <code className="bg-muted px-1 rounded">/locations/uae</code>). Use <code className="bg-muted px-1 rounded">{'{country}'}</code> to auto-insert the country name.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>City Pages Message</Label>
                    <Textarea
                      value={config.whatsappPopupMsgCity}
                      onChange={(e) =>
                        updateConfig("whatsappPopupMsgCity", e.target.value)
                      }
                      rows={3}
                      placeholder="Hi! I have a question about your services in {city}."
                    />
                    <p className="text-xs text-muted-foreground">
                      Used on city location pages (e.g. <code className="bg-muted px-1 rounded">/locations/uae/abu-dhabi</code>). Use <code className="bg-muted px-1 rounded">{'{city}'}</code> to auto-insert the city name.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Universal WhatsApp Number</CardTitle>
              <CardDescription>
                The general company number used on the homepage, main service
                pages, and every other page that is not a country/city service
                or location page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Universal WhatsApp Number</Label>
                <Input
                  value={config.universalWhatsappNumber || ""}
                  onChange={(e) =>
                    updateConfig("universalWhatsappNumber", e.target.value)
                  }
                  placeholder="+1234567890"
                />
                <p className="text-xs text-muted-foreground">
                  Country and city numbers below override this on their
                  respective pages. Leave empty to use the WhatsApp channel
                  number everywhere.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Country WhatsApp Numbers</CardTitle>
              <CardDescription>
                Route WhatsApp messages to a country-specific number on that
                country&apos;s service pages (e.g. /services/chauffeur-vip/qatar)
                and location pages (e.g. /locations/qatar)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {countryNumbers.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No country numbers yet. The WhatsApp channel phone number is used
                  as the fallback for every country.
                </p>
              )}
              {countryNumbers.map((entry, index) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_auto] items-center gap-2">
                  <Select
                    value={entry.countrySlug}
                    onValueChange={(v) => v && updateCountryNumber(index, "countrySlug", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.slug} value={c.slug}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    value={entry.number}
                    onChange={(e) => updateCountryNumber(index, "number", e.target.value)}
                    placeholder="+1234567890"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCountryNumber(index)}
                    aria-label="Remove country number"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addCountryNumber}>
                <Plus className="h-4 w-4 mr-1" /> Add Country Number
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>City Services Template</CardTitle>
              <CardDescription>
                Route WhatsApp messages to a dedicated number on city service
                template pages (e.g. /services/chauffeur-vip/qatar/doha) and
                city location pages (e.g. /locations/qatar/doha). Individual
                city service pages can override this from the post editor.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>City WhatsApp Number</Label>
                <Input
                  value={config.cityWhatsappNumber || ""}
                  onChange={(e) =>
                    updateConfig("cityWhatsappNumber", e.target.value)
                  }
                  placeholder="+1234567890"
                />
                <p className="text-xs text-muted-foreground">
                  When set, pages using the city services template will send
                  WhatsApp messages to this number instead of the WhatsApp
                  channel number. Leave empty to use the default channel number.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Channels</CardTitle>
              <CardDescription>
                {enabledCount} of {CHANNELS.length} channels enabled
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 p-0">
              {CHANNELS.map((ch) => {
                const channelConfig = config.channels.find(
                  (c) => c.id === ch.id
                );
                const isActive = activeChannel === ch.id;
                const needsPhone = ch.fields.includes("phone");
                const needsUsername = ch.fields.includes("username") && !needsPhone;
                return (
                  <div key={ch.id}>
                    <button
                      onClick={() =>
                        setActiveChannel(isActive ? null : ch.id)
                      }
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-accent transition-colors ${
                        isActive ? "bg-accent" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: channelConfig?.enabled
                              ? ch.color
                              : "#ccc",
                          }}
                        />
                        <span>{ch.name}</span>
                      </div>
                      <Switch
                        checked={channelConfig?.enabled || false}
                        onCheckedChange={(v) => {
                          updateChannel(ch.id, "enabled", v);
                          if (v) setActiveChannel(ch.id);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </button>
                    {channelConfig?.enabled && isActive && (
                      <div className="px-4 pb-3 space-y-2 border-b">
                        {needsPhone && (
                          <div className="flex items-center gap-2">
                            <Label className="text-xs whitespace-nowrap w-16">Phone</Label>
                            <Input
                              value={channelConfig.phone}
                              onChange={(e) => updateChannel(ch.id, "phone", e.target.value)}
                              placeholder="+1234567890"
                              className="h-8 text-xs"
                            />
                          </div>
                        )}
                        {needsUsername && (
                          <div className="flex items-center gap-2">
                            <Label className="text-xs whitespace-nowrap w-16">Username</Label>
                            <Input
                              value={channelConfig.username}
                              onChange={(e) => updateChannel(ch.id, "username", e.target.value)}
                              placeholder="username"
                              className="h-8 text-xs"
                            />
                          </div>
                        )}
                        {ch.fields.includes("email") && (
                          <div className="flex items-center gap-2">
                            <Label className="text-xs whitespace-nowrap w-16">Email</Label>
                            <Input
                              type="email"
                              value={channelConfig.email}
                              onChange={(e) => updateChannel(ch.id, "email", e.target.value)}
                              placeholder="hello@example.com"
                              className="h-8 text-xs"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {activeChannel && (
            <ChannelConfigCard
              channelId={activeChannel}
              config={config}
              onUpdate={updateChannel}
            />
          )}

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-40">
              <div className="relative">
                {config.showCta && config.ctaMessage && (
                  <div
                    className="absolute right-full mr-3 whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium shadow-md top-1/2 -translate-y-1/2"
                    style={{
                      backgroundColor: config.ctaBgColor,
                      color: config.ctaTextColor,
                    }}
                  >
                    {config.ctaMessage}
                  </div>
                )}
                <div
                  className="rounded-full shadow-lg flex items-center justify-center"
                  style={{
                    width: config.iconSize,
                    height: config.iconSize,
                    backgroundColor: config.primaryColor,
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ChannelConfigCard({
  channelId,
  config,
  onUpdate,
}: {
  channelId: string;
  config: WidgetConfig;
  onUpdate: (channelId: string, field: string, value: unknown) => void;
}) {
  const channelDef = CHANNELS.find((c) => c.id === channelId);
  const channelConfig = config.channels.find((c) => c.id === channelId);
  if (!channelDef || !channelConfig) return null;

  const showPhone = channelDef.fields.includes("phone");
  const showEmail = channelDef.fields.includes("email");
  const showUsername = channelDef.fields.includes("username");
  const showUrl = channelDef.fields.includes("url");
  const showMessage = channelDef.fields.includes("presetMessage");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: channelDef.color }}
          />
          {channelDef.name} Settings
        </CardTitle>
        <CardDescription>{channelDef.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Display Label</Label>
          <Input
            value={channelConfig.label}
            onChange={(e) => onUpdate(channelId, "label", e.target.value)}
            placeholder={channelDef.name}
          />
        </div>
        {showPhone && (
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              value={channelConfig.phone}
              onChange={(e) => onUpdate(channelId, "phone", e.target.value)}
              placeholder="+1234567890"
            />
          </div>
        )}
        {showEmail && (
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              value={channelConfig.email}
              onChange={(e) => onUpdate(channelId, "email", e.target.value)}
              placeholder="hello@example.com"
            />
          </div>
        )}
        {showUsername && (
          <div className="space-y-2">
            <Label>Username / Handle</Label>
            <Input
              value={channelConfig.username}
              onChange={(e) => onUpdate(channelId, "username", e.target.value)}
              placeholder="username"
            />
          </div>
        )}
        {showUrl && (
          <div className="space-y-2">
            <Label>URL</Label>
            <Input
              value={channelConfig.url}
              onChange={(e) => onUpdate(channelId, "url", e.target.value)}
              placeholder="https://..."
            />
          </div>
        )}
        {showMessage && (
          <div className="space-y-2">
            <Label>Default Message</Label>
            <Textarea
              value={channelConfig.presetMessage}
              onChange={(e) =>
                onUpdate(channelId, "presetMessage", e.target.value)
              }
              rows={2}
            />
          </div>
        )}
        <div className="space-y-2">
          <Label>Agent Name (optional)</Label>
          <Input
            value={channelConfig.agentName}
            onChange={(e) => onUpdate(channelId, "agentName", e.target.value)}
            placeholder="e.g. Sales Team"
          />
        </div>
        <MediaInput
          label="Agent Avatar (optional)"
          value={channelConfig.agentAvatar}
          onChange={(url) => onUpdate(channelId, "agentAvatar", url)}
          accept="image"
        />
      </CardContent>
    </Card>
  );
}
