import { Router } from "express";
import { matchScholarships } from "../controllers/scholarship.controller";
import { rateLimiter } from "../middlewares/rateLimiter";

const router = Router();

router.post("/match", rateLimiter, matchScholarships);

export default router;
