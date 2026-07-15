import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import FleetSection from "@/components/FleetSection";
import BrandOptions from "@/components/BrandOptions";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PricingSection />
      <FleetSection />
      <BrandOptions />
      <FAQSection />
      <Footer />
    </>
  );
}
