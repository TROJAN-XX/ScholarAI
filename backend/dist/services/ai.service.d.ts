import { StudentProfile } from "../models/student";
import { Scholarship } from "../models/scholarship";
export interface AiMatchResult {
    score: number;
    explanation: string;
}
export declare const evaluateMatchWithAi: (student: StudentProfile, scholarship: Scholarship) => Promise<AiMatchResult>;
//# sourceMappingURL=ai.service.d.ts.map