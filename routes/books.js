import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const books = await Book.find().populate("owner", "name email");
  res.json(books);
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    const books = await Book.find({ owner: user._id }).select("title author");
    res.json({ ...user, books });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

export default router;
