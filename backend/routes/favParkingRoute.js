import express from "express";
import { favParkingModel } from "../model/favParkingModel.js";
const router = express.Router();

// READ all current user favorites
router.get("/favorites", async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const favParking = await favParkingModel.find({ user_id });
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
    // Check if all required fields are present in the request body
    if (
      !req.body.carpark_number ||
      !req.body.address ||
      !req.body.lots_available ||
      !req.body.total_lots ||
      !req.body.user_id
    ) {
      console.log("send all required fields");
      return res.status(400).send({ message: "send all required fields" });
    }
    // Check if a favorite parking lot with the same address already exists
    const isAlrPresent = await favParkingModel.findOne({
      address: req.body.address,
    });
    if (isAlrPresent) {
      console.log("favLot already present");
      return res.status(400).send({ message: "favLot already present" });
    } else {
      // Create a new favorite parking lot object from the request body
      const newFavLot = {
        carpark_number: req.body.carpark_number,
        address: req.body.address,
        lots_available: req.body.lots_available,
        total_lots: req.body.total_lots,
        user_id: req.body.user_id,
      };

      console.log("1. newFavLot iss: " + newFavLot);
      // Save the new favorite parking lot entry to the database
      const favParking = await favParkingModel.create(newFavLot);
      return res.status(201).send(favParking);
    }
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
