import { Request, Response } from "express";
import { getAllScholarships } from "../services/scholarship.service";
import { filterScholarships } from "../services/filter.service";
import { evaluateMatchWithAi } from "../services/ai.service";
import { studentProfileSchema } from "../validation/student.validation";

export const matchScholarships = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validationResult = studentProfileSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed for student profile details.",
        errors: validationResult.error.format(),
      });
      return;
    }

    const student = validationResult.data;

    const scholarships = getAllScholarships();

    const matched = filterScholarships(scholarships, student);

    const evaluatedMatches = await Promise.all(
      matched.map(async (scholarship) => {
        const aiResult = await evaluateMatchWithAi(student, scholarship);
        return {
          ...scholarship,
          matchScore: aiResult.score,
          matchExplanation: aiResult.explanation,
        };
      })
    );

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
  } catch (error) {
    console.error("Match controller error:", error);
    res.status(500).json({
      success: false,
      message: "Error processing matches",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};