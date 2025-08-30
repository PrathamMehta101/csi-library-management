import { Link } from "react-router-dom";

function Reservation({ reservation }) {
  const book = reservation.bookId;

  return (
    <tr className="hover:bg-gray-200 transition">
      <td className="px-6 py-4 text-sm text-gray-800">{book.title}</td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {book.pendingReservations} people left
      </td>
      <td
        className={`px-6 py-4 text-sm font-semibold ${
          reservation.status === "active"
            ? "text-green-600"
            : reservation.status === "pending"
            ? "text-yellow-600"
            : "text-red-600"
        }`}
      >
        {reservation.status.toUpperCase()}
      </td>
      <td className="px-6 py-4">
        <Link
          to={`/catalog/${book._id}`}
          className="text-indigo-600 hover:text-indigo-800 font-medium transition"
        >
          View
        </Link>
      </td>
    </tr>
  );
}

export default Reservation;
