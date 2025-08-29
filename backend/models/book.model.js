import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true }, // e.g., Fiction, Science
    description: { type: String, trim: true },
    totalCopies: { type: Number, required: true, min: 1 },
    availableCopies: { type: Number, required: true, min: 0 },
    metadata: {
      publisher: String,
      publishedDate: Date,
      isbn: String,
      language: String,
    },
    pdfUrl: { type: String }, // optional: for free e-books
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
