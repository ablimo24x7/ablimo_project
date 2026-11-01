import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import type { Role } from "@/lib/models/User";
import { hasAnyRole, hasPermission } from "@/lib/auth/rbac";
import { authenticateApiRequest } from "@/lib/auth/apiAuth";

export async function getSession() {
  return getServerSession(authOptions);
}

export async function requireSession() {
  const session = await getSession();
  if (session?.user?.id) {
    return session;
  }

  const { user } = await authenticateApiRequest();
  if (user) {
    return {
      user: {
        id: (user as any)._id?.toString() || "",
        name: user.name,
        email: user.email,
        roles: (user.roles || []) as string[],
        avatarUrl: user.avatarUrl,
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  throw new Error("Unauthorized");
}

export async function requireRoles(allowed: Role[]) {
  const session = await requireSession();
  const roles = (session.user.roles ?? []) as Role[];

  if (!(await hasAnyRole(roles, allowed))) {
    throw new Error("Forbidden");
  }
  return session;
}

export async function requirePermission(permission: string) {
  const session = await requireSession();
  const roles = (session.user.roles ?? []) as string[];

  const hasAccess = await hasPermission(roles, permission);
  if (!hasAccess) {
    throw new Error("Forbidden");
  }

  return session;
}
