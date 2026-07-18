import { z } from "zod";
export declare const studentProfileSchema: z.ZodObject<{
    fullName: z.ZodString;
    state: z.ZodString;
    category: z.ZodString;
    gender: z.ZodString;
    courseLevel: z.ZodString;
    courseType: z.ZodString;
    courseName: z.ZodString;
    institution: z.ZodString;
    marksPercentage: z.ZodNumber;
    annualIncome: z.ZodNumber;
    disabilityStatus: z.ZodBoolean;
    specialNotes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type StudentProfileInput = z.infer<typeof studentProfileSchema>;
//# sourceMappingURL=student.validation.d.ts.map