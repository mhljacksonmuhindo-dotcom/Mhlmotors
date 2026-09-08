require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

if (!process.env.JWT_SECRET) {
  console.warn(
    "ATTENTION: JWT_SECRET manquant dans l'environnement. Utilisation d'une clef par défaut en fallback.",
  );
  process.env.JWT_SECRET = "fallback_secret_mhl_motors_2026";
}

const app = express();

const allowedOrigins = [
  "https://mhlmotors.vercel.app",
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV !== "production"
      ) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "1mb" }));


app.use("/uploads", express.static("uploads"));

app.get("/api/health", (req, res) =>
  res.json({ ok: true, service: "MHL Motors API" }),
);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));


app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`API disponible sur le port: ${port}`);
    });
  })
  .catch((err) => {
    console.error(
      "Erreur lors de la connexion à la base de données:",
      err.message,
    );
    process.exit(1);
  });