import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import DashboardLayout from "./layouts/DashboardLayout";
// import { authClient } from "./lib/auth-client";

function App() {
  // const { data: session, isPending } = authClient.useSession();

  // if (isPending) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-base-200">
  //       <span className="loading loading-spinner loading-lg text-primary"></span>
  //     </div>
  //   );
  // }

  // const isSignedIn = !!session;

  return (
    <Routes>
      {/* <Route
        path="/login"
        element={isSignedIn ? <Navigate to={"/dashboard"} /> : <LoginPage />}
      /> */}

      {/* <Route
        path="/"
        element={isSignedIn ? <DashboardLayout /> : <Navigate to={"/login"} />}
      > */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to={"dashboard"} />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>

      <Route path="*" element={<Navigate to={"/dashboard"} />} />
    </Routes>
  );
}

export default App;
