const mongoose = require("mongoose");

const s = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true, min: 1950, max: 2100 },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "USD" },
    mileage: { type: Number, required: true, min: 0 },
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    color: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    features: [String],
    images: {
      type: [String],
      default: [],
    },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", s);