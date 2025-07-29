# Gemini-flash-api
a simple implementation Gemini AI use express.js

## Setup Env
| Variable       | Value          |
|----------------|----------------|
| GEMINI_API_KEY | {your_api_key} |
| PORT           | 3000           |

## Instalation
Clone This repository
And run `npm install`

If you want build from zero run this command
`npm install express dotenv @google/genai multer`

## API Services

| Path                      | Format Body    | Body parameter              |
|---------------------------|----------------|-----------------------------
| /api/generate-text        | raw            | {prompt : string}            |
| /api/generate-from-image  | format data    | prompt= string, image= image |
| /api/generate-from-file   | format data    | prompt= string, file= file   |
| /api/generate-from-audio  | format data    | prompt= string, audio= audio |

## Example

![example](https://github.com/harun-alrosyid/gemini-flash-api/blob/master/example.jpg?raw=true)

