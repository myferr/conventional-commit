import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiModel {
  constructor(apiKey, model = "gemini-1.5-flash") {
    this.apiKey = apiKey;
    this.model = model;
  }

  async response(prompt) {
    if (typeof this.apiKey !== "string" || this.apiKey.trim() === "") {
      throw new Error("No valid API key provided.");
    }
    const genAI = new GoogleGenerativeAI(this.apiKey);
    const model = genAI.getGenerativeModel({ model: this.model });

    const result = await model.generateContent(prompt);
    return result.response.text();
  }
}

export { GeminiModel };
