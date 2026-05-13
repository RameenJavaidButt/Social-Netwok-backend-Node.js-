import type { Request, Response } from "express";
import type { AuthRequest } from "../../middleware/middleware.js";
import User from "./model.js";
/*
request leta
service/model call karta
response bhejta
 */
/*export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};*/
/*
GET users
GET profile
FOLLOW user
UNFOLLOW user
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const followUser = async (req: AuthRequest, res: Response) => {
  try {
    const currentUserId = req.user.id;

    const targetUserId = req.params.id;

    if (currentUserId === targetUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    await User.findByIdAndUpdate(currentUserId, {
      $addToSet: {
        following: targetUserId,
      },
    });

    await User.findByIdAndUpdate(targetUserId, {
      $addToSet: {
        followers: currentUserId,
      },
    });

    res.status(200).json({
      success: true,
      message: "User followed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const unfollowUser = async (req: AuthRequest, res: Response) => {
  try {
    const currentUserId = req.user.id;

    const targetUserId = req.params.id;

    if (currentUserId === targetUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot unfollow yourself",
      });
    }

    await User.findByIdAndUpdate(currentUserId, {
      $pull: {
        following: targetUserId,
      },
    });

    await User.findByIdAndUpdate(targetUserId, {
      $pull: {
        followers: currentUserId,
      },
    });

    res.status(200).json({
      success: true,
      message: "User unfollowed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
