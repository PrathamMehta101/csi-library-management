import toast from "react-hot-toast";
import Book from "../../../backend/models/book.model";

import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function BookPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { bookId } = useParams();
  console.log(bookId);

  const { data: book } = useQuery({
    queryKey: ["bookDetails"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/books/${bookId}`, {
          method: "GET",
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
  });

  const { data: alreadyReserved } = useQuery({
    queryKey: ["alreadyReserved"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/reservations/user/", {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        console.log(data);
        return data.some(
          (res) => res.bookId._id.toString() === bookId.toString()
        );
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { mutate: reserve } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/reservations/${bookId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
    },
    onSuccess: async () => {
      toast.success("Book reserved successfully");
      await Promise.all([
        queryClient.invalidateQueries(["bookDetails"]),
        queryClient.invalidateQueries(["alreadyReserved"]),
      ]);
      navigate("/user/dashboard");
    },
    onError: async () => {
      toast.error("Something went wrong");
    },
  });

  const { mutate: cancel } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/reservations/${bookId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: async () => {
      toast.success("Reservation cancelled successfully");
      await Promise.all([
        queryClient.invalidateQueries(["bookDetails"]),
        queryClient.invalidateQueries(["alreadyReserved"]),
      ]);
      navigate("/user/dashboard");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div className="pt-24 px-6 flex justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-6 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          {book?.title}
        </h1>
        <p className="text-lg text-gray-600 mb-2">👤 {book?.author}</p>
        <p className="text-gray-500 mb-4">📖 Category: {book?.category}</p>
        <p className="text-gray-700 mb-6">{book?.description}</p>

        {/* Stats */}
        <div className="flex justify-between mb-6 text-sm text-gray-600">
          <span>✅ Available: {book?.availableCopies}</span>
          <span>⏳ Pending: {book?.pendingReservations}</span>
        </div>

        {/* Reserve / Cancel Button */}
        {!alreadyReserved ? (
          <button
            onClick={reserve}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Reserve Book
          </button>
        ) : (
          <button
            onClick={cancel}
            className="w-full px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
          >
            Cancel Reservation
          </button>
        )}
      </div>
    </div>
  );
}
export default BookPage;
