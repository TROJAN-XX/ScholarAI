import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "w-full rounded-lg px-4 py-3 font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-slate-700 text-white hover:bg-slate-800",

    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        variants[variant],
        className
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;