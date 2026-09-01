const mongoose = require("mongoose");
const statuses = [
  "EN ATTENTE",
  "CONTACTÉ",
  "EN TRAITEMENT",
  "CONFIRMÉE",
  "TERMINÉE",
  "ANNULÉE",
];
const s = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    cityCountry: { type: String, required: true },
    desiredVehicle: { type: String, required: true },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null,
    },
    budget: { type: Number, required: true, min: 0 },
    desiredYear: { type: Number, required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    message: String,
    status: { type: String, enum: statuses, default: "EN ATTENTE" },
  },
  { timestamps: true },
);
const M = mongoose.model("Order", s);
M.statuses = statuses;
module.exports = M;
