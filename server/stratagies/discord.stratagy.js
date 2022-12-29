import { Strategy as DiscordStrategy } from "passport-discord";
import passport from "passport";
import config from "../config/index.js";
import User from "../models/User.model.js";

const scopes = ["identify", "email"];

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (user)
    done(null, {
      id: user.id,
      discordId: user.discordId,
      name: user.name,
      discriminator: user.discriminator,
      avatar: user.avatar,
    });
});

const discordStratagy = new DiscordStrategy(
  {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: config.CLIENT_REDIRECT,
    scope: scopes,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ discordId: profile.id });
      if (user) {
        done(null, user);
      } else {
        const user = await User.create({
          discordId: profile.id,
          name: profile.username,
          discriminator: profile.discriminator,
          email: profile.email,
          avatar: profile.avatar,
        });
        done(null, user);
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export default discordStratagy;
