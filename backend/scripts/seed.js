const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose"),
  Vehicle = require("../models/Vehicle");

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const vehicles = [
    ["Toyota", "Land Cruiser", "LAND.jpeg", "Diesel", "SUV"],
    ["Nissan", "Patrol", "catalog-suv.jpg", "Diesel", "SUV"],
    ["BMW", "Serie 3", "catalog-berline.jpg", "Essence", "Berline"],
    ["Toyota", "Hilux", "catalog-pickup.jpg", "Diesel", "Pickup"],
    [
      "Caterpillar",
      "Excavatrice",
      "catalog-engin-lourd.jpg",
      "Diesel",
      "Engin lourd",
    ],
    [
      "Mitsubishi",
      "Fighter",
      "catalog-engin-lourd.jpg",
      "Diesel",
      "Engin lourd",
    ],
    [
      "Mercedes-Benz",
      "Actros",
      "catalog-engin-lourd.jpg",
      "Diesel",
      "Engin lourd",
    ],
    ["Scania", "R-Series", "catalog-engin-lourd.jpg", "Diesel", "Engin lourd"],
    ["Hovo", "ZZ3257", "catalog-engin-lourd.jpg", "Diesel", "Engin lourd"],
    ["Toyota", "Allex", "alex.JPG", "Essence", "Berline"],
    ["Mercedes-Benz", "GLE", "mhlback.JPG", "Essence", "SUV"],
    ["Toyota", "Harrier", "harrier.jpeg", "Essence", "SUV"],
    ["Subaru", "Forester", "forrester.jpeg", "Essence", "SUV"],
    ["Subaru", "Impreza", "impreza.PNG", "Essence", "Berline"],
    ["Toyota", "Corona", "corona.jpeg", "Essence", "Berline"],
    ["Toyota", "IST", "IST.jpeg", "Essence", "Berline"],
    ["Toyota", "Premio", "premio.jpeg", "Essence", "Berline"],
    ["Toyota", "Probox", "probox.jpeg", "Essence", "Berline"],
    ["Toyota", "Raum", "Raum.JPG", "Essence", "SUV"],
    ["Suzuki", "Swift", "suift.jpeg", "Essence", "Berline"],
    ["Volkswagen", "Tiguan", "Tiguan.jpg", "Diesel", "SUV"],
    ["Toyota", "V8", "V8.jpeg", "Diesel", "SUV"],
    ["Toyota", "XTE", "XTE (1).jpeg", "Diesel", "SUV"],
    ["Toyota", "XT", "XT.JPG", "Essence", "SUV"],
    ["Subaru", "XV", "XV.JPG", "Essence", "SUV"],
  ].map(([make, model, image, fuelType, category], index) => ({
    make,
    model,
    year: 2023 - (index % 4),
    price: 22000 + index * 3500,
    currency: "USD",
    mileage: 12000 + index * 1800,
    fuelType,
    transmission: "Automatique",
    color: "Noir",
    category,
    description: `${make} ${model} en excellent état.`,
    features: ["Climatisation", "Caméra", "Intérieur confortable"],
    images: [image],
    isAvailable: true,
  }));

  for (const vehicle of vehicles) {
    await Vehicle.findOneAndUpdate(
      { make: vehicle.make, model: vehicle.model },
      vehicle,
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }
  console.log(`${vehicles.length} véhicules disponibles`);
  await mongoose.disconnect();
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
