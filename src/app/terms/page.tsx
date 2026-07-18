import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | AB.Limo",
  description:
    "Read the Terms of Use governing your use of AB.Limo's premium luxury chauffeur service and booking platform.",
};

const sections = [
  { id: "general-provisions", title: "1. General Provisions" },
  { id: "eligibility", title: "2. Eligibility" },
  { id: "modification-of-terms", title: "3. Modification of Terms" },
  { id: "arbitration-agreement", title: "4. Arbitration Agreement" },
  { id: "payment", title: "5. Payment" },
  { id: "intellectual-property", title: "6. Intellectual Property" },
  { id: "disclaimers", title: "7. Disclaimers" },
  { id: "limitation-of-liability", title: "8. Limitation of Liability" },
  { id: "indemnity", title: "9. Indemnity" },
  { id: "force-majeure", title: "10. Force Majeure" },
  { id: "term-and-termination", title: "11. Term and Termination" },
  { id: "choice-of-law", title: "12. Choice of Law" },
  { id: "choice-of-forum", title: "13. Choice of Forum" },
  { id: "final-provisions", title: "14. Final Provisions" },
];

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-[#1c1d21]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30] via-[#1c1d21] to-[#292a30]" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">
            Terms of Use
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Terms</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-400 text-sm mb-12">
            Last revised: July 15, 2026
          </p>

          {/* Table of Contents */}
          <div className="bg-[#1c1d21] rounded-lg p-8 mb-16 border border-gray-700/50">
            <h2 className="text-xl font-bold mb-6">Table of Contents</h2>
            <ul className="space-y-3">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm leading-relaxed"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Introduction */}
          <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6 mb-16">
            <p>
              Welcome to AB.Limo. These Terms of Use (&quot;Terms&quot;) govern
              your access to and use of the AB.Limo website, mobile application,
              and related services (collectively, the &quot;Services&quot;)
              operated by AB.Limo GmbH (&quot;AB.Limo&quot;, &quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;). By accessing or using the
              Services, you agree to be bound by these Terms. If you do not
              agree, please do not use the Services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-16">
            <section id="general-provisions">
              <h2 className="text-2xl font-bold mb-6">1. General Provisions</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  1.1 AB.Limo provides a premium luxury chauffeur service
                  connecting passengers with professional chauffeurs through our
                  digital platform. These Terms establish the legal framework for
                  your use of our Services.
                </p>
                <p>
                  1.2 By creating an account, booking a ride, or otherwise using
                  the Services, you confirm that you have read, understood, and
                  agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p>
                  1.3 We reserve the right to modify these Terms at any time.
                  Material changes will be communicated via email or through the
                  platform at least 30 days before they take effect. Continued
                  use of the Services after such changes constitutes acceptance
                  of the updated Terms.
                </p>
              </div>
            </section>

            <section id="eligibility">
              <h2 className="text-2xl font-bold mb-6">2. Eligibility</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  2.1 The Services are available to individuals who are at least
                  18 years of age and possess the legal capacity to enter into
                  binding agreements in their jurisdiction.
                </p>
                <p>
                  2.2 You represent and warrant that all information you provide
                  during registration and throughout your use of the Services is
                  accurate, current, and complete. You agree to update your
                  information as necessary to maintain its accuracy.
                </p>
                <p>
                  2.3 AB.Limo reserves the right to refuse service, suspend
                  accounts, or terminate access at its sole discretion, including
                  in cases of suspected fraud, abuse, or violation of these
                  Terms.
                </p>
              </div>
            </section>

            <section id="modification-of-terms">
              <h2 className="text-2xl font-bold mb-6">
                3. Modification of Terms
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  3.1 AB.Limo may update these Terms from time to time to
                  reflect changes in our practices, technology, legal
                  requirements, or other factors. We will provide notice of
                  material changes through the Services or via email.
                </p>
                <p>
                  3.2 Your continued use of the Services following the effective
                  date of any modifications constitutes your acceptance of the
                  revised Terms. If you do not agree to the modified Terms, you
                  must stop using the Services and terminate your account.
                </p>
                <p>
                  3.3 It is your responsibility to review these Terms
                  periodically. We recommend checking this page regularly for
                  updates.
                </p>
              </div>
            </section>

            <section id="arbitration-agreement">
              <h2 className="text-2xl font-bold mb-6">
                4. Arbitration Agreement
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  4.1 Any dispute, claim, or controversy arising out of or
                  relating to these Terms or the use of the Services shall be
                  resolved through binding arbitration, rather than in court,
                  except for claims that may be brought in small claims court.
                </p>
                <p>
                  4.2 The arbitration shall be conducted by a neutral arbitrator
                  under the rules of the International Chamber of Commerce (ICC).
                  The place of arbitration shall be Berlin, Germany. The language
                  of arbitration shall be English.
                </p>
                <p>
                  4.3 You agree that any arbitration shall be conducted on an
                  individual basis and not as a class, consolidated, or
                  representative action. You waive any right to participate in a
                  class action lawsuit or class-wide arbitration.
                </p>
                <p>
                  4.4 Notwithstanding the above, AB.Limo may seek injunctive or
                  other equitable relief in any court of competent jurisdiction
                  to prevent the actual or threatened infringement or
                  misappropriation of intellectual property rights.
                </p>
              </div>
            </section>

            <section id="payment">
              <h2 className="text-2xl font-bold mb-6">5. Payment</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  5.1 All fares, fees, and charges for rides are displayed in
                  the application at the time of booking. Prices may vary based
                  on vehicle class, route, distance, duration, time of day, and
                  applicable taxes or surcharges.
                </p>
                <p>
                  5.2 Payment is processed through the payment method linked to
                  your AB.Limo account. You authorize us to charge your selected
                  payment method for all applicable fees upon completion of each
                  ride.
                </p>
                <p>
                  5.3 For corporate accounts, payment terms and billing cycles
                  are specified in the applicable corporate agreement. Late
                  payments may incur interest charges of 1.5% per month or the
                  maximum rate permitted by law.
                </p>
                <p>
                  5.4 All prices are exclusive of applicable taxes, which will
                  be itemized on your receipt. Refund requests must be submitted
                  within 14 days of the ride date and are subject to review.
                </p>
              </div>
            </section>

            <section id="intellectual-property">
              <h2 className="text-2xl font-bold mb-6">
                6. Intellectual Property
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  6.1 All content, features, and functionality of the Services,
                  including but not limited to text, graphics, logos, icons,
                  images, audio clips, data compilations, software, and the
                  design and arrangement thereof, are the exclusive property of
                  AB.Limo or its licensors and are protected by international
                  copyright, trademark, patent, trade secret, and other
                  intellectual property laws.
                </p>
                <p>
                  6.2 You are granted a limited, non-exclusive, non-transferable
                  license to access and use the Services for personal,
                  non-commercial purposes. This license does not include any
                  right to reproduce, distribute, modify, create derivative
                  works, publicly display, or exploit any content from the
                  Services without prior written consent from AB.Limo.
                </p>
                <p>
                  6.3 The AB.Limo name, logo, and all related marks are
                  trademarks of AB.Limo GmbH. You may not use these trademarks
                  without our prior written permission.
                </p>
              </div>
            </section>

            <section id="disclaimers">
              <h2 className="text-2xl font-bold mb-6">7. Disclaimers</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  7.1 THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND
                  &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY
                  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
                  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, TITLE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  7.2 AB.Limo does not warrant that the Services will be
                  uninterrupted, timely, secure, error-free, or free of viruses
                  or other harmful components. We do not guarantee the accuracy,
                  completeness, or reliability of any information obtained
                  through the Services.
                </p>
                <p>
                  7.3 AB.Limo is not responsible for the conduct of chauffeurs
                  or other users of the Services. While we maintain strict
                  quality standards, we do not guarantee the performance or
                  behavior of individual chauffeurs.
                </p>
              </div>
            </section>

            <section id="limitation-of-liability">
              <h2 className="text-2xl font-bold mb-6">
                8. Limitation of Liability
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  8.1 TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO
                  EVENT SHALL AB.LIMO, ITS DIRECTORS, EMPLOYEES, PARTNERS,
                  AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT,
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                  INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE,
                  GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>
                <p>
                  8.2 IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL
                  CLAIMS EXCEED THE AMOUNT YOU HAVE PAED TO AB.LIMO IN THE
                  TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING
                  RISE TO THE CLAIM.
                </p>
                <p>
                  8.3 Some jurisdictions do not allow the exclusion or
                  limitation of certain warranties or liabilities, so the above
                  limitations may not apply to you. In such cases, our
                  liability will be limited to the fullest extent permitted by
                  applicable law.
                </p>
              </div>
            </section>

            <section id="indemnity">
              <h2 className="text-2xl font-bold mb-6">9. Indemnity</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  9.1 You agree to defend, indemnify, and hold harmless
                  AB.Limo and its officers, directors, employees, contractors,
                  agents, licensors, suppliers, and affiliates from and against
                  any claims, actions, demands, liabilities, damages, losses,
                  costs, and expenses arising out of or relating to your use of
                  the Services, your violation of these Terms, or your
                  violation of any third-party rights.
                </p>
                <p>
                  9.2 AB.Limo reserves the right, at its own expense, to assume
                  the exclusive defense and control of any matter subject to
                  indemnification by you, in which event you shall cooperate
                  fully with AB.Limo in asserting any available defenses.
                </p>
              </div>
            </section>

            <section id="force-majeure">
              <h2 className="text-2xl font-bold mb-6">10. Force Majeure</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  10.1 AB.Limo shall not be liable for any failure or delay in
                  performing its obligations under these Terms where such failure
                  or delay results from circumstances beyond our reasonable
                  control, including but not limited to natural disasters, acts
                  of God, pandemics, government actions, war, terrorism,
                  strikes, road closures, severe weather conditions, or
                  infrastructure failures.
                </p>
                <p>
                  10.2 In the event of a force majeure occurrence, AB.Limo will
                  use commercially reasonable efforts to resume performance as
                  soon as practicable and will provide timely updates to
                  affected users.
                </p>
              </div>
            </section>

            <section id="term-and-termination">
              <h2 className="text-2xl font-bold mb-6">
                11. Term and Termination
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  11.1 These Terms remain in effect for as long as you use the
                  Services or maintain an account with AB.Limo. You may
                  terminate your account at any time by contacting our support
                  team or through the account settings in the application.
                </p>
                <p>
                  11.2 AB.Limo may suspend or terminate your access to the
                  Services immediately, without prior notice, for conduct that
                  we determine, in our sole discretion, violates these Terms or
                  is harmful to other users, third parties, or the business
                  interests of AB.Limo.
                </p>
                <p>
                  11.3 Upon termination, your right to use the Services ceases
                  immediately. Sections of these Terms that by their nature
                  should survive termination will continue to apply, including
                  provisions regarding payment, intellectual property, limitation
                  of liability, indemnification, and dispute resolution.
                </p>
              </div>
            </section>

            <section id="choice-of-law">
              <h2 className="text-2xl font-bold mb-6">12. Choice of Law</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  12.1 These Terms shall be governed by and construed in
                  accordance with the laws of the Federal Republic of Germany,
                  without regard to its conflict of law principles.
                </p>
                <p>
                  12.2 The United Nations Convention on Contracts for the
                  International Sale of Goods (CISG) does not apply to these
                  Terms or your use of the Services.
                </p>
              </div>
            </section>

            <section id="choice-of-forum">
              <h2 className="text-2xl font-bold mb-6">13. Choice of Forum</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  13.1 Subject to the Arbitration Agreement in Section 4, any
                  legal action or proceeding arising under these Terms shall be
                  brought exclusively in the courts of competent jurisdiction in
                  Berlin, Germany, and you consent to the personal jurisdiction
                  of such courts.
                </p>
                <p>
                  13.2 Notwithstanding the foregoing, AB.Limo may seek interim
                  or injunctive relief in any court of competent jurisdiction
                  worldwide to protect its intellectual property rights or
                  confidential information.
                </p>
              </div>
            </section>

            <section id="final-provisions">
              <h2 className="text-2xl font-bold mb-6">
                14. Final Provisions
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  14.1 <strong>Entire Agreement:</strong> These Terms, together
                  with the Privacy Policy and any other legal notices or
                  agreements published by AB.Limo on the Services, constitute
                  the entire agreement between you and AB.Limo regarding the use
                  of the Services.
                </p>
                <p>
                  14.2 <strong>Severability:</strong> If any provision of these
                  Terms is held to be invalid, illegal, or unenforceable, the
                  remaining provisions shall continue in full force and effect.
                </p>
                <p>
                  14.3 <strong>Waiver:</strong> The failure of AB.Limo to
                  exercise or enforce any right or provision of these Terms
                  shall not constitute a waiver of such right or provision.
                </p>
                <p>
                  14.4 <strong>Assignment:</strong> You may not assign or
                  transfer these Terms or your rights under them without the
                  prior written consent of AB.Limo. AB.Limo may assign these
                  Terms without restriction.
                </p>
                <p>
                  14.5 <strong>Language:</strong> These Terms are drafted in the
                  English language. In the event of any conflict between the
                  English version and any translation, the English version shall
                  prevail.
                </p>
                <p>
                  14.6 <strong>Contact:</strong> If you have any questions about
                  these Terms, please contact us at{" "}
                  <a
                    href="mailto:legal@ablimo.com"
                    className="text-white underline hover:text-gray-300 transition-colors"
                  >
                    legal@ablimo.com
                  </a>
                  .
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

    </>
  );
}
