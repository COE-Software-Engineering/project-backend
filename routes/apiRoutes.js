import express from "express";
import {
  getAllAnnouncements,
  getAllCourses,
} from "../controllers/apiController.js";

const router = express.Router();

router.post("/get_all_announcements", getAllAnnouncements);
router.post("/get_all_courses", getAllCourses);

export default router;
