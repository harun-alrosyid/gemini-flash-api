import "dotenv/config"
import { GoogleGenAI } from "@google/genai"
import express from "express"
import multer from "multer"


const app= express()
const upload = multer()
const ai= await GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY})

// Set Default Model Gemini
const GEMINI_MODEL= "gemini-2.5-flash"

app.use(express.json())

const PORT= process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})