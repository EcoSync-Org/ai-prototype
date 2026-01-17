'use client';

// AI Insight Panel showing how the AI analyzes data and makes decisions
import type { AIAnalysis } from '@/lib/types';
import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
import Badge from './ui/Badge';
import AIThinkingIndicator from './ui/AIThinkingIndicator';

interface AIInsightPanelProps {
  analysis: AIAnalysis;
  isAnalyzing?: boolean;
}

export default function AIInsightPanel({ analysis, isAnalyzing = false }: AIInsightPanelProps) {
  return (
    <Card gradient className="border-2 border-blue-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <CardTitle>AI Insight Panel</CardTitle>
              <p className="text-sm text-gray-600">Explainable AI (MVP Simulation)</p>
            </div>
          </div>
          {isAnalyzing && <AIThinkingIndicator />}
        </div>
      </CardHeader>

      <CardContent>
        {/* Data Analyzed Section */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
            Data Analyzed by AI
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ml-8">
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="text-xs text-gray-500 mb-1">Consumption Rate</div>
              <div className="text-lg font-bold text-gray-900">{analysis.consumptionRate} kWh/h</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="text-xs text-gray-500 mb-1">Peak Hours Detected</div>
              <div className="text-lg font-bold text-gray-900">{analysis.peakUsageHours.length}</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="text-xs text-gray-500 mb-1">Solar Windows</div>
              <div className="text-lg font-bold text-gray-900">{analysis.solarWindows.length}</div>
            </div>
          </div>
        </div>

        {/* AI Reasoning Steps */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">2</span>
            AI Reasoning Steps
          </h4>
          <div className="ml-8 space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Detected Peak Usage Hours</div>
                <div className="text-xs text-gray-600 mt-1">
                  {analysis.peakUsageHours.length > 0 
                    ? `Identified ${analysis.peakUsageHours.join(', ')} as high consumption periods`
                    : 'Analyzing usage patterns...'}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Matched Usage with Solar Availability</div>
                <div className="text-xs text-gray-600 mt-1">
                  {analysis.solarWindows.length > 0
                    ? `Found optimal solar windows: ${analysis.solarWindows.join(', ')}`
                    : 'Calculating solar generation windows...'}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Predicted Prepaid Depletion</div>
                <div className="text-xs text-gray-600 mt-1">
                  Based on {analysis.consumptionRate} kWh/h average consumption rate
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Generated Recommendations</div>
                <div className="text-xs text-gray-600 mt-1">
                  Personalized action items created based on analysis
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">3</span>
            Key Insights Discovered
          </h4>
          <div className="ml-8 space-y-2">
            {analysis.insights.map((insight, idx) => (
              <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="info">{insight.category}</Badge>
                    </div>
                    <div className="text-sm text-gray-900 font-medium">{insight.finding}</div>
                    <div className="text-xs text-gray-600 mt-1">{insight.impact}</div>
                  </div>
                  <div className="text-2xl">💡</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trends */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Observed Trends (7-Day Pattern Analysis)
          </h4>
          <div className="space-y-1">
            {analysis.trends.map((trend, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                {trend}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



