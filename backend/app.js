import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { tweetRouter } from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({});

const app = express();
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));

// routes
app.use("/api/v1/tweet", tweetRouter);

export default app;
