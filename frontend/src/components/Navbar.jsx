import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import logo from "../../img/Logo.png";
export default function Navbar() {
  const [o, setO] = useState(false),
    { user, logout } = useAuth();
  return (
    <header className="nav">
      <div className="wrap navin">
        <Link
          className="brand"
          to="/"
          aria-label="MHL Motors - Accueil"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            lineHeight: 1,
          }}
        >
          <img
            src={logo}
            alt=""
            style={{ height: "100px", width: "auto", objectFit: "contain" }}
          />
          MHL<span>MOTORS</span>
        </Link>
        <button className="hamb" onClick={() => setO(!o)}>
          ☰
        </button>
        <nav className={o ? "links open" : "links"}>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/vehicles">Véhicules</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {user ? (
            <>
              <NavLink to="/admin/dashboard">Dashboard</NavLink>
              <button className="linkbtn" onClick={logout}>
                Déconnexion
              </button>
            </>
          ) : (
            <NavLink to="/admin/login">Admin</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
