import { useQuery } from "@tanstack/react-query";
import Book from "../components/Book";
import { useState } from "react";
import { Link } from "react-router";

function CatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const { data: books, isLoading } = useQuery({
    queryKey: ["books", search, category, sort],
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

  console.log(books);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Catalog</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Fiction">Fiction</option>
          <option value="History">History</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Newest</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </div>

      {/* Books */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <Book book={book} key={book._id} />
          ))}
        </div>
      )}
    </div>
  );
}
export default CatalogPage;
