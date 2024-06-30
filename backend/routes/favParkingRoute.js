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
    if (!req.body.lotNo || !req.body.address || !req.body.availLots) {
      return res.status(400).send({ message: "send all required fields" });
    }
    const newFavLot = {
      lotNo: req.body.lotNo,
      address: req.body.address,
      availLots: req.body.availLots,
    };
    const favParking = favParkingModel.create(newFavLot);
    return res.status(201).send(newFavLot);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export default router;
