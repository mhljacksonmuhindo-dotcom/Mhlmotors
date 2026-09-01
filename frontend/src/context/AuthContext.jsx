import { createContext, useEffect, useState } from "react";
import { me } from "../services/authService";
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("mhl_token"))
      me()
        .then(setUser)
        .catch(() => localStorage.removeItem("mhl_token"))
        .finally(() => setLoading(false));
    else setLoading(false);
  }, []);
  const loginUser = (d) => {
    localStorage.setItem("mhl_token", d.token);
    setUser(d);
  };
  const logout = () => {
    localStorage.removeItem("mhl_token");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
