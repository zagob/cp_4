import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { transformPoints } from "@/utils/point";
import { format } from "date-fns";

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const totalMinutes: number | undefined = (
      await db.collection("users").doc(session.user.id).get()
    ).data()?.infoPoint.totalMinutes;

    if (!totalMinutes) {
      return new Response("Not found info points", { status: 404 });
    }

    const url = new URL(req.url);

    const month = Number(url.searchParams.get("month"));
    const year = Number(url.searchParams.get("year"));

    const firstDayOfMonth = format(new Date(year, month - 1, 1), "yyyy-MM-dd");
    const lastDayOfMonth = format(new Date(year, month, 0), "yyyy-MM-dd");

    const points = db
      .collection("users")
      .doc(session.user.id)
      .collection("points")
      .where("createdAt", ">=", firstDayOfMonth)
      .where("createdAt", "<=", lastDayOfMonth)
      .orderBy("createdAt", "asc");

    const pointsData = (await points.get()).docs.map((point) => {
      const { time1, time2, time3, time4, createdAt, holiday } = point.data();

      return {
        id: point.id,
        time1,
        time2,
        time3,
        time4,
        createdAt,
        holiday,
      };
    });
    const pointsStatus = pointsData.filter((point) => !point.holiday);

    const formatPointsData = transformPoints(pointsData, totalMinutes);
    const formatPointsStatusData = transformPoints(
      pointsStatus,
      totalMinutes
    ).reduce(
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

    const disabledDays = formatPointsData.map(
      (point) => new Date(point.createdAt)
    );

    return new Response(
      JSON.stringify({
        points: formatPointsData,
        disabledDays,
        bonusByMonth: formatPointsStatusData,
      })
    );
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
