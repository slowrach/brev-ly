import warning from "../assets/warning.svg";

type Props = React.ComponentProps<"div"> & {
   message: string
}

export function InputError({ message, ...rest }: Props) {
  return (
    <div className="flex gap-1 items-center" {...rest}>
      <img src={warning} alt="ícone de atenção" className="w-4 h-4" />
      <span className="text-xxs text-gray-600">{message}</span>
    </div>
  );
}