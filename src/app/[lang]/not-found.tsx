import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#292a30] text-white flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-6xl font-bold text-gray-600 mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
