import { db } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const infoPoint = await db.infoPoint.findUnique({
      where: {
        id: "cll5aowdf0000g9lcxw0xf8s5",
      },
    });

    console.log("infoPoint", infoPoint);

    return new Response(
      JSON.stringify({
        infoPoint,
      })
    );
  } catch (error) {}
}
