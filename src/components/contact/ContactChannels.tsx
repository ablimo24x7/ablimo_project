import type { ContactChannelLink } from "@/lib/contact-channels";
import { WhatsAppIcon } from "@/components/chat/WhatsAppIcon";

function ChannelIcon({ id }: { id: string }) {
  const common = {
    className: "w-6 h-6",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    viewBox: "0 0 24 24",
  } as const;

  switch (id) {
    case "whatsapp":
      return <WhatsAppIcon className="w-6 h-6" />;
    case "phone":
    case "sms":
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      );
    case "email":
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      );
  }
}

export default function ContactChannels({
  channels,
  heading,
  hint,
}: {
  channels: ContactChannelLink[];
  heading: string;
  hint: string;
}) {
  if (channels.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">{heading}</h2>
      <p className="text-gray-400 text-sm mb-6">{hint}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {channels.map((channel) => (
          <a
            key={channel.id}
            href={channel.url}
            target={channel.url.startsWith("http") ? "_blank" : undefined}
            rel={channel.url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex items-start gap-4 bg-abDarkGray border border-gray-800 rounded-xl p-5 hover:border-abBlue transition-colors"
          >
            <span className="text-abBlue mt-0.5 shrink-0">
              <ChannelIcon id={channel.id} />
            </span>
            <span className="min-w-0">
              <span className="block text-white font-semibold text-sm group-hover:text-abBlue transition-colors">
                {channel.name}
              </span>
              <span className="block text-gray-400 text-sm break-all">
                {channel.value}
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
