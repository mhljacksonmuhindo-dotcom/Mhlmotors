import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://mhl-motors-api.onrender.com/api",
});

API.interceptors.request.use((c) => {
  const t = localStorage.getItem("mhl_token");
  if (t) c.headers.Authorization = `Bearer ${t}`;
  return c;
});

export default API;
