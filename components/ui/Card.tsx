import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'card',
  {
    variants: {
      size: {
        sm: 'card-sm',
        base: '',
        lg: 'card-lg',
      },
      variant: {
        default: '',
        'user-panel': 'user-panel-card',
        modern: 'modern-card',
      },
      hover: {
        true: 'hover:shadow-md hover:-translate-y-0.5',
        false: '',
      },
      border: {
        true: 'border',
        false: 'border-0',
      },
    },
    defaultVariants: {
      size: 'base',
      variant: 'default',
      hover: true,
      border: true,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', size, variant, hover, border, header, footer, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${cardVariants({ size, variant, hover, border })} ${className}`}
        {...props}
      >
        {header && <div className="card-header">{header}</div>}
        {children}
        {footer && <div className="card-footer">{footer}</div>}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
