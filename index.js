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

const extractText= (resp) => {
    try {
        const text=
            resp?.response?.candidates?.[0]?.contenst?.part?.[0]?.text ?? 
            resp?.candidates?.[0]?.contenst?.part?.[0]?.text ??
            resp?.response?.candidates?.[0]?.contenst?.text

        return text ?? JSON.stringify(resp, null, 2)

    } catch (error) {
        console.error("Error Extract file",error)

        return  JSON.stringify(resp, null, 2)
    }
}