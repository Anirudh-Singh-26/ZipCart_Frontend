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
  const isSellerPath = location.pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();

  // Debug: show current route
  console.log("[DEBUG] Current path:", location.pathname);
  console.log("[DEBUG] isSellerPath:", isSellerPath);
  console.log("[DEBUG] isSeller from context:", isSeller);
  console.log("[DEBUG] showUserLogin:", showUserLogin);

  return (
    <div className="text-default min-h-screen">
      {/* Debug: Navbar rendering */}
      {console.log("[DEBUG] Navbar will render:", !isSellerPath)}
      {isSellerPath ? null : <Navbar />}

      {/* Debug: Auth modal */}
      {showUserLogin && console.log("[DEBUG] Auth modal is visible")}
      {showUserLogin ? <Auth /> : null}

      <Toaster />

      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/product/:category/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<Address />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* Debug: seller routes */}
          {console.log("[DEBUG] Rendering /seller route")}

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
        </Routes>
      </div>

      {console.log("[DEBUG] Footer will render:", !isSellerPath)}
      {isSellerPath ? null : <Footer />}
    </div>
  );
};

export default App;
