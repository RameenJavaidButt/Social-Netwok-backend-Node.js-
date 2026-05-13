import express from "express";
import authMiddleware from "../../middleware/middleware.js";
import { getFeed } from "./controller.js";

const router = express.Router();

router.get("/", authMiddleware, getFeed);

export default router;
