"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateMatchWithAi = void 0;
const genai_1 = require("@google/genai");
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new genai_1.GoogleGenAI({ apiKey }) : null;
const evaluateMatchWithAi = async (student, scholarship) => {
    // If API key is missing, fall back to rule-based explanation
    if (!ai) {
        let score = scholarship.baseScore || 80;
        let explanation = "You meet all the standard eligibility rules for this scholarship.";
        if (student.specialNotes && scholarship.eligibility.specialConditions) {
            const notesLower = student.specialNotes.toLowerCase();
            const condLower = scholarship.eligibility.specialConditions.toLowerCase();
            // Basic keyword matching fallback
            const keywords = ["first", "graduate", "farmer", "rural", "disability", "sports", "crisis", "girls", "female", "engineering", "medical"];
            let matches = 0;
            keywords.forEach((kw) => {
                if (notesLower.includes(kw) && condLower.includes(kw)) {
                    matches++;
                }
            });
            if (matches > 0) {
                score = Math.min(100, score + 10 * matches);
                explanation = `Fits special conditions: "${scholarship.eligibility.specialConditions}".`;
            }
        }
        return { score, explanation };
    }
    try {
        const prompt = `
You are ScholarAI, an AI system that matches college/university students with scholarships.
Your task is to analyze how well a student's profile and special background align with a scholarship's requirements.

Student Profile:
- Name: ${student.fullName}
- State: ${student.state}
- Category: ${student.category}
- Gender: ${student.gender}
- Course Level: ${student.courseLevel}
- Course Type: ${student.courseType}
- Course Name: ${student.courseName}
- Institution: ${student.institution}
- Marks Percentage: ${student.marksPercentage}%
- Annual Family Income: ₹${student.annualIncome}
- Person with Disability (PwD): ${student.disabilityStatus ? "Yes" : "No"}
- Special Notes/Background: ${student.specialNotes || "None"}

Scholarship Details:
- Name: ${scholarship.name} (${scholarship.displayName})
- Provider: ${scholarship.provider}
- Description: ${scholarship.description}
- Special Conditions: ${scholarship.eligibility.specialConditions || "None"}

Tasks:
1. Assess compatibility. Provide a score between 0 and 100. Consider the baseline baseScore of ${scholarship.baseScore || 80} and add/subtract based on how well the student's specialNotes matches the scholarship's specialConditions.
2. Generate a personalized 1-2 sentence explanation directed at the student (using "you"). Highlight exactly why they qualify and call out any specific details (e.g. "Since you are from ${student.state} and study ${student.courseType}, you meet the primary criteria. Your special note about being the first graduate in your family is a strong match for this scheme.").

Return ONLY a JSON object in this format:
{
  "score": number,
  "explanation": "string"
}
`;
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        score: {
                            type: "INTEGER",
                            description: "Match score between 0 and 100."
                        },
                        explanation: {
                            type: "STRING",
                            description: "A short, personalized explanation of why the student matches."
                        }
                    },
                    required: ["score", "explanation"]
                }
            }
        });
        const responseText = result.text;
        const data = JSON.parse(responseText || "{}");
        return {
            score: typeof data.score === "number" ? data.score : 80,
            explanation: data.explanation || "You meet all key eligibility rules."
        };
    }
    catch (error) {
        console.error("AI service error:", error);
        return {
            score: scholarship.baseScore || 75,
            explanation: "You meet all key eligibility rules for this scholarship."
        };
    }
};
exports.evaluateMatchWithAi = evaluateMatchWithAi;
//# sourceMappingURL=ai.service.js.map