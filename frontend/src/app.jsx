import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import VehicleDetail from "./pages/VehicleDetail";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/admin/Dashboard";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageVehicles from "./pages/admin/ManageVehicles";
import VehicleFormPage from "./pages/admin/VehicleFormPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/vehicles" element={<Vehicles />} />

          <Route path="/vehicle/:id" element={<VehicleDetail />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vehicles"
            element={
              <ProtectedRoute>
                <ManageVehicles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vehicles/new"
            element={
              <ProtectedRoute>
                <VehicleFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vehicles/edit/:id"
            element={
              <ProtectedRoute>
                <VehicleFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute>
                <ManageOrders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
