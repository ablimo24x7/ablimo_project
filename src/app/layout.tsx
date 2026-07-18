import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "AB.Limo - Luxury Chauffeur Service",
  description:
    "Premium luxury chauffeur service. Book your ride with AB.Limo for airport transfers, business travel, and special events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body className="text-white antialiased overflow-x-hidden selection:bg-gray-600">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
