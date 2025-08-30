import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        console.log("In login mutationFn");

        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: (data) => {
      console.log({ data });
      toast.success("Logged in successfully");
      queryClient.setQueryData(["authUser"], data.user ?? data);
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
            className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
            className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

          <button
            type="submit"
            disabled={isPending}
            className="bg-indigo-600 text-white py-2 rounded-xl shadow hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
export default LoginPage;
