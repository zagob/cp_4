"use client";
import { Dashboard } from "@/components/Dashboard";
import { SignIn } from "@/components/SignIn";
import { Promises } from "@/components/promises";

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log("session", session);

  if (session.status === "loading") {
    return <h1>Loading...</h1>;
  }
  // return (
  //   <>
  //     <h1>Loged - {session.data?.user.name}</h1>
  //     <button onClick={() => signOut()}>logout</button>
  //   </>
  // );

  if (!session) {
    return <SignIn />;
  }

  return (
    <Promises>
      <Dashboard user={session.data?.user ?? {}} />
    </Promises>
  );
}
