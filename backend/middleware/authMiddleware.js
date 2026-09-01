const jwt = require("jsonwebtoken"),
  User = require("../models/User");
exports.protect = async (req, res, next) => {
  try {
    const h = req.headers.authorization || "";
    if (!h.startsWith("Bearer "))
      return res.status(401).json({ message: "Authentification requise" });
    const d = jwt.verify(h.slice(7), process.env.JWT_SECRET),
      u = await User.findById(d.id).select("-password");
    if (!u) return res.status(401).json({ message: "Utilisateur introuvable" });
    req.user = u;
    next();
  } catch (e) {
    res.status(401).json({ message: "Session invalide ou expirée" });
  }
};
exports.adminOnly = (req, res, next) =>
  req.user?.role === "admin"
    ? next()
    : res.status(403).json({ message: "Accès administrateur requis" });
