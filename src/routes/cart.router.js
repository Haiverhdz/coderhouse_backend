import { Router } from "express";
import { authorization } from "../middlewares/authorization.js";
import { finallyPurchase } from "../controllers/cart.controller.js";

const router = Router();


router.post("/:cid/purchase", authorization(["user, admin"]),finallyPurchase);

export default router;
