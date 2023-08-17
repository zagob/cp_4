"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/Button";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-zinc-800 min-h-screen" />
      <div className="flex items-center justify-center">
        <Button type="button" isLoading={isLoading} onClick={loginWithGoogle}>
          Fazer login com google
        </Button>
      </div>
    </div>
  );
}
