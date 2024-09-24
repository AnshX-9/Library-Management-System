const Book = require('../models/Book');


const addBook = async (req, res) => {
  try {
    const { title, author, genre, totalCopies, availableCopies } = req.body;
    if (!title || !author || !genre || !totalCopies || !availableCopies) {
      return res.status(400).json({
        msg: "Please provide me a full book data"
      });
    }
    const book = await Book.create({
      title,
      author,
      genre,
      totalCopies,
      availableCopies
    });

    res.status(200).json({
      msg: "Book created successfully",
      book
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error while creating the book",
      error: error.message
    });
  }
};


const updateBook = async (req, res) => {
  const { _id } = req.params;
  const { title, author, genre, totalCopies, availableCopies } = req.body
  if (!title || !author || !genre || !totalCopies || !availableCopies) {
    res.status(400).json({
      msg: "Please provide me a full book data"
    })
  }
  try {
    const newUpdateBook = await Book.findByIdAndUpdate(_id, {
      title,
      author,
      genre,
      totalCopies,
      availableCopies
    }, { new: true });

    res.status(200).json({
      msg: "Book updated successfully",
      newUpdateBook
    })
  } catch (e) {
    res.status(404).json({
      msg: "Error while updated the book"
    })
  }
}

const deleteBook = async (req, res) => {
  try {
    const { _id } = req.params;
    const dUser = await Book.findByIdAndDelete({ _id });
    if (dUser) {
      res.status(200).json({
        msg: "Book Deleted Successfully "
      })
    }

  } catch (e) {
    res.status(404).json({
      msg: "Error while Deleting the book"
    })
  }
}

const getAllBooks = async (req, res) => {
  try {
    const { genre, title } = req.query;

    if (genre || title) {
      const filteredBook = await Book.find({
        ...(genre && { genre }),
        ...(title && { title })
      });
      res.status(200).json({
        filteredBook
      })
    }
    const allBooks = await Book.find();
    res.status(200).json({
      allBooks
    })

  } catch (e) {
    res.status(404).json({
      msg: "Failed to get the all books"
    })
  }
}



module.exports = { addBook, updateBook, deleteBook, getAllBooks };

