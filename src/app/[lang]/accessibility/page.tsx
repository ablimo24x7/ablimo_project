import type { Metadata } from "next";
import Link from "next/link";
import {
  getDictionary,
  hasLocale,
  defaultLocale,
  type Locale,
} from "@/app/[lang]/dictionaries";

export const metadata: Metadata = {
  title: "Accessibility | AB.Limo",
  description:
    "AB.Limo is committed to ensuring digital accessibility for all users. Read our accessibility statement and learn about our ongoing efforts.",
};

export default async function AccessibilityPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-[#1c1d21]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30] via-[#1c1d21] to-[#292a30]" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">
            {dict.accessibilityPage.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">
              {dict.accessibilityPage.breadcrumb.home}
            </Link>
            <span>/</span>
            <span className="text-white">{dict.accessibilityPage.breadcrumb.accessibility}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Accessibility Statement */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">
              Accessibility Statement
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                AB.Limo GmbH is committed to ensuring digital accessibility for
                people with disabilities. We are continually improving the user
                experience for everyone and applying the relevant accessibility
                standards to ensure we provide equal access to all users.
              </p>
              <p>
                This Accessibility Statement applies to the AB.Limo website
                (www.ablimo.com) and the AB.Limo mobile application. We strive
                to conform to the Web Content Accessibility Guidelines (WCAG)
                2.1 at the AA level as published by the World Wide Web
                Consortium (W3C).
              </p>
            </div>
          </section>

          {/* Conformance Status */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Conformance Status</h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                We aim to conform to the{" "}
                <strong className="text-white">
                  Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
                </strong>
                . This means that the website and application strive to be:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white">Perceivable:</strong>{" "}
                  Information and user interface components must be presentable
                  to users in ways they can perceive.
                </li>
                <li>
                  <strong className="text-white">Operable:</strong> User
                  interface components and navigation must be operable via
                  keyboard, screen readers, and other assistive technologies.
                </li>
                <li>
                  <strong className="text-white">Understandable:</strong>{" "}
                  Information and the operation of the user interface must be
                  understandable, with clear language and predictable behavior.
                </li>
                <li>
                  <strong className="text-white">Robust:</strong> Content must
                  be robust enough to be interpreted reliably by a wide variety
                  of user agents, including assistive technologies.
                </li>
              </ul>
              <p>
                While we strive to ensure accessibility across the entire
                platform, some areas of the website may not yet fully conform
                to WCAG 2.1 Level AA. We are actively working to address these
                areas.
              </p>
            </div>
          </section>

          {/* Accessibility Features */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">
              Accessibility Features
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                The AB.Limo platform includes the following accessibility
                features:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Full keyboard navigation support for all interactive elements.
                </li>
                <li>
                  Screen reader compatibility with semantic HTML structure and
                  ARIA labels.
                </li>
                <li>
                  Sufficient color contrast ratios meeting WCAG AA standards
                  for text and interactive elements.
                </li>
                <li>
                  Responsive design that adapts to different screen sizes and
                  supports text scaling up to 200% without loss of content.
                </li>
                <li>
                  Alternative text descriptions for all meaningful images and
                  icons.
                </li>
                <li>
                  Visible focus indicators for keyboard navigation.
                </li>
                <li>
                  Consistent and predictable navigation structure across all
                  pages.
                </li>
                <li>
                  Forms with associated labels and clear error messaging.
                </li>
              </ul>
            </div>
          </section>

          {/* Known Limitations */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Known Limitations</h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Despite our best efforts, some areas of the platform may not
                fully conform to accessibility standards. We are aware of the
                following limitations:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Some third-party embedded content (e.g., maps for ride
                  tracking) may have limited accessibility support.
                </li>
                <li>
                  Certain legacy features may not yet fully support keyboard
                  navigation or screen readers.
                </li>
                <li>
                  Some animated content may not be controllable via assistive
                  technologies, though we provide controls to pause animations.
                </li>
              </ul>
              <p>
                We are actively working to address these limitations and aim to
                achieve full conformance with WCAG 2.1 Level AA.
              </p>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">
              Technical Specifications
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Accessibility of the AB.Limo platform relies on the following
                technologies to work with the web browser and assistive
                technologies you use:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>HTML5</li>
                <li>WAI-ARIA (Accessible Rich Internet Applications)</li>
                <li>CSS3</li>
                <li>JavaScript (ES6+)</li>
                <li>React / Next.js framework</li>
              </ul>
              <p>
                We test our platform using a combination of automated tools and
                manual testing with assistive technologies including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>NVDA and JAWS screen readers on Windows</li>
                <li>VoiceOver on macOS and iOS</li>
                <li>TalkBack on Android</li>
                <li>Keyboard-only navigation testing</li>
                <li>Axe and Lighthouse automated accessibility audits</li>
              </ul>
            </div>
          </section>

          {/* Feedback Mechanism */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">
              Feedback &amp; Contact Information
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                We welcome your feedback on the accessibility of the AB.Limo
                platform. If you encounter accessibility barriers or have
                suggestions for improvement, please let us know:
              </p>
              <div className="bg-[#1c1d21] rounded-lg p-8 border border-gray-700/50 mt-6 space-y-3">
                <p>
                  <strong className="text-white">Accessibility Team</strong>
                </p>
                <p>AB.Limo GmbH</p>
                <p>Friedrichstraße 123</p>
                <p>10117 Berlin, Germany</p>
                <p className="pt-2">
                  Email:{" "}
                  <a
                    href="mailto:accessibility@ablimo.com"
                    className="text-white underline hover:text-gray-300 transition-colors"
                  >
                    accessibility@ablimo.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href="tel:+4930123456789"
                    className="text-white underline hover:text-gray-300 transition-colors"
                  >
                    +49 30 123 456 789
                  </a>
                </p>
                <p className="pt-2 text-gray-400 text-sm">
                  We aim to respond to accessibility feedback within 3 business
                  days and to resolve issues within 10 business days.
                </p>
              </div>
            </div>
          </section>

          {/* Enforcement Procedure */}
          <section>
            <h2 className="text-2xl font-bold mb-8">
              Enforcement Procedure
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                If you are not satisfied with our response to your
                accessibility concern, you may contact the competent
                supervisory authority:
              </p>
              <div className="bg-[#1c1d21] rounded-lg p-8 border border-gray-700/50 mt-6 space-y-3">
                <p>
                  <strong className="text-white">
                    Berlin Commissioner for Data Protection and Freedom of
                    Information
                  </strong>
                </p>
                <p>Friedrichstraße 219</p>
                <p>10969 Berlin, Germany</p>
                <p>
                  Website:{" "}
                  <a
                    href="https://www.berlin.de/datenschutz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline hover:text-gray-300 transition-colors"
                  >
                    www.berlin.de/datenschutz
                  </a>
                </p>
              </div>
              <p className="pt-4">
                This Accessibility Statement was last updated on July 15, 2026.
                We review and update this statement regularly to reflect our
                ongoing commitment to accessibility.
              </p>
            </div>
          </section>
        </div>
      </section>

    </>
  );
}
