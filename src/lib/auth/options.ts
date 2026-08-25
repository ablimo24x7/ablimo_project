import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { verifyPassword } from "@/lib/auth/password";
import { z } from "zod";
import type { JWT } from "next-auth/jwt";

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = CredentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        await connectDB();
        const user = await User.findOne({ email: parsed.data.email }).lean();
        if (!user) return null;
        if (!user.isActive) return null;
        if (!user.passwordHash) return null;

        const ok = await verifyPassword(parsed.data.password, user.passwordHash);
        if (!ok) return null;

        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
          roles: user.roles,
          avatarUrl: user.avatarUrl,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = (user as { id?: string | null }).id ?? token.sub ?? "";
        (token as JWT).roles = (user as { roles?: string[] }).roles ?? ((token as JWT).roles ?? []);
        token.email = (user as { email?: string | null }).email ?? token.email;
        token.name = (user as { name?: string | null }).name ?? token.name;
        (token as JWT).avatarUrl = (user as any).avatarUrl ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub ?? "",
        name: token.name ?? session.user?.name ?? "User",
        email: token.email ?? session.user?.email ?? null,
        roles: ((token as JWT).roles ?? []) as string[],
        avatarUrl: (token as JWT).avatarUrl ?? session.user?.avatarUrl ?? null,
      };
      return session;
    },
  },
};
