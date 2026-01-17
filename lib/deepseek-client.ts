// DeepSeek AI Client Configuration
import OpenAI from 'openai';

// Initialize DeepSeek client using OpenAI SDK
// DeepSeek API is compatible with OpenAI's interface
export const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || '',
  baseURL: process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1',
  dangerouslyAllowBrowser: true, // For client-side usage (use API routes in production)
});

// Model configurations
export const MODELS = {
  CHAT: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
  VISION: process.env.DEEPSEEK_VISION_MODEL || 'deepseek-vl',
};

// Check if API key is configured
export function isDeepSeekConfigured(): boolean {
  return !!process.env.DEEPSEEK_API_KEY && process.env.DEEPSEEK_API_KEY !== 'your_deepseek_api_key_here';
}


