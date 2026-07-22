import type { Metadata } from "next";
import Link from "next/link";
import {
  getDictionary,
  hasLocale,
  defaultLocale,
  type Locale,
  type Dictionary,
} from "@/app/[lang]/dictionaries";

export const metadata: Metadata = {
  title: "Privacy Policy | AB.Limo",
  description:
    "Learn how AB.Limo collects, uses, and protects your personal data when you use our premium chauffeur services.",
};

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const t = (dict as any).privacy;

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-[#1c1d21]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30] via-[#1c1d21] to-[#292a30]" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">
            {t.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              {t.breadcrumb.home}
            </Link>
            <span>/</span>
            <span className="text-white">{t.breadcrumb.privacy}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-400 text-sm mb-12">
            {t.lastRevised}
          </p>

          {/* Introduction */}
          <div className="text-gray-300 leading-relaxed space-y-6 mb-16">
            <p>
              At AB.Limo, we value your privacy and are committed to protecting
              your personal data. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our
              premium chauffeur services, website, and mobile application
              (collectively, the &quot;Services&quot;).
            </p>
            <p>
              Please read this Privacy Policy carefully. By using the Services,
              you consent to the practices described herein. If you do not agree,
              please refrain from using the Services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-16">
            <section>
              <h2 className="text-2xl font-bold mb-6">
                1. Information We Collect
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  <strong>Personal Identification Information:</strong> When you
                  create an account or book a ride, we collect information such
                  as your full name, email address, phone number, and payment
                  details (credit or debit card information).
                </p>
                <p>
                  <strong>Location Data:</strong> To provide our chauffeur
                  services, we collect real-time location data from your device
                  when you use the application. This includes your pickup and
                  drop-off locations, route information, and travel patterns.
                </p>
                <p>
                  <strong>Usage Information:</strong> We automatically collect
                  information about your interactions with the Services,
                  including booking history, ride preferences, device type,
                  operating system, browser type, IP address, and usage logs.
                </p>
                <p>
                  <strong>Communication Data:</strong> We may collect
                  information when you contact our customer support team, submit
                  feedback, or communicate with your assigned chauffeur through
                  the application.
                </p>
                <p>
                  <strong>Corporate Account Information:</strong> For business
                  clients, we may collect additional information including
                  company name, department billing details, and employee travel
                  profiles.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">
                2. How We Use Your Information
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    To process and fulfill your ride bookings, including
                    matching you with available chauffeurs and calculating
                    fares.
                  </li>
                  <li>
                    To provide real-time ride tracking, ETA updates, and
                    post-ride receipts.
                  </li>
                  <li>
                    To process payments and manage your account, including
                    billing, refunds, and loyalty rewards.
                  </li>
                  <li>
                    To communicate with you about your rides, account updates,
                    promotional offers, and service changes.
                  </li>
                  <li>
                    To improve and optimize the Services, including developing
                    new features, conducting analytics, and enhancing user
                    experience.
                  </li>
                  <li>
                    To ensure safety and security, including verifying user
                    identities, detecting fraud, and monitoring for suspicious
                    activity.
                  </li>
                  <li>
                    To comply with legal obligations, resolve disputes, and
                    enforce our Terms of Use.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">
                3. Sharing Your Information
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  We do not sell your personal information. We may share your
                  data with the following categories of recipients:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Chauffeurs:</strong> We share your name, pickup
                    location, and contact details with your assigned chauffeur
                    to facilitate the ride. Your drop-off address is shared after
                    the ride begins.
                  </li>
                  <li>
                    <strong>Service Providers:</strong> We work with trusted
                    third-party companies that provide payment processing,
                    analytics, cloud hosting, customer support, and other
                    services necessary to operate the platform.
                  </li>
                  <li>
                    <strong>Legal Authorities:</strong> We may disclose your
                    information if required by law, court order, or governmental
                    request, or to protect the rights, property, or safety of
                    AB.Limo, our users, or the public.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In the event of a
                    merger, acquisition, or sale of assets, your information
                    may be transferred as part of the transaction. We will
                    notify you of any such change in advance.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">4. Data Security</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  We implement industry-standard security measures to protect
                  your personal data, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    End-to-end encryption for all data transmitted between your
                    device and our servers.
                  </li>
                  <li>
                    Secure payment processing compliant with PCI DSS standards.
                    We never store full credit card numbers on our servers.
                  </li>
                  <li>
                    Regular security audits, penetration testing, and
                    vulnerability assessments.
                  </li>
                  <li>
                    Strict access controls ensuring only authorized personnel
                    can access personal data on a need-to-know basis.
                  </li>
                </ul>
                <p>
                  While we strive to protect your information, no method of
                  electronic transmission or storage is 100% secure. We cannot
                  guarantee absolute security but will promptly notify affected
                  users and relevant authorities in the event of a data breach.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">5. Your Rights</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Depending on your jurisdiction, you may have the following
                  rights regarding your personal data:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Right of Access:</strong> Request a copy of the
                    personal data we hold about you.
                  </li>
                  <li>
                    <strong>Right to Rectification:</strong> Request correction
                    of inaccurate or incomplete personal data.
                  </li>
                  <li>
                    <strong>Right to Erasure:</strong> Request deletion of your
                    personal data, subject to certain legal exceptions.
                  </li>
                  <li>
                    <strong>Right to Restrict Processing:</strong> Request
                    limitation on how we process your personal data.
                  </li>
                  <li>
                    <strong>Right to Data Portability:</strong> Receive your
                    personal data in a structured, commonly used, and
                    machine-readable format.
                  </li>
                  <li>
                    <strong>Right to Object:</strong> Object to the processing
                    of your personal data for direct marketing purposes.
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent:</strong> Withdraw your
                    consent at any time where processing is based on consent.
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, please contact our Data
                  Protection Officer at{" "}
                  <a
                    href="mailto:privacy@ablimo.com"
                    className="text-white underline hover:text-gray-300 transition-colors"
                  >
                    privacy@ablimo.com
                  </a>
                  . We will respond to your request within 30 days.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">6. Cookies</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  We use cookies and similar tracking technologies to enhance
                  your experience on our website and application. Cookies are
                  small data files stored on your device that help us recognize
                  you and remember your preferences.
                </p>
                <p>
                  <strong>Essential Cookies:</strong> Required for basic
                  functionality such as account authentication, session
                  management, and security features.
                </p>
                <p>
                  <strong>Analytics Cookies:</strong> Help us understand how
                  users interact with the Services, enabling us to improve
                  performance and user experience.
                </p>
                <p>
                  <strong>Marketing Cookies:</strong> Used to deliver
                  personalized advertisements and measure the effectiveness of
                  our marketing campaigns. You can manage your marketing cookie
                  preferences through your browser settings.
                </p>
                <p>
                  You can control cookies through your browser settings.
                  Disabling certain cookies may limit your ability to use some
                  features of the Services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">7. Contact Us</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-[#1c1d21] rounded-lg p-8 border border-gray-700/50 mt-6 space-y-3">
                  <p>
                    <strong className="text-white">AB.Limo GmbH</strong>
                  </p>
                  <p>Data Protection Officer</p>
                  <p>Friedrichstraße 123</p>
                  <p>10117 Berlin, Germany</p>
                  <p className="pt-2">
                    Email:{" "}
                    <a
                      href="mailto:privacy@ablimo.com"
                      className="text-white underline hover:text-gray-300 transition-colors"
                    >
                      privacy@ablimo.com
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
                </div>
                <p className="pt-4">
                  You also have the right to lodge a complaint with the relevant
                  data protection authority if you believe your data protection
                  rights have been infringed.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

    </>
  );
}
