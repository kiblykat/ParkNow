import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import favParkingRoute from "./routes/favParkingRoute.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/", favParkingRoute);

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

export default app;
