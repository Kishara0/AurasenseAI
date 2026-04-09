import dotenv from 'dotenv';

dotenv.config();

export const config = {
  geminiApiKey: process.env.GEMINI_API_KEY,
  port: process.env.PORT || 3000,
};

if (!config.geminiApiKey) {
  throw new Error("Missing GEMINI_API_KEY in environment variables. Please check your .env file.");
}
