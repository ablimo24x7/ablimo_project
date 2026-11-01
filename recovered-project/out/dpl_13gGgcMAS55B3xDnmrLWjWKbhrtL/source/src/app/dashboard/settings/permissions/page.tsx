"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Shield, Plus, Trash2 } from "lucide-react";

type RolePolicy = {
  _id: string;
  role: string;
  permissions: string[];
};

const availablePermissions = [
  "posts.create",
  "posts.read",
  "posts.update",
  "posts.delete",
  "categories.create",
  "categories.read",
  "categories.update",
  "categories.delete",
  "users.create",
  "users.read",
  "users.update",
  "users.delete",
  "settings.read",
  "settings.update",
];

export default function PermissionsPage() {
  const queryClient = useQueryClient();
  const [addOpen, setAddOpen] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [newPerms, setNewPerms] = useState<string[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["role-policies"],
    queryFn: async () => {
      const res = await fetch("/api/role-policies");
      if (!res.ok) return { items: [] };
      return res.json() as Promise<{ items: RolePolicy[] }>;
    },
  });

  const createMutation = useMutation({
    mutationFn: async ({ role, permissions }: { role: string; permissions: string[] }) => {
      const res = await fetch("/api/role-policies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, permissions }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Role policy created");
      queryClient.invalidateQueries({ queryKey: ["role-policies"] });
      setAddOpen(false);
      setNewRole("");
      setNewPerms([]);
    },
    onError: () => toast.error("Create failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/role-policies/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
    },
    onSuccess: () => {
      toast.success("Role policy deleted");
      queryClient.invalidateQueries({ queryKey: ["role-policies"] });
    },
    onError: () => toast.error("Delete failed"),
  });

  const policies = data?.items ?? [];

  const togglePerm = (perm: string) => {
    setNewPerms((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5" /> Permissions
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage role-based access control policies.
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Role Policy
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 text-sm text-muted-foreground">Loading...</div>
          ) : policies.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No role policies defined. Default permissions apply.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((p) => (
                  <TableRow key={p._id}>
                    <TableCell className="font-medium capitalize">{p.role}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {p.permissions.map((perm) => (
                          <Badge key={perm} variant="outline" className="text-xs">{perm}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(p._id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Default Role Summary</CardTitle>
          <CardDescription>Roles defined in the system with their default access levels.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { role: "admin", desc: "Full access to all features" },
              { role: "editor", desc: "Can manage posts and categories" },
              { role: "author", desc: "Can create and edit own posts" },
              { role: "viewer", desc: "Read-only access to dashboard" },
            ].map((r) => (
              <div key={r.role} className="flex items-start gap-3 rounded-lg border p-3">
                <Badge variant="secondary" className="capitalize">{r.role}</Badge>
                <span className="text-sm text-muted-foreground">{r.desc}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Role Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Role Name</Label>
              <Input
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="e.g. moderator"
              />
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {availablePermissions.map((perm) => (
                  <label key={perm} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPerms.includes(perm)}
                      onChange={() => togglePerm(perm)}
                      className="rounded"
                    />
                    {perm}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button
              onClick={() => createMutation.mutate({ role: newRole, permissions: newPerms })}
              disabled={!newRole.trim() || newPerms.length === 0}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
