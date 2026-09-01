const r = require("express").Router(),
  c = require("../controllers/authController"),
  { protect, adminOnly } = require("../middleware/authMiddleware");
r.post("/login", c.login);
r.get("/me", protect, adminOnly, c.me);
module.exports = r;
