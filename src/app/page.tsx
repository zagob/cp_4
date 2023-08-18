import { Dashboard } from "@/components/Dashboard";
import { SignIn } from "@/components/SignIn";
import { Promises } from "@/components/promises";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();

  console.log("s", session);

  if (!session) {
    return <SignIn />;
  }

  return (
    <Promises>
      <Dashboard />
    </Promises>
  );
}
