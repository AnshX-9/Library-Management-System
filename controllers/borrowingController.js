const Book = require('../models/Book');
const BorrowingRecord = require('../models/BorrowingRecord');
const User = require('../models/User');

const borrowBook = async (req, res) => {
  try {
    // console.log(req.user);
    const userId = req.user.id;

    const { _id } = req.params;

    if (!_id) {
      return res.status(404).json({
        msg: "Please enter a valid book ID"
      });
    }

    const book = await Book.findById(_id);

    if (!book) {
      return res.status(400).json({
        msg: "Book not found"
      });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        msg: "No available copies of the book"
      });
    }

    book.availableCopies--;
    await book.save();

    const newRecord = await BorrowingRecord.create({
      book: _id,
      user: userId,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
    });

    await newRecord.save();

    return res.status(200).json({
      msg: "Book borrowed successfully",
      book,
      borrowingRecord: newRecord
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Server error",
      error: error.message
    });
  }
};

const returnBook = async (req, res) => {
  try {

    const userId = req.user.id;

    const { borrowingRecordId } = req.params;

    if (!borrowingRecordId) {
      return res.status(400).json({
        msg: "Please provide a valid book id"
      })
    }

    const borrowedBook = await BorrowingRecord.findByIdAndUpdate(borrowingRecordId, {
      returnedAt: new Date(Date.now()),

    });
    const book = await Book.findById(borrowedBook.book);

    book.availableCopies++;
    await book.save();

    res.status(200).json({
      msg: "Book returned Succcessfully",
      borrowedBook
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Server error",
      error: error.message
    });
  }
}


const borrowingHitory = async (req, res) => {
  const user = req.user.id;
  if (!user) {
    res.status(404).json({
      msg: " Please come with a valid user id "
    })
  }
  const bookBorrowed = await BorrowingRecord.find({ user });
  if (!bookBorrowed) {
    res.status(400).json({
      msg: "Not record found "
    })
  }
  res.json({
    bookBorrowed
  })
}


const adminViewHistoryRecord = async (req, res) => {
  const userId = req.user.id;

  const { userQuery, bookQuery } = req.query;

  try {
    if (userQuery || bookQuery) {
      const filtered = await BorrowingRecord.find({
        ...(userQuery && { user: userQuery }),
        ...(bookQuery && { book: bookQuery })
      });

      return res.status(200).json({
        filtered
      });
    } else {


      const allRecords = await BorrowingRecord.find();
      return res.status(200).json({
        allRecords
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Server error.",
      error: error.message
    });
  }
};

module.exports = { borrowBook, returnBook, borrowingHitory, adminViewHistoryRecord };