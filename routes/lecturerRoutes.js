import express from "express";
import { signin } from "../controllers/lecturerController";

const router = express.Router();

router.post("/signin", signin);


export default router;
