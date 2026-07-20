import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import FleetSection from "@/components/FleetSection";
import BrandOptions from "@/components/BrandOptions";
import FAQSection from "@/components/FAQSection";
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
      <ServicesSection />
      <AboutSection />
      <PricingSection />
      <FleetSection />
      <BrandOptions />
      <FAQSection />
    </>
  );
}
