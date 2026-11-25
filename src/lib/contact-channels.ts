import { connectDB } from "@/lib/db";
import { ChatWidget } from "@/lib/models/ChatWidget";
import { buildChannelUrl, getChannelById } from "@/lib/chat/channels";

export interface ContactChannelLink {
  id: string;
  name: string;
  url: string;
  value: string;
}

const PRIORITY = [
  "whatsapp",
  "phone",
  "email",
  "telegram",
  "messenger",
  "viber",
  "sms",
] as const;

type LeanChannel = {
  id?: string;
  enabled?: boolean;
  label?: string;
  phone?: string;
  email?: string;
  username?: string;
  url?: string;
  presetMessage?: string;
};

/** Direct contact channels from the enabled chat widget config. */
export async function getContactChannelLinks(
  limit = 4
): Promise<ContactChannelLink[]> {
  try {
    const conn = await connectDB();
    if (!conn) return [];

    const widget = await ChatWidget.findOne({ enabled: true })
      .sort({ updatedAt: -1 })
      .lean()
      .catch(() => null);
    if (!widget) return [];

    const channels = ((widget as { channels?: LeanChannel[] }).channels ?? []).filter(
      (c): c is LeanChannel => Boolean(c && c.id && c.enabled)
    );
    const fallbackMessage =
      (widget as { whatsappPopupMsg?: string }).whatsappPopupMsg || "";

    const links: ContactChannelLink[] = [];
    for (const id of PRIORITY) {
      if (links.length >= limit) break;
      const cfg = channels.find((c) => c.id === id);
      if (!cfg) continue;

      const def = getChannelById(id);
      if (!def) continue;

      const config: Record<string, string> = {
        phone: cfg.phone ?? "",
        email: cfg.email ?? "",
        username: cfg.username ?? "",
        url: cfg.url ?? "",
        presetMessage: cfg.presetMessage || fallbackMessage || "Hello AB",
      };
      if (def.fields.some((field) => !config[field])) continue;

      const target = buildChannelUrl(def, config);
      if (!target || target === "#") continue;

      const value = config.phone || config.email || config.username || config.url;
      if (!value) continue;

      links.push({ id, name: cfg.label || def.name, url: target, value });
    }
    return links;
  } catch {
    return [];
  }
}
