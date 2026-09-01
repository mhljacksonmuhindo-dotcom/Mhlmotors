import API from "./api";
export const login = (email, password) =>
  API.post("/auth/login", { email, password }).then((r) => r.data);
export const me = () => API.get("/auth/me").then((r) => r.data);
