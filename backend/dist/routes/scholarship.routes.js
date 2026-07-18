"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scholarship_controller_1 = require("../controllers/scholarship.controller");
const rateLimiter_1 = require("../middlewares/rateLimiter");
const router = (0, express_1.Router)();
router.post("/match", rateLimiter_1.rateLimiter, scholarship_controller_1.matchScholarships);
exports.default = router;
//# sourceMappingURL=scholarship.routes.js.map