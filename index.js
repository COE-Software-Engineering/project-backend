import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.get("/", (req, res) => {
  res.send("WELCOME TO THE VIRTUAL CLASSROOM BACKEND!");
});