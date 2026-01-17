// API Route for AI recommendations
import { NextRequest, NextResponse } from 'next/server';
import { generateRecommendationsWithAI } from '@/lib/deepseek-ai-engine';
import type { AIAnalysis } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { analysis, prepaidBalance, currentUsage } = await request.json() as {
      analysis: AIAnalysis;
      prepaidBalance: number;
      currentUsage: number;
    };

    if (!analysis) {
      return NextResponse.json(
        { error: 'Missing analysis data' },
        { status: 400 }
      );
    }

    const recommendations = await generateRecommendationsWithAI(
      analysis,
      prepaidBalance,
      currentUsage
    );

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error('Recommendations error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}

