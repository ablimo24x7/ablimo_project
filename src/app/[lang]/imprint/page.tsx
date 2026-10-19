import type { Metadata } from "next";
import Link from "next/link";
import {
  getDictionary,
  hasLocale,
  defaultLocale,
  type Locale,
  localeHome,
} from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const isAr = locale === "ar";
  return generateSeoMetadata({
    title: isAr ? dict.imprint.title : "Legal Notice",
    description: isAr
      ? "إشعار قانوني ومعلومات الشركة لـ AB.Limo، بما في ذلك مواقع المكاتب في دول الخليج وتفاصيل الاتصال."
      : "Legal notice and company information for AB.Limo, including our GCC office locations and contact details.",
    path: "/imprint",
    lang,
    keywords: "AB.Limo legal notice, company information, AB.Limo, legal disclosure, impressum",
  });
}

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-[#1c1d21]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30] via-[#1c1d21] to-[#292a30]" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide text-white">
            {dict.imprint.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
              {dict.imprint.breadcrumb.home}
            </Link>
            <span>/</span>
            <span className="text-white">{dict.imprint.breadcrumb.imprint}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Company Information */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Company Information</h2>
            <div className="bg-[#1c1d21] rounded-lg p-8 border border-gray-700/50 text-gray-300 leading-relaxed space-y-4">
              <p>
                <strong className="text-white">AB.Limo</strong>
              </p>
              <p>Headquarters: Malaz Area, Umar Ibn Abdulaziz Road</p>
              <p>Building Number 59, Second Floor</p>
              <p>Riyadh 12626</p>
              <p>Kingdom of Saudi Arabia</p>
              <div className="pt-4 space-y-2">
                <p>
                  Phone:{" "}
                  <a
                    href="tel:+923135237377"
                    className="text-white underline hover:text-gray-300 transition-colors"
                  >
                    +92 313 523 7377
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:hello@ab.limo"
                    className="text-white underline hover:text-gray-300 transition-colors"
                  >
                    hello@ab.limo
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <a
                    href="https://www.ab.limo"
                    className="text-white underline hover:text-gray-300 transition-colors"
                  >
                    www.ab.limo
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Regional Offices */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Regional Offices</h2>
            <div className="bg-[#1c1d21] rounded-lg p-8 border border-gray-700/50 text-gray-300 leading-relaxed space-y-6">
              <div>
                <p>
                  <strong className="text-white">
                    Headquarters (Primary):
                  </strong>
                </p>
                <p>Malaz Area, Umar Ibn Abdulaziz Road, Building Number 59</p>
                <p>Second Floor, Riyadh 12626, Saudi Arabia</p>
              </div>
              <div>
                <p>
                  <strong className="text-white">Dubai:</strong>
                </p>
                <p>Al Khabaisi, Deira, Suite 206, DBC Building</p>
                <p>Dubai, United Arab Emirates</p>
              </div>
              <div>
                <p>
                  <strong className="text-white">Abu Dhabi:</strong>
                </p>
                <p>Muhammad Bin Zayed City, Office 3, Building C57</p>
                <p>Abu Dhabi, United Arab Emirates</p>
              </div>
              <div>
                <p>
                  <strong className="text-white">Doha:</strong>
                </p>
                <p>Street No. 830, Al Maarif Al Rufaa, Building No. 54, Zone 17</p>
                <p>Doha, Qatar</p>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Disclaimer</h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                The content on our website and application has been created with
                the utmost care. However, AB.Limo cannot guarantee the
                accuracy, completeness, or timeliness of the content provided.
                As a service provider, we are responsible for our own content on
                these pages in accordance with applicable laws in the
                jurisdictions where we operate.
              </p>
              <p>
                However, we are not obligated to monitor transmitted or stored
                third-party information or to investigate circumstances that
                indicate illegal activity. Obligations to remove or block the
                use of information under general laws remain unaffected.
                Liability in this regard, however, is only possible from the
                point in time at which a concrete infringement becomes known.
                If we become aware of any such infringements, we will remove
                the affected content immediately.
              </p>
              <p>
                Our website contains links to external third-party websites
                whose content we have no influence over. Therefore, we cannot
                accept any liability for the content of these linked sites. The
                respective provider or operator of the pages is always
                responsible for the content of the linked pages.
              </p>
              <p>
                Linked pages were checked for possible legal violations at the
                time of linking. Illegal content was not recognizable at the
                time of linking. However, permanent monitoring of the content
                of linked pages is not reasonable without concrete evidence of
                an infringement. If we become aware of any infringements, we
                will remove such links immediately.
              </p>
            </div>
          </section>

          {/* Copyright */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Copyright Notice</h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                The content and works created by the site operators on these
                pages are subject to applicable copyright law. Duplication,
                processing, distribution, or any form of commercialization of
                such material beyond the scope of the copyright law requires
                the prior written consent of its respective author or creator.
              </p>
              <p>
                Downloads and copies of this page are only permitted for
                private, non-commercial use. Insofar as the content on this
                site was not created by the operator, the copyrights of third
                parties are respected. In particular, third-party content is
                identified as such. Should you nonetheless become aware of a
                copyright infringement, please inform us accordingly. If we
                become aware of any infringements, we will remove such content
                immediately.
              </p>
              <p>
                &copy; {new Date().getFullYear()} AB.Limo. All rights
                reserved.
              </p>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">
              Dispute Resolution
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Any dispute, claim, or controversy arising out of or relating
                to our Services shall be resolved in accordance with our Terms
                of Use, which provide for binding arbitration administered by
                the International Chamber of Commerce (ICC) with the seat of
                arbitration in Riyadh, Kingdom of Saudi Arabia.
              </p>
              <p>
                Our contact details for any dispute-related correspondence can
                be found above in this legal notice.
              </p>
            </div>
          </section>

          {/* Regulatory Compliance */}
          <section>
            <h2 className="text-2xl font-bold mb-8">
              Regulatory Compliance
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                AB.Limo operates in compliance with all applicable laws and
                transportation regulations in each jurisdiction where we
                operate, including the Kingdom of Saudi Arabia, the United
                Arab Emirates, Qatar, Oman, Bahrain, and Kuwait.
              </p>
              <p>
                Our chauffeur services are provided in accordance with local
                transportation licensing requirements in each jurisdiction where
                we operate. All chauffeurs hold valid professional licenses and
                meet the safety and quality standards required by applicable law.
              </p>
              <p>
                For regulatory inquiries, please contact our compliance team at{" "}
                <a
                  href="mailto:hello@ab.limo"
                  className="text-white underline hover:text-gray-300 transition-colors"
                >
                  hello@ab.limo
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </section>

    </>
  );
}
