import express from "express";
import { User } from "../models/user.js";
import {
  getmyProfile,
  getusers,
  login,
  logout,
  register,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getusers);

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me", isAuthenticated, getmyProfile);

export default router;
