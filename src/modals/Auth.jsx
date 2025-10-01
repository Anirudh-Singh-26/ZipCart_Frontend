import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Auth = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });
      if (data.success) {
        toast.success(data.message);
        setUser(data.user);
        setShowUserLogin(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm text-gray-700"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-5 p-8 sm:p-10 w-80 sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 relative"
      >
        <p className="text-3xl font-bold m-auto text-center">
          <span className="text-indigo-500">User</span>{" "}
          {state === "login" ? "Login" : "Register"}
        </p>

        {state === "register" && (
          <div className="w-full flex flex-col">
            <label className="text-sm font-medium mb-1">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Type your name"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full flex flex-col">
          <label className="text-sm font-medium mb-1">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Type your email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            type="email"
            required
          />
        </div>

        <div className="w-full flex flex-col">
          <label className="text-sm font-medium mb-1">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Type your password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            type="password"
            required
          />
        </div>

        <p className="text-sm text-gray-500">
          {state === "register"
            ? "Already have an account? "
            : "Create an account? "}
          <span
            onClick={() => setState(state === "login" ? "register" : "login")}
            className="text-indigo-500 cursor-pointer hover:underline"
          >
            click here
          </span>
        </p>

        <button
          type="submit"
          disabled={loading}
          className="relative flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-3 rounded-lg font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white absolute left-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          )}
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
