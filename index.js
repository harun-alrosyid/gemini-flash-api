import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import express from "express";
import multer from "multer";

const app = express();
const upload = multer();
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// Set Default Model Gemini
const GEMINI_MODEL = "gemini-2.5-flash";

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const extractText = (resp) => {
  try {
    const text =
      resp?.response?.candidates?.[0]?.contet?.parts?.[0]?.text ??
      resp?.candidates?.[0]?.content?.parts?.[0]?.text ??
      resp?.response?.candidates?.[0]?.content?.text;

    return text ?? JSON.stringify(resp, null, 2);
  } catch (error) {
    console.error("Error Extract file", error);

    return JSON.stringify(resp, null, 2);
  }
};

app.post("/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;

    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    res.json({
      statusCode: 200,
      status: "success",
      result: extractText(resp),
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      error: error.message,
    });
  }
});

app.post("/generate-from-image", upload.single("image"), async (req, res) => {
  try {
    const { prompt } = req.body;

    const imageBase64 = req.file.buffer.toString("base64");

    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: prompt },
        {
          inlineData: {
            mimeType: req.file.mimetype,
            data: imageBase64,
          },
        },
      ],
    });

    res.json({
      statusCode: 200,
      status: "success",
      result: extractText(resp),
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      error: error.message,
    });
  }
});

app.post("/generate-from-file", upload.single("file"), async (req, res) => {
  try {
    const { prompt } = req.body;

    const docsBase64 = req.file.buffer.toString("base64");

    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: prompt ?? "Create a summary of this document" },
        {
          inlineData: {
            mimeType: req.file.mimetype,
            data: docsBase64,
          },
        },
      ],
    });

    res.json({
      statusCode: 200,
      status: "success",
      result: extractText(resp),
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      error: error.message,
    });
  }
});

app.post("/generate-from-audio", upload.single("audio"), async (req, res) => {
  try {
    const { prompt } = req.body;

    const audioBase64 = req.file.buffer.toString("base64");

    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: prompt ?? "Transcrpt this audio file" },
        {
          inlineData: {
            mimeType: req.file.mimetype,
            data: audioBase64,
          },
        },
      ],
    });

    res.json({
      statusCode: 200,
      status: "success",
      result: extractText(resp),
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      error: error.message,
    });
  }
});