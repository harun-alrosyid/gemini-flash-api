import { ai, GEMINI_MODEL } from "../config/geminiClient.js";

export const GeminiService = {
  async generateText(prompt) {
    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    return resp;
  },

 async generateWithFile(prompt, mimeType, base64 ) {
    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ text: prompt }, { inlineData: { mimeType: mimeType, data: base64 } }],
    });
    return resp;
  },

};
