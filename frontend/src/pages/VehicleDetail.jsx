import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getVehicle } from "../services/vehicleService";
import { createOrder } from "../services/orderService";
import { getVehicleImages } from "../utils/vehicleImages";
export default function VehicleDetail() {
  const { id } = useParams(),
    [v, setV] = useState(),
    [selectedImage, setSelectedImage] = useState(),
    [sent, setSent] = useState(false),
    [f, setF] = useState({
      fullName: "",
      phone: "",
      email: "",
      cityCountry: "",
      budget: "",
      desiredYear: "",
      fuelType: "",
      transmission: "",
      message: "",
    });
  useEffect(() => {
    getVehicle(id).then(setV);
  }, [id]);
  if (!v) return <div className="center">Chargement…</div>;
  const submit = async (e) => {
    e.preventDefault();
    await createOrder({
      ...f,
      vehicleId: v._id,
      desiredVehicle: `${v.make} ${v.model}`,
      budget: +f.budget,
      desiredYear: +f.desiredYear,
    });
    setSent(true);
  };
  const images = getVehicleImages(v);
  const mainImage = selectedImage || images[0];
  return (
    <section className="wrap section">
      <Link to="/vehicles">← Catalogue</Link>
      <div className="detail">
        <div>
          <img
            className="detailimg"
            src={mainImage}
            alt={`${v.make} ${v.model}`}
          />
          {images.length > 1 && (
            <div className="detailthumbs">
              {images.map((image) => (
                <button
                  className="thumbbutton"
                  type="button"
                  key={image}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image} alt={`${v.make} ${v.model}`} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="eyebrow">
            {v.category} · {v.year}
          </p>
          <h1>
            {v.make} {v.model}
          </h1>
          <div className="price">
            {v.price.toLocaleString()} {v.currency}
          </div>
          <p>{v.description}</p>
          <div className="specgrid">
            <span>{v.mileage.toLocaleString()} km</span>
            <span>{v.fuelType}</span>
            <span>{v.transmission}</span>
            <span>{v.color}</span>
          </div>
          <h3>Caractéristiques</h3>
          <ul>
            {v.features?.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="orderbox">
        <h2>Commander ce véhicule</h2>
        {sent ? (
          <div className="success">Demande envoyée avec succès.</div>
        ) : (
          <form className="formgrid" onSubmit={submit}>
            {[
              ["fullName", "Nom complet"],
              ["phone", "Téléphone"],
              ["email", "Email"],
              ["cityCountry", "Ville / pays"],
              ["budget", "Budget"],
              ["desiredYear", "Année souhaitée"],
            ].map(([n, l]) => (
              <label key={n}>
                {l}
                <input
                  required
                  type={
                    n === "email"
                      ? "email"
                      : n === "budget" || n === "desiredYear"
                        ? "number"
                        : "text"
                  }
                  value={f[n]}
                  onChange={(e) => setF({ ...f, [n]: e.target.value })}
                />
              </label>
            ))}
            <label>
              Carburant
              <select
                required
                value={f.fuelType}
                onChange={(e) => setF({ ...f, fuelType: e.target.value })}
              >
                <option value="">Choisir</option>
                <option>Essence</option>
                <option>Diesel</option>
                <option>Hybride</option>
                <option>Électrique</option>
              </select>
            </label>
            <label>
              Transmission
              <select
                required
                value={f.transmission}
                onChange={(e) => setF({ ...f, transmission: e.target.value })}
              >
                <option value="">Choisir</option>
                <option>Automatique</option>
                <option>Manuelle</option>
              </select>
            </label>
            <label className="full">
              Message
              <textarea
                value={f.message}
                onChange={(e) => setF({ ...f, message: e.target.value })}
              />
            </label>
            <button className="btn full">Envoyer</button>
          </form>
        )}
      </div>
    </section>
  );
}
