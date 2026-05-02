type Props = React.ComponentProps<"input"> & {
  legend: string;
  placeholder?: string;
  prefix?: string;
};

export function Input({ legend, placeholder, prefix, ...rest }: Props) {
  return (
    <fieldset className="flex flex-col text-gray-500 focus-within:text-theme-blue focus-within:font-bold">
      <legend className="uppercase text-xxs mb-2 text-inherit">{legend}</legend>

      <div className="flex items-center p-2 border border-gray-300 rounded-md w-full focus-within:border-theme-blue focus-within:border-2">
        {prefix && <span className="text-gray-400 font-normal">{prefix}</span>}
        <input
          type="text"
          required
          placeholder={placeholder}
          className="w-full outline-none placeholder:text-gray-400 placeholder:font-normal font-normal text-black bg-transparent"
          {...rest}
        />
      </div>
    </fieldset>
  );
}
