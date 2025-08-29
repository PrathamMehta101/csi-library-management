import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    activeLoans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loan",
      },
    ],
    reservations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
    fines: {
      total: {
        type: Number,
        default: 0,
      },
      history: [
        {
          amount: Number,
          reason: String, // e.g., "Late return"
          date: { type: Date, default: Date.now },
        },
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
