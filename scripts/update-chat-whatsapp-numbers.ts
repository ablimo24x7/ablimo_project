/**
 * Script to configure WhatsApp numbers for the Chat Widget:
 * - Gulf countries (UAE, Qatar, Oman, Kuwait, Bahrain): +971 50 918 0556
 * - Head Office (Saudi Arabia + cities) and Universal (Homepage & general pages): +966 59 697 8125
 *
 * Usage: cmd /c "npx.cmd tsx scripts/update-chat-whatsapp-numbers.ts"
 */
import "dotenv/config";
import { connectDB } from "../src/lib/db";
import { ChatWidget } from "../src/lib/models/ChatWidget";
import { CHANNELS } from "../src/lib/chat/channels";

const GULF_PHONE = "+971 50 918 0556";
const SAUDI_UNIVERSAL_PHONE = "+966 59 697 8125";

const COUNTRY_NUMBERS = [
  { countrySlug: "uae", number: GULF_PHONE },
  { countrySlug: "qatar", number: GULF_PHONE },
  { countrySlug: "oman", number: GULF_PHONE },
  { countrySlug: "kuwait", number: GULF_PHONE },
  { countrySlug: "bahrain", number: GULF_PHONE },
  { countrySlug: "saudi-arabia", number: SAUDI_UNIVERSAL_PHONE },
];

async function run() {
  console.log("Connecting to database...");
  await connectDB();
  console.log("Connected.");

  let widget = await ChatWidget.findOne({ enabled: true });
  if (!widget) {
    widget = await ChatWidget.findOne();
  }

  const initialChannels = CHANNELS.map((ch) => ({
    id: ch.id,
    enabled: ch.id === "whatsapp",
    label: ch.name,
    phone: ch.id === "whatsapp" ? SAUDI_UNIVERSAL_PHONE : "",
    email: "",
    username: "",
    url: "",
    presetMessage: "Hello! I have a question about your services.",
    agentName: "",
    agentAvatar: "",
  }));

  if (!widget) {
    console.log("No existing ChatWidget found. Creating default...");
    widget = new ChatWidget({
      name: "Default Widget",
      enabled: true,
      channels: initialChannels,
      universalWhatsappNumber: SAUDI_UNIVERSAL_PHONE,
      cityWhatsappNumber: "",
      countryWhatsappNumbers: COUNTRY_NUMBERS,
    });
  } else {
    console.log("Updating existing ChatWidget (_id: " + widget._id + ")...");
    widget.enabled = true;
    widget.universalWhatsappNumber = SAUDI_UNIVERSAL_PHONE;
    widget.cityWhatsappNumber = "";
    widget.countryWhatsappNumbers = COUNTRY_NUMBERS;

    // Ensure channels exist and whatsapp is enabled with fallback phone
    if (!widget.channels || widget.channels.length === 0) {
      widget.channels = initialChannels;
    } else {
      let foundWhatsapp = false;
      for (const ch of widget.channels) {
        if (ch.id === "whatsapp") {
          ch.enabled = true;
          ch.phone = SAUDI_UNIVERSAL_PHONE;
          foundWhatsapp = true;
        }
      }
      if (!foundWhatsapp) {
        widget.channels.push({
          id: "whatsapp",
          enabled: true,
          label: "WhatsApp",
          phone: SAUDI_UNIVERSAL_PHONE,
          email: "",
          username: "",
          url: "",
          presetMessage: "Hello! I have a question about your services.",
          agentName: "",
          agentAvatar: "",
        });
      }
    }
  }

  await widget.save();
  console.log("Successfully saved ChatWidget configuration!");
  console.log("\nConfig summary:");
  console.log("- Enabled:", widget.enabled);
  console.log("- Universal WhatsApp Number:", widget.universalWhatsappNumber);
  console.log("- City WhatsApp Number:", widget.cityWhatsappNumber || "(Inherits country number)");
  console.log("- Country WhatsApp Numbers:", JSON.stringify(widget.countryWhatsappNumbers, null, 2));
  const waCh = widget.channels.find((c: any) => c.id === "whatsapp");
  console.log("- WhatsApp Channel Phone (fallback):", waCh?.phone);

  const { applyWhatsappNumber, parseWidgetPath, canonicalCountrySlug } = await import("../src/lib/chat/number-resolution");

  console.log("\n--- Verification Across Pages ---");
  const testPaths = [
    "/en",
    "/en/services/chauffeur-vip",
    "/en/corporate-accounts",
    "/en/locations/saudi-arabia",
    "/en/locations/saudi-arabia/riyadh",
    "/en/services/chauffeur-vip/saudi-arabia/riyadh",
    "/en/locations/uae",
    "/en/locations/uae/dubai",
    "/en/services/chauffeur-vip/uae/dubai",
    "/en/locations/qatar",
    "/en/locations/qatar/doha",
    "/en/services/chauffeur-vip/qatar/doha",
    "/en/locations/oman",
    "/en/locations/oman/muscat",
    "/en/locations/kuwait",
    "/en/locations/kuwait/kuwait-city",
    "/en/locations/bahrain",
    "/en/locations/bahrain/manama",
  ];

  for (const path of testPaths) {
    const page = parseWidgetPath(path);
    const isCityPage =
      (page.kind === "location" && page.isCity) ||
      (page.kind === "service" && Boolean(page.citySlug));
    const effective = applyWhatsappNumber(widget.toObject ? widget.toObject() : widget, {
      countrySlug: canonicalCountrySlug(page.countrySlug),
      isCityPage,
    });
    const wa = effective.channels.find((c: any) => c.id === "whatsapp");
    console.log(`${path.padEnd(48)} -> ${wa?.phone}`);
  }

  process.exit(0);
}

run().catch((err) => {
  console.error("Error executing script:", err);
  process.exit(1);
});
