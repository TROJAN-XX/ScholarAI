import fs from "fs";
import path from "path";
import { Scholarship } from "../models/scholarship";

export const getAllScholarships = (): Scholarship[] => {
  const filePath = path.join(process.cwd(), "src/data/scholarships.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
};
