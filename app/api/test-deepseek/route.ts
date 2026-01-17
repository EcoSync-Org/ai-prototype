// Test endpoint to verify DeepSeek API key
import { NextRequest, NextResponse } from 'next/server';
import { deepseek, MODELS, isDeepSeekConfigured } from '@/lib/deepseek-client';

export async function GET(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!isDeepSeekConfigured()) {
      return NextResponse.json(
        { 
          error: 'API key not configured',
          configured: false,
          apiKeyPrefix: 'Not set'
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.DEEPSEEK_API_KEY || '';
    const apiKeyPrefix = apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 4);

    // Try a simple text completion to test the API key
    try {
      const response = await deepseek.chat.completions.create({
        model: MODELS.CHAT,
        messages: [
          {
            role: 'user',
            content: 'Say "API key is working" if you can read this.',
          },
        ],
        max_tokens: 20,
      });

      return NextResponse.json({
        success: true,
        message: 'DeepSeek API key is valid!',
        response: response.choices[0]?.message?.content,
        configured: true,
        apiKeyPrefix,
        baseURL: process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1',
        model: MODELS.CHAT,
      });
    } catch (apiError: any) {
      return NextResponse.json({
        success: false,
        error: 'API key authentication failed',
        details: apiError?.message || 'Unknown error',
        status: apiError?.status,
        code: apiError?.code,
        configured: true,
        apiKeyPrefix,
        baseURL: process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1',
        suggestion: 'Please verify your API key at https://platform.deepseek.com',
      }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Test failed',
        message: error?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}


