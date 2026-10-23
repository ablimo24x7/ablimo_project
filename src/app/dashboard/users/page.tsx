"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { Plus, Trash2, Send, ShieldAlert, Search } from "lucide-react";
import { usePermissions } from "@/hooks/use-permissions";
import { assignableRoles } from "@/lib/auth/permissions";

type User = { _id: string; name: string; email: string; roles: string[]; isActive: boolean };

const roleLabel = (role: string) =>
  role === "super_admin" ? "Super Admin" : role.charAt(0).toUpperCase() + role.slice(1);

function RoleSelect({
  value,
  onChange,
  options,
  placeholder = "Select a role",
}: {
  value: string;
  onChange: (role: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <Select value={value} onValueChange={(v) => { if (v) onChange(v); }}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((r) => (
          <SelectItem key={r} value={r}>{roleLabel(r)}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function UsersPage() {
  const queryClient = useQueryClient();
  const { status, isAuthenticated, roles, userId, canManage } = usePermissions();
  const roleOptions = assignableRoles(roles);

  const [createOpen, setCreateOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("");
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    enabled: canManage,
    queryFn: async () => {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed");
      return res.json() as Promise<{ items: User[] }>;
    },
  });

  const resetCreate = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  const createMutation = useMutation({
    mutationFn: async (payload: { name: string; email: string; password: string; role: string }) => {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, roles: [payload.role] }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.error || "Failed");
      return json;
    },
    onSuccess: () => {
      toast.success("User created");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setCreateOpen(false);
      resetCreate();
    },
    onError: (err: Error) => toast.error(err.message || "Create failed"),
  });

  const inviteMutation = useMutation({
    mutationFn: async (payload: { email: string; role: string }) => {
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: payload.email, roles: [payload.role] }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.error || "Failed");
      return json;
    },
    onSuccess: (data) => {
      toast.success(`Invitation created for ${data.email}`);
      setInviteOpen(false);
      setInviteEmail("");
      setInviteRole("");
      if (data.token) {
        setInviteLink(`${window.location.origin}/invite/${data.token}`);
      }
    },
    onError: (err: Error) => toast.error(err.message || "Invite failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.error || "Failed");
    },
    onSuccess: () => { toast.success("User deleted"); queryClient.invalidateQueries({ queryKey: ["users"] }); },
    onError: (err: Error) => toast.error(err.message || "Delete failed"),
  });

  const isSuperAdmin = roles.includes("super_admin");
  const canDeleteRow = (u: User) => {
    if (u._id === userId) return false;
    if (u.roles.includes("super_admin")) return false;
    if (u.roles.includes("admin") && !isSuperAdmin) return false;
    return true;
  };

  if (status === "loading") {
    return (
      <div className="space-y-4 px-4 lg:px-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!isAuthenticated || !canManage) {
    return (
      <div className="px-4 lg:px-6">
        <div className="flex max-w-lg items-start gap-3 rounded-lg border bg-muted/40 p-6">
          <ShieldAlert className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            User management is restricted to administrators.
          </div>
        </div>
      </div>
    );
  }

  const users = data?.items ?? [];
  const q = search.trim().toLowerCase();
  const filteredUsers = q
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.roles.some((r) => r.toLowerCase().includes(q))
      )
    : users;
  const canSubmitCreate = name.trim() && email.trim() && password.trim() && role;
  const canSubmitInvite = inviteEmail.trim() && inviteRole;

  return (
    <div className="space-y-4 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Users</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setInviteOpen(true)}>
            <Send className="mr-2 h-4 w-4" /> Invite User
          </Button>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> New User
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="border-b p-3">
            <div className="relative max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email or role..."
                className="pl-8"
              />
            </div>
          </div>
          {isLoading ? (
            <div className="p-4 space-y-2">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">{q ? "No users match your search." : "No users found."}</TableCell></TableRow>
                ) : (
                  filteredUsers.map((u) => (
                    <TableRow key={u._id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.roles.map((r) => <Badge key={r} variant="outline" className="mr-1 capitalize">{r}</Badge>)}</TableCell>
                      <TableCell><Badge variant={u.isActive ? "default" : "destructive"}>{u.isActive ? "Active" : "Inactive"}</Badge></TableCell>
                      <TableCell>
                        {canDeleteRow(u) && (
                          <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(u._id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create User</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <RoleSelect value={role} onChange={setRole} options={roleOptions} placeholder="Select a role" />
              <p className="text-xs text-muted-foreground">
                Editors can sign in and edit existing posts, but cannot create or delete content.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button
              onClick={() => createMutation.mutate({ name, email, password, role })}
              disabled={!canSubmitCreate || createMutation.isPending}
            >
              {createMutation.isPending ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              No email is sent — you get a one-time link to share with the invitee.
            </p>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="name@company.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <RoleSelect value={inviteRole} onChange={setInviteRole} options={roleOptions} placeholder="Select a role" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
            <Button
              onClick={() => inviteMutation.mutate({ email: inviteEmail, role: inviteRole })}
              disabled={!canSubmitInvite || inviteMutation.isPending}
            >
              <Send className="mr-2 h-4 w-4" /> Create Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={!!inviteLink} onOpenChange={(open) => { if (!open) setInviteLink(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invitation Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Share this link with the invitee. They set their own name and password
              and can then sign in at the admin login.
            </p>
            <Input readOnly value={inviteLink ?? ""} onFocus={(e) => e.currentTarget.select()} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteLink(null)}>Close</Button>
            <Button
              onClick={() => {
                if (!inviteLink) return;
                navigator.clipboard.writeText(inviteLink);
                toast.success("Link copied");
              }}
            >
              Copy Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
