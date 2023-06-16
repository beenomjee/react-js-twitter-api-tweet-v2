import { Router } from "express";
import { makeNewTweet } from "../controllers/index.js";

const router = Router();

router.post("", makeNewTweet);

export default router;
