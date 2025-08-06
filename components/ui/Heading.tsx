import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const headingVariants = cva(
  '',
  {
    variants: {
      level: {
        1: 'heading-1',
        2: 'heading-2',
        3: 'heading-3',
        4: 'heading-4',
        5: 'heading-5',
        6: 'heading-6',
      },
      color: {
        default: '',
        primary: 'text-brand',
        secondary: 'text-brand-secondary',
        accent: 'text-brand-accent',
        muted: 'text-muted',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      level: 1,
      color: 'default',
      align: 'left',
    },
  }
);

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className = '', level, color, align, as, children, ...props }, ref) => {
    const Component = (as || `h${level}`) as React.ElementType;

    return (
      <Component
        ref={ref}
        className={`${headingVariants({ level, color, align })} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
