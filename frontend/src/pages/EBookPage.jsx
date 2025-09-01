import { Link } from "react-router-dom";

function EBookPage() {
  return (
    <div className="pt-24">
      <p>EBookPage</p>
      <Link to="/ebooks/upload">Upload Ebook</Link>
    </div>
  );
}
export default EBookPage;
