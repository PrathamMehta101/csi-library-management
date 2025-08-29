import { Link } from "react-router-dom";

function Book({ book }) {
  return (
    <div className="p-4 border rounded-lg shadow-md my-4">
      <h1 className="text-xl font-bold">{book.title}</h1>
      <h2 className="text-md text-gray-600">{book.author}</h2>
      <p>{book.category}</p>
      <p className="text-sm text-gray-500">{book.description}</p>
      <br />
      <Link to={`/catalog/${book._id}`}>More</Link>
    </div>
  );
}
export default Book;
