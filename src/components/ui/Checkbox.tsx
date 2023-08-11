import * as CheckboxRadix from "@radix-ui/react-checkbox";
import { BiCheck } from "react-icons/bi";

interface CheckboxProps {
  checked: boolean;
  onChecked: (checked: boolean) => void;
  label: string;
}

export function Checkbox({ label, checked, onChecked }: CheckboxProps) {
  return (
    <div className="flex items-center">
      <CheckboxRadix.Root
        className="flex h-[25px] w-[25px] group appearance-none items-center justify-center rounded-[4px] bg-zinc-900 outline-none"
        defaultChecked
        id="c1"
        checked={checked}
        onCheckedChange={onChecked}
      >
        <CheckboxRadix.Indicator className="text-violet11 group-checked:border ">
          <BiCheck size={22} className="text-green-500" />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      <label
        className="pl-[8px] text-[15px] leading-none text-white cursor-pointer"
        htmlFor="c1"
      >
        {label}
      </label>
    </div>
  );
}
