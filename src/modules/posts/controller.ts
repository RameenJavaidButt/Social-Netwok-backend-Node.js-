import type { Response } from "express";
import User from "../users/model.js";

import Post from "./model.js";
import { getIO, getOnlineUsers } from "../../socket/index.js";

import type { AuthRequest } from "../../middleware/middleware.js";
/*
Frontend sends token
↓
Middleware verifies token
↓
req.user set hota
↓
Controller uses req.user.id
↓
Post author set
 */
export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const { content } = req.body;

    const post = await Post.create({
      content,
      author: req.user.id,
    });

    const fullPost = await post.populate("author", "name email");
    const user = await User.findById(req.user.id);

    const io = getIO();
    const onlineUsers = getOnlineUsers();

    // 🔥 ONLY FOLLOWERS
    user?.followers.forEach((followerId: any) => {
      const socketId = onlineUsers.get(followerId.toString());

      if (socketId) {
        io.to(socketId).emit("new-post", fullPost);
      }
    });

    res.status(201).json({
      success: true,
      data: fullPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getPostsofUser = async (req: AuthRequest, res: Response) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 }); //author field ko populate kar raha hai, jisme sirf name,email field la raha hai

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getAllPosts = async (req: AuthRequest, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); //sari posts by all users

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
