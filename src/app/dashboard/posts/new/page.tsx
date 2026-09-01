import { PostEditor } from "@/components/admin/post-editor";

type Props = {
  searchParams: Promise<{ type?: string }>;
};

export default async function NewPostPage({ searchParams }: Props) {
  const sp = await searchParams;
  const blogType = sp.type === "city" ? "city" : "country";
  return <PostEditor mode="create" initialBlogType={blogType} />;
}
