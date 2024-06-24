import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import cors from "cors";
import { usersRouter } from "./routes/user.route.js";

const app = express();
const url = process.env.MONGO_URL;
mongoose
  .connect(url)
  .then(console.log("dataBase Starting"))
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.listen(4000, () => {
  console.log("server started");
});
