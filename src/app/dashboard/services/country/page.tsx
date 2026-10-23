import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PostsPageContent } from "@/app/dashboard/posts/page";

export default function CountryServicesPage() {
  return (
    <Suspense fallback={<div className="p-4"><Skeleton className="h-12 w-full" /></div>}>
      <PostsPageContent forcedView="country" heading="Country Services" />
    </Suspense>
  );
}
