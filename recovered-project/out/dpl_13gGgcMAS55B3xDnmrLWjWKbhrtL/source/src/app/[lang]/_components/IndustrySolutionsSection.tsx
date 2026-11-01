import { Dictionary } from "@/app/[lang]/dictionaries";

const industryHoverColors = [
  "hover:border-abBlue hover:text-abBlue",
  "hover:border-abOrange hover:text-abOrange",
  "hover:border-abGreen hover:text-abGreen",
  "hover:border-abRed hover:text-abRed",
  "hover:border-abYellow hover:text-abYellow",
  "hover:border-abBlue hover:text-abBlue",
];

export default function IndustrySolutionsSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20 bg-abBlack border-b border-gray-900 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4">{dict.home.industrySolutions.badge}</h2>
        <p className="text-white text-2xl font-semibold mb-10">{dict.home.industrySolutions.title}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {dict.home.industrySolutions.items.map((industry, i) => (
            <a
              key={industry}
              href="#"
              className={`px-6 py-3 rounded bg-abDarkGray border border-gray-800 text-gray-300 ${industryHoverColors[i % industryHoverColors.length]} transition-all font-medium text-sm`}
            >
              {industry}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
