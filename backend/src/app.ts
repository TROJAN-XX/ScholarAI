import express from "express";
import cors from "cors";

import scholarshipRoutes from "./routes/scholarship.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", scholarshipRoutes);

export default app;