import React from "react";
import * as SelectRadix from "@radix-ui/react-select";
import { IoIosArrowDown, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { format, getMonth } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";

interface ItemsProps {
  value: string;
  label: string;
}

interface SelectProps {
  value: string | undefined;
  onValueChange: (value: string) => void;
  items: ItemsProps[];
}

export function Select({ items, value, onValueChange }: SelectProps) {
  return (
    <SelectRadix.Root value={value} onValueChange={onValueChange}>
      <SelectRadix.Trigger className="inline-flex w-full items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] bg-zinc-900 text-zinc-200 shadow-[0_2px_10px] shadow-black/10 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-zinc-200 outline-none">
        <SelectRadix.Value className="text-white" />
        <SelectRadix.Icon>
          <IoIosArrowDown />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>

      <SelectRadix.Portal>
        <SelectRadix.Content
          position="popper"
          className="overflow-hidden w-full bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <SelectRadix.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default" />
          <SelectRadix.Viewport className="p-[5px]">
            <SelectRadix.Group>
              {items.map((item) => (
                <SelectRadix.Item
                  key={item.value}
                  value={item.value}
                  className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                >
                  <SelectRadix.ItemText>{item.label}</SelectRadix.ItemText>
                  <SelectRadix.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                    <IoMdCheckmarkCircleOutline />
                  </SelectRadix.ItemIndicator>
                </SelectRadix.Item>
              ))}
            </SelectRadix.Group>
          </SelectRadix.Viewport>
          <SelectRadix.ScrollDownButton />
          <SelectRadix.Arrow />
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  );
}
