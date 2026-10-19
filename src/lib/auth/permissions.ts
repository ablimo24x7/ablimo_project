export type Action = "create" | "update" | "delete" | "manage";

export const ACTIONS: Action[] = ["create", "update", "delete", "manage"];

export type PolicyMap = Record<string, string[]>;

export const BUILTIN_ROLE_ACTIONS: Record<string, Action[]> = {
  super_admin: [...ACTIONS],
  admin: [...ACTIONS],
  editor: ["update"],
  author: ["update"],
  viewer: [],
};

export function isAdminRole(roles?: string[] | null): boolean {
  return !!roles?.some((r) => r === "admin" || r === "super_admin");
}

/** Mirrors ROLE_HIERARCHY in `@/lib/models/User` without pulling mongoose into the client. */
export const ROLE_LEVELS: Record<string, number> = {
  super_admin: 100,
  admin: 50,
  editor: 20,
  author: 10,
};

/**
 * Roles the actor is strictly outranked by, i.e. the only ones it may assign
 * (see `canAssignRoles` in `@/lib/auth/governance`). Super admins can assign
 * every role below their own.
 */
export function assignableRoles(actorRoles?: string[] | null): string[] {
  const actorLevel = Math.max(
    0,
    ...(actorRoles ?? []).map((r) => ROLE_LEVELS[r] ?? 0)
  );
  return Object.keys(ROLE_LEVELS).filter(
    (role) => (ROLE_LEVELS[role] ?? 0) < actorLevel
  );
}

function entryGrants(entry: string, action: Action): boolean {
  const value = (entry || "").trim().toLowerCase();
  if (!value) return false;
  if (value === "*" || value === "all") return true;
  if (value === action) return true;
  return value.endsWith(`.${action}`) || value.endsWith(`:${action}`);
}

export function canPerformAction(
  roles: string[] | undefined | null,
  action: Action,
  policies: PolicyMap = {}
): boolean {
  if (!roles || roles.length === 0) return false;
  if (isAdminRole(roles)) return true;

  for (const role of roles) {
    const builtin = BUILTIN_ROLE_ACTIONS[role] ?? [];
    if (builtin.includes(action)) return true;

    const overrides = policies[role] ?? [];
    for (const entry of overrides) {
      if (entryGrants(entry, action)) return true;
    }
  }

  return false;
}
