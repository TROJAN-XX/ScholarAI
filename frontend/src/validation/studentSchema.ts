import { z } from "zod";

export const studentSchema = z.object({
  fullName: z.string().min(2, "Name is required"),

  state: z.string().min(1, "Select your state"),

  category: z.string().min(1, "Select your category"),

  gender: z.string().min(1, "Select your gender"),

  courseLevel: z.string().min(1),

  courseType: z.string().min(1),

  courseName: z.string().min(2),

  institution: z.string().min(2),

  marksPercentage: z
    .number()
    .min(0)
    .max(100),

  annualIncome: z
    .number()
    .min(0),

  disabilityStatus: z.boolean(),

  specialNotes: z.string().optional(),
});

export type StudentFormData =
  z.infer<typeof studentSchema>;