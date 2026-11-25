import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, defaultLocale } from "@/app/[lang]/dictionaries";

// Root-level 404, reached for completely unmatched URLs (outside any
// [lang] segment). Branded title here since no layout template applies
// at this level — the [lang]/not-found.tsx only catches notFound()
// thrown within matched routes, not fully-unmatched paths.
export const metadata: Metadata = {
  title: { absolute: "Page Not Found | AB" },
  description: "The page you are looking for does not exist.",
};

export default async function RootNotFound() {
  const dict = await getDictionary(defaultLocale);
  const nf = dict.notFound;

  return (
    <main className="min-h-screen bg-[#292a30] text-white flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-6xl font-bold text-gray-600 mb-4">{nf.title}</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{nf.heading}</h1>
        <p className="text-gray-400 mb-8 max-w-md">{nf.desc}</p>
        <Link
          href="/"
          className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
        >
          {nf.goHome}
        </Link>
      </div>
    </main>
  );
}
