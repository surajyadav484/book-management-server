const ReadingHistoryService = require("../../reading-history/service/reading-history");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const BookService = require("../../books/services/books");

// const API_KEY = process.env.OPEN_AI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

class RecommendationService {
  constructor() {
    this.readingHistoryService = new ReadingHistoryService();
    this.bookService = new BookService();
  }

  async getRecommendation({ userQuery, userId }) {
    try {
      const userPreferences =
        await this.readingHistoryService.getReadingHistory(userId);
      console.log(
        "🚀 ~ RecommendationService ~ getRecommendation ~ userPreferences:",
        userPreferences
      );

      const books = await this.bookService.getAllBooks();

      const userBooks = userPreferences?.map((history) => ({
        title: history.book.title,
        author: history.book.author,
        genre: history.book.genre,
        rating: history.book.rating,
        description: history.book.description,
        published_date: history.book.published_date,
      }));

      const prompt = `
                        User query:"${userQuery}"
                        Preferences: ${JSON.stringify(userBooks)}
                        Here are some books available in the library:
                        ${JSON.stringify(books)}
                        Provide book recommendations based on the user’s query and preferences. suggest the books which are available in library only. Provide the books in json format explaining why they are similar to user query. Exclude the books which user has already read.
                        `;

      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      const cleanedString = text.replace(/```json|```/g, "");
      return JSON.parse(cleanedString);

      // const recommendation = await axios.post(
      //     "https://api.openai.com/v1/chat/completions",
      //     {
      //       model: "gpt-3.5-turbo", // or gpt-3.5-turbo if you prefer
      //       messages: [{ role: "user", content: prompt }],
      //       max_tokens: 500,
      //     },
      //     {
      //       headers: {
      //         Authorization: `Bearer ${API_KEY}`,
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
    } catch (error) {
      console.log(
        "🚀 ~ RecommendationService ~ getRecommendation ~ error:",
        error
      );

      throw new Error(error.message);
    }
  }
}

module.exports = RecommendationService;
