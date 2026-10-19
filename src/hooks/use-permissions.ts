"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import {
  canPerformAction,
  isAdminRole,
  type Action,
  type PolicyMap,
} from "@/lib/auth/permissions";

type RolePolicyItem = { role: string; permissions?: string[] };

/**
 * Mirrors the server-side permission rules (`src/lib/auth/permissions.ts`) so
 * the UI can hide controls the API would reject anyway.
 *
 * While the session is loading, every capability resolves to `false` so
 * editors never see create/delete controls flash on screen.
 */
export function usePermissions() {
  const { data: session, status } = useSession();
  const roles = session?.user?.roles ?? [];
  const isAuthenticated = status === "authenticated";

  const { data } = useQuery({
    queryKey: ["role-policies-map"],
    queryFn: async (): Promise<PolicyMap> => {
      const res = await fetch("/api/role-policies");
      if (!res.ok) return {};
      const json = (await res.json()) as { items?: RolePolicyItem[] };
      const map: PolicyMap = {};
      for (const policy of json.items ?? []) {
        if (policy?.role) map[policy.role] = policy.permissions ?? [];
      }
      return map;
    },
    staleTime: 5 * 60 * 1000,
    enabled: isAuthenticated,
  });

  const policies = data ?? {};

  const can = (action: Action) =>
    isAuthenticated && canPerformAction(roles, action, policies);

  const canCreate = can("create");
  const canUpdate = can("update");
  const canDelete = can("delete");

  return {
    status,
    isAuthenticated,
    userId: session?.user?.id ?? null,
    roles,
    isAdmin: isAuthenticated && isAdminRole(roles),
    can,
    canCreate,
    canUpdate,
    canDelete,
    canManage: can("manage"),
    /** Adding/removing sections, FAQs, tags and other structural items. */
    canManageStructure: canCreate && canDelete,
  };
}
