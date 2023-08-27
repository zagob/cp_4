import { minutesToTime } from "./time";

export interface PointProps {
  id: string;
  time1: number;
  time2: number;
  time3: number;
  time4: number;
  holiday?: boolean | null;
  createdAt: Date;
}

export function transformPoints(
  // points: PointProps[] | [],
  points: FirebaseFirestore.DocumentData[],
  totalWorkMinutes: number
) {
  return points.map(
    ({ id, createdAt, time1, time2, time3, time4, holiday }) => {
      const timeMorning = minutesToTime(time2 - time1);
      const lunch = minutesToTime(time3 - time2);
      const timeAfteernon = minutesToTime(time4 - time3);
      const totalWork = minutesToTime(time2 - time1 + time4 - time3);
      const bonus = time2 - time1 + time4 - time3 - totalWorkMinutes;
      const status = Math.sign(bonus);

      return {
        id,
        time1: minutesToTime(time1),
        time2: minutesToTime(time2),
        time3: minutesToTime(time3),
        time4: minutesToTime(time4),
        createdAt,
        timeMorning,
        lunch,
        timeAfteernon,
        totalWork,
        bonus: minutesToTime(Math.abs(bonus)),
        bonusMinutes: bonus,
        status,
        holiday,
      };
    }
  );
}

export const PointStatusEnum = {
  1: "UP",
  0: "EQUAL",
  "-1": "DOWN",
};
