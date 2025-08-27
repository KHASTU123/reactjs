import express from "express";
import { auth, allowRoles } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/admin",
  auth,
  allowRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin Dashboard" });
  }
);

router.get(
  "/user",
  auth,
  allowRoles("user"),
  (req, res) => {
    res.json({ message: "Welcome User Dashboard" });
  }
);

export default router;
