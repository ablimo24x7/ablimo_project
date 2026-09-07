import { createHash, randomBytes } from "crypto";
import { connectDB } from "@/lib/db";
import { ApiToken } from "@/lib/models/ApiToken";
import { User, type UserDoc } from "@/lib/models/User";
import { headers } from "next/headers";

export function hashApiToken(plainToken: string): string {
  return createHash('sha256').update(plainToken).digest('hex');
}

export function generateApiToken(isLive: boolean = true): { plainToken: string; tokenHash: string; prefix: string } {
  const prefix = isLive ? "nv_live_" : "nv_test_";
  const rawSecret = randomBytes(32).toString("hex");
  const plainToken = `${prefix}${rawSecret}`;
  const tokenHash = hashApiToken(plainToken);

  return { plainToken, tokenHash, prefix };
}

export async function authenticateApiRequest(): Promise<{ user: UserDoc | null, error?: string }> {
  try {
    const headersList = await headers();
    const authHeader = headersList.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { user: null, error: "Missing or malformed Authorization header" };
    }

    const plainToken = authHeader.split(" ")[1];

    if (!plainToken.startsWith("nv_live_") && !plainToken.startsWith("nv_test_")) {
      return { user: null, error: "Invalid token prefix" };
    }

    const tokenHash = hashApiToken(plainToken);

    await connectDB();

    const apiTokenPair = await ApiToken.findOne({ tokenHash, revoked: false });
    if (!apiTokenPair) {
      return { user: null, error: "Invalid or revoked token" };
    }

    ApiToken.updateOne({ _id: apiTokenPair._id }, { lastUsedAt: new Date() }).exec();

    const user = await User.findById(apiTokenPair.userId).lean();
    if (!user || user.isActive === false) {
      return { user: null, error: "User deactivated or not found" };
    }

    return { user: user as UserDoc };
  } catch (error) {
    console.error("API Auth Error", error);
    return { user: null, error: "Authentication failed" };
  }
}
