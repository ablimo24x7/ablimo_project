import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Analytics from "@/components/analytics/google-analytics";
import AnalyticsListener from "@/components/analytics/analytics-listener";
import "./[lang]/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "AB.Limo | Premium Executive & Corporate Mobility",
    template: "%s | AB.Limo",
  },
  description:
    "AB.Limo provides premium chauffeur-driven transportation across the GCC and worldwide. Executive transfers, corporate mobility, event logistics, and airport services.",
  metadataBase: new URL("https://www.ab.limo"),
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var rtl=/^\\/(ar)(\\/|$)/.test(location.pathname);document.documentElement.lang=rtl?'ar':'en';document.documentElement.dir=rtl?'rtl':'ltr';}catch(e){}})();`,
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="bg-abGray text-gray-800 antialiased selection:bg-abBlue selection:text-white overflow-x-hidden">
        {children}
        <AnalyticsListener />
        <Analytics />
      </body>
    </html>
  );
}
