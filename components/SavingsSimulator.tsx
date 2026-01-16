'use client';

// Interactive Savings & Impact Simulator
import { useState } from 'react';
import type { SavingsProjection } from '@/lib/types';
import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
import Badge from './ui/Badge';

interface SavingsSimulatorProps {
  currentUsage: number;
  onProjectionChange: (percent: number) => SavingsProjection;
}

export default function SavingsSimulator({ currentUsage, onProjectionChange }: SavingsSimulatorProps) {
  const [solarIncrease, setSolarIncrease] = useState(30);
  const projection = onProjectionChange(solarIncrease);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSolarIncrease(Number(e.target.value));
  };

  const savingsPercent = ((projection.monthlySavings / projection.currentMonthlyCost) * 100);

  return (
    <Card className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <CardTitle className="text-xl">Savings & Impact Simulator</CardTitle>
              <p className="text-sm text-gray-600">See your potential with optimized solar usage</p>
            </div>
          </div>
          <Badge variant="optimized">AI Projection</Badge>
        </div>
      </CardHeader>

      <CardContent>
        {/* Interactive Slider */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-900">
              Increase Solar Usage By:
            </label>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-blue-600">{solarIncrease}%</span>
            </div>
          </div>

          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={solarIncrease}
              onChange={handleSliderChange}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #3b82f6 ${solarIncrease}%, #e5e7eb ${solarIncrease}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>Current</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>Maximum</span>
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Current Behavior */}
          <div className="bg-white rounded-xl p-5 border-2 border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900">Current Behavior</h4>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-gray-600 mb-1">Monthly Cost</div>
                <div className="text-2xl font-bold text-gray-900">
                  {projection.currentMonthlyCost.toLocaleString()}
                  <span className="text-sm font-normal text-gray-600 ml-1">RWF</span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-600">≈ ${(projection.currentMonthlyCost / 1300).toFixed(2)} USD</div>
              </div>
            </div>
          </div>

          {/* AI Projection */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 border-2 border-green-400 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h4 className="font-semibold">AI Projection</h4>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-xs opacity-90 mb-1">Projected Monthly Cost</div>
                  <div className="text-2xl font-bold">
                    {projection.projectedMonthlyCost.toLocaleString()}
                    <span className="text-sm font-normal opacity-90 ml-1">RWF</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-white border-opacity-30">
                  <div className="text-xs opacity-90">≈ ${(projection.projectedMonthlyCost / 1300).toFixed(2)} USD</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Breakdown */}
        <div className="bg-white rounded-xl p-5 border-2 border-green-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900 text-lg">Monthly Savings Potential</h4>
            <Badge variant="success">
              {savingsPercent.toFixed(0)}% Reduction
            </Badge>
          </div>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-bold text-green-600">
              {projection.monthlySavings.toLocaleString()}
            </span>
            <span className="text-2xl font-semibold text-gray-700">RWF/month</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">3 Months</div>
              <div className="text-lg font-bold text-green-700">
                {(projection.monthlySavings * 3).toLocaleString()}
              </div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">6 Months</div>
              <div className="text-lg font-bold text-green-700">
                {(projection.monthlySavings * 6).toLocaleString()}
              </div>
            </div>
            <div className="text-center p-3 bg-green-100 rounded-lg border-2 border-green-300">
              <div className="text-xs text-gray-600 mb-1">1 Year</div>
              <div className="text-lg font-bold text-green-800">
                {(projection.monthlySavings * 12).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">🌍</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">CO₂ Emissions Reduced</h5>
                <p className="text-xs text-gray-600">Monthly environmental impact</p>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-blue-600">{projection.co2Reduced}</span>
              <span className="text-lg font-semibold text-gray-700">kg CO₂</span>
            </div>
            <div className="mt-3 text-xs text-gray-600">
              Equivalent to planting {Math.ceil(projection.co2Reduced / 20)} trees
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">Grid Dependency</h5>
                <p className="text-xs text-gray-600">Reduced reliance on grid</p>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-purple-600">-{projection.gridDependencyReduction}%</span>
            </div>
            <div className="mt-3 text-xs text-gray-600">
              More energy independence and reliability
            </div>
          </div>
        </div>

        {/* AI Note */}
        <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                <strong>AI Simulation:</strong> These projections are based on your current usage patterns ({currentUsage.toFixed(1)} kWh/h average), 
                solar generation windows, and grid electricity costs. Actual savings may vary based on weather conditions and behavioral changes.
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #3b82f6);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          border: 3px solid white;
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #3b82f6);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          border: 3px solid white;
        }
      `}</style>
    </Card>
  );
}

