import { useEffect, useState } from "react";
import {
  deleteOrder,
  getOrders,
  updateOrderStatus,
} from "../../services/orderService";

const S = [
  "EN ATTENTE",
  "CONTACTÉ",
  "EN TRAITEMENT",
  "CONFIRMÉE",
  "TERMINÉE",
  "ANNULÉE",
];

export default function ManageOrders() {
  const [o, setO] = useState([]);
  const [q, setQ] = useState("");

  const load = () => {
    getOrders({ search: q }).then(setO);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="wrap section">
      <h1>Commandes</h1>
      <div className="filters">
        <input
          placeholder="Rechercher…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
        />
        <button className="btn" onClick={load}>
          Rechercher
        </button>
      </div>
      {o.map((x) => (
        <article className="order" key={x._id}>
          <div>
            <b>{x.fullName}</b>
            <p>
              {x.email} · {x.phone}
            </p>
            <p>
              {x.desiredVehicle} · Budget {x.budget}
            </p>
          </div>
          <select
            value={x.status}
            onChange={async (e) => {
              await updateOrderStatus(x._id, e.target.value);
              load();
            }}
          >
            {S.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button
            className="btn danger small"
            onClick={async () => {
              if (confirm("Supprimer ?")) {
                await deleteOrder(x._id);
                load();
              }
            }}
          >
            Supprimer
          </button>
        </article>
      ))}
    </section>
  );
}
