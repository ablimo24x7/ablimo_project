const CITY_IMAGES: Record<string, string> = {
  // UAE
  dubai: "/cities/dubai.jpg",
  "abu-dhabi": "/cities/abu-dhabi.jpg",
  sharjah: "/cities/sharjah.jpg",
  ajman: "/cities/ajman.jpg",
  "ras-al-khaimah": "/cities/ras-al-khaimah.jpg",
  "al-ain": "/cities/al-ain.jpg",
  fujairah: "/cities/fujairah.jpg",
  "umm-al-quwain": "/cities/umm-al-quwain.jpg",

  // Saudi Arabia
  riyadh: "/locations/www.ab.limo-locations-saudi-arabia-riyadh-images/image1.jpg",
  jeddah: "/locations/www.ab.limo-locations-saudi-arabia-jeddah-images/image1.jpg",
  mecca: "/locations/www.ab.limo-locations-saudi-arabia-mecca-images/image1.jpg",
  medina: "/locations/www.ab.limo-locations-saudi-arabia-medina-images/image1.jpg",
  dammam: "/locations/www.ab.limo-locations-saudi-arabia-dammam-images/image1.jpg",
  tabuk: "/locations/www.ab.limo-locations-saudi-arabia-tabuk-images/image1.jpg",
  "al-ula": "/locations/www.ab.limo-locations-saudi-arabia-al-ula-images/image1.jpg",
  alula: "/locations/www.ab.limo-locations-saudi-arabia-al-ula-images/image1.jpg",
  "al-khobar": "/locations/www.ab.limo-locations-saudi-arabia-al-khobar-images/image1.jpg",
  "al-qasim": "/locations/www.ab.limo-locations-saudi-arabia-al-qasim-images/image1.jpg",
  abha: "/locations/www.ab.limo-locations-saudi-arabia-abha-images/image1.jpg",
  jizan: "/locations/www.ab.limo-locations-saudi-arabia-jizan-images/image1.jpg",
  neom: "/locations/www.ab.limo-locations-saudi-arabia-neom-images/image1.jpg",
  hail: "/cities/hail.jpg",
  jubail: "/cities/jubail.jpg",
  najran: "/cities/najran.jpg",
  taif: "/cities/taif.jpg",
  yanbu: "/cities/yanbu.jpg",

  // Qatar
  doha: "/cities/doha.jpg",
  "al-khor": "/cities/al-khor.jpg",
  lusail: "/cities/lusail.jpg",
  "al-wakrah": "/cities/al-wakrah.jpg",

  // Bahrain
  manama: "/cities/manama.jpg",
  riffa: "/cities/riffa.jpg",
  muharraq: "/cities/muharraq.jpg",

  // Kuwait
  "kuwait-city": "/cities/kuwait-city.jpg",
  hawalli: "/cities/hawalli.jpg",
  farwaniya: "/cities/farwaniya.jpg",
  "al-ahmadi": "/cities/al-ahmadi.jpg",
  salmiya: "/cities/salmiya.jpg",

  // Oman
  muscat: "/cities/muscat.jpg",
  salalah: "/cities/salalah.jpg",
  sohar: "/cities/sohar.jpg",
  nizwa: "/cities/nizwa.jpg",
};

export function getCityImage(slug: string): string | undefined {
  return CITY_IMAGES[slug];
}
