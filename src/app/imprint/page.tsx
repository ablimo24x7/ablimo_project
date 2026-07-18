import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal Notice | AB.Limo",
  description:
    "Legal notice and company information for AB.Limo GmbH, including registration details and contact information.",
};

export default function ImprintPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-[#1c1d21]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30] via-[#1c1d21] to-[#292a30]" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">
            Legal Notice
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Legal Notice</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Company Information */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Company Information</h2>
            <div className="bg-[#1c1d21] rounded-lg p-8 border border-gray-700/50 text-gray-300 leading-relaxed space-y-4">
              <p>
                <strong className="text-white">AB.Limo GmbH</strong>
              </p>
              <p>Friedrichstraße 123</p>
              <p>10117 Berlin</p>
              <p>Germany</p>
              <div className="pt-4 space-y-2">
                <p>
                  Phone:{" "}
                  <a
                    href="tel:+4930123456789"
                    className="text-white underline hover:text-gray-300 transition-colors"
                  >
                    +49 30 123 456 789
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@ablimo.com"
                    className="text-white underline hover:text-gray-300 transition-colors"
                  >
                    info@ablimo.com
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <a
                    href="https://www.ablimo.com"
                    className="text-white underline hover:text-gray-300 transition-colors"
                  >
                    www.ablimo.com
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Registration Details */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Registration Details</h2>
            <div className="bg-[#1c1d21] rounded-lg p-8 border border-gray-700/50 text-gray-300 leading-relaxed space-y-4">
              <p>
                <strong className="text-white">Registered Office:</strong>{" "}
                Berlin, Germany
              </p>
              <p>
                <strong className="text-white">Court of Registration:</strong>{" "}
                Amtsgericht Berlin-Charlottenburg
              </p>
              <p>
                <strong className="text-white">Registration Number:</strong>{" "}
                HRB 210 456
              </p>
              <p>
                <strong className="text-white">VAT Identification Number:</strong>{" "}
                DE 312 456 789
              </p>
              <p>
                <strong className="text-white">Managing Director:</strong>{" "}
                Ahmad Al-Rashid
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Disclaimer</h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                The content on our website and application has been created with
                the utmost care. However, AB.Limo GmbH cannot guarantee the
                accuracy, completeness, or timeliness of the content provided.
                As a service provider, we are responsible for our own content on
                these pages in accordance with general laws pursuant to Section 7
                of the German Telemedia Act (TMG).
              </p>
              <p>
                However, we are not obligated to monitor transmitted or stored
                third-party information or to investigate circumstances that
                indicate illegal activity. Obligations to remove or block the
                use of information under general laws remain unaffected.
                Liability in this regard, however, is only possible from the
                point in time at which a concrete infringement becomes known.
                If we become aware of any such infringements, we will remove
                the affected content immediately.
              </p>
              <p>
                Our website contains links to external third-party websites
                whose content we have no influence over. Therefore, we cannot
                accept any liability for the content of these linked sites. The
                respective provider or operator of the pages is always
                responsible for the content of the linked pages.
              </p>
              <p>
                Linked pages were checked for possible legal violations at the
                time of linking. Illegal content was not recognizable at the
                time of linking. However, permanent monitoring of the content
                of linked pages is not reasonable without concrete evidence of
                an infringement. If we become aware of any infringements, we
                will remove such links immediately.
              </p>
            </div>
          </section>

          {/* Copyright */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Copyright Notice</h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                The content and works created by the site operators on these
                pages are subject to German copyright law. Duplication,
                processing, distribution, or any form of commercialization of
                such material beyond the scope of the copyright law requires
                the prior written consent of its respective author or creator.
              </p>
              <p>
                Downloads and copies of this page are only permitted for
                private, non-commercial use. Insofar as the content on this
                site was not created by the operator, the copyrights of third
                parties are respected. In particular, third-party content is
                identified as such. Should you nonetheless become aware of a
                copyright infringement, please inform us accordingly. If we
                become aware of any infringements, we will remove such content
                immediately.
              </p>
              <p>
                &copy; {new Date().getFullYear()} AB.Limo GmbH. All rights
                reserved.
              </p>
            </div>
          </section>

          {/* EU Dispute Resolution */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">
              EU Dispute Resolution
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                The European Commission provides a platform for online dispute
                resolution (ODR):{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-gray-300 transition-colors"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p>
                Our email address can be found above in the site notice. We are
                not willing or obliged to participate in dispute resolution
                proceedings before a consumer arbitration board.
              </p>
            </div>
          </section>

          {/* Regulatory Compliance */}
          <section>
            <h2 className="text-2xl font-bold mb-8">
              Regulatory Compliance
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                AB.Limo GmbH operates in compliance with all applicable German
                and European Union regulations governing transportation
                services, data protection, and consumer rights.
              </p>
              <p>
                Our chauffeur services are provided in accordance with local
                transportation licensing requirements in each jurisdiction where
                we operate. All chauffeurs hold valid professional licenses and
                meet the safety and quality standards required by applicable law.
              </p>
              <p>
                For regulatory inquiries, please contact our compliance team at{" "}
                <a
                  href="mailto:compliance@ablimo.com"
                  className="text-white underline hover:text-gray-300 transition-colors"
                >
                  compliance@ablimo.com
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </section>

    </>
  );
}
