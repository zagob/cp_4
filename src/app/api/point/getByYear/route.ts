import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { months } from "@/utils/months";
import { transformPoints } from "@/utils/point";
import { format, getMonth } from "date-fns";

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

    const year = Number(url.searchParams.get("year"));

    const firstDayOfMonth = format(new Date(year, 0, 1), "yyyy-MM-dd");
    const lastDayOfMonth = format(new Date(year, 12, 0), "yyyy-MM-dd");

    const queryPoints = db
      .collection("users")
      .doc(session.user.id)
      .collection("points")
      .where("createdAt", ">=", firstDayOfMonth)
      .where("createdAt", "<=", lastDayOfMonth)
      .where("holiday", "==", false)
      .orderBy("createdAt", "asc");

    const points = (await queryPoints.get()).docs.map((point) => point.data());

    const pointsTransform = transformPoints(points, totalMinutes);

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
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
