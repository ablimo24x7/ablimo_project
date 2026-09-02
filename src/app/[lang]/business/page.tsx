import Link from "next/link";
import Image from "next/image";
import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";

const featureIcons = ["🌍", "💰", "⚙️", "📞", "📊", "🌱"];
const awardIcon = "🏆";

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-[#292a30]">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
          alt="Corporate transportation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/80 via-[#292a30]/60 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">
            {dict.business.breadcrumb.home} &gt; {dict.business.breadcrumb.business}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {dict.business.hero.heading}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            {dict.business.hero.subheading}
          </p>
        </div>
      </section>

      {/* Tailored to You Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {dict.business.tailored.heading}
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {dict.business.tailored.desc}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {dict.business.tailored.cards.map((card, index) => {
              const images = [
                "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop",
                "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
                "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
              ];
              return (
                <div
                  key={index}
                  className="bg-[#35363c] rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={images[index]}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* From Planning to Pickup */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {dict.business.planning.heading}
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {dict.business.planning.desc}
          </p>
          <div className="relative rounded-2xl overflow-hidden border border-gray-700">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop"
              alt="AB.Limo platform dashboard"
              width={1200}
              height={700}
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dict.business.features.heading}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {dict.business.features.items.map((feature, index) => (
              <div
                key={index}
                className="bg-[#35363c] p-6 rounded-xl hover:bg-[#3d3e45] transition-colors"
              >
                <span className="text-3xl mb-4 block">{featureIcons[index]}</span>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl text-gray-600 mb-6">&ldquo;</div>
          <blockquote className="text-xl md:text-2xl font-light italic text-gray-200 mb-8 leading-relaxed">
            {dict.business.quote.text}
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-gray-600 rounded-full" />
            <div className="text-left">
              <p className="font-semibold">{dict.business.quote.name}</p>
              <p className="text-gray-400 text-sm">{dict.business.quote.title}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Can We Help CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {dict.business.help.heading}
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            {dict.business.help.desc}
          </p>
          <Link
            href="#contact"
            className="inline-block bg-white text-[#292a30] font-semibold px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {dict.business.help.button}
          </Link>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dict.business.awards.heading}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {dict.business.awards.items.map((award, index) => (
              <div
                key={index}
                className="bg-[#35363c] p-8 rounded-xl text-center"
              >
                <div className="w-16 h-16 bg-[#292a30] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{awardIcon}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{award.title}</h3>
                <p className="text-gray-400 text-sm">{award.org}</p>
                <p className="text-gray-500 text-sm mt-1">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {dict.business.contact.heading}
          </h2>
          <p className="text-gray-400 text-center mb-12">
            {dict.business.contact.desc}
          </p>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder={dict.business.contact.firstName}
                className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
              <input
                type="text"
                placeholder={dict.business.contact.lastName}
                className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder={dict.business.contact.email}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
            <input
              type="text"
              placeholder={dict.business.contact.company}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
            <textarea
              placeholder={dict.business.contact.message}
              rows={5}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-white text-[#292a30] font-semibold py-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {dict.business.contact.submit}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
