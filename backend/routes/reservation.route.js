import express from "express";
import {
  cancelReservation,
  checkExistingReservation,
  getAllUserReservations,
  reserveBook,
} from "../controllers/reservation.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:id", protectRoute, reserveBook);
router.delete("/:id", protectRoute, cancelReservation);
router.get("/user/:id", protectRoute, getAllUserReservations);
router.post("/check/:id", protectRoute, checkExistingReservation);

export default router;
