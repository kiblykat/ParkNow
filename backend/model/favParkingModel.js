import mongoose from "mongoose";

const parkingSchema = mongoose.Schema({
  carpark_number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  lots_available: {
    type: String,
    required: true,
  },
  total_lots: {
    type: String,
    required: true,
  },
});

export const favParkingModel = mongoose.model("FavParking", parkingSchema);
