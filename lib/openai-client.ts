// OpenAI Client Configuration for Vision API
import OpenAI from 'openai';

// Initialize OpenAI client for vision capabilities
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  // OpenAI uses default baseURL, no need to specify
});

// Check if OpenAI API key is configured
export function isOpenAIConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here';
}

// Vision model configuration
export const VISION_MODEL = 'gpt-4o'; // Use latest vision-capable model (gpt-4o supports vision)

