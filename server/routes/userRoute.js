import { Router } from "express";
import {
  checkAuth,
  getAllUsers,
  login,
  logout,
  sendOTP,
  singup,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.route("/login").post(login);

router.route("/signup").post(singup);

router.route("/logout").get(logout);

router.route("/allUsers").get(protect, getAllUsers);

router.route("/sendOTP").post(sendOTP);

router.route("/checkAuth").get(checkAuth);

export default router;
