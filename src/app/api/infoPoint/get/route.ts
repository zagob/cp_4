// import { getAuthSession } from "@/lib/auth";
import { authOptionsFirebase } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/firebase";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptionsFirebase);

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    console.log("session", session);
    const query = db.collection("infoPoints").doc(session.user.id);

    const infoPoint = (await query.get()).data();

    // const infoPoint = await db.infoPoint.findUnique({
    //   where: {
    //     userId: session.user.id,
    //   },
    // });

    return new Response(
      JSON.stringify({
        infoPoint,
      })
    );
  } catch (error) {}
}
