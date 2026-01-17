// API Route for AI energy analysis
import { NextRequest, NextResponse } from 'next/server';
import { analyzeEnergyPatternsWithAI } from '@/lib/deepseek-ai-engine';
import type { EnergyDataPoint } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json() as { data: EnergyDataPoint[] };

    if (!data || !Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
    }

    const analysis = await analyzeEnergyPatternsWithAI(data);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analysis failed' },
      { status: 500 }
    );
  }
}

