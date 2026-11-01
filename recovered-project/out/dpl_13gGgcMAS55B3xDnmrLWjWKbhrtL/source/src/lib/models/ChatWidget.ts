import { Schema, model, models, type InferSchemaType } from "mongoose";

const channelConfigSchema = new Schema(
  {
    id: { type: String, required: true },
    enabled: { type: Boolean, default: false },
    label: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    username: { type: String, default: "" },
    url: { type: String, default: "" },
    presetMessage: { type: String, default: "" },
    agentName: { type: String, default: "" },
    agentAvatar: { type: String, default: "" },
  },
  { _id: false }
);

const targetingSchema = new Schema(
  {
    pages: { type: [String], default: [] },
    excludePages: { type: [String], default: [] },
    countries: { type: [String], default: [] },
    trafficSources: { type: [String], default: [] },
    devices: { type: [String], default: ["desktop", "mobile"] },
    showFrom: { type: String, default: "" },
    showUntil: { type: String, default: "" },
    showDays: { type: [Number], default: [0, 1, 2, 3, 4, 5, 6] },
    showHoursFrom: { type: String, default: "" },
    showHoursUntil: { type: String, default: "" },
  },
  { _id: false }
);

const chatWidgetSchema = new Schema(
  {
    name: { type: String, default: "Default Widget" },
    enabled: { type: Boolean, default: true },
    channels: { type: [channelConfigSchema], default: [] },
    position: {
      type: String,
      enum: ["bottom-right", "bottom-left"],
      default: "bottom-right",
    },
    primaryColor: { type: String, default: "#25D366" },
    backgroundColor: { type: String, default: "#ffffff" },
    textColor: { type: String, default: "#333333" },
    iconSize: { type: Number, default: 60 },
    ctaMessage: { type: String, default: "Chat with us!" },
    ctaTextColor: { type: String, default: "#ffffff" },
    ctaBgColor: { type: String, default: "#25D366" },
    showCta: { type: Boolean, default: true },
    animation: {
      type: String,
      enum: ["none", "bounce", "pulse", "shake"],
      default: "bounce",
    },
    whatsappPopup: { type: Boolean, default: false },
    whatsappPopupHeader: { type: String, default: "Chat with us on WhatsApp" },
    whatsappPopupMsg: {
      type: String,
      default: "Hi! I have a question about your services.",
    },
    showAgents: { type: Boolean, default: false },
    targeting: { type: targetingSchema, default: () => ({}) },
    showOnPages: { type: [String], default: ["*"] },
  },
  { timestamps: true }
);

export type ChatWidgetDoc = InferSchemaType<typeof chatWidgetSchema>;
export type ChannelConfig = InferSchemaType<typeof channelConfigSchema>;

export const ChatWidget =
  models.ChatWidget || model("ChatWidget", chatWidgetSchema);
