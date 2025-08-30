import mongoose from "mongoose";
import dotenv from "dotenv";

import Book from "../models/book.model.js";

dotenv.config();

console.log(process.env.MONGODB_URI);

const books = [
  // --- Programming (7) ---
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    category: "Programming",
    description: "Classic book on software craftsmanship",
    totalCopies: 5,
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    description: "Guidelines for writing clean, maintainable code",
    totalCopies: 3,
  },
  {
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest, Stein",
    category: "Programming",
    description: "Comprehensive guide to algorithms",
    totalCopies: 4,
  },
  {
    title: "You Don’t Know JS",
    author: "Kyle Simpson",
    category: "Programming",
    description: "Deep dive into JavaScript",
    totalCopies: 6,
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    category: "Programming",
    description: "Modern introduction to JS",
    totalCopies: 5,
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    category: "Programming",
    description: "Reusable object-oriented software patterns",
    totalCopies: 3,
  },
  {
    title: "Refactoring",
    author: "Martin Fowler",
    category: "Programming",
    description: "Improving the design of existing code",
    totalCopies: 4,
  },

  // --- Fiction (8) ---
  {
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    description: "Dystopian social science fiction novel",
    totalCopies: 5,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    category: "Fiction",
    description: "Dystopian futuristic society",
    totalCopies: 4,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    description: "Classic American novel",
    totalCopies: 3,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    description: "Novel about racial injustice",
    totalCopies: 5,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Fiction",
    description: "Story of teenage angst",
    totalCopies: 4,
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    category: "Fiction",
    description: "Epic tale of a sea voyage",
    totalCopies: 3,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    description: "Romantic novel of manners",
    totalCopies: 5,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fiction",
    description: "Fantasy adventure story",
    totalCopies: 6,
  },

  // --- History (5) ---
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    description: "A brief history of humankind",
    totalCopies: 5,
  },
  {
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    category: "History",
    description: "Factors shaping human history",
    totalCopies: 4,
  },
  {
    title: "The Silk Roads",
    author: "Peter Frankopan",
    category: "History",
    description: "A new history of the world",
    totalCopies: 3,
  },
  {
    title: "A People's History of the United States",
    author: "Howard Zinn",
    category: "History",
    description: "History from the perspective of ordinary people",
    totalCopies: 5,
  },
  {
    title: "The Wright Brothers",
    author: "David McCullough",
    category: "History",
    description: "Biography of the Wright brothers",
    totalCopies: 3,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log("✅ Books seeded");
  process.exit();
}

seed();
