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

    const query = db.collection("infoPoints").doc(session.user.id);

    const infoPoint = (await query.get()).data();

    // const infoPoint = await db.infoPoint.findUnique({
    //   where: {
    //     userId: session.user.id,
    //   },
    // });

    if (!infoPoint) {
      return new Response("Not found info points", { status: 404 });
    }

    const totalMinutes = infoPoint?.totalMinutes;

    const url = new URL(req.url);

    const month = Number(url.searchParams.get("month"));
    const year = Number(url.searchParams.get("year"));

    const firstDayOfMonth = format(new Date(year, month - 1, 1), "yyyy-MM-dd");
    const lastDayOfMonth = format(new Date(year, month, 0), "yyyy-MM-dd");

    console.log("firstDayOfMonth", firstDayOfMonth);
    console.log("lastDayOfMonth", lastDayOfMonth);

    const points = db
      .collection("users")
      .doc(session.user.id)
      .collection("points")
      .where("createdAt", ">=", firstDayOfMonth)
      .where("createdAt", "<=", lastDayOfMonth)
      .orderBy("asc");

    const pointsStatus = db
      .collection("users")
      .doc(session.user.id)
      .collection("points")
      .where("holiday", "==", false)
      .where("createdAt", ">=", firstDayOfMonth)
      .where("createdAt", "<=", lastDayOfMonth)
      .orderBy("asc");

    const pointsData = (await points.get()).docs.map((point) => point.data());
    const pointsStatusData = (await pointsStatus.get()).docs.map((point) =>
      point.data()
    );

    // return new Response(
    //   JSON.stringify({
    //     points: [],
    //     disabledDays: [],
    //     testePoints: [],
    //     bonusByMonth: [],
    //   })
    // );

    // const points = await db.point.findMany({
    //   where: {
    //     userId: session.user.id,
    //     createdAt: {
    //       gte: firstDayOfMonth,
    //       lte: lastDayOfMonth,
    //     },
    //   },
    //   orderBy: {
    //     createdAt: "asc",
    //   },
    // });

    // const pointsStatus = await db.point.findMany({
    //   where: {
    //     userId: session.user.id,
    //     createdAt: {
    //       gte: firstDayOfMonth,
    //       lte: lastDayOfMonth,
    //     },
    //     holiday: false,
    //   },
    //   orderBy: {
    //     createdAt: "asc",
    //   },
    // });

    const disabledDays = pointsData.map((point) => new Date(point.createdAt));

    const formatPoints = transformPoints(pointsData, totalMinutes);
    const formatPointsStatus = transformPoints(
      pointsStatusData,
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
