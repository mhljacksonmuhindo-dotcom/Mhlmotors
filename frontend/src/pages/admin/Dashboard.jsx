import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStats } from "../../services/orderService";
export default function Dashboard() {
  const [s, setS] = useState();
  useEffect(() => {
    getStats().then(setS);
  }, []);
  if (!s) return <div className="center">Chargement…</div>;
  return (
    <section className="wrap section">
      <p className="eyebrow">ADMINISTRATION</p>
      <h1>Dashboard</h1>
      <div className="stats">
        {[
          ["Véhicules", s.totalVehicles],
          ["Disponibles", s.availableVehicles],
          ["Commandes", s.totalOrders],
          ["En attente", s.pendingOrders],
          ["Confirmées", s.confirmedOrders],
          ["Terminées", s.completedOrders],
        ].map((x) => (
          <div className="stat" key={x[0]}>
            <span>{x[0]}</span>
            <strong>{x[1]}</strong>
          </div>
        ))}
      </div>
      <Link className="btn" to="/admin/vehicles">
        Véhicules
      </Link>
      <Link className="btn" to="/admin/orders">
        Commandes
      </Link>
    </section>
  );
}
