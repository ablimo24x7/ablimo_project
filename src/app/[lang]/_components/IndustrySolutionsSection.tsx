import { Dictionary } from "@/app/[lang]/dictionaries";

export default function IndustrySolutionsSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">{dict.home.industrySolutions.badge}</h2>
        <p className="text-gray-900 text-2xl font-semibold mb-10">{dict.home.industrySolutions.title}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {dict.home.industrySolutions.items.map((industry) => (
            <a
              key={industry}
              href="#"
              className="px-6 py-3 rounded-md bg-gray-50 border border-gray-200 text-gray-700 hover:border-abGold hover:text-abGold hover:shadow-md transition-all font-medium text-sm"
            >
              {industry}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
