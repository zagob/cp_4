import { Table } from "./ui/Table";
import { format } from "date-fns";
import { usePointProvider } from "@/contexts/PointProvider";
import clsx from "clsx";
import { ModalConfirmDeletePoint } from "./ModalConfirmDeletePoint";
import { Card } from "./ui/Card";

interface DataTableProps {
  infoPoint: boolean;
}

export function DataTable({ infoPoint }: DataTableProps) {
  const { points } = usePointProvider();

  if (points.length === 0) {
    return (
      <Card
        disabled={infoPoint}
        className="flex flex-1 items-center justify-center"
      >
        <h1 className="text-2xl text-zinc-500">Nenhum ponto cadastrado</h1>
      </Card>
    );
  }

  return (
    <div className="flex-1 bg-zinc-800 rounded shadow-md px-4 pt-4">
      {/* <Filter /> */}
      <Table
        data={points}
        classValue={(row) => {
          const { holiday } = row.original;

          return {
            ["opacity-50"]: holiday,
          };
        }}
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
            header: "Horas Trabalhadas",
            accessorKey: "totalWork",
          },
          {
            header: "Bonús",
            accessorKey: "bonus",
            cell: ({ row }) => {
              const { status, bonus, holiday } = row?.original;
              return (
                <div className="flex items-center gap-2">
                  {bonus}{" "}
                  <div
                    className={clsx("w-2.5 h-2.5 rounded-full", {
                      ["bg-zinc-700"]: status === -1 && holiday,
                      ["bg-green-500"]: status === 1 && !holiday,
                      ["bg-red-500"]: status === -1 && !holiday,
                      ["bg-zinc-500"]: status === 0 && !holiday,
                    })}
                  />
                </div>
              );
            },
          },
          {
            header: "Ações",
            cell: ({ row }) => {
              return <ModalConfirmDeletePoint id={row.original.id} />;
            },
          },
        ]}
      />
    </div>
  );
}
