"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentProfileSchema = void 0;
const zod_1 = require("zod");
exports.studentProfileSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2, "Name is required"),
    state: zod_1.z.string().min(1, "Select your state"),
    category: zod_1.z.string().min(1, "Select your category"),
    gender: zod_1.z.string().min(1, "Select your gender"),
    courseLevel: zod_1.z.string().min(1),
    courseType: zod_1.z.string().min(1),
    courseName: zod_1.z.string().min(2),
    institution: zod_1.z.string().min(2),
    marksPercentage: zod_1.z.number().min(0).max(100),
    annualIncome: zod_1.z.number().min(0),
    disabilityStatus: zod_1.z.boolean(),
    specialNotes: zod_1.z.string().optional(),
});
//# sourceMappingURL=student.validation.js.map