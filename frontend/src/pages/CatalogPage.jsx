import { useQuery } from "@tanstack/react-query";
import Book from "../components/Book";
import { useState } from "react";
import { Link } from "react-router";

function CatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const { data: books, isLoading } = useQuery({
    queryKey: ["books", { search, category, sort }],
    queryFn: async () => {
      try {
        const res = await fetch(
          `/api/books?search=${search}&category=${category}&sort=${sort}`
        );
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

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 pt-24">
      {/* Header */}
      <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8">
        📚 Explore Our Catalog
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Fiction">Fiction</option>
          <option value="History">History</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">Newest</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </div>

      {/* Books Grid */}
      {isLoading ? (
        <p className="text-center text-gray-600">Loading books...</p>
      ) : books?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <Book book={book} key={book._id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No books found 📭</p>
      )}
    </div>
  );
}
export default CatalogPage;
