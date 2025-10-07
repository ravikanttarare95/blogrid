import express from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import passport from "passport";
import jwtCheck from "./../middlewares/jwtCheck.js";
const authRouter = express.Router();
// After clicking Login with Google. Redirect to Google login
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// After user login, Google redirects back to backend:
// Google sends an authorization code to /auth/google/callback.

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user._id, email: req.user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
    } catch (error) {
      console.error("Google login error:", error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`);
    }
  }
);

authRouter.get("/me", jwtCheck, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default authRouter;
