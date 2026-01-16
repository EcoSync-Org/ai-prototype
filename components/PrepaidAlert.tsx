'use client';

// Smart Prepaid Electricity Alert System with countdown
import type { PrepaidStatus } from '@/lib/types';
import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
import Badge from './ui/Badge';
import ProgressBar from './ui/ProgressBar';

interface PrepaidAlertProps {
  status: PrepaidStatus;
}

export default function PrepaidAlert({ status }: PrepaidAlertProps) {
  const riskColors = {
    low: { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', text: 'text-green-900', icon: 'text-green-600' },
    medium: { bg: 'from-amber-50 to-orange-50', border: 'border-amber-200', text: 'text-amber-900', icon: 'text-amber-600' },
    high: { bg: 'from-red-50 to-rose-50', border: 'border-red-200', text: 'text-red-900', icon: 'text-red-600' }
  };

  const colors = riskColors[status.riskLevel];
  const balancePercentage = (status.daysRemaining / 30) * 100; // Assuming 30 days is "full"

  return (
    <Card className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center`}>
              {status.riskLevel === 'high' ? (
                <svg className={`w-7 h-7 ${colors.icon} animate-pulse`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : status.riskLevel === 'medium' ? (
                <svg className={`w-7 h-7 ${colors.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className={`w-7 h-7 ${colors.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div>
              <CardTitle className={colors.text}>Smart Prepaid Alert</CardTitle>
              <p className={`text-sm ${colors.text} opacity-75`}>AI-powered balance monitoring</p>
            </div>
          </div>
          {status.riskLevel === 'high' && (
            <Badge variant="risk">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Critical
            </Badge>
          )}
          {status.riskLevel === 'medium' && <Badge variant="warning">Warning</Badge>}
          {status.riskLevel === 'low' && <Badge variant="success">Healthy</Badge>}
        </div>
      </CardHeader>

      <CardContent>
        {/* Main Balance Display */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">Current Balance</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-5xl font-bold ${colors.text}`}>
              {status.balance.toLocaleString()}
            </span>
            <span className={`text-2xl font-semibold ${colors.text} opacity-75`}>
              {status.currency}
            </span>
          </div>
        </div>

        {/* Countdown Visualization */}
        <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900">Estimated Time Remaining</h4>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-gray-600">AI Prediction</span>
            </div>
          </div>

          <div className="flex items-end gap-4 mb-4">
            <div className={`text-6xl font-bold ${colors.text}`}>
              {status.daysRemaining.toFixed(1)}
            </div>
            <div className="mb-2">
              <div className={`text-2xl font-semibold ${colors.text}`}>days</div>
              <div className="text-xs text-gray-600">
                ≈ {Math.floor(status.daysRemaining * 24)} hours
              </div>
            </div>
          </div>

          <ProgressBar
            value={balancePercentage}
            color={status.riskLevel === 'high' ? 'red' : status.riskLevel === 'medium' ? 'amber' : 'green'}
            showLabel
            label="Balance Status"
          />
        </div>

        {/* AI Explanation */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-semibold text-gray-900 mb-2">How AI Calculated This:</h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Analyzed your 7-day usage trend: <strong>{status.dailyAverageUsage.toFixed(1)} kWh/day</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Current balance: <strong>{status.balance.toLocaleString()} {status.currency}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Factored in weekend usage patterns (typically +15%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Considered solar coverage during peak generation hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {status.riskLevel === 'high' && (
          <div className="mt-4">
            <button className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Top Up Now to Avoid Outage
            </button>
          </div>
        )}

        {status.riskLevel === 'medium' && (
          <div className="mt-4">
            <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Set Up Low Balance Alert
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

