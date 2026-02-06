import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Stores from "./pages/Stores";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Refunds from "./pages/Refunds";
import Couriers from "./pages/Couriers";

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/refunds" element={<Refunds />} />
          <Route path="/couriers" element={<Couriers />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}