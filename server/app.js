import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { auth } from "./routes/auth.js";
import passport from "passport";
import session from "express-session";
import discordStratagy from "./stratagies/discord.stratagy.js";

const app = express();
app.use(cookieParser());
app.use(
  session({
    secret: "a good secret",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: false,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(discordStratagy);

app.use("/auth", auth);

app.get("/info", (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    status: 200,
    message: "success",
  });
});

export default app;
