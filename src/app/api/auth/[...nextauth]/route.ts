import { authOptionsFirebase } from "@/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptionsFirebase);

export { handler as GET, handler as POST };
