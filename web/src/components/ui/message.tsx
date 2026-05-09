import { useEffect } from "react";
import warningRed from "../../assets/warning-circle-red.svg";
import warningBlue from "../../assets/warning-circle-blue.svg";
import { Merge } from "../../utils/merge";

type Props = React.ComponentProps<"div"> & {
  title: string;
  text: string;
  variant: "red" | "blue";
  onClose: () => void;
};

const variants = {
  red: "bg-red-100 text-red-700",
  blue: "bg-blue-100 text-blue-500",
};

const icons = {
  red: warningRed,
  blue: warningBlue,
};

export function Message({ text, variant, title, onClose, ...rest }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={Merge(
        `fixed z-10 bottom-4 right-4 flex gap-2 rounded-md shadow-gray-300 shadow-sm items-center p-4 w-70 ${variants[variant]}`,
      )}
      {...rest}
    >
      <img src={icons[variant]} alt="ícone de atenção" className="w-6 h-6" />
      <div className="flex flex-col text-xs">
        <span className="font-medium">{title}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
