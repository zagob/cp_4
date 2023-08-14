"use client";

import { FormEvent, useReducer, useState } from "react";
import { Calendar } from "./ui/Calendar";
import { Button } from "./ui/Button";
import { minutesToTime, timeToMinutes } from "@/utils/time";
import { LabelInput } from "./ui/LabelInput";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Checkbox } from "./ui/Checkbox";
import { format, formatISO } from "date-fns";
import { toast } from "react-hot-toast";
import { usePointProvider } from "@/contexts/PointProvider";
import clsx from "clsx";

type State = {
  time1: string;
  time2: string;
  time3: string;
  time4: string;
  dateSelected: Date | undefined;
};

type Action =
  | {
      type: "VALUE";
      input: "time1" | "time2" | "time3" | "time4";
      value: string;
    }
  | { type: "SETVALUE"; value: string }
  | { type: "DATE"; value: Date | undefined }
  | { type: "RESET" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "VALUE":
      return { ...state, [action.input]: action.value };
    case "SETVALUE":
      return {
        ...state,
        time1: action.value,
        time2: action.value,
        time3: action.value,
        time4: action.value,
      };
    case "RESET":
      return {
        time1: "",
        time2: "",
        time3: "",
        time4: "",
        dateSelected: undefined,
      };
    case "DATE":
      return { ...state, dateSelected: action.value };
    default:
      return state;
  }
};

export function AddPoint() {
  const {
    onChangeFilterDate,
    disabledDays,
    onRefechPoints,
    filterMonth,
    filterYear,
    bonusByMonth,
  } = usePointProvider();
  const [checkedHoliday, setCheckHoliday] = useState(false);
  const [missPoint, setMissPoint] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    time1: "",
    time2: "",
    time3: "",
    time4: "",
    dateSelected: new Date(),
  });

  console.log("state", state);

  const validStateTimeEqualToString = Object.values({
    time1: state.time1,
    time2: state.time2,
    time3: state.time3,
    time4: state.time4,
  }).every((item) => item.length === 5);

  const { mutate: handleAddPoint, isLoading } = useMutation({
    mutationFn: async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      console.log("state", state);

      const transformDate = state.dateSelected;

      if (!transformDate) {
        toast.error("Adicione uma data");
        return;
      }

      const dayWeek = new Date(transformDate).getDay();

      if (dayWeek === 0 || dayWeek === 6) {
        toast.error("Data invalida");
        return;
      }

      const values = {
        time1: timeToMinutes(state.time1),
        time2: timeToMinutes(state.time2),
        time3: timeToMinutes(state.time3),
        time4: timeToMinutes(state.time4),
        createdAt: formatISO(new Date(transformDate!)),
        holiday: checkedHoliday,
      };

      console.log("values", values);

      const existSameDate = disabledDays.find(
        (date) =>
          format(new Date(date), "dd-MM-yyyy") ===
          format(new Date(transformDate!), "dd-MM-yyy")
      );
      console.log(existSameDate);
      const { time1, time2, time3, time4 } = values;

      if (!values.createdAt) {
        toast.error("É necessário uma data válida");
        return;
      }

      if (existSameDate) {
        toast.error("Ja existe uma data cadastrada");
        return;
      }

      if (!checkedHoliday) {
        if (!validStateTimeEqualToString) {
          toast.error("Existem valores invalidos para serem preenchidos");
          return;
        }
      }

      if (
        time1 > time2 ||
        time1 > time3 ||
        time1 > time4 ||
        time2 > time3 ||
        time2 > time4 ||
        time3 > time4
      ) {
        toast.error("Valores inválidos de horários");
        return;
      }

      const response = await axios.post("/api/point/create", values);
      dispatch({ type: "RESET" });

      return response;
    },
    onSuccess(data) {
      if (!data) {
        return;
      }
      toast.success("Ponto criado com sucesso!");
      onRefechPoints();
    },

    onError(error: AxiosError) {
      return toast.error(`Erro ao criar ponto! ${error?.response?.data}`);
    },
  });

  return (
    <div className="w-[340px] bg-zinc-800 rounded shadow-md p-2 pt-6 flex flex-col items-center gap-6">
      <div className="bg-zinc-900 w-fit py-1 px-28 rounded">
        <h4
          className={clsx("text-xl", {
            ["text-green-500"]: Math.sign(bonusByMonth!) === 1,
            ["text-red-500"]: Math.sign(bonusByMonth!) === -1,
          })}
        >
          {minutesToTime(Math.abs(bonusByMonth!))}
        </h4>
      </div>
      <Calendar
        selected={state.dateSelected}
        onSelect={(date) => dispatch({ type: "DATE", value: date })}
        onChangeMonth={onChangeFilterDate}
        month={new Date(filterYear, filterMonth, 0)}
        disabledDays={disabledDays}
      />
      <form onSubmit={handleAddPoint} className="grid gap-2">
        <div className="grid gap-2 px-5">
          <div className="flex gap-2">
            <LabelInput
              label="Entrada 1"
              value={state.time1}
              onChange={(value) =>
                dispatch({
                  type: "VALUE",
                  input: "time1",
                  value,
                })
              }
              disabled={checkedHoliday}
            />
            <LabelInput
              label="Saída 1"
              value={state.time2}
              onChange={(value) =>
                dispatch({
                  type: "VALUE",
                  input: "time2",
                  value,
                })
              }
              disabled={checkedHoliday}
            />
          </div>
          <div className="flex gap-2">
            <LabelInput
              label="Entrada 2"
              value={state.time3}
              onChange={(value) =>
                dispatch({
                  type: "VALUE",
                  input: "time3",
                  value,
                })
              }
              disabled={checkedHoliday}
            />
            <LabelInput
              label="Saída 2"
              value={state.time4}
              onChange={(value) =>
                dispatch({
                  type: "VALUE",
                  input: "time4",
                  value,
                })
              }
              disabled={checkedHoliday}
            />
          </div>

          <div className="flex items-center gap-4">
            <Checkbox
              checked={checkedHoliday}
              onChecked={setCheckHoliday}
              label="Feriado?"
              disabled={missPoint}
            />
            <Checkbox
              checked={missPoint}
              onChecked={(checked) => {
                setMissPoint(checked);
                if (checked) {
                  dispatch({ type: "SETVALUE", value: "00:00" });
                } else {
                  dispatch({ type: "SETVALUE", value: "" });
                }
              }}
              label="Falta?"
              disabled={checkedHoliday}
            />
          </div>
        </div>

        <div className="w-full px-5">
          <Button
            disabled={!state.dateSelected || isLoading}
            isLoading={isLoading}
            type="submit"
            className="w-full py-2 bg-zinc-900 border flex justify-center"
          >
            Adicionar
          </Button>
        </div>
      </form>
    </div>
  );
}
