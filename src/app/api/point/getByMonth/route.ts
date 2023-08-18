import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { transformPoints } from "@/utils/point";

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(req.url);

    const month = Number(url.searchParams.get("month"));
    const year = Number(url.searchParams.get("year"));

    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);

    const points = await db.point.findMany({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const pointsStatus = await db.point.findMany({
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

    const disabledDays = points.map((point) => new Date(point.createdAt));

    const formatPoints = transformPoints(points, 480);
    const formatPointsStatus = transformPoints(pointsStatus, 480).reduce(
      (acc, value) => {
        if (value.status === -1 || value.status === 1) {
          acc.totalMinutes = acc.totalMinutes + value.bonusMinutes;
          return acc;
        }

        return acc;
      },
      {
        totalMinutes: 0,
      }
    );

    return new Response(
      JSON.stringify({
        points: formatPoints,
        disabledDays,
        testePoints: points,
        bonusByMonth: formatPointsStatus,
      })
    );
  } catch (error) {}
}
