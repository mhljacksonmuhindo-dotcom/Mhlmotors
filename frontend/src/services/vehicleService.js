import API from "./api";
export const getVehicles = (p) =>
  API.get("/vehicles", { params: p }).then((r) => r.data);
export const getVehicle = (id) =>
  API.get(`/vehicles/${id}`).then((r) => r.data);
export const createVehicle = (d) =>
  API.post("/vehicles", d).then((r) => r.data);
export const updateVehicle = (id, d) =>
  API.put(`/vehicles/${id}`, d).then((r) => r.data);
export const deleteVehicle = (id) =>
  API.delete(`/vehicles/${id}`).then((r) => r.data);
