"use client";
import { Dashboard } from "@/components/Dashboard";
import { SignIn } from "@/components/SignIn";
import { Promises } from "@/components/promises";

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <div className="grid items-center justify-center min-h-screen">
        <h1 className="font-medium text-2xl animate-pulse">Carregando...</h1>
      </div>
    );
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
