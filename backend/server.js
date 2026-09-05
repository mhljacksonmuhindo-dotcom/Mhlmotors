require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

if (!process.env.JWT_SECRET) {
  console.error("FATAL: JWT_SECRET manquant dans le fichier .env");
  process.exit(1);
}

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));

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
    app.listen(port, () => {
      console.log(`API disponible sur: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(
      "Erreur lors de la connexion à la base de données:",
      err.message,
    );
    process.exit(1);
  });
