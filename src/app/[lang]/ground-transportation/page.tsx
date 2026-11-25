import { redirect } from "next/navigation";
import { localeBase } from "@/app/[lang]/dictionaries";

export default async function GroundTransportationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  redirect(`${localeBase(lang)}/services/ground-transportation`);
}

