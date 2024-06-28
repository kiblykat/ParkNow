import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("App connected to database");
    app.listen(process.env.PORT, () =>
      console.log(`app is listening to port: ${process.env.PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

startServer();
