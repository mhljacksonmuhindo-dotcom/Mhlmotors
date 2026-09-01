export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div>
          <div className="brand">
            MHL<span>MOTORS</span>
          </div>
          <p>Votre partenaire automobile de confiance.</p>
        </div>
        <div>
          <h4>Navigation</h4>
          <p>Accueil · Véhicules · Contact</p>
        </div>
        <div>
          <h4>Commande</h4>
          <p>Nous trouvons le véhicule adapté à votre besoin.</p>
        </div>
      </div>
      <div className="copy">
        © {new Date().getFullYear()} MHL Motors. Tous droits réservés.
      </div>
    </footer>
  );
}
