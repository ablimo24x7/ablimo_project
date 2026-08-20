import HeroSection from "@/app/[lang]/_components/HeroSection";
import EventLogisticsSection from "@/app/[lang]/_components/EventLogisticsSection";
import DutyOfCareSection from "@/app/[lang]/_components/DutyOfCareSection";
import FleetSection from "@/app/[lang]/_components/FleetSection";
import IndustrySolutionsSection from "@/app/[lang]/_components/IndustrySolutionsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <EventLogisticsSection />
      <DutyOfCareSection />
      <FleetSection />
      <IndustrySolutionsSection />
    </>
  );
}
