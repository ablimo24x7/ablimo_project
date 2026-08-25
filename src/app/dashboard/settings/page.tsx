"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type Settings = {
  siteTitle: string;
  defaultSeo: { metaTitle: string; metaDescription: string };
};

export default function SettingsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error("Failed");
      return res.json() as Promise<Settings>;
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: Partial<Settings>) => {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => { toast.success("Settings saved"); queryClient.invalidateQueries({ queryKey: ["settings"] }); },
    onError: () => toast.error("Save failed"),
  });

  const handleSave = () => {
    if (data) mutation.mutate(data);
  };

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Settings</h2>
        <Button onClick={handleSave} disabled={isLoading || mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4"><Skeleton className="h-48 w-full" /></div>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader><CardTitle>General</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Site Title</Label>
                <Input
                  value={data?.siteTitle ?? ""}
                  onChange={(e) =>
                    queryClient.setQueryData(["settings"], (old: Settings) => ({ ...old, siteTitle: e.target.value }))
                  }
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Default SEO</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input
                  value={data?.defaultSeo?.metaTitle ?? ""}
                  onChange={(e) =>
                    queryClient.setQueryData(["settings"], (old: Settings) => ({
                      ...old,
                      defaultSeo: { ...old.defaultSeo, metaTitle: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Input
                  value={data?.defaultSeo?.metaDescription ?? ""}
                  onChange={(e) =>
                    queryClient.setQueryData(["settings"], (old: Settings) => ({
                      ...old,
                      defaultSeo: { ...old.defaultSeo, metaDescription: e.target.value },
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
