// import Image from "next/image";
// import type { Dictionary } from "@/app/[lang]/dictionaries";

// const images = ["/class_01-1024x597.png", "/class_02-1024x597.png", "/class_03-1024x597.png"];
// const borderClasses = ["border-r border-transparent", "border-r border-transparent", ""];
// const paddingClasses = ["pr-4", "pr-4 pl-0 md:pl-4", "pl-0 md:pl-4"];

// export default function PricingSection({ dict }: { dict: Dictionary }) {
//   const plans = dict.home.pricing.plans;

//   return (
//     <section className="py-20 px-8 bg-[#292a30]">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0">
//         {plans.map((plan, i) => (
//           <div
//             key={plan.name}
//             className={`flex flex-col justify-between ${borderClasses[i]}`}
//           >
//             <div className={`mb-6 ${paddingClasses[i]}`}>
//               <h3 className="text-3xl font-semibold mb-2">
//                 {plan.name} <span className="font-light">{plan.subtitle}</span>
//               </h3>
//               <p className="text-gray-400 text-sm">{plan.desc}</p>
//             </div>
//             <Image
//               src={images[i]}
//               alt={`${plan.name} ${plan.subtitle}`}
//               width={400}
//               height={200}
//               className="w-full h-auto mb-8 object-contain"
//             />
//             <div
//               className={`text-2xl font-bold border-t border-gray-600 pt-6 ${paddingClasses[i]}`}
//             >
//               {plan.price}{" "}
//               <span className="text-sm font-light text-gray-400">{plan.unit}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
