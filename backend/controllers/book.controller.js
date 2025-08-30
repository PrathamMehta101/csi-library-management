import Book from "../models/book.model.js";
import Reservation from "../models/reservation.model.js";

export const getBooks = async (req, res) => {
  try {
    const { search, category, sort } = req.query;
    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }

    let query = Book.find(filter);

    if (sort) {
      const sortField =
        sort === "title"
          ? "title"
          : sort === "author"
          ? "author"
          : "-createdAt";
      query = query.sort(sortField);
    }

    const books = await query.exec();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in fetchBooks controller");
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    // number of people who currently have the book
    const activeReservations = await Reservation.countDocuments({
      bookId,
      status: "active",
    });

    const pendingReservations = await Reservation.countDocuments({
      bookId,
      status: "pending",
    });

    book.availableCopies = book.totalCopies - activeReservations;
    book.pendingReservations = pendingReservations;

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in getBookById controller", error.message);
  }
};
