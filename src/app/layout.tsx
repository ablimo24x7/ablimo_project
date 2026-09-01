import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./[lang]/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AB Limo",
  description: "AB Limo - Premium Limousine Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased dark`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="bg-abGray text-gray-800 antialiased selection:bg-abGold selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
