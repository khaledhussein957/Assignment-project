import { Navigate, Route, Routes } from "react-router";
// import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Routes>
      {/* <Route
        path="/login"
        element={isSignedIn ? <Navigate to={"/dashboard"} /> : <LoginPage />}
      /> */}

      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to={"dashboard"} />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
