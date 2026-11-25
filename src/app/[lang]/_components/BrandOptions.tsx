import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const brands = [
  { src: "/logo (1).png", alt: "Audi" },
  { src: "/logo (2).png", alt: "BMW" },
  { src: "/logo (3).png", alt: "Porsche" },
  { src: "/logo (4).png", alt: "Mercedes" },
  { src: "/logo (5).png", alt: "Tesla" },
  { src: "/logo (6).png", alt: "Volkswagen" },
];

export default function BrandOptions({ dict }: { dict: Dictionary }) {
  const brandsDict = dict.home.brands;

  return (
    <section className="bg-[#2f2e34] py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/3">
          <h4 className="text-gray-400 uppercase tracking-widest text-xs mb-4">
            {brandsDict.subtitle}
          </h4>
          <h2 className="text-4xl font-bold leading-tight">
            {brandsDict.heading1}
            <br />
            <span className="italic font-serif font-light">
              {brandsDict.heading2}
            </span>
          </h2>
        </div>

        <div className="md:w-2/3 overflow-hidden relative">
          <div className="animate-marquee flex gap-16 items-center">
            {brands.map((brand) => (
              <Image key={`first-${brand.alt}`} src={brand.src} alt={brand.alt} width={100} height={50} className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            ))}
            {brands.map((brand) => (
              <Image key={`second-${brand.alt}`} src={brand.src} alt={brand.alt} width={100} height={50} className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
