import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock } from "lucide-react";
import ServicePage from "../_components/ServicePage";
import PageRenderer from "@/components/services/sections/page-renderer";
import { resolveServicePage } from "@/lib/services";
import { getAllPublishedArticlesFiltered } from "@/lib/blog";
import {
  getDictionary,
  hasLocale,
  defaultLocale,
  type Locale,
  localeBase,
  localeHome,
} from "@/app/[lang]/dictionaries";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { generateSeoMetadata, heroHeadingToTitle } from "@/lib/seo";
import type { PageSection } from "@/components/services/sections/section-types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const resolved = await resolveServicePage(slug, lang);
  if (!resolved) return {};

  // Tab title mirrors the hero H1 (content.title + content.titleHighlight).
  const hero = resolved.pageSections?.find(
    (s: PageSection) => s.type === "hero" && s.enabled
  );
  const heroContent = hero?.content as Record<string, unknown> | undefined;
  const heroTitle = heroHeadingToTitle(
    heroContent?.title as string | undefined,
    heroContent?.titleHighlight as string | undefined
  );

  const title =
    heroTitle ||
    resolved.seo?.metaTitle ||
    resolved.content.title ||
    "Service";
  const description =
    resolved.seo?.metaDescription || resolved.content.subtitle || "";
  const keywords = `${title}, AB, luxury chauffeur, ${title} service, premium transportation`;
  return generateSeoMetadata({
    title,
    description,
    path: `/services/${slug}`,
    lang,
    keywords,
    ogImage: resolved.seo?.ogImage,
  });
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
  const isArabic = locale.split("-")[0] === "ar";
  const b = dict.blog;

  const relatedArticles = await getAllPublishedArticlesFiltered({
    serviceSlug: slug,
    locale,
    limit: 3,
  });

  const hasPageSections = resolved.pageSections && resolved.pageSections.length > 0;

  return (
    <>
      <ServiceJsonLd
        name={resolved.content.title}
        description={resolved.content.subtitle || ""}
        url={`${localeBase(lang)}/services/${slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${localeHome(lang)}` },
          { name: "Services", url: `${localeBase(lang)}/services` },
          { name: resolved.content.title, url: `${localeBase(lang)}/services/${slug}` },
        ]}
      />
      {hasPageSections ? (
        <PageRenderer
          sections={resolved.pageSections!}
          serviceName={resolved.content.title}
          serviceUrl={`${localeBase(lang)}/services/${slug}`}
        />
      ) : (
        <ServicePage
          params={params}
          content={resolved.content}
          breadcrumb={resolved.breadcrumb}
          serviceName={resolved.content.title}
          serviceUrl={`${localeBase(lang)}/services/${slug}`}
        />
      )}

      {slug === "airport-transfers" && (
        <section
          aria-label={dict.footer.explore.airportTransfers}
          className="max-w-7xl mx-auto px-8 pb-12 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
              <Link
                href={`${localeBase(lang)}/services/airport-transfers/pickup`}
                className="text-gray-400 hover:text-white transition-colors underline underline-offset-4 decoration-gray-700"
              >
                {dict.servicePages.airportTransferPickup.title}
              </Link>
              <Link
                href={`${localeBase(lang)}/services/airport-transfers/drop-off`}
                className="text-gray-400 hover:text-white transition-colors underline underline-offset-4 decoration-gray-700"
              >
                {dict.servicePages.airportTransferDropOff.title}
              </Link>
              <Link
                href={`${localeBase(lang)}/services/airport-transfers/vip-tarmac`}
                className="text-gray-400 hover:text-white transition-colors underline underline-offset-4 decoration-gray-700"
              >
                {dict.servicePages.airportTransferVipTarmac.title}
              </Link>
            </div>
          </div>
        </section>
      )}

      {relatedArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 pb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            {b.relatedArticles}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`${localeBase(lang)}/services/${article.slug.replace(/^services\//, "")}`}
                className="group block bg-[#1c1d21] rounded-2xl overflow-hidden hover:bg-[#2a2c35] transition-colors"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      article.articleMedia?.heroCoverMedia?.url ||
                      "https://images.unsplash.com/photo-1547548731-e95343697eb4?q=80&w=600&auto=format&fit=crop"
                    }
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white line-clamp-2 mb-2 group-hover:text-abBlue transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.date).toLocaleDateString(isArabic ? "ar-SA" : "en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime} {b.minRead}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}