import { Merge } from "../../utils/merge";

type Props = React.ComponentProps<"button"> & {
  disabled?: boolean;
  variant: "blue" | "gray";
};

const variants = {
  gray: "bg-gray-200 text-gray-500 p-2",
  blue: "bg-theme-blue text-white py-3 font-medium mt-6 w-full",
};

export function Button({ disabled, variant, children, className }: Props) {
  return (
    <button
      disabled={disabled}
      className={Merge([
        "rounded-md flex items-center justify-center gap-1 hover:cursor-pointer hover:brightness-80 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className,
      ])}
    >
      {children}
    </button>
  );
}
