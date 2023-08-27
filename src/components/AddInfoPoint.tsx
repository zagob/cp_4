"use client";
import { FormEvent, useReducer } from "react";
import { Button } from "./ui/Button";
import { LabelInput } from "./ui/LabelInput";
import { timeToMinutes } from "@/utils/time";
import { useMutation } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { usePointProvider } from "@/contexts/PointProvider";
import { toast } from "react-hot-toast";

type State = {
  start1: string;
  exit1: string;
  start2: string;
  exit2: string;
  totalMinutes: string;
};

type Action =
  | {
      type: "VALUE";
      input: "start1" | "exit1" | "start2" | "exit2" | "totalMinutes";
      value: string;
    }
  | { type: "RESET" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "VALUE":
      return { ...state, [action.input]: action.value };
    case "RESET":
      return {
        ...state,
        start1: "",
        exit1: "",
        start2: "",
        exit2: "",
        totalMinutes: "",
      };
    default:
      return state;
  }
};

export function AddInfoPoint() {
  const { onRefetchInfoPoint } = usePointProvider();
  const [state, dispatch] = useReducer(reducer, {
    start1: "",
    exit1: "",
    start2: "",
    exit2: "",
    totalMinutes: "",
  });

  const { mutate: AddPoint, isLoading } = useMutation({
    mutationFn: async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const values = {
        start1: timeToMinutes(state.start1),
        exit1: timeToMinutes(state.exit1),
        start2: timeToMinutes(state.start2),
        exit2: timeToMinutes(state.exit2),
        totalMinutes: timeToMinutes(state.totalMinutes),
      };

      dispatch({ type: "RESET" });
      return await axios.post("/api/infoPoint/create", values);
    },
    onSuccess() {
      onRefetchInfoPoint();
      return toast.success("Informacoes de pontos criados com sucesso");
    },

    onError() {
      return toast.error("Houve um erro, tente novamente!");
    },
  });

  return (
    <div className="w-[340px] bg-zinc-800 rounded shadow-md px-4 pt-10 flex flex-col items-center gap-6">
      <h1>Informações de ponto</h1>

      <form onSubmit={AddPoint} className="grid gap-3">
        <div className="flex gap-2">
          <LabelInput
            label="Entrada 1"
            value={state.start1}
            onChange={(value) =>
              dispatch({
                type: "VALUE",
                input: "start1",
                value,
              })
            }
          />
          <LabelInput
            label="Saída 1"
            value={state.exit1}
            onChange={(value) =>
              dispatch({
                type: "VALUE",
                input: "exit1",
                value,
              })
            }
          />
        </div>
        <div className="flex gap-2">
          <LabelInput
            label="Entrada 2"
            value={state.start2}
            onChange={(value) =>
              dispatch({
                type: "VALUE",
                input: "start2",
                value,
              })
            }
          />
          <LabelInput
            label="Saída 2"
            value={state.exit2}
            onChange={(value) =>
              dispatch({
                type: "VALUE",
                input: "exit2",
                value,
              })
            }
          />
        </div>
        <div className="grid grid-cols-2">
          <div />
          <LabelInput
            label="Total horas"
            value={state.totalMinutes}
            onChange={(value) =>
              dispatch({
                type: "VALUE",
                input: "totalMinutes",
                value,
              })
            }
          />
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          color="primary"
          className="mt-2 h-8 flex justify-center"
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters size={22} className="animate-spin" />
          ) : (
            "Salvar"
          )}
        </Button>
      </form>
    </div>
  );
}
