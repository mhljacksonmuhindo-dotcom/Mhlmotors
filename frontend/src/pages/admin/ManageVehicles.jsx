import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteVehicle, getVehicles } from "../../services/vehicleService";
import { getVehicleImages } from "../../utils/vehicleImages";

export default function ManageVehicles() {
  const [v, setV] = useState([]);

  const load = () => {
    getVehicles().then((res) =>
      setV(Array.isArray(res) ? res : res?.data || []),
    );
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="wrap section">
      <div className="sectionhead">
        <h1>Véhicules</h1>
        <Link className="btn" to="/admin/vehicles/new">
          + Ajouter
        </Link>
      </div>
      {v?.map((x) => (
        <div className="adminrow" key={x._id}>
          <img src={getVehicleImages(x)[0]} alt={`${x.make} ${x.model}`} />
          <div>
            <b>
              {x.make} {x.model}
            </b>
            <p>
              {x.year} · {x.price?.toLocaleString()} {x.currency}
            </p>
          </div>
          <Link className="btn small" to={`/admin/vehicles/edit/${x._id}`}>
            Modifier
          </Link>
          <button
            className="btn danger small"
            onClick={async () => {
              if (confirm("Supprimer ?")) {
                await deleteVehicle(x._id);
                load();
              }
            }}
          >
            Supprimer
          </button>
        </div>
      ))}
    </section>
  );
}
