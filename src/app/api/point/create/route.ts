import { db } from "@/lib/prisma";
import { PointValidator } from "@/lib/validators/point";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = PointValidator.parse(body);

    const findPointSameDate = await db.point.findFirst({
      where: {
        createdAt: data.createdAt,
      },
    });

    if (findPointSameDate) {
      return new Response("Point already exist", { status: 400 });
    }

    await db.point.create({
      data,
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
