import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// Set Default Model Gemini
export const GEMINI_MODEL = "gemini-2.5-flash";