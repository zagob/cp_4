import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { InfoPointValidator } from "@/lib/validators/infoPoint";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const data = InfoPointValidator.parse(body);

    const { start1, exit1, start2, exit2, totalMinutes } = data;

    const time1 = exit1 - start1;
    const time2 = exit2 - start2;
    const totalTimes = time1 + time2;

    if (totalTimes !== totalMinutes) {
      return new Response("totalMinutes not equal at times", { status: 400 });
    }

    db.collection("users").doc(session.user.id).update({
      infoPoint: data,
    });

    return new Response("infoPoint Created Success", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid data request", { status: 422 });
    }

    return new Response("Internal server error", { status: 500 });
  }
}
