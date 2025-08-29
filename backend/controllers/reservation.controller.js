import Book from "../models/book.model.js";
import Reservation from "../models/reservation.model.js";

export const reserveBook = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    const existing = await Reservation.findOne({
      userId,
      bookId,
      status: { $in: ["active", "pending"] },
    });
    if (existing)
      return res
        .status(400)
        .json({ error: "You already have a reservation for this book" });

    const activeCount = await Reservation.countDocuments({
      bookId,
      status: "active",
    });

    const reservation = await Reservation.create({
      userId,
      bookId,
      position: activeCount + 1,
    });

    if (book.availableCopies > 0 && reservation.position == 1) {
      book.availableCopies -= 1;
      await book.save();
      reservation.status = "fulfilled";
      await reservation.save();
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in reserveBook controller");
  }
};

// ONLY DELETES PENDING RESERVATIONS
export const cancelReservation = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const userId = req.user._id;

    const reservation = await Reservation.findOne({
      bookId,
      userId,
      status: "pending",
    });

    if (!reservation) {
      return res.status(404).json({ error: "Pending reservation not found" });
    }

    const reservationPosition = reservation.position;

    await Reservation.deleteOne({ _id: reservation._id });

    await Reservation.updateMany(
      {
        bookId,
        status: "pending",
        position: { $gt: reservationPosition },
      },
      { $inc: { position: -1 } }
    );

    res.json({ message: "Pending reservation cancelled successfully" });
  } catch (error) {
    console.error("Error in cancelReservation controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUserReservations = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Reservation.find({ userId }).populate("bookId");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in getAllReservations controller");
  }
};

export const checkExistingReservation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: bookId } = req.params;
    const existing = await Reservation.findOne({
      userId,
      bookId,
      status: { $in: ["active", "pending"] },
    });
    if (existing) {
      return res.status(200).json({ exists: true });
    }
    return res.json(200).json({ exists: false });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in checkExistingReservation controller");
  }
};
