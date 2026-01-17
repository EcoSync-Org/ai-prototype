// Progress bar component with gradient support

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  className?: string;
  color?: 'blue' | 'green' | 'red' | 'amber';
  showLabel?: boolean;
  label?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  className = '',
  color = 'blue',
  showLabel = false,
  label
}: ProgressBarProps) {
  const percentage = Math.min(100, (value / max) * 100);

  const colors = {
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
    green: 'bg-gradient-to-r from-green-500 to-green-600',
    red: 'bg-gradient-to-r from-red-500 to-red-600',
    amber: 'bg-gradient-to-r from-amber-500 to-amber-600'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-semibold text-gray-900">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors[color]} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}


