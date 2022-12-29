import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { auth } from "./routes/auth.js";
import passport from "passport";
import session from "express-session";
import discordStratagy from "./stratagies/discord.stratagy.js";

import isAuthenticated from "./middleware/isAuthenticated.js";

const app = express();

app.use(cookieParser());
app.use(
  session({
    secret: "a good secret",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    resave: true,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(discordStratagy);

app.use("/auth", auth);

app.get("/info", isAuthenticated, (req, res) => {
  console.log(req.cookies, req.user);
  res.status(200).json({
    status: 200,
    message: "success from server",
  });
});

export default app;
