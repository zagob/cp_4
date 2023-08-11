import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import ptBr from "date-fns/locale/pt";
import { format } from "date-fns";

interface CalendarProps {
  selected: Date | undefined;
  onSelect: SelectSingleEventHandler | undefined;
  onChangeMonth?: (date: Date) => void;
  disabledDays?: Date[] | [];
}

export function Calendar({
  onSelect,
  onChangeMonth,
  selected,
  disabledDays = [],
}: CalendarProps) {
  const footer = selected ? (
    <span className="text-xs">
      Data selecionada:{" "}
      <time className="text-zinc-200">
        {format(selected, "dd 'de' MMMM 'de' yyy ", {
          locale: ptBr,
        })}
      </time>
    </span>
  ) : (
    <span className="text-xs text-red-500">Nenhuma data selecionada</span>
  );

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      onMonthChange={onChangeMonth}
      captionLayout="dropdown"
      // disabled={[{ dayOfWeek: [0, 6] }, ...disabledDays]}
      disabled={[
        { dayOfWeek: [0, 6] },
        ...disabledDays.map((item) => new Date(item)),
      ]}
      modifiers={{
        available: { dayOfWeek: [1, 2, 3, 4, 5] },
      }}
      modifiersStyles={{
        disabled: {
          cursor: "not-allowed",
          opacity: 0.4,
        },
      }}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 bg-zinc-900 rounded p-4",
        month: "space-y-2",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-zinc-600 rounded",
        day_selected:
          "bg-zinc-700 rounded hover:bg-zinc-700 border border-zinc-700 text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today:
          "text-green-500 hover:text-green-500 bg-zinc-900 text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
      }}
      locale={ptBr}
      footer={footer}
    />
  );
}
