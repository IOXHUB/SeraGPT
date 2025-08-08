'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  animate?: boolean;
}

export function Skeleton({ 
  className = '', 
  width = '100%', 
  height = '1rem',
  rounded = 'md',
  animate = true 
}: SkeletonProps) {
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const baseClasses = `bg-gray-200 ${roundedClasses[rounded]} ${className}`;

  const shimmerAnimation = {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      ease: 'linear',
      repeat: Infinity,
    }
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (animate) {
    return (
      <motion.div
        className={`${baseClasses} relative overflow-hidden`}
        style={style}
        animate={shimmerAnimation}
        initial={{ backgroundPosition: '200% 0' }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite linear'
          }}
        />
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </motion.div>
    );
  }

  return <div className={baseClasses} style={style} />;
}

// Specific skeleton components for common UI patterns
export function SkeletonText({ lines = 1, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          height="1rem" 
          width={i === lines - 1 ? '75%' : '100%'} 
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`p-6 bg-white rounded-lg border border-gray-200 ${className}`}>
      <Skeleton height="8rem" rounded="lg" className="mb-4" />
      <Skeleton height="1.5rem" width="60%" className="mb-2" />
      <SkeletonText lines={3} />
      <div className="flex gap-2 mt-4">
        <Skeleton height="2rem" width="5rem" rounded="md" />
        <Skeleton height="2rem" width="4rem" rounded="md" />
      </div>
    </div>
  );
}

export function SkeletonButton({ className = '' }: { className?: string }) {
  return (
    <Skeleton 
      height="2.5rem" 
      width="8rem" 
      rounded="lg" 
      className={className}
    />
  );
}

export function SkeletonAvatar({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };
  
  return (
    <Skeleton 
      className={`${sizes[size]} ${className}`}
      rounded="full"
    />
  );
}

export function SkeletonInput({ className = '' }: { className?: string }) {
  return (
    <Skeleton 
      height="2.5rem" 
      rounded="md" 
      className={className}
    />
  );
}

export function SkeletonChart({ className = '' }: { className?: string }) {
  return (
    <div className={`p-4 ${className}`}>
      <Skeleton height="1.5rem" width="40%" className="mb-4" />
      <div className="space-y-2">
        {[80, 65, 90, 45, 70].map((width, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton height="1rem" width="3rem" />
            <Skeleton height="1.5rem" width={`${width}%`} rounded="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
