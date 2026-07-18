export interface Scholarship {
    id: string;
    displayName: string;
    name: string;
    provider: string;
    providerType: string;
    description: string;
    priority: number;
    baseScore: number;
    applyLink: string;
    benefit: {
        amount: number;
        currency: string;
        frequency: string;
    };
    deadline: {
        type: string;
        month: string;
        day: number;
    };
    eligibility: {
        categories: string[];
        states: string[];
        gender: string[];
        courseLevels: string[];
        courseTypes: string[];
        maxIncome: number | null;
        minMarks: number | null;
        disability: boolean;
        specialConditions: string;
    };
    documentsRequired?: string[];
    tags?: string[];
    keywords?: string[];
    competition?: string;
}
//# sourceMappingURL=scholarship.d.ts.map