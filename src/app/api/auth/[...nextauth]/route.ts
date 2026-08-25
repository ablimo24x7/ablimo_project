import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { verifyPassword } from "@/lib/auth/password";

const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await connectDB();
        const user = await User.findOne({ email: credentials.email.toLowerCase() }).lean();
        if (!user || !user.isActive) return null;
        const valid = await verifyPassword(credentials.password, user.passwordHash);
        if (!valid) return null;
        return { id: user._id.toString(), name: user.name, email: user.email, roles: user.roles, avatarUrl: user.avatarUrl ?? null };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
        token.avatarUrl = user.avatarUrl;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.roles = token.roles;
      session.user.avatarUrl = token.avatarUrl;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
