// Real AI Engine powered by DeepSeek
import { deepseek, MODELS, isDeepSeekConfigured } from './deepseek-client';
import type {
  EnergyDataPoint,
  AIRecommendation,
  PrepaidStatus,
  SavingsProjection,
  AIAnalysis,
} from './types';

/**
 * Analyze energy patterns using DeepSeek AI
 */
export async function analyzeEnergyPatternsWithAI(
  data: EnergyDataPoint[]
): Promise<AIAnalysis> {
  if (!isDeepSeekConfigured()) {
    throw new Error('DeepSeek API key not configured');
  }

  const prompt = `You are an expert energy analyst. Analyze this household energy data and provide insights.

Energy Data (last 24 hours):
${JSON.stringify(data.filter(d => !d.predicted).slice(-24), null, 2)}

Provide analysis in this exact JSON format:
{
  "peakUsageHours": ["HH:MM", "HH:MM"],
  "solarWindows": ["HH:MM", "HH:MM"],
  "consumptionRate": number,
  "trends": ["trend1", "trend2", "trend3"],
  "insights": [
    {
      "category": "string",
      "finding": "string",
      "impact": "string"
    }
  ]
}

Focus on:
1. Peak usage hours (when consumption is highest)
2. Optimal solar windows (high solar, low usage)
3. Average consumption rate
4. Usage trends and patterns
5. Key insights about energy waste or optimization opportunities`;

  try {
    const response = await deepseek.chat.completions.create({
      model: MODELS.CHAT,
      messages: [
        {
          role: 'system',
          content: 'You are an expert energy analyst specializing in solar power optimization and household energy management. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from DeepSeek AI');
    }

    const analysis: AIAnalysis = JSON.parse(content);
    return analysis;
  } catch (error) {
    console.error('DeepSeek AI Error:', error);
    throw new Error('Failed to analyze energy patterns with AI');
  }
}

/**
 * Generate AI-powered recommendations using DeepSeek
 */
export async function generateRecommendationsWithAI(
  analysis: AIAnalysis,
  prepaidBalance: number,
  currentUsage: number
): Promise<AIRecommendation[]> {
  if (!isDeepSeekConfigured()) {
    throw new Error('DeepSeek API key not configured');
  }

  const prompt = `You are an AI energy advisor. Generate personalized recommendations based on this analysis.

Analysis:
- Peak Usage Hours: ${analysis.peakUsageHours.join(', ')}
- Solar Windows: ${analysis.solarWindows.join(', ')}
- Consumption Rate: ${analysis.consumptionRate} kWh/h
- Current Usage: ${currentUsage} kWh/h
- Prepaid Balance: ${prepaidBalance} RWF

Provide 3-4 recommendations in this exact JSON format:
{
  "recommendations": [
    {
      "id": "unique-id",
      "title": "Clear action title",
      "description": "Detailed description with specific times and actions",
      "confidence": 85,
      "reasoning": ["reason1", "reason2", "reason3", "reason4"],
      "priority": "high|medium|low",
      "actionTime": "HH:MM (optional)"
    }
  ]
}

Prioritize:
1. Solar optimization opportunities
2. Prepaid balance warnings (if balance is low)
3. Cost-saving actions
4. Sustainability improvements`;

  try {
    const response = await deepseek.chat.completions.create({
      model: MODELS.CHAT,
      messages: [
        {
          role: 'system',
          content: 'You are an expert AI energy advisor providing actionable recommendations for household energy optimization. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from DeepSeek AI');
    }

    const result = JSON.parse(content);
    return result.recommendations || [];
  } catch (error) {
    console.error('DeepSeek AI Error:', error);
    throw new Error('Failed to generate recommendations with AI');
  }
}

/**
 * Analyze meter image using DeepSeek Vision
 */
export async function analyzeMeterImage(imageBase64: string): Promise<{
  reading: number;
  unit: string;
  confidence: number;
  analysis: string;
}> {
  if (!isDeepSeekConfigured()) {
    throw new Error('DeepSeek API key not configured');
  }

  try {
    const response = await deepseek.chat.completions.create({
      model: MODELS.VISION,
      messages: [
        {
          role: 'system',
          content: 'You are an expert at reading energy meters and solar panel displays. Extract numerical readings accurately.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this energy meter or solar display image. Extract the reading, unit, and provide analysis. Respond in JSON format: {"reading": number, "unit": "kWh|kW|RWF", "confidence": 0-100, "analysis": "detailed description"}',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from DeepSeek Vision');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('DeepSeek Vision Error:', error);
    throw new Error('Failed to analyze meter image');
  }
}

/**
 * Analyze solar panel image for efficiency/issues
 */
export async function analyzeSolarPanelImage(imageBase64: string): Promise<{
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  issues: string[];
  recommendations: string[];
  estimatedEfficiency: number;
}> {
  if (!isDeepSeekConfigured()) {
    throw new Error('DeepSeek API key not configured');
  }

  try {
    const response = await deepseek.chat.completions.create({
      model: MODELS.VISION,
      messages: [
        {
          role: 'system',
          content: 'You are a solar panel inspection expert. Analyze panel condition, identify issues, and provide recommendations.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this solar panel image. Check for dirt, damage, shading, or other issues. Respond in JSON: {"condition": "excellent|good|fair|poor", "issues": ["issue1", "issue2"], "recommendations": ["rec1", "rec2"], "estimatedEfficiency": 0-100}',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      temperature: 0.5,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from DeepSeek Vision');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('DeepSeek Vision Error:', error);
    throw new Error('Failed to analyze solar panel image');
  }
}

/**
 * Get AI explanation for a specific energy pattern or anomaly
 */
export async function explainEnergyAnomaly(
  data: EnergyDataPoint[],
  anomalyDescription: string
): Promise<string> {
  if (!isDeepSeekConfigured()) {
    throw new Error('DeepSeek API key not configured');
  }

  const prompt = `Explain this energy usage anomaly to a household user in simple terms.

Recent Energy Data:
${JSON.stringify(data.slice(-12), null, 2)}

Anomaly: ${anomalyDescription}

Provide a clear, concise explanation (2-3 sentences) of:
1. What likely caused this
2. Whether it's concerning
3. What action (if any) to take`;

  try {
    const response = await deepseek.chat.completions.create({
      model: MODELS.CHAT,
      messages: [
        {
          role: 'system',
          content: 'You are a friendly energy advisor explaining technical concepts in simple, accessible language.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return response.choices[0]?.message?.content || 'Unable to explain anomaly';
  } catch (error) {
    console.error('DeepSeek AI Error:', error);
    throw new Error('Failed to explain anomaly');
  }
}

/**
 * Predict future energy usage using AI
 */
export async function predictFutureUsage(
  historicalData: EnergyDataPoint[],
  hoursAhead: number = 6
): Promise<EnergyDataPoint[]> {
  if (!isDeepSeekConfigured()) {
    throw new Error('DeepSeek API key not configured');
  }

  const prompt = `You are a time series forecasting expert. Predict future energy usage.

Historical Data (last 24 hours):
${JSON.stringify(historicalData.slice(-24), null, 2)}

Predict the next ${hoursAhead} hours of energy usage and solar generation.

Respond in JSON format:
{
  "predictions": [
    {"time": "HH:MM", "usage": number, "solar": number, "predicted": true}
  ]
}

Consider:
- Time of day patterns
- Solar generation curves (peaks at noon, zero at night)
- Typical household behavior
- Weather patterns (assume clear for solar)`;

  try {
    const response = await deepseek.chat.completions.create({
      model: MODELS.CHAT,
      messages: [
        {
          role: 'system',
          content: 'You are an expert in energy forecasting and time series prediction. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.6,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from DeepSeek AI');
    }

    const result = JSON.parse(content);
    return result.predictions || [];
  } catch (error) {
    console.error('DeepSeek AI Error:', error);
    throw new Error('Failed to predict future usage');
  }
}

