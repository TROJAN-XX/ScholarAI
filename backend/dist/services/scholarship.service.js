"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllScholarships = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getAllScholarships = () => {
    const filePath = path_1.default.join(process.cwd(), "src/data/scholarships.json");
    const rawData = fs_1.default.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
};
exports.getAllScholarships = getAllScholarships;
//# sourceMappingURL=scholarship.service.js.map