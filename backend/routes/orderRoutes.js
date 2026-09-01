const r = require("express").Router(),
  c = require("../controllers/orderController"),
  { protect, adminOnly } = require("../middleware/authMiddleware");
r.post("/", c.create);
r.get("/stats", protect, adminOnly, c.stats);
r.get("/", protect, adminOnly, c.list);
r.patch("/:id/status", protect, adminOnly, c.updateStatus);
r.delete("/:id", protect, adminOnly, c.remove);
module.exports = r;
