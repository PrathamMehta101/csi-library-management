import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { mutate: signup, isPending } = useMutation({
    mutationFn: async ({ name, email, password }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
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
      toast.success("Account created successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    signup(formData);
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Create an Account ✨
        </h2>

        {/* Form */}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
            className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

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
            {isPending ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
export default SignUpPage;
