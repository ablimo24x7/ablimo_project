import Link from "next/link";
import { Dictionary, localeBase } from "@/app/[lang]/dictionaries";

export default function TellUsCtaSection({
  dict,
  lang = "en-US",
}: {
  dict: Dictionary;
  lang?: string;
}) {
  const t = dict.home.faq;

  return (
    <section className="py-20 bg-abBlack border-b border-gray-900 relative z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t.tellUsTitle}
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{t.tellUsDesc}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`${localeBase(lang)}/contact`}
            className="px-8 py-3 rounded-full bg-abBlue hover:bg-abServiceBlue text-white text-sm font-semibold transition-colors"
          >
            {t.ctaProposal}
          </Link>
          <Link
            href={`${localeBase(lang)}/contact`}
            className="px-8 py-3 rounded-full border border-gray-600 hover:border-abBlue text-white text-sm font-semibold transition-colors"
          >
            {t.ctaTransfer}
          </Link>
        </div>
      </div>
    </section>
  );
}
