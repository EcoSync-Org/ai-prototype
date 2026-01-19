// Type definitions for EcoSync AI system

export interface EnergyDataPoint {
  time: string;
  usage: number;
  solar: number;
  predicted?: boolean;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  confidence: number;
  reasoning: string[];
  priority: 'high' | 'medium' | 'low';
  actionTime?: string;
}

export interface PrepaidStatus {
  balance: number;
  currency: string;
  daysRemaining: number;
  dailyAverageUsage: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface SavingsProjection {
  currentMonthlyCost: number;
  projectedMonthlyCost: number;
  monthlySavings: number;
  co2Reduced: number;
  gridDependencyReduction: number;
}

export interface AIInsight {
  category: string;
  finding: string;
  impact: string;
}

export interface AIAnalysis {
  peakUsageHours: string[];
  solarWindows: string[];
  consumptionRate: number;
  trends: string[];
  insights: AIInsight[];
}




