import mongoose from "mongoose";

const parkingSchema = mongoose.Schema({
  lotNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  availLots: {
    type: String,
    required: true,
  },
});

export const favParkingModel = mongoose.model("FavParking", parkingSchema);
