import { Dictionary } from "@/app/[lang]/dictionaries";

export default function DutyOfCareSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="duty-of-care" className="py-24 bg-abBlack text-white relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-abDarkGray to-transparent opacity-50 transform skew-x-12 translate-x-32 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <i className="fa-solid fa-shield-halved text-4xl text-abGold mb-4"></i>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{dict.home.dutyOfCare.title}</h2>
          <p className="text-gray-400 text-lg">{dict.home.dutyOfCare.desc}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {dict.home.dutyOfCare.cards.map((card, i) => (
            <div key={i} className="bg-abDarkGray/50 border border-gray-800 p-8 rounded-xl backdrop-blur-sm hover:border-abGold transition-colors duration-300 text-center md:text-left">
              <i className="fa-solid fa-satellite-dish text-2xl text-abGold mb-6"></i>
              <h4 className="text-xl font-bold mb-3">{card.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
