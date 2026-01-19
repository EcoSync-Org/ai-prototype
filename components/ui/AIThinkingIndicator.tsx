'use client';

// Animated AI thinking indicator

interface AIThinkingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export default function AIThinkingIndicator({ size = 'md', label = 'AI Analyzing' }: AIThinkingIndicatorProps) {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const dotSize = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <div className={`${dotSize} bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse`} style={{ animationDelay: '0ms' }} />
        <div className={`${dotSize} bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse`} style={{ animationDelay: '200ms' }} />
        <div className={`${dotSize} bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse`} style={{ animationDelay: '400ms' }} />
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-600">{label}</span>
      )}
    </div>
  );
}




