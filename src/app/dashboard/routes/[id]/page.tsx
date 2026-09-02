"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { RouteEditor } from "@/components/admin/route-editor";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditRoutePage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["route", id],
    queryFn: async () => {
      const res = await fetch(`/api/locations/routes/${id}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-destructive">Failed to load route.</div>;
  }

  return <RouteEditor initialData={data} mode="edit" />;
}