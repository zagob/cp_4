import { ComponentProps } from "react";
import { VariantProps, tv } from "tailwind-variants";
import { FiLoader } from "react-icons/fi";

const buttonVariants = tv({
  base: "border border-zinc-700 py-1 px-3 rounded bg-zinc-800 text-zinc-200 text-sm hover:brightness-125 transition-all disabled:opacity-60 disabled:brightness-100 disabled:cursor-not-allowed",
  variants: {
    color: {
      primary: "bg-green-600 border border-green-500",
      secondary: "bg-red-700 border border-red-500",
    },
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = { isLoading?: boolean } & ComponentProps<"button"> &
  ButtonVariants;

export function Button({
  children,
  isLoading = false,
  color,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button className={buttonVariants({ color, className })} {...rest}>
      {!isLoading ? (
        <>{children}</>
      ) : (
        <FiLoader size={20} className="animate-spin" />
      )}
    </button>
  );
}
