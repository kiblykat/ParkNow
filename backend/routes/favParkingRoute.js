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
    if (
      !req.body.carpark_number ||
      !req.body.address ||
      !req.body.lots_available ||
      !req.body.total_lots
    ) {
      console.log("send all required fields");
      return res.status(400).send({ message: "send all required fields" });
    }
    const isAlrPresent = await favParkingModel.findOne({
      address: req.body.address,
    });
    if (isAlrPresent) {
      console.log("favLot already present");
      return res.status(400).send({ message: "favLot already present" });
    }
    const newFavLot = {
      carpark_number: req.body.carpark_number,
      address: req.body.address,
      lots_available: req.body.lots_available,
      total_lots: req.body.total_lots,
    };
    const favParking = favParkingModel.create(newFavLot);
    console.log(`backend: ${newFavLot}`);
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
