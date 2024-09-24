const mongoose = require('mongoose');

const BookModel = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  totalCopies: { type: Number, required: true },
  availableCopies: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, },
})


const Book = mongoose.model('Book', BookModel);

module.exports = Book;