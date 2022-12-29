import express from "express";
import passport from "passport";
import isAuthenticated from "../middleware/isAuthenticated.js";

export const auth = express.Router();

auth.get("/user", isAuthenticated, (req, res) => {
  res.status(200).json(req.user);
});

auth.get("/login", passport.authenticate("discord"));

auth.get(
  "/discord",
  passport.authenticate("discord", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    res.status(200).redirect("http://localhost:3000/dashboard"); // Successful auth
  }
);
