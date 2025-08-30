import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Navbar from "./components/Navbar";
import CatalogPage from "./pages/CatalogPage";

import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import { useQuery } from "@tanstack/react-query";
import BookPage from "./pages/BookPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <CatalogPage />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <CatalogPage />}
        />
        <Route
          path="/catalog"
          element={authUser ? <CatalogPage /> : <SignUpPage />}
        />
        <Route
          path="/catalog/:bookId"
          element={authUser ? <BookPage /> : <SignUpPage />}
        />
        <Route
          path="/user/dashboard"
          element={authUser ? <ProfilePage /> : <LoginPage />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}
export default App;
