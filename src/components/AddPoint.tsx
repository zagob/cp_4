"use client";

import { FormEvent, useReducer, useState } from "react";
import { Calendar } from "./ui/Calendar";
import { Button } from "./ui/Button";
import { timeToMinutes } from "@/utils/time";
import { LabelInput } from "./ui/LabelInput";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Checkbox } from "./ui/Checkbox";
import { formatISO } from "date-fns";
import { toast } from "react-hot-toast";
import { usePointProvider } from "@/contexts/PointProvider";

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
  | { type: "DATE"; value: Date | undefined }
  | { type: "RESET" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "VALUE":
      return { ...state, [action.input]: action.value };
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
  const { onChangeFilterDate, disabledDays, onRefechPoints } =
    usePointProvider();
  const [checkedHoliday, setCheckHoliday] = useState(false);
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

      const values = {
        time1: timeToMinutes(state.time1),
        time2: timeToMinutes(state.time2),
        time3: timeToMinutes(state.time3),
        time4: timeToMinutes(state.time4),
        createdAt: formatISO(new Date(transformDate!)),
        holiday: checkedHoliday,
      };

      console.log("values", values);

      const { time1, time2, time3, time4 } = values;

      if (!values.createdAt) {
        toast.error("É necessário uma data válida");
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
    <div className="w-[340px] bg-zinc-800 rounded shadow-md p-2 pt-10 flex flex-col items-center gap-6">
      <Calendar
        selected={state.dateSelected}
        onSelect={(date) => dispatch({ type: "DATE", value: date })}
        onChangeMonth={onChangeFilterDate}
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

          <Checkbox
            checked={checkedHoliday}
            onChecked={setCheckHoliday}
            label="Feriado?"
          />
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
