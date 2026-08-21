import Image from "next/image";

const vehicles = [
  {
    badge: "Executive Mobility",
    badgeStyle: "bg-abBlack text-white",
    image: "/cars/sedans/msc.png",
    title: "Executive Sedan",
    subtitle: "Mercedes S-Class",
    pax: "3 Pax",
    bags: "2 Bags",
    paxIcon: "fa-solid fa-user-tie",
  },
  {
    badge: "Executive Mobility",
    badgeStyle: "bg-abBlack text-white",
    image: "/cars/suvs/CADILAC.png",
    title: "Executive SUV",
    subtitle: "Cadillac Escalade",
    pax: "6 Pax",
    bags: "5 Bags",
    paxIcon: "fa-solid fa-user-tie",
  },
  {
    badge: "High Event Demand",
    badgeStyle: "bg-abGold text-white shadow",
    image: "/cars/vans/Sprinter.png",
    title: "Executive Van",
    subtitle: "Mercedes Sprinter",
    pax: "14 Pax",
    bags: "10 Bags",
    paxIcon: "fa-solid fa-users",
  },
  {
    badge: "Executive Mobility",
    badgeStyle: "bg-abBlack text-white shadow",
    image: "/cars/vans/V_Class.png",
    title: "Premium MPV",
    subtitle: "Mercedes V Class",
    pax: "6 Pax",
    bags: "5 Bags",
    paxIcon: "fa-solid fa-users-viewfinder",
  },
];

export default function FleetSection() {
  return (
    <section id="fleet" className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-sm font-bold tracking-widest text-abGold uppercase mb-2">Our Vehicle Governance</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Strictly Black. Strictly Professional.</h3>
            <p className="mt-4 text-gray-600">The AB.Limo brand standard mandates a uniform fleet of late-model, immaculate black vehicles. No exceptions. We procure and lease dedicated fleets for long-term government and corporate contracts.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <a href="#" className="text-gray-900 font-semibold hover:text-abGold border-b-2 border-abGold pb-1 transition-colors inline-flex items-center">
              View Full Fleet Specifications <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.title + vehicle.subtitle} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="bg-gray-100 h-32 md:h-48 flex items-center justify-center p-3 md:p-4 relative overflow-hidden">
                <div className={`absolute top-3 left-3 md:top-4 md:left-4 ${vehicle.badgeStyle} text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 uppercase tracking-wider rounded`}>
                  {vehicle.badge}
                </div>
                <Image
                  src={vehicle.image}
                  alt={vehicle.subtitle}
                  width={400}
                  height={200}
                  className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6 text-center md:text-left">
                <h4 className="text-lg font-bold text-gray-900 mb-1">{vehicle.title}</h4>
                <p className="text-sm text-abGold font-medium mb-4">{vehicle.subtitle}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-4">
                  <span className="flex items-center"><i className={`${vehicle.paxIcon} mr-1.5 text-gray-400`}></i> {vehicle.pax}</span>
                  <span className="flex items-center"><i className="fa-solid fa-suitcase mr-1.5 text-gray-400"></i> {vehicle.bags}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
