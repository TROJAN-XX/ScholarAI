import type { InputHTMLAttributes } from "react";
import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  registration?: UseFormRegisterReturn;
}

const Input = ({
  label,
  error,
  registration,
  id,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
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
          transition-all
          duration-200
          outline-none

          ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          }
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;