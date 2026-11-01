import Image from "next/image";
import { Dictionary } from "@/app/[lang]/dictionaries";

const vehicles = [
  {
    badgeStyle: "bg-[#111] border border-gray-700 text-white",
    image: "/cars/sedans/msc.png",
    paxIcon: "fa-solid fa-user-tie",
    accentColor: "abBlue",
    hoverBorder: "hover:border-abBlue",
    subtitleColor: "text-abBlue",
    buttonHover: "group-hover:border-abBlue",
  },
  {
    badgeStyle: "bg-[#111] border border-gray-700 text-white",
    image: "/cars/suvs/CADILAC.png",
    paxIcon: "fa-solid fa-user-tie",
    accentColor: "abOrange",
    hoverBorder: "hover:border-abOrange",
    subtitleColor: "text-abOrange",
    buttonHover: "group-hover:border-abOrange",
  },
  {
    badgeStyle: "bg-[#111] border border-gray-700 text-white shadow",
    image: "/cars/vans/Sprinter.png",
    paxIcon: "fa-solid fa-users",
    accentColor: "abRed",
    hoverBorder: "hover:border-abRed",
    subtitleColor: "text-abRed",
    buttonHover: "group-hover:border-abRed",
  },
  {
    badgeStyle: "bg-[#111] border border-gray-700 text-white shadow",
    image: "/cars/vans/V_Class.png",
    paxIcon: "fa-solid fa-users-viewfinder",
    accentColor: "abGreen",
    hoverBorder: "hover:border-abGreen",
    subtitleColor: "text-abGreen",
    buttonHover: "group-hover:border-abGreen",
  },
];

export default function FleetSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="fleet" className="py-24 bg-[#0a0a0a] border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-abBlue uppercase mb-2">{dict.home.fleetSection.badge}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">{dict.home.fleetSection.title}</h3>
            <p className="mt-4 text-gray-400">{dict.home.fleetSection.desc}</p>
          </div>
          <div className="mt-6 md:mt-0">
            <a href="#" className="text-gray-300 font-semibold hover:text-abBlue border-b border-gray-600 hover:border-abBlue pb-1 transition-colors inline-flex items-center text-sm">
              {dict.home.fleetSection.link} <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dict.home.fleetSection.vehicles.map((vehicle, i) => (
            <div key={vehicle.title + vehicle.subtitle} className={`bg-abDarkGray rounded-xl border border-gray-800 overflow-hidden ${vehicles[i].hoverBorder} transition-colors group`}>
              <div className="bg-[#050505] h-48 flex items-center justify-center p-4 relative border-b border-gray-900">
                <div className={`absolute top-4 left-4 ${vehicles[i].badgeStyle} text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded z-10`}>
                  {vehicle.badge}
                </div>
                <Image
                  src={vehicles[i].image}
                  alt={vehicle.subtitle}
                  width={400}
                  height={200}
                  className="w-full object-contain group-hover:scale-105 transition-transform relative z-0"
                />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-white mb-1">{vehicle.title}</h4>
                <p className={`text-sm ${vehicles[i].subtitleColor} font-medium mb-4`}>{vehicle.subtitle}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-800 pt-4 mb-4">
                  <span className="flex items-center"><i className={`${vehicles[i].paxIcon} mr-1.5 text-gray-400`}></i> {vehicle.pax}</span>
                  <span className="flex items-center"><i className="fa-solid fa-suitcase mr-1.5 text-gray-400"></i> {vehicle.bags}</span>
                </div>
                <a href="#corporate-account" className={`block w-full text-center bg-[#111] hover:bg-[#1a1a1a] text-white text-xs font-semibold py-2.5 rounded transition-colors border border-gray-700 ${vehicles[i].buttonHover}`}>Request Allocation</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
