interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE_URL = "https://www.ab.limo";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AB.Limo",
    alternateName: "AB Limo",
    url: SITE_URL,
    logo: `${SITE_URL}/AB_LOGO-NEW.png`,
    description:
      "AB.Limo is a premier provider of VIP and executive chauffeur services, corporate ground transportation, airport protocol meet & assist, and event logistics across the GCC — Saudi Arabia, UAE, Qatar, Oman, Bahrain, and Kuwait. Founded in 1999 and trusted by global corporations, event organizers, and government delegations, AB.Limo delivers 24/7 dispatch, GPS-tracked vehicles, and fully licensed operations.",
    foundingDate: "1999",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+923135237377",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: ["https://www.linkedin.com/company/ablimo24x7"],
    areaServed: [
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Oman" },
      { "@type": "Country", name: "Bahrain" },
      { "@type": "Country", name: "Kuwait" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Malaz Area, Umar Ibn Abdulaziz Road, Building Number 59, Second Floor",
      addressLocality: "Riyadh",
      postalCode: "12626",
      addressCountry: "SA",
    },
  };

  return <JsonLd data={data} />;
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AB.Limo",
    image: `${SITE_URL}/AB_LOGO-NEW.png`,
    url: SITE_URL,
    telephone: "+923135237377",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Malaz Area, Umar Ibn Abdulaziz Road, Building Number 59, Second Floor",
      addressLocality: "Riyadh",
      postalCode: "12626",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.6646,
      longitude: 46.7324,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: ["https://www.linkedin.com/company/ablimo24x7"],
  };

  return <JsonLd data={data} />;
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AB.Limo",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };

  return <JsonLd data={data} />;
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: "AB.Limo",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    serviceType: "Luxury Chauffeur Transportation",
  };

  return <JsonLd data={data} />;
}

export function FAQJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}

export function CityJsonLd({
  cityName,
  countryName,
  description,
  url,
}: {
  cityName: string;
  countryName: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Premium Chauffeur Service in ${cityName}, ${countryName}`,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: "AB.Limo",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: cityName,
      containedInPlace: {
        "@type": "Country",
        name: countryName,
      },
    },
    serviceType: "Luxury Chauffeur Transportation",
  };

  return <JsonLd data={data} />;
}

export function RouteJsonLd({
  fromCity,
  toCity,
  description,
  url,
  distance,
  duration,
}: {
  fromCity: string;
  toCity: string;
  description: string;
  url: string;
  distance?: string;
  duration?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${fromCity} to ${toCity} Transfer`,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: "AB.Limo",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "City", name: fromCity },
      { "@type": "City", name: toCity },
    ],
    serviceType: "Long Distance Chauffeur Transfer",
    ...(distance ? { distance } : {}),
    ...(duration ? { duration } : {}),
  };

  return <JsonLd data={data} />;
}

export function IndustryJsonLd({
  industry,
  description,
  url,
}: {
  industry: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${industry} Mobility Solutions`,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: "AB.Limo",
      url: SITE_URL,
    },
    serviceType: `${industry} Transportation`,
  };

  return <JsonLd data={data} />;
}

export function AboutPageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About AB.Limo",
    description:
      "Learn about AB.Limo, a premier executive mobility provider founded in 1999 in Saudi Arabia and operating across 6 GCC countries and 25+ cities with a 24/7 GPS-tracked fleet.",
    url: `${SITE_URL}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "AB.Limo",
      alternateName: "AB Limo",
      url: SITE_URL,
      logo: `${SITE_URL}/AB_LOGO-NEW.png`,
      foundingDate: "1999",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 51,
        maxValue: 200,
      },
    },
  };

  return <JsonLd data={data} />;
}

export function FleetJsonLd({
  vehicles,
}: {
  vehicles: { name: string; capacity: string; bags: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AB.Limo Fleet",
    description: "Premium luxury vehicle fleet for executive transportation",
    itemListElement: vehicles.map((vehicle, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: vehicle.name,
        description: `${vehicle.name} - ${vehicle.capacity}, ${vehicle.bags}`,
        brand: {
          "@type": "Brand",
          name: vehicle.name.split(" ")[0],
        },
      },
    })),
  };

  return <JsonLd data={data} />;
}

export function HowToBookJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Book a Luxury Chauffeur with AB.Limo",
    description: "Simple steps to book premium chauffeur-driven transportation with AB.Limo",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose Your Service",
        text: "Select from executive transfers, as-directed hourly service, or event logistics.",
        url: "https://www.ab.limo/services",
      },
      {
        "@type": "HowToStep",
        name: "Select Vehicle & Route",
        text: "Pick your vehicle class and enter pickup/drop-off locations with date and time.",
        url: "https://www.ab.limo",
      },
      {
        "@type": "HowToStep",
        name: "Confirm Booking",
        text: "Review your booking details and confirm. Receive instant confirmation with chauffeur details.",
        url: "https://www.ab.limo",
      },
      {
        "@type": "HowToStep",
        name: "Enjoy Your Ride",
        text: "Your professional chauffeur arrives on time. Track your ride in real-time via the AB.Limo app.",
        url: "https://www.ab.limo",
      },
    ],
  };

  return <JsonLd data={data} />;
}

export function ServiceListJsonLd({
  services,
}: {
  services: { name: string; description: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AB.Limo Services",
    description: "Premium chauffeur-driven transportation services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: `${SITE_URL}${service.url}`,
        provider: {
          "@type": "Organization",
          name: "AB.Limo",
          url: SITE_URL,
        },
      },
    })),
  };

  return <JsonLd data={data} />;
}

export function VideoJsonLd({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  embedUrl,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  embedUrl?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
    ...(duration ? { duration } : {}),
    ...(embedUrl ? { embedUrl } : {}),
  };

  return <JsonLd data={data} />;
}
