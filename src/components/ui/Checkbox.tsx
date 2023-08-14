import * as CheckboxRadix from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { BiCheck } from "react-icons/bi";

interface CheckboxProps {
  checked: boolean;
  onChecked: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

export function Checkbox({
  label,
  disabled = false,
  checked,
  onChecked,
}: CheckboxProps) {
  return (
    <div className="flex items-center group">
      <CheckboxRadix.Root
        className="flex h-[25px] w-[25px] group disabled:opacity-50 disabled:cursor-not-allowed appearance-none items-center justify-center rounded-[4px] bg-zinc-900 outline-none"
        defaultChecked
        id={label}
        checked={checked}
        onCheckedChange={onChecked}
        disabled={disabled}
      >
        <CheckboxRadix.Indicator className="text-violet11 group-checked:border ">
          <BiCheck size={22} className="text-green-500" />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      <label
        className={clsx(
          "pl-[8px] text-[15px] leading-none text-white cursor-pointer",
          {
            ["opacity-40 cursor-not-allowed"]: disabled,
          }
        )}
        htmlFor={label}
      >
        {label}
      </label>
    </div>
  );
}
