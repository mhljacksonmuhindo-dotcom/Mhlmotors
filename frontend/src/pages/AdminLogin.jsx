import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

import useAuth from "../hooks/useAuth";
export default function AdminLogin() {
  const { user, loginUser } = useAuth(),
    nav = useNavigate();
  const [e, setE] = useState(""),
    [p, setP] = useState(""),
    [err, setErr] = useState("");
  if (user) return <Navigate to="/admin/dashboard" />;
  return (
    <section className="auth">
      <form
        className="authbox"
        onSubmit={async (x) => {
          x.preventDefault();
          try {
            loginUser(await login(e, p));
            nav("/admin/dashboard");
          } catch (z) {
            setErr(z.response?.data?.message || "Connexion impossible");
          }
        }}
      >
        <p className="eyebrow">ESPACE ADMIN</p>
        <h1>Connexion</h1>
        {err && <div className="error">{err}</div>}
        <label>
          Email
          <input
            type="email"
            required
            value={e}
            onChange={(x) => setE(x.target.value)}
            placeholder="email administrator"
          />
        </label>
        <label>
          Mot de passe
          <input
            type="password"
            required
            value={p}
            onChange={(x) => setP(x.target.value)}
            placeholder="mot de passe administrator"
          />
        </label>
        <button className="btn">Se connecter</button>
      </form>
    </section>
  );
}
