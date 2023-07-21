import express from "express";
import { signin, signup, makeAnnouncement, changePassword } from "../controllers/lecturerController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/change_password", changePassword);
router.post("/make_announcement", makeAnnouncement);


export default router;
