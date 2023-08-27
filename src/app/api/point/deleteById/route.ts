import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { z } from "zod";

export async function DELETE(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(req.url);

    const id = url.searchParams.get("id")?.toString();

    const existPoint = db
      .collection("users")
      .doc(session.user.id)
      .collection("points")
      .doc(id!);

    if (!existPoint) {
      return new Response("Not Exist point by ID", { status: 400 });
    }

    db.collection("users")
      .doc(session.user.id)
      .collection("points")
      .doc(id!)
      .delete({
        exists: true,
      });

    return new Response("Point deleted Success");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid params", { status: 422 });
    }

    return new Response("Internal server error", { status: 500 });
  }
}
