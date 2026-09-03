import HeroSection from "@/app/[lang]/_components/HeroSection";
import EventLogisticsSection from "@/app/[lang]/_components/EventLogisticsSection";
import DutyOfCareSection from "@/app/[lang]/_components/DutyOfCareSection";
import FleetSection from "@/app/[lang]/_components/FleetSection";
import IndustrySolutionsSection from "@/app/[lang]/_components/IndustrySolutionsSection";
import { getDictionary, type Locale } from "./dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <HeroSection dict={dict} />
      <EventLogisticsSection dict={dict} />
      <DutyOfCareSection dict={dict} />
      <FleetSection dict={dict} />
      <IndustrySolutionsSection dict={dict} />
    </>
  );
}
