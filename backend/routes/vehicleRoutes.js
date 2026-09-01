const r = require("express").Router(),
  c = require("../controllers/vehicleController"),
  { protect, adminOnly } = require("../middleware/authMiddleware");
r.get("/", c.list);
r.get("/:id", c.get);
r.post("/", protect, adminOnly, c.create);
r.put("/:id", protect, adminOnly, c.update);
r.delete("/:id", protect, adminOnly, c.remove);
module.exports = r;
