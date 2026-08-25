import { z } from "zod";

const EnvSchema = z.object({
  USE_DATABASE: z.enum(["true", "false"]).default("true"),
  MONGO_URI: z.string().min(1, "MONGO_URI missing").or(z.string().min(1)),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET missing"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL missing or invalid"),
});

export function getEnv() {
  const parsed = EnvSchema.safeParse({
    ...process.env,
    MONGO_URI: process.env.MONGO_URI || process.env.MONGODB_URI || "",
  });
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => i.message).join(", ");
    throw new Error(message);
  }
  return parsed.data;
}
