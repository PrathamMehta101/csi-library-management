import express from "express";
import Book from "../models/book.model.js";
import { getBookById, getBooks } from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);

export default router;
