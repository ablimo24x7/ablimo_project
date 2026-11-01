import { Dictionary } from "@/app/[lang]/dictionaries";

const cardIcons = [
  { icon: "fa-satellite-dish", color: "text-abBlue", hoverBorder: "hover:border-abBlue" },
  { icon: "fa-file-invoice-dollar", color: "text-abOrange", hoverBorder: "hover:border-abOrange" },
  { icon: "fa-id-card-clip", color: "text-abGreen", hoverBorder: "hover:border-abGreen" },
];

export default function DutyOfCareSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="duty-of-care" className="py-24 bg-abBlack text-white relative overflow-hidden border-b border-gray-900">
      <div className="absolute inset-0 bg-[#050505]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <i className="fa-solid fa-shield-halved text-4xl text-abBlue mb-4"></i>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{dict.home.dutyOfCare.title}</h2>
          <p className="text-gray-400 text-lg">{dict.home.dutyOfCare.desc}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {dict.home.dutyOfCare.cards.map((card, i) => (
            <div key={i} className={`bg-abDarkGray border border-gray-800 p-8 rounded-xl ${cardIcons[i].hoverBorder} transition-colors duration-300`}>
              <i className={`fa-solid ${cardIcons[i].icon} text-2xl ${cardIcons[i].color} mb-6`}></i>
              <h4 className="text-xl font-bold mb-3">{card.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
