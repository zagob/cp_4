import { ChangeEvent, ComponentProps } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

interface InputTimeProps extends ComponentProps<"input"> {}

export function InputTime({ ...rest }: InputTimeProps) {
  function TransformValueInput(event: ChangeEvent<HTMLInputElement>) {
    event.currentTarget.maxLength = 5;
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "$1:$2");
    event.currentTarget.value = value;
  }

  return (
    <div className="flex items-center p-2 bg-zinc-900 rounded border border-zinc-700 group">
      <input
        className="outline-none w-full bg-transparent placeholder:text-zinc-500 disabled:opacity-60 disabled:cursor-not-allowed"
        onInput={TransformValueInput}
        placeholder="00:00"
        {...rest}
      />
      <AiOutlineClockCircle size={22} />
    </div>
  );
}
