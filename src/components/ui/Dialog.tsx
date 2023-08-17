"use client";
import React, { ReactNode, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "./Button";

interface DialogDemoProps {
  title: string;
  description: string;
  children?: ReactNode;
  onConfirm: () => void;
  elementOpen: ReactNode;
  isLoading?: boolean;
}

const DialogDemo = ({
  elementOpen,
  title,
  description,
  children,
  onConfirm,
  isLoading,
}: DialogDemoProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{elementOpen}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-zinc-950/60 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-zinc-100 m-0 text-[17px] font-medium">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-zinc-100 mt-[10px] mb-5 text-[15px] leading-normal">
            {description}
          </Dialog.Description>

          {children}

          <div className="mt-[20px] grid grid-cols-2 gap-2">
            <Dialog.Close asChild>
              <Button className="" color="secondary">
                Cancelar
              </Button>
            </Dialog.Close>
            <Button
              type="button"
              onClick={() => {
                onConfirm();
                setOpen(false);
              }}
              isLoading={isLoading}
            >
              Salvar
            </Button>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-zinc-100 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <AiOutlineClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDemo;
