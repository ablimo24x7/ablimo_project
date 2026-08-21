export default function DutyOfCareSection() {
  return (
    <section id="duty-of-care" className="py-24 bg-abBlack text-white relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-abDarkGray to-transparent opacity-50 transform skew-x-12 translate-x-32 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <i className="fa-solid fa-shield-halved text-4xl text-abGold mb-4"></i>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Uncompromising Duty of Care.</h2>
          <p className="text-gray-400 text-lg">We integrate seamlessly with your corporate travel policies, providing the technological transparency and rigorous safety standards required by global enterprises.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Tech Card 1 */}
          <div className="bg-abDarkGray/50 border border-gray-800 p-8 rounded-xl backdrop-blur-sm hover:border-abGold transition-colors duration-300 text-center md:text-left">
            <i className="fa-solid fa-satellite-dish text-2xl text-abGold mb-6"></i>
            <h4 className="text-xl font-bold mb-3">Intelligent Transport Systems</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Proprietary live GPS tracking allowing corporate security teams to monitor Executive Protection Services and standard rides in real-time.</p>
          </div>
          {/* Tech Card 2 */}
          <div className="bg-abDarkGray/50 border border-gray-800 p-8 rounded-xl backdrop-blur-sm hover:border-abGold transition-colors duration-300 text-center md:text-left">
            <i className="fa-solid fa-file-invoice-dollar text-2xl text-abGold mb-6"></i>
            <h4 className="text-xl font-bold mb-3">Corporate Tech Integration</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Centralized corporate billing with direct API integrations to expense management platforms like <strong>SAP Concur</strong> for frictionless accounting.</p>
          </div>
          {/* Tech Card 3 */}
          <div className="bg-abDarkGray/50 border border-gray-800 p-8 rounded-xl backdrop-blur-sm hover:border-abGold transition-colors duration-300 text-center md:text-left">
            <i className="fa-solid fa-id-card-clip text-2xl text-abGold mb-6"></i>
            <h4 className="text-xl font-bold mb-3">Vetted Professionalism</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Mandatory comprehensive background checks, defensive driving certifications, and strict Non-Disclosure Agreements (NDAs) for all chauffeurs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
