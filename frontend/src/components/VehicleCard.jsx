import { useState } from "react";
import { Link } from "react-router-dom";
import { getVehicleImages } from "../utils/vehicleImages";

export default function VehicleCard({ v }) {
 
  const [isReserved, setIsReserved] = useState(v.isReserved || false);
  const [likeCount, setLikeCount] = useState(v.likes || 0);

  const handleReservation = () => {
    setIsReserved(!isReserved);
  };

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  return (
    <article className="card">
      <img src={getVehicleImages(v)[0]} alt={`${v.make} ${v.model}`} />
      <div className="pad">
        <div className="muted">
          {v.category} · {v.year}
        </div>
        <h3>
          {v.make} {v.model}
        </h3>
        <div className="price">
          {v.price.toLocaleString()} {v.currency}
        </div>
        <div className="specs">
          <span>{v.mileage.toLocaleString()} km</span>
          <span>{v.fuelType}</span>
          <span>{v.transmission}</span>
        </div>

      
        <div className="muted" style={{ margin: "8px 0" }}>
          Statut :{" "}
          <strong style={{ color: isReserved ? "#e63946" : "#2a9d8f" }}>
            {isReserved ? "Réservé" : "Disponible"}
          </strong>
        </div>

        
        <Link
          className="btn"
          to={`/vehicle/${v._id}`}
          style={{ display: "block", textAlign: "center" }}
        >
          Voir le véhicule
        </Link>

       
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <button
            type="button"
            className="btn"
            onClick={handleReservation}
            style={{
              flex: 1,
              backgroundColor: isReserved ? "#dc3545" : "#4a5568",
              fontSize: "0.85rem",
              padding: "6px",
            }}
          >
            {isReserved ? "Annuler" : "Réserver"}
          </button>

          <button
            type="button"
            className="btn"
            onClick={handleLike}
            style={{
              backgroundColor: "#dc3128",
              fontSize: "0.85rem",
              padding: "6px 12px",
            }}
          >
            J'aime {likeCount}
          </button>
        </div>
      </div>
    </article>
  );
}
