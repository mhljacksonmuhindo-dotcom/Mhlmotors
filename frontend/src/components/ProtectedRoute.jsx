import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="center">Chargement…</div>;
  return user ? children : <Navigate to="/admin/login" replace />;
}
