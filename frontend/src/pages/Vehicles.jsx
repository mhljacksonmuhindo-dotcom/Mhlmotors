import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import { getVehicles } from "../services/vehicleService";

export default function Vehicles() {
  const [v, setV] = useState([]);
  const [search, setSearch] = useState("");
  const [fuel, setFuel] = useState("");
  const [category, setCategory] = useState("");

  const load = async () => {
    try {
      const response = await getVehicles({
        search,
        fuelType: fuel,
        category,
      });

      console.log(" Véhicules reçus :", response);

      setV(response);
    } catch (error) {
      console.error("Erreur lors du chargement des véhicules :", error);
      setV([]);
    }
  };

  useEffect(() => {
    load();
  }, [search, fuel, category]);

  return (
    <section className="wrap section">
      <div className="sectionhead">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h1>Nos véhicules</h1>
        </div>
      </div>

      <div className="filters">
        <input
          placeholder="Rechercher marque ou modèle…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              load();
            }
          }}
        />

        <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
          <option value="">Tous carburants</option>
          <option value="Essence">Essence</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybride">Hybride</option>
          <option value="Électrique">Électrique</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Toutes catégories</option>
          <option value="SUV">SUV</option>
          <option value="Berline">Berline</option>
          <option value="Pickup">Pickup</option>
          <option value="4x4">4x4</option>
          <option value="Engin lourd">Engins lourds</option>
        </select>

        <button className="btn" onClick={load}>
          Rechercher
        </button>
      </div>

      <div className="grid">
        {v.map((x) => (
          <VehicleCard key={x._id} v={x} />
        ))}
      </div>

      {!v.length && <div className="empty">Aucun véhicule trouvé.</div>}
    </section>
  );
}
