'use client';

// Simple energy chart visualization using pure CSS and SVG
import type { EnergyDataPoint } from '@/lib/types';
import Badge from '../ui/Badge';

interface EnergyChartProps {
  data: EnergyDataPoint[];
  height?: number;
}

export default function EnergyChart({ data, height = 300 }: EnergyChartProps) {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(
    ...data.map(d => Math.max(d.usage, d.solar))
  );

  const padding = 40;
  const chartWidth = 1000;
  const chartHeight = height - padding * 2;
  const pointWidth = chartWidth / (data.length - 1);

  // Generate SVG path for usage line
  const usagePath = data
    .map((point, i) => {
      const x = i * pointWidth;
      const y = chartHeight - (point.usage / maxValue) * chartHeight;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Generate SVG path for solar line
  const solarPath = data
    .map((point, i) => {
      const x = i * pointWidth;
      const y = chartHeight - (point.solar / maxValue) * chartHeight;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Find where predicted data starts
  const predictedIndex = data.findIndex(d => d.predicted);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-blue-500 rounded" />
            <span className="text-sm text-gray-600">Energy Usage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-green-500 rounded" />
            <span className="text-sm text-gray-600">Solar Generation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 border-2 border-dashed border-gray-400 rounded" />
            <span className="text-sm text-gray-600">Predicted</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="predicted">AI Prediction Active</Badge>
          <Badge variant="optimized">Optimized Window Detected</Badge>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-gray-50 to-white rounded-xl p-4 border border-gray-200">
        <svg
          viewBox={`0 0 ${chartWidth} ${height}`}
          className="w-full"
          style={{ height: `${height}px` }}
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <g key={i}>
              <line
                x1={0}
                y1={padding + chartHeight * ratio}
                x2={chartWidth}
                y2={padding + chartHeight * ratio}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4"
              />
              <text
                x={-10}
                y={padding + chartHeight * ratio + 5}
                fontSize="12"
                fill="#6b7280"
                textAnchor="end"
              >
                {((1 - ratio) * maxValue).toFixed(1)}
              </text>
            </g>
          ))}

          {/* Predicted zone background */}
          {predictedIndex > 0 && (
            <rect
              x={predictedIndex * pointWidth}
              y={padding}
              width={chartWidth - predictedIndex * pointWidth}
              height={chartHeight}
              fill="rgba(59, 130, 246, 0.05)"
            />
          )}

          {/* Solar area fill */}
          <path
            d={`${solarPath} L ${chartWidth} ${chartHeight + padding} L 0 ${chartHeight + padding} Z`}
            fill="rgba(34, 197, 94, 0.1)"
            transform={`translate(0, ${padding})`}
          />

          {/* Usage line */}
          <g transform={`translate(0, ${padding})`}>
            <path
              d={usagePath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={predictedIndex > 0 ? `${predictedIndex * pointWidth} ${chartWidth}` : undefined}
            />
            {predictedIndex > 0 && (
              <path
                d={usagePath}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8 4"
                strokeDashoffset={-predictedIndex * pointWidth}
              />
            )}
          </g>

          {/* Solar line */}
          <g transform={`translate(0, ${padding})`}>
            <path
              d={solarPath}
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={predictedIndex > 0 ? `${predictedIndex * pointWidth} ${chartWidth}` : undefined}
            />
            {predictedIndex > 0 && (
              <path
                d={solarPath}
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8 4"
                strokeDashoffset={-predictedIndex * pointWidth}
              />
            )}
          </g>

          {/* Time labels */}
          {data.map((point, i) => {
            if (i % 4 === 0) {
              return (
                <text
                  key={i}
                  x={i * pointWidth}
                  y={height - 10}
                  fontSize="11"
                  fill="#6b7280"
                  textAnchor="middle"
                >
                  {point.time}
                </text>
              );
            }
            return null;
          })}
        </svg>

        {/* Vertical line at prediction start */}
        {predictedIndex > 0 && (
          <div
            className="absolute top-4 bottom-4 w-0.5 bg-blue-400 opacity-30"
            style={{ left: `${(predictedIndex / (data.length - 1)) * 100}%` }}
          >
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
              <Badge variant="predicted">Now</Badge>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 text-xs text-gray-500 text-center">
        Past 24 hours + 6-hour AI prediction • Updated in real-time
      </div>
    </div>
  );
}



