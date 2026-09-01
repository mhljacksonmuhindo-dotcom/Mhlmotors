import API from "./api";
export const createOrder = (d) => API.post("/orders", d).then((r) => r.data);
export const getOrders = (p) =>
  API.get("/orders", { params: p }).then((r) => r.data);
export const updateOrderStatus = (id, status) =>
  API.patch(`/orders/${id}/status`, { status }).then((r) => r.data);
export const deleteOrder = (id) =>
  API.delete(`/orders/${id}`).then((r) => r.data);
export const getStats = () => API.get("/orders/stats").then((r) => r.data);
