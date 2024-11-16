const Book = require("../../../models/book");
const { getPageNumberAndSize } = require("../../../utils/common");

class BookService {
  constructor() {
    this.books = ["The Lean Startup", "The Pragmatic Programmer"];
  }

  async addBook(book) {
    try {
      // return await Book.insertMany(books);
      return await Book.create(book);
    } catch (error) {
      console.error("BookService ~ addBook ~ error:", error);

      throw error;
    }
  }

  buildFilterAndSortQuery(inputFilter, inputSort) {
    const { title, authors, genre, ratings } = inputFilter;
    const { sort } = inputSort;

    const filterQuery = {};
    const sortQuery = {};

    if (title) {
      filterQuery.title = { $regex: `^${title}`, $options: "i" };
    }

    if (authors?.length) {
      filterQuery.author = { $in: authors };
    }

    if (genre?.length) {
      filterQuery.genre = { $in: genre };
    }

    if (ratings?.length) {
      filterQuery.rating = { $in: ratings };
    }

    const sortOptions = {
      publishedDateAsc: { published_date: 1 },
      publishedDateDesc: { published_date: -1 },
      ratingAsc: { rating: 1 },
      ratingDesc: { rating: -1 },
    };

    if (sortOptions[sort]) {
      Object.assign(sortQuery, sortOptions[sort]);
    }

    return { filterQuery, sortQuery };
  }

  async getAllBooks(query) {
    try {
      const {
        pageNumber = 1,
        pageSize = 20,
        title = "",
        authors = [],
        genre = [],
        ratings = [],
        sort = "",
      } = query || {};

      const inputFilter = { title, authors, genre, ratings };
      const inputSort = { sort };

      const { filterQuery, sortQuery } = this.buildFilterAndSortQuery(
        inputFilter,
        inputSort
      );

      const { skipCount, size } = getPageNumberAndSize(pageNumber, pageSize);

      return await Book.find(filterQuery)
        .skip(skipCount)
        .limit(size)
        .sort(sortQuery);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllGenre() {
    try {
      return await Book.distinct("genre");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllAuthors() {
    try {
      return await Book.distinct("author");
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = BookService;
