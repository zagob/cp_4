import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/Button";
import DialogDemo from "./ui/Dialog";
import { FiTrash2 } from "react-icons/fi";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { usePointProvider } from "@/contexts/PointProvider";

interface ModalConfirmDeletePointProps {
  id: string;
}

export function ModalConfirmDeletePoint({ id }: ModalConfirmDeletePointProps) {
  const { onRefechPoints } = usePointProvider();
  const { mutate: handleDeletePoint, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axios.delete("/api/point/deleteById", {
        params: {
          id,
        },
      });

      return response;
    },
    onSuccess(data) {
      if (!data) {
        return;
      }
      toast.success("Ponto deletado com sucesso!");
      onRefechPoints();
    },

    onError(error: AxiosError) {
      return toast.error(`Erro ao deletar ponto! ${error?.response?.data}`);
    },
  });

  return (
    <DialogDemo
      title="Deletar Ponto"
      description="Deseja realmente deletar o ponto?"
      elementOpen={
        <FiTrash2
          size={20}
          className="text-red-300 hover:cursor-pointer hover:text-red-400 transition-all"
        />
      }
      onConfirm={handleDeletePoint}
      isLoading={isLoading}
    />
  );
}
