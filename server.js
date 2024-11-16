const express = require("express");
const app = express();
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const bookController = require("./app/books/controller/books");
const userController = require("./app/user/controller/user");
const readingHistoryController = require("./app/reading-history/controller/reading-history");
const recommendationController = require("./app/recommondation/controller/recommondation");
const cors = require("cors");
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/books", bookController.getAllBooks);
app.post("/books", bookController.addBooks);
app.get("/genre", bookController.getAllGenre);
app.get("/authors", bookController.getAllAuthors);
app.post("/user", userController.addUser);
app.post("/reading-history", readingHistoryController.addReadingHistory);
app.post("/recommendation/:userId", recommendationController.getRecommendation);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT || 3000);
    console.log(`Server started at port ${PORT}`);
  })
  .catch((err) => console.log(err));
