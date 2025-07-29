import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { GenerativeController } from "../controllers/GenerativeController.js";

const router = express.Router();

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    console.log("Received file:", file);

    if (!file.originalname) {
      return cb(new Error("Missing originalname in uploaded file"), "");
    }

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname ?? "new File");
    const filename = file.fieldname + "-" + uniqueSuffix + ext;

    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post("/generate-text", GenerativeController.generateText);
router.post(
  "/generate-from-image",
  upload.single("image"),
  GenerativeController.generateFromImage
);
router.post(
  "/generate-from-file",
  upload.single("file"),
  GenerativeController.generateFromDocs
);
router.post(
  "/generate-from-audio",
  upload.single("audio"),
  GenerativeController.generateFromAudio
);
router.post("/chat", GenerativeController.generateChat);

export default router;
