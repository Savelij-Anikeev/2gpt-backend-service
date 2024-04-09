import { GoogleGenerativeAI } from "@google/generative-ai";

class GoogleAIService {
    private genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

    async start(msg: string, modelName: string = "gemini-pro") {
        // For text-only input, use the gemini-pro model
        const model = this.genAI.getGenerativeModel({ model: modelName});
        const result = await model.generateContent(msg);
        const response = await result.response;

        return response.text();
    }
}

export default new GoogleAIService();