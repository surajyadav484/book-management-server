const ReadingHistoryService = require("../service/reading-history");
class ReadingHistoryController {
  constructor() {
    this.readingHistory = new ReadingHistoryService();
  }

  addReadingHistory = async (req, res) => {
    try {
      const history = req.body;
      await this.readingHistory.addReadingHistory(history);
      res.status(201).json({ message: "ReadingHistory added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = new ReadingHistoryController();
