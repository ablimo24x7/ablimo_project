import { User, getMaxRoleLevel } from "@/lib/models/User";

interface GovernanceContext {
  actorId: string;
  actorRoles: string[];
  targetId?: string;
  targetRoles?: string[];
}

interface GovernanceResult {
  allowed: boolean;
  reason?: string;
}

export async function canModifyUser(ctx: GovernanceContext): Promise<GovernanceResult> {
  const { actorId, actorRoles, targetId, targetRoles } = ctx;

  if (actorId === targetId) {
    return { allowed: false, reason: "You cannot modify your own account through this action." };
  }

  if (targetRoles?.includes("super_admin")) {
    return { allowed: false, reason: "Super Admin accounts are protected and cannot be modified." };
  }

  if (targetRoles?.includes("admin")) {
    if (!actorRoles.includes("super_admin")) {
      return { allowed: false, reason: "Only a Super Admin can modify Admin accounts." };
    }
  }

  const actorLevel = getMaxRoleLevel(actorRoles);
  const targetLevel = getMaxRoleLevel(targetRoles || []);
  if (actorLevel <= targetLevel) {
    return { allowed: false, reason: "You cannot modify a user with equal or higher privileges." };
  }

  return { allowed: true };
}

export async function canDeleteUser(ctx: GovernanceContext): Promise<GovernanceResult> {
  const { actorId, actorRoles, targetId, targetRoles } = ctx;

  if (actorId === targetId) {
    return { allowed: false, reason: "You cannot delete your own account." };
  }

  if (targetRoles?.includes("super_admin")) {
    return { allowed: false, reason: "Super Admin accounts cannot be deleted." };
  }

  if (targetRoles?.includes("admin")) {
    if (!actorRoles.includes("super_admin")) {
      return { allowed: false, reason: "Only a Super Admin can delete Admin accounts." };
    }
  }

  const actorLevel = getMaxRoleLevel(actorRoles);
  const targetLevel = getMaxRoleLevel(targetRoles || []);
  if (actorLevel <= targetLevel) {
    return { allowed: false, reason: "You cannot delete a user with equal or higher privileges." };
  }

  return { allowed: true };
}

export async function canAssignRoles(actorRoles: string[], newRoles: string[]): Promise<GovernanceResult> {
  const actorLevel = getMaxRoleLevel(actorRoles);

  for (const role of newRoles) {
    const roleLevel = getMaxRoleLevel([role]);
    if (roleLevel >= actorLevel) {
      return { allowed: false, reason: `You do not have permission to assign the "${role}" role.` };
    }
  }

  return { allowed: true };
}

export async function canInviteWithRoles(actorRoles: string[], inviteRoles: string[]): Promise<GovernanceResult> {
  for (const role of inviteRoles) {
    if (role === "super_admin") {
      return { allowed: false, reason: "Super Admin accounts cannot be created via invitation." };
    }
    if (role === "admin" && !actorRoles.includes("super_admin")) {
      return { allowed: false, reason: "Only a Super Admin can invite users with the Admin role." };
    }
  }

  return { allowed: true };
}

export async function ensureNotLastSuperAdmin(targetRoles: string[]): Promise<GovernanceResult> {
  if (!targetRoles?.includes("super_admin")) {
    return { allowed: true };
  }

  const superAdminCount = await User.countDocuments({ roles: "super_admin", isActive: true });
  if (superAdminCount <= 1) {
    return { allowed: false, reason: "Cannot remove or demote the last remaining Super Admin." };
  }

  return { allowed: true };
}

export async function ensureNotLastAdmin(targetRoles: string[]): Promise<GovernanceResult> {
  if (!targetRoles?.includes("admin") && !targetRoles?.includes("super_admin")) {
    return { allowed: true };
  }

  const adminCount = await User.countDocuments({
    roles: { $in: ["admin", "super_admin"] },
    isActive: true,
  });

  if (adminCount <= 1) {
    return { allowed: false, reason: "Cannot disable or demote the last remaining administrator." };
  }

  return { allowed: true };
}
