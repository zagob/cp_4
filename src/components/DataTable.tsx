import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Button } from "./ui/Button";
import { Table } from "./ui/Table";
import { format, getMonth } from "date-fns";
import { Filter } from "./Filter";
import { useState } from "react";
import { usePointProvider } from "@/contexts/PointProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

const points = [
  {
    id: "point1",
    time1: "09:30",
    time2: "12:30",
    time3: "13:00",
    time4: "19:00",
  },
  {
    id: "point2",
    time1: "09:24",
    time2: "12:30",
    time3: "13:21",
    time4: "18:43",
  },
];

interface PointsUseQueryProps {
  id: string;
  time1: string;
  time2: string;
  time3: string;
  time4: string;
  holiday: boolean;
  totalTimes: string;
  lunch: string;
  status: "UP" | "DOWN" | "EQUAL";
  createdAt: string;
}

const year = 2023;

function GetPointsByMonth({ month, year }: { month: number; year: number }) {
  return useQuery<{ points: PointsUseQueryProps[] }>({
    queryKey: ["pointsByMonth"],
    queryFn: async () => {
      const { data } = await axios.get("/api/point/getByMonth", {
        params: {
          month,
          year,
        },
      });

      return data;
    },
    refetchOnWindowFocus: true,
  });
}

export function DataTable() {
  const { month, onBackMonth, onNextMonth } = usePointProvider();
  const { data } = GetPointsByMonth({ month, year });

  console.log("d", data?.points);

  return (
    <div className="flex-1 bg-zinc-800 rounded shadow-md p-2">
      <Filter
        month={month}
        year={year}
        onBackMonth={onBackMonth}
        onNextMonth={onNextMonth}
      />
      <Table
        data={data?.points ?? []}
        columns={[
          {
            header: "data",
            accessorKey: "createdAt",
            cell: ({ row }) =>
              format(new Date(row.original.createdAt), "dd/MM/yyy"),
          },
          {
            header: "Entrada",
            accessorKey: "time1",
          },
          {
            header: "Almoço",
            cell: ({ row }) => {
              const { time2, time3, lunch } = row?.original;
              return `(${time2} - ${time3}) ${lunch}`;
            },
          },
          {
            header: "Saída",
            accessorKey: "time4",
          },
          {
            header: "Bonús",
            accessorKey: "totalTimes",
            cell: ({ row }) => {
              const { status, totalTimes, holiday } = row?.original;
              return (
                <div className="flex items-center gap-2">
                  {totalTimes}{" "}
                  <div
                    className={clsx("w-2.5 h-2.5 rounded-full", {
                      ["bg-zinc-700"]: status === "DOWN" && holiday,
                      ["bg-green-500"]: status === "UP" && !holiday,
                      ["bg-red-500"]: status === "DOWN" && !holiday,
                      ["bg-zinc-500"]: status === "EQUAL" && !holiday,
                    })}
                  />
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
}
