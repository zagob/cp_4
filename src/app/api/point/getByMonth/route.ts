import { db } from "@/lib/prisma";
import { minutesToTime } from "@/utils/time";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const month = Number(url.searchParams.get("month"));
    const year = Number(url.searchParams.get("year"));

    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);

    const points = await db.point.findMany({
      where: {
        createdAt: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
    });

    console.log("points", points);

    const formatPoints = points.map((point) => {
      const times1 = point.time2 - point.time1;
      const times2 = point.time4 - point.time3;
      const totalTimes = times1 + times2;
      const countTotalTimeWithTotalWork = totalTimes - 480;
      const status =
        countTotalTimeWithTotalWork < 480
          ? "DOWN"
          : countTotalTimeWithTotalWork > 480
          ? "UP"
          : "EQUAL";

      return {
        ...point,
        time1: minutesToTime(point.time1),
        time2: minutesToTime(point.time2),
        time3: minutesToTime(point.time3),
        time4: minutesToTime(point.time4),
        lunch: minutesToTime(point.time3 - point.time2),
        totalTimes: minutesToTime(totalTimes),
        status,
        holiday:
          point.time1 === 0 &&
          point.time2 === 0 &&
          point.time3 === 0 &&
          point.time4 === 0,
      };
    });

    console.log("formatPoints", formatPoints);

    return new Response(
      JSON.stringify({
        points: formatPoints,
      })
    );
  } catch (error) {}
}
