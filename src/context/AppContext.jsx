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

  // Load cart from localStorage initially
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [searchQuery, setSearchQuery] = useState("");

  const isSellerPath = location.pathname.startsWith("/seller");

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Check seller auth
  const fetchSeller = async () => {
    if (!isSellerPath) return;
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success ? true : false);
    } catch (error) {
      setIsSeller(false);
    }
  };

  // Fetch user auth and merge cart
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        // Merge backend cart with current cart
        const mergedCart = { ...cartItems, ...(data.user.cart || {}) };
        setCartItems(mergedCart);
      } else {
        setUser(null);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  // Fetch products
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

  // Run on mount
  useEffect(() => {
    fetchProducts();
    fetchUser();
    fetchSeller();
  }, []);

  // Cart logic
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      toast.success("Added to cart");
      return updated;
    });
  };

  const updateCartItem = (itemId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev, [itemId]: quantity };
      toast.success("Cart updated");
      return updated;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updated = { ...prev, [itemId]: prev[itemId] - 1 };
      if (updated[itemId] <= 0) delete updated[itemId];
      toast.success("Removed from cart");
      return updated;
    });
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

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
