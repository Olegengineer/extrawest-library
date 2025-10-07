import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Book from "./models/Book.js";

dotenv.config();

const users = [
  { name: "Oleg", email: "oleg@example.com" },
  { name: "Anna", email: "anna@example.com" },
  { name: "Orest", email: "orest@example.com" },
];

const books = [
  { title: "Book 1", author: "Author 1" },
  { title: "Book 2", author: "Author 2" },
  { title: "I Don't Know JS", author: "Oleg Oleksin" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await User.deleteMany();
    await Book.deleteMany();

    const createdUsers = await User.insertMany(users);
    console.log(
      "Users created:",
      createdUsers.map((u) => u.name)
    );

    const booksWithOwner = books.map((book) => ({
      ...book,
      owner: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id,
    }));

    const createdBooks = await Book.insertMany(booksWithOwner);
    console.log(
      "Books created:",
      createdBooks.map((b) => b.title)
    );

    mongoose.disconnect();
    console.log("Seed finished");
  } catch (err) {
    console.error(err);
  }
}

seed();
