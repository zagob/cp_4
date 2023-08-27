import { format } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { Select } from "./ui/Select";
import { usePointProvider } from "@/contexts/PointProvider";
import { useMemo } from "react";

export function Filter() {
  const { filterMonth, filterYear, onChangeMonth } = usePointProvider();

  const months = useMemo(() => {
    return Array.from({ length: 12 }).map((_, index) => {
      const monthNumber = index + 1;
      return {
        value: monthNumber.toString(),
        label: format(new Date(filterYear, monthNumber, 0), "MMMM", {
          locale: ptBr,
        }),
      };
    });
  }, [filterYear]);

  return (
    <>
      <div className="flex items-center gap-2 w-[300px]  p-2">
        <Select
          value={filterMonth.toString()}
          onValueChange={(month) => onChangeMonth(Number(month))}
          items={months}
        />
        <Select
          value={filterMonth.toString()}
          onValueChange={(month) => onChangeMonth(Number(month))}
          items={months}
        />
      </div>
    </>
  );
}
