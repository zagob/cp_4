import { Button } from "./ui/Button";
import { format } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { Select } from "./ui/Select";

interface FilterProps {
  month: number;
  year: number;
  onBackMonth: () => void;
  onNextMonth: () => void;
}

export function Filter({ month, year, onBackMonth, onNextMonth }: FilterProps) {
  return (
    <>
      <div className="flex items-center gap-2 w-[400px]  p-2">
        <div className="flex items-center border-zinc-600 h-fit w-fit rounded">
          <Button disabled={month === 1} onClick={onBackMonth}>
            {"<"}
          </Button>
          <div className="h-full w-[150px] text-center">
            {format(new Date(year, month, 0), "MMMM", {
              locale: ptBr,
            })}
          </div>
          <Button disabled={month === 12} onClick={onNextMonth}>
            {">"}
          </Button>
        </div>

        <span>{year}</span>
      </div>
      <Select />
    </>
  );
}
