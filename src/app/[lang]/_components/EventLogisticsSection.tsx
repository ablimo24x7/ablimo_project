import Image from "next/image";

export default function EventLogisticsSection() {
  return (
    <section id="logistics" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-sm font-bold tracking-widest text-abGold uppercase mb-3">Core Pillar: Event Mobility</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Mastering Complex Route Architecture.</h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Moving 5,000 delegates requires more than just vehicles. It requires a <strong>Transport Control Room</strong>. We provide end-to-end logistics management for GCC mega-events, ensuring precision from tarmac to venue.
            </p>
            
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                  <i className="fa-solid fa-route text-abBlack"></i>
                </div>
                <div className="mt-3 lg:mt-0 lg:ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Delivery Schedules & Route Planning</h4>
                  <p className="mt-1 text-sm text-gray-500">Dynamic routing mapped to avoid local congestion, maximizing efficiency for convention shuttles and VIP movements.</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                  <i className="fa-solid fa-traffic-light text-abBlack"></i>
                </div>
                <div className="mt-3 lg:mt-0 lg:ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Traffic & On-Site Parking Management</h4>
                  <p className="mt-1 text-sm text-gray-500">Ground coordinators dispatching our luxury coach and executive bus fleet to maintain seamless loading/unloading zones.</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                  <i className="fa-solid fa-chart-pie text-abBlack"></i>
                </div>
                <div className="mt-3 lg:mt-0 lg:ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Post-Event Passenger Analytics</h4>
                  <p className="mt-1 text-sm text-gray-500">Comprehensive reporting on passenger volumes, vehicle utilization, and operational KPIs delivered to event organizers.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-abGold transform translate-x-4 translate-y-4 rounded-xl opacity-20"></div>
            <Image
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Executive Coach Fleet"
              width={1000}
              height={600}
              className="relative rounded-xl shadow-2xl z-10 w-full object-cover h-[600px] grayscale hover:grayscale-0 transition-all duration-700"
            />
            
            {/* Floating Data Card */}
            <div className="absolute bottom-8 -left-8 bg-white p-6 rounded-lg shadow-2xl z-20 border border-gray-100">
              <div className="flex items-center space-x-4 mb-2">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Dispatch Status</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">45 VIP Coaches</p>
              <p className="text-sm text-gray-500">Currently deployed (Riyadh Season)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
