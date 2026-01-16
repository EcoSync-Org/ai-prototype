// Reusable Badge component for status indicators

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'predicted' | 'optimized' | 'risk' | 'success' | 'warning' | 'info';
  className?: string;
}

export default function Badge({ children, variant = 'info', className = '' }: BadgeProps) {
  const variants = {
    predicted: 'bg-blue-100 text-blue-700 border-blue-200',
    optimized: 'bg-green-100 text-green-700 border-green-200',
    risk: 'bg-red-100 text-red-700 border-red-200',
    success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    info: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

