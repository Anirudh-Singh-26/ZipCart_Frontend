import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

// Axios defaults
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const isSellerPath = location.pathname.startsWith("/seller");

  // check seller status - only for /seller routes
  const fetchSeller = async () => {
    if (!isSellerPath) return; // skip if not a seller page
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success ? true : false);
    } catch (error) {
      setIsSeller(false);
    }
  };

  // fetch user auth status - handle guest silently
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cart || {}); // fallback to empty object
      } else {
        setUser(null); // guest
        setCartItems({});
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null); // guest
        setCartItems({});
      } else {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  // fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // fetch data when pathname changes
  useEffect(() => {
    fetchProducts();
    if (!isSellerPath) fetchUser(); // fetch user only for non-seller routes
    fetchSeller(); // only runs if isSellerPath is true
  }, [location.pathname]);

  // cart logic
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems || {});
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems || {});
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems || {});
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId];
      setCartItems(cartData);
      toast.success("Removed from cart");
    }
  };

  const cartCount = () =>
    Object.values(cartItems || {}).reduce((a, b) => a + b, 0);

  const totalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems || {}) {
      const product = products.find((p) => p._id === itemId);
      if (product) total += cartItems[itemId] * product.offerPrice;
    }
    return Math.floor(total * 100) / 100;
  };

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    cartCount,
    totalCartAmount,
    axios,
    fetchProducts,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
