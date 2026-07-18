import { useFormContext } from "react-hook-form";

import type { StudentFormData } from "../../../validation/studentSchema";

import { Checkbox, Input, TextArea } from "../../common";
import FormSection from "../../layout/FormSection";

const FinancialSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<StudentFormData>();

  return (
    <FormSection title="💰 Financial Information">
      <Input
        id="annualIncome"
        type="number"
        label="Annual Family Income (₹)"
        placeholder="250000"
        registration={register("annualIncome", {
          valueAsNumber: true,
        })}
        error={errors.annualIncome}
      />

      <Checkbox
        id="disabilityStatus"
        label="Person with Disability (PwD)"
        registration={register("disabilityStatus")}
        error={errors.disabilityStatus}
      />

      <div className="md:col-span-2">
        <TextArea
          id="specialNotes"
          rows={5}
          label="Special Notes"
          placeholder="Parent is a farmer, Ex-serviceman quota, National sports achievement..."
          registration={register("specialNotes")}
          error={errors.specialNotes}
        />
      </div>
    </FormSection>
  );
};

export default FinancialSection;