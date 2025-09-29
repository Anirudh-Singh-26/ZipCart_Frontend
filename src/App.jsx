import { Routes, Route, useLocation } from "react-router-dom";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Auth from "./modals/Auth";
import ProductCategory from "./pages/ProductCategory";
import Address from "./pages/Address";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";

const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.startsWith("/seller"); // updated
  const { showUserLogin, isSeller } = useAppContext();

  // Debug logs
  console.log("[DEBUG] Current path:", location.pathname);
  console.log("[DEBUG] isSellerPath:", isSellerPath);
  console.log("[DEBUG] isSeller from context:", isSeller);
  console.log("[DEBUG] showUserLogin:", showUserLogin);

  return (
    <div className="text-default min-h-screen">
      {/* Navbar */}
      {!isSellerPath && <Navbar />}

      {/* Auth modal */}
      {showUserLogin && <Auth />}

      <Toaster />

      <div
        className={`${!isSellerPath ? "px-6 md:px-16 lg:px-24 xl:px-32" : ""}`}
      >
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/product/:category/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<Address />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* Seller/admin routes - only rendered when path starts with /seller */}
          {isSellerPath && (
            <Route
              path="/seller"
              element={isSeller ? <SellerLayout /> : <SellerLogin />}
            >
              <Route index element={isSeller ? <AddProduct /> : null} />
              <Route
                path="product-list"
                element={isSeller ? <ProductList /> : null}
              />
              <Route path="orders" element={isSeller ? <Orders /> : null} />
            </Route>
          )}
        </Routes>
      </div>

      {/* Footer */}
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
