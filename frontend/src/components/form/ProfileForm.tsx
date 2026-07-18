import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  studentSchema,
  type StudentFormData,
} from "../../validation/studentSchema";

import PersonalSection from "./PersonalSection";
import AcademicSection from "./AcademicSection";
import FinancialSection from "./FinancialSection";
import SubmitSection from "./SubmitSection";

interface ProfileFormProps {
  onSuccess: (matches: any[]) => void;
}

const ProfileForm = ({ onSuccess }: ProfileFormProps) => {
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),

    defaultValues: {
      disabilityStatus: false,
    },
  });

  const onSubmit = async (data: StudentFormData) => {
    setError(null);
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.post(`${apiBaseUrl}/match`, data);
      if (response.data && response.data.success) {
        onSuccess(response.data.matches);
      } else {
        setError("Failed to fetch matching scholarships.");
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Could not connect to the backend server. Please verify the backend is running on port 5000."
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <PersonalSection />

        <AcademicSection />

        <FinancialSection />

        {error && (
          <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <SubmitSection />
      
      </form>
    </FormProvider>
  );
};

export default ProfileForm;