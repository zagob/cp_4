import clsx from "clsx";
import { ComponentProps } from "react";

interface CardProps extends ComponentProps<"div"> {
  disabled?: boolean;
}

export function Card({ disabled = false, children, className }: CardProps) {
  return (
    <div
      className={clsx("bg-zinc-800 rounded shadow-md p-2", {
        [`${className}`]: className?.length,
        ["opacity-50 cursor-not-allowed"]: disabled,
      })}
    >
      {children}
    </div>
  );
}
