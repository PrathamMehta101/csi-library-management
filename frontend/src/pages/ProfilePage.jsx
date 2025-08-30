import { useQuery } from "@tanstack/react-query";
import Reservation from "../components/Reservation";

function ProfilePage() {
  const {
    data: userReservations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userReservations"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/reservations/user");
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

  if (isLoading) {
    return (
      <div className="pt-24 flex justify-center text-gray-600">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="pt-24 flex justify-center text-red-600">
        Failed to load reservations.
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-indigo-600">
            My Reservations
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Book Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Your Position
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {userReservations?.map((reservation) => (
                <Reservation key={reservation._id} reservation={reservation} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
