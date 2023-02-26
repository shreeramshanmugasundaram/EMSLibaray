import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { contact } from "./controller/contact.js";
import { email } from "./controller/email.js";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const PORT = process.env.PORT || 5000;
const DB = process.env.DB;

app.post("/contact", contact);
app.post("/email", email);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  console.log("Inside");
  res.sendFile(path.join(__dirname, "./client/build/index.html"), (err) => {
    console.log("error");
    res.status(500).send(err);
  });
});
mongoose
  .connect(DB)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
