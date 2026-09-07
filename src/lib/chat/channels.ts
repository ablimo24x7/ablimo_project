export interface ChannelDefinition {
  id: string;
  name: string;
  icon: string;
  color: string;
  urlPattern: string;
  fields: string[];
  description: string;
}

export const CHANNELS: ChannelDefinition[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "whatsapp",
    color: "#25D366",
    urlPattern: "https://wa.me/{phone}?text={message}",
    fields: ["phone", "presetMessage"],
    description: "Chat via WhatsApp",
  },
  {
    id: "messenger",
    name: "Facebook Messenger",
    icon: "messenger",
    color: "#0084FF",
    urlPattern: "https://m.me/{username}",
    fields: ["username"],
    description: "Chat via Facebook Messenger",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: "telegram",
    color: "#0088CC",
    urlPattern: "https://t.me/{username}",
    fields: ["username"],
    description: "Chat via Telegram",
  },
  {
    id: "viber",
    name: "Viber",
    icon: "viber",
    color: "#7360F2",
    urlPattern: "viber://chat?number={phone}",
    fields: ["phone"],
    description: "Chat via Viber",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "instagram",
    color: "#E4405F",
    urlPattern: "https://instagram.com/{username}",
    fields: ["username"],
    description: "Message via Instagram",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "tiktok",
    color: "#000000",
    urlPattern: "https://tiktok.com/@{username}",
    fields: ["username"],
    description: "Connect on TikTok",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: "snapchat",
    color: "#FFFC00",
    urlPattern: "https://snapchat.com/add/{username}",
    fields: ["username"],
    description: "Connect on Snapchat",
  },
  {
    id: "x",
    name: "X (Twitter)",
    icon: "x",
    color: "#000000",
    urlPattern: "https://x.com/{username}",
    fields: ["username"],
    description: "Connect on X",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "linkedin",
    color: "#0A66C2",
    urlPattern: "https://linkedin.com/in/{username}",
    fields: ["username"],
    description: "Connect on LinkedIn",
  },
  {
    id: "line",
    name: "Line",
    icon: "line",
    color: "#00B900",
    urlPattern: "https://line.me/ti/p/{username}",
    fields: ["username"],
    description: "Chat via Line",
  },
  {
    id: "wechat",
    name: "WeChat",
    icon: "wechat",
    color: "#09B83E",
    urlPattern: "weixin://dl/chat?{username}",
    fields: ["username"],
    description: "Chat via WeChat",
  },
  {
    id: "discord",
    name: "Discord",
    icon: "discord",
    color: "#5865F2",
    urlPattern: "{url}",
    fields: ["url"],
    description: "Connect on Discord",
  },
  {
    id: "slack",
    name: "Slack",
    icon: "slack",
    color: "#4A154B",
    urlPattern: "{url}",
    fields: ["url"],
    description: "Connect on Slack",
  },
  {
    id: "phone",
    name: "Phone Call",
    icon: "phone",
    color: "#0D904F",
    urlPattern: "tel:{phone}",
    fields: ["phone"],
    description: "Call us directly",
  },
  {
    id: "sms",
    name: "SMS",
    icon: "sms",
    color: "#25D366",
    urlPattern: "sms:{phone}?body={message}",
    fields: ["phone", "presetMessage"],
    description: "Send us an SMS",
  },
  {
    id: "email",
    name: "Email",
    icon: "email",
    color: "#EA4335",
    urlPattern: "mailto:{email}?subject={subject}&body={message}",
    fields: ["email", "presetMessage"],
    description: "Send us an email",
  },
  {
    id: "google-maps",
    name: "Google Maps",
    icon: "google-maps",
    color: "#4285F4",
    urlPattern: "{url}",
    fields: ["url"],
    description: "Find us on Google Maps",
  },
  {
    id: "waze",
    name: "Waze",
    icon: "waze",
    color: "#33CCFF",
    urlPattern: "{url}",
    fields: ["url"],
    description: "Navigate with Waze",
  },
];

export function buildChannelUrl(
  channel: ChannelDefinition,
  config: Record<string, string>
): string {
  let url = channel.urlPattern;
  const phone = (config.phone || "").replace(/[^0-9]/g, "");
  const message = encodeURIComponent(config.presetMessage || "");
  const subject = encodeURIComponent("Contact from website");

  url = url.replace("{phone}", phone);
  url = url.replace("{message}", message);
  url = url.replace("{username}", config.username || "");
  url = url.replace("{email}", config.email || "");
  url = url.replace("{subject}", subject);
  url = url.replace("{url}", config.url || "#");

  return url;
}

export function getChannelById(id: string): ChannelDefinition | undefined {
  return CHANNELS.find((c) => c.id === id);
}
