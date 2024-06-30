import express from "express";
import { favParkingModel } from "../model/favParkingModel.js";
const router = express.Router();

// READ ALL route
router.get("/favorites", async (req, res) => {
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

// CREATE route
router.post("/favorites", async (req, res) => {
  try {
    if (!req.body.lotNo || !req.body.address || !req.body.availLots) {
      return res.status(400).send({ message: "send all required fields" });
    }
    const isAlrPresent = await favParkingModel.findOne({
      address: req.body.address,
    });
    if (isAlrPresent) {
      return res.status(400).send({ message: "favLot already present" });
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

//DELETE route
router.delete("/favorites/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLot = await favParkingModel.findByIdAndDelete(id);
    return res.status(200).send(deletedLot);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
