import Image from "next/image";
import { Dictionary } from "@/app/[lang]/dictionaries";

export default function EventLogisticsSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="logistics" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-sm font-bold tracking-widest text-abGold uppercase mb-3">{dict.home.eventLogistics.badge}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{dict.home.eventLogistics.title}</h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {dict.home.eventLogistics.desc}
            </p>
            
            <div className="space-y-6">
              {dict.home.eventLogistics.features.map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                    <i className={`fa-solid ${i === 0 ? "fa-route" : i === 1 ? "fa-traffic-light" : "fa-chart-pie"} text-abBlack`}></i>
                  </div>
                  <div className="mt-3 lg:mt-0 lg:ml-4">
                    <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                    <p className="mt-1 text-sm text-gray-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-abGold transform translate-x-4 translate-y-4 rounded-xl opacity-20"></div>
            <Image
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt={dict.home.eventLogistics.alt}
              width={1000}
              height={600}
              className="relative rounded-xl shadow-2xl z-10 w-full object-cover h-[600px] grayscale hover:grayscale-0 transition-all duration-700"
            />
            
            {/* Floating Data Card */}
            <div className="absolute bottom-8 -left-8 bg-white p-6 rounded-lg shadow-2xl z-20 border border-gray-100">
              <div className="flex items-center space-x-4 mb-2">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{dict.home.eventLogistics.dispatch}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{dict.home.eventLogistics.coaches}</p>
              <p className="text-sm text-gray-500">{dict.home.eventLogistics.deployed}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
