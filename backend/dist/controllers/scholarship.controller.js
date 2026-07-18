"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchScholarships = void 0;
const scholarship_service_1 = require("../services/scholarship.service");
const filter_service_1 = require("../services/filter.service");
const ai_service_1 = require("../services/ai.service");
const student_validation_1 = require("../validation/student.validation");
const matchScholarships = async (req, res) => {
    try {
        const validationResult = student_validation_1.studentProfileSchema.safeParse(req.body);
        if (!validationResult.success) {
            res.status(400).json({
                success: false,
                message: "Validation failed for student profile details.",
                errors: validationResult.error.format(),
            });
            return;
        }
        const student = validationResult.data;
        const scholarships = (0, scholarship_service_1.getAllScholarships)();
        const matched = (0, filter_service_1.filterScholarships)(scholarships, student);
        const evaluatedMatches = await Promise.all(matched.map(async (scholarship) => {
            const aiResult = await (0, ai_service_1.evaluateMatchWithAi)(student, scholarship);
            return {
                ...scholarship,
                matchScore: aiResult.score,
                matchExplanation: aiResult.explanation,
            };
        }));
        // Sort by match score (descending) then by priority (descending)
        evaluatedMatches.sort((a, b) => {
            if (b.matchScore !== a.matchScore) {
                return b.matchScore - a.matchScore;
            }
            return (b.priority || 0) - (a.priority || 0);
        });
        res.json({
            success: true,
            totalMatches: evaluatedMatches.length,
            matches: evaluatedMatches,
        });
    }
    catch (error) {
        console.error("Match controller error:", error);
        res.status(500).json({
            success: false,
            message: "Error processing matches",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.matchScholarships = matchScholarships;
//# sourceMappingURL=scholarship.controller.js.map