import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function Navbar() {
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        toast.success("Logged out successfully");
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div>
      Navbar
      <button onClick={logout}>logout</button>
    </div>
  );
}
export default Navbar;
