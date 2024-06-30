import express from "express";
import { favParkingModel } from "../model/favParkingModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const favParking = await favParkingModel.find({});
    return res.status(200).json({
      count: favParking.length,
      data: favParking,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newFavLot = {
      lotNo: req.body.lotNo,
      address: req.body.address,
      availLots: req.body.availLots,
    };
    const favParking = favParkingModel.create(newFavLot);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
