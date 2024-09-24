const express = require('express');
const borrowRouter = express.Router();
const { borrowBook, returnBook, borrowingHitory, adminViewHistoryRecord } = require('../controllers/borrowingController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
borrowRouter.post('/borrow/:_id', authMiddleware, borrowBook);
borrowRouter.post('/borrow/:borrowingRecordId/return', authMiddleware, returnBook);
borrowRouter.get('/borrow/history', authMiddleware, borrowingHitory);
borrowRouter.get('/borrow/admin/records', authMiddleware, adminMiddleware, adminViewHistoryRecord);
module.exports = borrowRouter;
