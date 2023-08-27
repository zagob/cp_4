"use client";
import { useQuery } from "@tanstack/react-query";
import { AddInfoPoint } from "./AddInfoPoint";
import { AddPoint } from "./AddPoint";
import { DataTable } from "./DataTable";
import { Graphic } from "./Graphic";
import axios from "axios";
import { LiaSpinnerSolid } from "react-icons/lia";
import { Card } from "./ui/Card";
import Image from "next/image";
import { UserCreationRequest } from "@/lib/validators/user";
import { FiPower } from "react-icons/fi";
import { Button } from "./ui/Button";
import { signOut } from "next-auth/react";
import { usePointProvider } from "@/contexts/PointProvider";

interface GetInfoPointProps {
  data: {
    infoPoint: null | {};
  };
  isLoading: boolean;
}

interface DashboardProps {
  user: UserCreationRequest;
}

export function Dashboard({ user }: DashboardProps) {
  const { infoPointData, isLoadingInfoPoint } = usePointProvider();

  return (
    <div className="border border-zinc-700 min-h-screen p-2 flex flex-col gap-2">
      <Card>
        <div className="flex items-center justify-between px-6 w-full">
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              width={32}
              height={32}
              src={user.image ?? ""}
              alt="Avatar"
            />
            <h2>{user.name}</h2>
          </div>
          <Button onClick={() => signOut()} className="flex items-center gap-2">
            <FiPower size={20} />
            Sair
          </Button>
        </div>
      </Card>
      <div className="flex flex-1 gap-2">
        {isLoadingInfoPoint ? (
          <div className="w-[340px] bg-zinc-800 rounded shadow-md p-2 pt-10 flex flex-col items-center justify-center gap-6">
            <LiaSpinnerSolid size={36} className="animate-spin text-zinc-300" />
          </div>
        ) : (
          <>{infoPointData ? <AddPoint /> : <AddInfoPoint />}</>
        )}

        <DataTable infoPoint={!infoPointData} />
      </div>

      {/* <Graphic infoPoint={!data?.infoPoint} /> */}
    </div>
  );
}
