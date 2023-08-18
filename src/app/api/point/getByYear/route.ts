import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { months } from "@/utils/months";
import { transformPoints } from "@/utils/point";
import { getMonth } from "date-fns";

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(req.url);

    const year = Number(url.searchParams.get("year"));

    const firstDayOfMonth = new Date(year, 0, 1);
    const lastDayOfMonth = new Date(year, 12, 0);

    const points = await db.point.findMany({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
        holiday: false,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const pointsTransform = transformPoints(points, 480);

    return new Response(
      JSON.stringify({
        points,
        pointsTransform: months.map((month) => {
          return {
            ...month,
            pointMonth: pointsTransform
              .filter((point) => getMonth(point.createdAt) + 1 === month.month)
              .reduce((acc, value) => {
                if (value.status === -1 || value.status === 1) {
                  acc = acc + value.bonusMinutes;
                  return acc;
                }

                return acc;
              }, 0),
          };
        }),
      })
    );
  } catch (error) {}
}
