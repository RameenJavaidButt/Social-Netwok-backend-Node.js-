import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    followers: [
      {
        //Array store hoga user IDs ka.
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference to the User model, indicating that the followers are also users in the system,ye IDs User collection ki hain
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema); // model DB operations karta, User model create kar raha, jiska naam "User" hai aur uska schema userSchema hai

export default User;
