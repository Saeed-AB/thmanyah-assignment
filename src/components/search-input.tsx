import { useEffect, useState } from "react";
import clsx from "clsx";

type SearchInputProps = {
  value?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "onChange" | "value"
>;

export const SearchInput = (props: SearchInputProps) => {
  const { value, className, ...rest } = props;
  const [inputVal, setInputVal] = useState(value ?? "");

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== inputVal) props.onChange?.(inputVal);
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputVal]);

  useEffect(() => {
    setInputVal(value || "");
  }, [value]);

  return (
    <input
      className={clsx(
        "w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-gray-500 focus:outline-none shadow-sm text-lg mb-6 transition-all duration-200 bg-white placeholder-gray-400",
        "dark:bg-gray-900 dark:border-gray-700 dark:focus:border-gray-500 dark:text-white dark:placeholder-gray-500",
        className
      )}
      value={inputVal}
      {...rest}
      onChange={onSearchChange}
    />
  );
};
