import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", (req, res) => {
  res.render("home", { title: "HOME" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/current", (req, res) => {
  const user = { ...req.user };
  res.render("current", { title: "Current", user: user._doc });
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/current",
    failureRedirect: "/login",
  })
);

router.get("/recupero", (req, res) => {
  res.render("recupero", { title: "Recuperar pass" });
});

export default router;
