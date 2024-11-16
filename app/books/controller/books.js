const BookService = require("../services/books");

class BookController {
  constructor() {
    this.bookService = new BookService();
  }

  addBooks = async (req, res) => {
    try {
      const book = req.body;
      const newBooks = await this.bookService.addBook(book);
      res.status(201).json(newBooks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getAllBooks = async (req, res) => {
    try {
      const query = req.query;
      const books = await this.bookService.getAllBooks(query);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getAllGenre = async (req, res) => {
    try {
      const books = await this.bookService.getAllGenre();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getAllAuthors = async (req, res) => {
    try {
      const books = await this.bookService.getAllAuthors();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = new BookController();
