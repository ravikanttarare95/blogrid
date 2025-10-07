import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import User from "./../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:8080/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.findOne({
            email: profile.emails[0]?.value.toLowerCase(),
          });

          if (user) {
            user.googleId = profile.id;
            await user.save();
          } else {
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0]?.value.toLowerCase(),
              avatar: profile.photos?.[0]?.value,
              isVerified: true,
              provider: "google",
            });
          }
        }
        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);
export default passport;
