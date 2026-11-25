import { permanentRedirect } from "next/navigation";
import { localeBase } from "@/app/[lang]/dictionaries";

export default async function CorporationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  permanentRedirect(`${localeBase(lang)}/corporate-accounts`);
}
