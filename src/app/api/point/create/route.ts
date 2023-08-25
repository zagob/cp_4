import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { PointValidator } from "@/lib/validators/point";
import { format } from "date-fns";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const data = PointValidator.parse(body);

    // console.log("data", data);

    // const findPointSameDate = await db.point.findFirst({
    //   where: {
    //     createdAt: data.createdAt,
    //   },
    // });

    // if (findPointSameDate) {
    //   return new Response("Point already exist", { status: 400 });
    // }

    // await db.point.create({
    //   data: {
    //     ...data,
    //     userId: session.user.id,
    //   },
    // });
    db.collection("users")
      .doc(session.user.id)
      .collection("points")
      .doc()
      .create({
        date: format(new Date(data.createdAt), "yyyy-MM-dd"),
        ...data,
      });

    return new Response("Create infoPoint Success");
  } catch (error) {
    console.log("errrr", error);
    if (error instanceof z.ZodError) {
      return new Response("Invalid data request", { status: 422 });
    }

    return new Response("Internal server error", { status: 500 });
  }
}
