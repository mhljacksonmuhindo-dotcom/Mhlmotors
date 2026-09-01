const mongoose = require("mongoose");
module.exports = async () => {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI manquant");
  const c = await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connecté: " + c.connection.host);
};
