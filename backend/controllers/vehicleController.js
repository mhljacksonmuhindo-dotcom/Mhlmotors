const Vehicle = require("../models/Vehicle");
exports.list = async (req, res) => {
  try {
    const {
        search,
        category,
        fuelType,
        transmission,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
      } = req.query,
      q = {};
    if (category) q.category = category;
    if (fuelType) q.fuelType = fuelType;
    if (transmission) q.transmission = transmission;
    if (search) {
      const terms = search.trim().split(/\s+/).filter(Boolean);
      q.$and = terms.map((term) => ({
        $or: [
          { make: { $regex: term, $options: "i" } },
          { model: { $regex: term, $options: "i" } },
        ],
      }));
    }
    if (minPrice || maxPrice)
      q.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };
    if (minYear || maxYear)
      q.year = {
        ...(minYear && { $gte: Number(minYear) }),
        ...(maxYear && { $lte: Number(maxYear) }),
      };
    res.json(await Vehicle.find(q).sort({ createdAt: -1 }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
exports.get = async (req, res) => {
  try {
    const v = await Vehicle.findById(req.params.id);
    if (!v) return res.status(404).json({ message: "Véhicule introuvable" });
    res.json(v);
  } catch (e) {
    res.status(400).json({ message: "Identifiant invalide" });
  }
};
exports.create = async (req, res) => {
  try {
    res.status(201).json(await Vehicle.create(req.body));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
exports.update = async (req, res) => {
  try {
    const v = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!v) return res.status(404).json({ message: "Véhicule introuvable" });
    res.json(v);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
exports.remove = async (req, res) => {
  try {
    const v = await Vehicle.findByIdAndDelete(req.params.id);
    if (!v) return res.status(404).json({ message: "Véhicule introuvable" });
    res.json({ message: "Véhicule supprimé" });
  } catch (e) {
    res.status(400).json({ message: "Identifiant invalide" });
  }
};
