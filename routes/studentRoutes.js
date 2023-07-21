import express from "express";
import { signup, signin, changePassword } from "../controllers/studentController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/change_password", changePassword);

export default router;
