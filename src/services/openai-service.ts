import OpenAI from "openai";

class OpenAIService {
    openAIApi = new OpenAI({apiKey: process.env.OPENAI_API_KEY as string});

    async startStream(msg: string) {
        const arr = [];
        const stream = await this.openAIApi.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: msg}],
            stream: true
        });
        for await (const chunk of stream) {
            arr.push(chunk.choices[0]?.delta?.content || '');
        }
        return arr[-1];
    }
}

export default new OpenAIService();