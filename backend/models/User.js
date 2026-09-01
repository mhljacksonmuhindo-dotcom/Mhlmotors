const mongoose = require("mongoose"),
  bcrypt = require("bcryptjs");
const s = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true },
);
s.pre("save", async function (n) {
  if (!this.isModified("password")) return n();
  this.password = await bcrypt.hash(this.password, 12);
  n();
});
s.methods.matchPassword = function (p) {
  return bcrypt.compare(p, this.password);
};
module.exports = mongoose.model("User", s);
