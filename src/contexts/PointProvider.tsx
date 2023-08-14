import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getMonth, getYear } from "date-fns";
import { ReactNode, createContext, useContext, useState } from "react";

interface PointsUseQueryProps {
  id: string;
  time1: string;
  time2: string;
  time3: string;
  time4: string;
  timeAfteernon: string;
  timeMorning: string;
  holiday: boolean;
  bonus: string;
  totalWork: string;
  lunch: string;
  status: number;
  createdAt: string;
}

interface PointContextProps {
  onChangeMonth: (month: number) => void;
  onChangeYear: (year: number) => void;
  onChangeFilterDate: (date: Date) => void;
  filterMonth: number;
  filterYear: number;
  points: PointsUseQueryProps[] | [];
  disabledDays: Date[] | [];
  bonusByMonth: number | undefined;
  onRefechPoints: () => void;
}

export const PointContext = createContext({} as PointContextProps);

export function PointProvider({ children }: { children: ReactNode }) {
  const [filterMonth, setFilterMonth] = useState(getMonth(new Date()) + 1);
  const [filterYear, setFilterYear] = useState(getYear(new Date()));

  const { data, refetch } = useQuery<{
    points: PointsUseQueryProps[];
    disabledDays: Date[] | [];
    bonusByMonth: {
      totalMinutes: number;
    };
  }>({
    queryKey: ["pointsByMonth", filterMonth, filterYear],
    queryFn: async () => {
      const { data } = await axios.get("/api/point/getByMonth", {
        params: {
          month: filterMonth,
          year: filterYear,
        },
      });

      return data;
    },
    refetchOnWindowFocus: true,
  });

  const { data: dataMonths } = useQuery({
    queryKey: ["pointsByYear", filterYear],
    queryFn: async () => {
      const { data } = await axios.get("/api/point/getByYear", {
        params: {
          // month: 0,
          year: filterYear,
        },
      });

      console.log("getByYear------", data);

      return data;
    },
    refetchOnWindowFocus: true,
  });

  console.log("filter date", filterMonth, filterYear);
  console.log("data", data);

  function onRefechPoints() {
    refetch();
  }

  function onChangeFilterDate(date: Date) {
    setFilterMonth(getMonth(date) + 1);
    setFilterYear(getYear(date));
  }

  function onChangeMonth(month: number) {
    setFilterMonth(month);
  }

  function onChangeYear(year: number) {
    setFilterYear(year);
  }

  return (
    <PointContext.Provider
      value={{
        onChangeYear,
        onChangeMonth,
        onChangeFilterDate,
        onRefechPoints,
        bonusByMonth: data?.bonusByMonth.totalMinutes,
        filterMonth,
        filterYear,
        points: data?.points ?? [],
        disabledDays: data?.disabledDays ?? [],
      }}
    >
      {children}
    </PointContext.Provider>
  );
}

export function usePointProvider() {
  const point = useContext(PointContext);
  return point;
}
