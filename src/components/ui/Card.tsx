import clsx from "clsx";
import { ComponentProps } from "react";

interface CardProps extends ComponentProps<"div"> {
  disabled?: boolean;
}

export function Card({ disabled = false, children, className }: CardProps) {
  return (
    <div
      className={clsx("flex-1 bg-zinc-800 rounded shadow-md px-4 pt-4", {
        [`${className}`]: className?.length,
        ["opacity-50 cursor-not-allowed"]: disabled,
      })}
    >
      {children}
    </div>
  );
}
