import { Router } from "express";
import passport from "passport";
import controllerCurrent from "../controllers/current.controller.js";
import { authorization } from "../middlewares/authorization.js";
import emailService from "../services/email.service.js";

const router = Router();

router.get("/mail", emailService);

router.post("/login", passport.authenticate("login", { failureRedirect: "faillogin" }), controllerCurrent.login);

router.get("/current", passport.authenticate("current", { session: false }), controllerCurrent.current);

router.post("/register", passport.authenticate("register", { failureRedirect: "failregister" }), controllerCurrent.register);

router.get("/failregister", controllerCurrent.failregister);

router.get("/faillogin", controllerCurrent.failLogin);

router.post("/recupero", controllerCurrent.recupero);

router.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"]}));

router.post("/logout", controllerCurrent.logout);

router.post("/productos", passport.authenticate("current", { session: false }), authorization(["admin"]), controllerCurrent.admin);

router.post("/carrito", passport.authenticate("current", { session: false }),authorization(["user"]), controllerCurrent.user);


export default router;