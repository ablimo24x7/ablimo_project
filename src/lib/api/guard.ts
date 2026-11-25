import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/server";
import { authenticateApiRequest } from "@/lib/auth/apiAuth";
import { getRolePolicies } from "@/lib/auth/rbac";
import { canPerformAction, type Action } from "@/lib/auth/permissions";

export type ApiAuthz =
  | { ok: true; userId: string; roles: string[] }
  | { ok: false; response: NextResponse };

const ACTION_VERB: Record<Action, string> = {
  create: "create",
  update: "edit",
  delete: "delete",
  manage: "manage",
};

/**
 * Guards a mutating dashboard API route.
 *
 * Usage inside a handler:
 *   const auth = await authorizeApi("create");
 *   if (!auth.ok) return auth.response;
 */
export async function authorizeApi(action: Action): Promise<ApiAuthz> {
  let userId = "";
  let roles: string[] = [];

  const session = await getSession();
  if (session?.user?.id) {
    userId = session.user.id;
    roles = session.user.roles ?? [];
  } else {
    const { user } = await authenticateApiRequest();
    if (user) {
      userId = String((user as { _id?: unknown })._id ?? "");
      roles = (user.roles ?? []) as string[];
    }
  }

  if (!userId) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const policies = await getRolePolicies();
  if (!canPerformAction(roles, action, policies)) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: `Your role is not allowed to ${ACTION_VERB[action]} this resource.` },
        { status: 403 }
      ),
    };
  }

  return { ok: true, userId, roles };
}
