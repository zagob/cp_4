"use client";
import { InfoPointProps } from "@/app/api/infoPoint/get/route";
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
  onRefetchInfoPoint: () => void;
  infoPointData: InfoPointProps | null;
  isLoadingInfoPoint: boolean;
  isLoadingPoints: boolean;
}

export const PointContext = createContext({} as PointContextProps);

export function PointProvider({ children }: { children: ReactNode }) {
  const [filterMonth, setFilterMonth] = useState(getMonth(new Date()) + 1);
  const [filterYear, setFilterYear] = useState(getYear(new Date()));

  const {
    data: infoPointData,
    isLoading: isLoadingInfoPoint,
    refetch: refetchInfoPoint,
  } = useQuery({
    queryKey: ["infoPoint"],
    queryFn: async () => {
      const { data } = await axios.get<{ totalMinutes: InfoPointProps }>(
        "/api/infoPoint/get"
      );

      if (!data.totalMinutes) {
        return null;
      }

      return data?.totalMinutes;
    },
    refetchOnWindowFocus: false,
  });

  const {
    data,
    refetch,
    isLoading: isLoadingPoints,
  } = useQuery<{
    points: PointsUseQueryProps[];
    disabledDays: Date[] | [];
    bonusByMonth: {
      totalMinutes: number;
    };
  }>({
    queryKey: ["pointsByMonth", filterMonth, filterYear, infoPointData],
    queryFn: async () => {
      const { data } = await axios.get("/api/point/getByMonth", {
        params: {
          month: filterMonth,
          year: filterYear,
        },
      });

      return data;
    },
    refetchOnWindowFocus: false,
    enabled: !!infoPointData,
  });

  // const { data: dataMonths } = useQuery({
  //   queryKey: ["pointsByYear", filterYear],
  //   queryFn: async () => {
  //     const { data } = await axios.get("/api/point/getByYear", {
  //       params: {
  //         year: filterYear,
  //       },
  //     });

  //     return data;
  //   },
  //   refetchOnWindowFocus: false,
  //   enabled: false,
  // });

  function onRefechPoints() {
    refetch();
  }

  function onRefetchInfoPoint() {
    refetchInfoPoint();
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
        onRefetchInfoPoint,
        infoPointData,
        isLoadingInfoPoint,
        isLoadingPoints,
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
