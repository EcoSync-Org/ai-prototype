// Reusable Card component

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  hover?: boolean;
}

export default function Card({ children, className = '', gradient = false, hover = false }: CardProps) {
  const baseClasses = 'rounded-2xl p-6 border border-gray-200 transition-all duration-300';
  const gradientClasses = gradient ? 'bg-gradient-to-br from-blue-50 to-green-50' : 'bg-white';
  const hoverClasses = hover ? 'hover:shadow-lg hover:scale-[1.02]' : 'shadow-sm';

  return (
    <div className={`${baseClasses} ${gradientClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={className}>{children}</div>;
}



