import { ArrowLeft, Calendar, Award, Sparkles, Check, ExternalLink } from "lucide-react";

interface ScholarshipMatch {
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
  matchScore: number;
  matchExplanation: string;
}

interface ResultProps {
  matches: ScholarshipMatch[];
  onBack: () => void;
}

const Result = ({ matches, onBack }: ResultProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (score >= 75) return "bg-indigo-50 text-indigo-700 border-indigo-200";
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              onClick={onBack}
              className="group mb-2 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Form
            </button>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Matched Scholarships
            </h1>
            <p className="text-slate-500">
              We found {matches.length} scholarship{matches.length !== 1 ? "s" : ""} matching your profile.
            </p>
          </div>
        </div>

        {matches.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
            <Award className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">No matching scholarships</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
              We couldn't find any scholarships matching your specific criteria. Try adjusting your profile information or marks percentage.
            </p>
            <button
              onClick={onBack}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-colors"
            >
              Adjust Profile
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {matches.map((scholarship) => (
              <div
                key={scholarship.id}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Upper Section */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800">
                          {scholarship.providerType}
                        </span>
                        <span className="text-xs text-slate-400">ID: {scholarship.id}</span>
                      </div>
                      <h2 className="mt-2 text-xl font-bold text-slate-900 leading-snug">
                        {scholarship.name}
                      </h2>
                      <p className="text-sm font-medium text-slate-500">
                        Provided by {scholarship.provider}
                      </p>
                    </div>

                    {/* Match Score Badge */}
                    <div
                      className={`self-start flex flex-col items-center justify-center rounded-xl border px-4 py-2 text-center ${getScoreColor(
                        scholarship.matchScore
                      )}`}
                    >
                      <span className="text-2xl font-black">{scholarship.matchScore}%</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Match Match</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {scholarship.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="mt-6 grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Benefit Value
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          {formatCurrency(scholarship.benefit.amount)}
                          <span className="text-xs font-normal text-slate-500">
                            {" "}
                            / {scholarship.benefit.frequency}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Deadline
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          {scholarship.deadline.month && scholarship.deadline.day
                            ? `${scholarship.deadline.month} ${scholarship.deadline.day}`
                            : "Ongoing / Annual"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                        <Check className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Min Marks Required
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          {scholarship.eligibility.minMarks !== null
                            ? `${scholarship.eligibility.minMarks}%`
                            : "None"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI INSIGHTS CARD */}
                  <div className="mt-6 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50/50 via-purple-50/20 to-white p-5">
                    <div className="flex items-center gap-2 text-indigo-800 font-bold text-sm">
                      <Sparkles className="h-4 w-4 text-indigo-600 fill-indigo-100 animate-pulse" />
                      ScholarAI Match Insight
                    </div>
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed italic">
                      "{scholarship.matchExplanation}"
                    </p>
                  </div>

                  {/* Criteria details */}
                  <div className="mt-6 border-t border-slate-100 pt-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Core Eligibility Parameters
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                        <strong>States:</strong> {scholarship.eligibility.states.join(", ")}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                        <strong>Genders:</strong> {scholarship.eligibility.gender.join(", ")}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                        <strong>Course Levels:</strong> {scholarship.eligibility.courseLevels.join(", ")}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                        <strong>Course Types:</strong> {scholarship.eligibility.courseTypes.join(", ")}
                      </span>
                      {scholarship.eligibility.maxIncome && (
                        <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                          <strong>Max Family Income:</strong> {formatCurrency(scholarship.eligibility.maxIncome)}
                        </span>
                      )}
                    </div>
                    {scholarship.eligibility.specialConditions && (
                      <div className="mt-3 text-xs text-slate-500">
                        <strong>Special Conditions:</strong> {scholarship.eligibility.specialConditions}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex justify-end">
                  <a
                    href={scholarship.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Result;
