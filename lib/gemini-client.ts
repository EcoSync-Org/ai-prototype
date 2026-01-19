// Google Gemini AI Client Configuration (FREE TIER)
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client
export const gemini = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// Check if Gemini API key is configured
export function isGeminiConfigured(): boolean {
  return !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here';
}

// Vision model configuration (Gemini Pro Vision supports images)
export const VISION_MODEL = 'gemini-1.5-flash'; // Free tier model with vision support


