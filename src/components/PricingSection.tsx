import Image from "next/image";

const plans = [
  {
    title: "Business",
    subtitle: "Class",
    description: "Reliable comfort for everyday executive travel",
    image: "/class_01-1024x597.png",
    price: "75$",
    borderClass: "border-r border-transparent",
    paddingClass: "pr-4",
  },
  {
    title: "Premium",
    subtitle: "Class",
    description: "Stylish vehicles for elevated business journeys",
    image: "/class_02-1024x597.png",
    price: "140$",
    borderClass: "border-r border-transparent",
    paddingClass: "pr-4 pl-0 md:pl-4",
  },
  {
    title: "Luxury",
    subtitle: "Class",
    description: "Ultimate comfort with exclusive luxury experience",
    image: "/class_03-1024x597.png",
    price: "299$",
    borderClass: "",
    paddingClass: "pl-0 md:pl-4",
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 px-8 bg-[#292a30]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={`flex flex-col justify-between ${plan.borderClass}`}
          >
            <div className={`mb-6 ${plan.paddingClass}`}>
              <h3 className="text-3xl font-semibold mb-2">
                {plan.title} <span className="font-light">{plan.subtitle}</span>
              </h3>
              <p className="text-gray-400 text-sm">{plan.description}</p>
            </div>
            <Image
              src={plan.image}
              alt={`${plan.title} ${plan.subtitle}`}
              width={400}
              height={200}
              className="w-full h-auto mb-8 object-contain"
            />
            <div
              className={`text-2xl font-bold border-t border-gray-600 pt-6 ${plan.paddingClass}`}
            >
              {plan.price}{" "}
              <span className="text-sm font-light text-gray-400">/ hour</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
