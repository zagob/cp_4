"use client";
import { useQuery } from "@tanstack/react-query";
import { AddInfoPoint } from "./AddInfoPoint";
import { AddPoint } from "./AddPoint";
import { DataTable } from "./DataTable";
import { Graphic } from "./Graphic";
import axios from "axios";
import { LiaSpinnerSolid } from "react-icons/lia";

function GetInfoPoint() {
  return useQuery({
    queryKey: ["infoPoint"],
    queryFn: async () => {
      const { data } = await axios.get("/api/infoPoint/get");

      return data;
    },
    refetchOnWindowFocus: true,
  });
}

interface GetInfoPointProps {
  data: {
    infoPoint: null | {};
  };
  isLoading: boolean;
}

export function Dashboard() {
  const { data, isLoading } = GetInfoPoint() as GetInfoPointProps;

  console.log("info", data);

  return (
    <div className="border border-zinc-700 min-h-screen p-2 grid grid-rows-5 gap-2">
      <div className="flex gap-2 row-span-4">
        {isLoading ? (
          <div className="w-[340px] bg-zinc-800 rounded shadow-md p-2 pt-10 flex flex-col items-center justify-center gap-6">
            <LiaSpinnerSolid size={36} className="animate-spin text-zinc-300" />
          </div>
        ) : (
          <>{data?.infoPoint ? <AddPoint /> : <AddInfoPoint />}</>
        )}

        <DataTable infoPoint={!data?.infoPoint} />
      </div>

      <Graphic infoPoint={!data?.infoPoint} />
    </div>
  );
}
