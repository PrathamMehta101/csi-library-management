import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate: login } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
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
      toast.success("Logged in successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    login(formData);
    navigate("/");
  }

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          value={formData.password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default LoginPage;
