import express from "express";
import { followUser, getUsers, unfollowUser } from "./controller.js";
import authMiddleware from "../../middleware/middleware.js";

const router = express.Router();

//router.post("/", createUser);
router.get("/", authMiddleware, getUsers);
router.put("/follow/:id", authMiddleware, followUser);
router.put("/unfollow/:id", authMiddleware, unfollowUser); //unfollow ke liye bhi same route use kar raha hu, controller me check karunga ki follow karna hai ya unfollow karna hai
export default router;
