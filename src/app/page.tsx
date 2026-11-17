import type { Metadata } from "next";
import LangLayout, {
  generateMetadata as generateLayoutMetadata,
} from "./[lang]/layout";
import Home, {
  generateMetadata as generateHomeMetadata,
} from "./[lang]/page";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const params = Promise.resolve({ lang: "en-US" });
  const layoutMeta = await generateLayoutMetadata({ params });
  const homeMeta = await generateHomeMetadata({ params });
  return {
    ...layoutMeta,
    ...homeMeta,
  };
}

export default async function RootPage() {
  const params = Promise.resolve({ lang: "en-US" });
  return (
    <LangLayout params={params}>
      <Home params={params} />
    </LangLayout>
  );
}

