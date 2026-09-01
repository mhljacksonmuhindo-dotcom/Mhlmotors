import { Link } from "react-router-dom";
import { getVehicleImages } from "../utils/vehicleImages";
export default function VehicleCard({ v }) {
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
        <Link className="btn" to={`/vehicle/${v._id}`}>
          Voir le véhicule
        </Link>
      </div>
    </article>
  );
}
