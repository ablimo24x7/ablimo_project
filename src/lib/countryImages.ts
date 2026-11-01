export const COUNTRY_IMAGES: Record<string, string> = {
  bh: "/locations/www.ab.limo-locations-bahrain-images/image1.jpg",
  kw: "/locations/www.ab.limo-locations-kuwait-images/image1.jpg",
  om: "/locations/www.ab.limo-locations-oman-images/image1.jpg",
  qa: "/locations/www.ab.limo-locations-qatar-images/image1.jpg",
  sa: "/locations/www.ab.limo-locations-saudi-arabia-images/image1.jpg",
  ae: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
  uk: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
  us: "https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=800&h=600&fit=crop",
  de: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop",
  fr: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
};

export function getCountryImage(code: string): string {
  return COUNTRY_IMAGES[code] ?? COUNTRY_IMAGES.ae;
}
