import { PostEditor } from "@/components/admin/post-editor";

type Props = {
  searchParams: Promise<{ type?: string }>;
};

export default async function NewPostPage({ searchParams }: Props) {
  const sp = await searchParams;
  // Default to a standalone blog post; service articles are created from
  // the Services ▸ Country/City Services views (?type=country|city).
  const blogType = sp.type === "city" ? "city" : sp.type === "country" ? "country" : "blog";
  return <PostEditor mode="create" initialBlogType={blogType} />;
}
