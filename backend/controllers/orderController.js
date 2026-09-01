const Order = require("../models/Order"),
  Vehicle = require("../models/Vehicle");
exports.create = async (req, res) => {
  try {
    const b = req.body;
    if (
      !b.fullName ||
      !b.phone ||
      !b.email ||
      !b.cityCountry ||
      !b.desiredVehicle ||
      b.budget === undefined ||
      !b.desiredYear ||
      !b.fuelType ||
      !b.transmission
    )
      return res
        .status(400)
        .json({ message: "Tous les champs obligatoires doivent être remplis" });
    if (b.vehicleId && !(await Vehicle.findById(b.vehicleId)))
      return res.status(400).json({ message: "Véhicule invalide" });
    res.status(201).json(await Order.create(b));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
exports.list = async (req, res) => {
  try {
    const { status, search } = req.query,
      q = {};
    if (status) q.status = status;
    if (search)
      q.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { desiredVehicle: { $regex: search, $options: "i" } },
      ];
    res.json(await Order.find(q).populate("vehicleId").sort({ createdAt: -1 }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
exports.updateStatus = async (req, res) => {
  try {
    if (!Order.statuses.includes(req.body.status))
      return res.status(400).json({ message: "Statut invalide" });
    const o = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    if (!o) return res.status(404).json({ message: "Commande introuvable" });
    res.json(o);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
exports.remove = async (req, res) => {
  const o = await Order.findByIdAndDelete(req.params.id);
  if (!o) return res.status(404).json({ message: "Commande introuvable" });
  res.json({ message: "Commande supprimée" });
};
exports.stats = async (req, res) =>
  res.json({
    totalVehicles: await Vehicle.countDocuments(),
    availableVehicles: await Vehicle.countDocuments({ isAvailable: true }),
    totalOrders: await Order.countDocuments(),
    pendingOrders: await Order.countDocuments({ status: "EN ATTENTE" }),
    confirmedOrders: await Order.countDocuments({ status: "CONFIRMÉE" }),
    completedOrders: await Order.countDocuments({ status: "TERMINÉE" }),
  });
