import express from "express";

import { getAllPosts, getPostsofUser, createPost } from "./controller.js";
import authMiddleware from "../../middleware/middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost); //token ke bina route access nahi hogi
router.get("/", authMiddleware, getPostsofUser); //token ke bina route access nahi hogi
//router.get("/", authMiddleware, getAllPosts);
export default router;
