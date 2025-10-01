import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    cartCount,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        setUser(null);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to="/">
        <div className="flex gap-4 items-center">
          <img src="./favicon.svg" alt="logo" className="w-8 h-8" />
          <h2 className="text-2xl font-bold text-primary">ZipCart</h2>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to="/">Home</Link>
        <Link to="/products">All Products</Link>
        <button
          onClick={() => navigate("/seller")}
          className="px-4 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
        >
          Seller
        </button>

        {/* Search */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src="/cart-shopping-solid-full.svg"
            alt="cart icon"
            className="w-6 h-6"
          />
          {cartCount() > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 text-xs text-white bg-indigo-500 rounded-full flex items-center justify-center">
              {cartCount()}
            </span>
          )}
        </div>

        {/* User */}
        {user ? (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-10 cursor-pointer"
            />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 w-36 rounded-md z-40 text-sm">
              <li
                onClick={() => navigate("/my-orders")}
                className="p-2 cursor-pointer hover:bg-gray-100 rounded"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-2 cursor-pointer hover:bg-gray-100 rounded"
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="flex items-center gap-6 md:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative w-8 h-8 flex items-center justify-center cursor-pointer"
        >
          <img
            src="/cart-shopping-solid-full.svg"
            alt="cart icon"
            className="w-6 h-6"
          />
          {cartCount() > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 text-xs text-white bg-indigo-500 rounded-full flex items-center justify-center">
              {cartCount()}
            </span>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="sm:hidden"
        >
          {/* Hamburger SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link onClick={() => setOpen(false)} to="/">
          Home
        </Link>
        <Link onClick={() => setOpen(false)} to="/products">
          Products
        </Link>
        <button
          onClick={() => {
            navigate("/seller");
            setOpen(false);
          }}
          className="px-3 py-1 bg-indigo-500 text-white rounded-full"
        >
          Seller
        </button>

        {user ? (
          <div className="relative group">
            <img src={assets.profile_icon} alt="" className="w-10" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 w-36 rounded-md z-40 text-sm">
              <li
                onClick={() => navigate("/my-orders")}
                className="p-1.5 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={() => {
                  setUser(null);
                  navigate("/");
                }}
                className="p-1.5 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
