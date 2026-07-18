"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterScholarships = void 0;
const filterScholarships = (scholarships, student) => {
    return scholarships.filter((scholarship) => {
        const { eligibility } = scholarship;
        // 1. State check
        if (eligibility.states &&
            !eligibility.states.includes("ALL") &&
            !eligibility.states.some((s) => s.toLowerCase() === student.state.toLowerCase())) {
            return false;
        }
        // 2. Disability constraint
        if (eligibility.disability && !student.disabilityStatus) {
            return false;
        }
        // 3. Category check
        // If the scholarship lists PwD as a category, a student with disability status should qualify
        if (eligibility.categories &&
            !eligibility.categories.includes("ALL")) {
            const hasCategoryMatch = eligibility.categories.some((c) => c.toLowerCase() === student.category.toLowerCase());
            const isPwDOnly = eligibility.categories.length === 1 &&
                eligibility.categories[0]?.toLowerCase() === "pwd";
            if (!hasCategoryMatch && !(isPwDOnly && student.disabilityStatus)) {
                return false;
            }
        }
        // 4. Gender check
        if (eligibility.gender &&
            !eligibility.gender.includes("ALL") &&
            !eligibility.gender.some((g) => g.toLowerCase() === student.gender.toLowerCase())) {
            return false;
        }
        // 5. Course Level check
        if (eligibility.courseLevels &&
            !eligibility.courseLevels.includes("ALL") &&
            !eligibility.courseLevels.some((l) => l.toLowerCase() === student.courseLevel.toLowerCase())) {
            return false;
        }
        // 6. Course Type check
        if (eligibility.courseTypes &&
            !eligibility.courseTypes.includes("Any") &&
            !eligibility.courseTypes.some((t) => t.toLowerCase() === student.courseType.toLowerCase())) {
            return false;
        }
        // 7. Annual Income check
        if (eligibility.maxIncome !== null &&
            eligibility.maxIncome !== undefined &&
            student.annualIncome > eligibility.maxIncome) {
            return false;
        }
        // 8. Marks percentage check
        if (eligibility.minMarks !== null &&
            eligibility.minMarks !== undefined &&
            student.marksPercentage < eligibility.minMarks) {
            return false;
        }
        return true;
    });
};
exports.filterScholarships = filterScholarships;
//# sourceMappingURL=filter.service.js.map