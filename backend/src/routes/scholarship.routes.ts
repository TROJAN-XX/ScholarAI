import { Router } from "express";
import { matchScholarships } from "../controllers/scholarship.controller";

const router = Router();

router.post("/match", matchScholarships);

export default router;
