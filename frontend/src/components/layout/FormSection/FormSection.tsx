import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

const FormSection = ({
  title,
  children,
}: FormSectionProps) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </section>
  );
};

export default FormSection;