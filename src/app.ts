import express from "express";

import userRoutes from "./modules/users/routes.js";
import authRoutes from "./modules/auth/routes.js";
import postRoutes from "./modules/posts/routes.js";
import feedRoutes from "./modules/feed/routes.js";

/*
express setup
middleware
routes */

const app = express(); //Server create karta hai.

app.use(express.json()); //json data ko parse karne ke liye express.json() middleware ka use kiya gaya hai.
// Isse server incoming requests ke body mein JSON data ko automatically parse kar sakta hai,
// jisse aap easily us data ko access kar sakte hain apne route handlers mein.

app.get("/", (req, res) => {
  res.send("Home page");
});
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/feed", feedRoutes);

export default app;
