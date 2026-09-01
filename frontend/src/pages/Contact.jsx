import { Link } from "react-router-dom";
export default function Contact() {
  return;
  <section className="wrap section">
    <div className="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h1>Parlons de votre prochain véhicule.</h1>
        <p>
          Vous ne trouvez pas le modèle recherché ? Envoyez-nous vos critères.
        </p>
        <Link className="btn" to="/vehicles">
          Commencer
        </Link>
      </div>
      <div className="contactcard">
        <h3>MHL MOTORS</h3>
        <p> Téléphone : 0975285273</p>
        <p>✉ Email : mhljacksonmuhindo@gmail.com</p>
        <p>RDC</p>
        <p>Butembo</p>
      </div>
    </div>
  </section>;
}
