import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press Releases - AB.Limo | Luxury Chauffeur Service",
  description:
    "Stay updated with the latest news, announcements, and press releases from AB.Limo. Read about our global expansion, partnerships, and innovations.",
};

export default function PressReleasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
