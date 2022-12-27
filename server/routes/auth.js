import express from "express";
import passport from "passport";

export const auth = express.Router();

auth.get("/login", passport.authenticate("discord"));

auth.get(
  "/discord",
  passport.authenticate("discord", {
    failureRedirect: "/",
  }),
  function (req, res) {
    res.redirect("/info"); // Successful auth
  }
);
