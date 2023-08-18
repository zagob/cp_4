import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const infoPoint = await db.infoPoint.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    return new Response(
      JSON.stringify({
        infoPoint,
      })
    );
  } catch (error) {}
}
