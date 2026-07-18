export type Category =
  | "General"
  | "EWS"
  | "OBC"
  | "SC"
  | "ST";

export type Gender =
  | "Male"
  | "Female"
  | "Other";

export type CourseLevel =
  | "School"
  | "Diploma"
  | "UG"
  | "PG"
  | "PhD";

export type CourseType =
  | "Engineering"
  | "Medical"
  | "Arts"
  | "Science"
  | "Commerce"
  | "Law"
  | "Management"
  | "Agriculture"
  | "Education"
  | "Other";

export interface StudentProfile {
  fullName: string;

  state: string;

  category: Category;

  annualIncome: number;

  gender: Gender;

  courseLevel: CourseLevel;

  courseType: CourseType;

  courseName: string;

  institutionName: string;

  marksPercentage: number;

  disabilityStatus: boolean;

  specialNotes: string;
}