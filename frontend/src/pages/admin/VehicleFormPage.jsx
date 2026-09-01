import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createVehicle,
  getVehicle,
  updateVehicle,
} from "../../services/vehicleService";

const initialVehicle = {
  make: "",
  model: "",
  year: new Date().getFullYear(),
  price: "",
  currency: "USD",
  mileage: 0,
  fuelType: "Diesel",
  transmission: "Automatique",
  color: "",
  category: "SUV",
  description: "",
  features: "",
  images: "",
  isAvailable: true,
};

// ⚡ Fonction pour redimensionner et compresser automatiquement l'image
const compressImage = (file, maxWidth = 1000, quality = 0.7) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Réduction proportionnelle de la taille
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Export en JPEG compressé (qualité ~70%)
        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedBase64);
      };
    };
  });
};

export default function VehicleFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialVehicle);
  const [error, setError] = useState("");
  const [compressing, setCompressing] = useState(false);

  useEffect(() => {
    if (id) {
      getVehicle(id)
        .then((vehicle) => {
          if (vehicle) {
            setForm({
              ...vehicle,
              features: (vehicle.features || []).join("\n"),
              images: (vehicle.images || []).join("\n"),
            });
          }
        })
        .catch((err) => console.error("Erreur de chargement :", err));
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setCompressing(true);

    // Compression de toutes les images sélectionnées
    const compressedPromises = files.map((file) => compressImage(file));
    const compressedImages = await Promise.all(compressedPromises);

    setForm((prev) => {
      const existing = prev.images ? prev.images.trim() : "";
      const newImgs = compressedImages.join("\n");
      return {
        ...prev,
        images: existing ? `${existing}\n${newImgs}` : newImgs,
      };
    });

    setCompressing(false);
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      const imagesList = form.images
        ? form.images
            .split("\n")
            .map((img) => img.trim())
            .filter((img) => img.length > 0)
        : [];

      const data = {
        ...form,
        year: +form.year,
        price: +form.price,
        mileage: +form.mileage,
        features: form.features
          ? form.features.split("\n").filter(Boolean)
          : [],
        images: imagesList,
      };

      delete data._id;
      delete data.createdAt;
      delete data.updatedAt;

      if (id) await updateVehicle(id, data);
      else await createVehicle(data);

      navigate("/admin/vehicles");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Erreur de sauvegarde");
    }
  };

  return (
    <section className="wrap section">
      <Link to="/admin/vehicles">← Véhicules</Link>
      <h1>{id ? "Modifier" : "Ajouter"} un véhicule</h1>
      {error && <div className="error">{error}</div>}
      <form className="formgrid" onSubmit={submit}>
        {[
          ["make", "Marque"],
          ["model", "Modèle"],
          ["year", "Année"],
          ["price", "Prix"],
          ["mileage", "Kilométrage"],
          ["color", "Couleur"],
        ].map(([name, label]) => (
          <label key={name}>
            {label}
            <input
              name={name}
              required
              type={
                ["year", "price", "mileage"].includes(name) ? "number" : "text"
              }
              value={form[name]}
              onChange={handleChange}
            />
          </label>
        ))}
        <label>
          Carburant
          <select name="fuelType" value={form.fuelType} onChange={handleChange}>
            <option>Diesel</option>
            <option>Essence</option>
            <option>Hybride</option>
            <option>Électrique</option>
          </select>
        </label>
        <label>
          Transmission
          <select
            name="transmission"
            value={form.transmission}
            onChange={handleChange}
          >
            <option>Automatique</option>
            <option>Manuelle</option>
          </select>
        </label>
        <label>
          Catégorie
          <select name="category" value={form.category} onChange={handleChange}>
            <option>SUV</option>
            <option>Berline</option>
            <option>Pickup</option>
            <option>4x4</option>
            <option>Engin lourd</option>
          </select>
        </label>
        <label>
          Devise
          <select name="currency" value={form.currency} onChange={handleChange}>
            <option>USD</option>
            <option>EUR</option>
            <option>CDF</option>
          </select>
        </label>
        <label className="full">
          Description
          <textarea
            name="description"
            required
            value={form.description}
            onChange={handleChange}
          />
        </label>
        <label className="full">
          Caractéristiques (une par ligne)
          <textarea
            name="features"
            value={form.features}
            onChange={handleChange}
          />
        </label>

        <label className="full">
          Photos du véhicule (Sélectionner depuis l'appareil)
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </label>

        {compressing && (
          <p style={{ color: "#007bff" }}>
            Optimization et compression des images en cours...
          </p>
        )}

        {form.images && (
          <div
            className="full"
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "10px",
            }}
          >
            {form.images
              .split("\n")
              .filter(Boolean)
              .map((img, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <img
                    src={img}
                    alt={`Aperçu ${idx + 1}`}
                    style={{
                      width: "100px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              ))}
          </div>
        )}

        <label className="full check">
          <input
            type="checkbox"
            name="isAvailable"
            checked={form.isAvailable}
            onChange={handleChange}
          />
          Disponible
        </label>
        <button className="btn full" disabled={compressing}>
          {compressing ? "Traitement des images..." : "Enregistrer"}
        </button>
      </form>
    </section>
  );
}
