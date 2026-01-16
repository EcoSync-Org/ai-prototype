// Simulated AI Engine for EcoSync MVP
// This simulates intelligent decision-making without external APIs

import type {
  EnergyDataPoint,
  AIRecommendation,
  PrepaidStatus,
  SavingsProjection,
  AIAnalysis,
  AIInsight
} from './types';

/**
 * Generate realistic energy usage data with patterns
 */
export function generateEnergyData(hours: number = 24): EnergyDataPoint[] {
  const data: EnergyDataPoint[] = [];
  const now = new Date();
  
  for (let i = -hours; i < 6; i++) {
    const time = new Date(now);
    time.setHours(now.getHours() + i);
    const hour = time.getHours();
    
    // Simulate realistic usage patterns
    let usage = 2 + Math.random() * 1.5; // Base load
    
    // Morning peak (6-9 AM)
    if (hour >= 6 && hour <= 9) {
      usage += 3 + Math.random() * 2;
    }
    // Evening peak (6-10 PM)
    else if (hour >= 18 && hour <= 22) {
      usage += 4 + Math.random() * 3;
    }
    // Midday
    else if (hour >= 10 && hour <= 17) {
      usage += 1 + Math.random() * 1.5;
    }
    
    // Solar generation (6 AM - 6 PM with peak at noon)
    let solar = 0;
    if (hour >= 6 && hour <= 18) {
      const solarHour = hour - 6;
      const peakHour = 6; // Noon
      const distanceFromPeak = Math.abs(solarHour - peakHour);
      solar = Math.max(0, (6 - distanceFromPeak) * 1.2 + Math.random() * 0.8);
    }
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      usage: parseFloat(usage.toFixed(2)),
      solar: parseFloat(solar.toFixed(2)),
      predicted: i >= 0
    });
  }
  
  return data;
}

/**
 * AI Analysis: Detect patterns and insights
 */
export function analyzeEnergyPatterns(data: EnergyDataPoint[]): AIAnalysis {
  const peakUsageHours: string[] = [];
  const solarWindows: string[] = [];
  const insights: AIInsight[] = [];
  
  // Find peak usage hours
  const avgUsage = data.reduce((sum, d) => sum + d.usage, 0) / data.length;
  data.forEach((point, idx) => {
    if (point.usage > avgUsage * 1.3 && !point.predicted) {
      peakUsageHours.push(point.time);
    }
    
    // Find optimal solar windows (high solar, low usage)
    if (point.solar > 3 && point.usage < avgUsage && !point.predicted) {
      solarWindows.push(point.time);
    }
  });
  
  // Generate insights
  const wastedSolar = data.reduce((sum, d) => {
    if (!d.predicted && d.solar > d.usage) {
      return sum + (d.solar - d.usage);
    }
    return sum;
  }, 0);
  
  if (wastedSolar > 10) {
    insights.push({
      category: 'Solar Optimization',
      finding: 'Significant solar energy unused during peak generation',
      impact: `${wastedSolar.toFixed(1)} kWh wasted in past 24h`
    });
  }
  
  const eveningGridUsage = data.reduce((sum, d) => {
    const hour = parseInt(d.time.split(':')[0]);
    if (!d.predicted && hour >= 18 && hour <= 22 && d.usage > d.solar) {
      return sum + (d.usage - d.solar);
    }
    return sum;
  }, 0);
  
  if (eveningGridUsage > 15) {
    insights.push({
      category: 'Grid Dependency',
      finding: 'High evening grid reliance detected',
      impact: `${eveningGridUsage.toFixed(1)} kWh from grid during peak hours`
    });
  }
  
  insights.push({
    category: 'Usage Pattern',
    finding: 'Morning and evening peaks align with typical household behavior',
    impact: 'Opportunity for load shifting to solar hours'
  });
  
  return {
    peakUsageHours: peakUsageHours.slice(0, 3),
    solarWindows: solarWindows.slice(0, 3),
    consumptionRate: parseFloat((data.reduce((sum, d) => sum + d.usage, 0) / data.length).toFixed(2)),
    trends: [
      'Usage increases 40% during evening hours',
      'Solar generation peaks between 12:00-15:00',
      'Average overnight consumption: 2.1 kWh'
    ],
    insights
  };
}

/**
 * Generate AI-powered recommendations
 */
export function generateRecommendations(
  analysis: AIAnalysis,
  prepaidBalance: number
): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];
  
  // Solar optimization recommendation
  if (analysis.solarWindows.length > 0) {
    recommendations.push({
      id: 'solar-opt-1',
      title: 'Shift Energy-Intensive Tasks to Solar Hours',
      description: `AI predicts high solar output from ${analysis.solarWindows[0]} to ${analysis.solarWindows[analysis.solarWindows.length - 1]}. Schedule washing machines, dishwashers, and charging during this window.`,
      confidence: 87,
      reasoning: [
        'Solar generation will exceed usage by 3.2 kWh',
        'Reduces grid dependency by 35%',
        'Historical pattern shows consistent generation',
        'Weather forecast indicates clear conditions'
      ],
      priority: 'high',
      actionTime: analysis.solarWindows[0]
    });
  }
  
  // Prepaid warning
  if (prepaidBalance < 50) {
    recommendations.push({
      id: 'prepaid-1',
      title: 'Critical: Top Up Electricity Soon',
      description: 'Based on your current usage trend, your prepaid balance will deplete in less than 3 days. Consider topping up to avoid interruption.',
      confidence: 92,
      reasoning: [
        'Daily consumption rate: 18.4 kWh',
        'Current balance supports 2.4 days',
        'Weekend usage typically 15% higher',
        'No solar coverage during peak evening hours'
      ],
      priority: 'high'
    });
  }
  
  // Efficiency recommendation
  recommendations.push({
    id: 'efficiency-1',
    title: 'Reduce Evening Peak Consumption',
    description: 'Your evening energy usage is 45% higher than optimal. Small adjustments can save RWF 8,500/month.',
    confidence: 79,
    reasoning: [
      'Evening peak detected between 18:00-22:00',
      'Zero solar availability during this period',
      'Grid electricity costs 60% more',
      'Behavioral pattern identified over 14 days'
    ],
    priority: 'medium'
  });
  
  // Battery/storage suggestion (future feature teaser)
  recommendations.push({
    id: 'storage-1',
    title: 'Battery Storage Could Save 40% More',
    description: 'AI simulation shows battery storage would capture unused daytime solar for evening use, reducing grid dependency significantly.',
    confidence: 84,
    reasoning: [
      'Average 4.2 kWh excess solar daily',
      'Evening shortfall averages 3.8 kWh',
      'ROI period: 18-24 months',
      'Reduces outage risk by 85%'
    ],
    priority: 'low'
  });
  
  return recommendations;
}

/**
 * Calculate prepaid electricity status
 */
export function calculatePrepaidStatus(
  currentBalance: number,
  dailyUsage: number
): PrepaidStatus {
  const daysRemaining = currentBalance / dailyUsage;
  
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  if (daysRemaining < 3) riskLevel = 'high';
  else if (daysRemaining < 7) riskLevel = 'medium';
  
  return {
    balance: currentBalance,
    currency: 'RWF',
    daysRemaining: parseFloat(daysRemaining.toFixed(1)),
    dailyAverageUsage: dailyUsage,
    riskLevel
  };
}

/**
 * Project savings based on solar optimization
 */
export function projectSavings(
  currentUsage: number,
  solarIncreasePercent: number,
  gridCostPerKwh: number = 150 // RWF
): SavingsProjection {
  const currentMonthlyCost = currentUsage * 30 * gridCostPerKwh;
  
  // More solar usage = less grid usage
  const gridReduction = (solarIncreasePercent / 100) * currentUsage;
  const newGridUsage = currentUsage - gridReduction;
  const projectedMonthlyCost = newGridUsage * 30 * gridCostPerKwh;
  
  const monthlySavings = currentMonthlyCost - projectedMonthlyCost;
  
  // CO2 emissions: ~0.5 kg CO2 per kWh from grid (Rwanda's grid mix)
  const co2Reduced = gridReduction * 30 * 0.5;
  
  return {
    currentMonthlyCost: parseFloat(currentMonthlyCost.toFixed(0)),
    projectedMonthlyCost: parseFloat(projectedMonthlyCost.toFixed(0)),
    monthlySavings: parseFloat(monthlySavings.toFixed(0)),
    co2Reduced: parseFloat(co2Reduced.toFixed(1)),
    gridDependencyReduction: parseFloat(solarIncreasePercent.toFixed(1))
  };
}

/**
 * Calculate AI confidence metrics
 */
export function getAIConfidenceMetrics() {
  return {
    predictionAccuracy: 87, // Simulated based on 14-day learning
    dataFreshness: 'Real-time',
    lastUpdated: new Date().toLocaleTimeString(),
    dataPoints: 336, // 14 days * 24 hours
    modelVersion: 'EcoSync AI v1.0 (MVP Simulation)'
  };
}

