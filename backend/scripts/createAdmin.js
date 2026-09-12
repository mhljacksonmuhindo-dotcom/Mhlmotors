require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const mongoose = require("mongoose"),
  User = require("../models/User");
(async () => {
  try {
    if (
      !process.env.MONGODB_URI ||
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD
    )
      throw new Error("MONGODB_URI, ADMIN_EMAIL et ADMIN_PASSWORD requis");
    await mongoose.connect(process.env.MONGODB_URI);
    let u = await User.findOne({
      email: process.env.ADMIN_EMAIL.toLowerCase(),
    });
    if (u) {
      u.name = process.env.ADMIN_NAME || u.name;
      u.password = process.env.ADMIN_PASSWORD;
      await u.save();
      console.log("Admin mis à jour");
    } else {
      await User.create({
        name: process.env.ADMIN_NAME || "Admin MHL Motors",
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      });
      console.log("Admin créé");
    }
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
