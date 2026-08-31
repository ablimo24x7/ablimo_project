import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServicePage from "../_components/ServicePage";
import { resolveServicePage } from "@/lib/services";
import {
  getDictionary,
  hasLocale,
  defaultLocale,
  type Locale,
} from "@/app/[lang]/dictionaries";

const AIRPORT_SLUG = "airport-transfers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const resolved = await resolveServicePage(slug, lang);
  if (!resolved) return {};
  const title = resolved.seo?.metaTitle || resolved.content.title || "Service";
  const description =
    resolved.seo?.metaDescription || resolved.content.subtitle || "";
  return {
    title,
    description,
    openGraph: resolved.seo?.ogImage
      ? { title, description, images: [resolved.seo.ogImage] }
      : undefined,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const resolved = await resolveServicePage(slug, lang);
  if (!resolved) notFound();

  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <ServicePage
        params={params}
        content={resolved.content}
        breadcrumb={resolved.breadcrumb}
      />

      {slug === AIRPORT_SLUG && (
        <section className="max-w-7xl mx-auto px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(dict.servicePages.airportTransfers.subLinks as unknown as {
              slug: string;
              title: string;
            }[]).map((link) => (
              <Link
                key={link.slug}
                href={`/${lang}/services/${AIRPORT_SLUG}/${link.slug}`}
                className="bg-[#1c1d21] p-6 rounded-2xl hover:bg-[#2a2c35] transition-colors flex items-center justify-between"
              >
                <span className="font-semibold">{link.title}</span>
                <span className="text-abGold text-xl">&rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}