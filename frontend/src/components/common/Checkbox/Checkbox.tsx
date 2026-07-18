import type { InputHTMLAttributes } from "react";
import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: FieldError;
  registration?: UseFormRegisterReturn;
}

const Checkbox = ({
  label,
  error,
  registration,
  id,
  ...props
}: CheckboxProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-center gap-3 text-sm font-medium text-slate-700 cursor-pointer"
      >
        <input
          id={id}
          type="checkbox"
          {...registration}
          {...props}
          className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
        />

        {label}
      </label>

      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Checkbox;