'use client';

// Personalized AI Recommendations with confidence levels
import type { AIRecommendation } from '@/lib/types';
import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
import Badge from './ui/Badge';
import AIThinkingIndicator from './ui/AIThinkingIndicator';
import ProgressBar from './ui/ProgressBar';
import { useState } from 'react';

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
  isGenerating?: boolean;
}

export default function AIRecommendations({ recommendations, isGenerating = false }: AIRecommendationsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const priorityColors = {
    high: 'bg-red-50 border-red-200',
    medium: 'bg-amber-50 border-amber-200',
    low: 'bg-blue-50 border-blue-200'
  };

  const priorityBadges = {
    high: <Badge variant="risk">High Priority</Badge>,
    medium: <Badge variant="warning">Medium Priority</Badge>,
    low: <Badge variant="info">Low Priority</Badge>
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <CardTitle className="text-xl">AI-Powered Recommendations</CardTitle>
              <p className="text-sm text-gray-600">Personalized actions to optimize your energy usage</p>
            </div>
          </div>
          {isGenerating && <AIThinkingIndicator label="Generating recommendations" />}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`rounded-xl border-2 p-5 transition-all duration-300 cursor-pointer ${priorityColors[rec.priority]} ${
                expandedId === rec.id ? 'shadow-lg scale-[1.02]' : 'hover:shadow-md'
              }`}
              onClick={() => setExpandedId(expandedId === rec.id ? null : rec.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {priorityBadges[rec.priority]}
                    {rec.actionTime && (
                      <Badge variant="predicted">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Act at {rec.actionTime}
                      </Badge>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{rec.title}</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{rec.description}</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    rec.confidence >= 85 ? 'bg-green-100' : rec.confidence >= 70 ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <span className={`text-2xl font-bold ${
                      rec.confidence >= 85 ? 'text-green-700' : rec.confidence >= 70 ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {rec.confidence}%
                    </span>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">Confidence</span>
                </div>
              </div>

              {/* Confidence Bar */}
              <ProgressBar
                value={rec.confidence}
                color={rec.confidence >= 85 ? 'green' : rec.confidence >= 70 ? 'blue' : 'amber'}
                className="mb-3"
              />

              {/* Expandable Reasoning Section */}
              {expandedId === rec.id && (
                <div className="mt-4 pt-4 border-t border-gray-300 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h5 className="text-sm font-semibold text-gray-900">Why AI Suggests This:</h5>
                  </div>
                  <ul className="space-y-2">
                    {rec.reasoning.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                            {idx + 1}
                          </div>
                        </div>
                        <span className="text-sm text-gray-700 flex-1">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expand/Collapse Indicator */}
              <div className="mt-3 flex items-center justify-center">
                <button className="text-xs font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  {expandedId === rec.id ? 'Hide' : 'Show'} AI reasoning
                  <svg
                    className={`w-4 h-4 transition-transform ${expandedId === rec.id ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {recommendations.length === 0 && !isGenerating && (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">No recommendations at this time</p>
            <p className="text-sm mt-1">AI is monitoring your energy patterns</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}



