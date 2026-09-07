"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ServiceEditor } from "@/components/admin/service-editor";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await fetch(`/api/services/${id}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  if (error) return <div className="p-6 text-destructive">Failed to load service.</div>;

  return <ServiceEditor initialData={data} mode="edit" />;
}