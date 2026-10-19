/** Shared country cover images keyed by ISO country code. */
export const countryImages: Record<string, string> = {
  bh: "https://images.unsplash.com/photo-1548755212-2b46ee259868?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  kw: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800&h=600&fit=crop",
  om: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  qa: "https://images.unsplash.com/photo-1700901742651-6b353164caf3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  sa: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ae: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
};

/** Cover image for a country code, falling back to the UAE image. */
export function countryImage(code: string): string {
  return countryImages[code] ?? countryImages.ae;
}
