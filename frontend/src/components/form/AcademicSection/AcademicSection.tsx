import { useFormContext } from "react-hook-form";

import type { StudentFormData } from "../../../validation/studentSchema";

import { Input, Select } from "../../common";
import FormSection from "../../layout/FormSection";

import { COURSE_LEVELS } from "../../../constants/courseLevels";
import { COURSE_TYPES } from "../../../constants/courseTypes";

const AcademicSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<StudentFormData>();

  return (
    <FormSection title="🎓 Academic Information">
      <Select
        id="courseLevel"
        label="Course Level"
        options={COURSE_LEVELS}
        registration={register("courseLevel")}
        error={errors.courseLevel}
      />

      <Select
        id="courseType"
        label="Course Type"
        options={COURSE_TYPES}
        registration={register("courseType")}
        error={errors.courseType}
      />

      <Input
        id="courseName"
        label="Course Name"
        placeholder="B.Tech Computer Science"
        registration={register("courseName")}
        error={errors.courseName}
      />

      <Input
        id="institution"
        label="Institution Name"
        placeholder="Anna University"
        registration={register("institution")}
        error={errors.institution}
      />

      <Input
        id="marksPercentage"
        type="number"
        label="Marks Percentage"
        placeholder="85"
        registration={register("marksPercentage", {
          valueAsNumber: true,
        })}
        error={errors.marksPercentage}
      />
    </FormSection>
  );
};

export default AcademicSection;