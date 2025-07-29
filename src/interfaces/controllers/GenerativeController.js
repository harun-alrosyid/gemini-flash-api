import { GeminiService } from "../../services/GeminiServices.js";
import { defaultPrompt, extractText } from "../../shared/extractText.js";

export const GenerativeController = {
  async generateText(req, res) {
    try {
      const { prompt } = req.body;

      const resp = await GeminiService.generateText(prompt);
      res.json({
        statusCode: 200,
        status: "success",
        result: extractText(resp),
      });
    } catch (err) {
      res
        .status(500)
        .json({ statusCode: 500, status: "error", error: err.message });
    }
  },

  async generateFromDocs(req, res) {
    try {
      const { prompt } = req.body;

      const docBase64 = req.file.buffer?.toString("base64");

      const resp = await GeminiService.generateWithFile(
        prompt ?? defaultPrompt("file"),
        req.file.mimetype,
        docBase64
      );

      res.json({
        statusCode: 200,
        status: "success",
        result: extractText(resp),
      });
    } catch (err) {
      res
        .status(500)
        .json({ statusCode: 500, status: "error", error: err.message });
    }
  },

  async generateFromImage(req, res) {
    try {
      const { prompt } = req.body;

      const imageBase64 = req.file.buffer?.toString("base64");

      const resp = await GeminiService.generateWithFile(
        prompt || defaultPrompt("image"),
        req.file.mimetype,
        imageBase64
      );

      res.json({
        statusCode: 200,
        status: "success",
        result: extractText(resp),
      });
    } catch (err) {
      res
        .status(500)
        .json({ statusCode: 500, status: "error", error: err.message });
    }
  },
  async generateFromAudio(req, res) {
    try {
      const { prompt } = req.body;

      const audioBase64 = req.file.buffer?.toString("base64");

      const resp = await GeminiService.generateWithFile(
        prompt || defaultPrompt("audio"),
        req.file.mimetype,
        audioBase64
      );

      res.json({
        statusCode: 200,
        status: "success",
        result: extractText(resp),
      });
    } catch (err) {
      res
        .status(500)
        .json({ statusCode: 500, status: "error", error: err.message });
    }
  },

  async generateChat(req, res) {
    try {
      const { message } = req.body;

      if (!Array.isArray(message)) {
        throw new Error("Message must be an array");
      }

      const resp = await GeminiService.generateChat(message);

      res.json({
        statusCode: 200,
        status: "success",
        result: extractText(resp),
      });
    } catch (err) {
      res
        .status(500)
        .json({ statusCode: 500, status: "error", error: err.message });
    }
  },
};
