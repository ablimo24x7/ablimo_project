export const COUNTRY_IMAGES: Record<string, string> = {
  bh: "https://images.unsplash.com/photo-1548755212-2b46ee259868?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  kw: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800&h=600&fit=crop",
  om: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  qa: "https://images.unsplash.com/photo-1700901742651-6b353164caf3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  sa: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ae: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
  uk: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
  us: "https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=800&h=600&fit=crop",
  de: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop",
  fr: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
};

export function getCountryImage(code: string): string {
  return COUNTRY_IMAGES[code] ?? COUNTRY_IMAGES.ae;
}
