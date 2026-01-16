'use client';

// Energy Overview Dashboard with dynamic charts
import type { EnergyDataPoint } from '@/lib/types';
import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
import EnergyChart from './charts/EnergyChart';
import Badge from './ui/Badge';

interface EnergyOverviewProps {
  data: EnergyDataPoint[];
}

export default function EnergyOverview({ data }: EnergyOverviewProps) {
  // Calculate statistics
  const currentUsage = data[data.length - 1]?.usage || 0;
  const currentSolar = data[data.length - 1]?.solar || 0;
  
  const totalUsage = data
    .filter(d => !d.predicted)
    .reduce((sum, d) => sum + d.usage, 0);
  
  const totalSolar = data
    .filter(d => !d.predicted)
    .reduce((sum, d) => sum + d.solar, 0);
  
  const solarUtilization = totalUsage > 0 ? (totalSolar / totalUsage) * 100 : 0;
  const excessSolar = totalSolar - totalUsage;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Energy Overview Dashboard</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              AI-powered real-time monitoring and prediction
            </p>
          </div>
          <Badge variant="success">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-700">Current Usage</span>
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-blue-900">{currentUsage.toFixed(1)}</div>
            <div className="text-xs text-blue-600 mt-1">kWh</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-700">Solar Generation</span>
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-green-900">{currentSolar.toFixed(1)}</div>
            <div className="text-xs text-green-600 mt-1">kWh</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-700">Solar Utilization</span>
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-purple-900">{solarUtilization.toFixed(0)}%</div>
            <div className="text-xs text-purple-600 mt-1">Last 24h</div>
          </div>

          <div className={`bg-gradient-to-br ${excessSolar > 0 ? 'from-amber-50 to-amber-100 border-amber-200' : 'from-emerald-50 to-emerald-100 border-emerald-200'} rounded-xl p-4 border`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${excessSolar > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
                {excessSolar > 0 ? 'Excess Solar' : 'Grid Usage'}
              </span>
              <svg className={`w-5 h-5 ${excessSolar > 0 ? 'text-amber-600' : 'text-emerald-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className={`text-3xl font-bold ${excessSolar > 0 ? 'text-amber-900' : 'text-emerald-900'}`}>
              {Math.abs(excessSolar).toFixed(1)}
            </div>
            <div className={`text-xs ${excessSolar > 0 ? 'text-amber-600' : 'text-emerald-600'} mt-1`}>
              {excessSolar > 0 ? 'Unused' : 'From Grid'}
            </div>
          </div>
        </div>

        {/* Chart */}
        <EnergyChart data={data} height={320} />

        {/* Status Indicators */}
        <div className="mt-6 flex flex-wrap gap-3">
          {currentSolar > currentUsage && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="text-sm font-semibold text-green-900">Optimal Conditions</div>
                <div className="text-xs text-green-700">Solar exceeds usage by {(currentSolar - currentUsage).toFixed(1)} kWh</div>
              </div>
            </div>
          )}
          
          {excessSolar > 5 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="text-sm font-semibold text-amber-900">Opportunity Alert</div>
                <div className="text-xs text-amber-700">Run appliances now to capture excess solar</div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <div>
              <div className="text-sm font-semibold text-blue-900">AI Prediction Active</div>
              <div className="text-xs text-blue-700">Next 6 hours forecasted with 87% confidence</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

