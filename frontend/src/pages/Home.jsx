import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVehicles } from "../services/vehicleService";
import VehicleCard from "../components/VehicleCard";
export default function Home() {
  const [v, setV] = useState([]);
  useEffect(() => {
    getVehicles()
      .then((x) => setV(x.slice(0, 3)))
      .catch(() => {});
  }, []);
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">MHL MOTORS</p>
          <h1>L’automobile qui correspond à votre ambition.</h1>
          <p>
            Nous trouvons et livrons des véhicules sélectionnés selon vos
            besoins et votre budget.
          </p>
          <Link className="btn" to="/vehicles">
            Voir les véhicules
          </Link>
          <Link className="btn ghost" to="/contact">
            Commander
          </Link>
        </div>
      </section>
      <section className="wrap section">
        <div className="sectionhead">
          <div>
            <p className="eyebrow">Sélection</p>
            <h2>Véhicules disponibles</h2>
          </div>
          <Link to="/vehicles">Voir tout →</Link>
        </div>
        <div className="grid">
          {v.map((x) => (
            <VehicleCard key={x._id} v={x} />
          ))}
        </div>
      </section>
      <section className="dark section">
        <div className="wrap three">
          {[
            ["01", "Choisissez", "Parcourez notre sélection."],
            ["02", "Commandez", "Envoyez vos critères et votre budget."],
            ["03", "Recevez", "Nous vous accompagnons jusqu’à la livraison."],
          ].map((x) => (
            <div key={x[0]}>
              <b>{x[0]}</b>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
