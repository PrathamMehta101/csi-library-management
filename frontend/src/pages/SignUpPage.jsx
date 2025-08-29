import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { mutate: signup } = useMutation({
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
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
        />
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
        <button type="submit">signup</button>
      </form>
    </div>
  );
}
export default SignUpPage;
