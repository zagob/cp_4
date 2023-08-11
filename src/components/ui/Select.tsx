import React from "react";
import * as SelectRadix from "@radix-ui/react-select";
import { IoIosArrowDown } from "react-icons/io";
// import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

export function Select() {
  return (
    <SelectRadix.Root>
      <SelectRadix.Trigger className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-zinc-900 text-zinc-200 shadow-[0_2px_10px] shadow-black/10 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-zinc-200 outline-none">
        <SelectRadix.Value
          className="text-white"
          placeholder="Selecione um mês"
        />
        <SelectRadix.Icon>
          <IoIosArrowDown />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>

      <SelectRadix.Portal>
        <SelectRadix.Content>
          <SelectRadix.ScrollUpButton />
          <SelectRadix.Viewport>
            <SelectRadix.Item value="t">
              <SelectRadix.ItemText />
              <SelectRadix.ItemIndicator />
            </SelectRadix.Item>
          </SelectRadix.Viewport>
          <SelectRadix.ScrollDownButton />
          <SelectRadix.Arrow />
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  );
}
