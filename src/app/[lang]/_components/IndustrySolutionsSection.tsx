const industries = [
  "Events & Exhibitions",
  "Government & Ministries",
  "Aviation & FBO Ops",
  "Oil & Gas Logistics",
  "Religious Tourism (Umrah/Hajj)",
  "Sports & Tournament Transport",
];

export default function IndustrySolutionsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">Dedicated Industry Solutions</h2>
        <p className="text-gray-900 text-2xl font-semibold mb-10">Tailored logistics for specialized procurement teams.</p>
        <div className="flex flex-wrap justify-center gap-3">
          {industries.map((industry) => (
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
