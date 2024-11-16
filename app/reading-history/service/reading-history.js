const { default: mongoose } = require("mongoose");
const ReadingHistory = require("../../../models/reading-history");
class ReadingHistoryService {
  addReadingHistory = async (history) => {
    try {
      const { user, book } = history;
      const historyExists = await ReadingHistory.findOne({ user, book });

      if (historyExists) return;

      return await ReadingHistory.create(history);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getReadingHistory = async (userId) => {
    try {
      return await ReadingHistory.find({ user: userId }).populate("book");
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = ReadingHistoryService;
