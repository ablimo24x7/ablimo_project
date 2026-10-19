import { connectDB } from "@/lib/db";
import { RolePolicy } from "@/lib/models/RolePolicy";

let cachedPolicies: Record<string, string[]> | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000;

export async function getRolePolicies(forceRefresh = false): Promise<Record<string, string[]>> {
  const now = Date.now();
  if (!forceRefresh && cachedPolicies && (now - cacheTimestamp < CACHE_TTL)) {
    return cachedPolicies;
  }

  await connectDB();
  const policies = await RolePolicy.find({}).lean();

  const map: Record<string, string[]> = {};
  policies.forEach((policy: any) => {
    map[policy.role] = policy.permissions || [];
  });

  cachedPolicies = map;
  cacheTimestamp = now;
  return map;
}

export function invalidatePolicyCache() {
  cachedPolicies = null;
  cacheTimestamp = 0;
}

export async function hasAnyRole(userRoles: string[] | undefined, allowed: string[]) {
  if (!userRoles?.length) return false;
  if (userRoles.includes("super_admin")) return true;
  return allowed.some((r) => userRoles.includes(r));
}

export async function hasPermission(userRoles: string[] | undefined, permission: string): Promise<boolean> {
  if (userRoles?.includes("super_admin")) return true;
  if (userRoles?.includes("admin")) return true;
  if (!userRoles || userRoles.length === 0) return false;

  const policies = await getRolePolicies();

  for (const role of userRoles) {
    const rolePerms = policies[role] || [];
    if (rolePerms.includes(permission)) {
      return true;
    }
  }

  return false;
}
