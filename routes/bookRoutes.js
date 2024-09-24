const express = require('express');
const bookRouter = express.Router();
const { addBook, updateBook, deleteBook, getAllBooks } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware');

bookRouter.post('/book', authMiddleware, adminMiddleware, addBook);
bookRouter.put('/book/:_id', authMiddleware, adminMiddleware, updateBook);
bookRouter.delete('/book/:_id', authMiddleware, adminMiddleware, deleteBook);
bookRouter.get('/book', authMiddleware, getAllBooks);
module.exports = bookRouter;