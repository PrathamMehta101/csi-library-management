import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    position: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "pending"], // active - user has book, pending - user is going to get the book
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
