// API Route for image analysis
import { NextRequest, NextResponse } from 'next/server';
import { analyzeMeterImage, analyzeSolarPanelImage } from '@/lib/deepseek-ai-engine';

export async function POST(request: NextRequest) {
  try {
    const { image, type } = await request.json() as { 
      image: string; 
      type: 'meter' | 'solar' 
    };

    if (!image || !type) {
      return NextResponse.json(
        { error: 'Missing image or type' },
        { status: 400 }
      );
    }

    // Remove data URL prefix if present
    const base64Image = image.replace(/^data:image\/\w+;base64,/, '');

    let result;
    if (type === 'meter') {
      result = await analyzeMeterImage(base64Image);
    } else {
      result = await analyzeSolarPanelImage(base64Image);
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Image analysis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analysis failed' },
      { status: 500 }
    );
  }
}

