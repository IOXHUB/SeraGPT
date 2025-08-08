'use client';

import Link from 'next/link';
import { useOptimizedLink } from '@/components/providers/PerformanceProvider';
import { forwardRef } from 'react';

interface OptimizedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
  preloadOnHover?: boolean;
  priority?: 'high' | 'medium' | 'low';
  [key: string]: any;
}

export const OptimizedLink = forwardRef<HTMLAnchorElement, OptimizedLinkProps>(
  ({ 
    href, 
    children, 
    className = '', 
    prefetch = true, 
    preloadOnHover = true,
    priority = 'medium',
    ...props 
  }, ref) => {
    const { handleLinkHover, handleLinkClick } = useOptimizedLink();

    const handleMouseEnter = () => {
      if (preloadOnHover) {
        handleLinkHover(href);
      }
    };

    const handleClick = () => {
      handleLinkClick(href);
    };

    // Determine prefetch behavior based on priority
    const shouldPrefetch = priority === 'high' ? true : prefetch;

    return (
      <Link
        href={href}
        className={className}
        prefetch={shouldPrefetch}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

OptimizedLink.displayName = 'OptimizedLink';

// Utility component for high-priority links (dashboard navigation, etc.)
export function HighPriorityLink({ children, ...props }: OptimizedLinkProps) {
  return (
    <OptimizedLink priority="high" preloadOnHover={true} {...props}>
      {children}
    </OptimizedLink>
  );
}

// Utility component for medium-priority links (content navigation)
export function MediumPriorityLink({ children, ...props }: OptimizedLinkProps) {
  return (
    <OptimizedLink priority="medium" preloadOnHover={true} {...props}>
      {children}
    </OptimizedLink>
  );
}

// Utility component for low-priority links (footer, etc.)
export function LowPriorityLink({ children, ...props }: OptimizedLinkProps) {
  return (
    <OptimizedLink priority="low" preloadOnHover={false} prefetch={false} {...props}>
      {children}
    </OptimizedLink>
  );
}
