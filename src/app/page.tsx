"use client";
import { Dashboard } from "@/components/Dashboard";
import { SignIn } from "@/components/SignIn";
import { Promises } from "@/components/promises";

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  if (session.status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (!session) {
    return <SignIn />;
  }

  return (
    <Promises>
      <Dashboard user={session.data?.user ?? {}} />
    </Promises>
  );
}
