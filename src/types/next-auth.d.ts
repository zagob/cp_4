/* eslint-disable no-unused-vars */
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    username?: string | null;
  }
}

declare module "next-auth" {
  export interface Session {
    user: {
      id: UserId;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
    };
  }
}
