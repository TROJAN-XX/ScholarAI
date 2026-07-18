import type { TextareaHTMLAttributes } from "react";
import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
  registration?: UseFormRegisterReturn;
}

const TextArea = ({
  label,
  error,
  registration,
  id,
  ...props
}: TextAreaProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <textarea
        id={id}
        {...registration}
        {...props}
        className={`
          w-full
          rounded-lg
          border
          border-slate-300
          px-4
          py-3
          text-sm
          outline-none
          transition-all
          duration-200
          resize-none
          ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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

export default TextArea;