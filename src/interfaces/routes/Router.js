import express from "express";
import multer from "multer";
import { GenerativeController } from "../controllers/GenerativeController.js";

const router = express.Router();

const upload = multer();

router.post("/generate-text", GenerativeController.generateText )
router.post("/generate-from-image", upload.single("image"), GenerativeController.generateFromImage)
router.post("/generate-from-file", upload.single("file"), GenerativeController.generateFromDocs)
router.post("/generate-from-audio", upload.single("audio"), GenerativeController.generateFromAudio)


export default router;