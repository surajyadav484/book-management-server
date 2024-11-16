const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, trim: true },
    author: { type: String, trim: true },
    genre: { type: String, trim: true },
    cover_image_url: { type: String, trim: true },
    published_url: { type: String, trim: true },
    rating: { type: String, trim: true },
    published_date: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
