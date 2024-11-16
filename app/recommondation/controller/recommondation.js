const RecommendationService = require("../service/recommondation");

class RecommendationController {
  constructor() {
    this.recommendationService = new RecommendationService();
  }

  getRecommendation = async (req, res) => {
    try {
      const { userId } = req.params;
      const { userQuery } = req.body;

      const recommendation = await this.recommendationService.getRecommendation(
        { userId, userQuery }
      );
      res.status(200).json(recommendation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new RecommendationController();
