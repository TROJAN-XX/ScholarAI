import type { SelectHTMLAttributes } from "react";
import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly string[];
  placeholder?: string;
  error?: FieldError;
  registration?: UseFormRegisterReturn;
}

const Select = ({
  label,
  options,
  placeholder = "Select an option",
  error,
  registration,
  id,
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <select
        id={id}
        {...registration}
        {...props}
        className={`
          w-full
          rounded-lg
          border
          px-4
          py-3
          text-sm
          bg-white
          outline-none
          transition-all
          duration-200

          ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          }
        `}
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Select;