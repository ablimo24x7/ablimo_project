import type { Metadata } from "next";
import { hasLocale, defaultLocale, type Locale, localeBase, localeHome } from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/StructuredData";
import CorporateAccountsClient from "./_components/CorporateAccountsClient";
import { corporateContentEn, corporateContentAr } from "./_components/corporate-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const isAr = locale === "ar";
  const content = isAr ? corporateContentAr : corporateContentEn;

  return generateSeoMetadata({
    title: content.meta.title,
    description: content.meta.description,
    path: "/corporate-accounts",
    lang,
    keywords: content.meta.keywords,
  });
}

export default async function CorporateAccountsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const isAr = locale === "ar";
  const content = isAr ? corporateContentAr : corporateContentEn;
  const base = localeBase(lang);
  const home = localeHome(lang);

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: isAr ? "الرئيسية" : "Home", url: `${home}` },
          {
            name: isAr ? "حسابات الشركات" : "Corporate Accounts",
            url: `${base}/corporate-accounts`,
          },
        ]}
      />

      {/* FAQ Schema for Search Engine Rich Snippets */}
      <FAQJsonLd
        items={content.faqs.items.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
      />

      <main className="min-h-screen bg-[#070709] text-gray-200">
        <CorporateAccountsClient content={content} lang={lang} />
      </main>
    </>
  );
}
