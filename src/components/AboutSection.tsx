import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import ScrollReveal from "./ScrollReveal";

const icons = [
  <svg key="1" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>,
  <svg key="2" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>,
  <svg key="3" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" /></svg>,
  <svg key="4" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" /></svg>,
  <svg key="5" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1H6.8c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-5.18-4.4z" /></svg>,
  <svg key="6" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>,
];

export default function AboutSection({ dict }: { dict: Dictionary }) {
  const about = dict.home.about;

  return (
    <section className="bg-[#474753] py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal animation="animate-slide-right">
          <Image
            src="/about-limmo-large.png"
            alt="Luxury Car"
            width={1200}
            height={400}
            className="w-full h-auto mb-16 rounded-lg"
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Image
            src="/about-chairs.png"
            alt="Car Interior"
            width={600}
            height={400}
            className="w-full rounded-lg shadow-xl"
          />
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-10 leading-tight">
              {about.heading1}{" "}
              <span className="text-gray-400">{about.heading2}</span> {about.heading3}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {about.features.map((label, i) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400">
                    {icons[i]}
                  </div>
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
