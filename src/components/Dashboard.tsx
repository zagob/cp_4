// "use client";
import { useQuery } from "@tanstack/react-query";
import { AddInfoPoint } from "./AddInfoPoint";
import { AddPoint } from "./AddPoint";
import { DataTable } from "./DataTable";
import { Graphic } from "./Graphic";
import axios from "axios";

function GetInfoPoint() {
  return useQuery({
    queryKey: ["infoPoint"],
    queryFn: async () => {
      const { data } = await axios.get("/api/infoPoint/get");

      return data;
    },
    refetchOnWindowFocus: true,
    // suspense: true,
  });
}

export function Dashboard() {
  const { data, isLoading } = GetInfoPoint();

  console.log(data);

  return (
    <div className="border border-zinc-700 min-h-screen p-2 grid gap-2">
      <div className="flex gap-2">
        {isLoading ? (
          "Loading"
        ) : (
          <>{data?.infoPoint ? <AddPoint /> : <AddInfoPoint />}</>
        )}

        <DataTable />
      </div>

      <Graphic />
    </div>
  );
}
