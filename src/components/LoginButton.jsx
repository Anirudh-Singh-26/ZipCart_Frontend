import React from "react";
import { useAppContext } from "../context/AppContext";

const LoginButton = ({ closeMenu }) => {
  const { setShowUserLogin } = useAppContext();

  const handleLoginClick = () => {
    if (closeMenu) closeMenu();
    setShowUserLogin(true);
  };

  return (
    <button
      onClick={handleLoginClick}
      className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
    >
      Login
    </button>
  );
};

export default LoginButton;
