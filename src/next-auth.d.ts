import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roles: string[];
      avatarUrl: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    roles: string[];
    avatarUrl: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    roles: string[];
    avatarUrl: string | null;
  }
}
