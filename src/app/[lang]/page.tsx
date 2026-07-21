import HeroSection from "@/app/[lang]/_components/HeroSection";
import ServicesSection from "@/app/[lang]/_components/ServicesSection";
import AboutSection from "@/app/[lang]/_components/AboutSection";
import PricingSection from "@/app/[lang]/_components/PricingSection";
import FleetSection from "@/app/[lang]/_components/FleetSection";
import BrandOptions from "@/app/[lang]/_components/BrandOptions";
import FAQSection from "@/app/[lang]/_components/FAQSection";
import {
  getDictionary,
  hasLocale,
  defaultLocale,
  type Locale,
} from "@/app/[lang]/dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <HeroSection dict={dict} />
      <ServicesSection dict={dict} />
      <AboutSection dict={dict} />
      <PricingSection dict={dict} />
      <FleetSection dict={dict} />
      <BrandOptions dict={dict} />
      <FAQSection dict={dict} />
    </>
  );
}
