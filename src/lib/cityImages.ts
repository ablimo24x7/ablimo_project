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
  riyadh: "/cities/riyadh.jpg",
  jeddah: "/cities/jeddah.jpg",
  mecca: "/cities/mecca.jpg",
  medina: "/cities/medina.jpg",
  dammam: "/cities/dammam.jpg",
  tabuk: "/cities/tabuk.jpg",
  "al-ula": "/cities/al-ula.jpg",
  "al-khobar": "/cities/al-khobar.jpg",
  "al-qasim": "/cities/al-qasim.jpg",
  abha: "/cities/abha.png",
  jizan: "/cities/jizan.jpg",
  neom: "/case-studies/neom-trojena.jpg",
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
