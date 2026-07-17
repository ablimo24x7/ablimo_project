import Image from "next/image";

const services = [
  {
    image: "/AirportTransfers.jpg",
    alt: "Airport Transfers",
    title: "Airport Transfers",
    description:
      "Pellentesque semper dui eget fermentum sagittis. Cur abitur bibendum id ante.",
  },
  {
    image: "/businesstransfers.jpg",
    alt: "Business Transfers",
    title: "Business Transfers",
    description:
      "Sed nisi magna, rhoncus nec imperdiet non, pretium vitae odio donec scelerisque gravida.",
  },
  {
    image: "/eventswedding.jpg",
    alt: "Events & Wedding",
    title: "Events & Wedding",
    description:
      "Phasellus ullamcorper hendrerit suscipit. Quisque efficitur dictum tellus, eget malesuada.",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-[#1c1d21] py-20 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {services.map((service) => (
          <div key={service.title} className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center text-center lg:text-left">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-700">
              <Image
                src={service.image}
                alt={service.alt}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold text-xl flex items-center justify-center lg:justify-start gap-2 cursor-pointer hover:text-gray-300">
                {service.title} &rarr;
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
