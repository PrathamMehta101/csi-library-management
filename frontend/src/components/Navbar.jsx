import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Navbar() {
  const queryClient = useQueryClient();

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me", { method: "GET" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.setQueryData(["authUser"], null);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            MyLibrary 📚
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Catalog
            </Link>
            <Link
              to="/ebooks"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Ebooks
            </Link>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            {authUser ? (
              <>
                <Link to="/user/dashboard">
                  <img
                    src="/avatar3.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-indigo-600 shadow-md hover:scale-105 transition"
                  />
                </Link>
                <button
                  onClick={() => logout()}
                  className="px-3 py-1 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
