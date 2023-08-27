import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/firebase";

export type InfoPointProps = number | undefined;

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const totalMinutes: InfoPointProps = (
      await db.collection("users").doc(session.user.id).get()
    ).data()?.infoPoint?.totalMinutes;

    return new Response(JSON.stringify({ totalMinutes }));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
