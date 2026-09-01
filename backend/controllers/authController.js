const User = require("../models/User"),
  jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email et mot de passe requis" });
    const u = await User.findOne({ email: email.toLowerCase() });
    if (!u || !(await u.matchPassword(password)))
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    res.json({
      _id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      token: jwt.sign({ id: u._id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      }),
    });
  } catch (e) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
exports.me = (req, res) => res.json(req.user);
