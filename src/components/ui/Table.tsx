"use client";

import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import clsx from "clsx";

interface TableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  classValue?: (row: Row<TData>) => Record<string, boolean>;
}

export function Table<TData, TValue>({
  data,
  columns,
  classValue,
}: TableProps<TData, TValue>) {
  const [parent] = useAutoAnimate({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div ref={parent} className="p-2 w-full">
      <table className="border w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="border text-left border-zinc-700 p-2 text-sm capitalize bg-zinc-600"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className={clsx(
                    "border border-zinc-700 p-2 text-sm text-zinc-300 bg-zinc-900",
                    classValue ? classValue(row) : {}
                  )}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
