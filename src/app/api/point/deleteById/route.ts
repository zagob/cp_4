import { db } from "@/lib/prisma";
import { z } from "zod";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);

    const id = url.searchParams.get("id")?.toString();

    const existPoint = await db.point.findFirst({
      where: {
        id,
      },
    });

    if (!existPoint) {
      return new Response("Not Exist point by ID", { status: 400 });
    }

    await db.point.delete({
      where: {
        id,
      },
    });

    return new Response("Point deleted Success");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid params", { status: 422 });
    }

    return new Response("Internal server error", { status: 500 });
  }
}
