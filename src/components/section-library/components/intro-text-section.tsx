import type { SectionInstance } from "../types";

interface IntroTextSectionProps {
  section: SectionInstance;
}

export default function IntroTextSection({ section }: IntroTextSectionProps) {
  const c = section.content as Record<string, unknown>;
  const paragraphs = (Array.isArray(c.paragraphs) ? c.paragraphs : []).filter(
    (p): p is string => typeof p === "string" && p.trim().length > 0
  );
  const eyebrow = c.eyebrow as string | undefined;
  const heading = c.heading as string | undefined;

  if (paragraphs.length === 0 && !heading) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-10">
      <div className="space-y-6">
        {eyebrow && (
          <p className="text-abServiceBlue text-sm font-semibold uppercase tracking-widest">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className="text-2xl font-serif font-bold text-white tracking-tight text-balance">
            {heading}
          </h2>
        )}
        {paragraphs.map((p, i) => (
          <p key={i} className="text-gray-300 text-[16px] leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
