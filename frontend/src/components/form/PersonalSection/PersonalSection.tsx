import { useFormContext } from "react-hook-form";

import type { StudentFormData } from "../../../validation/studentSchema";

import { Input, Select } from "../../common";
import FormSection from "../../layout/FormSection";

import { STATES } from "../../../constants/states";
import { GENDERS } from "../../../constants/genders";
import { CATEGORIES } from "../../../constants/categories";

const PersonalSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<StudentFormData>();

  return (
    <FormSection title="👤 Personal Information">
      <Input
        id="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        registration={register("fullName")}
        error={errors.fullName}
      />

      <Select
        id="state"
        label="State"
        options={STATES}
        registration={register("state")}
        error={errors.state}
      />

      <Select
        id="gender"
        label="Gender"
        options={GENDERS}
        registration={register("gender")}
        error={errors.gender}
      />

      <Select
        id="category"
        label="Category"
        options={CATEGORIES}
        registration={register("category")}
        error={errors.category}
      />
    </FormSection>
  );
};

export default PersonalSection;