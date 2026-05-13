import type { Response } from "express";
import Post from "../posts/model.js";
import User from "../users/model.js";
import type { AuthRequest } from "../../middleware/middleware.js";
export const getFeed = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id; //req.user middleware se aata hai, jisme user ki information hoti hai, jisme id bhi hoti hai
    // 1. get current user
    const user = await User.findById(userId); //user ko database se find kar raha hai, jisme id userId ke barabar hai

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const page = parseInt(req.query.page as string) || 1; //query se page number le raha hai, agar nahi diya to default 1
    const limit = parseInt(req.query.limit as string) || 10; //query se limit le raha hai, agar nahi diya to default 10
    // total posts count
    const totalPosts = await Post.countDocuments({
      author: { $in: user.following },
    });
    const sort =
      req.query.sort === "oldest" ? 1 : req.query.sort === "latest" ? -1 : -1;
    const posts = await Post.find({
      author: { $in: user?.following || [] },
    })
      .populate("author", "name email")
      .sort({ createdAt: sort })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(totalPosts / limit),
      hasMore: page * limit < totalPosts,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
///api/feed?page=1&limit=5
