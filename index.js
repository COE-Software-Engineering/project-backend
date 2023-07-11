import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
import lecturerRoutes from './routes/lecturerRoutes.js';

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/students", studentRoutes);
app.use("/lecturers", lecturerRoutes);

app.get("/", (req, res) => {
  res.status(200).send("WELCOME TO THE VIRTUAL CLASSROOM BACKEND!");
});

// listening for requests
app.listen(3001);